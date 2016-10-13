/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />

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

const NotificationServiceId: string = "NotificationService";

class NotificationService {

    private $inject = [toasterId, $translateId, $rootScopeId, NotificationResourceId];

    toaster;
    translate;
    rootScope;
    notificationResource;
    formdata;
    fileReader;
    notification: Notification;

    constructor(toaster, $translate, $rootScope, NotificationResource) {
        this.notificationResource = NotificationResource.resource;
        this.toaster = toaster;
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.formdata = new FormData();
        this.fileReader = new FileReader();
        this.notification = new Notification();
    }

    sendOffer(process: Process) {
        let self = this;
        process.offer.notification.attachment = this.notification.attachment;
        this.notificationResource.sendOffer({ userId: this.rootScope.user.id }, process).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("NOTIICATION_SEND"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("NOTIICATION_SEND_ERROR"));
        });
    }

    sendSimple(notification: Notification) {
        let self = this;
        notification.attachment = this.notification.attachment;
        this.notificationResource.sendSimple({ userId: this.rootScope.user.id }, notification).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("NOTIICATION_SEND"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("NOTIICATION_SEND_ERROR"));
        });
    }

    getTheFiles($files) {
        let self = this;
        this.formdata.append("file", $files[0]);
        self.notification.attachment = new FileUpload();
        self.notification.attachment.filename = $files[0].name;
        self.notification.attachment.mimeType = $files[0].type;
        self.notification.attachment.size = $files[0].size;
        this.fileReader.readAsDataURL($files[0]);
        this.fileReader.onload = function () {
            self.notification.attachment.content = this.result.split(",")[1];
        };
    }

}

angular.module(moduleNotificationService, [ngResourceId]).service(NotificationServiceId, NotificationService);