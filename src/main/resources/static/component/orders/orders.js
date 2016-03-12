'use strict';

angular.module('app.orders', ['ngResource']).controller('OrdersCtrl', OrdersCtrl);

function OrdersCtrl() {
  this.name = "John Smith";
  this.contacts = [
    {type: 'phone', value: '408 555 1212'},
    {type: 'email', value: 'john.smith@example.org'} ];
}

OrdersCtrl.prototype.greet = function() {
  alert(this.name);
};

OrdersCtrl.prototype.addContact = function() {
  this.contacts.push({type: 'email', value: 'yourname@example.org'});
};

OrdersCtrl.prototype.removeContact = function(contactToRemove) {
 var index = this.contacts.indexOf(contactToRemove);
  this.contacts.splice(index, 1);
};

OrdersCtrl.prototype.clearContact = function(contact) {
  contact.type = 'phone';
  contact.value = '';
};