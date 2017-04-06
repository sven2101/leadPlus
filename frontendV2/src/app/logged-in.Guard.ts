import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { LoginService } from "./Login.Service";

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }

    async canActivate(): Promise<boolean> {
        await this.loginService.getInitPromise();
        if (this.loginService.isLoggedIn() !== true) {
            this.router.navigate(["/login"]);
            return false;
        } else {
            return true;
        }
    }
}