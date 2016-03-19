'use strict';

angular.module('app.statistics', ['ngResource']).controller('StatisticsCtrl', StatisticsCtrl);

function StatisticsCtrl() {
    this.profit = '2500000'
    this.turnover = '50000000';
    this.conversionRate = 5;
    this.currentTab = 1;
    this.selectedPeriod = 'Heute';
    this.chartConfig = {

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
        },
        //Boolean to control showing loading status on chart (optional)
        //Could be a string if you want to show specific loading text.

        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
        },
        series: [{
            name: 'Anfragen',
            data: [10, 20, 15, 12, 30, 40, 20, 12, 12, 12, 12, 20],
            color: '#ed5565'
        }, {
            name: 'Angebote',
            data: [0, 5, 8, 12, 10, 20, 15, 10, 8, 8, 8, 8],
            color: '#f8ac59'
        }, {
            name: 'Verkäufe',
            data: [0, 3, 5, 5, 8, 17, 12, 8, 5, 5, 5, 5],
            color: '#1a7bb9'
        }],
        //function (optional)
        func: function (chart) {
            //setup some logic for the chart
        }
    };
}

StatisticsCtrl.prototype.tabOnClick = function (tab) {
    this.currentTab = tab;
}

StatisticsCtrl.prototype.onPeriodChange = function (selectedPeriod) {
    this.selectedPeriod = selectedPeriod;
};

