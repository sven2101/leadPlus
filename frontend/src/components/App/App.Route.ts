/// <reference path="../app/App.Constants.ts" />
/// <reference path="../app/App.Authentication.Service.ts" />

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

angular.module(moduleApp).config([$routeProviderId, $httpProviderId,
    function ($routeProvider, $httpProvider) {
        $routeProvider
            .when("/",
            {
                templateUrl: "components/Dashboard/view/Dashboard.html",
                controller: "DashboardController",
                controllerAs: "dashboardCtrl",
                authenticated: true
            })
            .when("/dashboard",
            {
                templateUrl: "components/Dashboard/view/Dashboard.html",
                controller: "DashboardController",
                controllerAs: "dashboardCtrl",
                authenticated: true
            })
            .when("/leads",
            {
                templateUrl: "components/Lead/view/Lead.html",
                controller: "LeadController",
                controllerAs: "lead",
                authenticated: true
            })
            .when("/offers",
            {
                templateUrl: "components/Offer/view/Offer.html",
                controller: "OffersController",
                controllerAs: "offer",
                authenticated: true
            })
            .when("/sales",
            {
                templateUrl: "components/Sale/view/Sale.html",
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
                controllerAs: "settingCtrl",
                authenticated: true
            })
            .when("/profile",
            {
                templateUrl: "components/Profile/view/Profile.html",
                controller: "ProfileController",
                controllerAs: "profileCtrl",
                authenticated: true
            })
            .when("/signup",
            {
                templateUrl: "components/Signup/view/signup.html",
                controller: "SignupController",
                controllerAs: "signupCtrl"
            })
            .when("/login",
            {
                templateUrl: "components/Login/view/Login.html",
                controller: "LoginController",
                controllerAs: "loginCtrl"
            }).when("/product",
            {
                templateUrl: "components/Product/view/Product.html",
                controller: "ProductController",
                controllerAs: "productCtrl",
                authenticated: true
            }).when("/customer",
            {
                templateUrl: "components/Customer/view/Customer.html",
                controller: "CustomerController",
                controllerAs: "customerCtrl",
                authenticated: true
            }).when("/customer/detail/:customerId",
            {
                templateUrl: "components/Customer/view/CustomerDetail.html",
                controller: "CustomerDetailController",
                controllerAs: "customerDetailCtrl",
                authenticated: true
            }).otherwise({
                redirectTo: "/"
            });

        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

    }])
    .run([$locationId, $httpId, $rootScopeId, AuthServiceId, $cookieStoreId,
        function ($location, $http, $rootScope, Auth, $cookieStore) {
            $rootScope.globals = $cookieStore.get("globals") || {};
            if ($rootScope.globals.user) {
                $http.defaults.headers.common["Authorization"] = "Basic "
                    + $rootScope.globals.user.authorization;
            }
            $rootScope.$on("$routeChangeStart", function (event,
                next, current) {

                if (next.authenticated === true) {
                    if (!$rootScope.globals.user) {
                        $location.path("/login");
                    }
                }
            });
            $rootScope.logout = function () {
                $location.path("/login");
                Auth.logout();
            };

        }]);