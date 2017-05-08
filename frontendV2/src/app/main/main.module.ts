import { ToasterModule } from "angular2-toaster";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { mainRoutes } from "./main.routes";
import { SharedModule } from "../shared/shared.module";
import { LoggedInGuard } from "../login/logged-in.guard";
import { LoggedOutGuard } from "../login/logged-out.guard";

// components
import { LoginComponent } from "../login/login.component";
import { MainComponent } from "./main.component";

@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(mainRoutes),
    SharedModule.forRoot(),
    ToasterModule
  ],
  providers: [

  ],
  bootstrap: [MainComponent]
})
export class MainModule { }

