'use strict';

angular.module('app.lead', ['ngResource']).controller('LeadCtrl', LeadCtrl);

DataCtrl.$inject = ["Applications"];

function LeadCtrl(Applications) {

  var applications = Applications.all();
  console.log(applications);
  this.applications = [
    {'id': '1', 'type': 'mail', 'name': 'Andreas', 'phone': '408 555 1212', 'email': 'andreas.foitzik@live.com', 'need': '2 Container', 'transport': 'yes', 'dateofreceipt': 'today', 'processor':'Samuel Ilg'},
    {'id': '2', 'type': 'mail', 'name': 'Andreas', 'phone': '408 555 1212', 'email': 'andreas.foitzik@live.com', 'need': '2 Container', 'transport': 'yes', 'dateofreceipt': 'today', 'processor':'Samuel Ilg'},
    {'id': '3', 'type': 'mail', 'name': 'Andreas', 'phone': '408 555 1212', 'email': 'andreas.foitzik@live.com', 'need': '2 Container', 'transport': 'yes', 'dateofreceipt': 'today', 'processor':'Samuel Ilg'},
    {'id': '4', 'type': 'mail', 'name': 'Andreas', 'phone': '408 555 1212', 'email': 'andreas.foitzik@live.com', 'need': '2 Container', 'transport': 'yes', 'dateofreceipt': 'today', 'processor':'Samuel Ilg'}
  ];
  this.application    =    [{'id': '1', 'type': 'mail', 'name': 'Andreas', 'phone': '408 555 1212', 'email': 'andreas.foitzik@live.com', 'need': '2 Container', 'transport': 'yes', 'dateofreceipt': 'today', 'processor':'Samuel Ilg'}];
}

LeadCtrl.prototype.add = function(application) {
  this.type           = application.type;
  this.name           = application.name;
  this.phone          = application.phone;
  this.email          = application.email;
  this.need           = application.need;
  this.transport      = application.transport;
  this.dateofreceipt  = application.dateofreceipt;
  this.processor      = application.processor;
};

LeadCtrl.prototype.clear = function() {
  this.application.name           = "";
  this.application.phone          = "";
  this.application.email          = "";
  this.application.need           = "";
  this.application.transport      = "";
  this.application.dateofreceipt  = "";
  this.application.processor      = "";
};

LeadCtrl.prototype.edit = function(applicationId) {
  
  // get data via applicationId
  this.application.name           = "name";
  this.application.phone          = "phone";
  this.application.email          = "email";
  this.application.need           = "need";
  this.application.transport      = "transport";
  this.application.dateofreceipt  = "dateofreceipt";
  this.application.processor      = "processor";

};

LeadCtrl.prototype.remove = function(applicationId) {

  // send delete request an REST-API
};