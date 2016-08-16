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

    private $inject = [toasterId, $translateId, StatisticResourceId];

    toaster;
    translate;
    statisticResource;

    SingleStatisticWorkflowPieChart: PieChart;
    EntireStatisticProfitTurnoverAreaChart: AreaChart;
    EntireStatisticWorkflowAmountSplineChart: SplineChart;
    EntireStatisticLeadConversionRateSplineChart: SplineChart;
    EntireStatisticOfferConversionRateSplineChart: SplineChart;
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

    singleStatisticEfficiency = 0;
    singleStatisticLeadConversionRate = 0;
    singleStatisticOfferConversionRate = 0;
    singleStatisticProfitPerSale = 0;

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

    loadAllResourcesByDateRange(dateRange: String): void {
        let self = this;
        this.statisticResource.getWorkflowStatistic({ workflow: workflowLead, dateRange: dateRange }).$promise.then(function (result) {
            self.leadResultArr = result.result;
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
        this.EntireStatisticProfitTurnoverAreaChart.chartConfig.options.xAxis.categories = timeSegment;
        this.EntireStatisticWorkflowAmountSplineChart.chartConfig.options.xAxis.categories = timeSegment;
        this.EntireStatisticLeadConversionRateSplineChart.chartConfig.options.xAxis.categories = timeSegment;
        this.EntireStatisticOfferConversionRateSplineChart.chartConfig.options.xAxis.categories = timeSegment;
    }

    getMonthTranslation(): Array<String> {
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

    pushConversionRateSplineChartByModel(model: AbstractStatisticModel, firstAmount: Array<number>, secondAmount: Array<number>, name: String, color: String) {
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