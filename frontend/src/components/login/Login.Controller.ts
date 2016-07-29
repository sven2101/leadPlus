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

class LoginController {

    static $inject = ["$location", "Auth", "$scope", "toaster", "$rootScope", "$translate"];

    location;
    auth;
    scope;
    toaster;
    rootScope;
    translate;

    constructor($location, Auth, $scope, toaster, $rootScope, $translate) {
        this.location = $location;
        this.auth = Auth;
        this.scope = $scope;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
    }

    login(credentials) {
        let self = this;
        if (credentials.username === "apiuser") {
            self.scope.credentials.password = "";
            self.toaster.pop("error", "", self.translate.instant("LOGIN_ERROR"));
        }
        else {
            self.auth.login(credentials,
                function (res) {
                    self.location.path("/dashoard");
                    self.rootScope.setUserDefaultLanguage();
                    self.rootScope.loadLabels();
                },
                function (err) {
                    self.scope.credentials.password = "";
                    self.toaster.pop("error", "", self.translate.instant("LOGIN_ERROR"));
                }
            );
        }
    };
}

angular.module("app.login", ["ngResource"]).controller("LoginController", LoginController);