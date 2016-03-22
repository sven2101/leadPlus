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

ProfileCtrl.prototype.submitProfilInfoForm = function (update) {
	vm = this;
	console.log(updateUser);
	var updateUser = {"id":4,
			"username":"christian",
			"email":"christian@gmx.net",
			"password":"$2a$10$g8uLIG9qoYOsLnH9h0xltOtY3BXQtrTj6ijELxpeE4udAvOhfWlW6",
			"role":"admin",
			"profilPictureURL":null,
			"language":"en",
			"enabled":true,
			"accountNonLocked":true,
			"credentialsNonExpired":true,
			"accountNonExpired":true,
			"authorities":null
	};
	this.service.save({username: update.username}, {updateUser: updateUser}).$promise.then(function () {
		vm.rootScope.changeLanguage(user.language);
		vm.toaster.pop('success', 'Success', "profil information saved");
	}, function () {		
		vm.user.language = vm.user.language;
		vm.toaster.pop('error', 'Error', "profil information not saved");
	});
};

ProfileCtrl.prototype.submitPasswordForm = function () {
    this.oldPassword = '';
    this.newPassword1 = '';
    this.newPassword2 = '';

    this.service.update({username: user.username}, {user: user}).$promise.then(function () {
		vm.rootScope.changeLanguage(user.language);
		vm.toaster.pop('success', 'Success', "profil information saved");
	}, function () {		
		vm.user.language = vm.user.language;
		vm.toaster.pop('error', 'Error', "profil information not saved");
	});
    
    this.passwordForm.$setPristine();
    this.toaster.pop('success', 'Success', "New Password saved");
};