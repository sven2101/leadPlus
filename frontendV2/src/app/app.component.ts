import { AuthenticationService } from "./login/authentication.service";
import { HttpClient } from "./common/http-client";
import { User } from "./user/user.model";
import { Component, OnInit } from "@angular/core";



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {

  }



}

