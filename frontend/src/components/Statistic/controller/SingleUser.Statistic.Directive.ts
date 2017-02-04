/// <reference path="../../Statistic/model/ColumnChart.Model.ts" />" />
/// <reference path="../../Statistic/controller/Statistic.Service.ts" />
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
    .directive("userstatistic", [$translateId, StatisticServiceId, function ($translate, StatisticService) {
        let directive: { restrict: string, scope: any, templateUrl: any, transclude: boolean, link: any };
        directive = { restrict: null, scope: null, templateUrl: null, transclude: null, link: null };
        directive.restrict = "A";
        directive.scope = {
            chart: "=",
            daterange: "=",
            source: "=",
            userobj: "="
        };
        directive.templateUrl = function (elem, attr) {
            return "components/Statistic/view/UserStatistic.Directive.html";
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
            scope.userStatistic;

            scope.chart.clearData();
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
                StatisticService.getUserStatisticById(dateRange, source, scope.userobj.id).then(function (resultUserStatistic) {
                    scope.userStatistic = resultUserStatistic;
                    scope.chart.pushData($translate.instant("LEAD_LEADS"), [scope.userStatistic.countLead], "#ed5565");
                    scope.chart.pushData($translate.instant("OFFER_OFFERS"), [scope.userStatistic.countOffer], "#f8ac59");
                    scope.chart.pushData($translate.instant("SALE_SALES"), [scope.userStatistic.countSale], "#1a7bb9", true, true);
                });
            }

            scope.calculateRate = function calculateRate(firstAmount: number, secondAmount: number): number {
                return StatisticService.getRatePercentage(firstAmount, secondAmount);
            };
            scope.getNameOfUser = getNameOfUser;
        };
        return directive;
    }]);

