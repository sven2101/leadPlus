/// <reference path="../Product/Product.Model.ts" />
/// <reference path="../app/App.Constants.ts" />
/// <reference path="../app/App.Common.ts" />
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

const ProductServiceId: string = "ProductService";

class ProductService {

    private $inject = [toasterId, $translateId, productResourceId];

    products: Array<Product>;
    toaster;
    translate;
    productResource;

    constructor(toaster, $translate, ProductResource) {
        this.toaster = toaster;
        this.translate = $translate;
        this.productResource = ProductResource.resource;
        this.products = new Array<Product>();
        this.getAllProducts();
    }

    saveProduct(product: Product, insert: boolean) {
        let self = this;
        if (insert) {
            console.log("a");
            product.timestamp = newTimestamp();
            this.productResource.createProduct(product).$promise.then(function (result: Product) {
                self.products.push(result);

            });
        } else {
            console.log("b");
            this.productResource.updateProduct(product).$promise.then(function (result: Product) {
                console.log(product);
                console.log(result);
                product = result;
            });
        }
    }

    getActiveProducts(): Array<Product> {
        let temp: Array<Product> = new Array<Product>();
        for (let product of this.products) {
            if (product.deactivated === false) {
                temp.push(product);
            }
        }
        return temp;
    }

    getAllProducts() {
        let self = this;
        this.productResource.getAllProducts().$promise.then(function (result: Array<Product>) {
            self.products = result;
        });
    }
}

angular.module(moduleProductService, [ngResourceId]).service(ProductServiceId, ProductService);