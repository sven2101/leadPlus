/**
 * Created by Sven on 20.03.2016.
 */


StatisticsCtrl.prototype.getProfit = function (profits) {
	var summe = 0;
	for (var profit in profits.result) {
		summe = summe + profits.result[profit];
	}
	this.profit = summe;
	return summe;
}

StatisticsCtrl.prototype.getTurnover = function (turnovers) {
	var summe = 0;
	for (var turnover in turnovers.result) {
		summe = summe + turnovers.result[turnover];
	}
	this.turnover 					= summe;
	this.efficiency 				= this.getEfficiency();
    this.chartEntireStatisticArea 	= this.entireStatisticArea();
	return summe;
}

StatisticsCtrl.prototype.getLeads = function (leads) {
	var summe = 0;
	for (var lead in leads.result) {
		 summe += leads.result[lead];
	}	
	this.leads = summe;
	console.log("leads: ", this.leads);
	return summe;
}

StatisticsCtrl.prototype.getOffers = function (offers) {
	var summe = 0;
	for (var offer in offers.result) {
		 summe += offers.result[offer];
	}
	this.offers = summe;
	console.log("offers: ", this.offers);
	return summe;
}

StatisticsCtrl.prototype.getSales = function (sales) {
	var summe = 0;
	for (var sale in sales.result) {
		 summe += sales.result[sale];
	}
	this.sales 								= summe;
	this.getSalesLeadsRatePercentage();
	this.getSalesOffersRatePercentage();
	this.profitPerSale 						= this.getProfitPerSale();
	this.chartSingleStatisticPie			= this.getSharedItemsPieChart();
	    
    this.chartEntireStatisticSpline 		= this.entireStatisticSpline();
    console.log("sales: ", this.sales);
	return summe;
}

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

StatisticsCtrl.prototype.getSharedItemsPieChart = function (leads) {
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
                y: leads,
                color: '#ed5565'
            }, {
                name: 'Angebote',
                y: this.offers,
                color: '#f8ac59'
            }, {
                name: 'Verkäufe',
                y: this.sales,
                color: '#1a7bb9'
            }]
        }]
    };

    return chartConfig;
}
