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
	  .when('/registration', {
		  templateUrl: 'component/registration/registration.html',
		  controller: 'RegistrationCtrl',
		  controllerAs: "registration"
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
	  
	  // $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

	}])
	.run(function($location, $http, $rootScope) {
		
		// register listener to watch route changes
	 	/*
		$rootScope.$on("$locationChangeStart", function(event, next, current) {

	 		if($location.path() === "/upload" && $rootScope.authenticated === false) {	
	 			$location.path('/login');	
	 		}
	 		
	 		if($location.path() === "/settings" && $rootScope.authenticated === false) {	
	 			$location.path('/login');
	 		}
	    });
	 	 */
		
		$rootScope.user = [];
		$rootScope.getUser = function() {
			$http.get('./user').success(
	      		function(data, status, headers, config) {
	      			if (data.name !== null) {
                    	$rootScope.user = data.name;
                    	$rootScope.authenticated = true;
                    	$rootScope.authority = data.role;
                    }
	      		}).error(function(data, status, headers, config) {
					$rootScope.authenticated = false;
	    		}); 	
		};
			
		$rootScope.getUser();
			
		$rootScope.logout = function() {
			$http.post('logout', {}).success(function() {
				$rootScope.authenticated = false;
				$location.path("/login");
			}).error(function(data) {
				$location.path("/login");
				$rootScope.authenticated = false;
			});
		};
});;

angular.module('app').controller('appCtrl', function($translate,$scope) {
	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
		$scope.language = langKey;
	};
});