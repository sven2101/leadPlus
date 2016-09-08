/// <reference path="../../app/App.Resource.ts" />

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

    private $inject = [NotificationResourceId, toasterId, $translateId];

    notificationResource;
    toaster;
    translate;

    constructor(NotificationResource, toaster, translate) {
        this.notificationResource = NotificationResource.resource;
        this.toaster = toaster;
        this.translate = translate;
    }

    send(notification: Notification) {
        let self = this;
        this.notificationResource.send(notification).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("NOTIICATION_SEND"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("NOTIICATION_SEND_ERROR"));
        });
    }

}

angular.module(moduleNotificationService, [ngResourceId]).service(NotificationServiceId, NotificationService);