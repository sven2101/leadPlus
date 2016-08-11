/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH. All rights reserved.
 * 
 * NOTICE: All information contained herein is, and remains the property of
 * Eviarc GmbH and its suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to Eviarc GmbH, and are protected
 * by trade secret or copyright law. Dissemination of this information or
 * reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Eviarc GmbH.
 ******************************************************************************/

'use strict';
angular.module('app.sales', ['ngResource']).controller('SalesCtrl', SalesCtrl);

SalesCtrl.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', '$compile',
	'$scope', 'toaster', 'ProcessResource', 'CommentResource', '$filter',
	'UserResource', '$rootScope', '$translate', 'SaleResource', 'ProductService', 'WorkflowService'];
	
function SalesCtrl(DTOptionsBuilder, DTColumnBuilder, $compile, $scope,
	toaster, ProcessResource, CommentResource, $filter, UserResource,
	$rootScope, $translate, SaleResource, ProductService, WorkflowService) {

	var vm = this;
	this.filter = $filter;
	this.processResource = ProcessResource;
	this.commentResource = CommentResource;
	this.saleResource = SaleResource;
	this.userResource = UserResource;
	this.workflowService = WorkflowService;
	this.productService = ProductService;
	this.user = {};
	if (!angular.isUndefined($rootScope.globals.currentUser))
		this.userResource.get({
			id: $rootScope.globals.currentUser.id
		}).$promise.then(function (result) {
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
	this.currentOrderPositions = [];
    this.currentProductId = "-1";
    this.currentProductAmount = 1;
	this.dtInstance = {};
	this.processes = {};
	this.rows = {};
	this.editProcess = {};
	this.newSale = {};
	this.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
		url: '/api/rest/processes/sales/latest/100',
		error: function (xhr, error, thrown) {
			console.log(xhr);
		},
		type: 'GET'
	}).withDOM(
		'<"row"<"col-sm-12"l>>' + '<"row"<"col-sm-6"B><"col-sm-6"f>>'
		+ '<"row"<"col-sm-12"tr>>'
		+ '<"row"<"col-sm-5"i><"col-sm-7"p>>').withPaginationType(
		'full_numbers').withOption('stateSave', true).withButtons([{
			extend: 'copyHtml5',
			exportOptions: {
				columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
				modifier: {
					page: 'current'
				}
			}
		}, {
				extend: 'print',
				exportOptions: {
					columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
					modifier: {
						page: 'current'
					}
				}
			}, {
				extend: 'csvHtml5',
				title: $translate('SALE_SALES'),
				exportOptions: {
					columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
					modifier: {
						page: 'current'
					}

				}
			}, {
				extend: 'excelHtml5',
				title: $translate.instant('SALE_SALES'),
				exportOptions: {
					columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
					modifier: {
						page: 'current'
					}
				}
			}, {
				extend: 'pdfHtml5',
				title: $translate('SALE_SALES'),
				orientation: 'landscape',
				exportOptions: {
					columns: [6, 1, 2, 8, 7, 9, 10, 11, 12, 13, 14],
					modifier: {
						page: 'current'
					}
				}
			}]).withBootstrap().withOption('createdRow', createdRow).withOption(
		'order', [4, 'desc']);
	this.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').notSortable()
			.renderWith(addDetailButton),
		DTColumnBuilder.newColumn('sale.customer.lastname').withTitle(
			$translate('COMMON_NAME')).withClass('text-center'),
		DTColumnBuilder.newColumn('sale.customer.company').withTitle(
			$translate('COMMON_COMPANY')).withClass('text-center'),
		DTColumnBuilder.newColumn('sale.customer.email').withTitle(
			$translate('COMMON_EMAIL')).withClass('text-center'),
		DTColumnBuilder.newColumn('sale.timestamp').withTitle(
			$translate('COMMON_DATE')).withOption('type', 'date-euro')
			.withClass('text-center'),
		DTColumnBuilder.newColumn('sale.customer.phone').withTitle(
			$translate('COMMON_PHONE')).notVisible(),
		DTColumnBuilder.newColumn('sale.customer.firstname').withTitle(
			$translate('COMMON_FIRSTNAME')).notVisible(),
		DTColumnBuilder.newColumn('sale.customer.lastname').withTitle(
			$translate('COMMON_CONTAINER')).notVisible(),
		DTColumnBuilder.newColumn('sale.transport').withTitle(
			$translate('COMMON_CONTAINER_DESTINATION')).notVisible(),
		DTColumnBuilder.newColumn('sale.customer.lastname').withTitle(
			$translate('COMMON_CONTAINER_AMOUNT')).notVisible(),
		DTColumnBuilder.newColumn(null).withTitle(
			$translate('COMMON_CONTAINER_SINGLE_PRICE')).renderWith(
			function (data, type, full) {
				return $filter('currency')(
					0, '€', 2);
			}).notVisible(),
		DTColumnBuilder.newColumn(null).withTitle(
			$translate('COMMON_CONTAINER_ENTIRE_PRICE')).renderWith(
			function (data, type, full) {
				return $filter('currency')(
					0, '€', 2);
			}).notVisible(),
		DTColumnBuilder.newColumn(null).withTitle(
			$translate('COMMON_CONTAINER_SALE_TURNOVER')).renderWith(
			function (data, type, full) {
				if (isNullOrUndefined(data.sale.saleReturn)) {
					return $filter("currency")(0, "€", 2);
				}
				return $filter('currency')
					(data.sale.saleReturn, '€', 2);
			}).notVisible(),
		DTColumnBuilder.newColumn(null).withTitle(
			$translate('COMMON_CONTAINER_SALE_PROFIT')).renderWith(
			function (data, type, full) {
				if (isNullOrUndefined(data.sale.saleProfit)) {
					return $filter("currency")(0, "€", 2);
				}
				return $filter('currency')
					(data.sale.saleProfit, '€', 2);
			}).notVisible(),
		DTColumnBuilder.newColumn('processor.username').withTitle(
			$translate('COMMON_PROCESSOR')).notVisible(),
		DTColumnBuilder.newColumn(null).withTitle(
			$translate('COMMON_STATUS')).withClass('text-center')
			.renderWith(addStatusStyle),
		DTColumnBuilder.newColumn(null).withTitle(
			'<span class="glyphicon glyphicon-cog"></span>').withClass(
			'text-center').notSortable().renderWith(addActionsButtons)];

	if ($rootScope.language == 'de') {
		vm.dtOptions
			.withLanguageSource('/assets/datatablesTranslationFiles/German.json');
	} else {
		vm.dtOptions
			.withLanguageSource('/assets/datatablesTranslationFiles/English.json');
	}

	vm.refreshData = refreshData;
	function refreshData() {
		var resetPaging = false;
		this.dtInstance.reloadData(resetPaging);
	}

	vm.changeDataInput = changeDataInput;
	function changeDataInput() {
		if (vm.loadAllData == true) {
			vm.dtOptions.withOption('serverSide', true).withOption('ajax', {
				url: '/api/rest/processes/sales',
				type: 'GET',
				pages: 5,
				dataSrc: 'data',
				error: function (xhr, error, thrown) {
					console.log(xhr);
				}
			}).withOption('searchDelay', 500);
		} else {
			vm.dtOptions.withOption('serverSide', false).withOption('ajax', {
				url: '/api/rest/processes/sales/latest/100',
				error: function (xhr, error, thrown) {
					console.log(xhr);
				},
				type: 'GET'
			}).withOption('searchDelay', 0);
		}
	}

	function createdRow(row, data, dataIndex) {
		// Recompiling so we can bind Angular directive to the DT
		vm.rows[data.id] = row;
		vm.compile(angular.element(row).contents())(vm.scope);
	}

	function addActionsButtons(data, type, full, meta) {
		vm.processes[data.id] = data;
		var hasRightToDelete = '';
		if ($rootScope.globals.currentUser.role == 'USER') {
			hasRightToDelete = 'disabled';
		}
		return '<button class="btn btn-white" ng-click="sale.loadDataToModal(sale.processes['
			+ data.id
			+ '])" data-toggle="modal"'
			+ 'data-target="#editModal" title="'
			+ $translate.instant('SALE_EDIT_SALE')
			+ '">'
			+ '<i class="fa fa-edit"></i>'
			+ '</button>&nbsp;'
			+ '<button class="btn btn-white"'
			+ hasRightToDelete
			+ ' ng-click="sale.deleteRow(sale.processes['
			+ data.id
			+ '])" title="'
			+ $translate.instant('SALE_DELETE_SALE')
			+ '">'
			+ '   <i class="fa fa-trash-o"></i>' + '</button>';
	}

	function addStatusStyle(data, type, full, meta) {
		return '<div style="color: #1872ab;">'
			+ $translate.instant('COMMON_STATUS_SALE') + '</div>'
	}

	function addDetailButton(data, type, full, meta) {
		vm.processes[data.id] = data;
		return '<a class="green shortinfo" href="javascript:;"'
			+ 'ng-click="sale.appendChildRow(sale.processes[' + data.id
			+ '], $event)" title="Details">'
			+ '<i class="glyphicon glyphicon-plus-sign"/></a>';
	}
}

