/**
 * Created by Sven on 18.03.2016.
 */
angular.module('app.profile', ['ngResource']).controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$rootScope', 'toaster', 'Profile'];

function ProfileCtrl($rootScope, toaster, Profile) {
	this.service = Profile;
	
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
		vm.toaster.pop('success', 'Success', "profil information saved");
	}, function () {		
		vm.user.language = vm.user.language;
		vm.toaster.pop('error', 'Error', "profil information not saved");
	});
};

ProfileCtrl.prototype.submitPasswordForm = function (user) {

    this.service.pw({username: user.username}, {newPassword: user.oldPassword, oldPassword: user.newPassword1}).$promise.then(function () {
		vm.toaster.pop('success', 'Success', "Password change successful.");
	}, function () {		
		vm.toaster.pop('error', 'Error', "Password change unsuccessful.");
	});
    
    this.passwordForm.$setPristine();
};