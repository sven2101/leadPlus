/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Setting/controller/Setting.Service.ts" />
/// <reference path="../../Smtp/controller/Smtp.Service.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Setting/model/Setting.Model.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />

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

    private $inject = [SettingServiceId, SmtpServiceId, TemplateServiceId, $rootScopeId];

    createTemplateForm;

    currentTab: number = 1;

    settingService: SettingService;
    smtpService: SmtpService;
    templateService: TemplateService;

    roleSelection = Array<any>();

    smtp: Smtp;
    setting: Setting;
    template: Template;
    smtpForm;

    rootScope;

    constructor(SettingService, SmtpService, TemplateService, $rootScope) {

        this.smtp = new Smtp();
        this.template = new Template();

        this.settingService = SettingService;
        this.templateService = TemplateService;
        this.smtpService = SmtpService;

        this.rootScope = $rootScope;

        this.settingService.loadUsers();
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

    openEmailTemplateModal() {
        this.templateService.openEmailTemplateModal(new Template());
    }

    openEditEmailTemplateModal(template: Template) {
        this.templateService.openEmailTemplateModal(template);
    }

    openEmailTemplateDeleteModal(template: Template) {
        this.templateService.openEmailTemplateDeleteModal(template);
    }

    testSmtpConnection() {
        this.smtpService.test();
    }

    saveSmtpConnection() {
        if (this.smtpForm.smtpPassword.$pristine) {
            this.smtpService.currentSmtp.stringPassword = null;
        }
        this.smtpService.save().then(() => this.smtpForm.smtpPassword.$setPristine());
    }
}
angular.module(moduleSetting, [ngResourceId]).controller(SettingControllerId, SettingController);

