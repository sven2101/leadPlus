/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Statistic/model/AbstractStatisticModel.Model.ts" />" />
/// <reference path="../../Statistic/model/SharedItemsPieChart.Model.ts" />" />
/// <reference path="../../Statistic/model/EntireStatisticSpline.Model.ts" />" />
/// <reference path="../../Statistic/model/EntireStatisticArea.Model.ts" />" />
/// <reference path="../../Statistic/model/LeadsConversionRate.Model.ts" />" />
/// <reference path="../../Statistic/model/OffersConversionRate.Model.ts" />" />
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

const StatisticServiceId: String = "StatisticService";

class StatisticService {

    private $inject = [toasterId, $translateId, statisticResourceId];

    toaster;
    translate;
    statisticResource;

    chartSingleStatisticPie: AbstractStatisticModel;
    chartEntireStatisticSpline: AbstractStatisticModel;
    chartEntireStatisticArea: AbstractStatisticModel;
    chartLeadsConversionRate: AbstractStatisticModel;
    chartOffersConversionRate: AbstractStatisticModel;
    statisticModelMap: { [key: string]: AbstractStatisticModel } = {};

    leadResultArr = new Array<number>();
    offerResultArr = new Array<number>();
    saleResultArr = new Array<number>();
    profitResultArr = new Array<number>();
    turnoverResultArr = new Array<number>();

    profitTotal = 0;
    turnoverTotal = 0;
    leadAmount = 0;
    offerAmount = 0;
    saleAmount = 0;

    efficiency = 4;
    conversionRate = 0;
    profitPerSale = 0;

    isLeadPromise = false;
    isOfferPromise = false;
    isSalePromise = false;
    isProfitPromise = false;
    isTurnoverPromise = false;

    weekday = new Array<String>(7);
    month = new Array<String>(12);

    constructor(toaster, $translate, StatisticResource) {
        this.toaster = toaster;
        this.translate = $translate;
        this.statisticResource = StatisticResource.resource;

        this.setAllModels();
        this.setWeekDayTranslationsArray();
        this.setMonthTranslationsArray();
    }

    setAllModels() {
        this.chartSingleStatisticPie = new SharedItemsPieChart(this.translate, "SPLOS");
        this.chartEntireStatisticArea = new EntireStatisticArea(this.translate, "EATAP");
        this.chartEntireStatisticSpline = new EntireStatisticSpline(this.translate, "ESLOS");
        this.chartLeadsConversionRate = new LeadsConversionRate(this.translate, "ESLSCR");
        this.chartOffersConversionRate = new OffersConversionRate(this.translate, "ESOSCR");
        this.statisticModelMap[this.chartSingleStatisticPie.getId()] = this.chartSingleStatisticPie;
        this.statisticModelMap[this.chartEntireStatisticSpline.getId()] = this.chartEntireStatisticSpline;
        this.statisticModelMap[this.chartEntireStatisticArea.getId()] = this.chartEntireStatisticArea;
        this.statisticModelMap[this.chartLeadsConversionRate.getId()] = this.chartLeadsConversionRate;
        this.statisticModelMap[this.chartOffersConversionRate.getId()] = this.chartOffersConversionRate;
    }

    getChartModelById(id: string): AbstractStatisticModel {
        return this.statisticModelMap[id];
    }

