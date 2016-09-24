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
        directive.scope = {
            productid: "@",
        };
        directive.restrict = "A";
        directive.templateUrl = function (elem, attr) {
            return "components/Product/view/ProductStatistic.Directive.html";
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
            console.log(attrs);
            let singleStatisticWorkflowPieChart = new ColumnChart($translate, "SPCLOS", "STATISTIC_PARTS", "");
            console.log(scope);
            StatisticService.getProductStatisticById(Workflow[Workflow.LEAD], "ALL", scope.productid).then(function (result) {
                singleStatisticWorkflowPieChart.pushData("Anfragen", [result.count], "#ed5565");
            });
            StatisticService.getProductStatisticById(Workflow[Workflow.OFFER], "ALL", scope.productid).then(function (result) {
                singleStatisticWorkflowPieChart.pushData("Angebote", [result.count], "#f8ac59");
            });
            StatisticService.getProductStatisticById(Workflow[Workflow.SALE], "ALL", scope.productid).then(function (result) {
                singleStatisticWorkflowPieChart.pushData("Verkäufe", [result.count], "#1a7bb9");
            });
            scope.singleStatisticWorkflowPieChart = singleStatisticWorkflowPieChart;
        };
        return directive;
    }]);

