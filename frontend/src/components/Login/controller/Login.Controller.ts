/// <reference path="../../Login/controller/Login.Service.ts" />
/// <reference path="../../Login/model/Credentials.Model.ts" />

"use strict";

const LoginControllerId: string = "LoginController";

class LoginController {

    private $inject = [LoginServiceId, $locationId];

    loginService: LoginService;
    credentials: Credentials;

    constructor(LoginService: LoginService, private $location) {
        this.loginService = LoginService;
        this.credentials = new Credentials();
        this.checkForSubdomain();
    }

    checkForSubdomain(): void {
        let host: string = this.$location.host();
        let hostArray = host.split(".");
        if (hostArray[0].toLocaleLowerCase() === "leadplus" || hostArray[0].toLocaleLowerCase() === "boexli") {
            this.$location.path("/404");
        }
    }
    login() {
        this.credentials.tenant = this.$location.host();
        this.loginService.login(this.credentials);
    }
}

angular.module(moduleLogin, [ngResourceId]).controller(LoginControllerId, LoginController);