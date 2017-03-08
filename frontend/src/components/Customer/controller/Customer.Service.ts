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

    private $inject = [CustomerResourceId, $httpId, toasterId, $translateId];

    customerResource: any;
    pagingCustomers: Array<Customer> = new Array<Customer>();
    searchCustomers: Array<Customer> = new Array<Customer>();
    page: any;
    http: any;
    toaster: any;
    translate: any;

    constructor(CustomerResource: CustomerResource, $http, toaster, $translate) {
        this.customerResource = CustomerResource.resource;
        this.http = $http;
        this.toaster = toaster;
        this.translate = $translate;
        this.getAllCustomerByPage(1, 20, "noSearchText", false);
    }

    async saveCustomer(customer: Customer, insert: boolean = true): Promise<Customer> {
        let self = this;
        if (insert) {
            customer.timestamp = newTimestamp();
            customer.realCustomer = true;
            customer = await this.customerResource.createCustomer(customer).$promise as Customer;
        } else {
            customer = await this.customerResource.updateCustomer(customer).$promise as Customer;
        }
        return customer;
    }

    async insertCustomer(customer: Customer): Promise<Customer> {
        return await this.customerResource.createCustomer(customer).$promise as Customer;
    }

    async updateCustomer(customer: Customer): Promise<Customer> {
        return await this.customerResource.updateCustomer(customer).$promise as Customer;
    }

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
}

angular.module(moduleCustomerService, [ngResourceId]).service(CustomerServiceId, CustomerService);