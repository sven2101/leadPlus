/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../FileUpload/model/FileUpload.Model.ts" />

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

    $inject = [ProductServiceId, $rootScopeId];

    createProductForm;
    currentProduct: Product;
    currentEditProduct: Product;
    isCurrentProductNew: boolean;
    productService: ProductService;
    rootScope;
    showImageCropper: boolean = true;

    constructor(ProductService: ProductService, $rootScope) {
        this.productService = ProductService;
        this.rootScope = $rootScope;
        let self = this;
        $rootScope.$on("productImageSaved", function (evt, data: FileUpload) {
            console.log(data);
            self.currentProduct.picture = isNullOrUndefined(data) ? self.currentProduct.picture : data;
            self.saveProduct();
        });

    }

    refreshData(): void {
        this.productService.getAllProducts();
    }

    clearProduct(): void {
        this.showImageCropper = false;
        this.createProductForm.$setPristine();
        this.currentProduct = new Product();
        this.isCurrentProductNew = true;
        this.showImageCropper = true;
    }

    editProduct(product: Product): void {

        this.currentEditProduct = product;
        this.currentProduct = new Product();
        shallowCopy(this.currentEditProduct, this.currentProduct);
        this.isCurrentProductNew = false;
        this.showImageCropper = true;
    }

    savePicture() {
        this.rootScope.$broadcast("saveCroppedImage");
    }

    saveProduct() {
        if (!this.isCurrentProductNew) {
            shallowCopy(this.currentProduct, this.currentEditProduct);
        }
        this.productService.saveProduct(this.currentProduct, this.isCurrentProductNew);
        this.showImageCropper = false;
    }

    getTheFiles($files) {
        this.productService.getTheFiles($files);
    }

    arrayBufferToBase64(buffer) {
        let binary = "";
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    getLocalTimestamp: any = function (product: Product) {
        return toLocalDate(product.timestamp);
    };
}

angular.module(moduleProduct, [ngResourceId]).controller(ProductControllerId, ProductController);

