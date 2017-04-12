import { ProductService } from "./product/product.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";


import { appRoutes } from "./app.routes";
import { SharedModule } from "./shared/shared.module";

// components
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SideBarComponent } from "./navigation/side-bar/side-bar.component";
import { TopBarComponent } from "./navigation/top-bar/top-bar.component";
import { ImageLoaderDirective } from "./common/image-loader.directive";
import { LimitToPipe } from "./common/limit-to.pipe";
import { OrderByPipe } from "./common/order-by.pipe";
import { ProductComponent } from "./product/product.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { ToLocalTimestampPipe } from "./common/to-local-timestamp.pipe";
import { FilterPipe } from "./common/filter.pipe";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideBarComponent,
    TopBarComponent,
    ImageLoaderDirective,
    LimitToPipe,
    OrderByPipe,
    ProductComponent,
    ProductDetailComponent,
    ToLocalTimestampPipe,
    FilterPipe,


  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule,
    FormsModule
  ],
  providers: [
    ProductService
  ]
})
export class AppModule { }
