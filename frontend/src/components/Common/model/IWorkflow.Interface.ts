/// <reference path="../../common/model/OrderPosition.Model.ts" />
/// <reference path="../../Customer/model/Customer.Model.ts" />
interface IWorkflow {
    customer: Customer;
    deliveryAddress: string;
    orderPositions: Array<OrderPosition>;
    timestamp;
    vendor;
}