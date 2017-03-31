/// <reference path="../../Signup/controller/SignUp.Service.ts" />
/// <reference path="../../Signup/model/Signup.Model.ts" />

const SignupControllerId: string = "SignupController";

class SignupController {

    private $inject = [SignupServiceId, $locationId];

    signupService: SignupService;
    user: Signup;
    password1: string;
    password2: string;
    registerInProgress: boolean = false;

    constructor(SignupService, private $location) {
        this.signupService = SignupService;
        this.user = new Signup();
        this.checkForSubdomain();
    }

    checkForSubdomain(): void {
        let host: string = this.$location.host();
        let hostArray = host.split(".");
        if (hostArray[0].toLocaleLowerCase() === "leadplus" || hostArray[0].toLocaleLowerCase() === "boexli") {
            this.$location.path("/404");
        }
    }
    uniqueEmail(): void {
        this.signupService.uniqueEmail(this.user);
    }

    async signup(): Promise <void> {
        this.registerInProgress = true;
        this.user.password = this.password1;
        this.user.password2 = this.password2;
        await this.signupService.signup(this.user);
        this.registerInProgress = false;
    }
}

angular.module(moduleSignup, [ngResourceId]).controller(SignupControllerId, SignupController);