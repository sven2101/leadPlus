/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />
/// <reference path="../../Notification/controller/Notification.Service.ts" />
/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />

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

    $inject = ["offer", "$uibModalInstance", NotificationServiceId, TemplateServiceId, CustomerServiceId, ProductServiceId, WorkflowServiceId];

    uibModalInstance;

    templates: Array<Template>;
    offer: Offer;
    template: Template;
    notification: Notification;

    customers: Array<Customer> = [];
    customer: Customer;

    customerService: CustomerService;
    productService: ProductService;
    notificationService: NotificationService;
    templateService: TemplateService;
    workflowService: WorkflowService;

    customerSelected: boolean = false;
    currentCustomerId: string = "-1";

    constructor(offer, $uibModalInstance, NotificationService, TemplateService, CustomerService, ProductService, WorkflowService) {
        this.offer = offer;
        this.uibModalInstance = $uibModalInstance;
        this.notification = new Notification();
        this.notificationService = NotificationService;
        this.templateService = TemplateService;
        this.customerService = CustomerService;
        this.productService = ProductService;
        this.workflowService = WorkflowService;
        this.currentCustomerId = String(this.offer.customer.id);
        this.getAllTemplates();
    }

    ok() {
        this.uibModalInstance.close();
    }

    close() {
        this.uibModalInstance.close();
    }

    generate(templateId: string, offer: Offer) {
        this.templateService.generate(templateId, offer).then((result) => this.notification = result, (error) => console.log(error));
    }

    getAllTemplates() {
        this.templateService.getAll().then((result) => this.templates = result, (error) => console.log(error));
    }

    send() {
        console.log("Notif");
        this.notificationService.send(this.notification);
    }

    selectCustomer(workflow: any) {
        this.customerSelected = this.workflowService.selectCustomer(workflow, this.currentCustomerId);
    }

}

angular.module(moduleWorkflow, ["summernote"]).service(WorkflowControllerId, WorkflowController);
