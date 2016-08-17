/// <reference path="../../Statistic/controller/Statistic.Service.ts" />
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

const StatisticControllerId: string = "StatisticController";

class StatisticController {

    $inject = [StatisticServiceId];

    statisticService: StatisticService;
    currentTab: number = 1;
    dateRange: string = "DAILY";

    constructor(StatisticService) {
        this.statisticService = StatisticService;
        this.onPeriodChange(this.dateRange);
    }

    tabOnClick(tab: number) {
        this.currentTab = tab;
    }

    getChartModelById(id: string): AbstractStatisticModel {
        return this.statisticService.getChartModelById(id);
    }

    onPeriodChange(dateRange: string) {
        this.statisticService.setPromises(false);
        this.statisticService.clearAllModelsData();
        this.dateRange = dateRange;
        this.statisticService.setTimeSegmentByDateRange(dateRange);
        this.statisticService.loadAllResourcesByDateRange(dateRange);
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
