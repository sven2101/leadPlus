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

SalesCtrl.prototype.loadCurrentIdToModal = function(id) {
	this.currentCommentModalId = id;
};

SalesCtrl.prototype.addComment = function(id, source) {
	var vm = this;
	var commentText = '';
	if (angular.isUndefined(this.comments[id])) {
		this.comments[id] = [];
	}
	if (source == 'table' && this.commentInput[id] != ''
			&& !angular.isUndefined(this.commentInput[id])) {
		commentText = this.commentInput[id];
	} else if (source == 'modal' && this.commentModalInput[id] != ''
			&& !angular.isUndefined(this.commentModalInput[id])) {
		commentText = this.commentModalInput[id];
	}
	var comment = {
		process : this.processes[id],
		creator : this.user,
		commentText : commentText,
		timestamp : this.filter('date')(new Date(), "dd.MM.yyyy HH:mm:ss")
	};
	this.commentService.addComment(comment).$promise.then(function() {
		vm.comments[id].push(comment);
		vm.commentInput[id] = '';
		vm.commentModalInput[id] = '';
	});
};
/*
 * Not in use SalesCtrl.prototype.saveSale = function () { var vm = this; if
 * (angular.isUndefined(this.newSale.customer)) { this.newSale.customer = {
 * title: '' } } this.newSale.timestamp = this.filter('date')(new Date(),
 * 'dd.MM.yyyy HH:mm'); this.newSale.vendor = { name: "***REMOVED***" }; var process = {
 * sale: this.newSale, status: 'sale', processor: vm.user };
 * this.processesService.addProcess(process).$promise.then(function () {
 * vm.toaster.pop('success', '',
 * vm.translate.instant('COMMON_TOAST_SUCCESS_ADD_SALE'));
 * vm.addForm.$setPristine(); vm.updateRow(process); }); };
 */

SalesCtrl.prototype.clearNewSale = function() {
	this.newSale = {};
	this.newSale.containerAmount = 1;
	this.newSale.container = {
		priceNetto : 0
	}
};

SalesCtrl.prototype.loadDataToModal = function(sale) {
	this.editProcess = sale;
};

SalesCtrl.prototype.saveEditedRow = function() {
	var vm = this;
	this.processesService.putSale({
		id : this.editProcess.sale.id
	}, this.editProcess.sale).$promise.then(function() {
		vm.toaster.pop('success', '', vm.translate
				.instant('COMMON_TOAST_SUCCESS_UPDATE_SALE'));
		vm.editForm.$setPristine();
		vm.updateRow(vm.editProcess);
	});
};

SalesCtrl.prototype.deleteRow = function(process) {
	var vm = this;
	var saleId = process.sale.id;
	process.status = 'closed';
	process.sale = null;
	this.processesService.putProcess({
		id : process.id
	}, process).$promise.then(function() {
		if (process.lead == null && process.sale == null) {
			vm.processesService.deleteProcess({
				id : process.id
			});
		}
		vm.processesService.deleteSale({
			id : saleId
		}).$promise.then(function() {
			vm.toaster.pop('success', '', vm.translate
					.instant('COMMON_TOAST_SUCCESS_DELETE_SALE'));
			vm.dtInstance.DataTable.row(vm.rows[process.id]).remove().draw();
		});
	});
};

SalesCtrl.prototype.updateRow = function(process) {
	this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw();
	this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
};