'use strict';

angular.module('app.statistics', ['ngResource']).controller('StatisticsCtrl', StatisticsCtrl);

StatisticsCtrl.$inject = ['Leads', 'Offers', 'Sales', 'Profit', 'Turnover'];

function StatisticsCtrl(Leads, Offers, Sales, Profit, Turnover) {
    
	var vm 														= this;
	this.timeframe 												= [];
	
    this.chartSingleStatisticPie 								= this.getSharedItemsPieChart();
    this.chartEntireStatisticSpline 							= this.entireStatisticSpline();
    this.chartEntireStatisticArea   							= this.entireStatisticArea();
    this.chartLeadsConversionRate   							= this.getLeadsConversionRate();
    this.chartOffersConversionRate 								= this.getOffersConversionRate();

    this.leadResult			= {};
    this.offerResult		= {};
    this.saleResult			= {};
    
	this.profit 			= {};
    this.turnover 			= {};
    this.leads 				= {};
    this.offers 			= {};
    this.sales 				= {};
	
    this.efficiency 		= {};
    this.conversionrate 	= {};
    this.profitPerSale 		= {}; 
    
	this.leadsService 		= Leads;
	this.offersService  	= Offers;
	this.salesService  		= Sales;
	this.profitService  	= Profit;
	this.turnoverService  	= Turnover;

	this.leadsService.day().$promise.then(function (result) {
	    vm.getLeads(result);
	});
	
	this.offersService.day().$promise.then(function (result) {
	    vm.getOffers(result);
	});
	
	this.salesService.day().$promise.then(function (result) {
	    vm.getSales(result);
	});
	
	this.profitService.day().$promise.then(function (result) {
	   vm.getProfit(result);
	});
	
	this.turnoverService.day().$promise.then(function (result) {
	    vm.getTurnover(result);
	});
	
	this.currentTab 				= 1;
    this.selectedPeriod 			= 'day';
}

StatisticsCtrl.prototype.tabOnClick = function (tab) {
    this.currentTab = tab;
};

