'use strict';

angular.module('app.logout', ['ngResource']).controller('LogoutCtrl', LogoutCtrl);

function LogoutCtrl() {
  this.name = "John Smith";
  this.contacts = [
    {type: 'phone', value: '408 555 1212'},
    {type: 'email', value: 'john.smith@example.org'} ];
}

LogoutCtrl.prototype.greet = function() {
  alert(this.name);
};

LogoutCtrl.prototype.addContact = function() {
  this.contacts.push({type: 'email', value: 'yourname@example.org'});
};

LogoutCtrl.prototype.removeContact = function(contactToRemove) {
 var index = this.contacts.indexOf(contactToRemove);
  this.contacts.splice(index, 1);
};

LogoutCtrl.prototype.clearContact = function(contact) {
  contact.type = 'phone';
  contact.value = '';
};