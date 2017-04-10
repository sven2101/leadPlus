import { Injectable } from "@angular/core";

@Injectable()
export class CookieService {

  constructor() { }

  public getCookie(name: string): string {
    const ca: Array<string> = document.cookie.split(";");
    const caLen: number = ca.length;
    const cookieName = name + "=";
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
      // c = ca[i].replace(/^\s\+/g, "");
      c = ca[i].replace(/^\s+/g, "");
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "";
  }

  public getCookieObject(name: string): Object | string {
    return JSON.parse(this.getCookie(name));
  }

  public deleteCookie(name: string): void {
    this.setCookie(name, "", -1);
  }

  public setCookie(name: string, value: string, expireDays: number = 30, path: string = ""): void {
    const d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires: string = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
  }
}