StatisticsCtrl.prototype.onPeriodChange = function (selectedPeriod) {
    var vm 														= this;
	
	this.selectedPeriod 										= selectedPeriod;
        
	this.chartSingleStatisticPie.series[0].data					= [];
	
    this.chartEntireStatisticArea.series   						= [];
    this.chartEntireStatisticSpline.series						= [];
    this.chartLeadsConversionRate.series  						= [];
    this.chartOffersConversionRate.series		 				= [];
    
    this.timeframe 				= [];
    
    var date 					= Date.now();
	var currentDate 			= new Date();
	
	var dataProfit 				= [];
	var dataReturn 				= [];
	
	var dataLead 				= [];
	var dataOffer 				= [];
	var dataSale				= [];
	
	var dataConversionLeads 	= [];
	var dataConversionOffers 	= [];
	
    switch(this.selectedPeriod) {
    	case 'day':    		
    		
    		break;
    	case 'week':
    		var oneWeekAgo = new Date();
    		oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
    		while (oneWeekAgo <= currentDate){
    			this.timeframe.push(oneWeekAgo.getDate());
    			oneWeekAgo.setDate(oneWeekAgo.getDate() + 1);    			
    		}
    		
    		break;
    	case 'month':
    		var oneMonthAgo = new Date();
    		oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    		
    		while (oneMonthAgo <= currentDate){
    			this.timeframe.push(oneMonthAgo.getDate());
    			oneMonthAgo.setDate(oneMonthAgo.getDate() + 1)
    		}  
    		
    		break;
    	case 'year':
    		var oneYearAgo = new Date();
    		oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    		while (oneYearAgo <= currentDate){
    			this.timeframe.push(oneYearAgo.toUTCString().split(' ')[2]);
    			oneYearAgo.setMonth(oneYearAgo.getMonth() + 1)
    		} 
    		
    		break;
    	case 'all':
    		var oneYearAgo = new Date(2014, 1, 1);

    		while (oneYearAgo <= currentDate){
    			console.log(oneYearAgo);
    			this.timeframe.push(oneYearAgo.getFullYear());
        		oneYearAgo.setFullYear(oneYearAgo.getFullYear() + 1); 
    		}
    		
    		break;
    	default:
    		console.log("Timeframe not found");
    }
    
    switch(selectedPeriod) {
	    case 'day':
	    	this.leadsService.day().$promise.then(function (result) {
	    	    vm.getLeads(result);
	    	});
	    	
	    	this.offersService.day().$promise.then(function (result) {
	    		vm.getOffers(result);
	    	});
	    	
	    	this.salesService.day().$promise.then(function (result) {
	    		vm.getSales(result);
	    	});
	    	
	    	this.profitService.day().$promise.then(function (result) {
	    		vm.getProfit(result);
	    	});
	    	
	    	this.turnoverService.day().$promise.then(function (result) {
	    		vm.getTurnover(result);
	    	});
	        break;
	    case 'week':
	    	this.leadsService.week().$promise.then(function (result) {
	    	    vm.getLeads(result);
	    	});
	    	
	    	this.offersService.week().$promise.then(function (result) {
	    		vm.getOffers(result);
	    	});
	    	
	    	this.salesService.week().$promise.then(function (result) {
	    		vm.getSales(result);
	    	});
	    	
	    	this.profitService.week().$promise.then(function (result) {
	    		vm.getProfit(result);
	    	});
	    	
	    	this.turnoverService.week().$promise.then(function (result) {
	    		vm.getTurnover(result);
	    	});
	        break;
	    case 'month':
	    	this.leadsService.month().$promise.then(function (result) {
	    	    vm.getLeads(result);
	    	});
	    	
	    	this.offersService.month().$promise.then(function (result) {
	    		vm.getOffers(result);
	    	});
	    	
	    	this.salesService.month().$promise.then(function (result) {
	    		vm.getSales(result);
	    	});
	    	
	    	this.profitService.month().$promise.then(function (result) {
	    		vm.getProfit(result);
	    	});
	    	
	    	this.turnoverService.month().$promise.then(function (result) {
	    		vm.getTurnover(result);
	    	});
	        break;
	    case 'year':
	    	this.leadsService.year().$promise.then(function (result) {
	    	    vm.getLeads(result);
	    	});
	    	
	    	this.offersService.year().$promise.then(function (result) {
	    		vm.getOffers(result);
	    	});
	    	
	    	this.salesService.year().$promise.then(function (result) {
	    		vm.getSales(result);
	    	});
	    	
	    	this.profitService.year().$promise.then(function (result) {
	    		vm.getProfit(result);
	    	});
	    	
	    	this.turnoverService.year().$promise.then(function (result) {
	    		vm.getTurnover(result);
	    	});
	        break;
	    case 'all':
	    	this.leadsService.all().$promise.then(function (result) {
	    	    vm.getLeads(result);
	    	});
	    	
	    	this.offersService.all().$promise.then(function (result) {
	    		vm.getOffers(result);
	    	});
	    	
	    	this.salesService.all().$promise.then(function (result) {
	    		vm.getSales(result);
	    	});
	    	
	    	this.profitService.all().$promise.then(function (result) {
	    		vm.getProfit(result);
	    	});
	    	
	    	this.turnoverService.all().$promise.then(function (result) {
	    		vm.getTurnover(result);
	    	});
	        break;
	    default:
	        console.log("Time Frame not found.");
    }
    
    this.chartEntireStatisticArea.options.xAxis.categories 		= this.timeframe;
    this.chartEntireStatisticSpline.options.xAxis.categories 	= this.timeframe;    
    this.chartLeadsConversionRate.options.xAxis.categories		= this.timeframe;  
    this.chartOffersConversionRate.options.xAxis.categories		= this.timeframe;
};

