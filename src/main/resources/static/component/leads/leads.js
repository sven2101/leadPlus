'use strict';
angular.module('app.leads', ['ngResource']).controller('LeadsCtrl', LeadsCtrl);
LeadsCtrl.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', '$compile', '$scope', 'toaster', 'Processes', '$filter', 'Profile', '$rootScope'];
function LeadsCtrl(DTOptionsBuilder, DTColumnBuilder, $compile, $scope, toaster, Processes, $filter, Profile, $rootScope) {

    var vm = this;
    this.filter = $filter;
    this.processesService = Processes;
    this.userService = Profile;
    this.user = {};
    this.userService.get({username: $rootScope.globals.currentUser.username}).$promise.then(function (result) {
        vm.user = result;
    });
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
    this.processes = {};
    this.editProcess = {};
    this.newLead = {};
    this.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            return vm.processesService.getProcessByLeadAndStatus({status: 'open'}).$promise;
        })
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
        .withOption('order', [4, 'desc']);
    this.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
            .renderWith(addDetailButton),
        DTColumnBuilder.newColumn('lead.inquirer.lastname').withTitle('Name')
            .withClass('text-center'),
        DTColumnBuilder.newColumn('lead.inquirer.company').withTitle('Firma')
            .withClass('text-center'),
        DTColumnBuilder.newColumn('lead.inquirer.email').withTitle('Email')
            .withClass('text-center'),
        DTColumnBuilder.newColumn('lead.timestamp').withTitle('Datum')
            .withOption('type', 'date-euro')
            .withClass('text-center'),
        DTColumnBuilder.newColumn('lead.inquirer.phone').withTitle('Phone')
            .notVisible(),
        DTColumnBuilder.newColumn('lead.inquirer.firstname').withTitle('firstname')
            .notVisible(),
        DTColumnBuilder.newColumn('lead.container.name').withTitle('containername')
            .notVisible(),
        DTColumnBuilder.newColumn('lead.destination').withTitle('destination')
            .notVisible(),
        DTColumnBuilder.newColumn(null).withTitle('Status')
            .withClass('text-center')
            .renderWith(addStatusStyle),
        DTColumnBuilder.newColumn(null).withTitle('<span class="glyphicon glyphicon-cog"></span>').withClass('text-center')
            .notSortable()
            .renderWith(addActionsButtons)
    ];

    vm.refreshData = refreshData;
    function refreshData() {
        var resetPaging = true;
        this.dtInstance.reloadData(resetPaging);
    }

    vm.changeDataInput = changeDataInput;
    function changeDataInput() {

        if (vm.loadAllData == true) {
            return vm.processesService.getProcessByLead().$promise;
        }
        else {
            return vm.processesService.getProcessByLeadAndStatus({status: 'open'}).$promise;
        }
    }

    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        vm.compile(angular.element(row).contents())(vm.scope);
    }

    function addActionsButtons(data, type, full, meta) {
        vm.processes[data.id] = data;
        var disabled = '';
        var closeOrOpenInquiryDisable = '';
        var openOrLock = 'Anfrage schließen';
        var faOpenOrLOck = 'fa fa-lock';
        if (data.status != 'open') {
            disabled = 'disabled';
            openOrLock = 'Anfrage Öffnen';
            faOpenOrLOck = 'fa fa-unlock';
        }
        if (data.offer != null || data.sale != null) {
            closeOrOpenInquiryDisable = 'disabled';
        }


        return '<button class="btn btn-white" ' + disabled + ' ng-click="lead.followUp(lead.processes[' + data.id + '])" title="Angebot erstellen">' +
            '   <i class="fa fa-check"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-white" ' + closeOrOpenInquiryDisable + ' ng-click="lead.closeOrOpenInquiry(lead.processes[' + data.id + '])" title="' + openOrLock + '">' +
            '   <i class="' + faOpenOrLOck + '"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-white" ' + closeOrOpenInquiryDisable + ' ng-click="lead.loadDataToModal(lead.processes[' + data.id + '])" data-toggle="modal"' +
            'data-target="#editModal" title="Anfrage bearbeiten">' +
            '<i class="fa fa-edit"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-white" ng-click="lead.deleteRow(lead.processes[' + data.id + '])" title="Anfrage Löschen">' +
            '   <i class="fa fa-trash-o"></i>' +
            '</button>';
    }

    function addStatusStyle(data, type, full, meta) {
        vm.processes[data.id] = data;
        if (data.status == 'open') {
            return '<div style="color: green;">' + data.status + '</div>'
        }
        else if (data.status == 'offer') {
            return '<div style="color: #f79d3c;">' + data.status + '</div>'
        }
        else if (data.status == 'sale') {
            return '<div style="color: #1872ab;">' + data.status + '</div>'
        }
        else if (data.status == 'closed') {
            return '<div style="color: #ea394c;">' + data.status + '</div>'
        }
    }

    function addDetailButton(data, type, full, meta) {
        vm.processes[data.id] = data;
        return '<a class="green shortinfo" href="javascript:;"' +
            'ng-click="lead.appendChildRow(lead.processes[' + data.id + '], $event)" title="Click to view more">' +
            '<i class="glyphicon glyphicon-plus-sign"/></a>';
    }
}

LeadsCtrl.prototype.appendChildRow = function (process, event) {
    var childScope = this.scope.$new(true);
    childScope.leadChildData = process;
    var vm = this;
    this.processesService.getComments({id: process.id}).$promise.then(function (result) {
        vm.comments[process.id] = [];
        for (var comment in result) {
            if (comment == '$promise')
                break;
            vm.comments[process.id].push({
                commentText: result[comment].commentText,
                date: result[comment].date,
                creator: result[comment].creator
            });
        }
    });
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




