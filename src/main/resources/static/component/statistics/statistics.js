'use strict';

angular.module('app.statistics', ['ngResource']).controller('StatisticsCtrl', StatisticsCtrl);

StatisticsCtrl.$inject = ['Leads', 'Offers', 'Sales', 'Profit', 'Turnover', '$translate'];

function StatisticsCtrl(Leads, Offers, Sales, Profit, Turnover, $translate) {

    this.translate = $translate;
    var vm = this;
    this.currentTab = 1;
    this.selectedPeriod = 'day';

    this.chartSingleStatisticPie = this.getSharedItemsPieChart();
    this.chartEntireStatisticSpline = this.entireStatisticSpline();
    this.chartEntireStatisticArea = this.entireStatisticArea();
    this.chartLeadsConversionRate = this.getLeadsConversionRate();
    this.chartOffersConversionRate = this.getOffersConversionRate();

    this.leadResult = {};
    this.offerResult = {};
    this.saleResult = {};

    this.profit = {};
    this.turnover = {};
    this.leads = {};
    this.offers = {};
    this.sales = {};

    this.efficiency = {};
    this.conversionrate = {};
    this.profitPerSale = {};

    this.leadsService = Leads;
    this.offersService = Offers;
    this.salesService = Sales;
    this.profitService = Profit;
    this.turnoverService = Turnover;

    this.timeframe = [];
    this.weekday = new Array(7);
    this.weekday[0] = $translate.instant('SUNDAY');
    this.weekday[1] = $translate.instant('MONDAY');
    this.weekday[2] = $translate.instant('TUESDAY');
    this.weekday[3] = $translate.instant('WEDNESDAY');
    this.weekday[4] = $translate.instant('THURSDAY');
    this.weekday[5] = $translate.instant('FRIDAY');
    this.weekday[6] = $translate.instant('SATURDAY');

    this.month = new Array();
    this.month[0] = $translate.instant('JANUARY');
    this.month[1] = $translate.instant('FEBRUARY');
    this.month[2] = $translate.instant('MARCH');
    this.month[3] = $translate.instant('APRIL');
    this.month[4] = $translate.instant('MAY');
    this.month[5] = $translate.instant('JUNE');
    this.month[6] = $translate.instant('JULY');
    this.month[7] = $translate.instant('AUGUST');
    this.month[8] = $translate.instant('SEPTEMBER');
    this.month[9] = $translate.instant('OCTOBER');
    this.month[10] = $translate.instant('NOVEMBER');
    this.month[11] = $translate.instant('DECEMBER');

    this.leadsService.day().$promise.then(function (result) {
        vm.getLeads(result);
        vm.offersService.day().$promise.then(function (result) {
            vm.getOffers(result);
            vm.salesService.day().$promise.then(function (result) {
                vm.getSales(result);
                vm.leadsConversionRate();
                vm.offersConversionRate();
                vm.profitService.day().$promise.then(function (result) {
                    vm.getProfit(result);
                    vm.turnoverService.day().$promise.then(function (result) {
                        vm.getTurnover(result);
                    });
                });
            });
        });
    });
}

StatisticsCtrl.prototype.tabOnClick = function (tab) {
    this.currentTab = tab;
};

