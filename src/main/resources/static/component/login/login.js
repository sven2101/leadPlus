'use strict';

angular.module('app.login', ['ngResource']).controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$location', 'Auth', '$scope', 'toaster', '$rootScope', '$translate'];

function LoginCtrl($location, Auth, $scope, toaster, $rootScope, $translate) {
    this.login = function (credentials) {
        if (credentials.username == 'apiuser') {
            $scope.credentials.password = "";
            toaster.pop('error', '', $translate.instant('LOGIN_ERROR'));
        }
        else {
            Auth.login(credentials,
                function (res) {
                    $location.path('/dashoard');
                    $rootScope.setUserDefaultLanguage();
                    $rootScope.loadLabels();
                },
                function (err) {
                    $scope.credentials.password = "";
                    toaster.pop('error', '', $translate.instant('LOGIN_ERROR'));
                }
            );
        }
    };

}
