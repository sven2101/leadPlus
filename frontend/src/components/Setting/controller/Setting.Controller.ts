/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Setting/controller/Setting.Service.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Setting/model/Setting.Model.ts" />
/// <reference path="../../Setting/model/Template.Model.ts" />

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

    private $inject = [SettingServiceId, TemplateResourceId];

    createTemplateForm;

    currentTab: number = 1;
    settingService: SettingService;

    roleSelection = Array<any>();

    templateResource;

    setting: Setting;
    template: Template;

    constructor(SettingService, TemplateResource) {
        this.settingService = SettingService;
        this.setting = new Setting();
        this.template = new Template();
        this.settingService.loadUsers();
        this.templateResource = TemplateResource.resource;
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
        this.settingService.changeRole(user);
    }

    testConnection() {
        this.settingService.testConnection(this.setting);
    }

    save() {
        this.settingService.save(this.setting);
    }

    openEmailTemplateModal() {
        this.settingService.openEmailTemplateModal(new Template());
    }

    openEditEmailTemplateModal(template: Template) {
        this.settingService.openEmailTemplateModal(template);
    }

    openEmailTemplateDeleteModal(template: Template) {
        this.settingService.openEmailTemplateDeleteModal(template);
    }
}
angular.module(moduleSetting, [ngResourceId]).controller(SettingControllerId, SettingController);

