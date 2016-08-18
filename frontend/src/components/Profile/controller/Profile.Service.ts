/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Authentication.Service.ts" />
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

const ProfileServiceId: string = "ProfileService";

class ProfileService {

    private $inject = [$rootScopeId, toasterId, $translateId, UserResourceId, AuthServiceId, FileResourceId];

    userResource;
    translate;
    toaster;
    rootScope;
    authService;
    passwordForm;

    fileResource;
    formdata;

    user: User;
    oldPassword: string;
    newPassword1: string;
    newPassword2: string;

    constructor($rootScope, toaster, $translate, UserResource, AuthService: AuthService, FileResource) {
        this.userResource = UserResource.resource;
        this.translate = $translate;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.authService = AuthService;
        this.user = this.authService.user;

        this.fileResource = FileResource.resource;
        this.formdata = new FormData();
    }

    submitProfilInfoForm() {
        let self = this;
        this.userResource.update(self.user).$promise.then(function () {
            self.rootScope.changeLanguage(self.user.language);
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
        });
    }

    submitPasswordForm() {
        let self = this;
        this.userResource.changePassword({ id: self.user.id }, { newPassword: self.newPassword1, oldPassword: self.oldPassword }).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS"));
            //   self.passwordForm.$setPristine();
            self.oldPassword, self.newPassword1, self.newPassword2 = "";
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_ERROR"));
        });
    }

    uploadFiles() {
        let self = this;
        console.log("file");
        console.log(this.formdata);
        this.userResource.setProfilePicture({id: 1}, this.formdata).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
        });
    }

    getTheFiles($files) {
        console.log($files);
        this.formdata.append("file", $files[0]);
    }
}

angular.module(moduleProfileService, [ngResourceId]).service(ProfileServiceId, ProfileService);
