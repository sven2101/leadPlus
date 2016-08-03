/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

'use strict';

angular.module('app.services', ['ngResource'])
    .service('Auth', function ($http, $rootScope, $cookieStore, $location, $window) {

        return {

            signup: function (user, success, error) {

                $http.post('./api/rest/registrations', user, {
                    headers: { 'Content-Type': "application/json" }
                })
                    .success(success)
                    .error(error);
            },

            login: function (credentials, success, error) {

                if (credentials) {

                    var authorization = btoa(credentials.username + ":" + credentials.password);
                    var headers = credentials ? { authorization: "Basic " + authorization } : {};


                    $http.get('user', { headers: headers }).success(function (data) {


                    $http.get('user', {headers: headers}).success(function (data) {

                        if (data.username) {
                            $rootScope.globals = {
                                currentUser: {
                                	id:data.id,
                                	username: data.username,
                                    role: data.role,
                                    authorization: authorization
                                }
                            };

                            $http.defaults.headers.common['Authorization'] = 'Basic ' + authorization;
                            $cookieStore.put('globals', $rootScope.globals);

                            success(data);
                        } else {
                        }
                    }).error(error);

                }
            },

            logout: function () {

                $rootScope.globals = {};
                console.log("Globals: ", $rootScope.globals);
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic';

                $http.post('logout', {})
                    .success(function () {
                        $location.path("#/login");
                    })
                    .error(function (data) {
                        $location.path("#/login");
                    });
            }
        };
    })
    .service('Leads', ['$resource', function ($resource) {
    	 return $resource('/api/rest/leads/:id', {}, {
             getAll: {url: '/api/rest/leads', method: 'GET'},
    		 getById: {url: '/api/rest/leads/:id', method: 'GET'},
             save: {url: '/api/rest/leads/', method: 'POST'},
             put: {url: '/api/rest/leads', method: 'PUT'},
             drop: {url: '/api/rest/leads/:id', method: 'DELETE'},
    	 });
    }])
    .service('Offers', ['$resource', function ($resource) {
    	 return $resource('/api/rest/offers/:id', {}, {
             getAll: {url: '/api/rest/offers', method: 'GET'},
             getById: {url: '/api/rest/offers/:id', method: 'GET'},
             save: {url: '/api/rest/offers/', method: 'POST'},
             put: {url: '/api/rest/offers', method: 'PUT'},
             drop: {url: '/api/rest/offers/:id', method: 'DELETE'},
    	 });
    }])
    .service('Sales', ['$resource', function ($resource) {
    	 return $resource('/api/rest/sales/:id', {}, {
             getAll: {url: '/api/rest/sales', method: 'GET'},
             getById: {url: '/api/rest/sales/:id', method: 'GET'},
             save: {url: '/api/rest/sales/', method: 'POST'},
             put: {url: '/api/rest/sales', method: 'PUT'},
             drop: {url: '/api/rest/sales/:id', method: 'DELETE'},
    	 });
    }])
    .service('Processes', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/:id', {}, {

                    
        	getById: {url: '/api/rest/processes/:id', method: 'GET'},
            getStatus: {url: '/api/rest/processes/:id/status', method: 'GET'},
        	getAll: {url: '/api/rest/processes', method: 'GET', isArray: true},
        	save: {url: '/api/rest/processes', method: 'POST'},
        	update: {url: '/api/rest/processes', method: 'PUT'},
        	drop: {url: '/api/rest/processes/:id', method: 'DELETE'},
        	
            getProcessor: {url: '/api/rest/processes/:id/processors', method: 'GET'},
            setProcessor: {url: '/api/rest/processes/:id/processors', method: 'PUT'},
            removeProcessor: {url: '/api/rest/processes/:id/processors/remove', method: 'PUT'},
            
            setStatus: {url: '/api/rest/processes/:id/status', method: 'PUT'},
            getByStatus: {url: '/api/rest/processes/status/:status', method: 'GET', isArray: true},
                        
            getProcessByLead: {url: '/api/rest/processes/leads', method: 'GET', isArray: true},
            getProcessByOffer: {url: '/api/rest/processes/offers', method: 'GET', isArray: true},
            getProcessBySale: {url: '/api/rest/processes/sales', method: 'GET', isArray: true},
          
            getLeadsByStatus: {
                url: '/api/rest/processes/workflow/:workflow/state/:status',

                method: 'GET',
                isArray: true
            },
            getOffersByStatus: {
                url: '/api/rest/processes/workflow/:workflow/state/:status',
                method: 'GET',
                isArray: true
            },
            getSalesByStatus: {
                url: '/api/rest/processes/workflow/:workflow/state/:status',
                method: 'GET',
                isArray: true
            },
            getFollowUpsByStatus: {
                url: '/api/rest/processes/workflow/:workflow/state/:status',
                method: 'GET',
                isArray: true
            },
            getLatestSales: {
                url: '/api/rest/processes/sales/latest/10', method: 'GET', isArray: true
            },            
            getLatest100Sales: {
                url: '/api/rest/processes/sales/latest/100', method: 'GET', isArray: true
            }
        });
    }])
    .service('Comments', ['$resource', function ($resource) {
        return $resource('/api/rest/comments/', {}, {
            getByProcessId: {url: '/api/rest/comments/processes/:processId', method: 'GET', isArray: true},
            getById: {url: '/api/rest/comments/:id', method: 'GET'},
            save: {url: '/api/rest/comments/', method: 'POST'},
            update: {url: '/api/rest/comments', method: 'PUT'},
            drop: {url: '/api/rest/comments/:id', method: 'DELETE'}
        });
    }])
    .service('Profile', ['$resource', function ($resource) {
        return $resource('/users/:id', {}, {
            update: {url: '/users/update', method: 'PUT'},
            changePassword: {url: '/users/:id/pw', method: 'PUT'}
        });
    }])
    .service('Settings', ['$resource', function ($resource) {
        return $resource('/users/:userId', {userId: '@userId'}, {
            activate: {url: '/users/:userId/activate', method: 'PUT'},
            setRole: {url: '/users/:userId/role', method: 'POST'}
        });
    }])
    .service('StatisticResource', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics', {}, {
            dayLeads: {url: '/api/rest/processes/statistics/leads/day', method: 'GET',
                isArray: true},
            weekLeads: {url: '/api/rest/processes/statistics/leads/week', method: 'GET',
                isArray: true},
            monthLeads: {url: '/api/rest/processes/statistics/leads/month', method: 'GET',
                isArray: true},
            yearLeads: {url: '/api/rest/processes/statistics/leads/year', method: 'GET',
                isArray: true},
            allLeads: {url: '/api/rest/processes/statistics/leads/all', method: 'GET',
                isArray: true},
       
            dayOffers: {url: '/api/rest/processes/statistics/offers/day', method: 'GET',
                isArray: true},
            weekOffers: {url: '/api/rest/processes/statistics/offers/week', method: 'GET',
                isArray: true},
            monthOffers: {url: '/api/rest/processes/statistics/offers/month', method: 'GET',
                isArray: true},
            yearOffers: {url: '/api/rest/processes/statistics/offers/year', method: 'GET',
                isArray: true},
            allOffers: {url: '/api/rest/processes/statistics/offers/all', method: 'GET',
                isArray: true},

            daySales: {url: '/api/rest/processes/statistics/sales/day', method: 'GET',
                isArray: true},
            weekSales: {url: '/api/rest/processes/statistics/sales/week', method: 'GET',
                isArray: true},
            monthSales: {url: '/api/rest/processes/statistics/sales/month', method: 'GET',
                isArray: true},
            yearSales: {url: '/api/rest/processes/statistics/sales/year', method: 'GET',
                isArray: true},
            allSales: {url: '/api/rest/processes/statistics/sales/all', method: 'GET',
                isArray: true},
            
            dayProfit: {url: '/api/rest/processes/statistics/profit/day', method: 'GET'},
            weekProfit: {url: '/api/rest/processes/statistics/profit/week', method: 'GET'},
            monthProfit: {url: '/api/rest/processes/statistics/profit/month', method: 'GET'},
            yearProfit: {url: '/api/rest/processes/statistics/profit/year', method: 'GET'},
            allProfit: {url: '/api/rest/processes/statistics/profit/all', method: 'GET'},
            
            dayTurnover: {url: '/api/rest/processes/statistics/turnover/day', method: 'GET'},
            weekTurnover: {url: '/api/rest/processes/statistics/turnover/week', method: 'GET'},
            monthTurnover: {url: '/api/rest/processes/statistics/turnover/month', method: 'GET'},
            yearTurnover: {url: '/api/rest/processes/statistics/turnover/year', method: 'GET'},
            allTurnover: {url: '/api/rest/processes/statistics/turnover/all', method: 'GET'}

        });
    }]).service('ProductResource', ['$resource', function ($resource) {
        return $resource('/api/rest/product', {}, {
            getProductById: { url: '/api/rest/product/:id', method: 'GET' },
            getAllProducts: { url: '/api/rest/product', method: 'GET', isArray: true },
            createProduct: { url: '/api/rest/product', method: 'POST' },
            updateProduct: { url: '/api/rest/product', method: 'PUT' },
            deleteProduct: { url: '/api/rest/product', method: 'DELETE' }
        });
    }]);