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

    $inject = ["Leads", "Offers", "Sales", "Profit", "Turnover", "$translate", "$interval", "$scope"];

    translate;
    scope;
    interval;

    currentTab = 1;
    selectedPeriod = "day";

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

    leadsService;
    offersService;
    salesService;
    profitService;
    turnoverService;

    timeframe = [];
    weekday = new Array(7);
    month = new Array(12);

    isLeadPromise = false;
    isOfferPromise = false;
    isSalePromise = false;
    isProfitPromise = false;
    isTurnoverPromise = false;

    constructor(Leads, Offers, Sales, Profit, Turnover, $translate, $interval, $scope) {
        this.translate = $translate;
        this.scope = $scope;
        this.interval = $interval;

        this.chartSingleStatisticPie = new SharedItemsPieChart(this.translate);
        this.chartEntireStatisticSpline = this.entireStatisticSpline();
        this.chartEntireStatisticArea = this.entireStatisticArea();
        this.chartLeadsConversionRate = this.getLeadsConversionRate();
        this.chartOffersConversionRate = this.getOffersConversionRate();

        this.leadsService = Leads;
        this.offersService = Offers;
        this.salesService = Sales;
        this.profitService = Profit;
        this.turnoverService = Turnover;
        this.setWeekDayTranslationsArray();
        this.setMonthTranslationsArray;
        this.checkPromises();
    }
    registerPromises() {
        let self = this;
        this.leadsService.day().$promise.then(function (result) {
            self.getLeads(result);
            self.isLeadPromise = true;
        });
        this.offersService.day().$promise.then(function (result) {
            self.getOffers(result);
            self.isOfferPromise = true;
        });
        this.salesService.day().$promise.then(function (result) {
            self.getSales(result);
            self.isSalePromise = true;
        });
        this.profitService.day().$promise.then(function (result) {
            self.getProfit(result);
            self.isProfitPromise = true;
        });
        this.turnoverService.day().$promise.then(function (result) {
            self.getTurnover(result);
            self.isTurnoverPromise = true;
        });
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
        this.scope.$on("$destroy", function () {
            if (angular.isDefined(stop)) {
                self.interval.cancel(stop);
                stop = undefined;
            }
        });
        stop = this.interval(function () {
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

        this.chartLeadsConversionRate.series.push({
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
        this.chartOffersConversionRate.series.push({
            name: this.translate.instant("STATISTIC_SALES_OF_OFFERS"),
            data: salesToOffersConversion,
            color: "#f8ac59"
        });
    }

    getSharedItemsPieChart() {
        let chartConfig = {
            options: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: "pie"
                }
                ,
                title: {
                    text: ""
                },
                tooltip: {},
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: (window["Highcharts"].theme && window["Highcharts"].theme.contrastTextColor) || "black"
                            }
                        }
                    }
                }
            },
            series: [{
                name: this.translate.instant("STATISTIC_PARTS"),
                colorByPoint: true,
                data: []
            }],
            loading: false
        };

        return chartConfig;
    }

    pushToPieChart() {
        this.chartSingleStatisticPie.series[0].data.push({
            name: this.translate.instant("LEADS_MENU"),
            y: this.leads,
            color: "#ed5565"
        });

        this.chartSingleStatisticPie.series[0].data.push({
            name: this.translate.instant("OFFERS_MENU"),
            y: this.offers,
            color: "#f8ac59"
        });

        this.chartSingleStatisticPie.series[0].data.push({
            name: this.translate.instant("SALES_MENU"),
            y: this.sales,
            color: "#1a7bb9"
        });
    }

    entireStatisticArea() {
        let chartConfig = {
            options: {
                chart: {
                    type: "area"
                },
                title: {
                    text: ""
                },
                tooltip: {
                    shared: true,
                    valueSuffix: " €",
                    valueDecimals: 2
                },
                xAxis: {
                    categories: [],
                },
                loading: false,
                yAxis: {
                    title: {
                        text: this.translate.instant("STATISTIC_PROFIT_AND_RETURN_Y_AXIS"),
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                }
            },
            series: []
        };
        return chartConfig;
    }
    entireStatisticSpline() {
        let chartConfig = {
            options: {
                chart: {
                    type: "spline"
                },
                title: "",
                tooltip: {
                    shared: true,
                    valueSuffix: ""
                },
                loading: false,
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: this.translate.instant("STATISTIC_LEADS_OFFERS_SALES_Y_AXIS")
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: "#808080"
                    }]
                },
                legend: {
                    layout: "vertical",
                    align: "right",
                    verticalAlign: "middle",
                    borderWidth: 0
                }
            },
            series: [],
            // function (optional)
            func: function (chart) {
                // setup some logic for the chart
            }
        };
        return chartConfig;
    }
    getLeadsConversionRate() {
        let chartConfig = {
            options: {
                chart: {
                    type: "spline"
                },
                title: {
                    text: ""
                },
                loading: false,
                xAxis: {
                    categories: [],
                },
                yAxis: {
                    title: {
                        text: this.translate.instant("STATISTIC_SALES_OF_LEADS_Y_AXIS")
                    },
                    minorGridLineWidth: 1,
                    gridLineWidth: 1,
                    alternateGridColor: null

                },
                tooltip: {
                    valueSuffix: " %",
                    valueDecimals: 2
                },
                plotOptions: {
                    spline: {
                        lineWidth: 4,
                        states: {
                            hover: {
                                lineWidth: 5
                            }
                        },
                        marker: {
                            enabled: false
                        }
                    }
                },
            },
            series: []
        };

        return chartConfig;
    }
    getOffersConversionRate() {
        let chartConfig = {
            options: {
                chart: {
                    type: "spline"
                },
                title: {
                    text: ""
                },
                loading: false,
                xAxis: {
                    categories: [],
                },
                yAxis: {
                    title: {
                        text: this.translate.instant("STATISTIC_SALES_OF_OFFERS_Y_AXIS")
                    },
                    minorGridLineWidth: 1,
                    gridLineWidth: 1,
                    alternateGridColor: null

                },
                tooltip: {
                    valueSuffix: " %",
                    valueDecimals: 2
                },
                plotOptions: {
                    spline: {
                        lineWidth: 4,
                        states: {
                            hover: {
                                lineWidth: 5
                            }
                        },
                        marker: {
                            enabled: false
                        }
                    }
                },
            },
            series: []
        };

        return chartConfig;
    }
    pushLeadsOffersSales() {
        this.chartEntireStatisticSpline.series.push({
            name: this.translate.instant("LEADS_MENU"),
            data: this.leadResult,
            color: "#ed5565"
        });
        this.chartEntireStatisticSpline.series.push({
            name: this.translate.instant("OFFERS_MENU"),
            data: this.offerResult,
            color: "#f8ac59"
        });
        this.chartEntireStatisticSpline.series.push({
            name: this.translate.instant("SALES_MENU"),
            data: this.saleResult,
            color: "#1a7bb9"
        });

    }
    pushProfitAndTurnover() {
        this.chartEntireStatisticArea.series.push({
            name: this.translate.instant("STATISTIC_TURNOVER"),
            data: this.turnoverResult,
            color: "#000000"
        });

        this.chartEntireStatisticArea.series.push({
            name: this.translate.instant("STATISTIC_PROFIT"),
            data: this.profitsResult,
            color: "#1a7bb9"
        });
    }
    onPeriodChange(selectedPeriod) {
        let self = this;

        this.isLeadPromise = false;
        this.isOfferPromise = false;
        this.isSalePromise = false;
        this.isProfitPromise = false;
        this.isTurnoverPromise = false;

        this.selectedPeriod = selectedPeriod;

        this.chartSingleStatisticPie.series[0].data = [];
        this.chartEntireStatisticArea.series = [];
        this.chartEntireStatisticSpline.series = [];
        this.chartLeadsConversionRate.series = [];
        this.chartOffersConversionRate.series = [];

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

        switch (this.selectedPeriod) {
            case "day":

                break;
            case "week":
                let oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                while (oneWeekAgo <= currentDate) {
                    this.timeframe.push(self.weekday[oneWeekAgo.getDay()]);
                    oneWeekAgo.setDate(oneWeekAgo.getDate() + 1);
                }

                break;
            case "month":
                let oneMonthAgo = new Date();
                oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

                while (oneMonthAgo <= currentDate) {
                    this.timeframe.push(oneMonthAgo.getDate() + ". " + self.month[oneMonthAgo.getMonth()]);
                    oneMonthAgo.setDate(oneMonthAgo.getDate() + 1);
                }

                break;
            case "year":
                oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                while (oneYearAgo <= currentDate) {

                    this.timeframe.push(self.month[oneYearAgo.getMonth()]);
                    oneYearAgo.setMonth(oneYearAgo.getMonth() + 1);
                }
                this.timeframe.push(oneYearAgo.toUTCString().split(" ")[2]);
                break;
            case "all":
                oneYearAgo = new Date(2014, 1, 1);

                while (oneYearAgo <= currentDate) {
                    this.timeframe.push(oneYearAgo.getFullYear());
                    oneYearAgo.setFullYear(oneYearAgo.getFullYear() + 1);
                }

                break;
            default:
                console.log("Timeframe not found");
        }

        switch (selectedPeriod) {
            case "day":
                this.leadsService.day().$promise.then(function (result) {
                    self.getLeads(result);
                    self.isLeadPromise = true;
                });
                self.offersService.day().$promise.then(function (result) {
                    self.getOffers(result);
                    self.isOfferPromise = true;
                });
                self.salesService.day().$promise.then(function (result) {
                    self.getSales(result);
                    self.isSalePromise = true;
                });
                self.profitService.day().$promise.then(function (result) {
                    self.getProfit(result);
                    self.isProfitPromise = true;
                });
                self.turnoverService.day().$promise.then(function (result) {
                    self.getTurnover(result);
                    self.isTurnoverPromise = true;
                });


                break;
            case "week":
                this.leadsService.week().$promise.then(function (result) {
                    self.getLeads(result);
                    self.isLeadPromise = true;
                });
                self.offersService.week().$promise.then(function (result) {
                    self.getOffers(result);
                    self.isOfferPromise = true;
                });
                self.salesService.week().$promise.then(function (result) {
                    self.getSales(result);
                    self.isSalePromise = true;
                });
                self.profitService.week().$promise.then(function (result) {
                    self.getProfit(result);
                    self.isProfitPromise = true;
                });
                self.turnoverService.week().$promise.then(function (result) {
                    self.getTurnover(result);
                    self.isTurnoverPromise = true;
                });

                break;
            case "month":
                this.leadsService.month().$promise.then(function (result) {
                    self.getLeads(result);
                    self.isLeadPromise = true;
                });
                self.offersService.month().$promise.then(function (result) {
                    self.getOffers(result);
                    self.isOfferPromise = true;
                });
                self.salesService.month().$promise.then(function (result) {
                    self.getSales(result);
                    self.isSalePromise = true;
                });
                self.profitService.month().$promise.then(function (result) {
                    self.getProfit(result);
                    self.isProfitPromise = true;
                });
                self.turnoverService.month().$promise.then(function (result) {
                    self.getTurnover(result);
                    self.isTurnoverPromise = true;
                });

                break;
            case "year":
                this.leadsService.year().$promise.then(function (result) {
                    self.getLeads(result);
                    self.isLeadPromise = true;
                });
                self.offersService.year().$promise.then(function (result) {
                    self.getOffers(result);
                    self.isOfferPromise = true;
                });
                self.salesService.year().$promise.then(function (result) {
                    self.getSales(result);
                    self.isSalePromise = true;
                });
                self.profitService.year().$promise.then(function (result) {
                    self.getProfit(result);
                    self.isProfitPromise = true;
                });
                self.turnoverService.year().$promise.then(function (result) {
                    self.getTurnover(result);
                    self.isTurnoverPromise = true;
                });

                break;
            case "all":
                this.leadsService.all().$promise.then(function (result) {
                    self.getLeads(result);
                    self.isLeadPromise = true;
                });
                self.offersService.all().$promise.then(function (result) {
                    self.getOffers(result);
                    self.isOfferPromise = true;
                });
                self.salesService.all().$promise.then(function (result) {
                    self.getSales(result);
                    self.isSalePromise = true;
                });
                self.profitService.all().$promise.then(function (result) {
                    self.getProfit(result);
                    self.isProfitPromise = true;
                });
                self.turnoverService.all().$promise.then(function (result) {
                    self.getTurnover(result);
                    self.isTurnoverPromise = true;
                });

                break;
            default:
                console.log("Time Frame not found.");
                break;
        }
        this.chartEntireStatisticArea.options.xAxis.categories = this.timeframe;
        this.chartEntireStatisticSpline.options.xAxis.categories = this.timeframe;
        this.chartLeadsConversionRate.options.xAxis.categories = this.timeframe;
        this.chartOffersConversionRate.options.xAxis.categories = this.timeframe;

        this.checkPromises();
    };
}

angular.module("app.statistics", ["ngResource"]).controller("StatisticContoller", StatisticContoller);
