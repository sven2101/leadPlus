import { Process } from "./../../process/process.model";
import { ProcessStatus } from "./../../process/process-status.enum";
import { DashboardService } from "./../dashboard.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { DragulaService } from "ng2-dragula/components/dragula.provider";

import { Activity } from "../../process/activity.enum";

@Component({
  selector: "dashbhoard-managment",
  templateUrl: "./managment.component.html",
  styleUrls: ["./managment.component.css"]
})
export class ManagmentComponent implements OnInit, OnDestroy {

  openLeads: any = [];
  leadsInContact: any = [];
  offers: any = [];
  doneOffers: any = [];
  sales: any = [];
  trashBucket: any = [];

  Activity = Activity;
  ProcessStatus = ProcessStatus;

  constructor(public dashboardService: DashboardService, private dragulaService: DragulaService) { }

  ngOnInit() {
    this.setDragulaOptions();
    this.initProcesses();

  }

  ngOnDestroy() {
    this.dragulaService.destroy("bucket");
  }

  private async initProcesses(): Promise<void> {
    const openLeadsPromise = this.dashboardService.getProcessesByStatus(ProcessStatus.OPEN);
    const leadsInContactPromise = this.dashboardService.getProcessesByStatus(ProcessStatus.INCONTACT);
    const offersPromise = this.dashboardService.getProcessesByStatus(ProcessStatus.OFFER);
    const doneOffersPromise = this.dashboardService.getProcessesByStatus(ProcessStatus.DONE);
    const salesPromise = this.dashboardService.getProcessesByStatus(ProcessStatus.SALE);
    this.openLeads = await openLeadsPromise;
    this.leadsInContact = await leadsInContactPromise;
    this.offers = await offersPromise;
    this.doneOffers = await doneOffersPromise;
    this.sales = await salesPromise;
  }


  private setDragulaOptions(): void {
    this.dragulaService.setOptions("bucket", {
      accepts: (el, target, source, sibling) => {
        return this.acceptsElement(source.id, target.id);
      },
      moves: (el, source, handle, sibling) => {
        return source.id !== Activity.SALE;
      }
    });
    this.dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
  }

  private onDropModel(args): void {
    const [el, target, source] = args;
    switch (target.id) {
      case "trashSymbol": this.deleteProcess(el);
        break;
      case Activity.INCONTACT: this.setInContact(el);
        break;
      case Activity.OFFER: this.setOffer(el);
        break;
      case Activity.DONE: this.setDone(el);
        break;
      case Activity.SALE: this.setSale(el);
    }
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

  private async setInContact(el: HTMLElement): Promise<void> {
    const process = this.dashboardService.leadsInContact.filter(p => p.id === Number(el.id))[0];
    console.log("INCONTACT", process);
  }

  private async setOffer(el: HTMLElement): Promise<void> {
    const process = this.dashboardService.offers.filter(p => p.id === Number(el.id))[0];
    console.log("OFFER", process);
  }

  private async setDone(el: HTMLElement): Promise<void> {
    const process = this.dashboardService.doneOffers.filter(p => p.id === Number(el.id))[0];
    console.log("DONE", process);
  }

  private async setSale(el: HTMLElement): Promise<void> {
    const process = this.dashboardService.sales.filter(p => p.id === Number(el.id))[0];
    console.log("SALE", process);
  }

  private async deleteProcess(el: HTMLElement): Promise<void> {
    const process = this.trashBucket.filter(p => p.id === Number(el.id))[0];
    console.log("DELETE", process);
  }

}
