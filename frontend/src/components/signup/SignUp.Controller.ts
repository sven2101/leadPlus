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

class SignUpController {

    $inject = ["$location", "$http", "$scope", "Auth", "toaster", "$translate"];

    location;
    http;
    scope;
    auth;
    toaster;
    translate;

    emailExists: boolean;
    usernameExists: boolean;

    constructor($location, $http, $scope, Auth, toaster, $translate) {
        this.location = $location;
        this.http = $http;
        this.scope = $scope;
        this.auth = Auth;
        this.toaster = toaster;
        this.translate = $translate;

        this.emailExists = false;
        this.usernameExists = false;
    }

    uniqueEmail(email) {
        let self = this;
        self.http.post("./api/rest/registrations/unique/email", email, {
            headers: { "Content-Type": "text/plain" }
        }).success(function (data, status, headers, config) {
            self.scope.emailExists = data;
        }).error(function (data, status, headers, config) {
        });
    };

    uniqueUsername(username) {
        let self = this;
        self.http.post("./api/rest/registrations/unique/username", username, {
            headers: { "Content-Type": "text/plain" }
        }).success(function (data, status, headers, config) {
            self.scope.usernameExists = data;
            console.log("User: ", self.scope.usernameExists);
        }).error(function (data, status, headers, config) {
            console.log("User: ", data);
        });
    };

    signup(user) {
    let self = this;
    self.auth.signup(user,
        function () {
            self.scope.user = "";
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            self.location.path("/login");
        },
        function (err) {
            self.scope.user = "";
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        }
    );
}
}

angular.module("app.signup", ["ngResource"]).controller("SignUpController", SignUpController);

