/**
 * Created by Sven on 01.04.2016.
 */

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
    this.processesService.addProcess(process).$promise.then(function () {
        vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_ADD_OFFER'));
        vm.rootScope.offersCount += 1;
        vm.addForm.$setPristine();
        vm.refreshData();
    });
};

OffersCtrl.prototype.clearNewOffer = function () {
    this.newOffer = {};
    this.newOffer.containerAmount = 1;
    this.newOffer.container = {
        priceNetto: 0
    }
};

OffersCtrl.prototype.followUp = function (process) {
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
                vm.refreshData();
            });
        });
    });
};

OffersCtrl.prototype.closeOrOpenOffer = function (process) {
    var vm = this;
    if (process.status == "offer") {
        this.processesService.setStatus({id: process.id}, 'closed').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_CLOSE_OFFER'));
            vm.rootScope.offersCount -= 1;
            vm.refreshData();
        });
    } else if (process.status == "closed") {
        this.processesService.setStatus({id: process.id}, 'offer').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_OPEN_OFFER'));
            vm.rootScope.offersCount += 1;
            vm.refreshData();
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
        vm.refreshData();
    });
};

OffersCtrl.prototype.deleteRow = function (process) {
    var vm = this;
    var offerId = process.offer.id;
    if (process.status != 'sale')
        process.status = 'closed';
    process.offer = null;
    this.processesService.putProcess({id: process.id}, process).$promise.then(function () {
        if (process.lead == null && process.sale == null) {
            vm.processesService.deleteProcess({id: process.id});
        }
        vm.processesService.deleteOffer({id: offerId}).$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_DELETE_OFFER'));
            if (process.status == 'offer') {
                vm.rootScope.offersCount -= 1;
            }
            vm.refreshData();
        });
    });
};