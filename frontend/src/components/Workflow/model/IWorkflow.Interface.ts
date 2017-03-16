/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Customer/model/Customer.Model.ts" />

interface IWorkflow {
    id: number;
    customer: Customer;
    deliveryAddressLine: string;
    orderPositions: Array<OrderPosition>;
    timestamp;
    vendor;
    deliveryDate;
    deliveryAddress: Address;
    deliveryCosts: number;
    billingAddress: Address;
    deliveryTerm: string;
    paymentTerm: string;
    skonto: number;
}