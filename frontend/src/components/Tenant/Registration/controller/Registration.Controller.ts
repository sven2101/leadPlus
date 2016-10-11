/// <reference path="../../../Tenant/Registration/controller/Registration.Service.ts" />
/// <reference path="../../../Tenant/model/Tenant.Model.ts" />

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

    private $inject = [RegistrationServiceId];

    registrationService;
    tenant: Tenant;

    constructor(RegistrationService) {
        this.registrationService = RegistrationService;
        this.tenant = new Tenant();
    }

    uniqueTenantKey(): void {
        this.registrationService.uniqueTenantKey(this.tenant);
    }

    /*
        uniqueEmail(): void {
            this.signupService.uniqueEmail(this.user);
        }
    
        signup(): void {
            this.signupService.signup(this.user);
        }
    */
}

angular.module(moduleRegistration, [ngResourceId]).controller(RegistrationControllerId, RegistrationController);