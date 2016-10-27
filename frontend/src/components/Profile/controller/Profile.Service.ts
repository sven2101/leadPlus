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


    private $inject = [$rootScopeId, toasterId, $translateId, UserResourceId, FileResourceId, $qId, $cookiesId];


    userResource;
    translate;
    toaster;
    rootScope;
    authService;
    fileResource;
    formdata;
    q;
    cookies;
    user: User;

    oldPassword: string;
    newPassword1: string;
    newPassword2: string;

    constructor($rootScope, toaster, $translate, UserResource, FileResource, $q, $cookies) {
        this.userResource = UserResource.resource;
        this.translate = $translate;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.formdata = new FormData();
        this.q = $q;
        this.cookies = $cookies;
    }

    updateProfilInfo(user: User): IPromise<User> {
        let defer = this.q.defer();
        let self = this;

        this.userResource.update(user).$promise.then(function (updatedUser: User) {
            self.updateRootScope(updatedUser);
            self.cookies.put("globals", self.rootScope);
            self.rootScope.changeLanguage(self.rootScope.user.language);
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
            defer.resolve(updatedUser);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
            defer.reject(self.rootScope.user);
        });
        return defer.promise;
    }

    updateProfileImage(user: User) {
        let self = this;
        this.userResource.setProfilePicture(user).$promise.then(function (data) {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
            $("#profilePicture").prop("httpsrc", "users/" + self.rootScope.user.id + "/profile/picture?" + new Date().valueOf());
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
            self.rootScope.user.picture = null;
            self.cookies.put("globals", self.rootScope);
        });
    }

    updatePassword(oldPassword, newPassword1, newPassword2): IPromise<boolean> {
        // let salt: string = this.rootScope.user.email;
        let salt = "test";
        oldPassword = hashPasswordPbkdf2(oldPassword, salt);
        newPassword1 = hashPasswordPbkdf2(newPassword1, salt);
        newPassword2 = hashPasswordPbkdf2(newPassword2, salt);
        let defer = this.q.defer();
        let self = this;
        this.userResource.changePassword({
            id: this.rootScope.user.id
        }, {
                newPassword: newPassword1,
                oldPassword: oldPassword,
                oldSmtpKey: self.rootScope.user.smtpKey,
                newSmtpKey: encodeURIComponent(hashPasswordPbkdf2(newPassword1, salt))
            }).$promise.then(function () {
                self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS"));
                self.rootScope.user.smtpKey = encodeURIComponent(hashPasswordPbkdf2(newPassword1, salt));
                defer.resolve(true);
            }, function () {
                self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_ERROR"));
                defer.reject(false);
            });
        return defer.promise;
    }

    uploadFiles() {
        let self = this;
        this.userResource.setProfilePicture({ id: this.rootScope.user.id }, this.formdata).$promise.then(function (data) {
            self.rootScope.user.picture = data.picture;
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
            self.getById();
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
        });
    }

    getById(): IPromise<User> {
        let defer = this.q.defer();
        let self = this;
        this.userResource.getById({ id: this.rootScope.user.id }).$promise.then(function (resultUser: User) {
            defer.resolve(resultUser);
        }, function (error: any) {
            defer.reject(error);
        });
        return defer.promise;
    }

    updateRootScope(user: User) {
        this.rootScope.user.email = user.email;
        this.rootScope.user.firstname = user.firstname;
        this.rootScope.user.lastname = user.lastname;
        this.rootScope.user.phone = user.phone;
        this.rootScope.user.language = user.language;
        this.rootScope.user.skype = user.skype;
        this.rootScope.user.job = user.job;
        this.rootScope.user.fax = user.fax;
    }

    getTheFiles($files) {
        this.formdata.append("file", $files[0]);
    }
}

angular.module(moduleProfileService, [ngResourceId, ngImgCropId]).service(ProfileServiceId, ProfileService);
