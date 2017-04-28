import { Processor } from "./processor.model";
import { Comment } from "./../comment/comment.model";
import { Sale } from "./../workflow/sale.model";
import { Offer } from "./../workflow/offer.model";
import { Lead } from "./../workflow/lead.model";
import { User } from "./../user/user.model";
import { Status } from "./status.enum";

export class Process {
    id: number;
    lead: Lead;
    offer: Offer;
    sale: Sale;
    processor: User;
    status: any;
    comments: Array<Comment>;
    notifications: Array<Notification>;
    followUpAmount: number;
    formerProcessors: Array<Processor>;
    source: Status;

    constructor() {
        this.comments = new Array<Comment>();
        this.formerProcessors = [];
    }
}