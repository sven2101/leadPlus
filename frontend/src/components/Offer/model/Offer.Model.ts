/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Workflow/model/IWorkflow.Interface.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />

class Offer implements IWorkflow {

    id: number;
    orderPositions: Array<OrderPosition>;
    customer: Customer;
    timestamp: any;
    vendor: any;
    deliveryAddress: any;
    deliveryDate: any;
    netPrice: number;
    deliveryCosts: number;
    message: string;
    vat: number;

    constructor() {
        this.deliveryCosts = 0;
        this.netPrice = 0;
        this.vat = 0;
    }
}