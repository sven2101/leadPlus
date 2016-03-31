'use strict';

angular.module('app.settings', ['ngResource']).controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$filter', 'toaster', 'Settings', '$rootScope'];

function SettingsCtrl($filter, toaster, Settings, $rootScope) {
    var vm = this;
    this.service = Settings;
    this.rootScope = $rootScope;
    this.users = [];
    this.roleSelection = {};
    this.service.query().$promise.then(function (result) {
        vm.users = result;
        for (var user in result) {
            if (user == '$promise')
                break;
            vm.roleSelection[result[user].id] = result[user].role;
        }
    });
    this.filter = $filter;
    this.toaster = toaster;
}

SettingsCtrl.prototype.activateUser = function (user) {
    var vm = this;
    this.service.activate({username: user.username}, true).$promise.then(function () {
        vm.filter('filter')(vm.users, {id: user.id})[0].enabled = true;
        vm.toaster.pop('success', 'Success', "User freigeschalten.");
    }, function () {
        vm.toaster.pop('error', 'Error', "User nicht freigeschalten.");
    });
};

SettingsCtrl.prototype.deactivateUser = function (user) {
    var vm = this;
    this.service.activate({username: user.username}, false).$promise.then(function () {
        vm.filter('filter')(vm.users, {id: user.id})[0].enabled = false;
        vm.toaster.pop('success', 'Success', "User deaktiviert.");
    }, function () {
        vm.toaster.pop('error', 'Error', "User nicht deaktiviert.");
    });
};
SettingsCtrl.prototype.hasRight = function (user) {
    if (user.username == this.rootScope.globals.currentUser.username
        || (user.role == this.rootScope.globals.currentUser.role)
        || this.rootScope.globals.currentUser.role == 'user') {
        return true;
    } else {
        return false;
    }
}

SettingsCtrl.prototype.saveRole = function (user) {

    var vm = this;
    user.role = this.roleSelection[user.id];
    this.service.setRole({username: user.username}, user.role).$promise.then(function () {
        //set rootScope role
        vm.filter('filter')(vm.users, {id: user.id})[0].role = user.role;
        vm.toaster.pop('success', 'Success', "Set User Role Successful.");
    }, function () {
        vm.toaster.pop('error', 'Error', "Set User Role Unsuccessful.");
    });
};

