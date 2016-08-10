/// <reference path="../app/App.Constants.ts" />
/// <reference path="../models/Customer.ts" />
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

const CustomerServiceId: String = "CustomerService";

class CustomerService {

    private $inject = [customerResourceId];

    customerResource;
    customer: Array<Customer>;

    constructor(CustomerResource) {
        this.customerResource = CustomerResource;
        this.customer = new Array<Customer>();
    }

    saveCustomer(customer: Customer, insert: boolean) {
        let self = this;
        console.log(customer);
        if (insert) {
            this.customerResource.createCustomer(customer).$promise.then(function (result: Customer) {
                console.log(result);
                self.customer.push(result);
            });
        } else {
            this.customerResource.updateCustomer(customer).$promise.then(function (result: Customer) {
                console.log(result);
                customer = result;
            });
        }
    }
    getAllCustomer() {
        let self = this;
        this.customerResource.getAllCustomer().$promise.then(function (result: Array<Customer>) {
            console.log(result);
            self.customer = result;
        });
    }
}

angular.module("app.customer.service", ["ngResource"]).service("CustomerService", CustomerService);