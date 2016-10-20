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

    private $inject = [$rootScopeId, toasterId, $translateId, UserResourceId, $qId, $cookieStoreId];

    userResource;
    translate;
    toaster;
    rootScope;
    authService;
    fileResource;
    formdata;
    q;
    cookieStore;

    constructor($rootScope, toaster, $translate, UserResource, $q, $cookieStore) {
        this.userResource = UserResource.resource;
        this.translate = $translate;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.formdata = new FormData();
        this.q = $q;
        this.cookieStore = $cookieStore;
    }

    updateProfilInfo(user: User): IPromise<User> {
        let defer = this.q.defer();
        let self = this;
        this.userResource.update(user).$promise.then(function (updatedUser: User) {
            self.updateRootScope(updatedUser);
            self.cookieStore.put("globals", self.rootScope.globals);
            self.rootScope.changeLanguage(self.rootScope.globals.user.language);
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
            defer.resolve(updatedUser);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
            defer.reject(self.rootScope.globals.user);
        });
        return defer.promise;
    }

    updateProfileImage(user: User) {
        let self = this;
        this.userResource.setProfilePicture(user).$promise.then(function (data) {
            self.rootScope.globals.user.picture = null;
            self.cookieStore.put("globals", self.rootScope.globals);
            self.rootScope.globals.user.picture = user.picture;
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
            self.rootScope.globals.user.picture = null;
            self.cookieStore.put("globals", self.rootScope.globals);
        });
    }

    updatePassword(oldPassword, newPassword1, newPassword2): IPromise<boolean> {
        let defer = this.q.defer();
        let self = this;
        this.userResource.changePassword({ id: this.rootScope.globals.user.id }, { newPassword: newPassword1, oldPassword: oldPassword }).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS"));
            defer.resolve(true);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_ERROR"));
            defer.reject(false);
        });
        return defer.promise;
    }

    uploadFiles() {
        let self = this;
        this.userResource.setProfilePicture({ id: this.rootScope.globals.user.id }, this.formdata).$promise.then(function (data) {
            self.rootScope.globals.user.picture = data.picture;
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
            defer.resolve(resultUser);
        }, function (error: any) {
            defer.reject(error);
        });
        return defer.promise;
    }

    updateRootScope(user: User) {
        this.rootScope.globals.user.email = user.email;
        this.rootScope.globals.user.firstname = user.firstname;
        this.rootScope.globals.user.lastname = user.lastname;
        this.rootScope.globals.user.phone = user.phone;
        this.rootScope.globals.user.language = user.language;
        this.rootScope.globals.user.skype = user.skype;
        this.rootScope.globals.user.job = user.job;
        this.rootScope.globals.user.fax = user.fax;
    }

    getTheFiles($files) {
        this.formdata.append("file", $files[0]);
    }
}

angular.module(moduleProfileService, [ngResourceId, ngImgCropId]).service(ProfileServiceId, ProfileService);
