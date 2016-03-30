/**
 * Created by Sven on 20.03.2016.
 */

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
    this.processesService.addProcess(process).$promise.then(function () {
        vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_ADD_LEAD'));
        vm.rootScope.leadsCount += 1;
        vm.addForm.$setPristine();
        vm.refreshData();
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
            vm.refreshData();
        });
    });
};

LeadsCtrl.prototype.closeOrOpenInquiry = function (process) {
    var vm = this;
    if (process.status == "open") {
        this.processesService.setStatus({id: process.id}, 'closed').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_CLOSE_LEAD'));
            vm.rootScope.leadsCount -= 1;
            vm.refreshData();
        });
    } else if (process.status == "closed") {
        this.processesService.setStatus({id: process.id}, 'open').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_OPEN_LEAD'));
            vm.rootScope.leadsCount += 1;
            vm.refreshData();
        });
    }
};

LeadsCtrl.prototype.loadDataToModal = function (lead) {
    this.editProcess = lead;
};

LeadsCtrl.prototype.saveEditedRow = function () {
    var vm = this;
    this.processesService.putLead({id: this.editProcess.lead.id}, this.editProcess.lead).$promise.then(function () {
        vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_UPDATE_LEAD'));
        vm.editForm.$setPristine();
        vm.refreshData();
    });
};

LeadsCtrl.prototype.deleteRow = function (process) {
    var vm = this;
    this.processesService.putProcess({id: process.id}, {lead: null}).$promise.then(function () {
        if (process.offer == null && process.sale == null) {
            vm.processesService.deleteProcess({id: process.id});
        }
        vm.processesService.deleteLead({id: process.lead.id}).$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_DELETE_LEAD'));
            if (process.status = 'open') {
                vm.rootScope.leadsCount -= 1;
            }
            vm.refreshData();
        });
    });
};