
StatisticsCtrl.prototype.entireStatisticArea = function () {
    var chartConfig = {
        options: {
            chart: {
                type: 'area'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [],

                title: {
                    enabled: false
                }
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
            },
            tooltip: {
                shared: true,
                valueSuffix: ' €'
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
                valueSuffix: ' %'
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
                valueSuffix: ' %'
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