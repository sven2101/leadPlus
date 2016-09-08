/// <reference path="../../Common/model/Workflow.Model.ts" />
/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Setting/model/Template.Model.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />
/// <reference path="../../Notification/controller/Notification.Service.ts" />

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

    $inject = ["$uibModalInstance", "offer", TemplateResourceId, CustomerServiceId, ProductServiceId, NotificationServiceId];

    uibModalInstance;

    templateResource;
    templates: Array<Template>;
    offer: Offer;
    template: Template;
    notification: Notification;

    customers: Array<Customer> = [];
    customer: Customer;

    customerService: CustomerService;
    productService: ProductService;
    notificationService: NotificationService;

    constructor($uibModalInstance, offer, TemplateResource, CustomerService, ProductService, NotificationService) {
        this.uibModalInstance = $uibModalInstance;
        this.offer = offer;
        this.template = new Template();
        this.notification = new Notification();
        this.templateResource = TemplateResource.resource;
        this.customerService = CustomerService;
        this.productService = ProductService;
        this.notificationService = NotificationService;
        this.getAllTemplates();
    }

    ok() {
        this.uibModalInstance.close();
    }

    close() {
        this.uibModalInstance.close();
    }

    generate(template: Template, offer: Offer) {
        let self = this;
        this.templateResource.generate({ templateId: this.template, offerId: offer.id }).$promise.then(function (resultMessage: Notification) {
            console.log(resultMessage);
            self.notification = resultMessage;
        });
    }

    getAllTemplates() {
        let self = this;
        this.templateResource.getAllTemplates().$promise.then(function (result: Array<Template>) {
            self.templates = result;
        });
    }

    send() {
        this.notificationService.send(this.notification);
    }

}

angular.module(moduleWorkflow, ["summernote"]).service(WorkflowControllerId, WorkflowController);
