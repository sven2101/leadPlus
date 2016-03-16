'use strict';

angular.module('app.offers', ['ngResource']).controller('OffersCtrl', OffersCtrl);

function OffersCtrl() {
  this.name = "John Smith";
  this.contacts = [
    {type: 'phone', value: '408 555 1212'},
    {type: 'email', value: 'john.smith@example.org'} ];
}

OffersCtrl.prototype.greet = function() {
  alert(this.name);
};

OffersCtrl.prototype.addContact = function() {
  this.contacts.push({type: 'email', value: 'yourname@example.org'});
};

OffersCtrl.prototype.removeContact = function(contactToRemove) {
 var index = this.contacts.indexOf(contactToRemove);
  this.contacts.splice(index, 1);
};

OffersCtrl.prototype.clearContact = function(contact) {
  contact.type = 'phone';
  contact.value = '';
};