'use strict';

angular.module('app.login', ['ngResource']).controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$location', 'Auth', '$scope', 'toaster', '$rootScope'];

function LoginCtrl($location, Auth, $scope, toaster, $rootScope) {

    this.login = function (credentials) {
        Auth.login(credentials,
            function (res) {
                $location.path('/dashoard');
                $rootScope.setUserDefaultLanguage();
            },
            function (err) {
                $scope.credentials.password = "";
                toaster.pop('error', 'Error', "Please try again!");
            }
        );
    };

}
