import { User } from "./../../user/user.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "dashboard-managment-card",
  templateUrl: "./managment-card.component.html",
  styleUrls: ["./managment-card.component.css"]
})
export class ManagmentCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public getProductPictureId(user: User): string {
    if (user == null || user.thumbnail == null) { return ""; }
    return "/api/rest/files/content/" + user.thumbnail.id;
  }

}
