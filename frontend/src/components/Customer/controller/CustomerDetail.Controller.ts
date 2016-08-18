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

const CustomerDetailControllerId: string = "CustomerDetailController";

class CustomerDetailController {

    $inject = [CustomerServiceId, "$routeParams"];

    customerService: CustomerService;
    routeParams;

    constructor(CustomerService: CustomerService, $routeParams) {
        this.customerService = CustomerService;
        this.routeParams = $routeParams;
    }

}

angular.module(moduleCustomerDetail, [ngResourceId]).controller(CustomerDetailControllerId, CustomerDetailController);

