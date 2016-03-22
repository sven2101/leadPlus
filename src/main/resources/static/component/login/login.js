'use strict';

angular.module('app.login', ['ngResource']).controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$location', 'Auth', '$scope','toaster'];

function LoginCtrl($location, Auth, $scope,toaster) {

	this.login = function(credentials) {
		Auth.login( credentials,
			        function(res) {
			            $location.path('/dashoard');
			        },
			        function(err) {
			        	$scope.credentials.password = "";
						toaster.pop('error','Error', "Please try again!");
			        }
		        );
	};
	
}
