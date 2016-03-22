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
			    	                    role: data.role,
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
			getByStatus: 	{ url: '/application/api/rest/processes/status/:status', method: 'GET', isArray:true },
			getProcessByLead: 	{ url: '/application/api/rest/processes/leads', 	method: 'GET', isArray:true },
			getProcessByOffer: 	{ url: '/application/api/rest/processes/offers', 	method: 'GET', isArray:true },
			getProcessBySale: 	{ url: '/application/api/rest/processes/sales', 	method: 'GET', isArray:true },
			getProcessByLeadAndStatus: 		{ url: '/application/api/rest/processes/state/:status/leads', 	method: 'GET', isArray:true },
			getProcessByOfferAndStatus: 	{ url: '/application/api/rest/processes/state/:status/offers', 	method: 'GET', isArray:true },
			getProcessBySaleAndStatus: 		{ url: '/application/api/rest/processes/state/:status/sales', 	method: 'GET', isArray:true },

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
		return $resource('/application/api/rest/processes/statistics',{}, {
			getLeadStatistics: 		{ url: '/application/api/rest/processes/statistics/leads',  	method: 'POST', isArray:true },
			getOffersStatistics: 	{ url: '/application/api/rest/processes/statistics/offers', 	method: 'POST', isArray:true },
			getSalesStatistics: 	{ url: '/application/api/rest/processes/statistics/sales',  	method: 'POST', isArray:true }, 
			getProfitStatistics: 	{ url: '/application/api/rest/processes/statistics/profits',  	method: 'POST', isArray:true }, 
			getReturnStatistics: 	{ url: '/application/api/rest/processes/statistics/returns',  	method: 'POST', isArray:true }			
		});
	}])
	.service('Profile', ['$resource', function($resource) {
		return $resource('/application/users/:username', {});
	}])
	.service('Settings', ['$resource', function($resource) {
		return $resource('/application/users/:username', {username:'@Username'}, {
			activate: 	{ url: '/application/users/:username/activate',  	method: 'PUT' },
			setRole: 	{ url: '/application/users/:username/role', 		method: 'POST' },
			getSalesStatistics: 	{ url: '/application/api/rest/processes/statitstics/sales',  	method: 'POST' }, 
			getProfitStatistics: 	{ url: '/application/api/rest/processes/statitstics/profits',  	method: 'POST' }, 
			getReturnStatistics: 	{ url: '/application/api/rest/processes/statitstics/returns',  	method: 'POST' }			
		});
	}]);
