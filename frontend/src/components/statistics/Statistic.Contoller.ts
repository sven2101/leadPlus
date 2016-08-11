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

class StatisticContoller {

    $inject = ["StatisticResource", "$translate", "$interval", "$scope"];

    translate;
    scope;
    interval;

    currentTab = 1;
    dateRange = "DAILY";

    chartSingleStatisticPie;
    chartEntireStatisticSpline;
    chartEntireStatisticArea;
    chartLeadsConversionRate;
    chartOffersConversionRate;

    leadResult = {};
    offerResult = {};
    saleResult = {};
    profitsResult = {};
    turnoverResult = {};

    profit = 0;
    turnover = 0;
    leads = 0;
    offers = 0;
    sales = 0;

    efficiency = {};
    conversionrate = {};
    profitPerSale = {};

    StatisticResource;

    timeframe = [];
    weekday = new Array(7);
    month = new Array(12);

    isLeadPromise = false;
    isOfferPromise = false;
    isSalePromise = false;
    isProfitPromise = false;
    isTurnoverPromise = false;

    constructor(StatisticResource, $translate, $interval, $scope) {
        this.translate = $translate;
        this.scope = $scope;
        this.interval = $interval;

        this.chartSingleStatisticPie = new SharedItemsPieChart(this.translate);
        this.chartEntireStatisticSpline = new EntireStatisticSpline(this.translate);
        this.chartEntireStatisticArea = new EntireStatisticArea(this.translate);
        this.chartLeadsConversionRate = new LeadsConversionRate(this.translate);
        this.chartOffersConversionRate = new OffersConversionRate(this.translate);

        this.StatisticResource = StatisticResource;

        this.setWeekDayTranslationsArray();
        this.setMonthTranslationsArray();

        this.onPeriodChange(this.dateRange);
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
        let self = this;
        let stop;
        this.scope.$on("$destroy", function() {
            if (angular.isDefined(stop)) {
                self.interval.cancel(stop);
                stop = undefined;
            }
        });
        stop = this.interval(function() {
            if (self.isLeadPromise === true && self.isOfferPromise === true &&
                self.isSalePromise === true && self.isProfitPromise === true &&
                self.isTurnoverPromise === true) {
                self.getEfficiency();
                self.getProfitPerSale();
                self.pushProfitAndTurnover();
                self.getConversionrate();
                self.pushToPieChart();
                self.pushLeadsOffersSales();
                self.leadsConversionRate();
                self.offersConversionRate();
                self.interval.cancel(stop);
            }
        }.bind(this), 500);
    }
    tabOnClick(tab) {
        this.currentTab = tab;
    }

    getProfit(profits) {
        this.profitsResult = profits.result;
        let summe = 0;
        for (let profit in profits.result) {
            summe = summe + profits.result[profit];
        }
        this.profit = summe;
    }

    getTurnover(turnovers) {
        this.turnoverResult = turnovers.result;
        let summe = 0;
        for (let turnover in turnovers.result) {
            summe = summe + turnovers.result[turnover];
        }
        this.turnover = summe;
    }

    getLeads(leads) {
        this.leadResult = leads.result;
        let summe = 0;
        for (let lead in leads.result) {
            summe += leads.result[lead];
        }
        this.leads = summe;
    }

    getOffers(offers) {
        this.offerResult = offers.result;
        let summe = 0;
        for (let offer in offers.result) {
            summe += offers.result[offer];
        }
        this.offers = summe;
    }

    getSales(sales) {
        this.saleResult = sales.result;
        let summe = 0;
        for (let sale in sales.result) {
            summe += sales.result[sale];
        }
        this.sales = summe;
    }

    getSalesLeadsRatePercentage() {
        if (this.leads !== 0) {
            return (this.sales / this.leads) * 100;
        }
        else
            return 0;
    }
    getSalesOffersRatePercentage() {
        if (this.offers !== 0) {
            return (this.sales / this.offers) * 100;
        }
        else
            return 0;
    }
    getEfficiency() {
        if (this.turnover !== 0) {
            this.efficiency = (this.profit / this.turnover) * 100;
        }
        else
            this.efficiency = 0;
    }
    getConversionrate() {
        if (this.leads !== 0) {
            this.conversionrate = (this.sales / this.leads) * 100;
        }
        else
            this.conversionrate = 0;
    }
    getProfitPerSale() {
        if (this.sales !== 0) {
            this.profitPerSale = (this.profit / this.sales);
        }
        else
            this.profitPerSale = 0;
    }
    leadsConversionRate() {
        let salesToLeadsConversion = new Array();
        for (let counter in this.saleResult) {
            let lead = parseInt(this.leadResult[counter], 10);
            let sale = parseInt(this.saleResult[counter], 10);
            if (angular.isNumber(lead) && angular.isNumber(sale) && lead !== 0) {
                salesToLeadsConversion.push((sale / lead) * 100);
            } else {
                salesToLeadsConversion.push(0);
            }
        }

        this.chartLeadsConversionRate.chartConfig.series.push({
            name: this.translate.instant("STATISTIC_SALES_OF_LEADS"),
            data: salesToLeadsConversion,
            color: "#ed5565"
        });
    }
    offersConversionRate() {
        let salesToOffersConversion = new Array();
        for (let counter in this.saleResult) {
            let offer = parseInt(this.offerResult[counter], 10);
            let sale = parseInt(this.saleResult[counter], 10);
            if (angular.isNumber(offer) && angular.isNumber(sale) && offer !== 0) {
                salesToOffersConversion.push((sale / offer) * 100);
            } else {
                salesToOffersConversion.push(0);
            }
        }
        this.chartOffersConversionRate.chartConfig.series.push({
            name: this.translate.instant("STATISTIC_SALES_OF_OFFERS"),
            data: salesToOffersConversion,
            color: "#f8ac59"
        });
    }

