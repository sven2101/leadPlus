/**
 * Created by Sven on 18.03.2016.
 */
angular.module('app.profile', ['ngResource']).controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$rootScope', 'toaster', 'Profile', '$translate'];

function ProfileCtrl($rootScope, toaster, Profile, $translate) {
    this.service = Profile;
    this.translate = $translate;
    vm = this;
    this.user = {};
    this.service.get({username: $rootScope.globals.currentUser.username}).$promise.then(function (result) {
        vm.user = result;
    });

    this.toaster = toaster;

    this.rootScope = $rootScope;
    this.oldPassword = '';
    this.newPassword1 = '';
    this.newPassword2 = '';
}

ProfileCtrl.prototype.submitProfilInfoForm = function (user) {
    vm = this;
    console.log(user);

    this.service.update({username: user.username}, user).$promise.then(function () {
        vm.rootScope.changeLanguage(user.language);
        vm.toaster.pop('success', '', vm.translate.instant('PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS'));
    }, function () {
        vm.user.language = vm.user.language;
        vm.toaster.pop('error', '', vm.translate.instant('PROFILE_TOAST_PROFILE_INFORMATION_ERROR'));
    });
};

ProfileCtrl.prototype.submitPasswordForm = function (user) {
    var vm = this;
    this.service.pw({username: user.username}, {
        newPassword: this.newPassword1,
        oldPassword: this.oldPassword
    }).$promise.then(function () {
        vm.toaster.pop('success', '', vm.translate.instant('PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS'));
        vm.passwordForm.$setPristine();
        vm.oldPassword = '';
        vm.newPassword1 = '';
        vm.newPassword2 = '';
    }, function () {
        vm.toaster.pop('error', '', vm.translate.instant('PROFILE_TOAST_PASSWORD_CHANGE_ERROR'));
    });
};