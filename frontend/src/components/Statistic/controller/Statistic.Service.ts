/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Statistic/model/AbstractStatisticModel.Model.ts" />" />
/// <reference path="../../Statistic/model/PieChart.Model.ts" />" />
/// <reference path="../../Statistic/model/AreaChart.Model.ts" />" />
/// <reference path="../../Statistic/model/SplineChart.Model.ts" />" />
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

const StatisticServiceId: string = "StatisticService";

class StatisticService {

    private $inject = [toasterId, $translateId, StatisticResourceId, $qId];

    toaster: any;
    translate: any;
    statisticResource: any;
    q;

    SingleStatisticWorkflowPieChart: PieChart;
    EntireStatisticProfitTurnoverAreaChart: AreaChart;
    EntireStatisticWorkflowAmountSplineChart: SplineChart;
    EntireStatisticLeadConversionRateSplineChart: SplineChart;
    EntireStatisticOfferConversionRateSplineChart: SplineChart;
    statisticModelMap: { [key: string]: AbstractStatisticModel } = {};

    leadResultArr: Array<number> = new Array<number>();
    offerResultArr: Array<number> = new Array<number>();
    saleResultArr: Array<number> = new Array<number>();
    profitResultArr: Array<number> = new Array<number>();
    turnoverResultArr: Array<number> = new Array<number>();
    productStatisticArr: Array<any>;
    userStatisticArr: Array<any>;

    profitTotal: number = 0;
    turnoverTotal: number = 0;
    leadAmount: number = 0;
    offerAmount: number = 0;
    saleAmount: number = 0;

    singleStatisticEfficiency: number = 0;
    singleStatisticLeadConversionRate: number = 0;
    singleStatisticOfferConversionRate: number = 0;
    singleStatisticProfitPerSale: number = 0;

    isLeadPromise: boolean = false;
    isOfferPromise: boolean = false;
    isSalePromise: boolean = false;
    isProfitPromise: boolean = false;
    isTurnoverPromise: boolean = false;

    weekday: Array<string> = new Array<string>(7);
    month: Array<string> = new Array<string>(12);

    constructor(toaster, $translate, StatisticResource, $q) {
        this.toaster = toaster;
        this.translate = $translate;
        this.statisticResource = StatisticResource.resource;
        this.setAllModels();
        this.setWeekDayTranslationsArray();
        this.setMonthTranslationsArray();
        this.q = $q;
    }

    setAllModels() {
        this.SingleStatisticWorkflowPieChart = new PieChart(this.translate, "SPLOS", "STATISTIC_PARTS");
        this.EntireStatisticProfitTurnoverAreaChart = new AreaChart(this.translate, "EATAP", "STATISTIC_PROFIT_AND_RETURN_Y_AXIS", " €");
        this.EntireStatisticWorkflowAmountSplineChart = new SplineChart(this.translate, "ESLOS", "STATISTIC_LEADS_OFFERS_SALES_Y_AXIS", "");
        this.EntireStatisticLeadConversionRateSplineChart = new SplineChart(this.translate, "ESLSCR", "STATISTIC_SALES_OF_LEADS_Y_AXIS", " %");
        this.EntireStatisticOfferConversionRateSplineChart = new SplineChart(this.translate, "ESOSCR", "STATISTIC_SALES_OF_OFFERS_Y_AXIS", " %");
        this.statisticModelMap[this.SingleStatisticWorkflowPieChart.getId()] = this.SingleStatisticWorkflowPieChart;
        this.statisticModelMap[this.EntireStatisticWorkflowAmountSplineChart.getId()] = this.EntireStatisticWorkflowAmountSplineChart;
        this.statisticModelMap[this.EntireStatisticProfitTurnoverAreaChart.getId()] = this.EntireStatisticProfitTurnoverAreaChart;
        this.statisticModelMap[this.EntireStatisticLeadConversionRateSplineChart.getId()] = this.EntireStatisticLeadConversionRateSplineChart;
        this.statisticModelMap[this.EntireStatisticOfferConversionRateSplineChart.getId()] = this.EntireStatisticOfferConversionRateSplineChart;
    }

