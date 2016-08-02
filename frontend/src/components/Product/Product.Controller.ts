/// <reference path="../Product/Product.Service.ts" />
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

class ProductController {

    $inject = ["ProductService"];

    currentProduct: Product;
    productService: ProductService;
    products: Array<Product>;

    constructor(ProductService) {
        this.productService = ProductService;
        this.currentProduct = this.productService.currentProduct;
        this.products = this.productService.products;
    }

    refreshData() {

    }

    clearProduct() {
        this.currentProduct = new Product();
    }

    saveProduct() {
        this.productService.saveProduct();
    }
}

angular.module("app.product", ["ngResource"]).controller("ProductController", ProductController);

