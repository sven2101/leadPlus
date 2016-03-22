'use strict';

angular.module('app.statistics', ['ngResource']).controller('StatisticsCtrl', StatisticsCtrl);

StatisticsCtrl.$inject = ['Leads', 'Offers', 'Sales', 'Profit', 'Turnover'];

function StatisticsCtrl(Leads, Offers, Sales, Profit, Turnover) {
    
	var vm = this;
    
	this.profit 		= {}
    this.turnover 		= {};
    this.leads 			= {};
    this.offers 		= {};
    this.sales 			= {};
		
	this.leadsService 		= Leads;
	this.offersService  	= Offers;
	this.salesService  		= Sales;
	this.profitService  	= Profit;
	this.turnoverService  	= Turnover;

	this.leadsService.day().$promise.then(function (result) {
	    vm.leads = vm.getLeads(result);
	});
	
	this.offersService.day().$promise.then(function (result) {
	    vm.offers = vm.getOffers(result);
	});
	
	this.salesService.day().$promise.then(function (result) {
	    vm.sales = vm.getSales(result);
	});
	
	this.profitService.day().$promise.then(function (result) {
	    vm.profit = vm.getProfit(result);
	});
	
	this.turnoverService.day().$promise.then(function (result) {
	    vm.turnover = vm.getTurnover(result);
	});
	
	this.currentTab 				= 1;
    this.selectedPeriod 			= 'day';
    this.chartEntireStatisticSpline = {};
    this.chartEntireStatisticArea 	= {};
    var chartSingleStatisticPie = chartSingleStatisticPie;
    function chartSingleStatisticPie(){
    	return this.getSharedItemsPieChart(vm.leads);
    }
    //this.chartSingleStatisticPie 	= {};

    //this.chartLeadsConversionRate 	= this.getLeadsConversionRate();
    //this.chartOffersConversionRate 	= this.getOffersConversionRate();
 
    this.efficiency 				= {};
    this.conversionrate 			= {};
    this.profitPerSale 				= {};
}

StatisticsCtrl.prototype.tabOnClick = function (tab) {
    this.currentTab = tab;
}

StatisticsCtrl.prototype.onPeriodChange = function (selectedPeriod) {
    this.selectedPeriod = selectedPeriod;
    
    var vm = this;
    
    switch(selectedPeriod) {
	    case 'day':
	    	this.leadsService.day().$promise.then(function (result) {
	    	    vm.leads = vm.getLeads(result);
	    	});
	    	
	    	this.offersService.day().$promise.then(function (result) {
	    		vm.offers = vm.getOffers(result);
	    	});
	    	
	    	this.salesService.day().$promise.then(function (result) {
	    		vm.sales = vm.getSales(result);
	    	});
	    	
	    	this.profitService.day().$promise.then(function (result) {
	    		 vm.profit = vm.getProfit(result);
	    	});
	    	
	    	this.turnoverService.day().$promise.then(function (result) {
	    		vm.turnover = vm.getTurnover(result);
	    	});
	        break;
	    case 'week':
	    	this.leadsService.week().$promise.then(function (result) {
	    	    vm.leads = vm.getLeads(result);
	    	});
	    	
	    	this.offersService.week().$promise.then(function (result) {
	    		vm.offers = vm.getOffers(result);
	    	});
	    	
	    	this.salesService.week().$promise.then(function (result) {
	    		vm.sales = vm.getSales(result);
	    	});
	    	
	    	this.profitService.week().$promise.then(function (result) {
	    		 vm.profit = vm.getProfit(result);
	    	});
	    	
	    	this.turnoverService.week().$promise.then(function (result) {
	    		vm.turnover = vm.getTurnover(result);
	    	});
	        break;
	    case 'month':
	    	this.leadsService.month().$promise.then(function (result) {
	    	    vm.leads = vm.getLeads(result);
	    	});
	    	
	    	this.offersService.month().$promise.then(function (result) {
	    		vm.offers = vm.getOffers(result);
	    	});
	    	
	    	this.salesService.month().$promise.then(function (result) {
	    		vm.sales = vm.getSales(result);
	    	});
	    	
	    	this.profitService.month().$promise.then(function (result) {
	    		 vm.profit = vm.getProfit(result);
	    	});
	    	
	    	this.turnoverService.month().$promise.then(function (result) {
	    		vm.turnover = vm.getTurnover(result);
	    	});
	        break;
	    case 'year':
	    	this.leadsService.year().$promise.then(function (result) {
	    	    vm.leads = vm.getLeads(result);
	    	});
	    	
	    	this.offersService.year().$promise.then(function (result) {
	    		vm.offers = vm.getOffers(result);
	    	});
	    	
	    	this.salesService.year().$promise.then(function (result) {
	    		vm.sales = vm.getSales(result);
	    	});
	    	
	    	this.profitService.year().$promise.then(function (result) {
	    		 vm.profit = vm.getProfit(result);
	    	});
	    	
	    	this.turnoverService.year().$promise.then(function (result) {
	    		vm.turnover = vm.getTurnover(result);
	    	});
	        break;
	    case 'all':
	    	this.leadsService.all().$promise.then(function (result) {
	    	    vm.leads = vm.getLeads(result);
	    	});
	    	
	    	this.offersService.all().$promise.then(function (result) {
	    		vm.offers = vm.getOffers(result);
	    	});
	    	
	    	this.salesService.all().$promise.then(function (result) {
	    		vm.sales = vm.getSales(result);
	    	});
	    	
	    	this.profitService.all().$promise.then(function (result) {
	    		 vm.profit = vm.getProfit(result);
	    	});
	    	
	    	this.turnoverService.all().$promise.then(function (result) {
	    		vm.turnover = vm.getTurnover(result);
	    	});
	        break;
	    default:
	        console.log("Time Frame not found.");
    }	
}

