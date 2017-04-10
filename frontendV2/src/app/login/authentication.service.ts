import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Router } from "@angular/router";

import * as jwt_decode from "jwt-decode";

import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

import { CookieService } from "./cookie.service";

declare var sjcl;


@Injectable()
export class AuthenticationService {

  public static readonly API_ENPOINT = "https://demo.leadplus.localhost:8080";

  // static readonly ACCESS_TOKEN: string = "accessToken";
  public static readonly REFRESH_TOKEN = "refreshToken";
  public static readonly USER_STORAGE = "user";
  public static readonly ACCESS_TOKEN_COOKIE_KEY = "token";
  public static readonly TOKEN_REFRESH_URL = AuthenticationService.API_ENPOINT + "/api/rest/auth/token";
  public static readonly LOGIN_URL = AuthenticationService.API_ENPOINT + "/api/rest/auth/login";
  public static readonly JSON_HEADER = { "Content-Type": "application/json" };
  public static readonly FREE_ROUTES = ["/tenants/registration"];

  private accessToken: string | null;
  private accessTokenJson: any;
  private refreshToken: string | null;
  private refreshTokenJson: any;
  private loggedIn = false;
  private initPromise: Promise<void>;
  private tokenRefreshPromise: Promise<string>;
  private tokenRefreshInProgress = false;
  private tenant: String;
  private localStorageMap: {} = {};

  constructor(private Router: Router, private http: Http, private cookieService: CookieService) {
    this.setTenant();
    this.init();
  }

  private async init(): Promise<void> {
    this.initPromise = this.initToken();
  }

  private setTenant(): void {
    const host = window.location.host.split(".")[0];
    let tempTenant = "";
    if (host.indexOf(".") < 0) {
      tempTenant = null;
    } else if (host.split(".")[0] === "www") {
      tempTenant = host.split(".")[1];
    } else {
      tempTenant = host.split(".")[0];
    }
    this.tenant = tempTenant === "leadplus" || tempTenant === "boexli" ? null : tempTenant;
  }

  private async initToken(): Promise<void> {
    // this.openLoginModal();
    const currentPath = this.Router.url;
    if (AuthenticationService.FREE_ROUTES.indexOf(currentPath) !== -1) { return; }
    console.log("init start", this.loggedIn);
    this.refreshToken = this.getItemFromLocalStorage(AuthenticationService.REFRESH_TOKEN);
    this.accessTokenJson = this.accessToken == null ? null : jwt_decode(this.accessToken);
    this.refreshTokenJson = this.refreshToken == null ? null : jwt_decode(this.refreshToken);
    if (this.isExpired(this.refreshTokenJson)) {
      this.loggedIn = false;
      console.log("refreshToken expired");
      this.logout(false);
    } else if (!this.isExpired(this.accessTokenJson)) {
      this.loggedIn = true;
    } else {
      console.log("accessToken expired");
      this.accessToken = await this.getAccessTokenPromise();
      this.accessTokenJson = jwt_decode(this.accessToken);
      this.loggedIn = true;
    }

  }

  public setToken(newToken: { token: string, refreshToken: string }): string {
    this.accessToken = newToken.token;
    this.refreshToken = newToken.refreshToken;
    this.accessTokenJson = this.accessToken == null ? null : jwt_decode(this.accessToken);
    this.refreshTokenJson = this.refreshToken == null ? null : jwt_decode(this.refreshToken);
    this.saveItemToLocalStorage(AuthenticationService.REFRESH_TOKEN, this.refreshToken);
    console.log(newToken);
    this.loggedIn = true;
    return this.refreshToken;
  }

  private async getAccessTokenByRefreshToken(refreshToken: string): Promise<{ token: string }> {
    const headers = new Headers(AuthenticationService.JSON_HEADER);
    const requestOptions = new RequestOptions(headers);
    requestOptions.headers.append("X-Authorization", "Bearer  " + this.refreshToken);
    return this.http.get(AuthenticationService.TOKEN_REFRESH_URL, requestOptions)
      .map((res: Response) => res.json())
      .toPromise();
  }

