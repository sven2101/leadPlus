import { CachableObject } from "./cachable-object.interface";
import { ObjectUpdatedMessage } from "./../common/object-updated-message";
import { MessagingService } from "./../messaging/messaging.service";
import { Process } from "./../process/process.model";
import { Page } from "./page.interface";
import { Common } from "./common";
import { SortDirection } from "./sort-direction.enum";
import { Injectable } from "@angular/core";

@Injectable()
export class CacheService {

  private static readonly CACHE_LIFESPAN = 1000 * 60 * 1;
  private static readonly CACHE_ENABLED = true;

  private cache: {
    [key: string]: {
      [key: string]: {
        filterSettings: string;
        timestamp: number;
        cacheExpireTime;
        pages: {
          [key: string]: Page<CachableObject>
        }
      }
    }
  } = {};

  constructor(private messagingService: MessagingService) {
    this.messagingService.of(ObjectUpdatedMessage).subscribe(m => this.updateObjectInCache(m.type, m.object));
    setInterval(async () => {
      console.log("dirtyCecking...");
      await this.setOldCacheDirty();
    }, 1000 * 60 * 0.5);
  }

  /**
  * tries to retrieve data from cache, if cache is invalid(empty/dirty/old) or fromCache==true provided methode is called and result is stored in Cache
  * @param{method} method to be invoked and cached
  * @param{cachedObjectType} type of object to be retrieved, used as name for sub-cache
  * @param{cacheName} will override sub-sub-cache with name "cacheName"
  */
  public async invokeFunctionCached<T extends CachableObject>(method: (...args: any[]) => Page<CachableObject>, cachedObjectType: { new (...args: any[]) }
    , cacheName: string, loadFromCache: boolean, pageNumber: number = 0, pageSize: number = 10, sortDirection: SortDirection = null
    , sortProperties: string = null, cacheExpireTime: number = CacheService.CACHE_LIFESPAN): Promise<Page<T>> {

    const resultFromCache = this.retireveDataFromCache(cachedObjectType, cacheName, pageSize + "_" + sortDirection + "_" + sortProperties, pageNumber
      , cacheExpireTime);

    if (resultFromCache != null && loadFromCache === true) {
      console.log("fromCache", resultFromCache);
      return resultFromCache as Page<T>;
    }
    this.cache[cachedObjectType.name][cacheName].pages[pageNumber] = await method(pageNumber, pageSize, sortDirection, sortProperties);
    const currentPage = this.cache[cachedObjectType.name][cacheName].pages[pageNumber];
    currentPage.responsibleMethod = method.bind(null, pageNumber, pageSize, sortDirection, sortProperties);
    currentPage._dirty = false;
    currentPage._active = [];
    currentPage.setActiveFlag = this.setActive.bind(this, currentPage);
    currentPage.removeActiveFlag = (context) => currentPage._active.splice(currentPage._active.indexOf(context), 1);
    currentPage.setDirty = this.setDirty.bind(this, currentPage);
    return currentPage as Page<T>;
  }

  /**
   * tries to retrieve data from cache, if cache is invalid(empty/dirty/old) cache is initialized
   * @return returns cached page if cache is valid, returns null if cache is invalid
   */
  private retireveDataFromCache(cachedObjectType: { new (...args: any[]) }, cacheName: string, filterSettings: string
    , pageNumber: number = 0, cacheExpireTime: number = CacheService.CACHE_LIFESPAN): Page<CachableObject> | null {

    if (this.cache[cachedObjectType.name] == null) {
      this.cache[cachedObjectType.name] = {};
    }
    if (this.cache[cachedObjectType.name][cacheName] == null
      || this.cache[cachedObjectType.name][cacheName].filterSettings !== filterSettings
      || this.cache[cachedObjectType.name][cacheName].timestamp < Date.now()) {
      this.cache[cachedObjectType.name][cacheName] = {
        filterSettings: filterSettings,
        timestamp: Date.now() + cacheExpireTime,
        cacheExpireTime: cacheExpireTime,
        pages: {}
      };
    } else if (CacheService.CACHE_ENABLED === true && this.cache[cachedObjectType.name][cacheName].pages[pageNumber] != null) {
      return this.cache[cachedObjectType.name][cacheName].pages[pageNumber] as Page<CachableObject>;
    }
    return null;
  }

  private async replayCachedMethode(oldPage: Page<CachableObject>): Promise<void> {
    const newPage = await oldPage.responsibleMethod();
    oldPage.content.length = 0;
    oldPage.content.push(...newPage.content);
    oldPage._dirty = false;
    console.log("replay", newPage);
  }

  private async setDirty(page: Page<CachableObject>): Promise<void> {
    page._dirty = true;
    if (page._active.length !== 0) { await this.replayCachedMethode(page); }
  }

  private async setActive(page: Page<CachableObject>, context: any): Promise<void> {
    page._active.push(context)
    if (page._dirty === true) { await this.replayCachedMethode(page); }
  }

  private async setOldCacheDirty(): Promise<void> {
    Object.keys(this.cache)
      .map(key => this.cache[key])
      .map(cache => {
        Object.keys(cache)
          .map(key => cache[key])
          .filter(c => c.timestamp < Date.now())
          .map(c => {
            c.timestamp = Date.now() + c.cacheExpireTime;
            return c.pages;
          })
          .map(c => Object.keys(c).map(key => c[key].setDirty()));
      });
  }

  /**
   * updates object in cache by id
   */
  private updateObjectInCache(cachedObjectType: { new (...args: any[]) }, newObject: {}): void {

    Object.keys(this.cache[cachedObjectType.name])
      .map(key => this.cache[cachedObjectType.name][key])
      .map(value => value.pages)
      .forEach(page => {
        Object.keys(page)
          .map(key => page[key])
          .map(value => value.content)
          .filter(c => c != null)
          .forEach(objects => {
            objects.filter(cachedObj => cachedObj["id"] != null && cachedObj["id"] === newObject["id"])
              .forEach(cachedObj => {
                Object.keys(cachedObj)
                  .forEach(key => cachedObj[key] = newObject[key]);
                Object.keys(newObject)
                  .forEach(key => cachedObj[key] = newObject[key]);
              });
          });
      });
  }

}
