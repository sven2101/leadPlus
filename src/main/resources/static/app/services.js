/**
 * Created by Andreas on 17.05.2015.
 */
'use strict';

angular.module('app.services', ['ngResource'])
    .service('Auth', function($http, $rootScope, $cookieStore, $location, $window){
	
	    return {
		        	
	        signup: function(user, success, error) {
	            
	            $http.post('./api/rest/registrations', user, {
	    	        headers: {'Content-Type': "application/json"}
	    	    })
	    	    .success(success)
	    	    .error(error);
	        },
	
	        login: function(credentials, success, error) {
	            
		        if(credentials) {
		        	
	    	    	var authorization = btoa(credentials.username + ":" + credentials.password);
		        	var headers = credentials ? {authorization : "Basic " + authorization} : {};
	
		    	    $http.get('user', {headers : headers}).success(function(data) {
		    	    		    	    	
			    	    if (data.username) {
			    	    			    	    	
			    	    	$rootScope.globals = {
			    	                currentUser: {
			    	                    username: data.username,
			    	                    authorization: authorization
			    	                }
			    	            };
			    	    	
			    	    	$http.defaults.headers.common['Authorization'] = 'Basic ' + authorization;
			                $cookieStore.put('globals', $rootScope.globals);
			                
			    	    	success(data);
			    	    } else {
			    	    }	    	      
		    	    }).error(error);
		        	
		        }
	        },
	
	        logout: function() {
	           		
	        	$rootScope.globals = {};
	        	console.log("Globals: ", $rootScope.globals);
	            $cookieStore.remove('globals');
	            $http.defaults.headers.common.Authorization = 'Basic';
	        	
				$http.post('logout', {})
					.success(function() {					    
						$location.path("#/login");
					  })
					 .error(function(data) {					    
						$location.path("#/login");
					  });
	       }
	    };
	})
	.service('Processes', ['$resource', function($resource) {
		return $resource('/application/api/rest/processes', null, {
				'query': { method:'GET' }
			});
	}]);