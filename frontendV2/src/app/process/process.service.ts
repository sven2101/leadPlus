import { CacheService } from "./../common/cache.service";
import { Common } from "./../common/common";
import { ObjectUpdatedMessage } from "./../common/object-updated-message";
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
  public static readonly SAVE_PROCESS_URL = "/api/rest/processes/save";

  private processCache: {
    [key: string]: {
      filterSettings: string;
      timestamp: number;
      pages: {
        [key: string]: Page<Process>
      }
    }
  } = {};

  constructor(private httpClient: HttpClient, private cacheService: CacheService) { }

  public async saveProcess(process: Process): Promise<Process> {
    return this.httpClient.post<Process>(ProcessService.SAVE_PROCESS_URL, process);
  }

  private async getAllProcessesWithLeadNotNullPage(pageNumber: number = 0, pageSize: number = 10
    , sortDirection: SortDirection = null, sortProperties: string = null, fromCache: boolean = true): Promise<Page<Process>> {
    return this.httpClient.post<Page<Process>>(ProcessService.PROCESSES_WITH_LEAD_NOT_NULL_PAGE_URL,
      { page: pageNumber, size: pageSize, direction: sortDirection, properties: sortProperties });
  }

  public async getAllProcessesWithLeadNotNullPageCached(pageNumber: number = 0, pageSize: number = 10
    , sortDirection: SortDirection = null, sortProperties: string = null, fromCache: boolean = true): Promise<Page<Process>> {
    return this.cacheService.invokeFunctionCached(this.getAllProcessesWithLeadNotNullPage.bind(this), Process, "getAllProcessesWithLeadNotNullPageCached"
      , fromCache, pageNumber, pageSize, sortDirection, sortProperties);
  }

  private async getAllProcessesWithOfferNotNullPage(pageNumber: number = 0, pageSize: number = 10
    , sortDirection: SortDirection = null, sortProperties: string = null, fromCache: boolean = true): Promise<Page<Process>> {
    return this.httpClient.post<Page<Process>>(ProcessService.PROCESSES_WITH_OFFER_NOT_NULL_PAGE_URL,
      { page: pageNumber, size: pageSize, direction: sortDirection, properties: sortProperties });
  }

  public async getAllProcessesWithOfferNotNullPageCached(pageNumber: number = 0, pageSize: number = 10
    , sortDirection: SortDirection = null, sortProperties: string = null, fromCache: boolean = true): Promise<Page<Process>> {
    return this.cacheService.invokeFunctionCached(this.getAllProcessesWithOfferNotNullPage.bind(this), Process, "getAllProcessesWithOfferNotNullPageCached"
      , fromCache, pageNumber, pageSize, sortDirection, sortProperties);
  }

  private async getAllProcessesWithSaleNotNullPage(pageNumber: number = 0, pageSize: number = 10
    , sortDirection: SortDirection = null, sortProperties: string = null, fromCache: boolean = true): Promise<Page<Process>> {
    return this.httpClient.post<Page<Process>>(ProcessService.PROCESSES_WITH_SALE_NOT_NULL_PAGE_URL,
      { page: pageNumber, size: pageSize, direction: sortDirection, properties: sortProperties });
  }

  public async getAllProcessesWithSaleNotNullPageCached(pageNumber: number = 0, pageSize: number = 10
    , sortDirection: SortDirection = null, sortProperties: string = null, fromCache: boolean = true): Promise<Page<Process>> {
    return this.cacheService.invokeFunctionCached(this.getAllProcessesWithSaleNotNullPage.bind(this), Process, "getAllProcessesWithSaleNotNullPageCached"
      , fromCache, pageNumber, pageSize, sortDirection, sortProperties);
  }

  private async getAllProcessesByStatusPage(status: ProcessStatus, pageNumber: number = 0, pageSize: number = 10
    , sortDirection: SortDirection = null, sortProperties: string = null, fromCache: boolean = true): Promise<Page<Process>> {
    return this.httpClient.post<Page<Process>>(ProcessService.PROCESSES_BY_STATUS_PAGE_URL.replace("{status}", status.toString()),
      { page: pageNumber, size: pageSize, direction: sortDirection, properties: sortProperties });
  }

  public async getAllProcessesByStatusPageCached(status: ProcessStatus, pageNumber: number = 0, pageSize: number = 10
    , sortDirection: SortDirection = null, sortProperties: string = null, fromCache: boolean = true): Promise<Page<Process>> {
    return this.cacheService.invokeFunctionCached(this.getAllProcessesByStatusPage.bind(this, status), Process, "getAllProcessesByStatusPageCached_" + status
      , fromCache, pageNumber, pageSize, sortDirection, sortProperties);
  }
}
