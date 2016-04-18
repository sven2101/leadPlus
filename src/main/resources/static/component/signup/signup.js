'use strict';

angular.module('app.signup', ['ngResource']).controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ['$location', '$http', '$scope', 'Auth', 'toaster', '$translate'];

function SignUpCtrl($location, $http, $scope, Auth, toaster, $translate) {
    var self = this;
    this.emailExists = false;
    this.usernameExists = false;

    this.uniqueEmail = function (email) {

        var that = self;

        $http.post('./api/rest/registrations/unique/email', email, {
            headers: {'Content-Type': "text/plain"}
        }).success(function (data, status, headers, config) {
            $scope.emailExists = data;
        }).error(function (data, status, headers, config) {
        });
    };

    this.uniqueUsername = function (username) {

        var that = self;

        $http.post('./api/rest/registrations/unique/username', username, {
            headers: {'Content-Type': "text/plain"}
        }).success(function (data, status, headers, config) {
            $scope.usernameExists = data;
            console.log("User: ", $scope.usernameExists);
        }).error(function (data, status, headers, config) {
            console.log("User: ", data);
        });
    };

    this.signup = function (user) {
        Auth.signup(user,
            function () {
                $scope.user = "";
                toaster.pop('success', '', $translate.instant('SIGNUP_SUCCESS'));
                $location.path('/login');
            },
            function (err) {
                $scope.user = "";
                toaster.pop('error', '', $translate.instant('SIGNUP_ERROR'));
            }
        );
    }
}