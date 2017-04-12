import { Component, OnInit } from "@angular/core";
import { ToasterService, ToasterConfig } from "angular2-toaster";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html"
})
export class MainComponent implements OnInit {

  public toasterconfig: ToasterConfig = new ToasterConfig({
    mouseoverTimerStop: true,
    timeout: 3000
  });

  constructor(private ToasterService: ToasterService) { }

  ngOnInit(): void {
  }

}
