/// <reference path="../../Lead/model/Lead.Model.ts" />
/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../Sale/model/Sale.Model.ts" />
/// <reference path="../../Commentary/model/Commentary.Model.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />
/// <reference path="../../Setting/model/Source.Model.ts" />
/// <reference path="../../Process/model/Processor.Model.ts" />

class Process {
    id: number;
    lead: Lead;
    offer: Offer;
    sale: Sale;
    processor: User;
    status: any;
    comments: Array<Commentary>;
    notifications: Array<EmailNotification>;
    followUpAmount: number;
    formerProcessors: Array<Processor>;
    source: Source;
    lastEditor: any;
    lastEdited: string;

    constructor() {
        this.comments = new Array<Commentary>();
        this.formerProcessors = [];
    }
}
