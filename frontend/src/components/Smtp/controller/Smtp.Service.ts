/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Smtp/model/Smtp.Model.ts" />

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

const SmtpServiceId: string = "SmtpService";

class SmtpService {

    private $inject = [toasterId, $translateId, $rootScopeId, SmtpResourceId, UserResourceId];

    smtpResource;
    userResource;

    rootScope;
    translate;
    toaster;

    constructor(toaster, $translate, $rootScope, SmtpResource, UserResource) {
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.smtpResource = SmtpResource.resource;
        this.userResource = UserResource.resource;
    }

    test(smtp: Smtp) {
        let self = this;
        console.log("SMTP: ", smtp);
        this.smtpResource.test(smtp).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST_ERROR"));
        });
    }

    save(smtp: Smtp) {
        let self = this;
        this.userResource.setSmtpConnection({ id: this.rootScope.globals.user.id }, smtp).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE_ERROR"));
        });
    }
}

angular.module(moduleSmtpService, [ngResourceId]).service(SmtpServiceId, SmtpService);

