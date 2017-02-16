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

    private $inject = [toasterId, $translateId, $rootScopeId, SmtpResourceId, UserResourceId, $qId];

    smtpResource;
    userResource;
    q;
    currentSmtp: Smtp;

    rootScope;
    translate;
    toaster;
    currentPasswordLength: number = 10;

    constructor(toaster, $translate, $rootScope, SmtpResource, UserResource, $q) {
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.q = $q;
        this.smtpResource = SmtpResource.resource;
        this.userResource = UserResource.resource;
        this.getSMtp();
    }

    async test(): Promise<any> {
        try {
            await this.save();
            let tempSmtp: Smtp = await this.smtpResource.testSmtp({ id: this.currentSmtp.id }, { smtpKey: this.rootScope.user.smtpKey }).$promise;
            this.currentSmtp.verified = tempSmtp.verified;
            this.toaster.pop("success", "", this.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST"));
        } catch (error) {
            this.currentSmtp.verified = false;
            this.toaster.pop("error", "", this.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST_ERROR"));
            throw error;
        }
    }

    async getSMtp() {
        this.currentSmtp = await this.smtpResource.getByUserId({ id: this.rootScope.user.id }).$promise;
        if (this.currentSmtp.id == null) { return; }
        this.currentSmtp.stringPassword = "";
        for (let i = 0; i < this.currentPasswordLength; i++) {
            this.currentSmtp.stringPassword += "x";
        }

    }
    async save(): Promise<any> {
        this.currentPasswordLength = this.currentSmtp.stringPassword !== null ? this.currentSmtp.stringPassword.length : this.currentPasswordLength;
        if (this.currentSmtp.stringPassword.replace(/x/g, "") === "") {
            this.currentSmtp.stringPassword = null;
        }
        let defer = this.q.defer();
        this.currentSmtp.user = this.rootScope.user;
        this.currentSmtp.password = this.currentSmtp.stringPassword !== null ? btoa(this.currentSmtp.stringPassword) : null;

        this.currentSmtp = await this.smtpResource.createSmtp({ smtpKey: this.rootScope.user.smtpKey, smtp: this.currentSmtp }).$promise;
        this.currentSmtp.stringPassword = "";
        for (let i = 0; i < this.currentPasswordLength; i++) {
            this.currentSmtp.stringPassword += "x";
        }
    }
}

angular.module(moduleSmtpService, [ngResourceId]).service(SmtpServiceId, SmtpService);

