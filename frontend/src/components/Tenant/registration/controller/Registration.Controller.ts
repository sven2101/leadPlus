/// <reference path="../../../Tenant/Registration/controller/Registration.Service.ts" />
/// <reference path="../../../Tenant/model/Tenant.Model.ts" />
/// <reference path="../../../Tenant/controller/Tenant.Service.ts" />
/// <reference path="../../../Signup/model/Signup.Model.ts" />
/// <reference path="../../../Signup/controller/SignUp.Service.ts" />
/// <reference path="../../../Login/controller/Login.Service.ts" />
/// <reference path="../../../Login/Model/Credentials.Model.ts" />

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

const RegistrationControllerId: string = "RegistrationController";

class RegistrationController {

    private $inject = [RegistrationServiceId, SignupServiceId, TenantServiceId, LoginServiceId, $httpId, $locationId, $sceId, TokenServiceId];

    signupService: SignupService;
    registrationService: RegistrationService;
    tenantService: TenantService;
    loginService: LoginService;

    credentials: Credentials;
    tenant: Tenant;
    password1: string;
    password2: string;
    user: Signup;

    iframeUrl = "";

    http;
    location;

    constructor(RegistrationService, SignupService, TenantService, LoginService, $http, $location, private $sce, private TokenService: TokenService) {
        this.registrationService = RegistrationService;
        this.signupService = SignupService;
        this.tenantService = TenantService;
        this.loginService = LoginService;
        this.tenant = new Tenant();
        this.user = new Signup();
        this.credentials = new Credentials();
        this.http = $http;
        this.location = $location;
    }

    uniqueTenantKey(): void {
        if (!isNullOrUndefined(this.tenant) && !isNullOrUndefined(this.tenant.tenantKey) && this.tenant.tenantKey.length > 0) {
            this.registrationService.uniqueTenantKey(this.tenant);
        }
    }

    uniqueEmail(): void {
        this.signupService.uniqueEmail(this.user);
    }

    async register(): Promise<void> {
        let self = this;

        this.user.password = this.password1;
        this.user.password2 = this.password2;

        this.tenant.license.term = newTimestamp();
        this.tenant.license.trial = true;
        this.tenant.license.licenseType = "BASIC";
        this.tenant.registration = this.user;
        this.tenant.registration.password = hashPasswordPbkdf2(this.user.password, this.user.email);
        console.log(this.tenant.registration.password);
        this.tenant.registration.password2 = hashPasswordPbkdf2(this.user.password, this.user.email);
        this.user.email = this.user.email.toLowerCase();

        this.tenantService.save(this.tenant).then(async function (createdTenant: Tenant) {
            /*
            self.iframeUrl = self.$sce.trustAsResourceUrl("http://" + self.tenant.tenantKey + ".leadplus.localhost:8080/subdomainiframe.html");

            let x = await self.TokenService.setTokenByCredentials({ username: self.credentials.email, password: self.credentials.password });
            console.log(x);
            let win = document.getElementsByTagName("iframe")[0].contentWindow;
            let obj = {
                name: "Jack"
            };
            console.log(win);
            win.postMessage(JSON.stringify({ key: "storage", data: obj }), "*");
            */
            let port = self.location.port();
            port = ":" + port;
            if (port !== ":8080") {
                port = "";
            }
            console.log("redirect");
            window.open("https://" + self.tenant.tenantKey + "." + self.location.host() + port + "/", "_self");
            // self.signupService.init(self.user.password, self.tenant.tenantKey);
        }, function (error) {
            handleError(error);
        });
    }
}

angular.module(moduleRegistration, [ngResourceId]).controller(RegistrationControllerId, RegistrationController);