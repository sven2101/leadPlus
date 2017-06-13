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
    this.xyz();
  }

  async xyz() {

    await this.processService.getAllProcessesWithLeadNotNullPage(0, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.DESC, "id", true);

    await this.processService.getAllProcessesWithLeadNotNullPage(0, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(0, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(0, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.DESC, "id", true);

    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.ASC, "id", true);

    await this.processService.getAllProcessesWithLeadNotNullPage(0, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(0, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(0, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.DESC, "id", true);

    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.ASC, "lead.timestamp", true);

    await this.processService.getAllProcessesWithLeadNotNullPage(0, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(0, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(0, 10, SortDirection.DESC, "id", true);
    await this.processService.getAllProcessesWithLeadNotNullPage(1, 10, SortDirection.DESC, "id", true);

    setInterval(async () => {
      await this.processService.getAllProcessesWithLeadNotNullPage(0, 10, SortDirection.DESC, "id", true);
    }, 1000 * 5);

  }



}
