/// <reference path="../../Statistic/model/ColumnChart.Model.ts" />" />
/// <reference path="../../Statistic/controller/Statistic.Service.ts" />
/// <reference path="../../Workflow/Model/Workflow.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Common.ts" />

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";

angular.module(moduleApp)
    .directive("product", [$translateId, StatisticServiceId, function ($translate, StatisticService) {
        let directive: { restrict: string, scope: any, templateUrl: any, transclude: boolean, link: any };
        directive = { restrict: null, scope: null, templateUrl: null, transclude: null, link: null };
        directive.restrict = "A";
        directive.scope = {
            chart: "=",
            daterange: "=",
            source: "=",
            productobj: "="
        };
        directive.templateUrl = function (elem, attr) {
            return "components/Product/view/ProductStatistic.Directive.html";
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
            scope.productLeads;
            scope.productOffers;
            scope.productSales;
            let productLeadPromise: boolean = false;
            let productOfferPromise: boolean = false;
            let productSalePromise: boolean = false;
            let emptyProduct = {
                "count": 0,
                "turnover": 0,
                "discount": 0,
                "product": {
                    "netPrice": 0
                }
            };
            loadData(scope.daterange, scope.source);
            scope.$watch("daterange", function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.chart.clearData();
                    loadData(newValue, scope.source);
                }
            }, true);

            scope.$watch("source", function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.chart.clearData();
                    loadData(scope.daterange, newValue);
                }
            }, true);

            function loadData(dateRange: string, source: string) {
                productLeadPromise = false;
                productOfferPromise = false;
                productSalePromise = false;
                StatisticService.getProductStatisticById(Workflow[Workflow.LEAD], dateRange, source, scope.productobj.id).then(function (resultLeads) {
                    scope.productLeads = resultLeads;
                    if (isNullOrUndefined(resultLeads.product)) {
                        scope.productLeads = emptyProduct;
                    }
                    productLeadPromise = true;
                    checkPromise();
                });
                StatisticService.getProductStatisticById(Workflow[Workflow.OFFER], dateRange, source, scope.productobj.id).then(function (resultOffers) {
                    scope.productOffers = resultOffers;
                    if (isNullOrUndefined(resultOffers.product)) {
                        scope.productOffers = emptyProduct;
                    }
                    productOfferPromise = true;
                    checkPromise();
                });
                StatisticService.getProductStatisticById(Workflow[Workflow.SALE], dateRange, source, scope.productobj.id).then(function (resultSales) {
                    scope.productSales = resultSales;
                    if (isNullOrUndefined(resultSales.product)) {
                        scope.productSales = emptyProduct;
                    }
                    productSalePromise = true;
                    checkPromise();
                });
            }

            function checkPromise() {
                if (productLeadPromise && productOfferPromise && productSalePromise) {
                    scope.chart.pushData($translate.instant("LEAD_LEADS"), [scope.productLeads.count], "#ed5565");
                    scope.chart.pushData($translate.instant("OFFER_OFFERS"), [scope.productOffers.count], "#f8ac59");
                    scope.chart.pushData($translate.instant("SALE_SALES"), [scope.productSales.count], "#1a7bb9");
                }
            }


        };
        return directive;
    }]);

