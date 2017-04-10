import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { appRoutes } from "./app.routes";
import { LoggedInGuard } from "./login/logged-in.guard";
import { LoggedOutGuard } from "./login/logged-out.guard";

// components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

// services
import { AuthenticationService } from "./login/authentication.service";
import { CookieService } from "./login/cookie.service";
import { HttpClient } from "./common/http-client";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NavigationComponent } from "./navigation/navigation.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavigationComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HttpClient,
    AuthenticationService,
    LoggedInGuard,
    LoggedOutGuard,


    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
