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
    location;

    constructor(LoginService: LoginService, $location) {
        this.loginService = LoginService;
        this.location = $location;
        this.credentials = new Credentials();
    }

    login() {
        this.credentials.tenant = this.location.host();
        this.loginService.login(this.credentials);
    }
}

angular.module(moduleLogin, [ngResourceId]).controller(LoginControllerId, LoginController);