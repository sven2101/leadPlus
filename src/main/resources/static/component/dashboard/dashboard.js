'use strict';

angular.module('app.dashboard', ['ngResource']);

angular.module('app.dashboard').controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = [];

function DashboardCtrl() {

    var anfrage = {
        "inquirer":{
            "firstname": "Andreas",
            "lastname": "Foitzik",
            "company": "getnet",
            "email": "andreas.foitzik@get-net.eu"
        },
        "vendor":{
            "name": "Breuniger",
            "phone": "08239"
        },
        "container":[
            {
                "name": "Seecontainer",
                "description": "F�r hohe See geeignet",
                "price": 30.00
            }
        ],
        "containerAmount": 30,
        "transport": true,
        "destination": "Berlin",
        "compareableProposal": "yes",
        "message": "Hallo Herr Ilg",
        "status": "OPEN"
    };
/*
    Applications.save(anfrage, function (){
        console.log("save succesfull");
    });

    var test = Applications.get({id: 1}, function(){
        console.log(test);
    });

    this.applicationsStateOPEN      = Applications.stateOPEN();
    this.applicationStateOPENAmount = this.applicationsStateOPEN.length;
    console.log("L�nge: ", this.applicationsStateOPEN);
    console.log("L�nge: ", this.applicationsStateOPEN.length);

    this.applicationsStateFOLLOW    = Applications.stateFOLLOW();
    this.applicationStateFOLLOWAmount = this.applicationsStateFOLLOW.length;

    this.applicationsStateCLOSED    = Applications.stateCLOSED();
    this.applicationStateCLOSEDAmount = this.applicationsStateCLOSED.length;

    this.space                      = "7";
    this.application_amount         = "50";
    this.application_amount_follow  = "20";
    this.application_amount_open    = "30";
    this.profit                     = "10.000";
    this.revenue                    = "100.000";
    this.convertionrate             = "10";

    this.edit = function(applicationId) {
        console.log("Application ID: ", applicationId);

        var application = Applications.get({id: applicationId}, function(){
            console.log(test);
        });
    };
    
    */
}



DashboardCtrl.prototype.changeSpace = function(space) {
  alert(space);
};

DashboardCtrl.prototype.addContact = function() {
  this.contacts.push({type: 'email', value: 'yourname@example.org'});
};

DashboardCtrl.prototype.removeContact = function(contactToRemove) {
 var index = this.contacts.indexOf(contactToRemove);
  this.contacts.splice(index, 1);
};

DashboardCtrl.prototype.clearContact = function(contact) {
  contact.type = 'phone';
  contact.value = '';
};
