/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />
/// <reference path="../../Notification/model/NotificationType.ts" />
/// <reference path="../../Notification/controller/Notification.Service.ts" />
/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />
/// <reference path="../../Common/service/Workflow.Service.ts" />

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

const FollowUpControllerId: string = "FollowUpController";

class FollowUpController {

    $inject = ["process", "$uibModalInstance", NotificationServiceId, TemplateServiceId, WorkflowServiceId];

    uibModalInstance;

    editWorkflowUnit: Offer;
    template: Template = new Template();
    templates: Array<Template> = [];

    notificationService: NotificationService;
    currentNotification: Notification;
    templateService: TemplateService;
    workflowService: WorkflowService;

    editForm: any;

    process: Process;
    editProcess: Process;
    edit: boolean;

    constructor(process, $uibModalInstance, NotificationService, TemplateService, WorkflowService) {
        this.process = process;
        this.editProcess = process;
        this.editWorkflowUnit = process.offer;
        this.currentNotification = new Notification();
        this.currentNotification.recipient = this.editWorkflowUnit.customer.email;
        this.uibModalInstance = $uibModalInstance;
        this.notificationService = NotificationService;
        this.templateService = TemplateService;
        this.workflowService = WorkflowService;

        this.getAllActiveTemplates();
    }

    ok() {
        this.uibModalInstance.close();
    }

    close() {
        this.editForm.$setPristine();
        this.uibModalInstance.close();
    }

    generate(templateId: string, offer: Offer) {
        console.log(offer);
        this.templateService.generate(templateId, offer, this.currentNotification).then((result) => this.currentNotification = result, (error) => console.log(error));
    }

    getAllActiveTemplates() {
        this.templateService.getAll().then((result) => this.templates = result, (error) => console.log(error));
    }

    send() {
        this.process.offer = this.editWorkflowUnit;
        let self = this;
        let process = deepCopy(this.process);
        this.currentNotification.notificationType = NotificationType.FOLLOWUP;
        let notification = this.currentNotification;
        notification.id = undefined;


        this.notificationService.sendNotification(notification).then(() => {
            if (isNullOrUndefined(process.notifications)) {
                process.notifications = [];
            }
            process.notifications.push(notification);
            self.workflowService.saveProcess(process).then((resultProcess) => {
                self.process.notifications = resultProcess.notifications;
                self.close();
            });
        });
    }

    getTheFiles($files) {
        this.notificationService.setAttachmentToNotification($files, this.currentNotification);
    }

    setFormerNotification(notificationId: number) {
        if (Number(notificationId) === -1) {
            this.currentNotification = new Notification();
        }
        let notification: Notification = findElementById(this.editProcess.notifications, Number(notificationId)) as Notification;
        if (!isNullOrUndefined(notification)) {
            this.currentNotification = deepCopy(notification);
        }
    }

}

angular.module(moduleFollowUp, ["summernote"]).service(FollowUpControllerId, FollowUpController);
