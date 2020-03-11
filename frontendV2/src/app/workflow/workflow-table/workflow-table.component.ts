import { WorkflowUnit } from "./../workflowUnit.model";
import { Page } from "./../../common/page.interface";
import { Process } from "./../../process/process.model";
import { Input } from "@angular/core";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { SortDirection } from "./../../common/sort-direction.enum";

@Component({
  selector: "workflow-table",
  templateUrl: "./workflow-table.component.html",
  styleUrls: ["./workflow-table.component.css"]
})
export class WorkflowTableComponent implements OnInit, AfterViewInit {

  @Input() method: (pageNumber: number, pageSize: number
    , sortDirection: SortDirection, sortProperties: string, fromCache: boolean) => Promise<Page<Process>>;

  @Input() workflowUnitType = "lead";
  currentPage: Page<Process>;
  currentPageArray: Array<number> = [];
  pageSize = 10;
  currentSortProperty = this.workflowUnitType + ".timestamp";
  currentSortDirection = SortDirection.ASC;
  SortDirection = SortDirection;

  constructor() { }

  async ngOnInit() {
    await this.getNewPage(0);
    console.log(this.currentPage);
  }

  async ngAfterViewInit() {

  }

  async getPagesCount(page: Page<Process>): Promise<Array<number>> {
    const tmp = Array(page.totalPages).fill(1).map((x, i) => i);
    const paginationSize = 9;
    if (tmp.length > 9) {
      while (tmp.length > 9) {
        const y = tmp.indexOf(page.number);
        console.log(y);
        console.log(tmp);

        if (y < paginationSize / 2) {
          tmp.pop();
        } else {
          tmp.shift();
        }
        console.log(tmp);
      }

    }
    return tmp;
  }

  async getNewPage(pageNumber: number): Promise<void> {
    pageNumber = pageNumber < 0 ? 1 : pageNumber;
    this.currentPage = await this.method(pageNumber, this.pageSize, this.currentSortDirection, this.currentSortProperty, true)
    this.currentPageArray = await this.getPagesCount(this.currentPage);
  }

  async setSortProperty(property: string): Promise<void> {
    if (this.currentSortProperty !== property) {
      this.currentSortDirection = SortDirection.ASC;
      this.currentSortProperty = property;
    } else {
      if (this.currentSortDirection === SortDirection.ASC) {
        this.currentSortDirection = SortDirection.DESC;
      } else {
        this.currentSortDirection = SortDirection.ASC;
      }
    }
    await this.getNewPage(this.currentPage.number);
  }

}
