/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Statistic/controller/Statistic.Service.ts" />
/// <reference path="../../Setting/controller/Setting.Source.Service.ts" />
/// <reference path="../../Workflow/Model/WorkflowType.ts"/>
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../App/App.Resource.ts" />
/// <reference path="../../App/App.Constants.ts" />
/// <reference path="../../Statistic/model/ColumnChart.Model.ts" />" />

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

    $inject = [ProductServiceId, $routeParamsId, ProductResourceId, StatisticServiceId, SourceServiceId, $scopeId, $translateId];

    productService: ProductService;
    statisticService: StatisticService;
    sourceService: SourceService;
    productResource;
    routeParams;
    currentProduct: Product;
    currentProductId: number;
    productFound: boolean = false;
    productStatisticColumnChart: ColumnChart;
    translate;
    dateRange: string;
    source: string;


    constructor(ProductService, $routeParams, ProductResource, StatisticService, SourceService, $scope, $translate) {
        this.productService = ProductService;
        this.statisticService = StatisticService;
        this.sourceService = SourceService;
        this.productResource = ProductResource.resource;
        this.dateRange = "ALL";
        this.source = "ALL";
        this.routeParams = $routeParams;
        this.currentProductId = this.routeParams.productId;
        this.translate = $translate;
        this.getProductById();
    }

    getProductById() {
        let self = this;
        this.productResource.getProductById({ id: this.currentProductId }).$promise.then(function (result: Product) {
            self.currentProduct = result;
            if (!isNullOrUndefined(self.currentProduct.id)) {
                self.productStatisticColumnChart = new ColumnChart(self.translate, "SPCLOS", self.currentProduct.name, ""
                    , self.translate.instant("DETAIL_STATISTIC_TOOLTIP", { productname: "{series.name}", count: "{point.y}", workflow: "{point.name}" })
                    , [self.translate.instant("LEAD_LEADS"), self.translate.instant("OFFER_OFFERS"), self.translate.instant("SALE_SALES")]);
                self.productFound = true;
            }
        });
    }
}
angular.module(moduleProductDetail, [ngResourceId]).controller(ProductDetailControllerId, ProductDetailController);

