import { Process } from "./../process/process.model";
import { WorkflowUnit } from "./../workflow/workflowUnit.model";
import { ProcessStatus } from "./../process/process-status.enum";
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

    public static getWorkflowUnitBasedOnProcessStatus(process: Process): WorkflowUnit {
        switch (process.status) {
            case ProcessStatus.OPEN || ProcessStatus.INCONTACT: return process.lead;
            case ProcessStatus.OFFER || ProcessStatus.FOLLOWUP: return process.offer;
            case ProcessStatus.DONE || ProcessStatus.SALE: return process.sale;
            default: break;
        }
        if (process.offer == null) { return process.lead; }
        if (process.sale == null) { return process.offer; }
        return process.sale;
    }

    public static deepCopy<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }

    public static base64Encode(str) {
        let CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        let out = "", i = 0, len = str.length, c1, c2, c3;
        while (i < len) {

            c1 = str.charCodeAt(i++) & 0xff;
            if (i === len) {
                out += CHARS.charAt(c1 >> 2);
                out += CHARS.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i === len) {
                out += CHARS.charAt(c1 >> 2);
                out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += CHARS.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += CHARS.charAt(c3 & 0x3F);
        }
        return out;
    }

}

