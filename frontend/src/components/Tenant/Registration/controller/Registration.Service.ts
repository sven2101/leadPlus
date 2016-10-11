/// <reference path="../../../app/App.Resource.ts" />
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

const RegistrationServiceId: string = "RegistrationService";

class RegistrationService {

    private $inject = [$locationId, toasterId, $translateId, TenantResourceId];

    tenantResource;
    location;
    toaster;
    translate;

    tenantKeyExist: boolean;

    constructor($location, toaster, $translate, TenantResource) {
        this.location = $location;
        this.toaster = toaster;
        this.translate = $translate;
        this.tenantResource = TenantResource.resource;

        this.tenantKeyExist = false;
    }

    uniqueTenantKey(tenant: Tenant): void {
        let self = this;
        this.tenantResource.uniqueTenantKey(tenant).$promise.then(function (data, headersGetter, status) {
            self.tenantKeyExist = data.validation;
            console.log("Tenant Key: ", data);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }
    /*
        uniqueEmail(user: Signup): void {
            let self = this;
            this.signupResource.uniqueEmail({ username: user.username, email: user.email, password: user.password, password2: user.password2 }).$promise.then(function (data, headersGetter, status) {
                self.emailExist = data.validation;
            }, function () {
                self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
            });
        }
        */

    register(tenant: Tenant): void {
        let self = this;
        this.tenantResource.save(tenant).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            self.location.path(tenant.tenantKey + ".leadplus.io");
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }

}

angular.module(moduleRegistrationService, [ngResourceId]).service(RegistrationServiceId, RegistrationService);

