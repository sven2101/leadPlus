/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../common/model/OrderPosition.Model.ts" />

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

    $inject = [CustomerServiceId, $locationId, $scopeId];

    createCustomerForm;
    currentCustomer: Customer;
    currentEditCustomer: Customer;
    isCurrentCustomerNew;
    customerService: CustomerService;
    location;

    customers: Array<Customer>;
    pageStart: number = 20;
    searchText: string;
    loadAllCustomers: boolean = false;

    constructor(CustomerService: CustomerService, $location, $scope) {
        this.customerService = CustomerService;
        this.location = $location;
        this.searchCustomer("noSearchText");
        let self = this;
        $scope.$watch("customerCtrl.searchText", function (searchText) {
            if (!isNullOrUndefined(searchText) && searchText.length !== 0) {
                self.searchCustomer(searchText);
            } else if (!isNullOrUndefined(searchText) && searchText.length === 0) {
                self.searchCustomer("noSearchText");
            }
        });
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

    searchCustomer(searchText: string) {
        this.pageStart = 1;
        this.customerService.pagingCustomers = new Array<Customer>();
        this.customerService.getAllCustomerByPage(this.pageStart, 20, searchText, this.loadAllCustomers);
        this.pageStart += 20;
    }

    loadNextCustomers() {
        let searchText = this.searchText;
        if (isNullOrUndefined(searchText) || searchText.length === 0) {
            searchText = "noSearchText";
        }
        this.customerService.getAllCustomerByPage(this.pageStart, 20, searchText, this.loadAllCustomers);
        this.pageStart += 20;
    }

    saveCustomer() {
        if (!this.isCurrentCustomerNew) {
            shallowCopy(this.currentCustomer, this.currentEditCustomer);
        }
        this.customerService.saveCustomer(this.currentCustomer, this.isCurrentCustomerNew);
        this.searchText = "";
    }

    getLocalTimestamp: any = function (customer: Customer) {
        return toLocalDate(customer.timestamp);
    };

    goToCustomerDetail(customerId: number) {
        this.location.path("customer/detail/" + customerId);
    }
}

angular.module(moduleCustomer, [ngResourceId]).controller(CustomerControllerId, CustomerController);

