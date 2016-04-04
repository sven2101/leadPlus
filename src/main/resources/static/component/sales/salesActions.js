/**
 * Created by Sven on 01.04.2016.
 */

SalesCtrl.prototype.loadCurrentIdToModal = function (id) {
    this.currentCommentModalId = id;
};

SalesCtrl.prototype.addComment = function (id, source) {
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

SalesCtrl.prototype.saveSale = function () {
    var vm = this;
    if (angular.isUndefined(this.newSale.customer)) {
        this.newSale.customer = {
            title: ''
        }
    }
    this.newSale.timestamp = this.filter('date')(new Date(), 'dd.MM.yyyy HH:mm');
    this.newSale.vendor = {
        name: "***REMOVED***"
    };
    var process = {
        sale: this.newSale,
        status: 'sale',
        processor: vm.user
    };
    this.processesService.addProcess(process).$promise.then(function () {
        vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_ADD_SALE'));
        vm.addForm.$setPristine();
        vm.refreshData();
    });
};

SalesCtrl.prototype.clearNewSale = function () {
    this.newSale = {};
    this.newSale.containerAmount = 1;
    this.newSale.container = {
        priceNetto: 0
    }
};

SalesCtrl.prototype.loadDataToModal = function (sale) {
    this.editProcess = sale;
};

SalesCtrl.prototype.saveEditedRow = function () {
    var vm = this;
    this.processesService.putSale({id: this.editProcess.sale.id}, this.editProcess.sale).$promise.then(function () {
        vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_UPDATE_SALE'));
        vm.editForm.$setPristine();
        vm.refreshData();
    });
};

SalesCtrl.prototype.deleteRow = function (process) {
    var vm = this;
    var saleId = process.sale.id;
    if (process.status != 'sale')
        process.status = 'closed';
    process.sale = null;
    this.processesService.putProcess({id: process.id}, process).$promise.then(function () {
        if (process.lead == null && process.sale == null) {
            vm.processesService.deleteProcess({id: process.id});
        }
        vm.processesService.deleteSale({id: saleId}).$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_DELETE_SALE'));
            vm.refreshData();
        });
    });
};