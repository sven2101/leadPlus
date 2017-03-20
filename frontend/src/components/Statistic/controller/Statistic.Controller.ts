/// <reference path="../../Statistic/controller/Statistic.Service.ts" />
/// <reference path="../../Setting/controller/Setting.Source.Service.ts" />

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

const StatisticControllerId: string = "StatisticController";

class StatisticController {

    $inject = [StatisticServiceId, SourceServiceId, $rootScopeId, $routeId, $scopeId];

    statisticService: StatisticService;
    sourceService: SourceService;
    currentTab: string;
    dateRange: string = "MONTHLY";
    source: string = "ALL";
    currentUser: User;

    route;
    lastRoute;
    scope;

    constructor(StatisticService, SourceService, $rootScope, $route, $scope) {
        this.statisticService = StatisticService;
        this.sourceService = SourceService;
        this.currentUser = $rootScope.user;
        this.route = $route;
        this.scope = $scope;
        this.internalRouting($route);
        this.onStatisticChange(this.dateRange, this.source);
        this.statisticService.generateMyStatistic(this.currentUser);
    }

    internalRouting(route: any) {
        let paramTab = route.current.params.tab;
        if (!isNullOrUndefined(paramTab)) {
            this.currentTab = paramTab;
        } else {
            this.tabOnClick("single");
            route.updateParams({
                tab: this.currentTab
            });
        }
        let self = this;
        self.lastRoute = route.current;
        self.scope.$on("$locationChangeSuccess", function (event) {
            if (self.lastRoute.$$route && route.current.$$route && self.lastRoute.$$route.originalPath === route.current.$$route.originalPath) {
                if (route.current.params && isNullOrUndefined(route.current.params.tab)) {
                    route.updateParams({
                        tab: self.currentTab
                    });
                }
                route.current = self.lastRoute;
            }
        });
    }

    tabOnClick(tab: string) {
        this.lastRoute = this.route.current;
        this.currentTab = tab;
    }

    getChartModelById(id: string): AbstractStatisticModel {
        return this.statisticService.getChartModelById(id);
    }

    onStatisticChange(dateRange: string, source: string) {
        this.statisticService.setPromises(false);
        this.statisticService.clearAllModelsData();
        this.dateRange = dateRange;
        this.statisticService.setTimeSegmentByDateRange(dateRange);
        this.statisticService.loadAllResourcesByDateRange(dateRange, source);
    }

    getProductStatistic(): Array<any> {
        return this.statisticService.getProductStatistic();
    }

    getUserStatistic(): Array<any> {
        return this.statisticService.getUserStatistic();
    }

    getUserString(user: User): string {
        return getNameOfUser(user);
    }

    getRatePercentage(firstAmount: number, secondAmount: number): number {
        return this.statisticService.getRatePercentage(firstAmount, secondAmount);
    }
    getProfitTotal(): number {
        return this.statisticService.getProfitTotal();
    }
    getTurnoverTotal(): number {
        return this.statisticService.getTurnoverTotal();
    }
    getEfficiency(): number {
        return this.statisticService.getEfficiency();
    }
    getLeadConversionRate(): number {
        return this.statisticService.getLeadConversionRate();
    }
    getOfferConversionRate(): number {
        return this.statisticService.getOfferConversionRate();
    }
    getProfitPerSale(): number {
        return this.statisticService.getProfitPerSale();
    }
    getLeadAmount(): number {
        return this.statisticService.getLeadAmount();
    }
    getOfferAmount(): number {
        return this.statisticService.getOfferAmount();
    }
    getSaleAmount(): number {
        return this.statisticService.getSaleAmount();
    }
}

angular.module(moduleStatistic, [ngResourceId]).controller(StatisticControllerId, StatisticController);
