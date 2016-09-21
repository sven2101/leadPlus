/// <reference path="../app/App.Constants.ts" />
/// <reference path="../app/App.Resource.ts" />
/// <reference path="../dashboard/controller/Dashboard.Service.ts" />
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

const AppControllerId: string = "AppController";

class AppController {

    private $inject = [$translateId, $rootScopeId, $intervalId, ProcessResourceId, UserResourceId, ProfileServiceId];

    translate;
    rootScope;
    interval;
    processResource;
    userResource;
    stop;
    todos: Array<Process> = [];

    profileService: ProfileService;

    constructor($translate, $rootScope, $interval, ProcessResource, UserResource, ProfileService) {
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.interval = $interval;
        this.processResource = ProcessResource.resource;
        this.userResource = UserResource.resource;
        this.profileService = ProfileService;
        this.rootScope.leadsCount = 0;
        this.rootScope.todos = "test";

        this.rootScope.offersCount = 0;
        this.stop = undefined;

        this.setCurrentUserPicture();


        this.registerLoadLabels();
        this.rootScope.loadLabels();
        this.registerChangeLanguage();
        this.registerSetUserDefaultLanguage();
        this.rootScope.setUserDefaultLanguage();
        this.registerInterval();

        $rootScope.$on("todosChanged", (event, result) => {
            this.todos = result;
        });
    }


    registerLoadLabels() {
        let self = this;
        self.rootScope.loadLabels = function () {
            if (!angular
                .isUndefined(self.rootScope.globals.user)) {
                self.processResource.getLeadsByStatus({
                    workflow: "LEAD",
                    status: "OPEN"
                }).$promise.then(function (result) {
                    self.rootScope.leadsCount = result.length;
                });
                self.processResource.getOffersByStatus({
                    workflow: "OFFER",
                    status: "OFFER"
                }).$promise.then(function (result) {
                    self.rootScope.offersCount = result.length;
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
                .isUndefined(self.rootScope.globals.user)) {
                self.userResource
                    .get({
                        id: self.rootScope.globals.user.id
                    }).$promise.then(function (result) {
                        self.rootScope.changeLanguage(result.language);
                    });
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
                .isUndefined(self.rootScope.globals.user)) {
                self.processResource.getLeadsByStatus({
                    workflow: "LEAD",
                    status: "OPEN"
                }).$promise.then(function (result) {
                    self.rootScope.leadsCount = result.length;
                });
                self.processResource.getOffersByStatus({
                    workflow: "OFFER",
                    status: "OFFER"
                }).$promise.then(function (result) {
                    self.rootScope.offersCount = result.length;
                });
            }
        }.bind(this), 300000);
    }

    setCurrentUserPicture() {
        let self = this;
        if (!isNullOrUndefined(self.rootScope.globals.user)) {
            self.userResource.getProfilePicture({ id: self.rootScope.globals.user.id }).$promise.then(function (result) {
                self.rootScope.globals.user.picture = result;
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
                && !isNaN(temp.product.priceNetto)) {
                sum += temp.amount * temp.product.priceNetto;
            }
        }
        return sum;
    }
}

angular.module(moduleAppController, [ngResourceId]).controller(AppControllerId, AppController);