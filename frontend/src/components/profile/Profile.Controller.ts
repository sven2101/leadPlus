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

/// <reference path="../models/User.ts" />

class ProfileController {

    static $inject = ["$rootScope", "toaster", "UserResource", "$translate"];

    userService;
    translate;
    user: User;
    toaster;
    rootScope;
    oldPassword: String;
    newPassword1: String;
    newPassword2: String;
    passwordForm;


    constructor($rootScope, toaster, UserResource, $translate) {
        this.userService = UserResource;
        this.translate = $translate;
        let self = this;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.oldPassword = "";
        this.newPassword1 = "";
        this.newPassword2 = "";
        this.userService.get({ id: $rootScope.globals.currentUser.id }).$promise.then(function(result) {
            self.user = result;
        });
    }

    submitProfilInfoForm(user) {
        let self = this;
        this.userService.update(user).$promise.then(function() {
            self.rootScope.changeLanguage(user.language);
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
        }, function() {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
        });
    };

    submitPasswordForm(user) {
        let self = this;
        this.userService.changePassword({ id: user.id }, {
            newPassword: this.newPassword1,
            oldPassword: this.oldPassword
        }).$promise.then(function() {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS"));
            self.passwordForm.$setPristine();
            self.oldPassword = "";
            self.newPassword1 = "";
            self.newPassword2 = "";
        }, function() {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_ERROR"));
        });
    };

}

angular.module("app.profile", ["ngResource"]).controller("ProfileController", ProfileController);
