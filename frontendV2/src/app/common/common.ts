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
}

