'use strict';

angular.module('app.dashboard', ['ngResource']).controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['toaster', 'Processes', '$filter', '$translate', '$rootScope', 'orderByFilter', '$scope', '$interval', 'Profile'];

function DashboardCtrl(toaster, Processes, $filter, $translate, $rootScope, orderByFilter, $scope, $interval, Profile) {

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
    this.infoType = '';
    this.infoProcess = {};
    this.infoComments = [];
    Processes.getProcessByLeadAndStatus({status: 'open'}).$promise.then(function (result) {
        vm.openLead = orderByFilter(result, ['-lead.timestamp']);
    });
    Processes.getProcessByOfferAndStatus({status: 'offer'}).$promise.then(function (result) {
        vm.openOffer = orderByFilter(result, ['-offer.timestamp']);
    });
    Processes.getLatestSales().$promise.then(function (result) {
        vm.sales = result;
    });

    this.user = {};
    Profile.get({username: $rootScope.globals.currentUser.username}).$promise.then(function (result) {
        vm.user = result;
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

    var stop;
    $scope.$on('$destroy', function () {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    });
    stop = $interval(function () {
        vm.refreshData();
    }.bind(this), 200000);
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
        offerPrice: (process.lead.containerAmount * process.lead.container.priceNetto),
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
            vm.processesService.setProcessor({id: process.id}, vm.user.username).$promise.then(function () {
                process.processor = vm.user;
            });
            process.offer = offer;
            vm.openOffer = vm.orderByFilter(vm.openOffer, ['-offer.timestamp']);
        });
    });
};
DashboardCtrl.prototype.addOfferToSale = function (process) {
    var vm = this;
    var sale = {
        container: {
            name: process.offer.container.name,
            description: process.offer.container.description,
            priceNetto: process.offer.container.priceNetto
        },
        containerAmount: process.offer.containerAmount,
        transport: process.offer.deliveryAddress,
        customer: {
            company: process.offer.prospect.company,
            email: process.offer.prospect.email,
            firstname: process.offer.prospect.firstname,
            lastname: process.offer.prospect.lastname,
            phone: process.offer.prospect.phone,
            title: process.offer.prospect.title
        },
        saleProfit: 0,
        saleReturn: process.offer.offerPrice,
        timestamp: this.filter('date')(new Date(), 'dd.MM.yyyy HH:mm'),
        vendor: process.offer.vendor
    };
    this.processesService.addSale({id: process.id}, sale).$promise.then(function () {
        vm.processesService.setStatus({id: process.id}, 'sale').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_NEW_SALE'));
            vm.rootScope.offersCount -= 1;
            process.sale = sale;
            vm.sales = vm.orderByFilter(vm.sales, ['-sale.timestamp']);
        });
    });
};

DashboardCtrl.prototype.saveDataToModal = function (info, type, process) {
    this.infoData = info;
    this.infoType = type;
    this.infoProcess = process;
    var vm = this;
    this.processesService.getComments({id: process.id}).$promise.then(function (result) {
        vm.infoComments = [];
        for (var comment in result) {
            if (comment == '$promise')
                break;
            vm.infoComments.push({
                commentText: result[comment].commentText,
                date: result[comment].date,
                creator: result[comment].creator
            });
        }
    });
};
DashboardCtrl.prototype.refreshData = function () {
    var vm = this;
    this.processesService.getProcessByLeadAndStatus({status: 'open'}).$promise.then(function (result) {
        vm.openLead = vm.orderByFilter(result, ['-lead.timestamp']);
    });
    this.processesService.getProcessByOfferAndStatus({status: 'offer'}).$promise.then(function (result) {
        vm.openOffer = vm.orderByFilter(result, ['-offer.timestamp']);
    });
    this.processesService.getLatestSales().$promise.then(function (result) {
        vm.sales = result;
    });
};

DashboardCtrl.prototype.addComment = function (process) {
    var vm = this;
    if (angular.isUndefined(this.infoComments)) {
        this.infoComments = [];
    }
    if (this.commentModalInput != '' && !angular.isUndefined(this.commentModalInput)) {
        var comment = {
            commentText: this.commentModalInput,
            date: new Date(),
            process: process,
            creator: this.user
        };
        this.processesService.addComment({id: process.id}, comment).$promise.then(function () {
            vm.infoComments.push(comment);
            vm.commentModalInput = '';
        });
    }
};

