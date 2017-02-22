/// <reference path="../app/App.Constants.ts" />
/// <reference path="../app/App.Common.ts" />
/// <reference path="../app/App.Resource.ts" />
/// <reference path="../dashboard/controller/Dashboard.Service.ts" />
/// <reference path="../Profile/controller/Profile.Service.ts" />
/// <reference path="../Notification/model/NotificationSendState.ts" />

const AppControllerId: string = "AppController";
const broadcastSetNotificationSendState: string = "setNotificationSendState";
const broadcastAddNotification: string = "AddNotification";
const broadcastUserNotificationChanged: string = "userNotificationChanged";

class AppController {

    private $inject = [$translateId, $rootScopeId, $intervalId, ProcessResourceId, UserResourceId, ProfileServiceId, $locationId, $scopeId, NotificationServiceId, $windowId];

    translate;
    rootScope;
    interval;
    location;
    processResource;
    userResource;
    window;
    stop;
    todos: Array<Process> = [];
    userNotifications: Array<Notification> = [];
    notificationSendState: NotificationSendState = NotificationSendState.DEFAULT;

    profileService: ProfileService;
    rendered: boolean = false;

    constructor($translate, $rootScope, $interval, ProcessResource, UserResource, ProfileService, $location, $scope, private NotificationService: NotificationService, $window) {
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.interval = $interval;
        this.processResource = ProcessResource.resource;
        this.userResource = UserResource.resource;
        this.profileService = ProfileService;
        this.rootScope.leadsCount = 0;
        this.location = $location;
        this.window = $window;

        this.rootScope.offersCount = 0;
        this.stop = undefined;

        this.setCurrentUserPicture();
        this.registerLoadLabels();
        this.rootScope.loadLabels();
        this.registerChangeLanguage();
        this.registerSetUserDefaultLanguage();
        this.rootScope.setUserDefaultLanguage();
        this.registerInterval();

        let todosChanged = $rootScope.$on("todosChanged", (event, result) => {
            this.todos = result;
        });

        let broadcastAddNotificationListener = $scope.$on(broadcastAddNotification, (event, notification: Notification) => {
            this.userNotifications.push(notification);
        });

        let broadcastSetNotificationSendStateListener = $scope.$on(broadcastSetNotificationSendState, (event, notificationSendState: NotificationSendState) => {
            this.notificationSendState = notificationSendState;
            if ($scope.$$phase == null) {
                $scope.$apply();
            }
        });
        let broadcastUserNotificationChangedListener = $rootScope.$on(broadcastUserNotificationChanged, (event, result) => {
            this.userNotifications = result;
        });

        $scope.$on("$destroy", function handler() {
            todosChanged();
            broadcastAddNotificationListener();
            broadcastSetNotificationSendStateListener();
            broadcastUserNotificationChangedListener();
        });

        angular.element(document).ready(function () {
            $(document.getElementById("outer-language")).css("visibility", "visible");
            setTimeout(function () {
                $rootScope.documentLoaded = true;
                $(window).trigger("resize");
                $(document.getElementById("loading-pane-overlay")).addClass("loading-pane-fade-out");
                setTimeout(function () {
                    $(document.getElementById("loading-pane-overlay")).children().removeClass("loader");
                }, 500);
            }, 500);
        });
    }



    navigateTo(todo: Process) {
        if (todo.status === "OPEN" || todo.status === "INCONTACT") {
            this.location.path("/leads/" + todo.id);
        }
        else if (todo.status === "OFFER" || todo.status === "FOLLOWUP" || todo.status === "DONE") {
            this.location.path("/offers/" + todo.id);
        }
    }

    hasLicense(userLicense: any, routeLicense: string): boolean {
        return hasLicense(userLicense, routeLicense);
    }

    registerLoadLabels() {
        let self = this;
        self.rootScope.loadLabels = function () {
            if (!angular
                .isUndefined(self.rootScope.user)) {
                self.processResource.getCountWorkflowByStatus({
                    workflow: "LEAD",
                    status: "OPEN"
                }).$promise.then(function (result) {
                    self.rootScope.leadsCount = result.value;
                });
                self.processResource.getCountWorkflowByStatus({
                    workflow: "OFFER",
                    status: "OFFER"
                }).$promise.then(function (result) {
                    self.rootScope.offersCount = result.value;
                });
            }
        };
    }

    registerChangeLanguage() {
        let self = this;
        self.rootScope.changeLanguage = function (langKey) {
            self.translate.use(langKey);
            self.rootScope.language = langKey;
        };
    }

    registerSetUserDefaultLanguage() {
        let self = this;
        self.rootScope.setUserDefaultLanguage = function () {
            if (!angular
                .isUndefined(self.rootScope.user)) {
                self.userResource
                    .get({
                        id: self.rootScope.user.id
                    }).$promise.then(function (result) {
                        self.rootScope.changeLanguage(result.language);
                    });
            }
            else {
                let lang: string = self.window.navigator.language || self.window.navigator.userLanguage;
                self.rootScope.changeLanguage(lang.toUpperCase());
            }
        };
    }

    registerInterval() {
        let self = this;
        self.rootScope.$on("$destroy", function () {
            if (angular.isDefined(self.stop)) {
                self.interval.cancel(self.stop);
                self.stop = undefined;
            }
        });
        self.stop = self.interval(function () {
            if (!angular
                .isUndefined(self.rootScope.user)) {
                self.processResource.getCountWorkflowByStatus({
                    workflow: "LEAD",
                    status: "OPEN"
                }).$promise.then(function (result) {
                    self.rootScope.leadsCount = result.value;
                });
                self.processResource.getCountWorkflowByStatus({
                    workflow: "OFFER",
                    status: "OFFER"
                }).$promise.then(function (result) {
                    self.rootScope.offersCount = result.value;
                });
            }
        }.bind(this), 300000);
    }

    setCurrentUserPicture() {
        let self = this;
        if (!isNullOrUndefined(self.rootScope.user)) {
            self.userResource.getProfilePicture({ id: self.rootScope.user.id }).$promise.then(function (result) {
                self.rootScope.user.picture = result;
            });
        }

    }

    sumOrderPositions(array: Array<OrderPosition>): number {
        let sum = 0;
        if (isNullOrUndefined(array)) {
            return 0;
        }
        for (let i = 0; i < array.length; i++) {
            let temp = array[i];
            if (!isNullOrUndefined(temp) && !isNaN(temp.amount)
                && !isNullOrUndefined(temp.product)
                && !isNaN(temp.product.netPrice)) {
                sum += temp.amount * temp.product.netPrice;
            }
        }
        return sum;
    }

    openEmailDirective(notification: Notification, processId: number): void {
        this.rootScope.$emit(openQuickEmailModal, { notification: deepCopy(notification), processId: processId });
    }
}

angular.module(moduleAppController, [ngResourceId, moduleSanitize]).controller(AppControllerId, AppController);
