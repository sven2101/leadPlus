/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

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
