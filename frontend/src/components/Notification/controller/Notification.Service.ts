/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />
/// <reference path="../model/Attachment.Model.ts" />

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

declare var Ladda;

const NotificationServiceId: string = "NotificationService";

class NotificationService {

    private $inject = [toasterId, $translateId, $rootScopeId, NotificationResourceId, $qId];

    toaster;
    translate;
    rootScope;
    notificationResource;
    formdata;
    fileReader;
    notification: Notification;
    q;

    constructor(toaster, $translate, $rootScope, NotificationResource, $q) {
        this.notificationResource = NotificationResource.resource;
        this.toaster = toaster;
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.q = $q;
        this.formdata = new FormData();
        this.fileReader = new FileReader();
        this.notification = new Notification();
    }

    async sendNotification(notification: Notification): Promise<void> {
        this.rootScope.$broadcast(broadcastSetNotificationSendState, NotificationSendState.SENDING);
        await this.notificationResource.sendNotification({ userId: this.rootScope.user.id, smtpKey: this.rootScope.user.smtpKey }, notification).$promise.catch(error => {
            this.rootScope.$broadcast(broadcastSetNotificationSendState, NotificationSendState.ERROR);
            notification.notificationType = NotificationType.ERROR;
            this.rootScope.$broadcast(broadcastAddNotification, notification);
            this.toaster.pop("error", "", this.translate.instant("NOTIICATION_SEND_ERROR"));
            throw error;
        });
        this.rootScope.$broadcast(broadcastSetNotificationSendState, NotificationSendState.SUCCESS);
        this.rootScope.$broadcast(broadcastAddNotification, notification);
        let x = setTimeout(() => {
            this.rootScope.$broadcast(broadcastSetNotificationSendState, NotificationSendState.DEFAULT);
        }, 10000);
    }

}

angular.module(moduleNotificationService, [ngResourceId]).service(NotificationServiceId, NotificationService);