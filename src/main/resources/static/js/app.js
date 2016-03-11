/**
 * Created by Andreas on 16.05.2015.
 */

'use strict';

angular.module('app', [
    'app.services',
    'app.dashboard',
    'app.lead',
    'app.login',
    'app.logout',
    'app.sales',
    'app.settings',
    'app.statistics',
    'app.signup',
    'ngResource',
    'ngRoute'
]);

angular.module('app')
    .config(['$routeProvider', function($routeProvider) {
        
    $routeProvider.when("/", {
	    templateUrl: "index.html",
	  })
	  .when("/dashboard", {
		  templateUrl: 'component/dashboard/dashboard.html',
		  controller: "component/dashboard/dashboard.js",
		  controllerAs: "dashboard"
	  })
	  .when("/data", {
		  templateUrl: "component/leads/leads.html",
		  controller: "component/leads/leads.js",
		  controllerAs: "data"
	  })
	  .when("/login", {
		  templateUrl: "component/login/login.html",
		  controller: "component/login/login.js",
		  controllerAs: "login"
	  })
	  .when("/logout", {
		  templateUrl: "component/logout/logout.html",
		  controller: "component/logout/logout.js",
		  controllerAs: "logout"
	  })
	  .when("/sales", {
		  templateUrl: "component/sales/sales.html",
		  controller: "component/sales/sales.js",
		  controllerAs: "sales"
	  })
	  .when("/settings", {
		  templateUrl: "component/settings/settings.html",
		  controller: "component/settings/settings.js",
		  controllerAs: "settings"
	  })
	  .when("/signup", {
		  templateUrl: "component/signup/signup.html",
		  controller: "component/signup/signup.js",
		  controllerAs: "signup"
	  })
	  .when("/statistic", {
		  templateUrl: "component/statistics/statistics.html",
		  controller: "component/statistics/statistics.js",
		  controllerAs: "statistics"
	  })
	  .otherwise({
	    redirectTo: "/"
	  });
	}]);
