/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Signup/model/Signup.Model.ts" />
/// <reference path="../../app/App.Common.ts" />
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

const SignupServiceId: string = "SignupService";

class SignupService {

    private $inject = [$locationId, toasterId, $translateId, $qId, SignupResourceId];

    signupResource;
    location;
    toaster;
    translate;
    q;
    usernameExist: boolean;
    emailExist: boolean;

    constructor($location, toaster, $translate, $q, SignupResource) {
        this.location = $location;
        this.toaster = toaster;
        this.translate = $translate;
        this.q = $q;
        this.signupResource = SignupResource.resource;

        this.usernameExist = false;
        this.emailExist = false;
    }

    uniqueEmail(user: Signup): void {
        let self = this;
        user.email = user.email.toLowerCase();
        this.signupResource.uniqueEmail(user).$promise.then(function (data, headersGetter, status) {
            self.emailExist = data.validation;
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }

    signup(user: Signup): IPromise<User> {
        let defer = this.q.defer();
        let self = this;
        user.email = user.email.toLowerCase();
        let salt: string = user.email;
        user.password = hashPasswordPbkdf2(user.password, salt);
        console.log(user.password);
        user.password2 = hashPasswordPbkdf2(user.password2, salt);

        this.signupResource.signup(user).$promise.then(function (createdUser: User) {
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            defer.resolve(createdUser);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
            defer.reject(null);
        });
        return defer.promise;
    }
}

angular.module(moduleSignupService, [ngResourceId]).service(SignupServiceId, SignupService);

