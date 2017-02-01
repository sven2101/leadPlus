/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Notification/model/NotificationType.ts" />
/// <reference path="../../Setting/controller/Setting.Source.Service.ts" />

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

const TemplateControllerId: string = "TemplateController";

class TemplateController {

    private $inject = [TemplateServiceId, "$uibModalInstance", "template", SourceServiceId];

    uibModalInstance;
    templateService;
    template: Template;
    currentSelectedNotificationTypes: Array<string> = [];
    currentSelectedSource: Array<string> = [];
    availableNotificationTypes: Array<string> = ["ALL"].concat((<any>NotificationType).getAll());
    availablesourceNames = ["ALL"];
    constructor(TemplateService, $uibModalInstance, template, private SourceService: SourceService) {
        this.templateService = TemplateService;
        this.uibModalInstance = $uibModalInstance;
        this.template = template;
        this.currentSelectedNotificationTypes = this.template.notificationTypeString == null ? [] : this.template.notificationTypeString.split(",");
        this.currentSelectedSource = this.template.sourceString == null ? [] : this.template.sourceString.split(",");
        this.SetAvailablesourceNames();
    }

    async SetAvailablesourceNames(): Promise<void> {
        let temp = await this.SourceService.getActiveSources().map(s => s.name);
        this.availablesourceNames = this.availablesourceNames.concat(temp);
    }

    save() {
        if (this.currentSelectedNotificationTypes.length > 0) {
            this.template.notificationTypeString = this.currentSelectedNotificationTypes.join(",");
        } else {
            this.template.notificationTypeString = null;
        }
        if (this.currentSelectedSource.length > 0) {
            this.template.sourceString = this.currentSelectedSource.join(",");
        } else {
            this.template.sourceString = null;
        }

        if (isNullOrUndefined(this.template.id)) {
            this.templateService.save(this.template);
        } else {
            this.templateService.update(this.template);
        }

        this.template = null;
        this.close();
    }

    remove() {
        this.templateService.remove(this.template);
        this.close();
    }

    close() {
        this.uibModalInstance.close();
    }


}
angular.module(moduleTemplate, [ngResourceId, moduleAngularChosen]).controller(TemplateControllerId, TemplateController);