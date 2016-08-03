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

    createProductForm;
    currentProduct: Product;
    productService: ProductService;

    constructor(ProductService, $resource) {
        this.productService = ProductService;
    }

    refreshData() {
        this.productService.getAllProducts();
    }

    clearProduct(): void {
        this.createProductForm.$setPristine();
        this.currentProduct = new Product();
    }

    saveProduct() {
        console.log(this.currentProduct);
        this.productService.saveProduct(this.currentProduct);
    }
}

angular.module("app.product", ["ngResource"]).controller("ProductController", ProductController);

