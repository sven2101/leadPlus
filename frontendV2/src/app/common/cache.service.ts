import { ObjectUpdatedMessage } from "./../common/object-updated-message";
import { MessagingService } from "./../messaging/messaging.service";
import { Process } from "./../process/process.model";
import { Page } from "./page.interface";
import { Common } from "./common";
import { SortDirection } from "./sort-direction.enum";
import { Injectable } from "@angular/core";

@Injectable()
export class CacheService {

  private static readonly CACHE_LIFESPAN = 1000 * 60 * 10;
  private static readonly CACHE_ENABLED = true;

  private cache: {
    [key: string]: {
      [key: string]: {
        filterSettings: string;
        timestamp: number;
        pages: {
          [key: string]: Page<any>
        }
      }
    }
  } = {};

  constructor(private messagingService: MessagingService) {
    this.messagingService.of(ObjectUpdatedMessage).subscribe(m => this.updateObjectInCache(m.type, m.object));
  }

  public async invokeFunctionCached(method: (...args: any[]) => Page<any>, cachedObjectType: { new (...args: any[]) }, cacheName: string, fromCache: boolean
    , pageNumber: number = 0, pageSize: number = 10, sortDirection: SortDirection = null, sortProperties: string = null
    , cacheExpireTime: number = CacheService.CACHE_LIFESPAN): Promise<Page<any>> {

    const resultFromCache = this.retireveDataFromCache(cachedObjectType, cacheName, pageSize + "_" + sortDirection + "_" + sortProperties
      , pageNumber, cacheExpireTime);

    if (resultFromCache != null && CacheService.CACHE_ENABLED === true && fromCache === true) {
      console.log("fromCache");
      return resultFromCache;
    }
    this.cache[cachedObjectType.name][cacheName].pages[pageNumber] = await method(pageNumber, pageSize, sortDirection, sortProperties);
    return this.cache[cachedObjectType.name][cacheName].pages[pageNumber];
  }

  private retireveDataFromCache(cachedObjectType: { new (...args: any[]) }, cacheName: string, filterSettings: string, pageNumber: number = 0
    , cacheExpireTime: number = CacheService.CACHE_LIFESPAN): Page<any> | null {

    if (this.cache[cachedObjectType.name] == null) {
      this.cache[cachedObjectType.name] = {};
    }
    if (this.cache[cachedObjectType.name][cacheName] == null
      || this.cache[cachedObjectType.name][cacheName].filterSettings !== filterSettings
      || this.cache[cachedObjectType.name][cacheName].timestamp < Date.now()) {
      this.cache[cachedObjectType.name][cacheName] = {
        filterSettings: filterSettings,
        timestamp: Date.now() + cacheExpireTime,
        pages: {}
      };
    } else if (CacheService.CACHE_ENABLED === true && this.cache[cachedObjectType.name][cacheName].pages[pageNumber] != null) {
      return this.cache[cachedObjectType.name][cacheName].pages[pageNumber];
    }
    return null;
  }

  private updateObjectInCache(cachedObjectType: { new (...args: any[]) }, obj: {}): void {

    Object.keys(this.cache[cachedObjectType.name])
      .map(key => this.cache[cachedObjectType.name][key])
      .map(value => value.pages)
      .forEach(page => {
        Object.keys(page)
          .map(key => page[key])
          .map(value => value.content)
          .filter(c => c != null)
          .forEach(objects => {
            objects.filter(cachedObj => cachedObj["id"] != null && cachedObj["id"] === obj["id"])
              .forEach(cachedObj => {
                Object.keys(cachedObj)
                  .forEach(key => cachedObj[key] = obj[key]);
                Object.keys(obj)
                  .forEach(key => cachedObj[key] = obj[key]);
              });
          });
      });
  }

}
