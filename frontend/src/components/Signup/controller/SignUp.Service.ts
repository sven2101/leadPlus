/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Signup/model/Signup.Model.ts" />
/// <reference path="../../app/App.Common.ts" />

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

const SignupServiceId: string = "SignupService";

class SignupService {

    private $inject = [$locationId, toasterId, $translateId, SignupResourceId];

    signupResource;
    location;
    toaster;
    translate;

    usernameExist: boolean;
    emailExist: boolean;

    constructor($location, toaster, $translate, SignupResource) {
        this.location = $location;
        this.toaster = toaster;
        this.translate = $translate;
        this.signupResource = SignupResource.resource;

        this.usernameExist = false;
        this.emailExist = false;
    }

    uniqueUsername(user: Signup): void {
        let self = this;
        this.signupResource.uniqueUsername({ username: user.username, email: user.email, password: user.password, password2: user.password2 }).$promise.then(function (data, headersGetter, status) {
            self.usernameExist = data.validation;
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }

    uniqueEmail(user: Signup): void {
        let self = this;
        this.signupResource.uniqueEmail({ username: user.username, email: user.email, password: user.password, password2: user.password2 }).$promise.then(function (data, headersGetter, status) {
            self.emailExist = data.validation;
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }

    signup(user: Signup): void {
        let self = this;
        user.password = hashPassword(user.password);
        user.password2 = hashPassword(user.password2);
        this.signupResource.signup({ username: user.username, email: user.email, password: user.password, password2: user.password2, firstname: user.firstname, lastname: user.lastname }).$promise.then(function () {
            user = null;
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            self.location.path("/login");
        }, function () {
            user = null;
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }
}

angular.module(moduleSignupService, [ngResourceId]).service(SignupServiceId, SignupService);

