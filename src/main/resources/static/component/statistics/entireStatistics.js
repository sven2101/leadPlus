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
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
        series: [{
            name: 'Anfragen',
            data: [5, 7, 3, 8, 4, 7, 5,8,5,9,3,5],
            color: '#ed5565'
        }, {
            name: 'Angebote',
            data: [5, 7, 3, 8, 4, 7, 5,8,5,9,3,5],
            color: '#f8ac59'
        }, {
            name: 'Verkäufe',
            data: [5, 7, 3, 8, 4, 7, 5,8,5,9,3,5],
            color: '#1a7bb9'
        }],
        //function (optional)
        func: function (chart) {
            //setup some logic for the chart
        }
    };
    return chartConfig;
}

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
}

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
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        series: [{
            name: 'Abschlüsse aus Anfragen',
            data: [5, 7, 3, 8, 4, 7, 5,8,5,9,3,5],
            color: '#ed5565'

        }]
    };

    return chartConfig;
}


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
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        series: [{
            name: 'Abschlüsse aus Angeboten',
            data: [20, 30, 40, 30, 25, 35, 40,30,40,34,50,60],
            color: '#f8ac59'

        }]
    };

    return chartConfig;
}