SalesCtrl.prototype.getOrderPositions = function (process) {
	return process.sale.orderPositions;
}

SalesCtrl.prototype.appendChildRow = function (process, event) {
	var childScope = this.scope.$new(true);
	childScope.childData = process;
	var vm = this;
	this.commentResource.getByProcessId({
		id: process.id
	}).$promise.then(function (result) {
		vm.comments[process.id] = [];
		for (var comment in result) {
			if (comment == '$promise')
				break;
			vm.comments[process.id].push({
				commentText: result[comment].commentText,
				timestamp: result[comment].timestamp,
				creator: result[comment].creator
			});
		}
	});
	childScope.parent = this;

	var link = angular.element(event.currentTarget), icon = link
		.find('.glyphicon'), tr = link.parent().parent(), table = this.dtInstance.DataTable, row = table
			.row(tr);

	if (row.child.isShown()) {
		icon.removeClass('glyphicon-minus-sign')
			.addClass('glyphicon-plus-sign');
		row.child.hide();
		tr.removeClass('shown');
	} else {
		icon.removeClass('glyphicon-plus-sign')
			.addClass('glyphicon-minus-sign');
		row.child(
			this.compile(
				'<div childrow type="sale" class="clearfix"></div>')(
				childScope)).show();
		tr.addClass('shown');
	}
};
