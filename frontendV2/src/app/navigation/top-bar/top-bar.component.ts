import { AuthenticationService } from "./../../login/authentication.service";
import { Component, OnInit } from "@angular/core";
import { NotificationSendState } from "../../notification/notification-send-state.enum";
import { NotificationType } from "../../notification/notification-type.enum";

declare var $: any;

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"]
})
export class TopBarComponent implements OnInit {

  public todos = [];
  public userNotifications = [];
  public NotificationSendState = NotificationSendState;
  public NotificationType = NotificationType;
  public notificationSendState: NotificationSendState;
  public isSmptVerified: boolean;

  constructor(private AuthenticationService: AuthenticationService) { }

  ngOnInit(): void { }

  public toggleMiniNavBar(): void {
    const body = $("body");
    const sideBar = $("#side-menu");
    body.toggleClass("mini-navbar");
    if (!body.hasClass("mini-navbar") || body.hasClass("body-small")) {
      // Hide menu in order to smoothly turn on when maximize menu
      sideBar.hide();
      // For smoothly turn on menu
      setTimeout(() => sideBar.fadeIn(400), 200);
    } else if (body.hasClass("fixed-sidebar")) {
      sideBar.hide();
      setTimeout(() => sideBar.fadeIn(400), 100);
    } else {
      // Remove all inline style from jquery fadeIn function to reset menu state
      sideBar.removeAttr("style");
    }
  }



  public changeLanguage(key: string): void {

  }

  public setTopbarNotificationState(notificationSendState: NotificationSendState): void {

  }

  public logout(): void {
    this.AuthenticationService.logout();
  }

}
