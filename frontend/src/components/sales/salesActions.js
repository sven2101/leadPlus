/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH. All rights reserved.
 * 
 * NOTICE: All information contained herein is, and remains the property of
 * Eviarc GmbH and its suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to Eviarc GmbH, and are protected
 * by trade secret or copyright law. Dissemination of this information or
 * reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Eviarc GmbH.
 ******************************************************************************/

SalesCtrl.prototype.loadCurrentIdToModal = function (id) {
	this.currentCommentModalId = id;
};

SalesCtrl.prototype.addComment = function (id, source) {
	this.workflowService.addComment(id, source, this.processes[id], this.user, this.comments, this.commentInput, this.commentModalInput);
};
/*
 * Not in use SalesCtrl.prototype.saveSale = function () { var vm = this; if
 * (angular.isUndefined(this.newSale.customer)) { this.newSale.customer = {
 * title: '' } } this.newSale.timestamp = this.filter('date')(new Date(),
 * 'dd.MM.yyyy HH:mm'); this.newSale.vendor = { name: "***REMOVED***" }; var process = {
 * sale: this.newSale, status: 'sale', processor: vm.user };
 * this.processResource.addProcess(process).$promise.then(function () {
 * vm.toaster.pop('success', '',
 * vm.translate.instant('COMMON_TOAST_SUCCESS_ADD_SALE'));
 * vm.addForm.$setPristine(); vm.updateRow(process); }); };
 */

SalesCtrl.prototype.clearNewSale = function () {
	this.newSale = {};
	this.newOffer.containerAmount = 1;
	this.newOffer.container = {
		name: "placholder",
		priceNetto: 666
	};
	this.newSale.containerAmount = 1;
	this.newSale.container = {
		priceNetto: 0
	}
};

SalesCtrl.prototype.loadDataToModal = function (sale) {
	this.currentProductId = "-1";
	this.currentProductAmount = 1;
	this.editProcess = sale;
	this.currentOrderPositions = deepCopyArray(this.editProcess.sale.orderPositions);

};

SalesCtrl.prototype.saveEditedRow = function () {
	var vm = this;
	this.editProcess.sale.orderPositions = this.currentOrderPositions;
	this.saleResource.update(this.editProcess.sale).$promise.then(function () {
		vm.toaster.pop('success', '', vm.translate
			.instant('COMMON_TOAST_SUCCESS_UPDATE_SALE'));
		vm.editForm.$setPristine();
		vm.updateRow(vm.editProcess);
	});
};

SalesCtrl.prototype.deleteRow = function (process) {
	var vm = this;
	var saleId = process.sale.id;
	process.status = 'CLOSED';
	process.sale = null;
	this.processResource.update(process).$promise.then(function () {
		if (process.lead == null && process.sale == null) {
			vm.processResource.deleteProcess({
				id: process.id
			});
		}
		vm.saleResource.drop({
			id: saleId
		}).$promise.then(function () {
			vm.toaster.pop('success', '', vm.translate
				.instant('COMMON_TOAST_SUCCESS_DELETE_SALE'));
			vm.dtInstance.DataTable.row(vm.rows[process.id]).remove().draw();
		});
	});
};

SalesCtrl.prototype.updateRow = function (process) {
	this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw();
	this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
};

SalesCtrl.prototype.addProduct = function (array) {
	this.workflowService.addProduct(array, this.currentProductId, this.currentProductAmount);
}
SalesCtrl.prototype.deleteProduct = function (array, index) {
	this.workflowService.deleteProduct(array, index);
}
SalesCtrl.prototype.sumOrderPositions = function (array) {
	return this.workflowService.sumOrderPositions(array);
}