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
    deliveryAddress: any;
    message: string;
    deliveryCosts: number;


    constructor() {
        this.deliveryCosts = 0;
        this.customer = new Customer();
        this.customer.firstname = "";
        this.customer.lastname = "";
    }
}