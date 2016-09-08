/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../User/model/Role.Model.ts" />
/// <reference path="../../User/model/Language.Model.ts" />
/// <reference path="../../Setting/model/Setting.Model.ts" />
/// <reference path="../../Setting/controller/Setting.Controller.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />

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

    private $inject = [$filterId, toasterId, $translateId, $rootScopeId, SettingResourceId, SmtpResourceId, UserResourceId, FileResourceId, TemplateServiceId];

    settingsResource;
    smtpResource;
    userResource;
    fileResource;
    templateResource;

    templateService;

    rootScope;
    translate;
    filter;
    toaster;
    counter;

    roleSelection = Array<any>();
    users: Array<User>;
    templates: Array<Template>;

    constructor($filter, toaster, $translate, $rootScope, SettingResource, SmtpResource, UserResource, FileResource, TemplateService) {
        this.filter = $filter;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.settingsResource = SettingResource.resource;
        this.smtpResource = SmtpResource.resource;
        this.userResource = UserResource.resource;
        this.fileResource = FileResource.resource;

        this.loadUsers();
        this.templateService = TemplateService;
        this.templateService.getAllTemplates();
    }

    loadUsers() {
        let self = this;
        this.settingsResource.getAll().$promise.then(function (result) {
            self.users = result;
            for (let user of result) {
                self.roleSelection[result[user].id] = result[user].role;
            }
        });
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

    changeRole(user: User) {
        let self = this;
        this.settingsResource.changeRole({ id: 4, role: this.roleSelection[user.id] }, {}).$promise.then(function () {
            // set rootScope role
            self.filter("filter")(self.users, { id: user.id })[0].role = user.role;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_SET_ROLE"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_SET_ROLE_ERROR"));
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