    clearAllModelsData() {
        this.chartSingleStatisticPie.clearData();
        this.chartEntireStatisticSpline.clearData();
        this.chartEntireStatisticArea.clearData();
        this.chartLeadsConversionRate.clearData();
        this.chartOffersConversionRate.clearData();
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
    getWeekTranslation(): Array<String> {
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

    getMonthTranslation(): Array<String> {
        return this.month;
    }
    setTimeSegmentByDateRange(dateRange: String): Array<String> {
        let currentDate = new Date();
        let oneYearAgo = new Date();
        let timeSegment = new Array<String>();

        switch (dateRange) {
            case "DAILY": {
                break;
            }
            case "WEEKLY": {
                let oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
                while (oneWeekAgo <= currentDate) {
                    timeSegment.push(this.weekday[oneWeekAgo.getDay()]);
                    oneWeekAgo.setDate(oneWeekAgo.getDate() + 1);
                }
                break;
            }
            case "MONTHLY": {
                let oneMonthAgo = new Date();
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
                console.log("Timeframe not found");
            }
        }
        this.setTimeSegment(timeSegment);
        return timeSegment;
    }

    setTimeSegment(timeSegment: Array<String>) {
        this.chartEntireStatisticArea.chartConfig.options.xAxis.categories = timeSegment;
        this.chartEntireStatisticSpline.chartConfig.options.xAxis.categories = timeSegment;
        this.chartLeadsConversionRate.chartConfig.options.xAxis.categories = timeSegment;
        this.chartOffersConversionRate.chartConfig.options.xAxis.categories = timeSegment;
    }

    pushToPieChart() {
        this.chartSingleStatisticPie.pushData("LEADS_MENU", [this.leadAmount], "#ed5565");
        this.chartSingleStatisticPie.pushData("OFFERS_MENU", [this.offerAmount], "#f8ac59");
        this.chartSingleStatisticPie.pushData("SALES_MENU", [this.saleAmount], "#1a7bb9");
    }

    pushLeadsOffersSales() {
        this.chartEntireStatisticSpline.pushData("LEADS_MENU", this.leadResultArr, "#ed5565");
        this.chartEntireStatisticSpline.pushData("OFFERS_MENU", this.offerResultArr, "#f8ac59");
        this.chartEntireStatisticSpline.pushData("SALES_MENU", this.saleResultArr, "#1a7bb9");
    }
    pushProfitAndTurnover() {
        this.chartEntireStatisticArea.pushData("STATISTIC_TURNOVER", this.turnoverResultArr, "#000000");
        this.chartEntireStatisticArea.pushData("STATISTIC_PROFIT", this.profitResultArr, "#1a7bb9");
    }

    pushConversionRate(model: AbstractStatisticModel, firstAmount: Array<number>, secondAmount: Array<number>, name: String, color: String) {
        let conversion = new Array();
        for (let counter in firstAmount) {
            let first = firstAmount[counter];
            let second = secondAmount[counter];
            if (angular.isNumber(second) && angular.isNumber(first) && second !== 0) {
                conversion.push((first / second) * 100);
            } else {
                conversion.push(0);
            }
        }
        model.pushData(name, conversion, color);
    }


    getTotalSumOf(array: Array<number>): number {
        let total = 0;
        for (let amount of array) {
            total += amount;
        }
        return total;
    }
    getRatePercentage(firstAmount: number, secondAmount: number): number {
        if (secondAmount !== 0) {
            return (firstAmount / secondAmount) * 100;
        }
        else {
            return 0;
        }
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

    getProfitTotal(): number {
        return this.profitTotal;
    }

    getTurnoverTotal(): number {
        return this.turnoverTotal;
    }

    getEfficiency(): number {
        return this.efficiency;
    }

    getConversionRate(): number {
        return this.conversionRate;
    }

    getProfitPerSale(): number {
        return this.profitPerSale;
    }

    loadAllResourcesByDateRange(dateRange: String): void {
        let self = this;
        this.statisticResource.getWorkflowStatistic({ workflow: workflowLead, dateRange: dateRange }).$promise.then(function (result) {
            self.leadResultArr = result.result;
            console.log(self.leadResultArr);
            self.leadAmount = self.getTotalSumOf(self.leadResultArr);
            self.isLeadPromise = true;
            self.checkPromises();
        });
        this.statisticResource.getWorkflowStatistic({ workflow: workflowOffer, dateRange: dateRange }).$promise.then(function (result) {
            self.offerResultArr = result.result;
            self.offerAmount = self.getTotalSumOf(self.offerResultArr);
            self.isOfferPromise = true;
            self.checkPromises();
        });
        this.statisticResource.getWorkflowStatistic({ workflow: workflowSale, dateRange: dateRange }).$promise.then(function (result) {
            self.saleResultArr = result.result;
            self.saleAmount = self.getTotalSumOf(self.saleResultArr);
            self.isSalePromise = true;
            self.checkPromises();
        });
        this.statisticResource.getProfitStatistic({ workflow: workflowSale, dateRange: dateRange }).$promise.then(function (result) {
            self.profitResultArr = result.result;
            self.profitTotal = self.getTotalSumOf(self.profitResultArr);
            self.isProfitPromise = true;
            self.checkPromises();
        });
        this.statisticResource.getTurnoverStatistic({ workflow: workflowSale, dateRange: dateRange }).$promise.then(function (result) {
            self.turnoverResultArr = result.result;
            self.turnoverTotal = self.getTotalSumOf(self.turnoverResultArr);
            self.isTurnoverPromise = true;
            self.checkPromises();
        });
    }

    checkPromises() {
        if (this.isLeadPromise === true && this.isOfferPromise === true &&
            this.isSalePromise === true && this.isProfitPromise === true &&
            this.isTurnoverPromise === true) {
            this.efficiency = this.getRatePercentage(this.profitTotal, this.turnoverTotal);
            this.profitPerSale = this.getRatePercentage(this.profitTotal, this.saleAmount);
            this.conversionRate = this.getRatePercentage(this.leadAmount, this.saleAmount);
            this.pushProfitAndTurnover();
            this.pushToPieChart();
            this.pushLeadsOffersSales();
            this.pushConversionRate(this.chartLeadsConversionRate, this.saleResultArr, this.leadResultArr, "STATISTIC_SALES_OF_LEADS", "#ed5565");
            this.pushConversionRate(this.chartOffersConversionRate, this.saleResultArr, this.offerResultArr, "STATISTIC_SALES_OF_OFFERS", "#f8ac59");
        }
    }

    setPromises(value: boolean) {
        this.isLeadPromise = value;
        this.isOfferPromise = value;
        this.isSalePromise = value;
        this.isProfitPromise = value;
        this.isTurnoverPromise = value;
    }

}
angular.module("app.statistic.service", ["ngResource"]).service("StatisticService", StatisticService);