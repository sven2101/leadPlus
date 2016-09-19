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

    private $inject = [$rootScopeId, toasterId, $translateId, UserResourceId, FileResourceId, $qId, $cookieStoreId];

    userResource;
    translate;
    toaster;
    rootScope;
    authService;
    passwordForm;
    fileResource;
    formdata;
    q;
    cookieStore;
    user: User;

    oldPassword: string;
    newPassword1: string;
    newPassword2: string;

    constructor($rootScope, toaster, $translate, UserResource, FileResource, $q, $cookieStore) {
        this.userResource = UserResource.resource;
        this.translate = $translate;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.fileResource = FileResource.resource;
        this.formdata = new FormData();
        this.user = new User();
        this.user.picture = new FileUpload();
        this.q = $q;
        this.cookieStore = $cookieStore;
    }

    submitProfilInfoForm(user: User) {
        let self = this;
        this.userResource.update(user).$promise.then(function (data) {
            self.rootScope.globals.user.firstname = data.firstname;
            self.rootScope.globals.user.lastname = data.lastname;
            self.cookieStore.put("globals", self.rootScope.globals);
            self.rootScope.changeLanguage(self.rootScope.globals.user.language);
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
        });
    }

    submitPasswordForm() {
        let self = this;
        this.userResource.changePassword({ id: this.rootScope.globals.user.id }, { newPassword: this.newPassword1, oldPassword: this.oldPassword }).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS"));
            self.passwordForm.$setPristine();

            self.oldPassword = "";
            self.newPassword1 = "";
            self.newPassword2 = "";
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_ERROR"));
        });
    }

    uploadFiles() {
        let self = this;
        this.userResource.setProfilePicture({ id: this.rootScope.globals.user.id }, this.formdata).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
            self.getById();
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
        });
    }

    getById(): IPromise<User> {
        let defer = this.q.defer();
        let self = this;
        this.userResource.getById({ id: this.rootScope.globals.user.id }).$promise.then(function (resultUser: User) {
            console.log("User: ", resultUser);
            self.user = resultUser;
            defer.resolve(resultUser);
        }, function (error: any) {
            defer.reject(error);
        });
        return defer.promise;
    }

    getTheFiles($files) {
        this.formdata.append("file", $files[0]);
    }
}

angular.module(moduleProfileService, [ngResourceId, ngImgCropId]).service(ProfileServiceId, ProfileService);