    getChartModelById(id: string): AbstractStatisticModel {
        return this.statisticModelMap[id];
    }

    clearAllModelsData() {
        this.SingleStatisticWorkflowPieChart.clearData();
        this.EntireStatisticWorkflowAmountSplineChart.clearData();
        this.EntireStatisticProfitTurnoverAreaChart.clearData();
        this.EntireStatisticLeadConversionRateSplineChart.clearData();
        this.EntireStatisticOfferConversionRateSplineChart.clearData();
    }

    setWeekDayTranslationsArray() {
        this.weekday[0] = this.translate.instant("SUNDAY");
        this.weekday[1] = this.translate.instant("MONDAY");
        this.weekday[2] = this.translate.instant("TUESDAY");
        this.weekday[3] = this.translate.instant("WEDNESDAY");
        this.weekday[4] = this.translate.instant("THURSDAY");
        this.weekday[5] = this.translate.instant("FRIDAY");
        this.weekday[6] = this.translate.instant("SATURDAY");
    }

    getWeekTranslation(): Array<string> {
        return this.weekday;
    }

    setMonthTranslationsArray() {
        this.month[0] = this.translate.instant("JANUARY");
        this.month[1] = this.translate.instant("FEBRUARY");
        this.month[2] = this.translate.instant("MARCH");
        this.month[3] = this.translate.instant("APRIL");
        this.month[4] = this.translate.instant("MAY");
        this.month[5] = this.translate.instant("JUNE");
        this.month[6] = this.translate.instant("JULY");
        this.month[7] = this.translate.instant("AUGUST");
        this.month[8] = this.translate.instant("SEPTEMBER");
        this.month[9] = this.translate.instant("OCTOBER");
        this.month[10] = this.translate.instant("NOVEMBER");
        this.month[11] = this.translate.instant("DECEMBER");
    }

    checkPromises() {
        if (this.isLeadPromise === true && this.isOfferPromise === true &&
            this.isSalePromise === true && this.isProfitPromise === true &&
            this.isTurnoverPromise === true) {
            this.singleStatisticEfficiency = this.getRatePercentage(this.profitTotal, this.turnoverTotal);
            this.singleStatisticProfitPerSale = (this.getRatePercentage(this.profitTotal, this.saleAmount)) / 100;
            this.singleStatisticLeadConversionRate = this.getRatePercentage(this.saleAmount, this.leadAmount);
            this.singleStatisticOfferConversionRate = this.getRatePercentage(this.saleAmount, this.offerAmount);
            this.pushToProfitAndTurnoverAreaChart();
            this.pushToWorkflowPieChart();
            this.pushToWorkflowAmountSplineChart();
            this.pushConversionRateSplineChartByModel(this.EntireStatisticLeadConversionRateSplineChart, this.saleResultArr, this.leadResultArr, "STATISTIC_SALES_OF_LEADS", "#ed5565");
            this.pushConversionRateSplineChartByModel(this.EntireStatisticOfferConversionRateSplineChart, this.saleResultArr, this.offerResultArr, "STATISTIC_SALES_OF_OFFERS", "#f8ac59");
        }
    }

    setPromises(value: boolean) {
        this.isLeadPromise = value;
        this.isOfferPromise = value;
        this.isSalePromise = value;
        this.isProfitPromise = value;
        this.isTurnoverPromise = value;
    }

    loadAllResourcesByDateRange(dateRange: string, source: string) {
        this.loadWorkflowResourcesByDateRange(dateRange, source);
        this.loadProfitResourcesByDateRange(dateRange, source);
        this.loadTurnoverResourcesByDateRange(dateRange, source);
        this.loadProductResourcesByDateRange(dateRange, source);
        this.loadUserStatisticResourcesByDateRange(dateRange, source);
    }

