/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />
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

const TemplateControllerId: string = "TemplateController";

class TemplateController {

    private $inject = [TemplateServiceId, $uibModalId, "template", SummernoteServiceId];

    uibModalInstance;
    templateService;
    template: Template;
    summernoteOptions: any;


    constructor(TemplateService, $uibModalInstance, template, SummernoteService: SummernoteService) {
        this.templateService = TemplateService;
        this.uibModalInstance = $uibModalInstance;
        this.template = template;
        this.summernoteOptions = SummernoteService.getTemplateOptions();
    }

    save() {
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
angular.module(moduleTemplate, [ngResourceId]).controller(TemplateControllerId, TemplateController);