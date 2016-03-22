/**
 * Created by Sven on 20.03.2016.
 */

LeadsCtrl.prototype.loadCurrentIdToModal = function (id) {
    this.currentCommentModalId = id;
}

LeadsCtrl.prototype.addComment = function (id, source) {
    if (angular.isUndefined(this.comments[id])) {
        this.comments[id] = [];
    }
    if (source == 'table' && this.commentInput[id] != '' && !angular.isUndefined(this.commentInput[id])) {
        this.comments[id].push({from: "Sven", comment: this.commentInput[id], date: new Date()});
        this.commentInput[id] = '';
    }
    else if (source == 'modal' && this.commentModalInput[id] != '' && !angular.isUndefined(this.commentModalInput[id])) {
        this.comments[id].push({from: "Sven", comment: this.commentModalInput[id], date: new Date()});
        this.commentModalInput[id] = '';
    }
};

LeadsCtrl.prototype.saveLead = function () {
    var vm = this;
    this.newLead.timestamp = this.filter('date')(new Date(), 'dd.MM.yyyy HH:mm');
    this.newLead.vendor = {
        name: "***REMOVED***"
    };
    var process = {
        lead: this.newLead,
        status: 'open'
    }
    this.processes.addProcess(process).$promise.then(function () {
        vm.toaster.pop('success', 'Success', "New Lead Saved");
        vm.refreshData();
    });
}

LeadsCtrl.prototype.clearNewLead = function () {
    this.newLead = {};
    this.newLead.containerAmount = 1;
    this.newLead.container = {
        priceNetto: 0
    }
}

LeadsCtrl.prototype.followUp = function (lead) {
    var vm = this;
    this.processes.setStatus({id: lead.id}, 'offer').$promise.then(function () {
        vm.toaster.pop('success', 'Success', "You have a new offer");
        vm.refreshData();
    });
}

LeadsCtrl.prototype.closeOrOpenInquiry = function (lead) {
    var vm = this;
    alert(lead.status);
    if (lead.status == "open") {
        this.processes.setStatus({id: lead.id}, 'closed').$promise.then(function () {
            vm.toaster.pop('success', 'Success', "You have closed your lead");
            vm.refreshData();
        });
    } else if (lead.status == "closed") {
        this.processes.setStatus({id: lead.id}, 'open').$promise.then(function () {
            vm.toaster.pop('success', 'Success', "You have opened your lead");
            vm.refreshData();
        });
    }
}

LeadsCtrl.prototype.loadDataToModal = function (lead) {
    this.editLead = lead;
}

LeadsCtrl.prototype.saveEditedRow = function () {
    var vm = this;
    this.processes.putLead({id: this.editLead.lead.id}, this.editLead.lead).$promise.then(function () {
        vm.toaster.pop('success', 'Success', "You have updated your lead");
        vm.refreshData();
    });
}

LeadsCtrl.prototype.deleteRow = function (lead) {
    this.toaster.pop('success', 'Success', "Lead removed");
    this.message = 'You are trying to remove the row: ' + JSON.stringify(lead);
    // Delete some data and call server to make changes...
    // Then reload the data so that DT is refreshed
    this.dtInstance.reloadData();
}