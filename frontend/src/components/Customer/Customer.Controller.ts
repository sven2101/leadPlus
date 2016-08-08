/// <reference path="./Customer.Service.ts" />
/// <reference path="../models/Product.ts" />
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
        this.deepCopyCustomer(this.currentEditCustomer, this.currentCustomer);
        this.isCurrentCustomerNew = false;
    }
    saveCustomer() {
        if (!this.isCurrentCustomerNew) {
            this.deepCopyCustomer(this.currentCustomer, this.currentEditCustomer);
        }
        this.customerService.saveCustomer(this.currentCustomer, this.isCurrentCustomerNew);
    }
    deepCopyCustomer(oldCustomer: Customer, newCustomer: Customer) {
        newCustomer.id = oldCustomer.id;
        newCustomer.name = oldCustomer.name;
    }


}

angular.module("app.customer", ["ngResource"]).controller("CustomerController", CustomerController);

