'use strict';

angular.module('app.dashboard', ['ngResource']).controller('DashboardCtrl', DashboardCtrl);


DashboardCtrl.$inject = ['toaster'];
function DashboardCtrl(toaster) {

    var vm = this;
    this.toaster =  toaster;
    this.selectedPeriod = 'Heute';
    this.leadsAmount = 100;
    this.offersAmount = 50;
    this.salesAmount = 20;
    this.profit = 320000;
    this.conversion = 6340000;
    this.conversionRate = 12;
    this.infoData = {};
    this.openLead = [{
        name: 'lead1',
        locked: false
    },
        {
            name: 'lead2',
            locked: false
        }];
    this.openOffer = [{
        name: 'offer1',
        locked: false
    },
        {
            name: 'offer2',
            locked: false
        }];
    this.sales = [{
        name: 'sale1',
        locked: true
    },
        {
            name: 'sale2',
            locked: true
        }];

    this.sortableOptions = {
        update: function (e, ui) {
            var target = ui.item.sortable.droptargetModel;
            var source = ui.item.sortable.sourceModel;
            if ((vm.openLead == target && vm.openOffer == source) || target == source) {
                ui.item.sortable.cancel();
            }
        },
        stop: function (e, ui) {
            var target = ui.item.sortable.droptargetModel;
            var source = ui.item.sortable.sourceModel;
            var item = ui.item.sortable.model;
            if (vm.sales == target && vm.openLead == source) {
                item.locked = true;
                vm.addLeadToSale(item);
            } else if (vm.sales == target && vm.openOffer == source) {
                item.locked = true;
                vm.addOfferToSale(item);
            }
            else if (vm.openOffer == target && vm.openLead == source) {
                vm.addLeadToOffer(item);
            }
            else {
                vm.toaster.pop('error', item.name, "Invalid action. Don't move inside or back!");
            }

        },
        connectWith: ".connectList",
        items: "li:not(.not-sortable)"
    };
}

DashboardCtrl.prototype.addLeadToSale = function (item) {
    this.toaster.pop('success', item.name, "Congratulation for your Sale!");
}
DashboardCtrl.prototype.addOfferToSale = function (item) {
    this.toaster.pop('success', item.name, "Congratulation for your Sale!");
}
DashboardCtrl.prototype.addLeadToOffer = function (item) {
    this.toaster.pop('success', item.name, "You have a new Offer!");
}

DashboardCtrl.prototype.saveDataToModal = function (data) {
    this.infoData = data;
}
DashboardCtrl.prototype.refreshData = function () {
    this.openLead = [{
        name: 'lead3',
        locked: false
    },
        {
            name: 'lead4',
            locked: false
        }];
    this.openOffer = [{
        name: 'offer5',
        locked: false
    },
        {
            name: 'offer6',
            locked: false
        }];
    this.sales = [{
        name: 'sale7',
        locked: true
    },
        {
            name: 'sale8',
            locked: true
        }];
}

DashboardCtrl.prototype.onPeriodChange = function (selectedPeriod) {
    this.selectedPeriod = selectedPeriod;
}
