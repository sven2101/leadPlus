/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH. All rights reserved.
 * 
 * NOTICE: All information contained herein is, and remains the property of
 * Eviarc GmbH and its suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to Eviarc GmbH, and are protected
 * by trade secret or copyright law. Dissemination of this information or
 * reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Eviarc GmbH.
 ******************************************************************************/

'use strict';


angular.module('app', [ 'app.services', 'app.dashboard', 'app.login',
		'app.signup', 'app.leads', 'app.offers', 'app.sales', 'app.statistics',
		'app.settings', 'app.profile', 'pascalprecht.translate', 'ngResource',
		'ngRoute', 'ngAnimate', 'ngCookies', 'datatables',
		'datatables.bootstrap', 'datatables.buttons', 'ui.sortable',
		'NgSwitchery', 'toaster', 'highcharts-ng','testModule']);

angular
		.module('app')
		.config(
				[
						'$routeProvider',
						'$httpProvider',
						function($routeProvider, $httpProvider) {
							$routeProvider
									.when(
											'/',
											{
												templateUrl : 'components/dashboard/dashboard.html',
												controller : 'DashboardCtrl',
												controllerAs : 'dashboard',
												authenticated : true
											})
									.when(
											'/dashboard',
											{
												templateUrl : 'components/dashboard/dashboard.html',
												controller : 'DashboardCtrl',
												controllerAs : 'dashboard',
												authenticated : true
											})
									.when(
											'/leads',
											{
												templateUrl : 'components/leads/leads.html',
												controller : 'LeadsCtrl',
												controllerAs : 'lead',
												authenticated : true
											})
									.when(
											'/offers',
											{
												templateUrl : 'components/offers/offers.html',
												controller : 'OffersCtrl',
												controllerAs : 'offer',
												authenticated : true
											})
									.when(
											'/sales',
											{
												templateUrl : 'components/sales/sales.html',
												controller : 'SalesCtrl',
												controllerAs : 'sale',
												authenticated : true
											})
									.when(
											'/statistic',
											{
												templateUrl : 'components/statistics/statistics.html',
												controller : 'StatisticsCtrl',
												controllerAs : 'statistic',
												authenticated : true
											})
									.when(
											'/settings',
											{
												templateUrl : 'components/settings/settings.html',
												controller : 'SettingsController',
												controllerAs : 'setting',
												authenticated : true
											})
									.when(
											'/profile',
											{
												templateUrl : 'components/profile/profile.html',
												controller : 'ProfileController',
												controllerAs : 'profile',
												authenticated : true
											})
									.when(
											'/signup',
											{
												templateUrl : 'components/signup/signup.html',
												controller : 'SignUpController',
												controllerAs : "signup"
											})
									.when(
											'/login',
											{
												templateUrl : 'components/login/login.html',
												controller : 'LoginController',
												controllerAs : 'login'
											}).when(
											'/test',
											{
												templateUrl : 'components/test/test.html',
												controller : 'TestController',
												controllerAs : 'testCtrl'
											}).otherwise({
										redirectTo : '/'
									});

							$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

						} ])
		.run(
				[
						'$location',
						'$http',
						'$rootScope',
						'Auth',
						'$cookieStore',
						function($location, $http, $rootScope, Auth,
								$cookieStore) {

							$rootScope.globals = $cookieStore.get('globals')
									|| {};
							if ($rootScope.globals.currentUser) {
								$http.defaults.headers.common['Authorization'] = 'Basic '
										+ $rootScope.globals.currentUser.authorization;
							}

							$rootScope.$on('$routeChangeStart', function(event,
									next, current) {

								if (next.authenticated === true) {
									if (!$rootScope.globals.currentUser) {
										$location.path('/login');
									}
								}
							});

							$rootScope.logout = function() {
								$location.path('/login');
								Auth.logout();
							};

						} ]);

angular
		.module('app')
		.controller(
				'appCtrl',
				function($translate, $scope, $rootScope, $interval, Processes,
						Profile) {
					$rootScope.leadsCount = 0;
					$rootScope.offersCount = 0;
					$rootScope.loadLabels = function() {
						if (!angular
								.isUndefined($rootScope.globals.currentUser)) {
							Processes.getProcessByLeadAndStatus({
								status : 'open'
							}).$promise.then(function(result) {
								$rootScope.leadsCount = result.length;
							});
							Processes.getProcessByOfferAndStatus({
								status : 'offer'
							}).$promise.then(function(result) {
								$rootScope.offersCount = result.length;
							});
						}
					}
					$rootScope.loadLabels();

					$rootScope.changeLanguage = function(langKey) {
						$translate.use(langKey);
						$rootScope.language = langKey;
					};

					$rootScope.setUserDefaultLanguage = function() {
						if (!angular
								.isUndefined($rootScope.globals.currentUser)) {
							Profile
									.get({
										username : $rootScope.globals.currentUser.username
									}).$promise.then(function(result) {
								$rootScope.changeLanguage(result.language);
							});
						}
					}

					$rootScope.setUserDefaultLanguage();

					var stop;
					$rootScope.$on('$destroy', function() {
						if (angular.isDefined(stop)) {
							$interval.cancel(stop);
							stop = undefined;
						}
					});
					stop = $interval(function() {
						if (!angular
								.isUndefined($rootScope.globals.currentUser)) {
							Processes.getProcessByLeadAndStatus({
								status : 'open'
							}).$promise.then(function(result) {
								$rootScope.leadsCount = result.length;
							});
							Processes.getProcessByOfferAndStatus({
								status : 'offer'
							}).$promise.then(function(result) {
								$rootScope.offersCount = result.length;
							});
						}
					}.bind(this), 300000);

				});
