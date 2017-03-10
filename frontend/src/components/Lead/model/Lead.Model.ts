/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Workflow/model/IWorkflow.Interface.ts" />
/// <reference path="../../Customer/model/Customer.Model.ts" />
/// <reference path="../../Workflow/model/IWorkflow.Interface.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />

class Lead implements IWorkflow {

    id: number;
    orderPositions: Array<OrderPosition>;
    customer: Customer;
    timestamp: any;
    vendor: any;
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
        this.deliveryCosts = 0;
        this.customer = new Customer();
        this.billingAddress = new Address();
        this.deliveryAddress = new Address();
        this.customer.firstname = "";
        this.customer.lastname = "";
    }
}