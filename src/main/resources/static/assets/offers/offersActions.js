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

OffersCtrl.prototype.loadCurrentIdToModal = function (id) {
	this.currentCommentModalId = id;
};

OffersCtrl.prototype.addComment = function (id, source) {
	let vm = this;
	let commentText = "";
	if (angular.isUndefined(this.comments[id])) {
		this.comments[id] = [];
	}
	if (source === "table" && this.commentInput[id] !== ""
		&& !angular.isUndefined(this.commentInput[id])) {
		commentText = this.commentInput[id];
	} else if (source === "modal" && this.commentModalInput[id] !== ""
		&& !angular.isUndefined(this.commentModalInput[id])) {
		commentText = this.commentModalInput[id];
	}
	let comment = {
		process: this.processes[id],
		creator: this.user,
		commentText: commentText,
		timestamp: this.filter("date")(new Date(), "dd.MM.yyyy HH:mm:ss")
	};
	this.commentResource.save(comment).$promise.then(function () {
		vm.comments[id].push(comment);
		vm.commentInput[id] = "";
		vm.commentModalInput[id] = "";
	});
};
/*
 * Not in Use. OffersCtrl.prototype.saveOffer = function () { let vm = this; if
 * (angular.isUndefined(this.newOffer.prospect)) { this.newOffer.prospect = {
 * title: "" } } this.newOffer.timestamp = this.filter("date")(new Date(),
 * "dd.MM.yyyy HH:mm"); this.newOffer.vendor = { name: "***REMOVED***" }; let
 * process = { offer: this.newOffer, status: "offer", processor: vm.user };
 * this.processResource.addProcess(process).$promise.then(function (result) {
 * vm.toaster.pop("success", "",
 * vm.translate.instant("COMMON_TOAST_SUCCESS_ADD_OFFER"));
 * vm.rootScope.offersCount += 1; vm.addForm.$setPristine();
 * vm.dtInstance.DataTable.row.add(result).draw(); }); };
 */

OffersCtrl.prototype.clearNewOffer = function () {
	this.newOffer = {};
	this.newOffer.containerAmount = 1;
	this.newOffer.container = {
		priceNetto: 0
	}
};

OffersCtrl.prototype.createSale = function (process) {
	let vm = this;
	let sale = {
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
		timestamp: this.filter("date")(new Date(), "dd.MM.yyyy HH:mm"),
		vendor: process.offer.vendor
	};
	this.processResource.createSale({
		id: process.id
	}, sale).$promise.then(function () {
		vm.processResource.setStatus({
			id: process.id
		}, "SALE").$promise.then(function () {
			vm.toaster.pop("success", "", vm.translate
				.instant("COMMON_TOAST_SUCCESS_NEW_SALE"));
			vm.rootScope.offersCount -= 1;
			vm.processResource.setProcessor({
				id: process.id
			}, vm.user.id).$promise.then(function () {
				process.processor = vm.user;
				process.sale = sale;
				process.status = "SALE";
				if (vm.loadAllData === true) {
					vm.updateRow(process);
				}
			});
			if (vm.loadAllData === false) {
				vm.dtInstance.DataTable.row(vm.rows[process.id]).remove()
					.draw();
			}
		});
	});
};

OffersCtrl.prototype.followUp = function (process) {
	let vm = this;
	this.processResource.setStatus({
		id: process.id
	}, "FOLLOWUP").$promise.then(function () {
		vm.toaster.pop("success", "", vm.translate
			.instant("COMMON_TOAST_SUCCESS_FOLLOW_UP"));
		process.status = "FOLLOWUP";
		vm.updateRow(process);
	});
};

OffersCtrl.prototype.closeOrOpenOffer = function (process) {
	let vm = this;
	if (process.status === "OFFER" || process.status === "FOLLOWUP") {
		this.processResource.setStatus({
			id: process.id
		}, "CLOSED").$promise.then(function () {
			vm.toaster.pop("success", "", vm.translate
				.instant("COMMON_TOAST_SUCCESS_CLOSE_OFFER"));
			vm.rootScope.offersCount -= 1;
			process.status = "CLOSED";
			vm.updateRow(process);
		});
	} else if (process.status === "CLOSED") {
		this.processResource.setStatus({
			id: process.id
		}, "OFFER").$promise.then(function () {
			vm.toaster.pop("success", "", vm.translate
				.instant("COMMON_TOAST_SUCCESS_OPEN_OFFER"));
			vm.rootScope.offersCount += 1;
			process.status = "OFFER";
			vm.updateRow(process);
		});
	}
};

OffersCtrl.prototype.loadDataToModal = function (process) {
	console.log(process);
	this.currentProductId = "-1";
	this.currentProductAmount = 1;
	this.editProcess = process;
	this.currentOrderPositions = deepCopyArray(this.editProcess.offer.orderPositions);
};

OffersCtrl.prototype.saveEditedRow = function () {
	let vm = this;
	this.editProcess.offer.orderPositions = this.currentOrderPositions;
	this.offerResource.update(this.editProcess.offer).$promise.then(function () {
		vm.toaster.pop("success", "", vm.translate
			.instant("COMMON_TOAST_SUCCESS_UPDATE_OFFER"));
		vm.editForm.$setPristine();
		vm.updateRow(vm.editProcess);
	});
};

OffersCtrl.prototype.deleteRow = function (process) {
	let vm = this;
	let offerId = process.offer.id;
	if (process.sale !== null) {
		vm.toaster.pop("error", "", vm.translate
			.instant("COMMON_TOAST_FAILURE_DELETE_OFFER"));
		return;
	}
	process.status = "CLOSED";
	process.offer = null;
	this.processResource.update(process).$promise.then(function () {
		if (process.lead === null && process.sale === null) {
			vm.processResource.deleteProcess({
				id: process.id
			});
		}
		vm.offerResource.drop({
			id: offerId
		}).$promise.then(function () {
			vm.toaster.pop("success", "", vm.translate
				.instant("COMMON_TOAST_SUCCESS_DELETE_OFFER"));
			vm.rootScope.offersCount -= 1;
			vm.dtInstance.DataTable.row(vm.rows[process.id]).remove().draw();
		});
	});
};

OffersCtrl.prototype.updateRow = function (process) {
	this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw();
	this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
}

OffersCtrl.prototype.addProduct = function (array) {
	this.workflowService.addProduct(array, this.currentProductId, this.currentProductAmount);
}
OffersCtrl.prototype.deleteProduct = function (array, index) {
	this.workflowService.deleteProduct(array, index);
}
OffersCtrl.prototype.sumOrderPositions = function (array) {
	return this.workflowService.sumOrderPositions(array);
}
