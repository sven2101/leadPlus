/// <reference path="../../Login/controller/Login.Service.ts" />
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

const LoginControllerId: string = "LoginController";

class LoginController {

    private $inject = [LoginServiceId, $locationId];

    loginService: LoginService;
    credentials: Credentials;

    constructor(LoginService: LoginService, private $location) {
        this.loginService = LoginService;
        this.credentials = new Credentials();
        this.checkForSubdomain();
    }

    checkForSubdomain(): void {
        let host: string = this.$location.host();
        let hostArray = host.split(".");
        if (hostArray[0].toLocaleLowerCase() === "leadplus" || hostArray[0].toLocaleLowerCase() === "boexli") {
            this.$location.path("/404");
        }
    }
    login() {
        this.credentials.tenant = this.$location.host();
        this.loginService.login(this.credentials);
    }
}

angular.module(moduleLogin, [ngResourceId]).controller(LoginControllerId, LoginController);