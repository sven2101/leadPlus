/// <reference path="../../../app/App.Resource.ts" />
/// <reference path="../../../Tenant/model/Tenant.Model.ts" />
/// <reference path="../../../Login/controller/Login.Service.ts" />
/// <reference path="../../../Login/model/Credentials.Model.ts" />

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

const RegistrationServiceId: string = "RegistrationService";

class RegistrationService {

    private $inject = [$locationId, toasterId, $translateId, TenantResourceId, LoginServiceId];

    loginService;
    tenantResource;
    location;
    toaster;
    translate;

    tenantKeyExist: boolean;

    constructor($location, toaster, $translate, TenantResource, LoginService) {
        this.location = $location;
        this.toaster = toaster;
        this.translate = $translate;
        this.tenantResource = TenantResource.resource;

        this.loginService = LoginService;

        this.tenantKeyExist = false;
    }

    uniqueTenantKey(tenant: Tenant): void {
        let self = this;
        this.tenantResource.uniqueTenantKey(tenant).$promise.then(function (data, headersGetter, status) {
            self.tenantKeyExist = data.validation;
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }

    register(tenant: Tenant): void {
        let self = this;
        this.tenantResource.save(tenant).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            let credentials: Credentials = new Credentials();
            credentials.username = "";
            credentials.password = "";
            this.loginService.login(credentials);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }

}

angular.module(moduleRegistrationService, [ngResourceId]).service(RegistrationServiceId, RegistrationService);

