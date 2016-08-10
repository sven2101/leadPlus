/// <reference path="../models/Product.ts" />
/// <reference path="../app/App.Constants.ts" />
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

const ProductServiceId: String = "ProductService";

class ProductService {

    private $inject = [toasterId, $translateId, productResourceId];

    products: Array<Product>;
    toaster;
    translate;
    productResource;

    constructor(toaster, $translate, ProductResource) {
        this.toaster = toaster;
        this.translate = $translate;
        this.productResource = ProductResource;
        this.products = new Array<Product>();
        this.getAllProducts();
    }
    saveProduct(product: Product, insert: boolean) {
        let self = this;
        console.log(product);
        if (insert) {
            this.productResource.createProduct(product).$promise.then(function (result: Product) {
                console.log(result);
                self.products.push(result);
            });
        } else {
            this.productResource.updateProduct(product).$promise.then(function (result: Product) {
                console.log(result);
                product = result;
            });
        }
    }
    getAllProducts() {
        let self = this;
        this.productResource.getAllProducts().$promise.then(function (result: Array<Product>) {
            console.log(result);
            self.products = result;
        });
    }
}

angular.module("app.product.service", ["ngResource"]).service("ProductService", ProductService);