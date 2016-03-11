'use strict';

angular.module('app.sales', ['ngResource']).controller('SalesCtrl', SalesCtrl);

function SalesCtrl() {
  this.name = "John Smith";
  this.contacts = [
    {type: 'phone', value: '408 555 1212'},
    {type: 'email', value: 'john.smith@example.org'} ];
}

SalesCtrl.prototype.greet = function() {
  alert(this.name);
};

SalesCtrl.prototype.addContact = function() {
  this.contacts.push({type: 'email', value: 'yourname@example.org'});
};

SalesCtrl.prototype.removeContact = function(contactToRemove) {
 var index = this.contacts.indexOf(contactToRemove);
  this.contacts.splice(index, 1);
};

SalesCtrl.prototype.clearContact = function(contact) {
  contact.type = 'phone';
  contact.value = '';
};