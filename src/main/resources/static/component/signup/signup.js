'use strict';

angular.module('app.signup', ['ngResource']).controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ['$rootScope', '$location', '$http', '$scope', 'Auth' ];

function SignUpCtrl($rootScope, $location, $http, $scope, Auth) {
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

		toastr.options = {
		  "closeButton": true,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-top-right",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
  		}
		
		Auth.signup(user,
			        function() {
						$scope.user = "";			
				    	toastr.success('Successful Sign Up. Login now.');
			        },
			        function(err) {
			        	$scope.user = "";	    	
						toastr.error('Unsuccessful Sign Up. Try again.');        	
			        }
	        	   );
	}
}