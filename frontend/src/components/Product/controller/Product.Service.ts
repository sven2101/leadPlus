/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/model/Promise.Interface.ts" />
/// <reference path="../../app/App.Resource.ts" />

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

    private $inject = [toasterId, $translateId, ProductResourceId, $qId];

    products: Array<Product>;
    toaster;
    translate;
    productResource;
    q;
    formdata;

    constructor(toaster, $translate, ProductResource, $q) {
        this.toaster = toaster;
        this.translate = $translate;
        this.q = $q;
        this.productResource = ProductResource.resource;
        this.products = new Array<Product>();
        this.formdata = new FormData();
        this.getAllProducts();
    }

    saveProduct(product: Product, insert: boolean) {
        let self = this;
        if (insert) {
            product.timestamp = newTimestamp();
            this.productResource.createProduct(product).$promise.then(function (result: Product) {
                self.productResource.uploadImage({ id: result.id }, self.formdata).$promise.then(function (result: Product) {
                    self.products.push(result);
                    self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS"));
                }, function () {
                    self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_ERROR"));
                });
            });
        } else {
            this.productResource.updateProduct(product).$promise.then(function (result: Product) {
                product = result;
            });
        }
    }

    getAllProducts(): IPromise<Array<Product>> {
        let defer = this.q.defer();
        let self = this;
        this.productResource.getAllProducts().$promise.then(function (result: Array<Product>) {
            self.products = result;
            defer.resolve(self.products);
        }, function (error: any) {
            defer.reject(error);
        });
        return defer.promise;
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

    getTheFiles($files) {
        console.log("files: ", $files);
        this.formdata.append("file", $files[0]);
    }
}

angular.module(moduleProductService, [ngResourceId]).service(ProductServiceId, ProductService);