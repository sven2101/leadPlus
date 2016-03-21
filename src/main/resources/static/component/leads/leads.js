'use strict';
angular.module('app.leads', ['ngResource']).controller('LeadsCtrl', LeadsCtrl);
LeadsCtrl.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', '$compile', '$scope', 'toaster', 'Processes'];
function LeadsCtrl(DTOptionsBuilder, DTColumnBuilder, $compile, $scope, toaster, Processes) {
    
	var vm = this;
	this.processes = Processes;
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
    this.dtOptions = DTOptionsBuilder.fromSource('http://localhost:8080/application/api/rest/processes/leads')
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
                    columns: [2, 3, 4, 5, 6]
                }
            },
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [2, 3, 4, 5, 6]
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
        .withOption('order', [5, 'desc']);
    this.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
            .renderWith(addDetailButton),
        DTColumnBuilder.newColumn('inquirer.id').withTitle('ID')
            .withClass('text-center'),
        DTColumnBuilder.newColumn('inquirer.lastname').withTitle('Name')
            .withClass('text-center'),
        DTColumnBuilder.newColumn('inquirer.company').withTitle('Firma')
            .withClass('text-center'),
        DTColumnBuilder.newColumn('inquirer.email').withTitle('Email')
            .withClass('text-center'),
        DTColumnBuilder.newColumn('timestamp').withTitle('Datum')
            .withOption('type', 'date-euro')
            .withClass('text-center'),
        DTColumnBuilder.newColumn('inquirer.phone').withTitle('Phone')
            .notVisible(),
        DTColumnBuilder.newColumn(null).withTitle('Status')
            .withClass('text-center')
            .renderWith(addStatusStyle),
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
            return '<div style="color: red;">' + data.timestamp + '</div>'
        }
        else {
            return '<div style="color: green;">' + data.timestamp + '</div>'
        }
    }

    function addDetailButton(data, type, full, meta) {
        vm.leads[data.id] = data;
        return '<a class="green shortinfo" href="javascript:;"' +
            'ng-click="lead.appendChildRow(lead.leads[' + data.id + '], $event)" title="Click to view more">' +
            '<i class="glyphicon glyphicon-plus-sign"/></a>';
    }
}

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




