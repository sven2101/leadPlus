/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../../typeDefinitions/Moment.d.ts" />
/// <reference path="../../Customer/model/Customer.Model.ts" />
/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH. All rights reserved.
 * 
 * NOTICE: All information contained herein is, and remains the property of
 * Eviarc GmbH and its suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to Eviarc GmbH, and are protected
 * by trade secret or copyright law. Dissemination of this information or
 * reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Eviarc GmbH.
 ******************************************************************************/
"use strict";

const CustomerServiceId: string = "CustomerService";

class CustomerService {

    private $inject = [CustomerResourceId];

    customerResource: any;
    customers: Array<Customer>;
    pagingCustomers: Array<Customer> = new Array<Customer>();
    page: any;

    constructor(CustomerResource: CustomerResource) {
        this.customerResource = CustomerResource.resource;
        this.customers = new Array<Customer>();
        this.getAllCustomer();
        this.getAllCustomerByPage(1, 20, "noSearchText", false);
    }

    saveCustomer(customer: Customer, insert: boolean = true) {
        let self = this;
        if (insert) {
            customer.timestamp = newTimestamp();
            customer.realCustomer = true;
            this.customerResource.createCustomer(customer).$promise.then(function (result: Customer) {
                self.customers.push(result);
                self.pagingCustomers.push(result);
            });
        } else {
            this.customerResource.updateCustomer(customer).$promise.then(function (result: Customer) {
                customer = result;
            });
        }
    }

    insertCustomer(customer: Customer) {
        return this.customerResource.createCustomer(customer).$promise;
    }

    getAllCustomer() {
        let self = this;
        this.customerResource.getRealCustomer().$promise.then(function (result: Array<Customer>) {
            self.customers = result;
        });
    }

    getAllCustomerByPage(start: number, length: number, searchtext: string, allCustomers: boolean) {
        let self = this;
        this.customerResource.getAllCustomerByPage({ start: start, length: length, searchtext: searchtext, allCustomers: allCustomers }).$promise.then(function (result: any) {
            self.page = result;
            for (let customer of result.content) {
                self.pagingCustomers.push(customer);
            }
        });
    }

    getActiveCustomers(): Array<Customer> {
        let temp: Array<Customer> = new Array<Customer>();
        for (let customer of this.customers) {
            if (customer.deactivated === false) {
                temp.push(customer);
            }
        }
        return temp;
    }
}

angular.module(moduleCustomerService, [ngResourceId]).service(CustomerServiceId, CustomerService);