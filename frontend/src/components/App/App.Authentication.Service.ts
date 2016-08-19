/// <reference path="../app/App.Constants.ts" />
/// <reference path="../User/model/User.Model.ts" />

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

    $inject = [$httpId, $rootScopeId, $cookieStoreId, $locationId, $windowId, $compileId];

    http;
    rootScope;
    cookieStore;
    location;
    window;
    compile;
    user: User;

    constructor($http, $rootScope, $cookieStore, $location, $window, $compile) {
        this.http = $http;
        this.rootScope = $rootScope;
        this.cookieStore = $cookieStore;
        this.location = $location;
        this.window = $window;
        this.compile = $compile;
    }

    login(credentials, success, error) {
        let self = this;
        if (credentials) {

            let authorization = btoa(credentials.username + ":" + credentials.password);
            let headers = credentials ? { authorization: "Basic " + authorization } : {};
            this.http.get("user", { headers: headers }).success(function (data) {
                self.user = data;

                if (data.username) {
                    self.user = data;

                    self.rootScope.globals = {
                        user: {
                            id: data.id,
                            username: data.username,
                            role: data.role,
                            authorization: authorization
                        }
                    };

                    self.http.defaults.headers.common["Authorization"] = "Basic " + authorization;
                    self.cookieStore.put("globals", self.rootScope.globals);

                    success(data);
                } else {
                }
            }).error(error);

        }
    }

    logout() {
        this.user = null;
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
}

angular.module(moduleAuthService, [ngResourceId]).service(AuthServiceId, AuthService);