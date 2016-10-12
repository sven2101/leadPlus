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

const LoginServiceId: string = "LoginService";

class LoginService {

    private $inject = [$locationId, AuthServiceId, toasterId, $rootScopeId, $translateId];

    location;
    authService: AuthService;
    scope;
    toaster;
    rootScope;
    translate;

    constructor($location, AuthService: AuthService, toaster, $rootScope, $translate) {
        this.location = $location;
        this.authService = AuthService;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
    }

    login(credentials: Credentials) {
        let self = this;
        self.authService.login(credentials,
            function (res) {
                console.log("Inside!");
                self.location.path("/dashoard");
                self.rootScope.setUserDefaultLanguage();
                self.rootScope.loadLabels();
            },
            function (err) {
                self.scope.credentials.password = "";
                self.toaster.pop("error", "", self.translate.instant("LOGIN_ERROR"));
            }
        );
    };
}

angular.module(moduleLoginService, [ngResourceId]).service(LoginServiceId, LoginService);