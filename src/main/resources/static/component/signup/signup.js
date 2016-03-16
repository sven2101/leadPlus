'use strict';

angular.module('app.signup', ['ngResource']).controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ['$location', '$http', '$scope', 'Auth' ,'toaster'];

function SignUpCtrl($location, $http, $scope, Auth,toaster) {
	var self 			= this;
	this.emailExists 	= false;
	this.usernameExists = false;
	
	this.uniqueEmail = function(email){

		var that = self;
		
		$http.post('./api/rest/registrations/unique/email', email, {
	        headers: {'Content-Type': "text/plain"}
	    }).success(function(data, status, headers, config) {
	    	$scope.emailExists = data;
	    	console.log("Email: ", $scope.emailExists);
	    }).error(function(data, status, headers, config) {
	    	console.log("Email: ", data);
	    });
	}
		
	this.uniqueUsername = function(username){
		
		var that = self;
		
		$http.post('./api/rest/registrations/unique/username', username, {
	        headers: {'Content-Type': "text/plain"}
	    }).success(function(data, status, headers, config) {
	    	$scope.usernameExists = data;
	    	console.log("User: ", $scope.usernameExists);
	    }).error(function(data, status, headers, config) {
	    	console.log("User: ", data);
	    });
	}
	
	this.signup = function(user){
		Auth.signup(user,
			        function() {
						$scope.user = "";
						toaster.pop('success', 'Congratulation', "Successful Sign Up. Login now.");
						$location.path('/login');
			        },
			        function(err) {
			        	$scope.user = "";
						toaster.pop('error', 'Error', "Unsuccessful Sign Up. Try again.");
			        }
	        	   );
	}
}