/// <reference path="./Customer.Service.ts" />
/// <reference path="../app/App.Common.ts" />
/// <reference path="../Product/Product.Service.ts" />
/// <reference path="../Product/Product.Model.ts" />
/// <reference path="../Common/OrderPosition.Model.ts" />
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

const CustomerControllerId: string = "CustomerController";

class CustomerController {

    $inject = [CustomerServiceId];

    createCustomerForm;
    currentCustomer: Customer;
    currentEditCustomer: Customer;
    isCurrentCustomerNew;
    customerService: CustomerService;

    constructor(CustomerService: CustomerService) {
        this.customerService = CustomerService;
    }
    refreshData(): void {
        this.customerService.getAllCustomer();
    }

    clearCustomer(): void {
        this.createCustomerForm.$setPristine();
        this.currentCustomer = new Customer();
        this.isCurrentCustomerNew = true;
    }

    editCustomer(customer: Customer): void {
        this.currentEditCustomer = customer;
        this.currentCustomer = new Customer();
        shallowCopy(this.currentEditCustomer, this.currentCustomer);
        this.isCurrentCustomerNew = false;
    }
    saveCustomer() {
        if (!this.isCurrentCustomerNew) {
            shallowCopy(this.currentCustomer, this.currentEditCustomer);
        }
        this.customerService.saveCustomer(this.currentCustomer, this.isCurrentCustomerNew);
    }
    getLocalTimestamp: any = function (customer: Customer) {
        return toLocalDate(customer.timestamp);
    };
}

angular.module(moduleCustomer, [ngResourceId]).controller(CustomerControllerId, CustomerController);

