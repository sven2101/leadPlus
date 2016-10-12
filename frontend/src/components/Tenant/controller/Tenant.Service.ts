/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Signup/model/Signup.Model.ts" />
/// <reference path="../../Tenant/model/Tenant.Model.ts" />
/// <reference path="../../Common/model/Promise.Interface.ts" />

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

const TenantServiceId: string = "TenantService";

class TenantService {

    private $inject = [$locationId, toasterId, $translateId, TenantResourceId, $qId];

    tenantResource;
    location;
    toaster;
    translate;
    q;

    constructor($location, toaster, $translate, TenantResource, $q) {
        this.location = $location;
        this.toaster = toaster;
        this.translate = $translate;
        this.tenantResource = TenantResource.resource;
        this.q = $q;
    }

    save(tenant: Tenant): IPromise<Tenant> {
        let defer = this.q.defer();
        let self = this;
        this.tenantResource.save(tenant).$promise.then(function (tenant: Tenant) {
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            console.log("Tenant: ", tenant);
            defer.resolve(tenant);
        }, function () {
            defer.reject(null);
        });

        return defer.promise;
    }
}

angular.module(moduleTenantService, [ngResourceId]).service(TenantServiceId, TenantService);

