/// <reference path="../app/App.Constants.ts" />

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

    $inject = [$httpId, $rootScopeId, $cookieStoreId, $locationId, $windowId];

    http;
    rootScope;
    cookieStore;
    location;
    window;

    constructor($http, $rootScope, $cookieStore, $location, $window) {
        this.http = $http;
        this.rootScope = $rootScope;
        this.cookieStore = $cookieStore;
        this.location = $location;
        this.window = $window;
    }

    login(credentials, success, error) {
        let self = this;
        if (credentials) {

            let authorization = btoa(credentials.username + ":" + credentials.password);
            let headers = credentials ? { authorization: "Basic " + authorization } : {};
            this.http.get("user", { headers: headers }).success(function (data) {
                console.log(data);
                if (data.username) {

                    self.rootScope.globals = {
                        currentUser: {
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
        let self = this;
        this.rootScope.globals = {};
        console.log("Globals: ", this.rootScope.globals);
        this.cookieStore.remove("globals");
        this.http.defaults.headers.common.Authorization = "Basic";

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