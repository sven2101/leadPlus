/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Common.ts" />
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

    constructor(toaster, $translate, ProductResource, $q) {
        this.toaster = toaster;
        this.translate = $translate;
        this.q = $q;
        this.productResource = ProductResource.resource;
        this.products = new Array<Product>();
        this.getAllProducts();
    }

    saveProduct(product: Product, insert: boolean) {
        let self = this;
        if (insert) {
            product.timestamp = newTimestamp();
            this.productResource.createProduct(product).$promise.then(function (result: Product) {
                self.products.push(result);

            });
        } else {
            this.productResource.updateProduct(product).$promise.then(function (result: Product) {
                console.log(product);
                console.log(result);
                product = result;
            });
        }
    }

    getAllProducts(): IPromise<Array<Product>> {
        let defer = this.q.defer();
        let self = this;
        this.productResource.getAllProducts().$promise.then(function (result: Array<Product>) {
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
}

angular.module(moduleProductService, [ngResourceId]).service(ProductServiceId, ProductService);