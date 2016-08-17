/// <reference path="../../Signup/controller/SignUp.Service.ts" />

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

const SignupControllerId: string = "SignupController";

class SignupController {

    private $inject = [SignupServiceId];

    signupService;

    constructor(SignupService) {
        this.signupService = SignupService;
    }

    uniqueEmail(email: string): void {
        this.signupService.uniqueEmail(email);
    }

    uniqueUsername(username: string): void {
        this.signupService.uniqueUsername(username);
    }

    signup(user: User): void {
        this.signupService.signup(user);
    }
}

angular.module(moduleSignup, [ngResourceId]).controller(SignupControllerId, SignupController);