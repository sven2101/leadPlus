/// <reference path="../../Statistic/model/ColumnChart.Model.ts" />" />
/// <reference path="../../Statistic/controller/Statistic.Service.ts" />
/// <reference path="../../Common/Model/Workflow.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />

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
            chart: "="
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

            function checkPromise() {
                if (productLeadPromise && productOfferPromise && productSalePromise) {
                    scope.chart.pushData("Anfragen", [scope.productLeads.count], "#ed5565");
                    scope.chart.pushData("Angebote", [scope.productOffers.count], "#f8ac59");
                    scope.chart.pushData("Verkäufe", [scope.productSales.count], "#1a7bb9");
                    console.log(scope.productSales);
                }
            }
            StatisticService.getProductStatisticById(Workflow[Workflow.LEAD], "ALL", attrs["productid"]).then(function (resultLeads) {
                scope.productLeads = resultLeads;
                productLeadPromise = true;
                checkPromise();
            });
            StatisticService.getProductStatisticById(Workflow[Workflow.OFFER], "ALL", attrs["productid"]).then(function (resultOffers) {
                scope.productOffers = resultOffers;
                productOfferPromise = true;
                checkPromise();
            });
            StatisticService.getProductStatisticById(Workflow[Workflow.SALE], "ALL", attrs["productid"]).then(function (resultSales) {
                scope.productSales = resultSales;
                productSalePromise = true;
                checkPromise();
            });
        };
        return directive;
    }]);

