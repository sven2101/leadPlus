/// <reference path="../app/App.Constants.ts" />
/// <reference path="../User/model/User.Model.ts" />
/// <reference path="../app/App.Resource.ts" />
/// <reference path="../app/App.Common.ts" />
/// <reference path="../Common/model/Promise.Interface.ts" />
/// <reference path="../Login/model/Credentials.Model.ts" />


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



    $inject = [$httpId, $rootScopeId, $cookiesId, $locationId, $windowId, UserResourceId, $injectorId, $qId];



    http;
    rootScope;
    cookies;
    location;
    window;
    userResource;
    injector;

    $q;


    constructor($http, $rootScope, $cookies, $location, $window, UserResource, $injector, $q) {

        this.http = $http;
        this.$q = $q;
        this.rootScope = $rootScope;
        this.cookies = $cookies;
        this.location = $location;
        this.window = $window;
        this.userResource = UserResource.resource;
        this.injector = $injector;
    }

    login(credentials): IPromise<boolean> {

        let self = this;

        let defer = this.$q.defer();
        if (credentials) {
            // let salt: string = this.rootScope.globals.user.email;
            let salt = "test";
            let hashedPassword = hashPasswordPbkdf2(credentials.password, salt);
            let authorization = btoa(credentials.email + ":" + hashedPassword);
            let header = credentials ? { Authorization: "Basic " + authorization } : {};

            this.http.defaults.headers.common["Authorization"] = "Basic " + authorization;
            this.http.defaults.headers.common["X-TenantID"] = credentials.tenant;

            this.http.get("user").then(function (response) {
                let data = response.data;
                if (data) {
                    self.rootScope.user = {
                        id: data.id,
                        role: data.role,
                        email: data.email,
                        tenant: data.tenant,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        phone: data.phone,
                        language: data.language,
                        smtpKey: encodeURIComponent(hashPasswordPbkdf2(hashedPassword, salt)),
                        authorization: authorization,
                        picture: data.picture
                    };
                    self.rootScope.tenant = {
                        tenantKey: credentials.tenant,
                        license: {
                            package: ["basic", "pro"],
                            term: "09.12.2017",
                            trial: false
                        }
                    };

                    if (!hasLicense(self.rootScope.tenant.license, "basic")) {
                        alert("Lizenz abgelaufen am: " + self.rootScope.tenant.license.term);
                        self.rootScope.user = null;
                        self.rootScope.tenant = null;
                        defer.reject(false);
                    } else {
                        self.http.defaults.headers.common["Authorization"] = "Basic " + authorization;
                        self.http.defaults.headers.common["X-TenantID"] = credentials.tenant;


                        let date = new Date();
                        date = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
                        self.cookies.putObject("user", self.rootScope.user, { domain: "leadplus.localhost", path: "/", expires: date });
                        self.cookies.putObject("tenant", self.rootScope.tenant, { domain: "leadplus.localhost", path: "/", expires: date });

                        self.rootScope.user.picture = data.profilePicture;
                        self.injector.get("DashboardService");
                        self.rootScope.$broadcast("onTodosChange");
                        defer.resolve(true);
                    }

                } else {
                    defer.reject(false);
                }
            }, (function (error) {
                defer.reject(false);
            }));
        } else {
            defer.reject(false);
        }
        return defer.promise;
    }

    logout() {
        this.cookies.remove("user", { domain: "leadplus.localhost", path: "/" });
        this.cookies.remove("tenant", { domain: "leadplus.localhost", path: "/" });
        this.http.defaults.headers.common.Authorization = "Basic";
        window.open("/logout.html", "_self");
    }

}

angular.module(moduleAuthService, [ngResourceId]).service(AuthServiceId, AuthService);