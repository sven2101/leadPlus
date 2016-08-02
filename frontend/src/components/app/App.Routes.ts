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
"use strict";

angular.module("app").config(["$routeProvider", "$httpProvider",
    function ($routeProvider, $httpProvider) {
        $routeProvider
            .when("/",
            {
                templateUrl: "components/dashboard/dashboard.html",
                controller: "DashboardController",
                controllerAs: "dashboard",
                authenticated: true
            })
            .when("/dashboard",
            {
                templateUrl: "components/dashboard/dashboard.html",
                controller: "DashboardController",
                controllerAs: "dashboard",
                authenticated: true
            })
            .when("/leads",
            {
                templateUrl: "components/leads/leads.html",
                controller: "LeadController",
                controllerAs: "lead",
                authenticated: true
            })
            .when("/offers",
            {
                templateUrl: "components/offers/offers.html",
                controller: "OfferController",
                controllerAs: "offer",
                authenticated: true
            })
            .when("/sales",
            {
                templateUrl: "components/sales/sales.html",
                controller: "SalesCtrl",
                controllerAs: "sale",
                authenticated: true
            })
            .when("/statistic",
            {
                templateUrl: "components/statistics/statistics.html",
                controller: "StatisticContoller",
                controllerAs: "statistic",
                authenticated: true
            })
            .when("/settings",
            {
                templateUrl: "components/settings/settings.html",
                controller: "SettingsController",
                controllerAs: "setting",
                authenticated: true
            })
            .when("/profile",
            {
                templateUrl: "components/profile/profile.html",
                controller: "ProfileController",
                controllerAs: "profile",
                authenticated: true
            })
            .when("/signup",
            {
                templateUrl: "components/signup/signup.html",
                controller: "SignUpController",
                controllerAs: "signup"
            })
            .when("/login",
            {
                templateUrl: "components/login/login.html",
                controller: "LoginController",
                controllerAs: "login"
            }).when("/test",
            {
                templateUrl: "components/test/test.html",
                controller: "TestController",
                controllerAs: "testCtrl"
            }).otherwise({
                redirectTo: "/"
            });

        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

    }])
    .run(["$location", "$http", "$rootScope", "Auth", "$cookieStore",
        function ($location, $http, $rootScope, Auth, $cookieStore) {
            $rootScope.globals = $cookieStore.get("globals") || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common["Authorization"] = "Basic "
                    + $rootScope.globals.currentUser.authorization;
            }
            $rootScope.$on("$routeChangeStart", function (event,
                next, current) {

                if (next.authenticated === true) {
                    if (!$rootScope.globals.currentUser) {
                        $location.path("/login");
                    }
                }
            });
            $rootScope.logout = function () {
                $location.path("/login");
                Auth.logout();
            };

        }]);