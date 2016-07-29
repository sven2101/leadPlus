/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";

angular.module("app.settings", ["ngResource"]).controller("SettingsController", SettingsController);

class SettingsController {

    static $inject = ["$filter", "toaster", "Settings", "$rootScope", "$translate"];

    settingsService;
    rootScope;
    translate;
    users: Array<any>;
    roleSelection: Object;
    filter;
    toaster;
    counter;

    constructor($filter, toaster, Settings, $rootScope, $translate) {
        this.settingsService = Settings;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.users = [];
        this.roleSelection = {};
        this.filter = $filter;
        this.toaster = toaster;
        this.counter = 1;

        let self = this;
        this.settingsService.query().$promise.then(function (result) {
            self.users = result;
            for (let user in result) {
                if (user === "$promise")
                    break;
                self.roleSelection[result[user].id] = result[user].role;
            }
        });
    }

    incrementCounter() {
        this.counter++;
    }

    activateUser(user) {
        let self = this;
        this.settingsService.activate({ username: user.username }, true).$promise.then(function () {
            self.filter("filter")(self.users, { id: user.id })[0].enabled = true;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_ACCESS_GRANTED"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_ACCESS_GRANTED_ERROR"));
        });
    };

    deactivateUser = function (user) {
        let self = this;
        this.service.activate({ username: user.username }, false).$promise.then(function () {
            self.filter("filter")(self.users, { id: user.id })[0].enabled = false;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_ACCESS_REVOKED"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_ACCESS_REVOKED_ERROR"));
        });
    };

    hasRight(user): boolean {
        if (user.username === this.rootScope.globals.currentUser.username
            || (user.role === this.rootScope.globals.currentUser.role)
            || this.rootScope.globals.currentUser.role === "user"
            || user.role === "superadmin") {
            return true;
        } else {
            return false;
        }
    }

    saveRole(user) {
        let self = this;
        user.role = this.roleSelection[user.id];
        this.settingsService.setRole({ username: user.username }, user.role).$promise.then(function () {
            // set rootScope role
            self.filter("filter")(self.users, { id: user.id })[0].role = user.role;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_SET_ROLE"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_SET_ROLE_ERROR"));
        });
    };

}
