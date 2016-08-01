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

class Auth {

    // $inject = ["$http", "$rootScope", "$cookieStore", "$location", "$window"];

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

    signup(user, success, error) {

        this.http.post("./api/rest/registrations", user, {
            headers: { "Content-Type": "application/json" }
        })
            .success(success)
            .error(error);
    }
    login(credentials, success, error) {

        if (credentials) {

            let authorization = btoa(credentials.username + ":" + credentials.password);
            let headers = credentials ? { authorization: "Basic " + authorization } : {};

            this.http.get("user", { headers: headers }).success(function (data) {

                if (data.username) {
                    this.rootScope.globals = {
                        currentUser: {
                            username: data.username,
                            role: data.role,
                            authorization: authorization
                        }
                    };

                    this.http.defaults.headers.common["Authorization"] = "Basic " + authorization;
                    this.cookieStore.put("globals", this.rootScope.globals);

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
angular.module("app.services", ["ngResource"]).factory("Auth", ["$http", "$rootScope", "$cookieStore", "$location", "$window", (http, $rootScope, $cookieStore, $location, $window) => new Auth(http, $rootScope, $cookieStore, $location, $window)]);