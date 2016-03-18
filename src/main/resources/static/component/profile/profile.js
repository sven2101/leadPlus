/**
 * Created by Sven on 18.03.2016.
 */
angular.module('app.profile', ['ngResource']).controller('ProfileCtrl', ProfileCtrl);
LeadsCtrl.$inject = ['$rootScope'];
function ProfileCtrl($rootScope) {
    this.email = $rootScope.globals.currentUser.username;
}

ProfileCtrl.prototype.submitProfilInfoForm = function() {
    alert("yeah!");
};
ProfileCtrl.prototype.submitPasswordForm = function() {
    alert("yeah2");
};