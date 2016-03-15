'use strict';

angular.module('app.leads', ['ngResource']).controller('LeadsCtrl', LeadsCtrl);


LeadsCtrl.$inject = ["Applications", 'DTOptionsBuilder', 'DTColumnBuilder', '$compile', '$scope'];
function LeadsCtrl(Applications, DTOptionsBuilder, DTColumnBuilder, $compile, $scope) {

    var vm = this;
    this.scope = $scope;
    this.compile = $compile;
    this.message = '';
    this.dtInstance = {};
    this.leads = {};
    this.editLead = {};
    this.newLead = {};
    this.dtOptions = DTOptionsBuilder.fromSource('https://demo1774041.mockable.io/getData')
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
        .withOption('createdRow', createdRow)
        .withOption('order', [1, 'asc']);
    this.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
            .renderWith(addDetailButton),
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn(null).withTitle('First name')
            .renderWith(addStatusStyle),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name'),
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
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


        return '<button class="btn btn-primary" ' + disabled + ' ng-click="lead.followUp(lead.leads[' + data.id + '])" title="Angebot erstellen' + data.id + '">' +
            '   <i class="fa fa-check"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-warning" ng-click="lead.closeInquiry(lead.leads[' + data.id + '])" title="' + openOrLock + '">' +
            '   <i class="' + faOpenOrLOck + '"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-success" ng-click="lead.loadDataToModal(lead.leads[' + data.id + '])" data-toggle="modal"' +
            'data-target="#editModal" title="Anfrage bearbeiten">' +
            '<i class="fa fa-edit"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-danger" ng-click="lead.deleteRow(lead.leads[' + data.id + '])" title="Anfrage Löschen">' +
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

LeadsCtrl.prototype.submitForm = function() {
    // check to make sure the form is completely valid
    if(this.scope.editForm.$valid) {
        alert('our form is amazing');
    }
}

LeadsCtrl.prototype.saveLead = function () {
    this.message = 'Save new lead:' + this.newLead.firstName;
    this.newLead.firstName = "";
}


LeadsCtrl.prototype.refreshData = function () {
    var resetPaging = false;
    this.dtInstance.reloadData(resetPaging);
    this.message = 'refresh table';
}


LeadsCtrl.prototype.followUp = function (lead) {
    this.message = 'You are trying to generate an offer of the row: ' + JSON.stringify(lead);
    // Delete some data and call server to make changes...
    // Then reload the data so that DT is refreshed
    //this.dtInstance.reloadData();
}

LeadsCtrl.prototype.closeInquiry = function (lead) {
    this.message = 'You are trying to close an offer of the row: ' + JSON.stringify(lead);
    // Delete some data and call server to make changes...
    // Then reload the data so that DT is refreshed
    this.dtInstance.reloadData();
}

LeadsCtrl.prototype.loadDataToModal = function (lead) {
    this.message = 'You are trying to edit the row: ' + JSON.stringify(lead);
    this.editLead = lead;
}

LeadsCtrl.prototype.saveEditedRow = function () {
    // Edit some data and call server to make changes...
    // Then reload the data so that DT is refreshed
    this.editLead.firstName = "test";
    this.dtInstance.reloadData();
}

LeadsCtrl.prototype.deleteRow = function (lead) {
    this.message = 'You are trying to remove the row: ' + JSON.stringify(lead);
    // Delete some data and call server to make changes...
    // Then reload the data so that DT is refreshed
    this.dtInstance.reloadData();
}

LeadsCtrl.prototype.appendChildRow = function (lead, event) {
    var childScope = this.scope.$new(true);
    childScope.lead = lead;

    var link = angular.element(event.currentTarget),
        icon = link.find('.glyphicon'),
        tr = link.parent().parent(),
        table = this.dtInstance.DataTable,
        row = table.row(tr);
    //
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
}




