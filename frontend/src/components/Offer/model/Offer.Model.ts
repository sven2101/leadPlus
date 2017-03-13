/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Workflow/model/IWorkflow.Interface.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />

class Offer implements IWorkflow {

    id: number;
    orderPositions: Array<OrderPosition>;
    customer: Customer;
    timestamp: any;
    vendor: any;
    netPrice: number;
    vat: number;
    deliveryAddressLine: string;
    deliveryDate: any;
    deliveryTerm: string;
    paymentTerm: string;
    skonto: number;
    deliveryAddress: Address;
    message: string;
    deliveryCosts: number;
    billingAddress: Address;

    constructor() {
        this.skonto = 0;
        this.deliveryAddress = new Address();
        this.billingAddress = new Address();
        this.deliveryCosts = 0;
        this.netPrice = 0;
        this.vat = 0;
    }
}