    loadWorkflowResourcesByDateRange(dateRange: string, source: string) {
        let self: StatisticService = this;
        this.statisticResource.getWorkflowStatistic({ workflow: workflowLead, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.leadResultArr = result;
            self.leadAmount = self.getTotalSumOf(self.leadResultArr);
            self.isLeadPromise = true;
            self.checkPromises();
        });
        this.statisticResource.getWorkflowStatistic({ workflow: workflowOffer, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.offerResultArr = result;
            self.offerAmount = self.getTotalSumOf(self.offerResultArr);
            self.isOfferPromise = true;
            self.checkPromises();
        });
        this.statisticResource.getWorkflowStatistic({ workflow: workflowSale, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.saleResultArr = result;
            self.saleAmount = self.getTotalSumOf(self.saleResultArr);
            self.isSalePromise = true;
            self.checkPromises();
        });
    }

    loadProfitResourcesByDateRange(dateRange: string, source: string) {
        let self: StatisticService = this;
        this.statisticResource.getProfitStatistic({ workflow: workflowSale, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.profitResultArr = result;
            self.profitTotal = self.getTotalSumOf(self.profitResultArr);
            self.isProfitPromise = true;
            self.checkPromises();
        });
    }

    loadTurnoverResourcesByDateRange(dateRange: string, source: string) {
        let self: StatisticService = this;
        this.statisticResource.getTurnoverStatistic({ workflow: workflowSale, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.turnoverResultArr = result;
            self.turnoverTotal = self.getTotalSumOf(self.turnoverResultArr);
            self.isTurnoverPromise = true;
            self.checkPromises();
        });
    }

    loadProductResourcesByDateRange(dateRange: string, source: string) {
        let self: StatisticService = this;
        this.statisticResource.getProductStatistic({ workflow: workflowSale, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.productStatisticArr = result;
        });
    }

    loadUserStatisticResourcesByDateRange(dateRange: string, source: string) {
        let self: StatisticService = this;
        this.statisticResource.getUserStatistic({ dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.userStatisticArr = result;
        });
    }


    setTimeSegmentByDateRange(dateRange: string): Array<string> {
        let currentDate: Date = new Date();
        let oneYearAgo: Date = new Date();
        let timeSegment: Array<string> = new Array<string>();

        switch (dateRange) {
            case "DAILY": {
                break;
            }
            case "WEEKLY": {
                let oneWeekAgo: Date = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
                while (oneWeekAgo <= currentDate) {
                    timeSegment.push(this.weekday[oneWeekAgo.getDay()]);
                    oneWeekAgo.setDate(oneWeekAgo.getDate() + 1);
                }
                break;
            }
            case "MONTHLY": {
                let oneMonthAgo: Date = new Date();
                oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
                while (oneMonthAgo <= currentDate) {
                    timeSegment.push(oneMonthAgo.getDate() + ". " + this.month[oneMonthAgo.getMonth()]);
                    oneMonthAgo.setDate(oneMonthAgo.getDate() + 1);
                }
                break;
            }
            case "YEARLY": {
                oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                while (oneYearAgo <= currentDate) {
                    timeSegment.push(this.month[oneYearAgo.getMonth()]);
                    oneYearAgo.setMonth(oneYearAgo.getMonth() + 1);
                }
                timeSegment.push(oneYearAgo.toUTCString().split(" ")[2]);
                break;
            }
            case "ALL": {
                oneYearAgo = new Date(2014, 1, 1);

                while (oneYearAgo <= currentDate) {
                    timeSegment.push(oneYearAgo.getFullYear().toString());
                    oneYearAgo.setFullYear(oneYearAgo.getFullYear() + 1);
                }
                break;
            }
            default: {

            }
        }
        this.setTimeSegment(timeSegment);
        return timeSegment;
    }

    setTimeSegment(timeSegment: Array<string>) {
        this.EntireStatisticProfitTurnoverAreaChart.chartConfig.options.xAxis.categories = timeSegment;
        this.EntireStatisticWorkflowAmountSplineChart.chartConfig.options.xAxis.categories = timeSegment;
        this.EntireStatisticLeadConversionRateSplineChart.chartConfig.options.xAxis.categories = timeSegment;
        this.EntireStatisticOfferConversionRateSplineChart.chartConfig.options.xAxis.categories = timeSegment;
    }

