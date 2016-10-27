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

    $inject = ["process", "$uibModalInstance", NotificationServiceId, TemplateServiceId, WorkflowServiceId, ProcessResourceId, toasterId, $translateId, $rootScopeId];

    uibModalInstance;

    editWorkflowUnit: Offer;
    template: Template = new Template();
    templates: Array<Template> = [];

    notificationService: NotificationService;
    currentNotification: Notification;
    templateService: TemplateService;
    workflowService: WorkflowService;
    processResource;
    toaster;
    translate;
    rootScope;

    editForm: any;

    process: Process;
    editProcess: Process;
    edit: boolean;

    constructor(process, $uibModalInstance, NotificationService, TemplateService, WorkflowService, ProcessResource, toaster, $translate, $rootScope) {
        this.process = process;
        this.editProcess = process;
        this.editWorkflowUnit = process.offer;
        this.processResource = ProcessResource.resource;
        this.toaster = toaster;
        this.translate = $translate;
        this.rootScope = $rootScope;
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
        this.templateService.generate(templateId, offer, this.currentNotification).then((result) => this.currentNotification = result, (error) => handleError(error));
    }

    getAllActiveTemplates() {
        this.templateService.getAll().then((result) => this.templates = result, (error) => handleError(error));
    }

    send() {
        this.process.offer = this.editWorkflowUnit;
        let self = this;
        let process = deepCopy(this.process);
        this.currentNotification.notificationType = NotificationType.FOLLOWUP;
        let notification = this.currentNotification;
        notification.id = undefined;


        this.notificationService.sendNotification(notification).then(() => {
            self.notificationService.saveFileUpload(notification.attachment).then((resultFileUpload) => {

                notification.attachment = resultFileUpload;
                if (isNullOrUndefined(process.notifications)) {
                    process.notifications = [];
                }

                process.notifications.push(notification);
                self.workflowService.saveProcess(process).then((resultProcess) => {
                    self.process.notifications = resultProcess.notifications;
                    self.process.followUpAmount = resultProcess.followUpAmount;
                    self.followUp();
                    self.close();
                });
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
            this.currentNotification.id = null;
        }
    }

    followUp() {
        let self = this;
        if (this.process.status === Status.FOLLOWUP) {
            self.rootScope.$broadcast("updateRow", this.process);
        }
        this.processResource.setStatus({
            id: this.process.id
        }, "FOLLOWUP").$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_FOLLOW_UP"));
            self.process.status = "FOLLOWUP";
            self.rootScope.$broadcast("updateRow", self.process);
            self.rootScope.$broadcast("onTodosChange");
            self.close();
        });
    }

}

angular.module(moduleFollowUp, [moduleSummernote]).service(FollowUpControllerId, FollowUpController);
