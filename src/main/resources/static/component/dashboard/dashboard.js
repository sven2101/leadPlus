'use strict';

angular.module('app.dashboard', ['ngResource']).controller('DashboardCtrl', DashboardCtrl);


DashboardCtrl.$inject = [];
function DashboardCtrl() {

    var vm = this;
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
            var item = ui.item.sortable.model;
            if (vm.sales == target) {
                vm.sales.sort(vm.SortByName)
                item.locked = true;
            }
            var fromIndex = ui.item.sortable.index;
            var toIndex = ui.item.sortable.dropindex;
        },
        connectWith: ".connectList",
        items: "li:not(.not-sortable)"
    };
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
