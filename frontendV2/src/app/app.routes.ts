import { LeadComponent } from "./workflow/lead/lead.component";
import { productRoutes } from "./product/product.routes";
import { ProductComponent } from "./product/product.component";
import { Routes, RouterModule } from "@angular/router";

import { LoggedInGuard } from "./login/logged-in.guard";
import { LoggedOutGuard } from "./login/logged-out.guard";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const appRoutes: Routes = [
    {
        path: "",
        component: AppComponent,
        canActivate: [LoggedInGuard],
        children: [
            {
                path: "",
                redirectTo: "dashboard",
                canActivate: [LoggedInGuard]
            },
            {
                path: "dashboard",
                component: DashboardComponent,
                canActivate: [LoggedInGuard]
            },
            {
                path: "product",
                children: productRoutes,
                canActivate: [LoggedInGuard]
            },
            {
                path: "lead",
                component: LeadComponent,
                canActivate: [LoggedInGuard]
            }
        ]

    }
];

export class AppRoutes { }
