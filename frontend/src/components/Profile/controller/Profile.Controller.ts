/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Profile/controller/Profile.Service.ts" />

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

    private $inject = [ProfileServiceId];

    myImage = "";
    myCroppedImage = "";
    profileService;
    fileSelected: boolean = false;

    constructor(ProfileService: ProfileService) {
        this.profileService = ProfileService;
    }

    submitProfilInfoForm() {
        this.profileService.submitProfilInfoForm();
    }

    submitPasswordForm() {
        this.profileService.submitPasswordForm();
    }

    uploadFiles() {
        this.profileService.uploadFiles();
    }

    getTheFiles($files) {
        this.fileSelected = true;
        console.log("fileSelected", this.fileSelected);
        this.profileService.getTheFiles($files);
    }
}

angular.module(moduleProfile, [ngResourceId]).controller(ProfileControllerId, ProfileController);
