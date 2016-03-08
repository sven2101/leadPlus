'use strict';

angular.module('app.settings', ['ngResource']).controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl() {
  this.name = "John Smith";
  this.contacts = [
    {type: 'phone', value: '408 555 1212'},
    {type: 'email', value: 'john.smith@example.org'} ];
}

SettingsCtrl.prototype.greet = function() {
  alert(this.name);
};

SettingsCtrl.prototype.addContact = function() {
  this.contacts.push({type: 'email', value: 'yourname@example.org'});
};

SettingsCtrl.prototype.removeContact = function(contactToRemove) {
 var index = this.contacts.indexOf(contactToRemove);
  this.contacts.splice(index, 1);
};

SettingsCtrl.prototype.clearContact = function(contact) {
  contact.type = 'phone';
  contact.value = '';
};