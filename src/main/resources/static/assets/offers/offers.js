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
angular.module('app.offers', [ 'ngResource' ]).controller('OffersCtrl',
		OffersCtrl);
OffersCtrl.$inject = [ 'DTOptionsBuilder', 'DTColumnBuilder', '$compile',
		'$scope', 'toaster', 'ProcessResource', 'CommentResource', '$filter',
		'UserResource', '$rootScope', '$translate', 'OfferResource' ];
function OffersCtrl(DTOptionsBuilder, DTColumnBuilder, $compile, $scope,
		toaster, ProcessResource, CommentResource, $filter, UserResource,
		$rootScope, $translate, OfferResource) {

	var vm = this;
	this.filter = $filter;
	this.processResource = ProcessResource;
	this.commentResource = CommentResource;
	this.userResource = UserResource;
	this.offerResource = OfferResource;
	this.user = {};
	this.windowWidth = $(window).width();
	if (!angular.isUndefined($rootScope.globals.currentUser))
		this.userResource.get({
			id : $rootScope.globals.currentUser.id
		}).$promise.then(function(result) {
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
	this.rows = {};
	this.editProcess = {};
	this.newOffer = {};
	this.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
		url : '/api/rest/processes/workflow/OFFER/state/OFFER',
		error : function(xhr, error, thrown) {
			console.log(xhr);
		},
		type : 'GET'
	}).withDOM(
			'<"row"<"col-sm-12"l>>' + '<"row"<"col-sm-6"B><"col-sm-6"f>>'
					+ '<"row"<"col-sm-12"tr>>'
					+ '<"row"<"col-sm-5"i><"col-sm-7"p>>').withPaginationType(
			'full_numbers').withOption('stateSave', true).withButtons([ {
		extend : 'copyHtml5',
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15 ],
			modifier : {
				page : 'current'
			}
		}
	}, {
		extend : 'print',
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15 ],
			modifier : {
				page : 'current'
			}
		}
	}, {
		extend : 'csvHtml5',
		title : $translate('OFFER_OFFERS'),
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15 ],
			modifier : {
				page : 'current'
			}

		}
	}, {
		extend : 'excelHtml5',
		title : $translate.instant('OFFER_OFFERS'),
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15 ],
			modifier : {
				page : 'current'
			}
		}
	}, {
		extend : 'pdfHtml5',
		title : $translate('OFFER_OFFERS'),
		orientation : 'landscape',
		exportOptions : {
			columns : [ 6, 1, 2, 7, 10, 11, 12, 8, 9, 13, 14 ],
			modifier : {
				page : 'current'
			}
		}
	} ]).withBootstrap().withOption('createdRow', createdRow).withOption(
			'order', [ 4, 'desc' ]);
	this.dtColumns = [
			DTColumnBuilder.newColumn(null).withTitle('').notSortable()
					.renderWith(addDetailButton),
			DTColumnBuilder.newColumn('offer.prospect.lastname').withTitle(
					$translate('COMMON_NAME')).withClass('text-center'),
			DTColumnBuilder.newColumn('offer.prospect.company').withTitle(
					$translate('COMMON_COMPANY')).withClass('text-center'),
			DTColumnBuilder.newColumn('offer.prospect.email').withTitle(
					$translate('COMMON_EMAIL')).withClass('text-center'),
			DTColumnBuilder.newColumn('offer.timestamp').withTitle(
					$translate('COMMON_DATE')).withOption('type', 'date-euro')
					.withClass('text-center'),
			DTColumnBuilder.newColumn('offer.prospect.phone').withTitle(
					$translate('COMMON_PHONE')).notVisible(),
			DTColumnBuilder.newColumn('offer.prospect.firstname').withTitle(
					$translate('COMMON_FIRSTNAME')).notVisible(),
			DTColumnBuilder.newColumn('offer.container.name').withTitle(
					$translate('COMMON_CONTAINER')).notVisible(),
			DTColumnBuilder.newColumn('offer.deliveryAddress').withTitle(
					$translate('COMMON_CONTAINER_DESTINATION')).notVisible(),
			DTColumnBuilder.newColumn('offer.deliveryDate').withTitle(
					$translate('COMMON_DELIVERY_TIME')).notVisible(),
			DTColumnBuilder.newColumn('offer.containerAmount').withTitle(
					$translate('COMMON_CONTAINER_AMOUNT')).notVisible(),
			DTColumnBuilder.newColumn(null).withTitle(
					$translate('COMMON_CONTAINER_SINGLE_PRICE')).renderWith(
					function(data, type, full) {
						return $filter('currency')(
								data.offer.container.priceNetto, '€', 2);
					}).notVisible(),
			DTColumnBuilder.newColumn(null).withTitle(
					$translate('COMMON_CONTAINER_ENTIRE_PRICE')).renderWith(
					function(data, type, full) {
						return $filter('currency')(
								data.offer.container.priceNetto
										* data.offer.containerAmount, '€', 2);
					}).notVisible(),
			DTColumnBuilder.newColumn(null).withTitle(
					$translate('COMMON_CONTAINER_OFFER_PRICE')).renderWith(
					function(data, type, full) {
						return $filter('currency')(data.offer.offerPrice, '€',
								2);
					}).notVisible(),
			DTColumnBuilder.newColumn('processor.username').withTitle(
					$translate('COMMON_PROCESSOR')).notVisible(),
			DTColumnBuilder.newColumn(null).withTitle(
					$translate('COMMON_STATUS')).withClass('text-center')
					.renderWith(addStatusStyle),
			DTColumnBuilder.newColumn(null).withTitle(
					'<span class="glyphicon glyphicon-cog"></span>').withClass(
					'text-center').notSortable().renderWith(addActionsButtons) ];

	if ($rootScope.language == 'DE') {
		vm.dtOptions
				.withLanguageSource('/assets/datatablesTranslationFiles/German.json');
	} else {
		vm.dtOptions
				.withLanguageSource('/assets/datatablesTranslationFiles/English.json');
	}

	vm.refreshData = refreshData;
	function refreshData() {
		var resetPaging = true;
		this.dtInstance.reloadData(resetPaging);
	}

	vm.changeDataInput = changeDataInput;
	function changeDataInput() {
		if (vm.loadAllData == true) {
			vm.dtOptions.withOption('serverSide', true).withOption('ajax', {
				url : '/api/rest/processes/offers',
				type : 'GET',
				pages : 5,
				dataSrc : 'data',
				error : function(xhr, error, thrown) {
					console.log(xhr);
				}
			}).withOption('searchDelay', 500);
		} else {
			vm.dtOptions.withOption('serverSide', false).withOption('ajax', {
				url : '/api/rest/processes/workflow/OFFER/state/OFFER',
				error : function(xhr, error, thrown) {
					console.log(xhr);
				},
				type : 'GET'
			}).withOption('searchDelay', 0);
		}
	}

	function createdRow(row, data, dataIndex) {
		// Recompiling so we can bind Angular directive to the DT
		vm.rows[data.id] = row;
		var currentDate = moment(moment(), "DD.MM.YYYY");
		var offerDate = moment(data.offer.timestamp, "DD.MM.YYYY");
		if ((currentDate.businessDiff(offerDate, 'days') > 3 && data.status == 'OFFER')
				|| (currentDate.businessDiff(offerDate, 'days') > 5 && data.status == 'FOLLOWUP'))
			$(row).addClass('important');
		vm.compile(angular.element(row).contents())(vm.scope);
	}

	function addActionsButtons(data, type, full, meta) {
		vm.processes[data.id] = data;
		var disabled = '';
		var hasRightToDelete = '';
		var closeOrOpenOfferDisable = '';
		var disableFollowUp = '';
		var openOrLock = $translate.instant('OFFER_CLOSE_OFFER');
		var faOpenOrLOck = 'fa fa-lock';
		if (data.status != 'OFFER' && data.status != 'FOLLOWUP') {
			disableFollowUp = 'disabled';
			disabled = 'disabled';
			openOrLock = $translate.instant('OFFER_OPEN_OFFER');
			faOpenOrLOck = 'fa fa-unlock';
		}
		if (data.status == 'FOLLOWUP') {
			disableFollowUp = 'disabled';
		}
		if (data.sale != null) {
			closeOrOpenOfferDisable = 'disabled';
		}
		if ($rootScope.globals.currentUser.role == 'USER') {
			hasRightToDelete = 'disabled';
		}
		if (vm.windowWidth > 1300) {
			return '<div style="white-space: nowrap;"><button class="btn btn-white" '
					+ disabled
					+ ' ng-click="offer.createSale(offer.processes['
					+ data.id
					+ '])" title="'
					+ $translate.instant('OFFER_CREATE_SALE')
					+ '">'
					+ ' <i class="fa fa-check"></i>'
					+ '</button>&nbsp;'
					+ '<button class="btn btn-white" '
					+ disableFollowUp
					+ ' ng-click="offer.followUp(offer.processes['
					+ data.id
					+ '])" title="'
					+ $translate.instant('OFFER_FOLLOW_UP')
					+ '">'
					+ '<i class="fa fa-eye"></i>'
					+ '</button>&nbsp;'
					+ '<button class="btn btn-white" '
					+ closeOrOpenOfferDisable
					+ ' ng-click="offer.closeOrOpenOffer(offer.processes['
					+ data.id
					+ '])" title="'
					+ openOrLock
					+ '">'
					+ '   <i class="'
					+ faOpenOrLOck
					+ '"></i>'
					+ '</button>&nbsp;'
					+ '<button class="btn btn-white" '
					+ closeOrOpenOfferDisable
					+ ' ng-click="offer.loadDataToModal(offer.processes['
					+ data.id
					+ '])" data-toggle="modal"'
					+ 'data-target="#editModal" title="'
					+ $translate.instant('OFFER_EDIT_OFFER')
					+ '">'
					+ '<i class="fa fa-edit"></i>'
					+ '</button>&nbsp;'
					+ '<button class="btn btn-white"'
					+ hasRightToDelete
					+ ' ng-click="offer.deleteRow(offer.processes['
					+ data.id
					+ '])" title="'
					+ $translate.instant('OFFER_DELETE_OFFER')
					+ '">'
					+ '   <i class="fa fa-trash-o"></i>'
					+ '</button></div>';
		} else {
			return '<div class="dropdown">'
					+ '<button class="btn btn-white dropdown-toggle" type="button" data-toggle="dropdown">'
					+ '<i class="fa fa-wrench"></i></button>'
					+ '<ul class="dropdown-menu pull-right">'
					+ '<li><button style="width: 100%; text-align: left;" class="btn btn-white" '
					+ disabled
					+ ' ng-click="offer.createSale(offer.processes['
					+ data.id
					+ '])"><i class="fa fa-check">&nbsp;</i>'
					+ $translate.instant('OFFER_CREATE_SALE')
					+ '</button></li>'
					+ '<li><button style="width: 100%; text-align: left;" class="btn btn-white" '
					+ disableFollowUp
					+ ' ng-click="offer.followUp(offer.processes['
					+ data.id
					+ '])"><i class="fa fa-eye">&nbsp;</i>'
					+ $translate.instant('OFFER_FOLLOW_UP')
					+ '</button></li>'
					+ '<li><button style="width: 100%; text-align: left;" class="btn btn-white" '
					+ closeOrOpenOfferDisable
					+ ' ng-click="offer.closeOrOpenOffer(offer.processes['
					+ data.id
					+ '])"><i class="'
					+ faOpenOrLOck
					+ '">&nbsp;</i>'
					+ openOrLock
					+ '</button></li>'
					+ '<li><button style="width: 100%; text-align: left;" class="btn btn-white" '
					+ closeOrOpenOfferDisable
					+ ' data-toggle="modal" data-target="#editModal" ng-click="offer.loadDataToModal(offer.processes['
					+ data.id
					+ '])"><i class="fa fa-edit"">&nbsp;</i>'
					+ $translate.instant('OFFER_EDIT_OFFER')
					+ '</button></li>'
					+ '<li><button style="width: 100%; text-align: left;" class="btn btn-white" '
					+ hasRightToDelete
					+ ' ng-click="offer.deleteRow(offer.processes['
					+ data.id
					+ '])"><i class="fa fa-trash-o">&nbsp;</i>'
					+ $translate.instant('OFFER_DELETE_OFFER')
					+ '</button></li>' + '</ul>' + '</div>'
		}
	}

	function addStatusStyle(data, type, full, meta) {
		vm.processes[data.id] = data;
		if (data.status == 'OFFER' || data.status == 'OPEN') {
			return '<div style="color: green;">'
					+ $translate.instant('COMMON_STATUS_OPEN') + '</div>'
		} else if (data.status == 'FOLLOWUP') {
			return '<div style="color: #f79d3c;">'
					+ $translate.instant('COMMON_STATUS_FOLLOW_UP') + '</div>'
		} else if (data.status == 'SALE') {
			return '<div style="color: #1872ab;">'
					+ $translate.instant('COMMON_STATUS_SALE') + '</div>'
		} else if (data.status == 'CLOSED') {
			return '<div style="color: #ea394c;">'
					+ $translate.instant('COMMON_STATUS_CLOSED') + '</div>'
		}
	}

	function addDetailButton(data, type, full, meta) {
		vm.processes[data.id] = data;
		return '<a class="green shortinfo" href="javascript:;"'
				+ 'ng-click="offer.appendChildRow(offer.processes[' + data.id
				+ '], $event)" title="Details">'
				+ '<i class="glyphicon glyphicon-plus-sign"/></a>';
	}
}

OffersCtrl.prototype.appendChildRow = function(process, event) {
	var childScope = this.scope.$new(true);
	childScope.childData = process;
	var vm = this;
	this.commentResource.getByProcessId({
		id : process.id
	}).$promise.then(function(result) {
		vm.comments[process.id] = [];
		for ( var comment in result) {
			if (comment == '$promise')
				break;
			vm.comments[process.id].push({
				commentText : result[comment].commentText,
				timestamp : result[comment].timestamp,
				creator : result[comment].creator
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
						'<div childrow type="offer" class="clearfix"></div>')(
						childScope)).show();
		tr.addClass('shown');
	}
};
