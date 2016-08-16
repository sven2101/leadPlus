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
                templateUrl: "components/Dashboard/Dashboard.html",
                controller: "DashboardController",
                controllerAs: "dashboard",
                authenticated: true
            })
            .when("/dashboard",
            {
                templateUrl: "components/Dashboard/Dashboard.html",
                controller: "DashboardController",
                controllerAs: "dashboard",
                authenticated: true
            })
            .when("/leads",
            {
                templateUrl: "components/Lead/Lead.html",
                controller: "LeadController",
                controllerAs: "lead",
                authenticated: true
            })
            .when("/offers",
            {
                templateUrl: "components/Offer/Offer.html",
                controller: "OffersController",
                controllerAs: "offer",
                authenticated: true
            })
            .when("/sales",
            {
                templateUrl: "components/Sale/Sale.html",
                controller: "SaleController",
                controllerAs: "sale",
                authenticated: true
            })
            .when("/statistic",
            {
                templateUrl: "components/Statistic/view/Statistic.html",
                controller: "StatisticController",
                controllerAs: "statisticCtrl",
                authenticated: true
            })
            .when("/settings",
            {
                templateUrl: "components/Setting/view/Setting.html",
                controller: "SettingController",
                controllerAs: "setting",
                authenticated: true
            })
            .when("/profile",
            {
                templateUrl: "components/Profile/Profile.html",
                controller: "ProfileController",
                controllerAs: "profile",
                authenticated: true
            })
            .when("/signup",
            {
                templateUrl: "components/Signup/Signup.html",
                controller: "SignUpController",
                controllerAs: "signup"
            })
            .when("/login",
            {
                templateUrl: "components/Login/Login.html",
                controller: "LoginController",
                controllerAs: "login"
            }).when("/product",
            {
                templateUrl: "components/Product/Product.html",
                controller: "ProductController",
                controllerAs: "productCtrl",
                authenticated: true
            }).when("/customer",
            {
                templateUrl: "components/Customer/Customer.html",
                controller: "CustomerController",
                controllerAs: "customerCtrl",
                authenticated: true
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