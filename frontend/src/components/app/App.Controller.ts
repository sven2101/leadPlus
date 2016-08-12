/// <reference path="../app/App.Constants.ts" />
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

class AppController {

    private $inject = ["$translate", "$scope", "$rootScope", "$interval", "ProcessResource", "UserResource"];

    translate;
    scope;
    rootScope;
    interval;
    processResource;
    userResource;

    stop;

    constructor($translate, $scope, $rootScope, $interval, ProcessResource, UserResource) {
        this.translate = $translate;
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.interval = $interval;
        this.processResource = ProcessResource.resource;
        this.userResource = UserResource.resource;

        this.rootScope.leadsCount = 0;
        this.rootScope.offersCount = 0;
        this.stop = undefined;

        this.registerLoadLabels();
        this.rootScope.loadLabels();
        this.registerChangeLanguage();
        this.registerSetUserDefaultLanguage();
        this.rootScope.setUserDefaultLanguage();
        this.registerInterval();

    }
    registerLoadLabels() {
        let self = this;
        self.rootScope.loadLabels = function () {
            if (!angular
                .isUndefined(self.rootScope.globals.currentUser)) {
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
                .isUndefined(self.rootScope.globals.currentUser)) {
                self.userResource
                    .get({
                        id: self.rootScope.globals.currentUser.id
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
                .isUndefined(self.rootScope.globals.currentUser)) {
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


}

angular.module(moduleAppController, ["ngResource"]).controller("AppController", AppController);