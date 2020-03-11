import { OrderPosition } from "./../product/order-position.model";
import { Customer } from "./../customer/customer.model";
import { Address } from "./address.model";
export class WorkflowUnit {
    id: number;
    orderPositions: Array<OrderPosition>;
    customer: Customer;
    timestamp: any;
    vendor: any;
    deliveryDate: any;
    saleTurnover: number;
    saleProfit: number;
    saleCost: number;
    deliveryCosts: number;
    invoiceNumber: string;
    message: string;
    deliveryAddressLine: string;
    deliveryTerm: string;
    paymentTerm: string;
    skonto: number;
    deliveryAddress: Address;
    billingAddress: Address;


    constructor() {
        this.skonto = 0;
        this.deliveryAddress = new Address();
        this.billingAddress = new Address();
        this.deliveryCosts = 0;
        this.saleCost = 0;
        this.saleTurnover = 0;
        this.saleProfit = 0;
        this.invoiceNumber = "";
    }
}