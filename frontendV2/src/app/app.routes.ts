import { Routes, RouterModule } from "@angular/router";

import { LoggedInGuard } from "./logged-in.Guard";
import { LoggedOutGuard } from "./logged-out.Guard";

import { AppComponent } from "./app.component";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: AppComponent,
        canActivate: [LoggedOutGuard]
    }
];
