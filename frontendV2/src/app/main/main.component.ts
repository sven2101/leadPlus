import { TestMessage } from "./../messaging/test-message";
import { MessagingService } from "./../messaging/messaging.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ToasterService, ToasterConfig } from "angular2-toaster";
import { Observable, Subscription } from "rxjs/Rx";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html"
})
export class MainComponent implements OnInit, OnDestroy {

  userUpdatedSubscription: Subscription;

  public toasterconfig: ToasterConfig = new ToasterConfig({
    mouseoverTimerStop: true,
    timeout: 3000
  });

  constructor(private ToasterService: ToasterService, private MessagingService: MessagingService) { }

  ngOnInit(): void {
    this.userUpdatedSubscription = this.MessagingService.of(TestMessage)
      .filter(message => Number(message.user.id) === 123)
      .subscribe(message => {
        alert(message.user.firstname);
      });
  }

  ngOnDestroy() {
    this.userUpdatedSubscription.unsubscribe();
  }
}
