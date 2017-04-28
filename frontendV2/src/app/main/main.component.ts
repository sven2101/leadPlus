import { TestMessage } from "./../messaging/test-message";
import { MessagingService } from "./../messaging/messaging.service";
import { Component, OnInit } from "@angular/core";
import { ToasterService, ToasterConfig } from "angular2-toaster";
import { Observable } from "rxjs/Rx";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html"
})
export class MainComponent implements OnInit {

  userUpdatedSubscription;

  public toasterconfig: ToasterConfig = new ToasterConfig({
    mouseoverTimerStop: true,
    timeout: 3000
  });

  constructor(private ToasterService: ToasterService, private MessagingService: MessagingService) { }

  ngOnInit(): void {
    this.userUpdatedSubscription = this.MessagingService.of(TestMessage).subscribe(message => {
      alert(message.user.firstname);
    });
  }

}
