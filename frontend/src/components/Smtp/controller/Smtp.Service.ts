/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Smtp/model/Smtp.Model.ts" />

"use strict";

const SmtpServiceId: string = "SmtpService";

class SmtpService {

    private $inject = [toasterId, $translateId, $rootScopeId, SmtpResourceId, UserResourceId, $qId, TokenServiceId];

    smtpResource;
    userResource;
    q;
    currentSmtp: Smtp;

    rootScope;
    translate;
    toaster;
    currentPasswordLength: number = 10;

    constructor(toaster, $translate, $rootScope, SmtpResource, UserResource, $q, private TokenService: TokenService) {
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.q = $q;
        this.smtpResource = SmtpResource.resource;
        this.userResource = UserResource.resource;
    }

    async test(): Promise<any> {
        try {
            await this.save();
            let tempSmtp: Smtp = await this.smtpResource.testSmtp({ id: this.currentSmtp.id }, { smtpKey: this.TokenService.getSmtpKey() }).$promise;
            this.currentSmtp.verified = tempSmtp.verified;
            this.rootScope.isSmptVerified = this.currentSmtp.verified;
            this.toaster.pop("success", "", this.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST"));
        } catch (error) {
            this.currentSmtp.verified = false;
            this.rootScope.isSmptVerified = false;
            this.toaster.pop("error", "", this.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST_ERROR"));
            throw error;
        }
    }

    async refreshCurrentSmtp(): Promise<void> {
        this.currentSmtp = await this.smtpResource.getByUserId({ id: this.rootScope.user.id }).$promise;
        if (this.currentSmtp.id == null) {
            this.rootScope.isSmptVerified = false;
            return;
        }
        this.currentSmtp.stringPassword = "";
        this.rootScope.isSmptVerified = this.currentSmtp.verified;
        if (this.currentSmtp.smtpPasswordNull === true) { return; }
        for (let i = 0; i < this.currentPasswordLength; i++) {
            this.currentSmtp.stringPassword += "x";
        }
    }
    async save(): Promise<any> {
        this.currentPasswordLength = this.currentSmtp.stringPassword !== null ? this.currentSmtp.stringPassword.length : this.currentPasswordLength;
        if (this.currentSmtp.stringPassword.replace(/x/g, "") === "") {
            this.currentSmtp.stringPassword = null;
        } else {
            this.currentSmtp.decrypted = true;
        }
        let defer = this.q.defer();
        this.currentSmtp.user = this.rootScope.user;
        this.currentSmtp.password = this.currentSmtp.stringPassword !== null ? b64EncodeUnicode(this.currentSmtp.stringPassword) : null;

        this.currentSmtp = await this.smtpResource.createSmtp({ smtpKey: this.rootScope.user.smtpKey, smtp: this.currentSmtp }).$promise;
        this.rootScope.isSmptVerified = this.currentSmtp.verified;

        this.currentSmtp.stringPassword = "";
        for (let i = 0; i < this.currentPasswordLength; i++) {
            this.currentSmtp.stringPassword += "x";
        }
    }
}

angular.module(moduleSmtpService, [ngResourceId]).service(SmtpServiceId, SmtpService);

