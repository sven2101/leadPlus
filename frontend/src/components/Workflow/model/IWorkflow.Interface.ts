/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Customer/model/Customer.Model.ts" />

interface IWorkflow {
    id: number;
    customer: Customer;
    deliveryAddress: string;
    orderPositions: Array<OrderPosition>;
    timestamp;
    vendor;
}