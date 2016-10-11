/// <reference path="../../../Tenant/Registration/controller/Registration.Service.ts" />
/// <reference path="../../../Tenant/model/Tenant.Model.ts" />
/// <reference path="../../../Tenant/controller/Tenant.Service.ts" />
/// <reference path="../../../Signup/model/Signup.Model.ts" />
/// <reference path="../../../Signup/controller/SignUp.Service.ts" />

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

    private $inject = [RegistrationServiceId, SignupServiceId, TenantServiceId];

    signupService;
    registrationService;
    tenantService;
    tenant: Tenant;
    user: Signup;

    constructor(RegistrationService, SignupService) {
        this.registrationService = RegistrationService;
        this.signupService = SignupService;
        this.tenantService = TenantService;
        this.tenant = new Tenant();
        this.user = new Signup();
    }

    uniqueTenantKey(): void {
        this.registrationService.uniqueTenantKey(this.tenant);
    }

    uniqueEmail(): void {
        this.signupService.uniqueEmail(this.user);
    }

    register(): void {
        this.tenantService.save(this.tenant);
        this.signupService.signup(this.user);
        // login user
        // location dashboard
    }

}

angular.module(moduleRegistration, [ngResourceId]).controller(RegistrationControllerId, RegistrationController);