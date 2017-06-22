import { User } from "./../../../user/user.model";
import{Process} from "./../../../process/process.model";
import { Component, OnInit,Output,EventEmitter,Input } from "@angular/core";

@Component({
  selector: "dashboard-managment-card",
  templateUrl: "./managment-card.component.html",
  styleUrls: ["./managment-card.component.css"]
})
export class ManagmentCardComponent implements OnInit {

  @Input("process")process:Process;
  workflowService;
  editWorkflowUnit;
  goToLink;
  text;

  @Output()  openInfoModal=new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public getProductPictureId(user: User): string {
    if (user == null || user.thumbnail == null) { return ""; }
    return "/api/rest/files/content/" + user.thumbnail.id;
  }

  public sendEventOpenInfoModal(process:Process){
    this.openInfoModal.emit(process)
  }

}
