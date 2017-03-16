/// <reference path="../../Signup/controller/SignUp.Service.ts" />
/// <reference path="../../Signup/model/Signup.Model.ts" />

const SignupControllerId: string = "SignupController";

class SignupController {

    private $inject = [SignupServiceId];

    signupService: SignupService;
    user: Signup;
    password1: string;
    password2: string;

    constructor(SignupService) {
        this.signupService = SignupService;
        this.user = new Signup();
    }

    uniqueEmail(): void {
        this.signupService.uniqueEmail(this.user);
    }

    signup(): void {
        this.user.password = this.password1;
        this.user.password2 = this.password2;
        this.signupService.signup(this.user);
    }
}

angular.module(moduleSignup, [ngResourceId]).controller(SignupControllerId, SignupController);