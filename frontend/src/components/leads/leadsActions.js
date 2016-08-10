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

LeadsCtrl.prototype.loadCurrentIdToModal = function (id) {
	this.currentCommentModalId = id;
};

LeadsCtrl.prototype.addComment = function (id, source) {
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
		process: this.processes[id],
		creator: this.user,
		commentText: commentText,
		timestamp: this.filter('date')(new Date(), "dd.MM.yyyy HH:mm:ss")
	};
	this.commentResource.save(comment).$promise.then(function () {
		vm.comments[id].push(comment);
		vm.commentInput[id] = '';
		vm.commentModalInput[id] = '';
	});
};

LeadsCtrl.prototype.saveLead = function () {
	var vm = this;
	if (angular.isUndefined(this.newLead.inquirer)) {
		this.newLead.inquirer = {
			title: 'UNKNOWN'
		}
	}
	this.newLead.timestamp = this.filter('date')
		(new Date(), 'dd.MM.yyyy HH:mm');
	this.newLead.vendor = {
		name: "***REMOVED***"
	};
	var process = {
		lead: this.newLead,
		status: 'OPEN'
	};
	this.processResource.save(process).$promise.then(function (result) {
		vm.toaster.pop('success', '', vm.translate
			.instant('COMMON_TOAST_SUCCESS_ADD_LEAD'));
		vm.rootScope.leadsCount += 1;
		vm.addForm.$setPristine();
		vm.dtInstance.DataTable.row.add(result).draw();
	});
};

LeadsCtrl.prototype.clearNewLead = function () {
	this.newLead = {};
	this.newLead.containerAmount = 1;
	this.newLead.container = {
		name: "placholder",
		priceNetto: 666
	}
	this.newLead.orderPositions = [];
	this.currentOrderPositions = [];
	this.currentProductId = "-1";
	this.currentProductAmount = 1;
};

LeadsCtrl.prototype.createOffer = function (process) {
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
	this.processResource.createOffer({
		id: process.id
	}, offer).$promise.then(function () {
		vm.processResource.setStatus({
			id: process.id
		}, 'OFFER').$promise.then(function () {
			vm.toaster.pop('success', '', vm.translate
				.instant('COMMON_TOAST_SUCCESS_NEW_OFFER'));
			vm.rootScope.leadsCount -= 1;
			vm.rootScope.offersCount += 1;
			if (process.processor == null) {
				vm.processResource.setProcessor({
					id: process.id
				}, vm.user.id).$promise.then(function () {
					process.processor = vm.user;
					process.offer = offer;
					process.status = 'OFFER';
					if (vm.loadAllData == true) {
						vm.updateRow(process);
					}
				});
			}
			if (vm.loadAllData == false) {
				vm.dtInstance.DataTable.row(vm.rows[process.id]).remove()
					.draw();
			}
		});
	});
};

LeadsCtrl.prototype.pin = function (process) {
	var vm = this;
	if (process.processor == null) {
		this.processResource.setProcessor({
			id: process.id
		}, vm.user.id).$promise.then(function () {
			process.processor = vm.user;
			vm.updateRow(process);
		});
	} else {
		this.processResource.removeProcessor({
			id: process.id
		}).$promise.then(function () {
			process.processor = null;
			vm.updateRow(process);
		});
	}
}

LeadsCtrl.prototype.closeOrOpenInquiry = function (process) {
	var vm = this;
	if (process.status == "OPEN") {
		this.processResource.setStatus({
			id: process.id
		}, 'CLOSED').$promise.then(function () {
			vm.toaster.pop('success', '', vm.translate
				.instant('COMMON_TOAST_SUCCESS_CLOSE_LEAD'));
			vm.rootScope.leadsCount -= 1;
			process.status = 'CLOSED';
			vm.updateRow(process);
		});
	} else if (process.status == "CLOSED") {
		this.processResource.setStatus({
			id: process.id
		}, 'OPEN').$promise.then(function () {
			vm.toaster.pop('success', '', vm.translate
				.instant('COMMON_TOAST_SUCCESS_OPEN_LEAD'));
			vm.rootScope.leadsCount += 1;
			process.status = 'OPEN';
			vm.updateRow(process);
		});
	}
};

LeadsCtrl.prototype.loadDataToModal = function (process) {
	this.currentProductId = "-1";
    this.currentProductAmount = 1;
	this.editProcess = process;
	this.currentOrderPositions = this.editProcess.lead.orderPositions;
};

LeadsCtrl.prototype.saveEditedRow = function () {
	var vm = this;
	this.editProcess.lead.orderPositions = this.currentOrderPositions;
	this.leadResource.update(this.editProcess.lead).$promise.then(function () {
		vm.toaster.pop('success', '', vm.translate
			.instant('COMMON_TOAST_SUCCESS_UPDATE_LEAD'));
		vm.editForm.$setPristine();
		vm.editProcess.lead.leadPrice = vm.sumOrderPositions(vm.editProcess.lead.orderPositions);
		vm.updateRow(vm.editProcess);
	});
};

LeadsCtrl.prototype.deleteRow = function (process) {
	var vm = this;
	var leadId = process.lead.id;
	if (process.sale != null || process.offer != null) {
		vm.toaster.pop('error', '', vm.translate
			.instant('COMMON_TOAST_FAILURE_DELETE_LEAD'));
		return;
	}
	process.lead = null;
	this.processResource.update(process).$promise.then(function () {
		if (process.offer == null && process.sale == null) {
			vm.processResource.drop({
				id: process.id
			});
		}
		vm.leadResource.drop({
			id: leadId
		}).$promise.then(function () {
			vm.toaster.pop('success', '', vm.translate
				.instant('COMMON_TOAST_SUCCESS_DELETE_LEAD'));
			vm.rootScope.leadsCount -= 1;
			vm.dtInstance.DataTable.row(vm.rows[process.id]).remove().draw();
		});
	});
};

LeadsCtrl.prototype.updateRow = function (process) {
	this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw(
		false);
	this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
};

LeadsCtrl.prototype.addProduct = function (array) {
	if (!isNaN(Number(this.currentProductId))
		&& Number(this.currentProductId) > 0) {
		var tempProduct = findElementById(this.productService.products,
			Number(this.currentProductId));
		var tempOrderPosition = new OrderPosition();
		tempOrderPosition.product = tempProduct;
		tempOrderPosition.amount = this.currentProductAmount;
		array.push(tempOrderPosition);
	}
}
LeadsCtrl.prototype.deleteProduct = function (array, index) {
	array.splice(index, 1);
}
LeadsCtrl.prototype.sumOrderPositions = function (array) {
	var sum = 0;
	if (array == null) {
		return 0;
	}
	for (var i = 0; i < array.length; i++) {
		var temp = array[i];
		if (!isNullOrUndefined(temp) && !isNaN(temp.amount)
			&& !isNullOrUndefined(temp.product)
			&& !isNaN(temp.product.priceNetto)) {
			sum += temp.amount * temp.product.priceNetto;
		}
	}
	return sum;
}