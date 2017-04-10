import { Routes, RouterModule } from "@angular/router";

import { LoggedInGuard } from "./login/logged-in.guard";
import { LoggedOutGuard } from "./login/logged-out.guard";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";

export const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: "start",
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [LoggedOutGuard]
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [LoggedInGuard]
    }
];

export class AppRoutes { }
