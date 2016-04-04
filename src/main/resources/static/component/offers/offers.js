'use strict';
angular.module('app.offers', ['ngResource']).controller('OffersCtrl', OffersCtrl);
OffersCtrl.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', '$compile', '$scope', 'toaster', 'Processes', '$filter', 'Profile', '$rootScope', '$translate'];
function OffersCtrl(DTOptionsBuilder, DTColumnBuilder, $compile, $scope, toaster, Processes, $filter, Profile, $rootScope, $translate) {

    var vm = this;
    this.filter = $filter;
    this.processesService = Processes;
    this.userService = Profile;
    this.user = {};
    this.windowWidth = $(window).width();
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
    this.newOffer = {};
    this.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            return vm.processesService.getProcessByOfferAndStatus({status: 'offer'}).$promise;
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
                    columns: [6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15],
                    modifier: {
                        page: 'current'
                    }
                }
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: [6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15],
                    modifier: {
                        page: 'current'
                    }
                }
            },
            {
                extend: 'csvHtml5',
                title: $translate('OFFER_OFFERS'),
                exportOptions: {
                    columns: [6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15],
                    modifier: {
                        page: 'current'
                    }

                }
            },
            {
                extend: 'excelHtml5',
                title: $translate.instant('OFFER_OFFERS'),
                exportOptions: {
                    columns: [6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15],
                    modifier: {
                        page: 'current'
                    }
                }
            },
            {
                extend: 'pdfHtml5',
                title: $translate('OFFER_OFFERS'),
                orientation: 'landscape',
                exportOptions: {
                    columns: [6, 1, 2, 7, 10, 11, 12, 8, 9, 13, 14],
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
        DTColumnBuilder.newColumn('offer.prospect.lastname').withTitle($translate('COMMON_NAME'))
            .withClass('text-center'),
        DTColumnBuilder.newColumn('offer.prospect.company').withTitle($translate('COMMON_COMPANY'))
            .withClass('text-center'),
        DTColumnBuilder.newColumn('offer.prospect.email').withTitle($translate('COMMON_EMAIL'))
            .withClass('text-center'),
        DTColumnBuilder.newColumn('offer.timestamp').withTitle($translate('COMMON_DATE'))
            .withOption('type', 'date-euro')
            .withClass('text-center'),
        DTColumnBuilder.newColumn('offer.prospect.phone').withTitle($translate('COMMON_PHONE'))
            .notVisible(),
        DTColumnBuilder.newColumn('offer.prospect.firstname').withTitle($translate('COMMON_FIRSTNAME'))
            .notVisible(),
        DTColumnBuilder.newColumn('offer.container.name').withTitle($translate('COMMON_CONTAINER'))
            .notVisible(),
        DTColumnBuilder.newColumn('offer.deliveryAddress').withTitle($translate('COMMON_CONTAINER_DESTINATION'))
            .notVisible(),
        DTColumnBuilder.newColumn('offer.deliveryDate').withTitle($translate('COMMON_DELIVERY_TIME'))
            .notVisible(),
        DTColumnBuilder.newColumn('offer.containerAmount').withTitle($translate('COMMON_CONTAINER_AMOUNT'))
            .notVisible(),
        DTColumnBuilder.newColumn(null).withTitle($translate('COMMON_CONTAINER_SINGLE_PRICE'))
            .renderWith(function (data, type, full) {
                return $filter('currency')(data.offer.container.priceNetto, '€', 2);
            })
            .notVisible(),
        DTColumnBuilder.newColumn(null).withTitle($translate('COMMON_CONTAINER_ENTIRE_PRICE'))
            .renderWith(function (data, type, full) {
                return $filter('currency')(data.offer.container.priceNetto * data.offer.containerAmount, '€', 2);
            })
            .notVisible(),
        DTColumnBuilder.newColumn(null).withTitle($translate('COMMON_CONTAINER_OFFER_PRICE'))
            .renderWith(function (data, type, full) {
                return $filter('currency')(data.offer.offerPrice, '€', 2);
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
        vm.dtOptions.withLanguageSource('/application/app/datatablesTranslationFiles/German.json');
    } else {
        vm.dtOptions.withLanguageSource('/application/app/datatablesTranslationFiles/English.json');
    }

    vm.refreshData = refreshData;
    function refreshData() {
        var resetPaging = true;
        this.dtInstance.reloadData(resetPaging);
    }

    vm.changeDataInput = changeDataInput;
    function changeDataInput() {

        if (vm.loadAllData == true) {
            return vm.processesService.getProcessByOffer().$promise;
        }
        else {
            return vm.processesService.getProcessByOfferAndStatus({status: 'offer'}).$promise;
        }
    }

    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        vm.compile(angular.element(row).contents())(vm.scope);
    }

    function addActionsButtons(data, type, full, meta) {
        vm.processes[data.id] = data;
        var disabled = '';
        var hasRightToDelete = '';
        var closeOrOpenOfferDisable = '';
        var openOrLock = "{{ 'OFFER_CLOSE_OFFER' | translate }}";
        var faOpenOrLOck = 'fa fa-lock';
        if (data.status != 'offer') {
            disabled = 'disabled';
            openOrLock = "{{ 'OFFER_OPEN_OFFER' | translate }}";
            faOpenOrLOck = 'fa fa-unlock';
        }
        if (data.sale != null) {
            closeOrOpenOfferDisable = 'disabled';
        }
        if ($rootScope.globals.currentUser.role == 'user') {
            hasRightToDelete = 'disabled';
        }
        if (vm.windowWidth > 1200) {
            return '<button class="btn btn-white" ' + disabled + ' ng-click="offer.followUp(offer.processes[' + data.id + '])" title="{{ \'OFFER_FOLLOW_UP\' | translate }}">' +
                '   <i class="fa fa-check"></i>' +
                '</button>&nbsp;' +
                '<button class="btn btn-white" ' + closeOrOpenOfferDisable + ' ng-click="offer.closeOrOpenOffer(offer.processes[' + data.id + '])" title="' + openOrLock + '">' +
                '   <i class="' + faOpenOrLOck + '"></i>' +
                '</button>&nbsp;' +
                '<button class="btn btn-white" ' + closeOrOpenOfferDisable + ' ng-click="offer.loadDataToModal(offer.processes[' + data.id + '])" data-toggle="modal"' +
                'data-target="#editModal" title="{{ \'OFFER_EDIT_OFFER\' | translate }}">' +
                '<i class="fa fa-edit"></i>' +
                '</button>&nbsp;' +
                '<button class="btn btn-white"' + hasRightToDelete + ' ng-click="offer.deleteRow(offer.processes[' + data.id + '])" title="{{ \'OFFER_DELETE_OFFER\' | translate }}">' +
                '   <i class="fa fa-trash-o"></i>' +
                '</button>';
        }
        else {
            return '<div class="dropdown">' +
                '<button class="btn btn-white dropdown-toggle" type="button" data-toggle="dropdown">' +
                '<i class="fa fa-wrench"></i></button>' +
                '<ul class="dropdown-menu pull-right">' +
                '<li><button style="width: 100%; text-align: left;" class="btn btn-white" ' + disabled + ' ng-click="offer.followUp(offer.processes[' + data.id + '])"><i class="fa fa-check">&nbsp;</i>{{\'OFFER_FOLLOW_UP\' | translate }}</button></li>' +
                '<li><button style="width: 100%; text-align: left;" class="btn btn-white" ' + closeOrOpenOfferDisable + ' ng-click="offer.closeOrOpenOffer(offer.processes[' + data.id + '])"><i class="' + faOpenOrLOck + '">&nbsp;</i>' + openOrLock + '</button></li>' +
                '<li><button style="width: 100%; text-align: left;" class="btn btn-white" ' + closeOrOpenOfferDisable + ' ng-click="offer.loadDataToModal(offer.processes[' + data.id + '])"><i class="fa fa-edit"">&nbsp;</i>{{\'OFFER_EDIT_OFFER\' | translate }}</button></li>' +
                '<li><button style="width: 100%; text-align: left;" class="btn btn-white" ' + hasRightToDelete + ' ng-click="offer.deleteRow(offer.processes[' + data.id + '])"><i class="fa fa-trash-o">&nbsp;</i>{{\'OFFER_DELETE_OFFER\' | translate }}</button></li>' +
                '</ul>' +
                '</div>'
        }
    }

    function addStatusStyle(data, type, full, meta) {
        vm.processes[data.id] = data;
        if (data.status == 'open') {
            return '<div style="color: green;">' + $translate.instant('COMMON_STATUS_OPEN') + '</div>'
        }
        else if (data.status == 'offer') {
            return '<div style="color: green;">' + $translate.instant('COMMON_STATUS_OPEN') + '</div>'
        }
        else if (data.status == 'sale') {
            return '<div style="color: #1872ab;">' + $translate.instant('COMMON_STATUS_SALE') + '</div>'
        }
        else if (data.status == 'closed') {
            return '<div style="color: #ea394c;">' + $translate.instant('COMMON_STATUS_CLOSED') + '</div>'
        }
    }

    function addDetailButton(data, type, full, meta) {
        vm.processes[data.id] = data;
        return '<a class="green shortinfo" href="javascript:;"' +
            'ng-click="offer.appendChildRow(offer.processes[' + data.id + '], $event)" title="Details">' +
            '<i class="glyphicon glyphicon-plus-sign"/></a>';
    }
}

OffersCtrl.prototype.appendChildRow = function (process, event) {
    var childScope = this.scope.$new(true);
    childScope.offerChildData = process;
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
        row.child(this.compile('<div childrow type="offer" class="clearfix"></div>')(childScope)).show();
        tr.addClass('shown');
    }
};




