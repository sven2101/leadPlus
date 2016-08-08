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

    private $inject = [CustomerResourceId];

    test: String;
    constructor() {
        this.test = "Hi";
    }
}

angular.module("app.customer.service", ["ngResource"]).service("CustomerService", CustomerService);