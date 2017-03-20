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

    private $inject = [$rootScopeId, toasterId, $translateId, UserResourceId, FileResourceId, $qId, $locationId, TokenServiceId];

    userResource;
    translate;
    toaster;
    rootScope;
    authService;
    fileResource;
    formdata;
    q;

    oldPassword: string;
    newPassword1: string;
    newPassword2: string;
    location;

    constructor($rootScope, toaster, $translate, UserResource, FileResource, $q, $location, private TokenService: TokenService) {
        this.fileResource = FileResource.resource;
        this.userResource = UserResource.resource;
        this.translate = $translate;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.formdata = new FormData();
        this.q = $q;
        this.location = $location;
    }

    updateProfilInfo(user: User): Promise<User> {
        let defer = this.q.defer();
        let self = this;

        this.userResource.update(user).$promise.then(function (updatedUser: User) {
            self.updateRootScope(updatedUser);
            self.TokenService.saveItemToLocalStorage(USER_STORAGE, self.rootScope.user);
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
        this.userResource.setProfilePicture(user).$promise.then(function (data: any) {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
            data.authorization = self.rootScope.user.authorization;
            data.smtpKey = self.rootScope.user.smtpKey;
            self.rootScope.user = data;
            self.TokenService.saveItemToLocalStorage(USER_STORAGE, self.rootScope.user);
            $("#profilePicture").prop("src", "data:image/jpeg;base64," + user.picture.content);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
        });
    }

    async updatePassword(oldPassword, newPassword1, newPassword2): Promise<void> {
        let salt: string = this.rootScope.user.email;
        oldPassword = hashPasswordPbkdf2(oldPassword, salt);
        newPassword1 = hashPasswordPbkdf2(newPassword1, salt);

        try {
            let token = await this.userResource.changePassword({ id: this.rootScope.user.id }, {
                newPassword: newPassword1, oldPassword: oldPassword,
            }).$promise;

            this.TokenService.setToken(token);
            this.toaster.pop("success", "", this.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS"));
        } catch (error) {
            this.toaster.pop("error", "", this.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_ERROR"));

        }
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

    getById(): Promise<User> {
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
        this.rootScope.user.defaultVat = user.defaultVat;
    }

    getTheFiles($files) {
        this.formdata.append("file", $files[0]);
    }
}

angular.module(moduleProfileService, [ngResourceId, ngImgCropId]).service(ProfileServiceId, ProfileService);
