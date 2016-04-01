/**
 * Created by Sven on 20.03.2016.
 */

StatisticsCtrl.prototype.getProfit = function (profits) {
	var summe = 0;
	for (var profit in profits.result) {
		summe = summe + profits.result[profit];
	}
	this.profit = summe;
    this.chartEntireStatisticArea.series.push({
        name: 'Gewinn',
        data: profits.result,
        color: '#1a7bb9'
    });
};

StatisticsCtrl.prototype.getTurnover = function (turnovers) {
	var summe = 0;
	for (var turnover in turnovers.result) {
		summe = summe + turnovers.result[turnover];
	}
	this.turnover 					= summe;
    this.getEfficiency();
    this.getProfitPerSale();
	this.chartEntireStatisticArea.series.push({
        name: 'Umsatz',
        data: turnovers.result,
        color: '#000000'
    }); 
};

StatisticsCtrl.prototype.getLeads = function (leads) {
	this.leadResult = leads.result;
	var summe = 0;
	for (var lead in leads.result) {
		summe += leads.result[lead];
	}	
	this.leads = summe;
	
	this.chartSingleStatisticPie.series[0].data.push({
        name: 'Anfragen',
        y: this.leads,
        color: '#ed5565'
    });
	this.getConversionrate();
	
	this.chartEntireStatisticSpline.series.push({
        name: 'Anfragen',
        data: leads.result,
        color: '#ed5565'
    });
};

StatisticsCtrl.prototype.getOffers = function (offers) {
	this.offerResult = offers.result;
	var summe = 0;
	for (var offer in offers.result) {
		summe += offers.result[offer];
	}
	this.offers = summe;
	
    this.chartSingleStatisticPie.series[0].data.push({
        name: 'Angebote',
        y: this.offers,
        color: '#f8ac59'
    });
    this.chartEntireStatisticSpline.series.push({
        name: 'Angebote',
        data: offers.result,
        color: '#f8ac59'
    }); 
    
    this.offersConversionRate();
};

StatisticsCtrl.prototype.getSales = function (sales) {
	this.saleResult = sales.result;
	var summe = 0;
	for (var sale in sales.result) {
		summe += sales.result[sale];
	}
	this.sales 								= summe;
	
    this.chartSingleStatisticPie.series[0].data.push({
        name: 'Verkäufe',
        y: this.sales,
        color: '#1a7bb9'
    });
	
    this.getConversionrate();
	this.leadsConversionRate();

    this.chartEntireStatisticSpline.series.push({
        name: 'Verkäufe',
        data: sales.result,
        color: '#1a7bb9'
    });
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
    	this.efficiency = (this.profit / this.turnover) * 100;
    }
    else
    	this.efficiency = 0;
};

StatisticsCtrl.prototype.getConversionrate = function () {
    if (this.leads != 0) {
    	this.conversionrate = (this.sales / this.leads) * 100;
    }
    else
    	this.conversionrate = 0;
};

StatisticsCtrl.prototype.getProfitPerSale = function () {
    if (this.sales != 0) {
        this.profitPerSale = (this.profit / this.sales);
    }
    else
    	this.profitPerSale = 0;
};

StatisticsCtrl.prototype.leadsConversionRate = function () {
	var salesToLeadsConversion = new Array();

	for (var counter in this.leadResult) {		
		if (this.leadResult[counter] !== 0 && this.saleResult[counter] !== 0)
			salesToLeadsConversion.push(this.leadResult[counter] / this.saleResult[counter]);
		else 
			salesToLeadsConversion.push(0);
	}
		
    this.chartLeadsConversionRate.series.push({
        name: 'Abschlüsse aus Anfragen',
        data: salesToLeadsConversion,
        color: '#ed5565'
    });
}

StatisticsCtrl.prototype.offersConversionRate = function () {
	var salesToOffersConversion = new Array(); 
	for (var counter in this.offerResult) {		
		if (this.offerResult[counter] != 0 && this.saleResult[counter] != 0)
			salesToOffersConversion.push(this.offerResult[counter] / this.saleResult[counter]);
		else 
			salesToOffersConversion.push(0);
	}
	
    this.chartOffersConversionRate.series.push({
        name: 'Abschlüsse aus Angeboten',
        data: salesToOffersConversion,
        color: '#f8ac59'
    });
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
                 data: []
        }],
        loading: false
    };

    return chartConfig;
};
