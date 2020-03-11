import { MessagingService } from "./../messaging/messaging.service";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { AuthenticationService } from "../login/authentication.service";
import { CookieService } from "../login/cookie.service";
import { LoggedInGuard } from "../login/logged-in.guard";
import { LoggedOutGuard } from "../login/logged-out.guard";
import { HttpClient } from "../common/http-client";

import { ToasterService } from "angular2-toaster";

@NgModule({})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthenticationService,
        CookieService,
        LoggedInGuard,
        LoggedOutGuard,
        HttpClient,
        MessagingService,
        ToasterService
      ]
    };
  }
}
