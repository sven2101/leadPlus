'use strict';

angular.module('app.dashboard', ['ngResource']);

angular.module('app.dashboard').controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = [];

function DashboardCtrl() {

    this.lead={};
    this.offer={};
    this.sale={};
    this.lead.name = "test";


}

