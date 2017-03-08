/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../Product/model/OrderPosition.Model.ts" />

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

    $inject = [CustomerServiceId, $locationId, $scopeId, ngMapId];

    createCustomerForm;
    currentCustomer: Customer;
    currentEditCustomer: Customer;
    isCurrentCustomerNew;
    customerService: CustomerService;
    location;
    scope;

    customers: Array<Customer>;
    pageStart: number = 20;
    searchText: string;
    loadAllCustomers: boolean = false;
    searchTypes = ["address"];
    billingAddressGoogleSearch: string;
    deliveryAddressGoogleSearch: string;
    billingAddressPlaceChanged: any;
    deliveryAddressPlaceChanged: any;


    constructor(CustomerService: CustomerService, $location, $scope, NgMap) {
        this.customerService = CustomerService;
        this.location = $location;
        this.searchCustomer("noSearchText");
        let self = this;
        this.scope = $scope;
        $scope.$watch("customerCtrl.searchText", function (searchText) {
            if (!isNullOrUndefined(searchText) && searchText.length !== 0) {
                self.searchCustomer(searchText);
            } else if (!isNullOrUndefined(searchText) && searchText.length === 0) {
                self.searchCustomer("noSearchText");
            }
        });
        this.initPlaceChanged(self);
    }

    initPlaceChanged(self) {
        this.billingAddressPlaceChanged = function () {
            let place = this.getPlace();
            if (!isNullOrUndefined(place)) {
                self.customerService.matchAddressCompoenents(place.address_components, self.currentCustomer.billingAddress);
            }
        };
        this.deliveryAddressPlaceChanged = function () {
            let place = this.getPlace();
            if (!isNullOrUndefined(place)) {
                self.customerService.matchAddressCompoenents(place.address_components, self.currentCustomer.deliveryAddress);
            }
        };
    }

    copyBillingAddress() {
        this.currentCustomer.deliveryAddress = deepCopy(this.currentCustomer.billingAddress);
    }

    clearCustomer(): void {
        this.createCustomerForm.$setPristine();
        this.currentCustomer = new Customer();
        this.isCurrentCustomerNew = true;
        this.billingAddressGoogleSearch = "";
        this.deliveryAddressGoogleSearch = "";
    }

    editCustomer(customer: Customer): void {
        this.currentEditCustomer = customer;
        this.currentCustomer = new Customer();
        shallowCopy(this.currentEditCustomer, this.currentCustomer);
        this.isCurrentCustomerNew = false;
    }

    searchCustomer(searchText: string) {
        if (isNullOrUndefined(searchText) || searchText.length === 0) {
            searchText = "noSearchText";
        }
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

    async saveCustomer() {
        if (!this.isCurrentCustomerNew) {
            shallowCopy(this.currentCustomer, this.currentEditCustomer);
        }
        await this.customerService.saveCustomer(this.currentCustomer, this.isCurrentCustomerNew);
        if (!isNullOrUndefined(this.searchText) && this.searchText.length > 0) {
            this.searchText = "";
        } else {
            this.searchCustomer("noSearchText");
        }
    }

    getLocalTimestamp: any = function (customer: Customer) {
        return toLocalDate(customer.timestamp);
    };

    goToCustomerDetail(customerId: number) {
        this.location.path("customer/detail/" + customerId);
    }
}

angular.module(moduleCustomer, [ngResourceId]).controller(CustomerControllerId, CustomerController);

