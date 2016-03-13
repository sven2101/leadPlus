'use strict';

angular.module('app.login', ['ngResource']).controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$rootScope', '$location', '$http'];

function LoginCtrl() {
		  
}

LoginCtrl.login = function(credentials) {

	console.log("Credentials: ", credentials);
	
    var headers = credentials ? {authorization : "Basic " + btoa(credentials.username + ":" + credentials.password) } : {};

    $http.get('user', {headers : headers}).success(function(data) {
      if (data.name) {
        $rootScope.authenticated = true;
      } else {
        $rootScope.authenticated = false;
      }
      
      if ($rootScope.authenticated) {
          $location.path("/");
          $scope.error = false;
      } else {
          $location.path("/login");
          $scope.error = true;
      }
      
    }).error(function() {
      $rootScope.authenticated = false;
      
      if ($rootScope.authenticated) {
          $location.path("/");
          $scope.error = false;
      } else {
          $location.path("/login");
          $scope.error = true;
      }
      
    });
};

