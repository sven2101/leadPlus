/// <reference path="../app/App.Constants.ts" />
/// <reference path="../User/model/User.Model.ts" />
/// <reference path="../app/App.Resource.ts" />
/// <reference path="../app/App.Common.ts" />
/// <reference path="../Login/model/Credentials.Model.ts" />

const AuthServiceId: string = "AuthService";


class AuthService {

    $inject = [$httpId, $rootScopeId, $locationId, $windowId, UserResourceId, $injectorId, $qId, TokenServiceId];

    http;
    rootScope;
    location;
    window;
    userResource;
    injector;

    $q;

    constructor($http, $rootScope, $location, $window, UserResource, $injector, $q, private TokenService: TokenService) {

        this.http = $http;
        this.$q = $q;
        this.rootScope = $rootScope;
        this.location = $location;
        this.window = $window;
        this.userResource = UserResource.resource;
        this.injector = $injector;
    }

    async login(credentials): Promise<void> {
        if (credentials) {
            let salt: string = credentials.email;
            let hashedPassword = hashPasswordPbkdf2(credentials.password, salt);
            await this.TokenService.setTokenByCredentials({ username: credentials.email, password: hashedPassword });
            let user = await this.userResource.getByEmail(credentials.email).$promise;

            if (user) {
                this.rootScope.user = {
                    id: user.id,
                    role: user.role,
                    email: user.email,
                    tenant: user.tenant,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone: user.phone,
                    language: user.language,
                    defaultVat: user.defaultVat,
                    smtpKey: encodeURIComponent(hashPasswordPbkdf2(hashedPassword, salt)),
                    picture: user.picture,
                    thumbnail: user.thumbnail
                };

                this.rootScope.tenant = {
                    tenantKey: credentials.tenant,
                    license: {
                        package: ["basic", "pro", "ultimate"],
                        term: "09.12.2020",
                        trial: false
                    }
                };
                this.TokenService.saveItemToLocalStorage(USER_STORAGE, this.rootScope.user);

                if (!hasLicense(this.rootScope.tenant.license, "basic")) {
                    alert("Lizenz abgelaufen am: " + this.rootScope.tenant.license.term);
                    this.rootScope.user = null;
                    this.rootScope.tenant = null;
                } else {

                    let date = new Date();
                    date = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());

                    this.rootScope.$broadcast(broadcastOnTodosChanged);
                    this.rootScope.$broadcast(broadcastUserNotificationShouldChange);
                }

            }
        }
    }

    logout(fullPageReload: boolean = true) {
        this.TokenService.logout(fullPageReload);
    }
    isLoggedIn(): boolean {
        return this.TokenService.isLoggedIn();
    }
    async awaitInit(): Promise<void> {
        await this.TokenService.awaitInit();
    }

}

angular.module(moduleAuthService, [ngResourceId]).service(AuthServiceId, AuthService);