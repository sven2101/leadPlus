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
import { ImageLoaderDirective } from './common/image-loader.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideBarComponent,
    TopBarComponent,
    ImageLoaderDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ],
  providers: [

  ]
})
export class AppModule { }
