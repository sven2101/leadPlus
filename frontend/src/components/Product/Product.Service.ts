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

class ProductService {

    $inject = ["toaster", "$translate"];

    currentProduct: Product;
    products: Array<Product>;
    toaster;
    translate;

    constructor(toaster, $translate) {
        this.toaster = toaster;
        this.translate = $translate;

        this.currentProduct = new Product();
        this.products = new Array<Product>();

        let x = new Product();
        x.productName = "TestName";
        x.price = 5.50;
        x.description = "Das ist ein super tolles Produkt";
        this.products.push(x);
    }
    saveProduct() {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].productName === this.currentProduct.productName) {
                this.toaster.pop("error", "", this.translate.instant("SIGNUP_ERROR"));
                return;
            }
        }
        this.products.push(this.currentProduct);

    }


}

angular.module("app.product.service", ["ngResource"]).service("ProductService", ProductService);