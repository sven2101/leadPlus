/// <reference path="../app/App.Constants.ts" />
/// <reference path="../app/App.Authentication.Service.ts" />
/// <reference path="../Profile/controller/Profile.Service.ts" />

angular.module(moduleApp).config([$routeProviderId, $httpProviderId, $locationProviderId, $compileProviderId,
    function ($routeProvider, $httpProvider, $locationProvider, $compileProvider) {
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
                controller: "WorkflowController",
                controllerAs: "leadCtrl",
                authenticated: true,
                package: "basic",
                type: WorkflowType.LEAD
            })
            .when("/offers/:processId?",
            {
                templateUrl: "components/Offer/view/Offer.html",
                controller: "WorkflowController",
                controllerAs: "offerCtrl",
                authenticated: true,
                package: "basic",
                type: WorkflowType.OFFER
            })
            .when("/sales/:processId?",
            {
                templateUrl: "components/Sale/view/Sale.html",
                controller: "WorkflowController",
                controllerAs: "saleCtrl",
                authenticated: true,
                package: "basic",
                type: WorkflowType.SALE
            })
            .when("/statistic/:tab?",
            {
                templateUrl: "components/Statistic/view/Statistic.html",
                controller: "StatisticController",
                controllerAs: "statisticCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/settings/:tab?",
            {
                templateUrl: "components/Setting/view/Setting.html",
                controller: "SettingController",
                controllerAs: "settingCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/statistic/user/detail/:userId",
            {
                templateUrl: "components/Statistic/view/UserDetail.html",
                controller: "UserDetailController",
                controllerAs: "UserDetailCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/profile",
            {
                templateUrl: "components/Profile/view/ProfileMain.html",
                controller: "ProfileController",
                controllerAs: "profileCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/licence",
            {
                templateUrl: "components/Licence/view/Licence.html",
                controller: "RegistrationController",
                controllerAs: "registrationCtrl",
                package: "basic"
            })
            .when("/signup",
            {
                templateUrl: "components/Signup/view/Signup.html",
                controller: "SignupController",
                controllerAs: "signupCtrl",
                package: "basic"
            })
            .when("/tenants/registration",
            {
                templateUrl: "components/Tenant/registration/view/Registration.html",
                controller: "RegistrationController",
                controllerAs: "registrationCtrl"
            })
            .when("/login",
            {
                templateUrl: "components/Login/view/Login.html",
                controller: "LoginController",
                controllerAs: "loginCtrl",
            }).when("/product",
            {
                templateUrl: "components/Product/view/Product.html",
                controller: "ProductController",
                controllerAs: "productCtrl",
                authenticated: true,
                package: "basic"
            }).when("/statistic/product/detail/:productId",
            {
                templateUrl: "components/Statistic/view/ProductDetail.html",
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
            }).when("/licences/agb",
            {
                templateUrl: "components/Licence/view/AGB.html",
                authenticated: false
            }).when("/licences/licence",
            {
                templateUrl: "components/Licence/view/Licence.html",
                authenticated: false
            }).when("/licences/PrivacyPolicy",
            {
                templateUrl: "components/Licence/view/Privacy.Policy.html",
                authenticated: false
            })
            .when("/licences/auftragsdatenverarbeitungsvertrag",
            {
                templateUrl: "components/Licence/view/Auftragsdatenverarbeitungsvertrag.html",
                authenticated: false
            })
            .when("/401",
            {
                templateUrl: "components/Common/view/Unauthorized.html",
            }).when("/403",
            {
                templateUrl: "components/Common/view/Forbidden.html",
            }).when("/404",
            {
                templateUrl: "components/Common/view/NotFound.html",
            }).otherwise({
                redirectTo: "/404"
            });

        $locationProvider.hashPrefix("");
        $compileProvider.preAssignBindingsEnabled(true);

        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

        $httpProvider.interceptors.push(function ($q, $location, $rootScope) {
            return {
                "responseError": function (rejection) {
                    let defer = $q.defer();
                    if (rejection.status < 300) {
                        defer.resolve(rejection);
                    } else {
                        if (rejection.config && rejection.config.url.includes(".html")) {
                            switch (rejection.status) {
                                case 401: $location.path("/401"); break;
                                case 403: $location.path("/403"); break;
                                case 404: $location.path("/404"); break;
                                default: break;
                            }
                            defer.reject(rejection);
                        } else {
                            defer.reject(rejection);
                        }
                    }
                    return defer.promise;
                }

            };
        });

    }])
    .run([$locationId, $httpId, $rootScopeId, AuthServiceId, $cookiesId, $injectorId, $windowId, $qId,
        function ($location, $http, $rootScope, Auth, $cookies, $injector, $window, $q) {
            // TODO Workaround for native promises!!!
            $window.Promise = $q;
            try {
                $rootScope.user = $cookies.getObject("user");
                $rootScope.tenant = $cookies.getObject("tenant");
            } catch (error) {
                $rootScope.user = undefined;
                $rootScope.tenant = undefined;
                Auth.logout();
            }

            if (!isNullOrUndefined($rootScope.user) && !isNullOrUndefined($rootScope.tenant)) {
                $http.defaults.headers.common["Authorization"] = "Basic " + $rootScope.user.authorization;
                $http.defaults.headers.common["X-TenantID"] = $rootScope.tenant.tenantKey;
                let dashboardService: DashboardService = $injector.get(DashboardServiceId);
                dashboardService.refreshTodos();
                let notificationService: NotificationService = $injector.get(NotificationServiceId);
                notificationService.refreshUserNotifications();

            }

            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                try {
                    if (isNullOrUndefined($rootScope.user) || isNullOrUndefined($rootScope.tenant)) {
                        $rootScope.user = $cookies.getObject("user");
                        $rootScope.tenant = $cookies.getObject("tenant");
                    }

                } catch (error) {
                    $cookies.remove("user");
                    $cookies.remove("tenant");
                }

                if (isNullOrUndefined($http.defaults.headers.common["X-TenantID"])) {
                    if (!isNullOrUndefined($rootScope.tenant)) {
                        $http.defaults.headers.common["X-TenantID"] = $rootScope.tenant.tenantKey;
                    } else {
                        $http.defaults.headers.common["X-TenantID"] = $location.host();
                    }
                }

                if (!isNullOrUndefined($rootScope.user)) {
                    $http.defaults.headers.common["Authorization"] = "Basic " + $rootScope.user.authorization;
                }
                if (!isNullOrUndefined($rootScope.tenant)) {
                    $http.defaults.headers.common["X-TenantID"] = $rootScope.tenant.tenantKey;
                }

                if (next.authenticated === true) {
                    if (isNullOrUndefined($rootScope.user)) {
                        $location.path("/login");
                    }
                }
            });
            $rootScope.logout = function () {
                Auth.logout();
            };
        }]);