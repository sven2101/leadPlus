import { User } from "./../../../user/user.model";
import { Address } from "./../../../common/address.model";
import { OrderPosition } from "./../../../product/order-position.model";
import { WorkflowService } from "./../../../workflow/workflow.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgbModal, NgbModalRef, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Process } from "./../../../process/process.model";
import { WorkflowUnit } from "./../../../workflow/workflowUnit.model";
import { Common } from "./../../../common/common";

@Component({
  selector: "info-modal",
  templateUrl: "./info-modal.component.html",
  styleUrls: ["./info-modal.component.css"]
})
export class InfoModalComponent implements OnInit {

  public process: Process;
  public workflowUnit: WorkflowUnit;

  @ViewChild("content") content: ElementRef;

  constructor(private modalService: NgbModal, private workflowService: WorkflowService) { }

  ngOnInit() {

  }

  async open(process: Process): Promise<NgbModalRef> {
    this.process = process;
    this.workflowUnit = Common.getWorkflowUnitBasedOnProcessStatus(this.process);
    return this.modalService.open(this.content, { size: "lg" });
  }

  sumOrderPositions(orderPositions: Array<OrderPosition>): number {
    return this.workflowService.sumOrderPositions(orderPositions);
  }

  getAddressLine(address: Address): string {
    return this.workflowService.getAddressLine(address);
  }

  getNameOfUser(user: User): string {
    return this.workflowService.getNameOfUser(user);
  }

}
