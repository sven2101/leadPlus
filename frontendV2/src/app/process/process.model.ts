import { WorkflowUnit } from "./../workflow/workflowUnit.model";
import { Processor } from "./processor.model";
import { Comment } from "./../comment/comment.model";
import { User } from "./../user/user.model";
import { ProcessStatus } from "./process-status.enum";

export class Process {
    id: number;
    lead: WorkflowUnit;
    offer: WorkflowUnit;
    sale: WorkflowUnit;
    processor: User;
    status: ProcessStatus;
    comments: Array<Comment>;
    notifications: Array<Notification>;
    followUpAmount: number;
    formerProcessors: Array<Processor>;
    source: ProcessStatus;

    constructor() {
        this.comments = new Array<Comment>();
        this.formerProcessors = [];
    }
}