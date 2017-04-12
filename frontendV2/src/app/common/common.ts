import * as moment from "moment";
import * as jstz from "jstz";

export class Common {

    public static newTimestamp(): string {
        const pattern = "DD.MM.YYYY HH:mm:ss:SSS";
        const timezone = jstz.determine().name();
        const date: any = moment.utc();
        // return date.tz(timezone).format(pattern);
        return date.format(pattern);
    };
}

