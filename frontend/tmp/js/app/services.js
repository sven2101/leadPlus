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

                        if (data.username) {
                            $rootScope.globals = {
                                currentUser: {
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
    .service('Processes', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/:id', {}, {
            getLead: { url: '/api/rest/processes/:id/leads', method: 'GET' },
            addLead: { url: '/api/rest/processes/:id/leads', method: 'POST' },
            putLead: { url: '/api/rest/processes/leads/:id', method: 'PUT' },
            deleteLead: { url: '/api/rest/processes/leads/:id', method: 'DELETE' },
            getOffer: { url: '/api/rest/processes/:id/offers', method: 'GET' },
            addOffer: { url: '/api/rest/processes/:id/offers', method: 'POST' },
            putOffer: { url: '/api/rest/processes/offers/:id', method: 'PUT' },
            deleteOffer: { url: '/api/rest/processes/offers/:id', method: 'DELETE' },
            getSale: { url: '/api/rest/processes/:id/sales', method: 'GET' },
            addSale: { url: '/api/rest/processes/:id/sales', method: 'POST' },
            putSale: { url: '/api/rest/processes/sales/:id', method: 'PUT' },
            deleteSale: { url: '/api/rest/processes/sales/:id', method: 'DELETE' },
            getProcessor: { url: '/api/rest/processes/:id/processors', method: 'GET' },
            setProcessor: { url: '/api/rest/processes/:id/processors', method: 'PUT' },
            removeProcessor: { url: '/api/rest/processes/:id/processors/remove', method: 'DELETE' },
            getStatus: { url: '/api/rest/processes/:id/:status', method: 'GET' },
            setStatus: { url: '/api/rest/processes/:id/status', method: 'PUT' },
            getByStatus: { url: '/api/rest/processes/status/:status', method: 'GET', isArray: true },
            addProcess: { url: '/api/rest/processes', method: 'POST' },
            putProcess: { url: '/api/rest/processes/:id', method: 'PUT' },
            deleteProcess: { url: '/api/rest/processes/:id', method: 'DELETE' },
            getProcessByLead: { url: '/api/rest/processes/leads', method: 'GET', isArray: true },
            getProcessByOffer: { url: '/api/rest/processes/offers', method: 'GET', isArray: true },
            getProcessBySale: { url: '/api/rest/processes/sales', method: 'GET', isArray: true },
            getProcessByLeadAndStatus: {
                url: '/api/rest/processes/state/:status/leads',
                method: 'GET',
                isArray: true
            },
            getProcessByOfferAndStatus: {
                url: '/api/rest/processes/state/:status/offers',
                method: 'GET',
                isArray: true
            },
            getProcessBySaleAndStatus: {
                url: '/api/rest/processes/state/:status/sales',
                method: 'GET',
                isArray: true
            },
            getLatestSales: {
                url: '/api/rest/processes/latestSales', method: 'GET', isArray: true
            },
            getLatest100Sales: {
                url: '/api/rest/processes/latest100Sales', method: 'GET', isArray: true
            }
        });
    }])
    .service('Comments', ['$resource', function ($resource) {
        return $resource('/api/rest/comments/', {}, {
            getComments: { url: '/api/rest/comments/processes/:id', method: 'GET', isArray: true },
            addComment: { url: '/api/rest/comments/processes', method: 'POST' },
        });
    }])
    .service('Profile', ['$resource', function ($resource) {
        return $resource('/users/:username', {}, {
            update: { url: '/users/:username/update', method: 'PUT' },
            pw: { url: '/users/:username/pw', method: 'PUT' }
        });
    }])
    .service('Settings', ['$resource', function ($resource) {
        return $resource('/users/:username', { username: '@Username' }, {
            activate: { url: '/users/:username/activate', method: 'PUT' },
            setRole: { url: '/users/:username/role', method: 'POST' },
            getSalesStatistics: { url: '/api/rest/processes/statitstics/sales', method: 'POST' },
            getProfitStatistics: { url: '/api/rest/processes/statitstics/profits', method: 'POST' },
            getReturnStatistics: { url: '/api/rest/processes/statitstics/returns', method: 'POST' }
        });
    }])
    .service('Turnover', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics/turnover', {}, {
            day: { url: '/api/rest/processes/statistics/turnover/day', method: 'GET' },
            week: { url: '/api/rest/processes/statistics/turnover/week', method: 'GET' },
            month: { url: '/api/rest/processes/statistics/turnover/month', method: 'GET' },
            year: { url: '/api/rest/processes/statistics/turnover/year', method: 'GET' },
            all: { url: '/api/rest/processes/statistics/turnover/all', method: 'GET' }
        });
    }])
    .service('Profit', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics/profit', {}, {
            day: { url: '/api/rest/processes/statistics/profit/day', method: 'GET' },
            week: { url: '/api/rest/processes/statistics/profit/week', method: 'GET' },
            month: { url: '/api/rest/processes/statistics/profit/month', method: 'GET' },
            year: { url: '/api/rest/processes/statistics/profit/year', method: 'GET' },
            all: { url: '/api/rest/processes/statistics/profit/all', method: 'GET' }
        });
    }])
    .service('Leads', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics/leads', {}, {
            day: { url: '/api/rest/processes/statistics/leads/day', method: 'GET' },
            week: { url: '/api/rest/processes/statistics/leads/week', method: 'GET' },
            month: { url: '/api/rest/processes/statistics/leads/month', method: 'GET' },
            year: { url: '/api/rest/processes/statistics/leads/year', method: 'GET' },
            all: { url: '/api/rest/processes/statistics/leads/all', method: 'GET' }
        });
    }])
    .service('Offers', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics/offers', {}, {
            day: { url: '/api/rest/processes/statistics/offers/day', method: 'GET' },
            week: { url: '/api/rest/processes/statistics/offers/week', method: 'GET' },
            month: { url: '/api/rest/processes/statistics/offers/month', method: 'GET' },
            year: { url: '/api/rest/processes/statistics/offers/year', method: 'GET' },
            all: { url: '/api/rest/processes/statistics/offers/all', method: 'GET' }
        });
    }])
    .service('Sales', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics/sales', {}, {
            day: { url: '/api/rest/processes/statistics/sales/day', method: 'GET' },
            week: { url: '/api/rest/processes/statistics/sales/week', method: 'GET' },
            month: { url: '/api/rest/processes/statistics/sales/month', method: 'GET' },
            year: { url: '/api/rest/processes/statistics/sales/year', method: 'GET' },
            all: { url: '/api/rest/processes/statistics/sales/all', method: 'GET' }
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