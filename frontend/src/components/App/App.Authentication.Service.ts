/// <reference path="../app/App.Constants.ts" />
/// <reference path="../User/model/User.Model.ts" />
/// <reference path="../app/App.Resource.ts" />
/// <reference path="../app/App.Common.ts" />

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

    $inject = [$httpId, $rootScopeId, $cookiesId, $locationId, $windowId, UserResourceId, $injectorId];

    http;
    rootScope;
    cookies;
    location;
    window;
    userResource;
    injector;

    constructor($http, $rootScope, $cookies, $location, $window, UserResource, $injector) {
        this.http = $http;
        this.rootScope = $rootScope;
        this.cookies = $cookies;
        this.location = $location;
        this.window = $window;
        this.userResource = UserResource.resource;
        this.injector = $injector;
    }

    login(credentials, success, error) {
        let self = this;
        if (credentials) {

            let authorization = btoa(credentials.email + ":" + credentials.password);
            let headers = credentials ? { Authorization: "Basic " + authorization } : {};
            this.http.get("user", { headers: headers }).success(function (data) {
                if (data) {
                    self.rootScope.user = {
                        id: data.id,
                        role: data.role,
                        email: data.email,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        phone: data.phone,
                        language: data.language,
                        pictureLink: "http://localhost:8080/users/" + data.id + "/profile/picture",
                        smtp: data.smtp,
                        authorization: authorization
                    };

                    self.http.defaults.headers.common["Authorization"] = "Basic " + authorization;

                    let context = "leadplus." + self.window.location.hostname;

                    let date = new Date();
                    date = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
                    self.cookies.putObject("global", self.rootScope.user, { domain: "leadplus.localhost", path: "/" });
                    let test = self.cookies.getObject("global");
                    console.log("test: ", test);

                    self.rootScope.user.picture = data.profilePicture;
                    success(data);
                    self.injector.get("DashboardService");
                    self.rootScope.$broadcast("onTodosChange");
                } else {
                    console.log("username is null");
                }
            }).error(error);
        }
    }

    logout() {
        this.rootScope.user = null;
        this.cookies.remove("global", { domain: "leadplus.localhost", path: "/" });
        this.http.defaults.headers.common.Authorization = "Basic";
        // location.reload(true);
        /*
        let self = this;
        this.http.post("logout", {})
            .success(function () {
                // self.location.path("#/login");
                self.rootScope.$broadcast("$destroy");
                // location.reload();
            })
            .error(function (data) {
                // self.location.path("#/login");
                self.rootScope.$broadcast("$destroy");
                // location.reload();

            });
        */
    }

}

angular.module(moduleAuthService, [ngResourceId]).service(AuthServiceId, AuthService);