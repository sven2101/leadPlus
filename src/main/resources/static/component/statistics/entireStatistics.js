StatisticsCtrl.prototype.entireStatisticArea = function () {
    var chartConfig = {
        options: {
            chart: {
                type: 'area'
            },
            title: {
                text: ''
            },
            tooltip: {
                shared: true,
                valueSuffix: ' €',
                valueDecimals: 2
            },
            xAxis: {
                categories: [],
            },
            loading: false,
            yAxis: {
                title: {
                    text: this.translate.instant('STATISTIC_PROFIT_AND_RETURN_Y_AXIS'),
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
};

StatisticsCtrl.prototype.entireStatisticSpline = function () {
    var chartConfig = {
        options: {
            chart: {
                type: 'spline'
            },
            title: '',
            tooltip: {
                shared: true,
                valueSuffix: ''
            },
            loading: false,
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: this.translate.instant('STATISTIC_LEADS_OFFERS_SALES_Y_AXIS')
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            }
        },
        series: [],
        //function (optional)
        func: function (chart) {
            //setup some logic for the chart
        }
    };
    return chartConfig;
};

StatisticsCtrl.prototype.getLeadsConversionRate = function () {
    var chartConfig = {
        options: {
            chart: {
                type: 'spline'
            },
            title: {
                text: ''
            },
            loading: false,
            xAxis: {
                categories: [],
            },
            yAxis: {
                title: {
                    text: this.translate.instant('STATISTIC_SALES_OF_LEADS_Y_AXIS')
                },
                minorGridLineWidth: 1,
                gridLineWidth: 1,
                alternateGridColor: null

            },
            tooltip: {
                valueSuffix: ' %',
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
};


StatisticsCtrl.prototype.getOffersConversionRate = function () {
    var chartConfig = {
        options: {
            chart: {
                type: 'spline'
            },
            title: {
                text: ''
            },
            loading: false,
            xAxis: {
                categories: [],
            },
            yAxis: {
                title: {
                    text: this.translate.instant('STATISTIC_SALES_OF_OFFERS_Y_AXIS')
                },
                minorGridLineWidth: 1,
                gridLineWidth: 1,
                alternateGridColor: null

            },
            tooltip: {
                valueSuffix: ' %',
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
};

StatisticsCtrl.prototype.pushLeadsOffersSales = function () {
    this.chartEntireStatisticSpline.series.push({
        name: this.translate.instant('LEADS_MENU'),
        data: this.leadResult,
        color: '#ed5565'
    });
    this.chartEntireStatisticSpline.series.push({
        name: this.translate.instant('OFFERS_MENU'),
        data: this.offerResult,
        color: '#f8ac59'
    });
    this.chartEntireStatisticSpline.series.push({
        name: this.translate.instant('SALES_MENU'),
        data: this.saleResult,
        color: '#1a7bb9'
    });

}

StatisticsCtrl.prototype.pushProfitAndTurnover = function () {
    this.chartEntireStatisticArea.series.push({
        name: this.translate.instant('STATISTIC_TURNOVER'),
        data: this.turnoverResult,
        color: '#000000'
    });

    this.chartEntireStatisticArea.series.push({
        name: this.translate.instant('STATISTIC_PROFIT'),
        data: this.profitsResult,
        color: '#1a7bb9'
    });
}