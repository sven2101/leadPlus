import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationComponent } from "./../modal/modal.component";
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  closeResult;
  @ViewChild("#content2") content2: ElementRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

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
    alert("save");
  }



}
