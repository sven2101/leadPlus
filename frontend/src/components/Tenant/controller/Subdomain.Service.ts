/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Authentication.Service.ts" />
/// <reference path="../../Login/model/Credentials.Model.ts" />

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