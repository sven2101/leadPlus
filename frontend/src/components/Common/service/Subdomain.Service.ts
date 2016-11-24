/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Authentication.Service.ts" />
/// <reference path="../../Login/model/Credentials.Model.ts" />

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

const SubdomainServiceId: string = "SubdomainService";

class SubdomainService {

    private $inject = [$locationId];

    location;

    constructor($location) {
        this.location = $location;
    }

    getSubdomain(): string {
        let host = this.location.host();
        if (host.indexOf(".") < 0) {
            return null;
        } else {
            return host.split(".")[0];
        }
    }
}

angular.module(moduleSubdomainService, [ngResourceId]).service(SubdomainServiceId, SubdomainService);