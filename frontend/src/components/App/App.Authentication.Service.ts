/// <reference path="../app/App.Constants.ts" />
/// <reference path="../User/model/User.Model.ts" />
/// <reference path="../app/App.Resource.ts" />
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

const AuthServiceId: string = "AuthService";

class AuthService {

    $inject = [$httpId, $rootScopeId, $cookieStoreId, $locationId, UserResourceId];

    http;
    rootScope;
    cookieStore;
    location;
    userResource;

    constructor($http, $rootScope, $cookieStore, $location, UserResource) {
        this.http = $http;
        this.rootScope = $rootScope;
        this.cookieStore = $cookieStore;
        this.location = $location;
        this.userResource = UserResource.resource;
    }

    login(credentials, success, error) {
        let self = this;
        if (credentials) {

            let authorization = btoa(credentials.username + ":" + credentials.password);
            let headers = credentials ? { authorization: "Basic " + authorization } : {};
            this.http.get("user", { headers: headers }).success(function (data) {
                console.log("data", data);
                console.log(data);
                if (data.username) {
                    self.rootScope.globals = {
                        user: {
                            id: data.id,
                            username: data.username,
                            role: data.role,
                            email: data.email,
                            language: data.language,
                            profilePicture: data.profilePicture,
                            smtp: data.smtp,
                            authorization: authorization
                        }
                    };
                    self.http.defaults.headers.common["Authorization"] = "Basic " + authorization;
                    self.cookieStore.put("globals", self.rootScope.globals);
                    self.setCurrentUser();
                    success(data);
                    self.rootScope.$broadcast("onTodosChange");
                } else {
                    console.log("username is null");
                }
            }).error(error);

        }
    }

    logout() {
        this.rootScope.currentUser = null;
        this.rootScope.globals = {};
        this.cookieStore.remove("globals");
        this.http.defaults.headers.common.Authorization = "Basic";

        let self = this;
        this.http.post("logout", {})
            .success(function () {
                self.location.path("#/login");
            })
            .error(function (data) {
                self.location.path("#/login");
            });
    }

    setCurrentUser() {
        let self = this;
        if (!angular.isUndefined(self.rootScope.globals.user)) {
            self.userResource.get({ id: self.rootScope.globals.user.id }).$promise.then(function (result) {
                self.rootScope.currentUser = result;
            });
        }

    }
}

angular.module(moduleAuthService, [ngResourceId]).service(AuthServiceId, AuthService);