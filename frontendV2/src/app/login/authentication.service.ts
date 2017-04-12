import { ToasterService } from "angular2-toaster";
import { User } from "./../user/user.model";
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Router } from "@angular/router";

import * as sjcl from "assets/js/sjcl";

import * as jwt_decode from "jwt-decode";

import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

import { CookieService } from "./cookie.service";

@Injectable()
export class AuthenticationService {

  public static readonly API_ENPOINT = "http://demo.leadplus.localhost:8080";

  public static readonly ACCESS_TOKEN = "accessToken";
  public static readonly REFRESH_TOKEN = "refreshToken";
  public static readonly USER_STORAGE = "user";
  public static readonly ACCESS_TOKEN_COOKIE_KEY = "token";
  public static readonly TOKEN_REFRESH_URL = AuthenticationService.API_ENPOINT + "/api/rest/auth/token";
  public static readonly LOGIN_URL = AuthenticationService.API_ENPOINT + "/api/rest/auth/login";
  public static readonly USER_BY_USERNAME_URL = AuthenticationService.API_ENPOINT + "/api/rest/users/email";
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

  public currentUser: User;

  constructor(private Router: Router, private http: Http, private cookieService: CookieService, private ToasterService: ToasterService) {
    this.setTenant();
    this.init();
  }

  private async init(): Promise<void> {
    this.initPromise = this.initToken();
  }

  private setTenant(): void {
    const host = window.location.host.split(".")[0];
    let tempTenant;
    if (host.indexOf(".") < 0) {
      tempTenant = "dummyTenant";
    } else if (host.split(".")[0] === "www") {
      tempTenant = host.split(".")[1];
    } else {
      tempTenant = host.split(".")[0];
    }
    this.tenant = tempTenant === "leadplus" || tempTenant === "boexli" ? "dummyTenant" : tempTenant;
  }

  private async initToken(): Promise<void> {
    const currentPath = this.Router.url;
    const tmpUser: User = this.getItemFromLocalStorage(AuthenticationService.USER_STORAGE);
    if (tmpUser == null) { this.logout(false); }
    this.currentUser = tmpUser;
    if (AuthenticationService.FREE_ROUTES.indexOf(currentPath) !== -1) { return; }
    this.refreshToken = this.getItemFromLocalStorage(AuthenticationService.REFRESH_TOKEN);
    this.accessTokenJson = this.accessToken == null ? null : jwt_decode(this.accessToken);
    this.refreshTokenJson = this.refreshToken == null ? null : jwt_decode(this.refreshToken);
    if (this.isExpired(this.refreshTokenJson)) {
      this.loggedIn = false;
      this.logout(false);
    } else if (!this.isExpired(this.accessTokenJson)) {
      this.loggedIn = true;
    } else {
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
    this.loggedIn = true;
    return this.refreshToken;
  }

  private async getAccessTokenByRefreshToken(refreshToken: string): Promise<{ token: string }> {
    const headers = new Headers(AuthenticationService.JSON_HEADER);
    const requestOptions = new RequestOptions({ headers: headers, withCredentials: true });
    requestOptions.headers.append("X-Authorization", "Bearer  " + this.refreshToken);
    return this.http.get(AuthenticationService.TOKEN_REFRESH_URL, requestOptions)
      .map((res: Response) => res.json())
      .toPromise();
  }

  public async setTokenByCredentials(credentials: { username: string, password: string }): Promise<void> {
    try {
      const salt: string = credentials.username;
      const hashedPassword = sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(credentials.password, credentials.username, 10000));
      const options = new RequestOptions({ headers: new Headers(AuthenticationService.JSON_HEADER) });
      const tokens: { token: string; refreshToken: string } =
        await this.http.post(AuthenticationService.LOGIN_URL,
          { username: credentials.username, password: hashedPassword },
          options)
          .map((res: Response) => res.json())
          .toPromise();
      this.setToken(tokens);
      this.currentUser = await this.getCurrentUserByUsername(credentials.username);
      this.saveItemToLocalStorage(AuthenticationService.USER_STORAGE, this.currentUser);
    } catch (error) {
      this.ToasterService.pop("error", "", "LOGIN_ERROR");
    }
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
      const temp: { token: string } = await this.getAccessTokenByRefreshToken(this.refreshToken);
      this.accessToken = temp.token;
      this.accessTokenJson = jwt_decode(this.accessToken);
      this.loggedIn = true;
      return this.accessToken;
    } catch (error) {
      this.loggedIn = false;
      this.logout();
    }
  }

  private isExpired(token: any): boolean {
    return token == null || token.exp * 1000 < (new Date().getTime() + 1000 * 30);
  }

  public logout(fullPageReload: boolean = true): void {
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
    return this.loggedIn;
  }

  public async awaitInit(): Promise<void> {
    await this.initPromise;
  }

  public getSmtpKey(): string {
    return this.accessTokenJson.signature;
  }

  public saveItemToLocalStorage(key: string, value: any): void {
    if (key == null || value == null) { return; }
    this.localStorageMap[key] = null;
    localStorage.setItem(this.tenant + "_" + key, JSON.stringify(value));
  }

  public getItemFromLocalStorage(key: string): any {
    if (key == null) { return null; }
    const x = this.tenant + "_" + key;
    const temp: string = localStorage.getItem(this.tenant + "_" + key);
    if (temp == null) { return null; }
    return JSON.parse(temp);
  }

  public removeItemFromLocalStorage(key: string): void {
    if (key == null) { return; }
    localStorage.removeItem(this.tenant + "_" + key);
  }

  private removeAllItemsFromLocalStorage(): void {
    for (const key in this.localStorageMap) {
      if (this.localStorageMap.hasOwnProperty(key)) {
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

  private async getCurrentUserByUsername(username: string): Promise<User> {
    const headers = new Headers(AuthenticationService.JSON_HEADER);
    const requestOptions = new RequestOptions({ headers: headers, withCredentials: true });
    requestOptions.headers.append("X-Authorization", "Bearer  " + this.accessToken);
    return this.http.post(AuthenticationService.USER_BY_USERNAME_URL, username, requestOptions)
      .map((res: Response) => res.json())
      .toPromise();
  }
}
