/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />
/// <reference path="../../Template/controller/Template.Controller.ts" />
/// <reference path="../../Common/model/Promise.Interface.ts" />
/// <reference path="../../Template/model/OfferMessageContext.Model.ts" />

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

const TemplateServiceId: string = "TemplateService";

class TemplateService {

    private $inject = [toasterId, $translateId, TemplateResourceId, $uibModalId, $qId, $windowId];

    templateResource;

    translate;
    toaster;
    uibModal;
    q;
    window;
    content: any;
    templates: Array<Template>;

    constructor(toaster, $translate, $rootScope, TemplateResource, $uibModal, $q, $window) {
        this.toaster = toaster;
        this.translate = $translate;
        this.uibModal = $uibModal;
        this.q = $q;
        this.window = $window;
        this.templateResource = TemplateResource.resource;
    }

    openEmailTemplateModal(template: Template) {
        this.uibModal.open({
            templateUrl: "components/Template/view/Template.Modal.html",
            controller: "TemplateController",
            controllerAs: "templateCtrl",
            size: "lg",
            backdrop: "static",
            resolve: {
                template: function () {
                    return template;
                }
            }
        });
    }

    openEmailTemplateDeleteModal(template: Template) {
        this.uibModal.open({
            templateUrl: "components/Template/view/Template.Delete.Modal.html",
            controller: "TemplateController",
            controllerAs: "templateCtrl",
            size: "sm",
            resolve: {
                template: function () {
                    return template;
                }
            }
        });
    }

    save(template: Template) {
        let self = this;
        this.templateResource.save(template).$promise.then(function (result: Template) {
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_SAVE"));
            self.templates.push(result);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_SAVE_ERROR"));
        });
    }

    update(template: Template) {
        let self = this;
        this.templateResource.update(template).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_UPDATE"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_UPDATE_ERROR"));
        });
    }

    remove(template: Template) {
        let self = this;
        let indexOfTemplate = this.templates.indexOf(template);
        this.templateResource.remove({ id: template.id }).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_DELETE"));
            self.templates.splice(indexOfTemplate, 1);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_DELETE_ERROR"));
        });
    }

    generate(templateId: string, offer: Offer, notification: Notification): IPromise<Notification> {
        console.log("Offer: ", offer);
        let defer = this.q.defer();
        let self = this;
        let offerMessageContext: OfferMessageContext = new OfferMessageContext();
        offerMessageContext.offer = offer;
        offerMessageContext.notification = notification;
        this.templateResource.generate({ templateId: templateId }, offerMessageContext).$promise.then(function (resultMessage: Notification) {
            console.log(resultMessage);
            defer.resolve(resultMessage);
        }, function (error: any) {
            defer.reject(error);
        });
        return defer.promise;
    }

    generatePDF(templateId: string, offer: Offer) {
        let defer = this.q.defer();
        let self = this;
        this.templateResource.generatePDF({ templateId: templateId }, offer).$promise.then(function (result) {
            console.log("PDf result: ", result);
            console.log(result);
            let file = new Blob([result], { type: "application/pdf" });
            let fileURL = URL.createObjectURL(file);

            self.window.open(fileURL);
            defer.resolve(result);
        }, function (error: any) {
            defer.reject(error);
        });
        return defer.promise;
    }

    getAll(): IPromise<Array<Template>> {
        let defer = this.q.defer();
        let self = this;
        this.templateResource.getAll().$promise.then(function (result: Array<Template>) {
            self.templates = result;
            defer.resolve(self.templates);
        }, function (error: any) {
            defer.reject(error);
        });
        return defer.promise;
    }
}

angular.module(moduleTemplateService, [ngResourceId]).service(TemplateServiceId, TemplateService);

