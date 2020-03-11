import { Page } from "./../../common/page.interface";
import { Process } from "./../../process/process.model";
import { ProcessService } from "./../../process/process.service";
import { Component, OnInit } from "@angular/core";
import { SortDirection } from "./../../common/sort-direction.enum";

@Component({
  selector: "lead",
  templateUrl: "./lead.component.html",
  styleUrls: ["./lead.component.css"]
})
export class LeadComponent implements OnInit {

  method: (pageNumber: number, pageSize: number
    , sortDirection: SortDirection, sortProperties: string, fromCache: boolean) => Page<Process>;

  constructor(private processService: ProcessService) { }

  async ngOnInit() {
    this.method = this.processService.getAllProcessesByStatusIsOpenOrIncontactPageCached.bind(this.processService);
  }

}
