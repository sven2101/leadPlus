'use strict';

angular.module('app.signup', ['ngResource']).controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ["Users"];

function SignUpCtrl(Users) {

    this.register = function(User){
        console.log("Register: ", User);
        Users.save(User, function (){
            console.log("save succesfull ", User);
        });
    }
}