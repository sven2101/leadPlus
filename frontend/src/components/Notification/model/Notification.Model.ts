/// <reference path="../../Customer/model/Customer.Model.ts" />
/// <reference path="../../FileUpload/model/FileUpload.Model.ts" />
/// <reference path="./NotificationType.ts" />

class EmailNotification {

    id: number;
    recipients: string;
    recipientsCC: string;
    recipientsBCC: string;
    subject: string;
    content: string;
    attachments: Attachment[];
    notificationType: NotificationType;
    sender: User;
    timestamp: any;

    constructor() {
    }
}
