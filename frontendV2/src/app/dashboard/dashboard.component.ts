import { DashboardService } from "./dashboard.service";
import { WorkflowUnit } from "./../workflow/workflowUnit.model";
import { Process } from "./../process/process.model";
import { ProcessStatus } from "./../process/process-status.enum";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./../modal/modal.component";
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  closeResult;
  @ViewChild("#content2") content2: ElementRef;
  xyz = true;
  process: Process;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.process = new Process();
    this.process.sale = new WorkflowUnit();
  }

  ngAfterViewInit() {
    let f=this.test.bind(this,1);
    let f2 =f.bind(undefined,2);
    console.log("f:",f);
    console.log("f2:",f2);
  
    f2(3);

  }



  async open(content: ElementRef): Promise<void> {
    try {
      const result = await this.modalService.open(content, { size: "lg" }).result;
      this.closeResult = `Closed with: ${result}`;
    } catch (error) {
      alert(error);
    }
  }
  save() {
    console.log("save");
  }

  send() {
    console.log("send");
  }

  test(x,y,z){
    console.log(x,y,z,this.xyz);
  }



}
