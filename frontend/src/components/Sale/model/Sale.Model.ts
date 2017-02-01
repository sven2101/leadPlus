/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Workflow/model/IWorkflow.Interface.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />

class Sale implements IWorkflow {

    id: number;
    orderPositions: Array<OrderPosition>;
    customer: Customer;
    timestamp: any;
    vendor: any;
    deliveryAddress: any;
    deliveryDate: any;
    saleTurnover: number;
    saleProfit: number;
    saleCost: number;
    deliveryCosts: number;
    invoiceNumber: string;
    message: string;


    constructor() {
        this.deliveryCosts = 0;
        this.saleCost = 0;
        this.saleTurnover = 0;
        this.saleProfit = 0;
    }
}