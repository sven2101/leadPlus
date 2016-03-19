/**
 * Created by Sven on 18.03.2016.
 */
angular.module('app.profile', ['ngResource']).controller('ProfileCtrl', ProfileCtrl);
ProfileCtrl.$inject = ['$rootScope', 'toaster'];
function ProfileCtrl($rootScope, toaster) {
    this.toaster = toaster;
    this.email = $rootScope.globals.currentUser.username;
    this.rootScope = $rootScope;
    this.oldPassword = '';
    this.newPassword1 = '';
    this.newPassword2 = '';
    this.defaultLanguage = $rootScope.language;
}

ProfileCtrl.prototype.submitProfilInfoForm = function () {
    this.rootScope.changeLanguage(this.defaultLanguage);
    this.toaster.pop('success', 'Success', "profil information saved");
};
ProfileCtrl.prototype.submitPasswordForm = function () {
    this.oldPassword = '';
    this.newPassword1 = '';
    this.newPassword2 = '';
    this.passwordForm.$setPristine();
    this.toaster.pop('success', 'Success', "New Password saved");
};