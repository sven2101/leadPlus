'use strict';

angular.module('app.settings', ['ngResource']).controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$filter', 'toaster', 'Settings'];

function SettingsCtrl($filter, toaster, Settings) {
	this.service = Settings;
	
	var vm = this;
	this.users = [];
	this.service.query().$promise.then(function (result) {
		vm.users = result;
	});
	
	this.filter = $filter;
	this.toaster = toaster;
}

SettingsCtrl.prototype.activateUser = function (user) {
    var vm = this;
	this.service.activate({username: user.username}, {}).$promise.then(function () {
		vm.filter('filter')(vm.users, {id: user.id})[0].enabled = true;
		vm.toaster.pop('success', 'Success', "User freigeschalten.");
	}, function () {		
		vm.toaster.pop('error', 'Error', "User nicht freigeschalten.");
	}); 
};

SettingsCtrl.prototype.deactivateUser = function (id) {
    this.filter('filter')(this.users, {id: id})[0].access = false;
};

SettingsCtrl.prototype.saveRole = function (user) {
    
    var vm = this;
	this.service.setRole({username: user.username}, user.role).$promise.then(function () {
		//set rootScope role
	    vm.filter('filter')(vm.users, {id: user.id})[0].role = user.role;
		vm.toaster.pop('success', 'Success', "Set User Role Successful.");
	}, function () {		
		vm.toaster.pop('error', 'Error', "Set User Role Unsuccessful.");
	});
};