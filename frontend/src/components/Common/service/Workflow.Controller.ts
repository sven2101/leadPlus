/// <reference path="../../Common/model/Workflow.Model.ts" />
/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Setting/model/Template.Model.ts" />

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

const WorkflowControllerId: string = "WorkflowController";

class WorkflowController {

    $inject = ["$uibModalInstance", "offer", TemplateResourceId];

    uibModalInstance;


    templateResource;
    templates: Array<Template>;
    offer: Offer;
    template: Template;

    constructor($uibModalInstance, offer, TemplateResource) {
        this.uibModalInstance = $uibModalInstance;
        this.offer = offer;
        this.template = new Template();
        this.templateResource = TemplateResource.resource;
        this.getAllTemplates();
    }

    ok() {
        this.uibModalInstance.close();
    }

    close() {
        this.uibModalInstance.close();
    }

    generate(template: Template, offer: Offer) {
        console.log("Generate");
        console.log(this.template);
        this.templateResource.generate({ templateId: this.template, offerId: offer.id }).$promise.then(function (result) {
            console.log(result);
        });
    }

    getAllTemplates() {
        let self = this;
        this.templateResource.getAllTemplates().$promise.then(function (result: Array<Template>) {
            self.templates = result;
        });
    }
}

angular.module(moduleWorkflow, ["summernote"]).service(WorkflowControllerId, WorkflowController);
