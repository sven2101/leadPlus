/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Workflow/model/Address.Model.ts" />

class Customer {

    id: number;
    title: string;
    firstname: string;
    lastname: string;
    company: string;
    email: string;
    phone: string;
    fax: string;
    mobile: string;
    address: string;
    timestamp: any;
    deactivated: boolean;
    customerNumber: string;
    realCustomer: boolean;
    addresses: Address;

    constructor() {
    }
}