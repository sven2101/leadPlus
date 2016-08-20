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

    constructor(ProfileService: ProfileService) {
        this.profileService = ProfileService;
        angular.element(document.querySelector("#fileInput")).on("change", this.handleFileSelect);
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
        this.profileService.getTheFiles($files);
    }

    handleFileSelect(evt) {
        let file = evt.currentTarget.files[0];
        let reader = new FileReader();
        let self = this;
        reader.onload = function (evt) {
            this.$apply(function ($scope) {
                //  self.myImage = evt.target.;
            });
        };
        reader.readAsDataURL(file);
    }

}

angular.module(moduleProfile, [ngResourceId]).controller(ProfileControllerId, ProfileController);
