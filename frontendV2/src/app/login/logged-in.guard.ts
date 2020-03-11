import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private authentication: AuthenticationService, private router: Router) { }

    async canActivate(): Promise<boolean> {
        await this.authentication.awaitInit();
        if (this.authentication.isLoggedIn() !== true) {
            this.router.navigate(["/login"]);
            return false;
        } else {
            return true;
        }
    }
}