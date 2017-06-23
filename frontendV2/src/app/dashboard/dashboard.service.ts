import { ObjectUpdatedMessage } from "./../common/object-updated-message";
import { MessagingService } from "./../messaging/messaging.service";
import { CacheService } from "./../common/cache.service";
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

  constructor(private processService: ProcessService, private messagingService: MessagingService) {

  }

  public async getProcessesByStatus(status: ProcessStatus): Promise<Page<Process>> {
    return this.processService.getAllProcessesByStatusPageCached(status, 0, 10, undefined, undefined, false);
  }

  public async test() {
    const x = await this.processService.getAllProcessesWithOfferNotNullPageCached(0, 10, SortDirection.ASC, "id");
    console.log(x);
    this.messagingService.publish(new ObjectUpdatedMessage(Process, { id: 5 }));
    const y = await this.processService.getAllProcessesWithOfferNotNullPageCached(0, 10, SortDirection.ASC, "id");
    console.log(y);


  }





}
