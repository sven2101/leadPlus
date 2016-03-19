'use strict';

angular.module('app.leads', ['ngResource']).controller('LeadsCtrl', LeadsCtrl);


LeadsCtrl.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', '$compile', '$scope', 'toaster'];
function LeadsCtrl(DTOptionsBuilder, DTColumnBuilder, $compile, $scope, toaster) {

    var vm = this;
    this.scope = $scope;
    this.compile = $compile;
    this.toaster = toaster;
    this.message = '';
    this.commentInput = {};
    this.commentModalInput = {};
    this.comments = {};
    this.currentCommentModalId = '';
    this.loadAllData = false;
    this.dtInstance = {};
    this.leads = {};
    this.editLead = {};
    this.newLead = {};
    this.dtOptions = DTOptionsBuilder.fromSource('http://demo1774041.mockable.io/test2')
        .withDOM('<"row"<"col-sm-12"l>>' +
            '<"row"<"col-sm-6"B><"col-sm-6"f>>' +
            '<"row"<"col-sm-12"tr>>' +
            '<"row"<"col-sm-5"i><"col-sm-7"p>>')
        .withPaginationType('full_numbers')
        .withButtons([
            'copyHtml5',
            'print',
            {
                extend: 'csvHtml5',
                exportOptions: {
                    columns: [1, 2, 3]
                }
            },
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [1, 2, 3]
                }
            },
            'pdfHtml5'
        ])
        .withBootstrap()
        .withLanguage({
            "sEmptyTable": "Keine Daten verfügbar",
            "sInfo": "Zeige _START_ bis _END_ von _TOTAL_ Einträgen",
            "sInfoEmpty": "Zeige 0 bis 0 von 0 Einträgen",
            "sInfoFiltered": "(filtered from _MAX_ total entries)",
            "sInfoPostFix": "",
            "sInfoThousands": ",",
            "sLengthMenu": "Zeige _MENU_ Einträge",
            "sLoadingRecords": "Loading...",
            "sProcessing": "Processing...",
            "sSearch": "Suche:",
            "sZeroRecords": "Keine Einträge gefunden"
        })
        .withOption('createdRow', createdRow)
        .withOption('order', [1, 'asc']);
    this.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
            .renderWith(addDetailButton),
        DTColumnBuilder.newColumn('id').withTitle('ID')
            .withClass('text-center'),
        DTColumnBuilder.newColumn(null).withTitle('First name')
            .withClass('text-center')
            .renderWith(addStatusStyle),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name')
            .withClass('text-center'),
        DTColumnBuilder.newColumn(null).withTitle('<span class="glyphicon glyphicon-cog"></span>').withClass('text-center')
            .notSortable()
            .renderWith(addActionsButtons)
    ];

    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        vm.compile(angular.element(row).contents())(vm.scope);
    }

    function addActionsButtons(data, type, full, meta) {
        vm.leads[data.id] = data;
        var disabled = '';
        var openOrLock = 'Anfrage schließen';
        var faOpenOrLOck = 'fa fa-lock';
        if (data.id % 2 == 0) {
            disabled = 'disabled';
            openOrLock = 'Anfrage Öffnen';
            faOpenOrLOck = 'fa fa-unlock';
        }


        return '<button class="btn btn-white" ' + disabled + ' ng-click="lead.followUp(lead.leads[' + data.id + '])" title="Angebot erstellen' + data.id + '">' +
            '   <i class="fa fa-check"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-white" ng-click="lead.closeInquiry(lead.leads[' + data.id + '])" title="' + openOrLock + '">' +
            '   <i class="' + faOpenOrLOck + '"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-white" ng-click="lead.loadDataToModal(lead.leads[' + data.id + '])" data-toggle="modal"' +
            'data-target="#editModal" title="Anfrage bearbeiten">' +
            '<i class="fa fa-edit"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-white" ng-click="lead.deleteRow(lead.leads[' + data.id + '])" title="Anfrage Löschen">' +
            '   <i class="fa fa-trash-o"></i>' +
            '</button>';
    }

    function addStatusStyle(data, type, full, meta) {
        vm.leads[data.id] = data;
        if (data.id % 2 == 0) {
            return '<div style="color: red;">' + data.firstName + '</div>'
        }
        else {
            return '<div style="color: green;">' + data.firstName + '</div>'
        }
    }


    function addDetailButton(data, type, full, meta) {
        vm.leads[data.id] = data;
        return '<a class="green shortinfo" href="javascript:;"' +
            'ng-click="lead.appendChildRow(lead.leads[' + data.id + '], $event)" title="Click to view more">' +
            '<i class="glyphicon glyphicon-plus-sign"/></a>';
    }
}

LeadsCtrl.prototype.changeDataInput = function () {
    if (this.loadAllData == true) {
        this.dtInstance.changeData('http://demo1774041.mockable.io/getData');
    }
    else {
        this.dtInstance.changeData('https://demo1774041.mockable.io/test2');
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

LeadsCtrl.prototype.appendChildRow = function (lead, event) {
    var childScope = this.scope.$new(true);
    childScope.leadChildData = lead;
    childScope.parent = this;

    var link = angular.element(event.currentTarget),
        icon = link.find('.glyphicon'),
        tr = link.parent().parent(),
        table = this.dtInstance.DataTable,
        row = table.row(tr);

    if (row.child.isShown()) {
        icon.removeClass('glyphicon-minus-sign').addClass('glyphicon-plus-sign');
        row.child.hide();
        tr.removeClass('shown');
    }
    else {
        icon.removeClass('glyphicon-plus-sign').addClass('glyphicon-minus-sign');
        row.child(this.compile('<div childrow class="clearfix"></div>')(childScope)).show();
        tr.addClass('shown');
    }
};