StatisticsCtrl.prototype.onPeriodChange = function (selectedPeriod) {
    var vm = this;

    this.selectedPeriod = selectedPeriod;

    this.chartSingleStatisticPie.series[0].data = [];
    this.chartEntireStatisticArea.series = [];
    this.chartEntireStatisticSpline.series = [];
    this.chartLeadsConversionRate.series = [];
    this.chartOffersConversionRate.series = [];

    this.timeframe = [];

    var date = Date.now();
    var currentDate = new Date();

    var dataProfit = [];
    var dataReturn = [];

    var dataLead = [];
    var dataOffer = [];
    var dataSale = [];

    var dataConversionLeads = [];
    var dataConversionOffers = [];

    switch (this.selectedPeriod) {
        case 'day':

            break;
        case 'week':
            var oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
            while (oneWeekAgo <= currentDate) {
                this.timeframe.push(vm.weekday[oneWeekAgo.getDay()]);
                oneWeekAgo.setDate(oneWeekAgo.getDate() + 1);
            }

            break;
        case 'month':
            var oneMonthAgo = new Date();
            oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

            while (oneMonthAgo <= currentDate) {
                this.timeframe.push(oneMonthAgo.getDate() + '. ' + vm.month[oneMonthAgo.getMonth()]);
                oneMonthAgo.setDate(oneMonthAgo.getDate() + 1)
            }

            break;
        case 'year':
            var oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            while (oneYearAgo <= currentDate) {

                this.timeframe.push(vm.month[oneYearAgo.getMonth()]);
                oneYearAgo.setMonth(oneYearAgo.getMonth() + 1)
            }
            this.timeframe.push(oneYearAgo.toUTCString().split(' ')[2]);
            break;
        case 'all':
            var oneYearAgo = new Date(2014, 1, 1);

            while (oneYearAgo <= currentDate) {
                this.timeframe.push(oneYearAgo.getFullYear());
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() + 1);
            }

            break;
        default:
            console.log("Timeframe not found");
    }

    switch (selectedPeriod) {
        case 'day':
            this.leadsService.day().$promise.then(function (result) {
                vm.getLeads(result);
                vm.offersService.day().$promise.then(function (result) {
                    vm.getOffers(result);
                    vm.salesService.day().$promise.then(function (result) {
                        vm.getSales(result);
                        vm.leadsConversionRate();
                        vm.offersConversionRate();
                        vm.profitService.day().$promise.then(function (result) {
                            vm.getProfit(result);
                            vm.turnoverService.day().$promise.then(function (result) {
                                vm.getTurnover(result);
                            });
                        });
                    });
                });
            });

            break;
        case 'week':
            this.leadsService.week().$promise.then(function (result) {
                vm.getLeads(result);
                vm.offersService.week().$promise.then(function (result) {
                    vm.getOffers(result);
                    vm.salesService.week().$promise.then(function (result) {
                        vm.getSales(result);
                        vm.leadsConversionRate();
                        vm.offersConversionRate();
                        vm.profitService.week().$promise.then(function (result) {
                            vm.getProfit(result);
                            vm.turnoverService.week().$promise.then(function (result) {
                                vm.getTurnover(result);
                            });
                        });
                    });
                });
            });
            break;
        case 'month':
            this.leadsService.month().$promise.then(function (result) {
                vm.getLeads(result);
                vm.offersService.month().$promise.then(function (result) {
                    vm.getOffers(result);
                    vm.salesService.month().$promise.then(function (result) {
                        vm.getSales(result);
                        vm.leadsConversionRate();
                        vm.offersConversionRate();
                        vm.profitService.month().$promise.then(function (result) {
                            vm.getProfit(result);
                            vm.turnoverService.month().$promise.then(function (result) {
                                vm.getTurnover(result);
                            });
                        });
                    });
                });
            });


            break;
        case 'year':
            this.leadsService.year().$promise.then(function (result) {
                vm.getLeads(result);
                vm.offersService.year().$promise.then(function (result) {
                    vm.getOffers(result);
                    vm.salesService.year().$promise.then(function (result) {
                        vm.getSales(result);
                        vm.leadsConversionRate();
                        vm.offersConversionRate();
                        vm.profitService.year().$promise.then(function (result) {
                            vm.getProfit(result);
                            vm.turnoverService.year().$promise.then(function (result) {
                                vm.getTurnover(result);
                            });
                        });
                    });
                });
            });
            break;
        case 'all':
            this.leadsService.all().$promise.then(function (result) {
                vm.getLeads(result);
                vm.offersService.all().$promise.then(function (result) {
                    vm.getOffers(result);
                    vm.salesService.all().$promise.then(function (result) {
                        vm.getSales(result);
                        vm.leadsConversionRate();
                        vm.offersConversionRate();
                        vm.profitService.all().$promise.then(function (result) {
                            vm.getProfit(result);
                            vm.turnoverService.all().$promise.then(function (result) {
                                vm.getTurnover(result);
                            });
                        });
                    });
                });
            });
            break;
        default:
            console.log("Time Frame not found.");
    }
    this.chartEntireStatisticArea.options.xAxis.categories = this.timeframe;
    this.chartEntireStatisticSpline.options.xAxis.categories = this.timeframe;
    this.chartLeadsConversionRate.options.xAxis.categories = this.timeframe;
    this.chartOffersConversionRate.options.xAxis.categories = this.timeframe;
};