    pushToPieChart() {
        this.chartSingleStatisticPie.chartConfig.series[0].data.push({
            name: this.translate.instant("LEADS_MENU"),
            y: this.leads,
            color: "#ed5565"
        });

        this.chartSingleStatisticPie.chartConfig.series[0].data.push({
            name: this.translate.instant("OFFERS_MENU"),
            y: this.offers,
            color: "#f8ac59"
        });

        this.chartSingleStatisticPie.chartConfig.series[0].data.push({
            name: this.translate.instant("SALES_MENU"),
            y: this.sales,
            color: "#1a7bb9"
        });
    }

    pushLeadsOffersSales() {
        this.chartEntireStatisticSpline.chartConfig.series.push({
            name: this.translate.instant("LEADS_MENU"),
            data: this.leadResult,
            color: "#ed5565"
        });
        this.chartEntireStatisticSpline.chartConfig.series.push({
            name: this.translate.instant("OFFERS_MENU"),
            data: this.offerResult,
            color: "#f8ac59"
        });
        this.chartEntireStatisticSpline.chartConfig.series.push({
            name: this.translate.instant("SALES_MENU"),
            data: this.saleResult,
            color: "#1a7bb9"
        });

    }
    pushProfitAndTurnover() {
        this.chartEntireStatisticArea.chartConfig.series.push({
            name: this.translate.instant("STATISTIC_TURNOVER"),
            data: this.turnoverResult,
            color: "#000000"
        });

        this.chartEntireStatisticArea.chartConfig.series.push({
            name: this.translate.instant("STATISTIC_PROFIT"),
            data: this.profitsResult,
            color: "#1a7bb9"
        });
    }
    onPeriodChange(dateRange) {
        let self = this;

        this.isLeadPromise = false;
        this.isOfferPromise = false;
        this.isSalePromise = false;
        this.isProfitPromise = false;
        this.isTurnoverPromise = false;

        this.dateRange = dateRange;

        this.chartSingleStatisticPie.chartConfig.series[0].data = [];
        this.chartEntireStatisticArea.chartConfig.series = [];
        this.chartEntireStatisticSpline.chartConfig.series = [];
        this.chartLeadsConversionRate.chartConfig.series = [];
        this.chartOffersConversionRate.chartConfig.series = [];

        this.timeframe = [];

        let date = Date.now();
        let currentDate = new Date();

        let dataProfit = [];
        let dataReturn = [];

        let dataLead = [];
        let dataOffer = [];
        let dataSale = [];

        let dataConversionLeads = [];
        let dataConversionOffers = [];
        let oneYearAgo = new Date();

        switch (this.dateRange) {
            case "DAILY":
                break;
            case "WEEKLY":
                let oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
                while (oneWeekAgo <= currentDate) {
                    this.timeframe.push(self.weekday[oneWeekAgo.getDay()]);
                    oneWeekAgo.setDate(oneWeekAgo.getDate() + 1);
                }

                break;
            case "MONTHLY":
                let oneMonthAgo = new Date();
                oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
                while (oneMonthAgo <= currentDate) {
                    this.timeframe.push(oneMonthAgo.getDate() + ". " + self.month[oneMonthAgo.getMonth()]);
                    oneMonthAgo.setDate(oneMonthAgo.getDate() + 1);
                }

                break;
            case "YEARLY":
                oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                while (oneYearAgo <= currentDate) {

                    this.timeframe.push(self.month[oneYearAgo.getMonth()]);
                    oneYearAgo.setMonth(oneYearAgo.getMonth() + 1);
                }
                this.timeframe.push(oneYearAgo.toUTCString().split(" ")[2]);
                break;
            case "ALL":
                oneYearAgo = new Date(2014, 1, 1);

                while (oneYearAgo <= currentDate) {
                    this.timeframe.push(oneYearAgo.getFullYear());
                    oneYearAgo.setFullYear(oneYearAgo.getFullYear() + 1);
                }

                break;
            default:
                console.log("Timeframe not found");
        }


        this.StatisticResource.getWorkflowStatistic({ workflow: "LEAD", dateRange: dateRange }).$promise.then(function(result) {
            self.getLeads(result);
            self.isLeadPromise = true;
        });
        self.StatisticResource.getWorkflowStatistic({ workflow: "OFFER", dateRange: dateRange }).$promise.then(function(result) {
            self.getOffers(result);
            self.isOfferPromise = true;
        });
        self.StatisticResource.getWorkflowStatistic({ workflow: "SALE", dateRange: dateRange }).$promise.then(function(result) {
            self.getSales(result);
            self.isSalePromise = true;
        });
        self.StatisticResource.getProfitStatistic({ workflow: "SALE", dateRange: dateRange }).$promise.then(function(result) {
            self.getProfit(result);
            self.isProfitPromise = true;
        });
        self.StatisticResource.getTurnoverStatistic({ workflow: "SALE", dateRange: dateRange }).$promise.then(function(result) {
            self.getTurnover(result);
            self.isTurnoverPromise = true;
        });


        this.chartEntireStatisticArea.chartConfig.options.xAxis.categories = this.timeframe;
        this.chartEntireStatisticSpline.chartConfig.options.xAxis.categories = this.timeframe;
        this.chartLeadsConversionRate.chartConfig.options.xAxis.categories = this.timeframe;
        this.chartOffersConversionRate.chartConfig.options.xAxis.categories = this.timeframe;

        this.checkPromises();
    };
}

angular.module("app.statistics", ["ngResource"]).controller("StatisticContoller", StatisticContoller);
