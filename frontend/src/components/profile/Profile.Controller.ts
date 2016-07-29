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

import {User} from "../models/User.ts";

class ProfileController {

    static $inject = ["$rootScope", "toaster", "Profile", "$translate"];

    profileService;
    translate;
    user: User;
    toaster;
    rootScope;
    oldPassword: String;
    newPassword1: String;
    newPassword2: String;


    constructor($rootScope, toaster, Profile, $translate) {
        this.profileService = Profile;
        this.translate = $translate;
        let self = this;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.oldPassword = "";
        this.newPassword1 = "";
        this.newPassword2 = "";


        this.profileService.get({ username: $rootScope.globals.currentUser.username }).$promise.then(function (result) {
            self.user = result;
        });
    }

    submitProfilInfoForm(user) {
        let self = this;
        this.profileService.update({ username: user.username }, user).$promise.then(function () {
            self.rootScope.changeLanguage(user.language);
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
        }, function () {
            // TODO macht das Sinn?
            self.user.language = self.user.language;
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
        });
    };

    submitPasswordForm(user) {
        let self = this;
        this.profileService.pw({ username: user.username }, {
            newPassword: this.newPassword1,
            oldPassword: this.oldPassword
        }).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS"));
            // TODO
            // self.passwordForm.$setPristine();
            self.oldPassword = "";
            self.newPassword1 = "";
            self.newPassword2 = "";
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_ERROR"));
        });
    };

}

angular.module("app.profile", ["ngResource"]).controller("ProfileController", ProfileController);
