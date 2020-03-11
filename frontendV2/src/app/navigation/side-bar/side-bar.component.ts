import { AuthenticationService } from "./../../login/authentication.service";
import { User } from "./../../user/user.model";
import { Role } from "./../../user/role.enum";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"]
})
export class SideBarComponent implements OnInit {

  public user: User;
  public Role = Role;
  public leadsCount = 0;
  public offersCount = 0;

  constructor(private AuthenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.AuthenticationService.currentUser;
  }

  public getUserPictureId(user: User): string {
    if (user == null || user.picture == null) { return ""; }
    return "/api/rest/files/content/" + user.picture.id;
  }



}
