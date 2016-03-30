'use strict';

angular.module('app.dashboard', ['ngResource']).controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['toaster', 'Processes', 'Sales', '$filter', '$translate', '$rootScope', '$scope', 'orderByFilter'];

function DashboardCtrl(toaster, Processes, Sales, $filter, $translate, $rootScope, $scope, orderByFilter) {

    var vm = this;
    this.toaster = toaster;
    this.filter = $filter;
    this.translate = $translate;
    this.rootScope = $rootScope;
    this.processesService = Processes;
    this.orderByFilter = orderByFilter;
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
        vm.openLead = orderByFilter(result, ['-lead.timestamp']);
    });
    Processes.getProcessByOfferAndStatus({status: 'offer'}).$promise.then(function (result) {
        vm.openOffer = orderByFilter(result, ['-offer.timestamp']);
    });
    Sales.getLatestSales().$promise.then(function (result) {
        vm.sales = result;
    });

    this.sortableOptions = {
        update: function (e, ui) {
            var target = ui.item.sortable.droptargetModel;
            var source = ui.item.sortable.sourceModel;
            if ((vm.openLead == target && vm.openOffer == source) ||
                (vm.openLead == source && vm.sales == target) ||
                target == source) {
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

DashboardCtrl.prototype.addLeadToOffer = function (process) {
    var vm = this;
    var offer = {
        container: {
            name: process.lead.container.name,
            description: process.lead.container.description,
            priceNetto: process.lead.container.priceNetto
        },
        containerAmount: process.lead.containerAmount,
        deliveryAddress: process.lead.destination,
        price: (process.lead.containerAmount * process.lead.container.priceNetto),
        prospect: {
            company: process.lead.inquirer.company,
            email: process.lead.inquirer.email,
            firstname: process.lead.inquirer.firstname,
            lastname: process.lead.inquirer.lastname,
            phone: process.lead.inquirer.phone,
            title: process.lead.inquirer.title
        },
        timestamp: this.filter('date')(new Date(), 'dd.MM.yyyy HH:mm'),
        vendor: process.lead.vendor
    };
    this.processesService.addOffer({id: process.id}, offer).$promise.then(function () {
        vm.processesService.setStatus({id: process.id}, 'offer').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_NEW_OFFER'));
            vm.rootScope.leadsCount -= 1;
            vm.rootScope.offersCount += 1;
            process.offer = offer;
            vm.openOffer = vm.orderByFilter(vm.openOffer, ['-offer.timestamp']);
        });
    });
};
DashboardCtrl.prototype.addOfferToSale = function (item) {
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

