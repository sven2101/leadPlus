import { Address } from "./address.model";
import { Customer } from "./../customer/customer.model";
import { OrderPosition } from "./../product/order-position.model";

export class Offer {
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
