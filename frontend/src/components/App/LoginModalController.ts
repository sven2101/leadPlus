
const LoginModalControllerId: string = "LoginModalController";

class LoginModalController {

    $inject = [$translateId];

    constructor(private $translate) {

    }


}
angular.module(moduleLoginModal, []).controller(LoginModalControllerId, LoginModalController);
