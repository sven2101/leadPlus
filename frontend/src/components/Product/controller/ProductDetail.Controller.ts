/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Statistic/controller/Statistic.Service.ts" />
/// <reference path="../../Common/Model/Workflow.Model.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../App/App.Resource.ts" />
/// <reference path="../../App/App.Constants.ts" />

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

const ProductDetailControllerId: string = "ProductDetailController";

class ProductDetailController {

    $inject = [ProductServiceId, $routeParamsId, ProductResourceId, StatisticServiceId];

    productService: ProductService;
    statisticService: StatisticService;
    productResource;
    routeParams;
    currentProduct: Product;
    currentProductId: number;
    productFound: boolean = false;
    productLead: any;
    productOffer: any;
    productSale: any;


    constructor(ProductService, $routeParams, ProductResource, StatisticService) {
        this.productService = ProductService;
        this.statisticService = StatisticService;
        this.productResource = ProductResource.resource;
        this.routeParams = $routeParams;
        this.currentProductId = this.routeParams.productId;
        this.getProductById();
        let self = this;
    }

    getProductById() {
        let self = this;
        this.productResource.getProductById({ id: this.currentProductId }).$promise.then(function (result: Product) {
            self.currentProduct = result;
            if (!isNullOrUndefined(self.currentProduct.id)) {
                self.productFound = true;
                self.statisticService.getProductStatisticById(Workflow[Workflow.LEAD], "ALL", self.currentProduct.id).then(function(result){
                    self.productLead = result;
                });
                 self.statisticService.getProductStatisticById(Workflow[Workflow.OFFER], "ALL", self.currentProduct.id).then(function(result){
                    self.productOffer = result;
                });
                 self.statisticService.getProductStatisticById(Workflow[Workflow.SALE], "ALL", self.currentProduct.id).then(function(result){
                    self.productSale = result;
                });
            }
        });
    }
}

angular.module(moduleProductDetail, [ngResourceId]).controller(ProductDetailControllerId, ProductDetailController);

