/**
 * Created by Andreas on 17.05.2015.
 */
'use strict';

angular.module('app.services', ['ngResource'])
    .service('login', ['$resource', function ($resource) {
        return $resource('/login', {});
    }])
    .service('Users', ['$resource', function ($resource) {
        return $resource('api/rest/users', {});
    }])
    .service('logout', ['$resource', function ($resource) {
        return $resource('/logout', {});
    }])
    .service('Applications', ['$resource', function ($resource) {
        return $resource('/applica/api/rest/applications/:id', {id: '@id'}, {
            'stateOPEN': {
                method: 'GET',
                url: '/applica/api/rest/applications/state/OPEN',
                isArray: true
            },
            'stateFOLLOW': {
                method: 'GET',
                url: '/applica/api/rest/applications/state/FOLLOW',
                isArray: true
            },
            'stateCLOSED': {
                method: 'GET',
                url: '/applica/api/rest/applications/state/CLOSED',
                isArray: true
            },
            'all': {
                method: 'GET',
                url: '/applica/api/rest/applications/',
                isArray: true
            }
        });
    }])
    .service('Inquirers', ['$resource', function ($resource) {
        return $resource('api/rest/inquirers/:id', {id: '@id'});
    }])
    .service('Vendors', ['$resource', function ($resource) {
        return $resource('api/rest/vendors/:id', {id: '@id'});
    }])
    .service('Containers', ['$resource', function ($resource) {
        return $resource('api/rest/containers/:id', {id: '@id'});
    }])
    .service('Users', ['$resource', function ($resource) {
        return $resource('api/rest/users/:id', {id: '@id'});
    }]);