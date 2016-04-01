
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
                    text: 'Gewinn/Umsatz in €'
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
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: 'Anzahl'
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
            xAxis: {
                categories: [],
            },
            yAxis: {
                title: {
                    text: 'Abschlüsse in %'
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
            xAxis: {
                categories: [],
            },
            yAxis: {
                title: {
                    text: 'Abschlüsse in %'
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