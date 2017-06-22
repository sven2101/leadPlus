import { Common } from "./../../common/common";
import { ProcessService } from "./../../process/process.service";
import { Process } from "./../../process/process.model";
import { ProcessStatus } from "./../../process/process-status.enum";
import { DashboardService } from "./../dashboard.service";
import { Component, OnInit, OnDestroy, ContentChild, ViewChild } from "@angular/core";
import { DragulaService } from "ng2-dragula/components/dragula.provider";
import { InfoModalComponent } from "./info-modal/info-modal.component";

import { Activity } from "../../process/activity.enum";

@Component({
  selector: "dashbhoard-managment",
  templateUrl: "./managment.component.html",
  styleUrls: ["./managment.component.css"]
})
export class ManagmentComponent implements OnInit, OnDestroy {

  @ViewChild(InfoModalComponent) infoModalComponent: InfoModalComponent;

  openLeads: any = [];
  leadsInContact: any = [];
  offers: any = [];
  doneOffers: any = [];
  sales: any = [];
  trashBucket: any = [];
  allData: any = [];

  Activity = Activity;
  ProcessStatus = ProcessStatus;

  constructor(public dashboardService: DashboardService, private processService: ProcessService, private dragulaService: DragulaService) { }

  ngOnInit() {
    this.setDragulaOptions();
    this.initProcesses();

  }

  ngOnDestroy() {
    this.dragulaService.destroy("bucket");
  }

  ngAfterContentInit() {
    console.log(this.infoModalComponent.open);
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
    this.allData = this.openLeads.concat(this.leadsInContact.concat(this.offers.concat(this.doneOffers.concat(this.sales))));
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
    const process: Process = this.allData.filter(p => p.id === Number(el.id))[0];
    console.log("INCONTACT", process);
    process.status = ProcessStatus.INCONTACT;
    // this.processService.saveProcess(process);
  }

  private async setOffer(el: HTMLElement): Promise<void> {
    const process: Process = this.allData.filter(p => p.id === Number(el.id))[0];
    console.log("OFFER", process);
    process.status = ProcessStatus.OFFER;
    process.offer = Common.deepCopy(process.lead);
    // this.processService.saveProcess(process);
  }

  private async setDone(el: HTMLElement): Promise<void> {
    const process: Process = this.allData.filter(p => p.id === Number(el.id))[0];
    console.log("DONE", process);
    process.status = ProcessStatus.DONE;
    process.sale = Common.deepCopy(process.offer);
    // this.processService.saveProcess(process);
  }

  private async setSale(el: HTMLElement): Promise<void> {
    const process: Process = this.allData.filter(p => p.id === Number(el.id))[0];
    console.log("SALE", process);
    process.status = ProcessStatus.SALE;
    // this.processService.saveProcess(process);
  }

  private async deleteProcess(el: HTMLElement): Promise<void> {
    const process: Process = this.trashBucket.filter(p => p.id === Number(el.id))[0];
    console.log("DELETE", process);
  }

  public openInfoModal(process: Process) {
    this.infoModalComponent.open(process);
  }

}
