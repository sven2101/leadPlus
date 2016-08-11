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
    
    /*.service('Auth', function ($http, $rootScope, $cookieStore, $location, $window) {

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
                                    id: data.id,
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
    */
    .service('LeadResource', ['$resource', function ($resource) {
        return $resource('/api/rest/leads/:id', {}, {
            getAll: { url: '/api/rest/leads', method: 'GET' },
            getById: { url: '/api/rest/leads/:id', method: 'GET' },
            save: { url: '/api/rest/leads/', method: 'POST' },
            update: { url: '/api/rest/leads', method: 'PUT' },
            drop: { url: '/api/rest/leads/:id', method: 'DELETE' },
        });
    }])
    .service('OfferResource', ['$resource', function ($resource) {
        return $resource('/api/rest/offers/:id', {}, {
            getAll: { url: '/api/rest/offers', method: 'GET' },
            getById: { url: '/api/rest/offers/:id', method: 'GET' },
            save: { url: '/api/rest/offers/', method: 'POST' },
            update: { url: '/api/rest/offers', method: 'PUT' },
            drop: { url: '/api/rest/offers/:id', method: 'DELETE' },
        });
    }])
    .service('SaleResource', ['$resource', function ($resource) {
        return $resource('/api/rest/sales/:id', {}, {
            getAll: { url: '/api/rest/sales', method: 'GET' },
            getById: { url: '/api/rest/sales/:id', method: 'GET' },
            save: { url: '/api/rest/sales/', method: 'POST' },
            update: { url: '/api/rest/sales', method: 'PUT' },
            drop: { url: '/api/rest/sales/:id', method: 'DELETE' },
        });
    }])
    .service('ProcessResource', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/:id', {}, {
            getById: { url: '/api/rest/processes/:id', method: 'GET' },
            getStatus: { url: '/api/rest/processes/:id/status', method: 'GET' },
            getAll: { url: '/api/rest/processes', method: 'GET', isArray: true },
            save: { url: '/api/rest/processes', method: 'POST' },
            update: { url: '/api/rest/processes', method: 'PUT' },
            drop: { url: '/api/rest/processes/:id', method: 'DELETE' },
            
            createOffer:{ url: '/api/rest/processes/:id/offers', method: 'POST' },
            createSale:{ url: '/api/rest/processes/:id/sales', method: 'POST' },
           
            getProcessor: { url: '/api/rest/processes/:id/processors', method: 'GET' },
            setProcessor: { url: '/api/rest/processes/:id/processors', method: 'PUT' },
            removeProcessor: { url: '/api/rest/processes/:id/processors', method: 'DELETE' },

            setStatus: { url: '/api/rest/processes/:id/status/:status', method: 'PUT'},
            getByStatus: { url: '/api/rest/processes/status/:status', method: 'GET'},

            getProcessByLead: { url: '/api/rest/processes/leads', method: 'GET', isArray: true },
            getProcessByOffer: { url: '/api/rest/processes/offers', method: 'GET', isArray: true },
            getProcessBySale: { url: '/api/rest/processes/sales', method: 'GET', isArray: true },

            getLeadsByStatus: {url: '/api/rest/processes/workflow/:workflow/state/:status', method: 'GET', isArray: true},
            getOffersByStatus: {url: '/api/rest/processes/workflow/:workflow/state/:status',method: 'GET', isArray: true},
            getSalesByStatus: {url: '/api/rest/processes/workflow/:workflow/state/:status',method: 'GET',isArray: true },
            getFollowUpsByStatus: {url: '/api/rest/processes/workflow/:workflow/state/:status',method: 'GET',isArray: true },
            getLatestSales: {url: '/api/rest/processes/sales/latest/10', method: 'GET', isArray: true},
            getLatest100Sales: {url: '/api/rest/processes/sales/latest/100', method: 'GET', isArray: true}
        });
    }])
    .service('CommentResource', ['$resource', function ($resource) {
        return $resource('/api/rest/comments/', {}, {
            getByProcessId: { url: '/api/rest/comments/processes/:id', method: 'GET', isArray: true },
            getById: { url: '/api/rest/comments/:id', method: 'GET' },
            save: { url: '/api/rest/comments/', method: 'POST' },
            update: { url: '/api/rest/comments', method: 'PUT' },
            drop: { url: '/api/rest/comments/:id', method: 'DELETE' }
        });
    }])
    .service('UserResource', ['$resource', function ($resource) {
        return $resource('/users/:id', {}, {
            update: { url: '/users', method: 'PUT' },
            changePassword: { url: '/users/:id/pw', method: 'PUT' }
        });
    }])
    .service('SettingsResource', ['$resource', function ($resource) {
        return $resource('/users/:id', {}, {
        	getAll: { url: '/users/all', method: 'GET',  isArray: true},
            activate: { url: '/users/:id/activate', method: 'PUT' },
            setRole: { url: '/users/:id/role', method: 'PUT' }
        });
    }])
    .service('StatisticResource', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics', {}, {
            getWorkflowStatistic: {
                url: '/api/rest/processes/statistics/workflow/:workflow/daterange/:dateRange', method: 'GET'
            },
            getProfitStatistic: {
                url: '/api/rest/processes/statistics/profit/:workflow/daterange/:dateRange', method: 'GET'
            },   
            getTurnoverStatistic: {
                url: '/api/rest/processes/statistics/turnover/:workflow/daterange/:dateRange', method: 'GET'
            }
        });
    }]).service('ProductResource', ['$resource', function ($resource) {
        return $resource('/api/rest/product', {}, {
            getProductById: { url: '/api/rest/product/:id', method: 'GET' },
            getAllProducts: { url: '/api/rest/product', method: 'GET', isArray: true },
            createProduct: { url: '/api/rest/product', method: 'POST' },
            updateProduct: { url: '/api/rest/product', method: 'PUT' },
            deleteProduct: { url: '/api/rest/product', method: 'DELETE' }
        });
    }]).service('CustomerResource', ['$resource', function ($resource) {
        return $resource('/api/rest/customer', {}, {
            getCustomerById: { url: '/api/rest/customer/:id', method: 'GET' },
            getAllCustomer: { url: '/api/rest/customer', method: 'GET', isArray: true },
            createCustomer: { url: '/api/rest/customer', method: 'POST' },
            updateCustomer: { url: '/api/rest/customer', method: 'PUT' },
            deleteCustomer: { url: '/api/rest/customer', method: 'DELETE' }
        });
    }]);