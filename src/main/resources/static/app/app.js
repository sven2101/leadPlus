/**
 * Created by Andreas on 16.05.2015.
 */

'use strict';

angular.module('app', [
    'app.services',
    'app.dashboard',
    'app.lead',
    'app.login',
    'app.signup',
    'app.sales',
    'app.settings',
    'app.statistics',
	'pascalprecht.translate',
	'ngResource',
    'ngRoute',
	'ngAnimate',
	'ngCookies'
]);

angular.module('app')
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
		.when('/', {
			templateUrl: 'component/dashboard/dashboard.html',
			controller: 'DashboardCtrl',
			controllerAs: 'dashboard',
			authenticated: true
		})
		.when('/dashboard', {
			templateUrl: 'component/dashboard/dashboard.html',
			controller: 'DashboardCtrl',
			controllerAs: 'dashboard',
			authenticated: true
		})
		.when('/leads', {
			templateUrl: 'component/leads/leads.html',
		  	controller: 'LeadCtrl',
		  	controllerAs: 'lead',
			authenticated: true
		})
		.when('/sales', {
			templateUrl: 'component/sales/sales.html',
			controller: 'SalesCtrl',
			controllerAs: 'sales',
			authenticated: true
		})
		.when('/statistics', {
			templateUrl:'component/statistics/statistics.html',
			controller: 'StatisticsCtrl',
			controllerAs: 'statistics',
			authenticated: true
		})
		.when('/settings', {
			templateUrl: 'component/settings/settings.html',
			controller: 'SettingsCtrl',
			controllerAs: 'settings',
			authenticated: true
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
		.when('/signup', {
			templateUrl: 'component/signup/signup.html',
			controller: 'SignUpCtrl',
			controllerAs: 'signup'
		})
		.otherwise({
			redirectTo: '/'
		})
	  
	   $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

	}])
	.run([ '$location', '$http', '$rootScope', 'Auth', '$cookieStore', function($location, $http, $rootScope, Auth, $cookieStore) {
		
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authorization;
            console.log("authorization: ", $rootScope.globals.currentUser.authorization);
        } 
		
 		$rootScope.$on('$routeChangeStart', function(event, next, current) {
		
	 		if(next.authenticated === true) {
	 			if(!$rootScope.globals.currentUser) {
	 				$location.path('/login');	
	 			}
	 		}	
	    });
		
		$rootScope.logout = function() {
			Auth.logout();
			console.log("Successful logout.");
		};
	    
	 }]);



angular.module('app').controller('appCtrl', function($translate,$scope) {
	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
		$scope.language = langKey;
	};
});