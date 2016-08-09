/// <reference path="./Customer.Service.ts" />
/// <reference path="../app/App.Common.ts" />
/// <reference path="../Product/Product.Service.ts" />
/// <reference path="../models/Product.ts" />
/// <reference path="../models/OrderPosition.ts" />
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

    $inject = [CustomerServiceId, ProductServiceId];

    createCustomerForm;
    currentCustomer: Customer;
    currentEditCustomer: Customer;
    isCurrentCustomerNew;
    customerService: CustomerService;

    currentOrderPositions: Array<OrderPosition>;
    currentProductId = "Please choose product";
    currentProductAmount = 1;
    productService: ProductService;

    constructor(CustomerService: CustomerService, ProductService: ProductService) {
        this.customerService = CustomerService;
        this.productService = ProductService;
        this.currentOrderPositions = new Array<OrderPosition>();
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


    addProduct() {
        if (!isNaN(Number(this.currentProductId)) && Number(this.currentProductId) > 0) {
            let tempProduct = findElementById(this.productService.products, Number(this.currentProductId));
            let tempOrderPosition = new OrderPosition();
            tempOrderPosition.product = tempProduct as Product;
            tempOrderPosition.amount = this.currentProductAmount;
            this.currentOrderPositions.push(tempOrderPosition);
        }
    }
    deleteProduct(index: number) {
        this.currentOrderPositions.splice(index, 1);
    }
    sumOrderPositions(): number {
        let sum = 0;
        for (let i = 0; i < this.currentOrderPositions.length; i++) {
            let temp = this.currentOrderPositions[i];
            if (!isNullOrUndefined(temp) && !isNaN(temp.amount) && !isNullOrUndefined(temp.product) && !isNaN(temp.product.priceNetto)) {
                sum += temp.amount * temp.product.priceNetto;
            }
        }
        return sum;
    }



}

angular.module("app.customer", ["ngResource"]).controller("CustomerController", CustomerController);

