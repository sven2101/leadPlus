import { Page } from "./../common/page.interface";
import { Process } from "./../process/process.model";
import { ProcessService } from "./../process/process.service";
import { Injectable } from "@angular/core";
import { ProcessStatus } from "../process/process-status.enum";
import { SortDirection } from "../common/sort-direction.enum";

@Injectable()
export class DashboardService {

  openLeads = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }];
  leadsInContact = [];
  offers = [{ id: 10 }];
  doneOffers = [];
  sales = [{ id: 11 }];

  openLeadsValue;
  inContactsValue;
  openOffersValue;
  doneOffersValue;
  closedSalesValue;

  constructor(private processService: ProcessService) {

  }

  public async getProcessesByStatus(status: ProcessStatus): Promise<Array<Process>> {
    const page = await this.processService.getAllProcessesByStatusPage(status, 0, 10);
    return page.content;
  }



}
