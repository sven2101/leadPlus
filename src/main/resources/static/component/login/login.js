'use strict';

angular.module('app.login', ['ngResource']).controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$rootScope', '$location', 'Auth', '$scope'];

function LoginCtrl($rootScope, $location, Auth, $scope) {

	this.login = function(credentials) {
		Auth.login( credentials,
			        function(res) {
			            $location.path('/dashoard');
			        },
			        function(err) {
			        	$scope.credentials.password = "";
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
			        	
			        	toastr.error('Login faild, please try again.');        	
			        }
		        );
	};
	
}
