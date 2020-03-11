import { Pipe, PipeTransform } from "@angular/core";

import * as moment from "moment";
import * as jstz from "jstz";
@Pipe({
  name: "toLocalTimestamp"
})
export class ToLocalTimestampPipe implements PipeTransform {

  private static toLocalDate(date: any, pattern: string = "DD.MM.YYYY HH:mm:SS"): string {
    const timezone = jstz.determine().name();
    const currentDateUtc: any = moment.utc(date, pattern);
    // const currentDateLocal = currentDateUtc.tz(timezone);

    const x = currentDateUtc.format(pattern);
    return currentDateUtc.format(pattern);
  };

  transform(value: any, args?: any): any {
    return ToLocalTimestampPipe.toLocalDate(value, args);
  }



}
