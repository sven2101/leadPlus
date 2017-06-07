import { WorkflowService } from "./workflow/workflow.service";
import { AbstractModalContentDirective } from "./modal/abstract-modal-content.directive";
import { ModalModule } from "./modal/modal.module";
import { DashboardService } from "./dashboard/dashboard.service";
import { ProductService } from "./product/product.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { DragulaModule } from "ng2-dragula/ng2-dragula";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";

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
import { ManagmentComponent } from "./dashboard/managment/managment.component";
import { StatisticComponent } from "./dashboard/statistic/statistic.component";
import { ToDoComponent } from "./dashboard/to-do/to-do.component";
import { ManagmentCardComponent } from "./dashboard/managment/managment-card.component";
import { ModalComponent } from "./modal/modal.component";

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
    ManagmentComponent,
    StatisticComponent,
    ToDoComponent,
    ManagmentCardComponent,
    AbstractModalContentDirective

  ],
  imports: [
    DragulaModule,
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule,
    FormsModule,
    NgbModule.forRoot(),
    ModalModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    DashboardService,
    WorkflowService
  ]
})
export class AppModule { }
