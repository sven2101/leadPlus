import { Address } from "./address.model";
import { Customer } from "./../customer/customer.model";
import { OrderPosition } from "./../product/order-position.model";


export class Lead {
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
