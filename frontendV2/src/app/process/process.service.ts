import { ProcessUpdateMessage } from "./process-update-message";
import { MessagingService } from "./../messaging/messaging.service";
import { Process } from "./process.model";
import { Page } from "./../common/page.interface";
import { HttpClient } from "./../common/http-client";
import { Injectable } from "@angular/core";
import { SortDirection } from "./../common/sort-direction.enum";
import { ProcessStatus } from "./process-status.enum";

@Injectable()
export class ProcessService {

  private static readonly CACHE_LIFESPAN = 1000 * 60 * 10;
  private static readonly CACHE_ENABLED = true;

  public static readonly PROCESSES_WITH_LEAD_NOT_NULL_PAGE_URL = "/api/rest/processes/pagination/leads";
  public static readonly PROCESSES_WITH_OFFER_NOT_NULL_PAGE_URL = "/api/rest/processes/pagination/offers";
  public static readonly PROCESSES_WITH_SALE_NOT_NULL_PAGE_URL = "/api/rest/processes/pagination/sales";
  public static readonly PROCESSES_BY_STATUS_PAGE_URL = "/api/rest/processes/pagination/{status}";

  private processCache: {
    [key: string]: {
      filterSettings: string;
      timestamp: number;
      pages: {
        [key: string]: Page<Process>
      }
    }
  } = {};

  constructor(private httpClient: HttpClient, private messagingService: MessagingService) {
    this.messagingService.of(ProcessUpdateMessage).subscribe(m => this.updateProcessInCache(m.process));
  }

  public async getAllProcessesWithLeadNotNullPage(pageNumber: number = 0, pageSize: number = 10
    , sortDirection: SortDirection = null, sortProperties: string = null, fromCache: boolean = false): Promise<Page<Process>> {
    const key = "getAllProcessesWithLeadNotNullPage";
    const resultFromCache = this.evaluateCache(key, pageNumber, pageSize, sortDirection, sortProperties);
    if (resultFromCache != null && fromCache === true) {
      console.log("fromCache", fromCache);
      return resultFromCache;
    }
    this.processCache[key].pages[pageNumber] = await this.httpClient.post<Page<Process>>(ProcessService.PROCESSES_WITH_LEAD_NOT_NULL_PAGE_URL,
      { page: pageNumber, size: pageSize, direction: sortDirection, properties: sortProperties });
    return this.processCache[key].pages[pageNumber];
  }

  public async getAllProcessesWithOfferNotNullPage(pageNumber: number = 0, pageSize: number = 10
    , sortDirection: SortDirection = null, sortProperties: string = null, fromCache: boolean = false): Promise<Page<Process>> {
    const key = "getAllProcessesWithOfferNotNullPage";
    const resultFromCache = this.evaluateCache(key, pageNumber, pageSize, sortDirection, sortProperties);
    if (resultFromCache != null && fromCache === true) {
      console.log("fromCache", fromCache);
      return resultFromCache;
    }
    this.processCache[key].pages[pageNumber] = await this.httpClient.post<Page<Process>>(ProcessService.PROCESSES_WITH_OFFER_NOT_NULL_PAGE_URL,
      { page: pageNumber, size: pageSize, direction: sortDirection, properties: sortProperties });
    return this.processCache[key].pages[pageNumber];
  }

  public async getAllProcessesWithSaleNotNullPage(pageNumber: number = 0, pageSize: number = 10
    , sortDirection: SortDirection = null, sortProperties: string = null, fromCache: boolean = false): Promise<Page<Process>> {
    const key = "getAllProcessesWithSaleNotNullPage";
    const resultFromCache = this.evaluateCache(key, pageNumber, pageSize, sortDirection, sortProperties);
    if (resultFromCache != null && fromCache === true) {
      console.log("fromCache", fromCache);
      return resultFromCache;
    }
    this.processCache[key].pages[pageNumber] = await this.httpClient.post<Page<Process>>(ProcessService.PROCESSES_BY_STATUS_PAGE_URL,
      { page: pageNumber, size: pageSize, direction: sortDirection, properties: sortProperties });

    return this.processCache[key].pages[pageNumber];
  }

  public async getAllProcessesByStatusPage(status: ProcessStatus, pageNumber: number = 0, pageSize: number = 10, sortDirection: SortDirection = null
    , sortProperties: string = null, fromCache: boolean = true): Promise<Page<Process>> {
    const key = "getAllProcessesByStatusPage" + status;
    const resultFromCache = this.evaluateCache(key, pageNumber, pageSize, sortDirection, sortProperties);
    if (resultFromCache != null && fromCache === true) {
      console.log("fromCache ", fromCache);
      return resultFromCache;
    }
    this.processCache[key].pages[pageNumber] =
      await this.httpClient.post<Page<Process>>(ProcessService.PROCESSES_BY_STATUS_PAGE_URL.replace("{status}", status.toString()),
        { page: pageNumber, size: pageSize, direction: sortDirection, properties: sortProperties });

    return this.processCache[key].pages[pageNumber];
  }

  private evaluateCache(key: string, pageNumber: number, pageSize: number, sortDirection: SortDirection, sortProperties: string): Page<Process> | undefined {
    const filterSettings = pageSize + sortDirection + sortProperties;
    if (this.processCache[key] == null
      || this.processCache[key].filterSettings !== filterSettings
      || this.processCache[key].timestamp + ProcessService.CACHE_LIFESPAN < Date.now()) {
      this.processCache[key] = {
        filterSettings: filterSettings,
        timestamp: Date.now(),
        pages: {}
      };
    } else if (ProcessService.CACHE_ENABLED === true && this.processCache[key].pages[pageNumber] != null) {
      return this.processCache[key].pages[pageNumber];
    }
    return null;
  }

  private updateProcessInCache(process: Process): void {
    Object.keys(this.processCache)
      .map(key => this.processCache[key])
      .map(value => value.pages)
      .forEach(page => {
        Object.keys(page)
          .map(key => page[key])
          .map(value => value.content)
          .forEach(processes => {
            processes.filter(p => p.id === process.id)
              .forEach(p => {
                Object.keys(p)
                  .forEach(key => p[key] = process[key]);
                Object.keys(process)
                  .forEach(key => p[key] = process[key]);
              });
          });
      });


  }
}
