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
		return $resource('/application/api/rest/processes/:id', {}, {
			getLead: 		{ url: '/application/api/rest/processes/:id/leads',		 method: 'GET' },
			addLead: 		{ url: '/application/api/rest/processes/:id/leads',	 	 method: 'POST'},
			putLead: 		{ url: '/application/api/rest/processes/:id/leads',	 	 method: 'PUT' },
			getOffer: 		{ url: '/application/api/rest/processes/:id/offers', 	 method: 'GET' },
			addOffer: 		{ url: '/application/api/rest/processes/:id/offers',	 method: 'POST'},
			putOffer: 		{ url: '/application/api/rest/processes/:id/offers',	 method: 'PUT' },
			getSale:		{ url: '/application/api/rest/processes/:id/sales', 	 method: 'GET' },
			addSale: 		{ url: '/application/api/rest/processes/:id/sales',	 	 method: 'POST'},
			putSale: 		{ url: '/application/api/rest/processes/:id/sales',	 	 method: 'PUT' },			
			getProcessor:	{ url: '/application/api/rest/processes/:id/processor',	 method: 'GET' },
			setProcessor:	{ url: '/application/api/rest/processes/:id/processor',	 method: 'PUT' },
			getComments: 	{ url: '/application/api/rest/processes/:id/comments',	 method: 'GET', isArray:true },
			addComment: 	{ url: '/application/api/rest/processes/:id/comments',	 method: 'POST'},
			getStatus: 		{ url: '/application/api/rest/processes/:id/:status', 	 method: 'GET' },
			setStatus: 		{ url: '/application/api/rest/processes/:id/status',	 method: 'PUT' },
			getByStatus: 	{ url: '/application/api/rest/processes/status/:status', method: 'GET', isArray:true }
		});
	}])
	.service('Leads', ['$resource', function($resource) {
		return $resource('/application/api/rest/processes/leads/:id', {}, {

		});
	}])
	.service('Offers', ['$resource', function($resource) {
		return $resource('/application/api/rest/processes/offers/:id', null, {

		});
	}])
	.service('Sales', ['$resource', function($resource) {
		return $resource('/application/api/rest/processes/sales/:id', null, {

		});
	}])
	.service('Statistics', ['$resource', function($resource) {
		return $resource('/application/api/rest/processes/statistics/:id', null, {
			leads: 	{ url: '/application/api/rest/processes/statitstics/leads',  method: 'POST' },
			offers: { url: '/application/api/rest/processes/statitstics/offers', method: 'POST' },
			sales: 	{ url: '/application/api/rest/processes/statitstics/sales',  method: 'POST' }
		});
	}]);

/*
GET /api/rest/processes
GET /api/rest/processes/{id}
GET /api/rest/processes/state/{status}
PUT /api/rest/processes/{id}
DELETE /api/rest/processes/{id}
POST /api/rest/processes (Single)
POST /api/rest/processes (Array)
GET /api/rest/processes/status/{status}/{kind}/
GET /api/rest/processes/{processId}/leads
GET /api/rest/processes/{processId}/offers
GET /api/rest/processes/{processId}/sales


*/