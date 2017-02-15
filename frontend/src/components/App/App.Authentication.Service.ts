/// <reference path="../app/App.Constants.ts" />
/// <reference path="../User/model/User.Model.ts" />
/// <reference path="../app/App.Resource.ts" />
/// <reference path="../app/App.Common.ts" />
/// <reference path="../Login/model/Credentials.Model.ts" />

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

    login(credentials): Promise<boolean> {

        let self = this;

        let defer = this.$q.defer();
        if (credentials) {
            let salt: string = credentials.email;
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
                        defaultVat: data.defaultVat,
                        smtpKey: encodeURIComponent(hashPasswordPbkdf2(hashedPassword, salt)),
                        authorization: authorization,
                        picture: data.picture,
                        thumbnail: data.thumbnail
                    };
                    self.rootScope.tenant = {
                        tenantKey: credentials.tenant,
                        license: {
                            package: ["basic", "pro", "ultimate"],
                            term: "09.12.2020",
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

                        self.cookies.putObject("user", self.rootScope.user, { domain: credentials.tenant, path: "/", expires: date });
                        self.cookies.putObject("tenant", self.rootScope.tenant, { domain: credentials.tenant, path: "/", expires: date });

                        self.rootScope.$broadcast(broadcastOnTodosChanged);
                        self.rootScope.$broadcast(broadcastUserNotificationShouldChange);
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
        this.cookies.remove("user", { domain: this.location.host(), path: "/" });
        this.cookies.remove("tenant", { domain: this.location.host(), path: "/" });
        this.http.defaults.headers.common.Authorization = "Basic";
        let port = this.location.port();
        port = ":" + port;
        if (port !== ":8080") {
            port = "";
        }
        window.open("https://" + this.location.host() + port, "_self");
        // window.open("https://" + this.location.host() + ":" + this.location.port() + "/logout.html", "_self");
    }

}

angular.module(moduleAuthService, [ngResourceId]).service(AuthServiceId, AuthService);