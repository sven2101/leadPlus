import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductComponent } from "./product.component";
import { Routes, RouterModule } from "@angular/router";

import { LoggedInGuard } from "../login/logged-in.guard";
import { LoggedOutGuard } from "../login/logged-out.guard";


export const productRoutes: Routes = [
    {
        path: "",
        component: ProductComponent
    },
    {
        path: "detail/:id",
        component: ProductDetailComponent
    },
    {
        path: "**",
        redirectTo: ""
    }
];

export class ProductRoutes { }