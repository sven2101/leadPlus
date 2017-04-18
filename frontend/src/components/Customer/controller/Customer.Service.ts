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

    private $inject = [CustomerResourceId, $httpId, toasterId, $translateId, $rootScopeId];

    customerResource: any;
    pagingCustomers: Array<Customer> = new Array<Customer>();
    searchCustomers: Array<Customer> = new Array<Customer>();
    page: any;
    http: any;
    toaster: any;
    translate: any;
    rootScope: any;

    constructor(CustomerResource: CustomerResource, $http, toaster, $translate, $rootScope) {
        this.customerResource = CustomerResource.resource;
        this.http = $http;
        this.toaster = toaster;
        this.translate = $translate;
        this.rootScope = $rootScope;
        // this.getAllCustomerByPage(1, 20, "noSearchText", false);
    }

    async saveCustomer(customer: Customer, insert: boolean = true): Promise<Customer> {
        customer.lastEditor = getNameOfUser(this.rootScope.user);
        if (insert) {
            customer.timestamp = newTimestamp();
            customer.realCustomer = true;
            try {
                customer = await this.customerResource.createCustomer(customer).$promise;
            } catch (error) {
                this.showCustomerErrorMessage(error);
                return null;
            }

        } else {
            try {
                customer = await this.customerResource.updateCustomer(customer).$promise;
            } catch (error) {
                this.showCustomerErrorMessage(error);
                return null;
            }
        }
        return customer;
    }

    showCustomerErrorMessage(error) {
        let errorMessage = "";
        if (error.data != null && error.data.exception === "dash.common.ConsistencyFailedException") {
            if (error.data.message !== null) {
                let splitAryMsg = error.data.message.split(";");
                if (splitAryMsg.length >= 1) {
                    let editedBy = splitAryMsg[0];
                    let jsDate = new Date(splitAryMsg[1]);
                    console.log(jsDate);
                    console.log(jsDate.toString());
                    let editedAt = toLocalDate(moment(jsDate.toString(), "DD.MM.YYYY HH:mm:ss"));
                    console.log(editedAt);
                    errorMessage = this.translate.instant("CUSTOMER_INCONSISTENCY_BY_AT_ERROR", { editedBy: editedBy, editedAt: editedAt });
                } else {
                    errorMessage = this.translate.instant("CUSTOMER_INCONSISTENCY_ERROR");
                }
            }
            return this.toaster.pop("error", "", errorMessage);
        }
        errorMessage = error == null || error.data == null ? "" : ": " + error.data.message;
        this.toaster.pop("error", "", this.translate.instant("SAVE_ERROR") + errorMessage);
    }

    async getCustomerById(customerId: number) {
        let customer = await this.customerResource.getCustomerById({ id: customerId }).$promise as Customer;
        if (isNullOrUndefined(customer.id)) {
            return null;
        }
        return customer;
    }

    async insertCustomer(customer: Customer): Promise<Customer> {
        customer.lastEditor = getNameOfUser(this.rootScope.user);
        try {
            return await this.customerResource.createCustomer(customer).$promise as Customer;
        } catch (error) {
            this.showCustomerErrorMessage(error);
            return null;
        }
    }

    async updateCustomer(customer: Customer): Promise<Customer> {

        customer.lastEditor = getNameOfUser(this.rootScope.user);
        try {
            return await this.customerResource.updateCustomer(customer).$promise as Customer;
        } catch (error) {
            this.showCustomerErrorMessage(error);
            return null;
        }
    }

    // TODO change to mapzen api
    matchAddressCompoenents(addressCompoenentArray: Array<any>, address: Address) {
        if (isNullOrUndefined(addressCompoenentArray)) {
            return;
        }
        address.street = "";
        address.number = "";
        address.city = "";
        address.state = "";
        address.country = "";
        address.zip = "";
        for (let addressComponent of addressCompoenentArray) {
            if (!isNullOrUndefined(addressComponent.types)) {
                for (let type of addressComponent.types) {
                    if (type === "postal_code") {
                        address.zip = addressComponent.long_name;
                    } else if (type === "country") {
                        address.country = addressComponent.long_name;
                    } else if (type === "administrative_area_level_1") {
                        address.state = addressComponent.long_name;
                    } else if (type === "locality") {
                        address.city = addressComponent.long_name;
                    } else if (type === "route") {
                        address.street = addressComponent.long_name;
                    } else if (type === "street_number") {
                        address.number = addressComponent.long_name;
                    }
                }
            }
        }
    }

    getAddressLine(address: Address) {
        if (isNullOrUndefined(address)) {
            return "";
        }
        let addressStr: string = "";
        if (!isNullOrUndefined(address.street) && address.street !== "") {
            addressStr += address.street;
            if (!isNullOrUndefined(address.number)) {
                addressStr += " " + address.number;
            }
            addressStr += ", ";
        }
        if (!isNullOrUndefined(address.city) && address.city !== "") {
            if (!isNullOrUndefined(address.zip)) {
                addressStr += address.zip + " ";
            }
            addressStr += address.city;
            addressStr += ", ";
        }
        if (!isNullOrUndefined(address.state) && address.state !== "") {
            addressStr += address.state;
            addressStr += ", ";
        }
        if (!isNullOrUndefined(address.country)) {
            addressStr += address.country;
        }
        if (addressStr.endsWith(", ")) {
            addressStr = addressStr.slice(0, -2);
        }
        return addressStr;
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


    getCustomerBySearchText(searchtext: string): any {
        if (!isNullOrUndefined(searchtext) && searchtext.length > 0) {
            let self = this;
            return this.http.get("/api/rest/customer/search/" + searchtext).then(function (response) {
                let temp: Array<Customer> = new Array<Customer>();
                for (let customer of response.data) {
                    if (customer.deactivated === false) {
                        self.searchCustomers.push(customer);
                        temp.push(customer);
                    }
                }
                return temp;
            });
        }
    }
    async deleteCustomer(customer: Customer): Promise<void> {
        await this.customerResource.deleteCustomer({ id: customer.id }).$promise;
    }
}

angular.module(moduleCustomerService, [ngResourceId]).service(CustomerServiceId, CustomerService);