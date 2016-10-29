/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Profile/controller/Profile.Service.ts" />
/// <reference path="../../FileUpload/model/FileUpload.Model.ts" />
/// <reference path="../../App/App.Common.ts" />

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

const ProfileControllerId: string = "ProfileController";

class ProfileController {

    private $inject = [ProfileServiceId, $rootScopeId, $scopeId];

    myImage = "";
    myCroppedImage = "";
    profileService: ProfileService;
    rootscope;

    passwordForm;

    currentUser: User;
    oldPassword: string;
    newPassword1: string;
    newPassword2: string;

    constructor(ProfileService: ProfileService, $rootScope, $scope) {
        this.profileService = ProfileService;
        this.rootscope = $rootScope;
        this.currentUser = deepCopy(this.rootscope.user);
        this.getById();
        let self = this;
        let profileImageSaved = $rootScope.$on("profileImageSaved", function (evt, data: FileUpload) {
            if (!isNullOrUndefined(data)) {
                let user = deepCopy(self.rootscope.user);
                user.picture = data[0];
                user.thumbnail = data[1];
                self.updateProfileImage(user);
            }
        });
        $scope.$on("$destroy", function handler() {
            profileImageSaved();
        });
    }

    saveProfileImage() {
        this.rootscope.$broadcast("saveCroppedImage");
    }

    updateProfilInfo() {
        this.profileService.updateProfilInfo(this.currentUser).then((result) => this.currentUser = result, (error) => { this.reduceCurrentUserInfo(); });
    }

    reduceCurrentUserInfo() {
        this.currentUser.email = this.rootscope.user.email;
        this.currentUser.firstname = this.rootscope.user.firstname;
        this.currentUser.lastname = this.rootscope.user.lastname;
        this.currentUser.phone = this.rootscope.user.phone;
        this.currentUser.language = this.rootscope.user.language;
        this.currentUser.skype = this.rootscope.user.skype;
        this.currentUser.job = this.rootscope.user.job;
        this.currentUser.fax = this.rootscope.user.fax;
    }

    updateProfileImage(user: User) {
        this.profileService.updateProfileImage(user);
    }

    updatePassword() {
        this.profileService.updatePassword(this.oldPassword, this.newPassword1, this.newPassword2).then((result) => {
            this.passwordForm.$setPristine();
            this.clearPasswordForm();
        }, (error) => {
            handleError(error);
            /*
            this.passwordForm.$setPristine();
            this.clearPasswordForm();
            */
        });
    }

    clearPasswordForm() {
        this.oldPassword = "";
        this.newPassword1 = "";
        this.newPassword2 = "";
    }

    uploadFiles() {
        this.profileService.uploadFiles();
    }

    getById() {
        this.profileService.getById().then((result) => this.currentUser = result, (error) => handleError(error));
    }

    getTheFiles($files) {
        this.profileService.getTheFiles($files);
    }
}

angular.module(moduleProfile, [ngResourceId]).controller(ProfileControllerId, ProfileController);
