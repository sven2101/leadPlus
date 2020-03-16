/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../Product/model/OrderPosition.Model.ts" />

"use strict";

const CustomerControllerId: string = "CustomerController";

class CustomerController {

    $inject = [CustomerServiceId, $locationId, $scopeId];

    customerService: CustomerService;
    location;
    scope;

    pageStart: number = 20;
    searchText: string;
    loadAllCustomers: boolean = false;

    constructor(CustomerService: CustomerService, $location, $scope) {
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

    }

    showCustomer(id: number) {
        if (id === 0) {
            this.location.path("customer/detail/new");
        } else {
            this.location.path("customer/detail/" + id);
        }
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

    getLocalTimestamp: any = function (customer: Customer) {
        return toLocalDate(customer.timestamp);
    };

    goToCustomerDetail(customerId: number) {
        this.location.path("customer/timeline/" + customerId);
    }
}

angular.module(moduleCustomer, [ngResourceId]).controller(CustomerControllerId, CustomerController);

