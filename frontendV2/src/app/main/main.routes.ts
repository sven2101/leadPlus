import { Routes, RouterModule } from "@angular/router";

import { LoggedInGuard } from "../login/logged-in.guard";
import { LoggedOutGuard } from "../login/logged-out.guard";

import { LoginComponent } from "../login/login.component";

export const mainRoutes: Routes = [

    {
        path: "login",
        component: LoginComponent,
        canActivate: [LoggedOutGuard]
    },
    {
        path: "",
        loadChildren: "../app.module#AppModule",
        canActivate: [LoggedInGuard]
    }
];

export class MainRoutes { }
