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

    $inject = [ProductServiceId];

    createProductForm;
    currentProduct: Product;
    currentEditProduct: Product;
    isCurrentProductNew;
    productService: ProductService;

    constructor(ProductService) {
        this.productService = ProductService;
    }

    refreshData(): void {
        this.productService.getAllProducts();
    }

    clearProduct(): void {
        this.createProductForm.$setPristine();
        this.currentProduct = new Product();
        this.isCurrentProductNew = true;
    }

    editProduct(product: Product): void {
        this.currentEditProduct = product;
        this.currentProduct = new Product();
        this.deepCopyProduct(this.currentEditProduct, this.currentProduct);
        this.isCurrentProductNew = false;
    }
    saveProduct() {
        if (!this.isCurrentProductNew) {
            this.deepCopyProduct(this.currentProduct, this.currentEditProduct);
        }
        this.productService.saveProduct(this.currentProduct, this.isCurrentProductNew);
    }
    deepCopyProduct(oldProduct: Product, newProduct: Product) {
        newProduct.id = oldProduct.id;
        newProduct.description = oldProduct.description;
        newProduct.name = oldProduct.name;
        newProduct.priceNetto = oldProduct.priceNetto;
        newProduct.timestamp = oldProduct.timestamp;
        newProduct.isDeactivated = oldProduct.isDeactivated;
    }
}

angular.module("app.product", ["ngResource", "ngFileUpload"]).controller("ProductController", ProductController);

