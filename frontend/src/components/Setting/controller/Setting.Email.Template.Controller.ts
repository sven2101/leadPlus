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

const SettingEmailTemplateControllerId: string = "SettingEmailTemplateController";

class SettingEmailTemplateController {

    private $inject = [SettingServiceId, "$uibModalInstance", "template"];

    uibModalInstance;
    settingService;
    template: Template;

    constructor(SettingService, $uibModalInstance, template) {
        this.settingService = SettingService;
        this.uibModalInstance = $uibModalInstance;
        this.template = template;
    }

    saveEmailTemplate() {
        if (this.template.id === 0) {
            this.settingService.saveEmailTemplate(this.template);
        } else {
            this.settingService.updateEmailTemplate(this.template);
        }

        this.template = null;
        this.closeEmailTemplateModal();
    }

    deleteEmailTemplate() {
        this.settingService.deleteEmailTemplate(this.template);
        this.closeEmailTemplateModal();
    }

    closeEmailTemplateModal() {
        this.uibModalInstance.close();
    }

}
angular.module(moduleSettingEmailTemplate, [ngResourceId]).controller(SettingEmailTemplateControllerId, SettingEmailTemplateController);