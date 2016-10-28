/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Authentication.Service.ts" />
/// <reference path="../../Login/model/Credentials.Model.ts" />
/// <reference path="../../Common/service/Subdomain.Service.ts" />

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

const LoginServiceId: string = "LoginService";

class LoginService {

    private $inject = [$locationId, $windowId, AuthServiceId, toasterId, $rootScopeId, $translateId, SubdomainServiceId];

    location;
    scope;
    toaster;
    rootScope;
    translate;
    window;

    authService: AuthService;
    subdomainService: SubdomainService;

    constructor($location, $window, AuthService: AuthService, toaster, $rootScope, $translate, SubdomainService) {
        this.location = $location;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.window = $window;

        this.authService = AuthService;
        this.subdomainService = SubdomainService;
    }

    login(credentials: Credentials) {
        let self = this;
        console.log("Port: ", this.location.port());
        self.authService.login(credentials).then(
            (data) => {
                if (self.location.host() === credentials.tenant) {
                    self.location.path("/dashboard");
                } else {
                    let domain = "https://" + credentials.tenant + ":" + self.location.port() + "/#/dashboard";
                    self.window.open(domain, "_self");
                }
                self.rootScope.setUserDefaultLanguage();
                self.rootScope.loadLabels();
            }, (error) => {
                self.toaster.pop("error", "", self.translate.instant("LOGIN_ERROR"));
            });
    }
}

angular.module(moduleLoginService, [ngResourceId]).service(LoginServiceId, LoginService);