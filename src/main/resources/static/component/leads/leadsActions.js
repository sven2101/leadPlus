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

LeadsCtrl.prototype.loadCurrentIdToModal = function (id) {
    this.currentCommentModalId = id;
};

LeadsCtrl.prototype.addComment = function (id, source) {
    var vm = this;
    if (angular.isUndefined(this.comments[id])) {
        this.comments[id] = [];
    }
    if (source == 'table' && this.commentInput[id] != '' && !angular.isUndefined(this.commentInput[id])) {
        var comment = {
        	process: this.processes[id],
        	creator: this.user,
        	commentText: this.commentInput[id],
        	timestamp: this.filter('date')(new Date(), "dd.MM.yyyy HH:mm")            
        };
        this.commentsService.addComment(comment).$promise.then(function () {
            vm.comments[id].push(comment);
            vm.commentInput[id] = '';
        });
    }
    else if (source == 'modal' && this.commentModalInput[id] != '' && !angular.isUndefined(this.commentModalInput[id])) {
        var comment = {
    		process: this.processes[id],
    		creator: this.user,
    		commentText: this.commentModalInput[id],
    		timestamp: this.filter('date')(new Date(), "dd.MM.yyyy HH:mm")           
        };
        this.processesService.addComment({id: id}, comment).$promise.then(function () {
            vm.comments[id].push(comment);
            vm.commentModalInput[id] = '';
        });
    }
};

LeadsCtrl.prototype.saveLead = function () {
    var vm = this;
    if (angular.isUndefined(this.newLead.inquirer)) {
        this.newLead.inquirer = {
            title: ''
        }
    }
    this.newLead.timestamp = this.filter('date')(new Date(), 'dd.MM.yyyy HH:mm');
    this.newLead.vendor = {
        name: "***REMOVED***"
    };
    var process = {
        lead: this.newLead,
        status: 'open'
    };
    this.processesService.addProcess(process).$promise.then(function (result) {
        vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_ADD_LEAD'));
        vm.rootScope.leadsCount += 1;
        vm.addForm.$setPristine();
        vm.dtInstance.DataTable.row.add(result).draw();
    });
};

LeadsCtrl.prototype.clearNewLead = function () {
    this.newLead = {};
    this.newLead.containerAmount = 1;
    this.newLead.container = {
        priceNetto: 0
    }
};

LeadsCtrl.prototype.followUp = function (process) {
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
            if (process.processor == null) {
                vm.processesService.setProcessor({id: process.id}, vm.user.username).$promise.then(function () {
                    process.processor = vm.user;
                    process.offer = offer;
                    process.status = 'offer';
                    vm.updateRow(process);
                });
            }
        });
    });
};

LeadsCtrl.prototype.pin = function (process) {
    var vm = this;
    if (process.processor == null) {
        this.processesService.setProcessor({id: process.id}, vm.user.username).$promise.then(function () {
            process.processor = vm.user;
            vm.updateRow(process);
        });
    }
    else {
        this.processesService.removeProcessor({id: process.id}).$promise.then(function () {
            process.processor = null;
            vm.updateRow(process);
        });
    }
}

LeadsCtrl.prototype.closeOrOpenInquiry = function (process) {
    var vm = this;
    if (process.status == "open") {
        this.processesService.setStatus({id: process.id}, 'closed').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_CLOSE_LEAD'));
            vm.rootScope.leadsCount -= 1;
            process.status = 'closed';
            vm.updateRow(process);
        });
    } else if (process.status == "closed") {
        this.processesService.setStatus({id: process.id}, 'open').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_OPEN_LEAD'));
            vm.rootScope.leadsCount += 1;
            process.status = 'open';
            vm.updateRow(process);
        });
    }
};

LeadsCtrl.prototype.loadDataToModal = function (process) {
    this.editProcess = process;
};

LeadsCtrl.prototype.saveEditedRow = function () {
    var vm = this;
    this.processesService.putLead({id: this.editProcess.lead.id}, this.editProcess.lead).$promise.then(function () {
        vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_UPDATE_LEAD'));
        vm.editForm.$setPristine();
        vm.editProcess.lead.leadPrice = vm.editProcess.lead.containerAmount * vm.editProcess.lead.container.priceNetto;
        vm.updateRow(vm.editProcess);
    });
};

LeadsCtrl.prototype.deleteRow = function (process) {
    var vm = this;
    var leadId = process.lead.id;
    if (process.sale != null || process.offer != null) {
        vm.toaster.pop('error', '', vm.translate.instant('COMMON_TOAST_FAILURE_DELETE_LEAD'));
        return;
    }
    process.lead = null;
    this.processesService.putProcess({id: process.id}, process).$promise.then(function () {
        if (process.offer == null && process.sale == null) {
            vm.processesService.deleteProcess({id: process.id});
        }
        vm.processesService.deleteLead({id: leadId}).$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_DELETE_LEAD'));
            vm.rootScope.leadsCount -= 1;
            vm.dtInstance.DataTable.row(vm.rows[process.id]).remove().draw();
        });
    });
};

LeadsCtrl.prototype.updateRow = function (process) {
    this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw(false);
    this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
};