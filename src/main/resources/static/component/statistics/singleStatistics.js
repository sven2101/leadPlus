/**
 * Created by Sven on 20.03.2016.
 */


StatisticsCtrl.prototype.getProfit = function (profits) {
	var summe = 0;
	for (var profit in profits.result) {
		summe = summe + profits.result[profit];
	}
	this.profit = summe;

	console.log(this.timeframe);

    this.chartEntireStatisticArea.series.push({
        name: 'Gewinn',
        data: this.profit,
        color: '#000000'
    });
	
	/*
	this.chartEntireStatisticArea.series[0].data.push({     	
        data: this.profit,
        color: '#1a7bb9'
	});
	*/
	return summe;
};

StatisticsCtrl.prototype.getTurnover = function (turnovers) {
	var summe = 0;
	for (var turnover in turnovers.result) {
		summe = summe + turnovers.result[turnover];
	}
	this.turnover 					= summe;
	this.efficiency 				= this.getEfficiency();
	
    this.chartEntireStatisticArea.series.push({
        name: 'Umsatz',
        data: this.turnover,
        color: '#1a7bb9'
    });
	
	/*
	this.chartEntireStatisticArea.series[0].data.push({     	
       data: this.turnover,
       color: '#000000'
	});*/
};

StatisticsCtrl.prototype.getLeads = function (leads) {
	var summe = 0;
	for (var lead in leads.result) {
		 summe += leads.result[lead];
	}	
	
	this.leads = summe;
	this.getSalesLeadsRatePercentage();
	/*
	this.chartSingleStatisticPie.series[0].data.push({     	
         name: 'Anfragen',
         y: this.leads,
         color: '#ed5565'
    });
	this.chartEntireStatisticSpline.series[0].data.push({     	
        name: 'Anfragen',
        y: this.leads,
        color: '#ed5565'
	});*/
};

StatisticsCtrl.prototype.getOffers = function (offers) {
	var summe = 0;
	for (var offer in offers.result) {
		 summe += offers.result[offer];
	}
	this.offers = summe;
	/*
	this.chartSingleStatisticPie.series[0].data.push({     	
        name: 'Angebote',
        y: this.offers,
        color: '#f8ac59'
	});
	this.chartEntireStatisticSpline.series[0].data.push({     	
        name: 'Angebote',
        y: this.offers,
        color: '#f8ac59'
	});*/
};

StatisticsCtrl.prototype.getSales = function (sales) {
	var summe = 0;
	for (var sale in sales.result) {
		 summe += sales.result[sale];
	}
	this.sales 								= summe;
	
	this.getSalesOffersRatePercentage();
	
	this.profitPerSale 						= this.getProfitPerSale();
	/*
	this.chartSingleStatisticPie.series[0].data.push({     	
        name: 'Verkäufe',
        y: this.sales,
        color: '#1a7bb9'
	});
	this.chartEntireStatisticSpline.series[0].data.push({     	
        name: 'Verkäufe',
        y: this.sales,
        color: '#1a7bb9'
	});
	*/
};

StatisticsCtrl.prototype.getSalesLeadsRatePercentage = function () {
    if (this.leads != 0) {
        return (this.sales / this.leads) * 100;
    }
    else
        return 0;
};

StatisticsCtrl.prototype.getSalesOffersRatePercentage = function () {
    if (this.offers != 0) {
        return (this.sales / this.offers) * 100;
    }
    else
        return 0;
};

StatisticsCtrl.prototype.getEfficiency = function () {
    if (this.turnover != 0) {
        return (this.profit / this.turnover) * 100;
    }
    else
        return 0;
};

StatisticsCtrl.prototype.getConversionrate = function () {
    if (this.leads != 0) {
        return (this.sales / this.leads) * 100;
    }
    else
        return 0;
};

StatisticsCtrl.prototype.getProfitPerSale = function () {
    if (this.sales != 0) {
        return (this.profit / this.sales);
    }
    else
        return 0;
};

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
	             data: []
        }],
        loading: false
    };

    return chartConfig;
};
