'use strict';

angular.module('app.dashboard', ['ngResource']).controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['toaster', 'Processes'];

function DashboardCtrl(toaster, Processes) {

    var vm = this;
    this.toaster = toaster;
    this.commentModalInput = '';
    this.comments = {};
    this.leadsAmount = 100;
    this.offersAmount = 50;
    this.salesAmount = 20;
    this.profit = 320000;
    this.turnover = 6340000;
    this.conversionRate = 12;
    this.infoData = {};
    Processes.getProcessByLeadAndStatus({status: 'open'}).$promise.then(function (result) {
        vm.openLead = result;
    });
    Processes.getProcessByOfferAndStatus({status: 'offer'}).$promise.then(function (result) {
        vm.openOffer = result;
    });
    Processes.getProcessBySaleAndStatus({status: 'sale'}).$promise.then(function (result) {
        vm.sales = result;
    });
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
            if (vm.sales == target && vm.openOffer == source) {
                vm.addOfferToSale(item);
            }
            else if (vm.openOffer == target && vm.openLead == source) {
                vm.addLeadToOffer(item);
            }
        },
        connectWith: ".connectList",
        items: "li:not(.not-sortable)"
    };
}

DashboardCtrl.prototype.addLeadToSale = function (item) {
    this.toaster.pop('success', item.name, "Congratulation for your Sale!");
};
DashboardCtrl.prototype.addOfferToSale = function (item) {
    this.toaster.pop('success', item.name, "Congratulation for your Sale!");
};
DashboardCtrl.prototype.addLeadToOffer = function (item) {
    this.toaster.pop('success', item.name, "You have a new Offer!");
};

DashboardCtrl.prototype.saveDataToModal = function (data) {
    this.infoData = data;
};
DashboardCtrl.prototype.refreshData = function () {
    this.openLead = [{
        id: '1',
        name: 'lead3',
        locked: false
    },
        {
            id: '2',
            name: 'lead4',
            locked: false
        }];
    this.openOffer = [{
        id: '3',
        name: 'offer5',
        locked: false
    },
        {
            id: '4',
            name: 'offer6',
            locked: false
        }];
    this.sales = [{
        id: '5',
        name: 'sale7',
        locked: true
    },
        {
            id: '5',
            name: 'sale8',
            locked: true
        }];
};

DashboardCtrl.prototype.addComment = function (id) {
    if (this.commentModalInput != '' && !angular.isUndefined(this.commentModalInput)) {
        if (angular.isUndefined(this.comments[id])) {
            this.comments[id] = [];
        }
        this.comments[id].push({from: "Sven", comment: this.commentModalInput, date: new Date()});
        this.commentModalInput = '';
    }
};

