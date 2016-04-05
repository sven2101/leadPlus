'use strict';
angular.module('app.sales', ['ngResource']).controller('SalesCtrl', SalesCtrl);
SalesCtrl.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', '$compile', '$scope', 'toaster', 'Processes', '$filter', 'Profile', '$rootScope', '$translate'];
function SalesCtrl(DTOptionsBuilder, DTColumnBuilder, $compile, $scope, toaster, Processes, $filter, Profile, $rootScope, $translate) {

    var vm = this;
    this.filter = $filter;
    this.processesService = Processes;
    this.userService = Profile;
    this.user = {};
    this.userService.get({username: $rootScope.globals.currentUser.username}).$promise.then(function (result) {
        vm.user = result;
    });
    this.scope = $scope;
    this.rootScope = $rootScope;
    this.translate = $translate;
    this.compile = $compile;
    this.toaster = toaster;
    this.commentInput = {};
    this.commentModalInput = {};
    this.comments = {};
    this.currentCommentModalId = '';
    this.loadAllData = false;
    this.dtInstance = {};
    this.processes = {};
    this.editProcess = {};
    this.newSale = {};
    this.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            return vm.processesService.getLatest100Sales().$promise;
        })
        .withDOM('<"row"<"col-sm-12"l>>' +
            '<"row"<"col-sm-6"B><"col-sm-6"f>>' +
            '<"row"<"col-sm-12"tr>>' +
            '<"row"<"col-sm-5"i><"col-sm-7"p>>')
        .withPaginationType('full_numbers')
        .withButtons([
            {
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
                    modifier: {
                        page: 'current'
                    }
                }
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
                    modifier: {
                        page: 'current'
                    }
                }
            },
            {
                extend: 'csvHtml5',
                title: $translate('SALE_SALES'),
                exportOptions: {
                    columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
                    modifier: {
                        page: 'current'
                    }

                }
            },
            {
                extend: 'excelHtml5',
                title: $translate.instant('SALE_SALES'),
                exportOptions: {
                    columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
                    modifier: {
                        page: 'current'
                    }
                }
            },
            {
                extend: 'pdfHtml5',
                title: $translate('SALE_SALES'),
                orientation: 'landscape',
                exportOptions: {
                    columns: [6, 1, 2, 8, 7, 9, 10, 11, 12, 13, 14],
                    modifier: {
                        page: 'current'
                    }
                }
            }
        ])
        .withBootstrap()
        .withOption('createdRow', createdRow)
        .withOption('order', [4, 'desc']);
    this.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
            .renderWith(addDetailButton),
        DTColumnBuilder.newColumn('sale.customer.lastname').withTitle($translate('COMMON_NAME'))
            .withClass('text-center'),
        DTColumnBuilder.newColumn('sale.customer.company').withTitle($translate('COMMON_COMPANY'))
            .withClass('text-center'),
        DTColumnBuilder.newColumn('sale.customer.email').withTitle($translate('COMMON_EMAIL'))
            .withClass('text-center'),
        DTColumnBuilder.newColumn('sale.timestamp').withTitle($translate('COMMON_DATE'))
            .withOption('type', 'date-euro')
            .withClass('text-center'),
        DTColumnBuilder.newColumn('sale.customer.phone').withTitle($translate('COMMON_PHONE'))
            .notVisible(),
        DTColumnBuilder.newColumn('sale.customer.firstname').withTitle($translate('COMMON_FIRSTNAME'))
            .notVisible(),
        DTColumnBuilder.newColumn('sale.container.name').withTitle($translate('COMMON_CONTAINER'))
            .notVisible(),
        DTColumnBuilder.newColumn('sale.transport').withTitle($translate('COMMON_CONTAINER_DESTINATION'))
            .notVisible(),
        DTColumnBuilder.newColumn('sale.containerAmount').withTitle($translate('COMMON_CONTAINER_AMOUNT'))
            .notVisible(),
        DTColumnBuilder.newColumn(null).withTitle($translate('COMMON_CONTAINER_SINGLE_PRICE'))
            .renderWith(function (data, type, full) {
                return $filter('currency')(data.sale.container.priceNetto, '€', 2);
            })
            .notVisible(),
        DTColumnBuilder.newColumn(null).withTitle($translate('COMMON_CONTAINER_ENTIRE_PRICE'))
            .renderWith(function (data, type, full) {
                return $filter('currency')(data.sale.container.priceNetto * data.sale.containerAmount, '€', 2);
            })
            .notVisible(),
        DTColumnBuilder.newColumn(null).withTitle($translate('COMMON_CONTAINER_SALE_TURNOVER'))
            .renderWith(function (data, type, full) {
                return $filter('currency')(data.sale.saleReturn, '€', 2);
            })
            .notVisible(),
        DTColumnBuilder.newColumn(null).withTitle($translate('COMMON_CONTAINER_SALE_PROFIT'))
            .renderWith(function (data, type, full) {
                return $filter('currency')(data.sale.saleProfit, '€', 2);
            })
            .notVisible(),
        DTColumnBuilder.newColumn('processor.username').withTitle($translate('COMMON_PROCESSOR'))
            .notVisible(),
        DTColumnBuilder.newColumn(null).withTitle($translate('COMMON_STATUS'))
            .withClass('text-center')
            .renderWith(addStatusStyle),
        DTColumnBuilder.newColumn(null).withTitle('<span class="glyphicon glyphicon-cog"></span>').withClass('text-center')
            .notSortable()
            .renderWith(addActionsButtons)
    ];

    if ($rootScope.language == 'de') {
        vm.dtOptions.withLanguageSource('/app/datatablesTranslationFiles/German.json');
    } else {
        vm.dtOptions.withLanguageSource('/app/datatablesTranslationFiles/English.json');
    }

    vm.refreshData = refreshData;
    function refreshData() {
        var resetPaging = true;
        this.dtInstance.reloadData(resetPaging);
    }

    vm.changeDataInput = changeDataInput;
    function changeDataInput() {

        if (vm.loadAllData == true) {
            return vm.processesService.getProcessBySale().$promise;
        }
        else {
            return vm.processesService.getLatest100Sales().$promise;
        }
    }

    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        vm.compile(angular.element(row).contents())(vm.scope);
    }

    function addActionsButtons(data, type, full, meta) {
        vm.processes[data.id] = data;
        var hasRightToDelete = '';
        if ($rootScope.globals.currentUser.role == 'user') {
            hasRightToDelete = 'disabled';
        }
        return '<button class="btn btn-white" ng-click="sale.loadDataToModal(sale.processes[' + data.id + '])" data-toggle="modal"' +
            'data-target="#editModal" title="{{ \'SALE_EDIT_SALE\' | translate }}">' +
            '<i class="fa fa-edit"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-white"' + hasRightToDelete + ' ng-click="sale.deleteRow(sale.processes[' + data.id + '])" title="{{ \'SALE_DELETE_SALE\' | translate }}">' +
            '   <i class="fa fa-trash-o"></i>' +
            '</button>';
    }

    function addStatusStyle(data, type, full, meta) {
        return '<div style="color: #1872ab;">' + $translate.instant('COMMON_STATUS_SALE') + '</div>'
    }

    function addDetailButton(data, type, full, meta) {
        vm.processes[data.id] = data;
        return '<a class="green shortinfo" href="javascript:;"' +
            'ng-click="sale.appendChildRow(sale.processes[' + data.id + '], $event)" title="Details">' +
            '<i class="glyphicon glyphicon-plus-sign"/></a>';
    }
}

SalesCtrl.prototype.appendChildRow = function (process, event) {
    var childScope = this.scope.$new(true);
    childScope.saleChildData = process;
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
        row.child(this.compile('<div childrow type="sale" class="clearfix"></div>')(childScope)).show();
        tr.addClass('shown');
    }
};




