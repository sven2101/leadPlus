/**
 * Created by Andreas on 17.05.2015.
 */
'use strict';

angular.module('app.services', ['ngResource'])
    .service('Auth', function ($http, $rootScope, $cookieStore, $location, $window) {

        return {

            signup: function (user, success, error) {

                $http.post('./api/rest/registrations', user, {
                        headers: {'Content-Type': "application/json"}
                    })
                    .success(success)
                    .error(error);
            },

            login: function (credentials, success, error) {

                if (credentials) {

                    var authorization = btoa(credentials.username + ":" + credentials.password);
                    var headers = credentials ? {authorization: "Basic " + authorization} : {};

                    $http.get('user', {headers: headers}).success(function (data) {

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
        return $resource('/application/api/rest/processes/:id', {}, {
            getLead: {url: '/application/api/rest/processes/:id/leads', method: 'GET'},
            addLead: {url: '/application/api/rest/processes/:id/leads', method: 'POST'},
            putLead: {url: '/application/api/rest/processes/leads/:id', method: 'PUT'},
            deleteLead: {url: '/application/api/rest/processes/leads/:id', method: 'DELETE'},
            getOffer: {url: '/application/api/rest/processes/:id/offers', method: 'GET'},
            addOffer: {url: '/application/api/rest/processes/:id/offers', method: 'POST'},
            putOffer: {url: '/application/api/rest/processes/offers/:id', method: 'PUT'},
            deleteOffer: {url: '/application/api/rest/processes/offers/:id', method: 'DELETE'},
            getSale: {url: '/application/api/rest/processes/:id/sales', method: 'GET'},
            addSale: {url: '/application/api/rest/processes/:id/sales', method: 'POST'},
            putSale: {url: '/application/api/rest/processes/sales/:id', method: 'PUT'},
            deleteSale: {url: '/application/api/rest/processes/sales/:id', method: 'DELETE'},
            getProcessor: {url: '/application/api/rest/processes/:id/processors', method: 'GET'},
            setProcessor: {url: '/application/api/rest/processes/:id/processors', method: 'PUT'},
            getComments: {url: '/application/api/rest/processes/:id/comments', method: 'GET', isArray: true},
            addComment: {url: '/application/api/rest/processes/:id/comments', method: 'POST'},
            getStatus: {url: '/application/api/rest/processes/:id/:status', method: 'GET'},
            setStatus: {url: '/application/api/rest/processes/:id/status', method: 'PUT'},
            getByStatus: {url: '/application/api/rest/processes/status/:status', method: 'GET', isArray: true},
            addProcess: {url: '/application/api/rest/processes', method: 'POST'},
            putProcess: {url: '/application/api/rest/processes/:id', method: 'PUT'},
            deleteProcess: {url: '/application/api/rest/processes/:id', method: 'DELETE'},
            getProcessByLead: {url: '/application/api/rest/processes/leads', method: 'GET', isArray: true},
            getProcessByOffer: {url: '/application/api/rest/processes/offers', method: 'GET', isArray: true},
            getProcessBySale: {url: '/application/api/rest/processes/sales', method: 'GET', isArray: true},
            getProcessByLeadAndStatus: {
                url: '/application/api/rest/processes/state/:status/leads',
                method: 'GET',
                isArray: true
            },
            getProcessByOfferAndStatus: {
                url: '/application/api/rest/processes/state/:status/offers',
                method: 'GET',
                isArray: true
            },
            getProcessBySaleAndStatus: {
                url: '/application/api/rest/processes/state/:status/sales',
                method: 'GET',
                isArray: true
            },
            getLatestSales: {
                url: '/application/api/rest/processes/latestSales', method: 'GET', isArray: true
            }
        });
    }])
    .service('Profile', ['$resource', function ($resource) {
        return $resource('/application/users/:username', {}, {
            update: {url: '/application/users/:username/update', method: 'PUT'},
            pw: {url: '/application/users/:username/pw', method: 'PUT'}
        });
    }])
    .service('Settings', ['$resource', function ($resource) {
        return $resource('/application/users/:username', {username: '@Username'}, {
            activate: {url: '/application/users/:username/activate', method: 'PUT'},
            setRole: {url: '/application/users/:username/role', method: 'POST'},
            getSalesStatistics: {url: '/application/api/rest/processes/statitstics/sales', method: 'POST'},
            getProfitStatistics: {url: '/application/api/rest/processes/statitstics/profits', method: 'POST'},
            getReturnStatistics: {url: '/application/api/rest/processes/statitstics/returns', method: 'POST'}
        });
    }])
    .service('Turnover', ['$resource', function ($resource) {
        return $resource('/application/api/rest/processes/statistics/turnover', {}, {
            day: {url: '/application/api/rest/processes/statistics/turnover/day', method: 'GET'},
            week: {url: '/application/api/rest/processes/statistics/turnover/week', method: 'GET'},
            month: {url: '/application/api/rest/processes/statistics/turnover/month', method: 'GET'},
            year: {url: '/application/api/rest/processes/statistics/turnover/year', method: 'GET'},
            all: {url: '/application/api/rest/processes/statistics/turnover/all', method: 'GET'}
        });
    }])
    .service('Profit', ['$resource', function ($resource) {
        return $resource('/application/api/rest/processes/statistics/profit', {}, {
            day: {url: '/application/api/rest/processes/statistics/profit/day', method: 'GET'},
            week: {url: '/application/api/rest/processes/statistics/profit/week', method: 'GET'},
            month: {url: '/application/api/rest/processes/statistics/profit/month', method: 'GET'},
            year: {url: '/application/api/rest/processes/statistics/profit/year', method: 'GET'},
            all: {url: '/application/api/rest/processes/statistics/profit/all', method: 'GET'}
        });
    }])
    .service('Leads', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics/leads', {}, {
            day: {url: '/application/api/rest/processes/statistics/leads/day', method: 'GET'},
            week: {url: '/application/api/rest/processes/statistics/leads/week', method: 'GET'},
            month: {url: '/application/api/rest/processes/statistics/leads/month', method: 'GET'},
            year: {url: '/application/api/rest/processes/statistics/leads/year', method: 'GET'},
            all: {url: '/application/api/rest/processes/statistics/leads/all', method: 'GET'}
        });
    }])
    .service('Offers', ['$resource', function ($resource) {
        return $resource('/application/api/rest/processes/statistics/offers', {}, {
            day: {url: '/application/api/rest/processes/statistics/offers/day', method: 'GET'},
            week: {url: '/application/api/rest/processes/statistics/offers/week', method: 'GET'},
            month: {url: '/application/api/rest/processes/statistics/offers/month', method: 'GET'},
            year: {url: '/application/api/rest/processes/statistics/offers/year', method: 'GET'},
            all: {url: '/application/api/rest/processes/statistics/offers/all', method: 'GET'}
        });
    }])
    .service('Sales', ['$resource', function ($resource) {
        return $resource('/application/api/rest/processes/statistics/sales', {}, {
            day: {url: '/application/api/rest/processes/statistics/sales/day', method: 'GET'},
            week: {url: '/application/api/rest/processes/statistics/sales/week', method: 'GET'},
            month: {url: '/application/api/rest/processes/statistics/sales/month', method: 'GET'},
            year: {url: '/application/api/rest/processes/statistics/sales/year', method: 'GET'},
            all: {url: '/application/api/rest/processes/statistics/sales/all', method: 'GET'}
        });
    }]);
