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

    private $inject = [toasterId, $translateId, $rootScopeId, NotificationResourceId, $qId, FileResourceId];

    toaster;
    translate;
    rootScope;
    notificationResource;
    fileResource;
    formdata;
    fileReader;
    notification: Notification;
    q;

    constructor(toaster, $translate, $rootScope, NotificationResource, $q, FileResource) {
        this.notificationResource = NotificationResource.resource;
        this.fileResource = FileResource.resource;
        this.toaster = toaster;
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.q = $q;
        this.formdata = new FormData();
        this.fileReader = new FileReader();
        this.notification = new Notification();
    }

    sendNotification(notification: Notification): IPromise<boolean> {
        let self = this;
        let defer = this.q.defer();
        this.notificationResource.sendNotification({ userId: this.rootScope.globals.user.id }, notification).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("NOTIICATION_SEND"));
            defer.resolve(true);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("NOTIICATION_SEND_ERROR"));
            defer.reject(false);
        });
        return defer.promise;
    }

    saveFileUpload(fileUpload: FileUpload): IPromise<FileUpload> {
        let defer = this.q.defer();
        if (isNullOrUndefined(fileUpload) || isNullOrUndefined(fileUpload.content)) {
            defer.resolve(fileUpload);
            return defer.promise;
        }
        this.fileResource.createFileUpload(fileUpload).$promise.then((resultFileUpload) => defer.resolve(resultFileUpload), (error) => defer.reject(error));
        return defer.promise;
    }

    setAttachmentToNotification($files, notification: Notification) {
        console.log("files");
        let defer = this.q.defer();
        let self = this;
        this.formdata.append("file", $files[0]);
        notification.attachment = new FileUpload();
        notification.attachment.filename = $files[0].name;
        notification.attachment.mimeType = $files[0].type;
        notification.attachment.size = $files[0].size;
        let fileReader = new FileReader();
        fileReader.readAsDataURL($files[0]);
        fileReader.onload = function () {
            notification.attachment.content = this.result.split(",")[1];
            console.log(notification.attachment);
            defer.resolve(notification);
        };
        fileReader.onerror = (error) => {
            console.log(error);
            defer.reject(notification);
        };
        return defer.promise;
    }

}

angular.module(moduleNotificationService, [ngResourceId]).service(NotificationServiceId, NotificationService);