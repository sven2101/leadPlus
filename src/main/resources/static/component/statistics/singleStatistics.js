/**
 * Created by Sven on 20.03.2016.
 */
StatisticsCtrl.prototype.getSalesLeadsRatePercentage = function () {
    if (this.leads != 0) {
        return (this.sales / this.leads) * 100;
    }
    else
        return 0;
}

StatisticsCtrl.prototype.getSalesOffersRatePercentage = function () {
    if (this.offers != 0) {
        return (this.sales / this.offers) * 100;
    }
    else
        return 0;
}

StatisticsCtrl.prototype.getEfficiency = function () {
    if (this.turnover != 0) {
        return (this.profit / this.turnover) * 100;
    }
    else
        return 0;
}

StatisticsCtrl.prototype.getConversionrate = function () {
    if (this.leads != 0) {
        return (this.sales / this.leads) * 100;
    }
    else
        return 0;
}

StatisticsCtrl.prototype.getProfitPerSale = function () {
    if (this.sales != 0) {
        return (this.profit / this.sales);
    }
    else
        return 0;
}

StatisticsCtrl.prototype.getSharedItemsPieChart = function () {
    var chartConfig = {
        options: {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            }
            ,
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Anteil',
            colorByPoint: true,
            data: [{
                name: 'Anfragen',
                y: 20,
                color: '#ed5565'
            }, {
                name: 'Angebote',
                y: 12,
                color: '#f8ac59'
            }, {
                name: 'Verkäufe',
                y: 6,
                color: '#1a7bb9'
            }]
        }]
    };

    return chartConfig;
}