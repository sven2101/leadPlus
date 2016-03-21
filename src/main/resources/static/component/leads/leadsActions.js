/**
 * Created by Sven on 20.03.2016.
 */
LeadsCtrl.prototype.changeDataInput = function () {
    if (this.loadAllData == true) {
        this.dtInstance.changeData(this.processes.getProcessByLead());
    }
    else {
        this.dtInstance.changeData(this.processes.getProcessByLeadAndStatus({status:"open"}));
    }
};

LeadsCtrl.prototype.loadCurrentIdToModal = function (id) {
    this.currentCommentModalId = id;
};

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
    this.toaster.pop('success', 'Success', "New Lead Saved");
    this.message = 'Save new lead:' + this.newLead.firstName;
};

LeadsCtrl.prototype.clearNewLead = function () {
    this.newLead = {};
};

LeadsCtrl.prototype.refreshData = function () {
    var resetPaging = false;
    this.dtInstance.reloadData(resetPaging);
    this.message = 'refresh table';
};

LeadsCtrl.prototype.followUp = function (lead) {
    this.message = 'You are trying to generate an offer of the row: ' + JSON.stringify(lead);
    // Delete some data and call server to make changes...
    // Then reload the data so that DT is refreshed
    //this.dtInstance.reloadData();
};

LeadsCtrl.prototype.closeInquiry = function (lead) {
    this.message = 'You are trying to close an offer of the row: ' + JSON.stringify(lead);
    // Delete some data and call server to make changes...
    // Then reload the data so that DT is refreshed
    this.dtInstance.reloadData();
};

LeadsCtrl.prototype.loadDataToModal = function (lead) {
    this.message = 'You are loading datas to edit: ' + JSON.stringify(lead);
    this.editLead = lead;
};

LeadsCtrl.prototype.saveEditedRow = function () {
    // Edit some data and call server to make changes...
    // Then reload the data so that DT is refreshed
    this.toaster.pop('success', 'Success', "Lead edited");
    this.message = 'You are trying to edit the row: ' + JSON.stringify(this.editLead);
    this.dtInstance.reloadData();
};

LeadsCtrl.prototype.deleteRow = function (lead) {
    this.toaster.pop('success', 'Success', "Lead removed");
    this.message = 'You are trying to remove the row: ' + JSON.stringify(lead);
    // Delete some data and call server to make changes...
    // Then reload the data so that DT is refreshed
    this.dtInstance.reloadData();
};