import { DashboardService } from "./../dashboard.service";
import { Component, OnInit } from "@angular/core";
import { DragulaService } from "ng2-dragula/ng2-dragula";

import { Activity } from "../../process/activity.enum";

@Component({
  selector: "dashbhoard-managment",
  templateUrl: "./managment.component.html",
  styleUrls: ["./managment.component.css"]
})
export class ManagmentComponent implements OnInit {

  Activity = Activity;

  constructor(public DashboardService: DashboardService, private DragulaService: DragulaService) { }

  ngOnInit() {
    this.setDragulaOptions();
  }

  private onDropModel(args) {
    const [el, target, source] = args;
    // do something else
  }

  private onRemoveModel(args) {
    const [el, source] = args;
    // do something else
  }

  private setDragulaOptions(): void {
    this.DragulaService.setOptions("bag", {
      accepts: (el, target, source, sibling) => {
        return this.acceptsElement(source.id, target.id);
      },
      moves: (el, source, handle, sibling) => {
        return source.id !== Activity.SALE;
      }
    });
    this.DragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    this.DragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  private acceptsElement(source: Activity, target: Activity): boolean {
    if (<any>target === "trashSymbol" || source === target) { return true; }
    switch (source) {
      case Activity.OPEN: return target === Activity.INCONTACT || target === Activity.OFFER;
      case Activity.INCONTACT: return target === Activity.OFFER;
      case Activity.OFFER: return target === Activity.DONE || target === Activity.SALE;
      case Activity.DONE: return target === Activity.SALE;
      case Activity.SALE: return false;
    }
  }

}
