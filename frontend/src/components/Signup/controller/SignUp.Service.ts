/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Signup/model/Signup.Model.ts" />
/// <reference path="../../app/App.Common.ts" />

const SignupServiceId: string = "SignupService";

class SignupService {

    private $inject = [$locationId, toasterId, $translateId, $qId, SignupResourceId, $rootScopeId];

    rootScope;
    signupResource;
    location;
    toaster;
    translate;
    q;
    usernameExist: boolean;
    emailExist: boolean;

    constructor($location, toaster, $translate, $q, SignupResource, $rootScope) {
        this.rootScope = $rootScope;
        this.location = $location;
        this.toaster = toaster;
        this.translate = $translate;
        this.q = $q;
        this.signupResource = SignupResource.resource;

        this.usernameExist = false;
        this.emailExist = false;
    }

    uniqueEmail(user: Signup): void {
        let self = this;
        user.email = user.email.toLowerCase();
        this.signupResource.uniqueEmail(user).$promise.then(function (data, headersGetter, status) {
            self.emailExist = data.validation;
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    }

    signup(user: Signup): Promise<User> {
        let defer = this.q.defer();
        let self = this;
        user.email = user.email.toLowerCase();
        let salt: string = user.email;
        user.password = hashPasswordPbkdf2(user.password, salt);
        user.password2 = hashPasswordPbkdf2(user.password2, salt);
        user.language = this.rootScope.language;

        this.signupResource.signup(user).$promise.then(function (createdUser: User) {
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            defer.resolve(createdUser);
            self.location.path("/login");
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
            defer.reject(null);
        });
        return defer.promise;
    }

    init(apiPassword: string, tenantKey: string) {
        this.signupResource.init(hashPasswordPbkdf2(apiPassword, "api@" + tenantKey));

    }
}

angular.module(moduleSignupService, [ngResourceId]).service(SignupServiceId, SignupService);

