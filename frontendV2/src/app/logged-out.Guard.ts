import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { LoginService } from "./Login.Service";

@Injectable()
export class LoggedOutGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(): boolean {
        if (this.loginService.isLoggedIn() === true) {
            this.router.navigate(["/start"]);
            return false;
        } else {
            return true;
        }
    }
}