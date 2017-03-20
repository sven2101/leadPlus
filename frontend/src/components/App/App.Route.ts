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
                authenticate: true,
                package: "basic"
            })
            .when("/dashboard",
            {
                templateUrl: "components/Dashboard/view/Dashboard.html",
                controller: "DashboardController",
                controllerAs: "dashboardCtrl",
                authenticate: true,
                package: "basic"
            })
            .when("/leads/:processId?",
            {
                templateUrl: "components/Lead/view/Lead.html",
                controller: "WorkflowController",
                controllerAs: "leadCtrl",
                authenticate: true,
                package: "basic",
                type: WorkflowType.LEAD
            })
            .when("/offers/:processId?",
            {
                templateUrl: "components/Offer/view/Offer.html",
                controller: "WorkflowController",
                controllerAs: "offerCtrl",
                authenticate: true,
                package: "basic",
                type: WorkflowType.OFFER
            })
            .when("/sales/:processId?",
            {
                templateUrl: "components/Sale/view/Sale.html",
                controller: "WorkflowController",
                controllerAs: "saleCtrl",
                authenticate: true,
                package: "basic",
                type: WorkflowType.SALE
            })
            .when("/statistic/:tab?",
            {
                templateUrl: "components/Statistic/view/Statistic.html",
                controller: "StatisticController",
                controllerAs: "statisticCtrl",
                authenticate: true,
                package: "basic"
            })
            .when("/settings/:tab?",
            {
                templateUrl: "components/Setting/view/Setting.html",
                controller: "SettingController",
                controllerAs: "settingCtrl",
                authenticate: true,
                package: "basic"
            })
            .when("/settings/template/details/:templateId?",
            {
                templateUrl: "components/Template/view/Template.Detail.html",
                controller: "TemplateController",
                controllerAs: "templateCtrl",
                authenticated: true,
                package: "basic"
            })
            .when("/statistic/users/detail/:userId",
            {
                templateUrl: "components/Statistic/view/UserDetail.html",
                controller: "UserDetailController",
                controllerAs: "UserDetailCtrl",
                authenticate: true,
                package: "basic"
            })
            .when("/profile/:tab?",
            {
                templateUrl: "components/Profile/view/ProfileMain.html",
                controller: "ProfileController",
                controllerAs: "profileCtrl",
                authenticate: true,
                package: "basic"
            })
            .when("/licence",
            {
                templateUrl: "components/Licence/view/Licence.html",
                controller: "RegistrationController",
                controllerAs: "registrationCtrl",
                authenticate: false,
                package: "basic"
            })
            .when("/signup",
            {
                templateUrl: "components/Signup/view/Signup.html",
                controller: "SignupController",
                controllerAs: "signupCtrl",
                authenticate: false,
                package: "basic"
            })
            .when("/tenants/registration",
            {
                templateUrl: "components/Tenant/registration/view/Registration.html",
                controller: "RegistrationController",
                authenticate: false,
                controllerAs: "registrationCtrl"
            })
            .when("/login",
            {
                templateUrl: "components/Login/view/Login.html",
                controller: "LoginController",
                authenticate: false,
                controllerAs: "loginCtrl",
            }).when("/product",
            {
                templateUrl: "components/Product/view/Product.html",
                controller: "ProductController",
                controllerAs: "productCtrl",
                authenticate: true,
                package: "basic"
            }).when("/product/detail/:productId?",
            {
                templateUrl: "components/Product/view/Product.Detail.html",
                controller: "ProductDetailController",
                controllerAs: "productDetailCtrl",
                authenticated: true,
                package: "basic"
            }).when("/statistic/product/detail/:productId",
            {
                templateUrl: "components/Statistic/view/ProductDetail.html",
                controller: "ProductStatisticDetailController",
                controllerAs: "ProductDetailCtrl",
                authenticate: true,
                package: "basic"
            }).when("/customer",
            {
                templateUrl: "components/Customer/view/Customer.html",
                controller: "CustomerController",
                controllerAs: "customerCtrl",
                authenticate: true,
                package: "basic"
            }).when("/customer/timeline/:customerId",
            {
                templateUrl: "components/Customer/view/CustomerTimeline.html",
                controller: "CustomerTimelineController",
                controllerAs: "customerTimelineCtrl",
                authenticated: true,
                package: "basic"
            }).when("/customer/detail/:customerId",
            {
                templateUrl: "components/Customer/view/CustomerDetail.html",
                controller: "CustomerDetailController",
                controllerAs: "customerDetailCtrl",
                authenticate: true,
                package: "basic"
            }).when("/401", {
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

        $httpProvider.interceptors.push(function ($q, $location, $rootScope, TokenService: TokenService) {
            return {
                "request": async (request) => {
                    await TokenService.awaitInit();
                    if (request.url.substr(request.url.length - 5) === ".html"
                        || request.url.substring(0, 9) !== "/api/rest") {
                        return request;
                    }
                    request.headers["X-Authorization"] = "Bearer " + await TokenService.getAccessTokenPromise();

                    return request;
                },

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
    .run([$locationId, $httpId, $rootScopeId, AuthServiceId, $injectorId, $windowId, $qId, "TokenService",
        async function ($location, $http, $rootScope, AuthService: AuthService, $injector, $window, $q, TokenService: TokenService) {
            // TODO Workaround for native promises!!!
            $window.Promise = $q;

            await AuthService.awaitInit();
            $rootScope.user = TokenService.getItemFromLocalStorage(USER_STORAGE);
            if (AuthService.isLoggedIn() === true && $rootScope.user == null) {
                AuthService.logout();
            }
            if (AuthService.isLoggedIn() === true && AuthService.isLoggedIn() === false) {
                console.log("inject Dashboard");
                let dashboardService: DashboardService = $injector.get(DashboardServiceId);
                dashboardService.refreshTodos();
                let notificationService: NotificationService = $injector.get(NotificationServiceId);
                notificationService.refreshUserNotifications();

            }

            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if ((next.authenticate === true && !AuthService.isLoggedIn()) || (next.authenticate === false && AuthService.isLoggedIn())) {
                    AuthService.logout(!next.authenticate);
                }

            });
            $rootScope.logout = function () {
                AuthService.logout();
            };
        }]);