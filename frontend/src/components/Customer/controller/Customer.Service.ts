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

    private $inject = [CustomerResourceId, $httpId];

    customerResource: any;
    pagingCustomers: Array<Customer> = new Array<Customer>();
    searchCustomers: Array<Customer> = new Array<Customer>();
    page: any;
    http: any;

    constructor(CustomerResource: CustomerResource, $http) {
        this.customerResource = CustomerResource.resource;
        this.http = $http;
        this.getAllCustomerByPage(1, 20, "noSearchText", false);
    }

    saveCustomer(customer: Customer, insert: boolean = true) {
        let self = this;
        if (insert) {
            customer.timestamp = newTimestamp();
            customer.realCustomer = true;
            this.customerResource.createCustomer(customer).$promise.then(function (result: Customer) {
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
    async updateCustomer(customer: Customer): Promise<Customer> {
        return await this.customerResource.updateCustomer(customer);
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