/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Setting/controller/Setting.Service.ts" />
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

const SettingControllerId: string = "SettingController";

class SettingController {

    private $inject = [SettingServiceId];

    settingService;

    constructor(settingService: SettingService) {
        this.settingService = settingService;
    }

    activateUser(user: User) {
        this.settingService.activateUser(user);
    }

    deactivateUser(user: User) {
        this.settingService.deactivateUser(user);
    }

    hasRight(user: User): boolean {
        return this.settingService.hasRight(user);
    }

    changeRole(user: User) {
        this.settingService.changeRole(user);
    }

}

angular.module(moduleSettings, [ngResourceId]).controller(SettingControllerId, SettingController);

