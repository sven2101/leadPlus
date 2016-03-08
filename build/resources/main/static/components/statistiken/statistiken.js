'use strict';

angular.module('app.statistiken', ['ngResource']).controller('StatistikenCtrl', StatistikenCtrl);

function StatistikenCtrl() {
  this.name = "John Smith";
  this.contacts = [
    {type: 'phone', value: '408 555 1212'},
    {type: 'email', value: 'john.smith@example.org'} ];
}

StatistikenCtrl.prototype.greet = function() {
  alert(this.name);
};

StatistikenCtrl.prototype.addContact = function() {
  this.contacts.push({type: 'email', value: 'yourname@example.org'});
};

StatistikenCtrl.prototype.removeContact = function(contactToRemove) {
 var index = this.contacts.indexOf(contactToRemove);
  this.contacts.splice(index, 1);
};

StatistikenCtrl.prototype.clearContact = function(contact) {
  contact.type = 'phone';
  contact.value = '';
};