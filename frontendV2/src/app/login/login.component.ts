import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "./authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  private credentials = { username: null, password: null };
  constructor(private AuthenticationService: AuthenticationService, private Router: Router) { }

  ngOnInit(): void {
  }

  private async login(credentials: { username: string, password: string }): Promise<void> {
    await this.AuthenticationService.setTokenByCredentials(credentials);
    this.Router.navigate(["/start"]);
  }

}
