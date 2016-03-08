'use strict';

angular.module('app.login', ['ngResource']).controller('LoginCtrl', LoginCtrl);

function LoginCtrl() {
}

LoginCtrl.prototype.login = function(login) {
    console.log("Username: ", login.username);   
    console.log("Password: ", login.password);
};