    getMonthTranslation(): Array<string> {
        return this.month;
    }

    pushToWorkflowPieChart() {
        this.SingleStatisticWorkflowPieChart.pushData("LEADS_MENU", [this.leadAmount], "#ed5565");
        this.SingleStatisticWorkflowPieChart.pushData("OFFERS_MENU", [this.offerAmount], "#f8ac59");
        this.SingleStatisticWorkflowPieChart.pushData("SALES_MENU", [this.saleAmount], "#1a7bb9");
    }

    pushToWorkflowAmountSplineChart() {
        this.EntireStatisticWorkflowAmountSplineChart.pushData("LEADS_MENU", this.leadResultArr, "#ed5565");
        this.EntireStatisticWorkflowAmountSplineChart.pushData("OFFERS_MENU", this.offerResultArr, "#f8ac59");
        this.EntireStatisticWorkflowAmountSplineChart.pushData("SALES_MENU", this.saleResultArr, "#1a7bb9");
    }
    pushToProfitAndTurnoverAreaChart() {
        this.EntireStatisticProfitTurnoverAreaChart.pushData("STATISTIC_TURNOVER", this.turnoverResultArr, "#000000");
        this.EntireStatisticProfitTurnoverAreaChart.pushData("STATISTIC_PROFIT", this.profitResultArr, "#1a7bb9");
    }

    pushConversionRateSplineChartByModel(model: AbstractStatisticModel, firstAmount: Array<number>, secondAmount: Array<number>, name: string, color: string) {
        let conversion: Array<number> = new Array<number>();
        for (let counter in firstAmount) {
            let first = firstAmount[counter];
            let second = secondAmount[counter];
            if (angular.isNumber(second) && angular.isNumber(first) && second !== 0) {
                conversion.push(Math.round((((first / second) * 100)) * 100) / 100);
            } else {
                conversion.push(0);
            }
        }
        model.pushData(name, conversion, color);
    }

    getTotalSumOf(array: Array<number>): number {
        let total: number = 0;
        for (let amount of array) {
            total += amount;
        }
        return total;
    }
    getRatePercentage(firstAmount: number, secondAmount: number): number {
        if (secondAmount !== 0) {
            return Math.round((((firstAmount / secondAmount) * 100)) * 100) / 100;
        }
        else {
            return 0;
        }
    }

    getProductStatisticById(workflow: string, dateRange: string, id: number): any {
        let deferred = this.q.defer();
        this.statisticResource.getSingleProductStatistic({ workflow: workflow, dateRange: dateRange, id: id }).$promise.then(function (result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    getUserStatisticById(dateRange: string, id: number): any {
        let deferred = this.q.defer();
        this.statisticResource.getSingleUserStatistic({ dateRange: dateRange, id: id }).$promise.then(function (result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    getProductStatistic(): Array<any> {
        return this.productStatisticArr;
    }
    getUserStatistic(): Array<any> {
        return this.userStatisticArr;
    }
    getLeadAmount(): number {
        return this.leadAmount;
    }
    getOfferAmount(): number {
        return this.offerAmount;
    }
    getSaleAmount(): number {
        return this.saleAmount;
    }
    getLeadsArray(): Array<number> {
        return this.leadResultArr;
    }
    getOffersArray(): Array<number> {
        return this.offerResultArr;
    }
    getSalesArray(): Array<number> {
        return this.saleResultArr;
    }
    getProfitTotal(): number {
        return this.profitTotal;
    }
    getTurnoverTotal(): number {
        return this.turnoverTotal;
    }
    getEfficiency(): number {
        return this.singleStatisticEfficiency;
    }
    getLeadConversionRate(): number {
        return this.singleStatisticLeadConversionRate;
    }
    getOfferConversionRate(): number {
        return this.singleStatisticOfferConversionRate;
    }
    getProfitPerSale(): number {
        return this.singleStatisticProfitPerSale;
    }
}

angular.module(moduleStatisticService, [ngResourceId]).service(StatisticServiceId, StatisticService);