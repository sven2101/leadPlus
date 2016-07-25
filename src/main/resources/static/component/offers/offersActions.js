/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

OffersCtrl.prototype.loadCurrentIdToModal = function (id) {
    this.currentCommentModalId = id;
};

OffersCtrl.prototype.addComment = function (id, source) {
    var vm = this;
    if (angular.isUndefined(this.comments[id])) {
        this.comments[id] = [];
    }
    if (source == 'table' && this.commentInput[id] != '' && !angular.isUndefined(this.commentInput[id])) {
        var comment = {
            commentText: this.commentInput[id],
            date: new Date(),
            process: this.processes[id],
            creator: this.user
        };
        this.processesService.addComment({id: id}, comment).$promise.then(function () {
            vm.comments[id].push(comment);
            vm.commentInput[id] = '';
        });
    }
    else if (source == 'modal' && this.commentModalInput[id] != '' && !angular.isUndefined(this.commentModalInput[id])) {
        var comment = {
            commentText: this.commentModalInput[id],
            date: new Date(),
            process: this.processes[id],
            creator: this.user
        };
        this.processesService.addComment({id: id}, comment).$promise.then(function () {
            vm.comments[id].push(comment);
            vm.commentModalInput[id] = '';
        });
    }
};
/*
Not in Use.
OffersCtrl.prototype.saveOffer = function () {
    var vm = this;
    if (angular.isUndefined(this.newOffer.prospect)) {
        this.newOffer.prospect = {
            title: ''
        }
    }
    this.newOffer.timestamp = this.filter('date')(new Date(), 'dd.MM.yyyy HH:mm');
    this.newOffer.vendor = {
        name: "***REMOVED***"
    };
    var process = {
        offer: this.newOffer,
        status: 'offer',
        processor: vm.user
    };
    this.processesService.addProcess(process).$promise.then(function (result) {
        vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_ADD_OFFER'));
        vm.rootScope.offersCount += 1;
        vm.addForm.$setPristine();
        vm.dtInstance.DataTable.row.add(result).draw();
    });
};
*/

OffersCtrl.prototype.clearNewOffer = function () {
    this.newOffer = {};
    this.newOffer.containerAmount = 1;
    this.newOffer.container = {
        priceNetto: 0
    }
};

OffersCtrl.prototype.createSale = function (process) {
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
            vm.processesService.setProcessor({id: process.id}, vm.user.username).$promise.then(function () {
                process.processor = vm.user;
                process.sale = sale;
                process.status = 'sale';
                vm.updateRow(process);
            });
        });
    });
};

OffersCtrl.prototype.followUp = function (process) {
    var vm = this;
    this.processesService.setStatus({id: process.id}, 'followup').$promise.then(function () {
        vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_FOLLOW_UP'));
        process.status = 'followup';
        vm.updateRow(process);
    });
};

OffersCtrl.prototype.closeOrOpenOffer = function (process) {
    var vm = this;
    if (process.status == "offer" || process.status == "followup") {
        this.processesService.setStatus({id: process.id}, 'closed').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_CLOSE_OFFER'));
            vm.rootScope.offersCount -= 1;
            process.status = 'closed';
            vm.updateRow(process);
        });
    } else if (process.status == "closed") {
        this.processesService.setStatus({id: process.id}, 'offer').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_OPEN_OFFER'));
            vm.rootScope.offersCount += 1;
            process.status = 'offer';
            vm.updateRow(process);
        });
    }
};

OffersCtrl.prototype.loadDataToModal = function (offer) {
    this.editProcess = offer;
};

OffersCtrl.prototype.saveEditedRow = function () {
    var vm = this;
    this.processesService.putOffer({id: this.editProcess.offer.id}, this.editProcess.offer).$promise.then(function () {
        vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_UPDATE_OFFER'));
        vm.editForm.$setPristine();
        vm.updateRow(vm.editProcess);
    });
};

OffersCtrl.prototype.deleteRow = function (process) {
    var vm = this;
    var offerId = process.offer.id;
    if (process.sale != null) {
        vm.toaster.pop('error', '', vm.translate.instant('COMMON_TOAST_FAILURE_DELETE_OFFER'));
        return;
    }
    process.status = 'closed';
    process.offer = null;
    this.processesService.putProcess({id: process.id}, process).$promise.then(function () {
        if (process.lead == null && process.sale == null) {
            vm.processesService.deleteProcess({id: process.id});
        }
        vm.processesService.deleteOffer({id: offerId}).$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_DELETE_OFFER'));
            vm.rootScope.offersCount -= 1;
            vm.dtInstance.DataTable.row(vm.rows[process.id]).remove().draw();
        });
    });
};

OffersCtrl.prototype.updateRow = function (process) {
    this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw();
    this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
}