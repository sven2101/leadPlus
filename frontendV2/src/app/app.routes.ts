import { Routes, RouterModule } from "@angular/router";

import { LoggedInGuard } from "./login/logged-in.guard";
import { LoggedOutGuard } from "./login/logged-out.guard";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const appRoutes: Routes = [
    {
        path: "",
        component: AppComponent,
        children: [
            {
                path: "dashboard",
                component: DashboardComponent
            }
        ]
    }
];

export class AppRoutes { }