  public async setTokenByCredentials(credentials: { username: string, password: string }): Promise<string> {
    const salt: string = credentials.username;
    const hashedPassword = sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(credentials.password, credentials.username, 10000));
    console.log(salt, credentials.password, hashedPassword);
    const options = new RequestOptions({ headers: new Headers(AuthenticationService.JSON_HEADER) });
    const tokens: { token: string; refreshToken: string } =
      await this.http.post(AuthenticationService.LOGIN_URL,
        { username: credentials.username, password: hashedPassword },
        options)
        .map((res: Response) => res.json())
        .toPromise()
        .catch(error => { throw Error("invalid password or username"); });
    return this.setToken(tokens);
  }

  public async getAccessTokenPromise(): Promise<string> {
    if (this.tokenRefreshInProgress === true) { return this.tokenRefreshPromise; }
    this.tokenRefreshInProgress = true;
    this.tokenRefreshPromise = this.getAccessToken();
    const temp = await this.tokenRefreshPromise;
    this.tokenRefreshInProgress = false;
    return temp;

  }

  private async getAccessToken(): Promise<string> {
    try {
      if (this.accessToken != null && !this.isExpired(this.accessTokenJson)) { return this.accessToken; }
      if (this.refreshToken == null || this.isExpired(this.refreshTokenJson)) { throw Error("Refresh token expired!"); }

      console.log("refresh");
      const temp: { token: string } = await this.getAccessTokenByRefreshToken(this.refreshToken);
      console.log(temp);
      this.accessToken = temp.token;
      this.accessTokenJson = jwt_decode(this.accessToken);
      console.log(this.accessToken);
      this.loggedIn = true;
      return this.accessToken;

    } catch (error) {
      this.loggedIn = false;
      console.log("getAccessToken", error);
      this.logout();
    }
  }

  public getAccessTokenInstant(): string {
    try {
      if (this.accessToken != null && !this.isExpired(this.accessTokenJson)) { return this.accessToken; }
      if (this.refreshToken == null || this.isExpired(this.refreshTokenJson)) { throw Error("Refresh token expired!"); }

      this.getAccessTokenPromise();
      return null;

    } catch (error) {
      this.loggedIn = false;
      console.log("getAccessToken", error);
      this.logout();
    }

  }


  private isExpired(token: any): boolean {
    return token == null || token.exp * 1000 < (new Date().getTime() + 1000 * 30);
  }

  public logout(fullPageReload: boolean = true): void {
    console.log("logout");
    this.loggedIn = false;
    this.removeAllItemsFromLocalStorage();
    let port = window.location.port;
    port = ":" + port;
    if (port !== ":8080") {
      port = "";
    }
    if (fullPageReload === true) {
      window.open("http://" + window.location.host + port + "/", "_self");
    } else if (fullPageReload === false) {
      this.Router.navigate(["/login"]);
    }
  }

  public isLoggedIn(): boolean {
    console.log(this.loggedIn);
    return this.loggedIn;
  }

  public async awaitInit(): Promise<void> {
    await this.initPromise;
  }

  public getSmtpKey(): string {
    console.log(this.accessTokenJson.signature);
    return this.accessTokenJson.signature;
  }

  public saveItemToLocalStorage(key: string, value: any): void {
    if (key == null || value == null) { return; }
    this.localStorageMap[key] = null;
    localStorage.setItem(this.tenant + "_" + key, JSON.stringify(value));
  }

  public getItemFromLocalStorage(key: string): any {
    if (key == null) { return null; }
    const temp: string = localStorage.getItem(this.tenant + "_" + key);
    if (temp == null) { return null; }
    return JSON.parse(temp);
  }

  public removeItemFromLocalStorage(key: string): void {
    if (key == null) { return; }
    localStorage.removeItem(this.tenant + "_" + key);
  }

  private removeAllItemsFromLocalStorage(): void {
    console.log(this.localStorageMap);
    for (const key in this.localStorageMap) {
      if (this.localStorageMap.hasOwnProperty(key)) {
        console.log(key);
        localStorage.removeItem(this.tenant + "_" + key);
      }

    }
    localStorage.removeItem(this.tenant + "_" + AuthenticationService.USER_STORAGE);
    localStorage.removeItem(this.tenant + "_" + AuthenticationService.REFRESH_TOKEN);
    this.cookieService.deleteCookie(AuthenticationService.ACCESS_TOKEN_COOKIE_KEY);
  }

  public async setAccessTokenCookie(): Promise<void> {
    const tokenString = await this.getAccessTokenPromise();
    this.cookieService.setCookie(AuthenticationService.ACCESS_TOKEN_COOKIE_KEY, tokenString);
  }

  private hashPasswordPbkdf2(password: string, salt: string): string {
    return sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(password, salt, 10000));
  };
}
