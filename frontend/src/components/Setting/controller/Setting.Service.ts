/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../User/model/Role.Model.ts" />
/// <reference path="../../User/model/Language.Model.ts" />

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

const SettingServiceId: string = "SettingService";

class SettingService {

    private $inject = [$filterId, toasterId, $translateId, $rootScopeId, SettingResourceId];

    settingsResource;
    rootScope;
    translate;
    filter;
    toaster;
    counter;

    roleSelection = Array<any>();
    users: Array<User>;

    constructor($filter, toaster, $translate, $rootScope, SettingResource) {
        this.filter = $filter;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.settingsResource = SettingResource.resource;

        let self = this;
        this.settingsResource.getAll().$promise.then(function (result) {
            self.users = result;
            for (let user in result) {
                if (user === "$promise")
                    break;
                self.roleSelection[result[user].id] = result[user].role;
            }
        });
        this.counter = 1;
    }

    incrementCounter() {
        this.counter++;
    }

    activateUser(user: User) {
        let self = this;
        this.settingsResource.activate({ id: user.id }, true).$promise.then(function () {
            self.filter("filter")(self.users, { id: user.id })[0].enabled = true;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_ACCESS_GRANTED"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_ACCESS_GRANTED_ERROR"));
        });
    }

    deactivateUser(user: User) {
        let self = this;
        this.settingsResource.activate({ id: user.id }, false).$promise.then(function () {
            self.filter("filter")(self.users, { id: user.id })[0].enabled = false;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_ACCESS_REVOKED"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_ACCESS_REVOKED_ERROR"));
        });
    }

    hasRight(user: User): boolean {
        if (user.username === this.rootScope.globals.user.username
            || (user.role === this.rootScope.globals.user.role)
            || this.rootScope.globals.user.role === Role.USER
            || user.role === Role.SUPERADMIN) {
            return true;
        } else {
            return false;
        }
    }
}

angular.module(moduleSettingService, [ngResourceId]).service(SettingServiceId, SettingService);

