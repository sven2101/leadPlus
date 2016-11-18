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

    $inject = ["process", "$uibModalInstance", NotificationServiceId, TemplateServiceId, WorkflowServiceId, FileServiceId, ProcessResourceId, toasterId, $translateId, $rootScopeId, $scopeId];

    uibModalInstance;

    editWorkflowUnit: Offer;
    template: Template = new Template();
    templates: Array<Template> = [];

    notificationService: NotificationService;
    currentNotification: Notification;
    templateService: TemplateService;
    workflowService: WorkflowService;
    fileService: FileService;
    processResource;
    toaster;
    translate;
    rootScope;
    scope;

    emailEditForm: any;

    editProcess: Process;
    originProcess: Process;
    edit: boolean;

    constructor(process, $uibModalInstance, NotificationService, TemplateService, WorkflowService, FileService, ProcessResource, toaster, $translate, $rootScope, $scope) {
        this.originProcess = process;
        this.editProcess = deepCopy(process);
        this.editWorkflowUnit = this.editProcess.offer;
        this.processResource = ProcessResource.resource;
        this.toaster = toaster;
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.scope = $scope;
        this.currentNotification = new Notification();
        this.currentNotification.recipient = this.editWorkflowUnit.customer.email;
        this.uibModalInstance = $uibModalInstance;
        this.notificationService = NotificationService;
        this.templateService = TemplateService;
        this.workflowService = WorkflowService;
        this.fileService = FileService;
        this.getAllActiveTemplates();
    }

    ok() {
        this.uibModalInstance.close();
    }

    close() {
        this.emailEditForm.$setPristine();
        this.uibModalInstance.close();
    }

    generate(templateId: string, offer: Offer) {
        this.templateService.generate(templateId, offer, this.currentNotification).then((result) => this.currentNotification = result, (error) => handleError(error));
    }

    getAllActiveTemplates() {
        this.templateService.getAll().then((result) => this.templates = result, (error) => handleError(error));
    }

    openAttachment(id: number) {
        this.fileService.getContentFileById(id);
    }

    send() {
        let self = this;
        this.currentNotification.notificationType = NotificationType.FOLLOWUP;
        let notification = this.currentNotification;
        notification.id = undefined;
        let process = this.editProcess;
        this.notificationService.sendNotification(notification).then(() => {
            self.notificationService.saveFileUpload(notification.attachment).then((resultFileUpload) => {

                notification.attachment = resultFileUpload;
                if (isNullOrUndefined(process.notifications)) {
                    process.notifications = [];
                }

                process.notifications.push(notification);
                self.workflowService.saveProcess(process).then((resultProcess) => {
                    self.originProcess.notifications = resultProcess.notifications;
                    self.originProcess.followUpAmount = resultProcess.followUpAmount;
                    self.editProcess = resultProcess;
                    self.followUp();
                    self.close();
                });
            });
        });
    }

    getTheFiles($files) {
        let self = this;
        this.notificationService.setAttachmentToNotification($files, this.currentNotification).then(() => {
            try {
                self.scope.$digest();
            } catch (error) {
                handleError(error);
            }
        });
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
        if (this.editProcess.status === Status.FOLLOWUP) {
            self.rootScope.$broadcast("updateRow", this.editProcess);
            return;
        }
        this.processResource.setStatus({
            id: this.editProcess.id
        }, "FOLLOWUP").$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_FOLLOW_UP"));
            self.editProcess.status = "FOLLOWUP";
            self.rootScope.$broadcast("updateRow", self.editProcess);
            self.rootScope.$broadcast("onTodosChange");
            self.close();
        });
    }

}

angular.module(moduleFollowUp, [moduleSummernote]).service(FollowUpControllerId, FollowUpController);
