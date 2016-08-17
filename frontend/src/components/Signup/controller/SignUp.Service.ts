/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../User/model/User.Model.ts" />

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

    user: User;
    emailExists: boolean;
    usernameExists: boolean;

    constructor($location, toaster, $translate, SignupResource) {
        this.location = $location;
        this.toaster = toaster;
        this.translate = $translate;
        this.signupResource = SignupResource.resource;

        this.emailExists = false;
        this.usernameExists = false;
    }

    uniqueEmail(email: string): void {
        let self = this;
        console.log("Email: " + email);
        this.signupResource.uniqueEmail({ email }).$promise.then(function (result) {
            self.emailExists = result;
            console.log(result);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }

    uniqueUsername(username: string): void {
        let self = this;
        console.log("Username Data: " + username);
        this.signupResource.uniqueUsername({ username }).$promise.then(function (result) {
            self.usernameExists = result;
            console.log(result);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }

    signup(user: User): void {
        let self = this;
        this.signupResource.signup({ user: user }).$promise.then(function () {
            self.user.username = "";
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            self.location.path("/login");
        }, function () {
            self.user.username = "";
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }
}

angular.module(moduleSignupService, [ngResourceId]).service(SignupServiceId, SignupService);

