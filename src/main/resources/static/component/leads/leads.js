'use strict';

angular.module('app.leads', ['ngResource']).controller('LeadsCtrl', LeadsCtrl);

LeadsCtrl.$inject = ["Applications"];
function LeadsCtrl(Applications,$scope) {
    //var applications = Applications.all();
}

LeadsCtrl.addLeadToOffer = function (data,table,tableRowElement) {
    data.status = "Follow up";
    table.row(tableRowElement).data(data).draw();
    //window.alert("Anfrage von " + data.name + " mit der ID:" + data.id + " zu angebot hinzufügen!");
}

LeadsCtrl.closeLead = function (data,table,tableRowElement,cell) {
    data.status = "Geschlossen";
    cell.css('color', 'red');
    table.row(tableRowElement).data(data).draw();
    //window.alert("Anfrage von " + data.name + " mit der ID:" + data.id + " schließen!");
}

LeadsCtrl.editLead = function (data,table,tableRowElement) {
    data.name="new Name";
    table.row(tableRowElement).data(data).draw();
   //window.alert("Anfrage von " + data.name + " mit der ID:" + data.id + " editieren!");
}

LeadsCtrl.removeLead = function (data,tableRowElement) {
    //window.alert("Anfrage von " + data.name + " mit der ID:" + data.id + " löschen!");
    tableRowElement.remove();
}
