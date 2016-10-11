/// <reference path="../app/App.Constants.ts" />
/// <reference path="../app/App.Authentication.Service.ts" />
/// <reference path="../Profile/controller/Profile.Service.ts" />

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
                authenticated: true,
                package: "basic"
            })
            .when("/dashboard",
            {
                templateUrl: "components/Dashboard/view/Dashboard.html",
                controller: "DashboardController",
                controllerAs: "dashboardCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/leads/:processId?",
            {
                templateUrl: "components/Lead/view/Lead.html",
                controller: "LeadController",
                controllerAs: "leadCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/offers/:processId?",
            {
                templateUrl: "components/Offer/view/Offer.html",
                controller: "OfferController",
                controllerAs: "offerCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/sales/:processId?",
            {
                templateUrl: "components/Sale/view/Sale.html",
                controller: "SaleController",
                controllerAs: "saleCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/statistic",
            {
                templateUrl: "components/Statistic/view/Statistic.html",
                controller: "StatisticController",
                controllerAs: "statisticCtrl",
                authenticated: true,
                package: "pro"
            })
            .when("/settings",
            {
                templateUrl: "components/Setting/view/Setting.html",
                controller: "SettingController",
                controllerAs: "settingCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/settings/detail/:userId",
            {
                templateUrl: "components/Setting/view/UserDetail.html",
                controller: "UserDetailController",
                controllerAs: "UserDetailCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/profile",
            {
                templateUrl: "components/Profile/view/Profile.html",
                controller: "ProfileController",
                controllerAs: "profileCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/signup",
            {
                templateUrl: "components/Signup/view/signup.html",
                controller: "SignupController",
                controllerAs: "signupCtrl"
            })
            .when("/tenants/registration",
            {
                templateUrl: "components/Tenant/Registration/view/registration.html",
                controller: "RegistrationController",
                controllerAs: "registrationCtrl"
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
                authenticated: true,
                package: "basic"
            }).when("/product/detail/:productId",
            {
                templateUrl: "components/Product/view/ProductDetail.html",
                controller: "ProductDetailController",
                controllerAs: "ProductDetailCtrl",
                authenticated: true,
                package: "basic"
            }).when("/customer",
            {
                templateUrl: "components/Customer/view/Customer.html",
                controller: "CustomerController",
                controllerAs: "customerCtrl",
                authenticated: true,
                package: "basic"
            }).when("/customer/detail/:customerId",
            {
                templateUrl: "components/Customer/view/CustomerDetail.html",
                controller: "CustomerDetailController",
                controllerAs: "customerDetailCtrl",
                authenticated: true,
                package: "basic"
            }).when("/401",
            {
                templateUrl: "components/Common/view/Unauthorized.html",
                package: "basic"
            }).when("/403",
            {
                templateUrl: "components/Common/view/Forbidden.html",
                package: "basic"
            }).when("/404",
            {
                templateUrl: "components/Common/view/NotFound.html",
                package: "basic"
            }).otherwise({
                redirectTo: "/404"
            });

        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

        $httpProvider.interceptors.push(function ($q, $location) {
            return {
                "responseError": function (rejection) {
                    let defer = $q.defer();
                    if (rejection.status === 401 && rejection.config.url !== "user") {
                        $location.path("/401");
                    }
                    else if (rejection.status === 403) {
                        $location.path("/403");
                    }
                    else if (rejection.status === 404) {
                        $location.path("/404");
                    }
                    defer.reject(rejection);

                    return defer.promise;
                }
            };
        });

    }])
    .run([$locationId, $httpId, $rootScopeId, AuthServiceId, $cookieStoreId, $injectorId, ProfileServiceId,
        function ($location, $http, $rootScope, Auth, $cookieStore, $injector, ProfileService) {
            $rootScope.globals = $cookieStore.get("globals") || {};
            if ($rootScope.globals.user) {
                $http.defaults.headers.common["Authorization"] = "Basic "
                    + $rootScope.globals.user.authorization;
            }
            let initialLoaded = true;
            $rootScope.$on("$routeChangeStart", function (event,
                next, current) {

                if (next.authenticated === true) {
                    if (initialLoaded) {
                        initialLoaded = false;
                    }
                    if (!$rootScope.globals.user || !$rootScope.globals.tenant) {
                        $location.path("/login");
                    }
                    else if (!hasLicense($rootScope.globals.tenant.license, next.package)) {
                        $location.path("/");
                    }
                    else {
                        $injector.get("DashboardService");
                    }
                }
            });
            $rootScope.logout = function () {
                $location.path("/login");
                Auth.logout();
            };

        }]);