/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../app/App.Common.ts" />

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

const ProductControllerId: string = "ProductController";

class ProductController {

    $inject = [ProductServiceId];

    createProductForm;
    currentProduct: Product;
    currentEditProduct: Product;
    isCurrentProductNew: boolean;
    productService: ProductService;

    constructor(ProductService: ProductService) {
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
        shallowCopy(this.currentEditProduct, this.currentProduct);
        this.isCurrentProductNew = false;
    }

    saveProduct() {
        if (!this.isCurrentProductNew) {
            shallowCopy(this.currentProduct, this.currentEditProduct);
        }
        this.productService.saveProduct(this.currentProduct, this.isCurrentProductNew);
    }

    getLocalTimestamp: any = function (product: Product) {
        return toLocalDate(product.timestamp);
    };
}

angular.module(moduleProduct, [ngResourceId]).controller(ProductControllerId, ProductController);

