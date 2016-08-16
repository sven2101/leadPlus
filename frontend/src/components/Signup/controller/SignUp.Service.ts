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

const SignUpServiceId: string = "SignUpService";

class SignUpService {

    private $inject = [$locationId, $scopeId, toasterId, $translateId, SignUpResource];

    signUpResource;
    location;
    scope;
    toaster;
    translate;

    emailExists: boolean;
    usernameExists: boolean;

    constructor($location, $scope, toaster, $translate, signUpResource: SignUpResource) {
        this.location = $location;
        this.scope = $scope;
        this.toaster = toaster;
        this.translate = $translate;
        this.signUpResource = signUpResource;

        this.emailExists = false;
        this.usernameExists = false;
    }

    uniqueEmail(email: string) {
        let self = this;
        this.signUpResource.uniqueEmail().$promise.then(function (data, status, headers, config) {
            self.scope.emailExists = data;
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }

    uniqueUsername(username: string) {
        let self = this;
        this.signUpResource.uniqueUsername().$promise.then(function (data, status, headers, config) {
            self.scope.usernameExists = data;
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }

    signup(user: User) {
        let self = this;
        this.signUpResource.signup(user).$promise.then(function () {
            self.scope.user = "";
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            self.location.path("/login");
        }, function () {
            self.scope.user = "";
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }
}

angular.module(moduleSignupService, [ngResourceId]).service(SignUpServiceId, SignUpService);

