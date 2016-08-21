/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Setting/controller/Setting.Service.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Setting/model/Setting.Model.ts" />

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

const SettingControllerId: string = "SettingController";

class SettingController {

    private $inject = [$filterId, toasterId, $translateId, $rootScopeId, SettingServiceId, SettingResourceId];

    rootScope;
    translate;
    filter;
    toaster;
    currentTab: number = 1;

    setting: Setting;
    settingService;
    settingResource;
    roleSelection = Array<any>();
    users: Array<User>;

    constructor($filter, toaster, $translate, $rootScope, SettingService, SettingResource) {
        this.filter = $filter;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.settingService = SettingService;
        this.settingResource = SettingResource.resource;

        this.setting = new Setting();

        let self = this;
        this.settingResource.getAll().$promise.then(function (result) {
            self.users = result;
            for (let user in result) {
                if (user === "$promise")
                    break;
                self.roleSelection[result[user].id] = result[user].role;
            }
        });
    }

    tabOnClick(tab: number) {
        this.currentTab = tab;
    }

    activateUser(user: User) {
        this.settingService.activateUser(user);
    }

    deactivateUser(user: User) {
        this.settingService.deactivateUser(user);
    }

    hasRight(user: User): boolean {
        return this.settingService.hasRight(user);
    }

    changeRole(user: User) {
        let self = this;
        this.settingResource.changeRole({ id: 4, role: this.roleSelection[user.id] }, {}).$promise.then(function () {
            // set rootScope role
            self.filter("filter")(self.users, { id: user.id })[0].role = user.role;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_SET_ROLE"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_SET_ROLE_ERROR"));
        });
    }

    testConnection() {
        console.log("TEST");
        console.log(this.setting);
    }

}

angular.module(moduleSetting, [ngResourceId]).controller(SettingControllerId, SettingController);

