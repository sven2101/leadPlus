'use strict';

angular.module('app.settings', ['ngResource']).controller('SettingsCtrl', SettingsCtrl);
SettingsCtrl.$inject = ['$filter'];
function SettingsCtrl($filter) {
    this.filter = $filter;
    this.users = [{
        id: '1',
        surname: 'Sven',
        lastname: 'Jaschkewitz',
        username: 'sven2101',
        email: 'sven-jaschkewitz@get-net.eu',
        role: 'admin',
        access: true
    },
        {
            id: '2',
            surname: 'Andreas',
            lastname: 'Foitzik',
            username: 'foan1013',
            email: 'andreas-foitzik@get-net.eu',
            role: 'superadmin',
            access: false
        }];
}

SettingsCtrl.prototype.activateUser = function (id) {
    this.filter('filter')(this.users, {id: id})[0].access = true;
}

SettingsCtrl.prototype.deactivateUser = function (id) {
    this.filter('filter')(this.users, {id: id})[0].access = false;
}

SettingsCtrl.prototype.saveRole = function (id, role) {
    alert('set ' + role + " for " + id)
    this.filter('filter')(this.users, {id: id})[0].role = role;
}