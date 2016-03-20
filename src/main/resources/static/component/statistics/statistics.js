'use strict';

angular.module('app.statistics', ['ngResource']).controller('StatisticsCtrl', StatisticsCtrl);

function StatisticsCtrl() {
    this.currentTab = 1;
    this.selectedPeriod = 'Heute';
    this.chartEntireStatisticSpline = this.entireStatisticSpline();
    this.chartSingleStatisticPie = this.getSharedItemsPieChart();
    this.chartEntireStatisticArea = this.entireStatisticArea();
    this.chartLeadsConversionRate = this.getLeadsConversionRate();
    this.chartOffersConversionRate = this.getOffersConversionRate();
    this.profit = 2350009.00
    this.turnover = 50000000.00;
    this.leads = 20.00;
    this.offers = 12.00;
    this.sales = 6.00;
    this.efficiency = this.getEfficiency();
    this.conversionrate = this.getConversionrate();
    this.profitPerSale = this.getProfitPerSale();

}

StatisticsCtrl.prototype.tabOnClick = function (tab) {
    this.currentTab = tab;
}

StatisticsCtrl.prototype.onPeriodChange = function (selectedPeriod) {
    this.selectedPeriod = selectedPeriod;
}

