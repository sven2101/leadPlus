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
	'pascalprecht.translate',
	'ngResource',
    'ngRoute',
	'ngAnimate'
]);

angular.module('app')
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider
		.when('/', {
			templateUrl: 'component/dashboard/dashboard.html',
			controller: 'DashboardCtrl',
			controllerAs: 'dashboard'
		})
	  .when('/dashboard', {
		  templateUrl: 'component/dashboard/dashboard.html',
		  controller: 'DashboardCtrl',
		  controllerAs: 'dashboard'
	  })
	  .when('/lead', {
		  templateUrl: 'component/leads/leads.html',
		  controller: 'LeadCtrl',
		  controllerAs: 'lead'
	  })
	  .when('/sales', {
		  templateUrl: 'component/sales/sales.html',
		  controller: 'SalesCtrl',
		  controllerAs: 'sales'
	  })
		.when('/statistic', {
			templateUrl:'component/statistics/statistics.html',
			controller: 'StatisticsCtrl',
			controllerAs: 'statistics'
		})
	  .when('/settings', {
		  templateUrl: 'component/settings/settings.html',
		  controller: 'SettingsCtrl',
		  controllerAs: 'settings'
	  })
	  .when('/signup', {
		  templateUrl: 'component/signup/signup.html',
		  controller: 'SignUpCtrl',
		  controllerAs: "signup"
	  })
		.when('/login', {
			templateUrl: 'component/login/login.html',
			controller: 'LoginCtrl',
			controllerAs: 'login'
		})
		.when('/logout', {
			templateUrl: 'component/logout/logout.html',
			controller: 'LogoutCtrl',
			controllerAs: 'logout'
		})
	 .otherwise({
	    redirectTo: '/'
	  })
	}]);

angular.module('app').controller('appCtrl', function($translate,$scope) {
	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
		$scope.language = langKey;
	};
});