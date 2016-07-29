/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

'use strict';

angular.module('app.dashboard', ['ngResource']).controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['toaster', 'Processes', 'Comments', '$filter', '$translate', '$rootScope', '$scope', '$interval', 'Profile', 'Leads', 'Offers', 'Sales', 'Profit', 'Turnover'];

function DashboardCtrl(toaster, Processes, Comments, $filter, $translate, $rootScope, $scope, $interval, Profile, Leads, Offers, Sales, Profit, Turnover) {

    var vm = this;
    this.toaster = toaster;
    this.filter = $filter;
    this.orderBy = $filter('orderBy');
    this.translate = $translate;
    this.rootScope = $rootScope;
    this.processesService = Processes;
    this.commentsService = Comments;
    this.commentModalInput = '';
    this.comments = {};
    this.infoData = {};
    this.infoType = '';
    this.infoProcess = {};
    this.infoComments = [];

    this.leadsAmount = {};
    this.offersAmount = {};
    this.salesAmount = {};
    this.profit = {};
    this.turnover = {};
    this.conversionRate = {};

    Processes.getProcessByLeadAndStatus({status: 'open'}).$promise.then(function (result) {
        vm.openLead = vm.orderBy(result, 'lead.timestamp', false);
    });
    Processes.getProcessByOfferAndStatus({status: 'offer'}).$promise.then(function (result) {
        vm.openOffer = vm.orderBy(result, 'offer.timestamp', false);
    });
    Processes.getLatestSales().$promise.then(function (result) {
        vm.sales = result;
    });

    this.user = {};
    if (!angular.isUndefined($rootScope.globals.currentUser))
        Profile.get({username: $rootScope.globals.currentUser.username}).$promise.then(function (result) {
            vm.user = result;
        });

    this.sortableOptions = {
        update: function (e, ui) {
            var target = ui.item.sortable.droptargetModel;
            var source = ui.item.sortable.sourceModel;
            if ((vm.openLead == target && vm.openOffer == source) ||
                (vm.openLead == source && vm.sales == target) ||
                target == source) {
                ui.item.sortable.cancel();
            }
        },
        stop: function (e, ui) {
            var target = ui.item.sortable.droptargetModel;
            var source = ui.item.sortable.sourceModel;
            var item = ui.item.sortable.model;
            if (vm.sales == target && vm.openOffer == source) {
                vm.addOfferToSale(item);
            }
            else if (vm.openOffer == target && vm.openLead == source) {
                vm.addLeadToOffer(item);
            }
        },
        connectWith: ".connectList",
        items: "li:not(.not-sortable)"
    };

    var stop;
    $scope.$on('$destroy', function () {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    });
    stop = $interval(function () {
        vm.refreshData();
    }.bind(this), 200000);

    this.leadsService = Leads;
    this.offersService = Offers;
    this.salesService = Sales;
    this.profitService = Profit;
    this.turnoverService = Turnover;

    this.leadsService.week().$promise.then(function (result) {
        vm.getLeads(result);
        vm.salesService.week().$promise.then(function (result) {
            vm.getSales(result);
        });
    });
    vm.offersService.week().$promise.then(function (result) {
        vm.getOffers(result);
    });
    vm.profitService.week().$promise.then(function (result) {
        vm.getProfit(result);
    });
    vm.turnoverService.week().$promise.then(function (result) {
        vm.getTurnover(result);
    });


}

DashboardCtrl.prototype.addLeadToOffer = function (process) {
    var vm = this;
    var offer = {
        container: {
            name: process.lead.container.name,
            description: process.lead.container.description,
            priceNetto: process.lead.container.priceNetto
        },
        containerAmount: process.lead.containerAmount,
        deliveryAddress: process.lead.destination,
        offerPrice: (process.lead.containerAmount * process.lead.container.priceNetto),
        prospect: {
            company: process.lead.inquirer.company,
            email: process.lead.inquirer.email,
            firstname: process.lead.inquirer.firstname,
            lastname: process.lead.inquirer.lastname,
            phone: process.lead.inquirer.phone,
            title: process.lead.inquirer.title
        },
        timestamp: this.filter('date')(new Date(), "dd.MM.yyyy HH:mm"),
        vendor: process.lead.vendor
    };
    this.processesService.addOffer({id: process.id}, offer).$promise.then(function () {
        vm.processesService.setStatus({id: process.id}, 'offer').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_NEW_OFFER'));
            vm.rootScope.leadsCount -= 1;
            vm.rootScope.offersCount += 1;
            vm.processesService.setProcessor({id: process.id}, vm.user.username).$promise.then(function () {
                process.processor = vm.user;
            });
            process.offer = offer;
            vm.openOffer = vm.orderBy(vm.openOffer, 'offer.timestamp', false);
        });
    });
};
DashboardCtrl.prototype.addOfferToSale = function (process) {
    var vm = this;
    var sale = {
        container: {
            name: process.offer.container.name,
            description: process.offer.container.description,
            priceNetto: process.offer.container.priceNetto
        },
        containerAmount: process.offer.containerAmount,
        transport: process.offer.deliveryAddress,
        customer: {
            company: process.offer.prospect.company,
            email: process.offer.prospect.email,
            firstname: process.offer.prospect.firstname,
            lastname: process.offer.prospect.lastname,
            phone: process.offer.prospect.phone,
            title: process.offer.prospect.title
        },
        saleProfit: 0,
        saleReturn: process.offer.offerPrice,
        timestamp: this.filter('date')(new Date(), 'dd.MM.yyyy HH:mm'),
        vendor: process.offer.vendor
    };
    this.processesService.addSale({id: process.id}, sale).$promise.then(function () {
        vm.processesService.setStatus({id: process.id}, 'sale').$promise.then(function () {
            vm.toaster.pop('success', '', vm.translate.instant('COMMON_TOAST_SUCCESS_NEW_SALE'));
            vm.rootScope.offersCount -= 1;
            process.sale = sale;
            vm.sales = vm.orderBy(vm.sales, 'sale.timestamp', true);
        });
    });
};

DashboardCtrl.prototype.saveDataToModal = function (info, type, process) {
    this.infoData = info;
    this.infoType = type;
    this.infoProcess = process;
    var vm = this;
    this.commentsService.getComments({id: process.id}).$promise.then(function (result) {
        vm.infoComments = [];
        for (var comment in result) {
            if (comment == '$promise')
                break;
            vm.infoComments.push({
                commentText: result[comment].commentText,
                timestamp: result[comment].timestamp,
                creator: result[comment].creator
            });
        }
    });
};
DashboardCtrl.prototype.refreshData = function () {
    var vm = this;
    this.processesService.getProcessByLeadAndStatus({status: 'open'}).$promise.then(function (result) {
        vm.openLead = vm.orderBy(result, 'lead.timestamp', false);
    });
    this.processesService.getProcessByOfferAndStatus({status: 'offer'}).$promise.then(function (result) {
        vm.openOffer = vm.orderBy(result, 'offer.timestamp', false);
    });
    this.processesService.getLatestSales().$promise.then(function (result) {
        vm.sales = result;
    });
};

DashboardCtrl.prototype.addComment = function (process) {
    var vm = this;
    if (angular.isUndefined(this.infoComments)) {
        this.infoComments = [];
    }
    if (this.commentModalInput != '' && !angular.isUndefined(this.commentModalInput)) {
        var comment = {
        	process: process,
        	creator: this.user,
        	commentText: this.commentModalInput,
        	timestamp: this.filter('date')(new Date(), 'dd.MM.yyyy HH:mm:ss')
        };
        this.commentsService.addComment(comment).$promise.then(function () {
            vm.infoComments.push(comment);
            vm.commentModalInput = '';
        });
    }
};

DashboardCtrl.prototype.getProfit = function (profits) {
    var summe = 0;
    for (var profit in profits.result) {
        summe = summe + profits.result[profit];
    }
    this.profit = summe;
};

DashboardCtrl.prototype.getTurnover = function (turnovers) {
    var summe = 0;
    for (var turnover in turnovers.result) {
        summe = summe + turnovers.result[turnover];
    }
    this.turnover = summe;
};

DashboardCtrl.prototype.getLeads = function (leads) {
    var summe = 0;
    for (var lead in leads.result) {
        summe += leads.result[lead];
    }
    this.leadsAmount = summe;
};

DashboardCtrl.prototype.getOffers = function (offers) {
    var summe = 0;
    for (var offer in offers.result) {
        summe += offers.result[offer];
    }
    this.offersAmount = summe;
};

DashboardCtrl.prototype.getSales = function (sales) {
    var summe = 0;
    for (var sale in sales.result) {
        summe += sales.result[sale];
    }
    this.salesAmount = summe;
    this.getConversionrate();
};

DashboardCtrl.prototype.getConversionrate = function () {
    if (this.leadsAmount != 0) {
        this.conversionRate = (this.salesAmount / this.leadsAmount) * 100;
    }
    else
        this.conversionRate = 0;
};

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";
var LoginController = (function () {
    function LoginController($location, Auth, $scope, toaster, $rootScope, $translate) {
        this.$inject = ["$location", "Auth", "$scope", "toaster", "$rootScope", "$translate"];
        this.location = $location;
        this.auth = Auth;
        this.scope = $scope;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
    }
    LoginController.prototype.login = function (credentials) {
        var self = this;
        if (credentials.username === "apiuser") {
            self.scope.credentials.password = "";
            self.toaster.pop("error", "", self.translate.instant("LOGIN_ERROR"));
        }
        else {
            self.auth.login(credentials, function (res) {
                self.location.path("/dashoard");
                self.rootScope.setUserDefaultLanguage();
                self.rootScope.loadLabels();
            }, function (err) {
                self.scope.credentials.password = "";
                self.toaster.pop("error", "", self.translate.instant("LOGIN_ERROR"));
            });
        }
    };
    ;
    return LoginController;
}());
angular.module("app.login", ["ngResource"]).controller("LoginController", LoginController);

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

'use strict';

angular.module('app.login', ['ngResource']).controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$location', 'Auth', '$scope', 'toaster', '$rootScope', '$translate'];

function LoginCtrl($location, Auth, $scope, toaster, $rootScope, $translate) {
    this.login = function (credentials) {
        if (credentials.username == 'apiuser') {
            $scope.credentials.password = "";
            toaster.pop('error', '', $translate.instant('LOGIN_ERROR'));
        }
        else {
            Auth.login(credentials,
                function (res) {
                    $location.path('/dashoard');
                    $rootScope.setUserDefaultLanguage();
                    $rootScope.loadLabels();
                },
                function (err) {
                    $scope.credentials.password = "";
                    toaster.pop('error', '', $translate.instant('LOGIN_ERROR'));
                }
            );
        }
    };

}

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
angular.module('app.leads', [ 'ngResource' ])
		.controller('LeadsCtrl', LeadsCtrl);
LeadsCtrl.$inject = [ 'DTOptionsBuilder', 'DTColumnBuilder', '$compile',
		'$scope', 'toaster', 'Processes', 'Comments', '$filter', 'Profile',
		'$rootScope', '$translate' ];
function LeadsCtrl(DTOptionsBuilder, DTColumnBuilder, $compile, $scope,
		toaster, Processes, Comments, $filter, Profile, $rootScope, $translate) {

	var vm = this;
	this.filter = $filter;
	this.processesService = Processes;
	this.commentService = Comments;
	this.userService = Profile;
	this.user = {};
	this.windowWidth = $(window).width();
	if (!angular.isUndefined($rootScope.globals.currentUser))
		this.userService.get({
			username : $rootScope.globals.currentUser.username
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
	this.newLead = {};
	this.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
		url : '/api/rest/processes/state/open/leads',
		error : function(xhr, error, thrown) {
			console.log(xhr);
		},
		type : 'GET'
	}).withOption('stateSave', true).withDOM(
			'<"row"<"col-sm-12"l>>' + '<"row"<"col-sm-6"B><"col-sm-6"f>>'
					+ '<"row"<"col-sm-12"tr>>'
					+ '<"row"<"col-sm-5"i><"col-sm-7"p>>').withPaginationType(
			'full_numbers').withButtons([ {
		extend : 'copyHtml5',
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12 ],
			modifier : {
				page : 'current'
			}
		}
	}, {
		extend : 'print',
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12 ],
			modifier : {
				page : 'current'
			}
		}
	}, {
		extend : 'csvHtml5',
		title : $translate('LEAD_LEADS'),
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12 ],
			modifier : {
				page : 'current'
			}

		}
	}, {
		extend : 'excelHtml5',
		title : $translate.instant('LEAD_LEADS'),
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12 ],
			modifier : {
				page : 'current'
			}
		}
	}, {
		extend : 'pdfHtml5',
		title : $translate('LEAD_LEADS'),
		orientation : 'landscape',
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12 ],
			modifier : {
				page : 'current'
			}
		}
	} ]).withBootstrap().withOption('createdRow', createdRow).withOption(
			'order', [ 4, 'desc' ]);
	this.dtColumns = [
			DTColumnBuilder.newColumn(null).withTitle('').notSortable()
					.renderWith(addDetailButton),
			DTColumnBuilder.newColumn('lead.inquirer.lastname').withTitle(
					$translate('COMMON_NAME')).withClass('text-center'),
			DTColumnBuilder.newColumn('lead.inquirer.company').withTitle(
					$translate('COMMON_COMPANY')).withClass('text-center'),
			DTColumnBuilder.newColumn('lead.inquirer.email').withTitle(
					$translate('COMMON_EMAIL')).withClass('text-center'),
			DTColumnBuilder.newColumn('lead.timestamp').withTitle(
					$translate('COMMON_DATE')).withOption('type', 'date-euro')
					.withClass('text-center'),
			DTColumnBuilder.newColumn('lead.inquirer.phone').withTitle(
					$translate('COMMON_PHONE')).notVisible(),
			DTColumnBuilder.newColumn('lead.inquirer.firstname').withTitle(
					$translate('COMMON_FIRSTNAME')).notVisible(),
			DTColumnBuilder.newColumn('lead.container.name').withTitle(
					$translate('COMMON_CONTAINER')).notVisible(),
			DTColumnBuilder.newColumn('lead.destination').withTitle(
					$translate('COMMON_CONTAINER_DESTINATION')).notVisible(),
			DTColumnBuilder.newColumn('lead.containerAmount').withTitle(
					$translate('COMMON_CONTAINER_AMOUNT')).notVisible(),
			DTColumnBuilder.newColumn(null).withTitle(
					$translate('COMMON_CONTAINER_SINGLE_PRICE')).renderWith(
					function(data, type, full) {
						return $filter('currency')(
								data.lead.container.priceNetto, '€', 2);
					}).notVisible(),
			DTColumnBuilder.newColumn(null).withTitle(
					$translate('COMMON_CONTAINER_ENTIRE_PRICE'))
					.renderWith(
							function(data, type, full) {
								return $filter('currency')(data.lead.leadPrice,
										'€', 2);
							}).notVisible(),
			DTColumnBuilder.newColumn(null).withTitle(
					$translate('COMMON_STATUS')).withClass('text-center')
					.renderWith(addStatusStyle),
			DTColumnBuilder.newColumn(null).withTitle(
					'<span class="glyphicon glyphicon-cog"></span>').withClass(
					'text-center').notSortable().renderWith(addActionsButtons) ];

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
				url : '/api/rest/processes/leads',
				type : 'GET',
				pages : 5,
				dataSrc : 'data',
				error : function(xhr, error, thrown) {
					console.log(xhr);
				}
			}).withOption('searchDelay', 500);
		} else {
			vm.dtOptions.withOption('serverSide', false).withOption('ajax', {
				url : '/api/rest/processes/state/open/leads',
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
		var leadDate = moment(data.lead.timestamp, "DD.MM.YYYY");
		if (currentDate.businessDiff(leadDate, 'days') > 3
				&& data.status == 'open')
			$(row).addClass('important');
		vm.compile(angular.element(row).contents())(vm.scope);
	}

	function addActionsButtons(data, type, full, meta) {
		vm.processes[data.id] = data;
		var disabled = '';
		var disablePin = '';
		var hasRightToDelete = '';
		var closeOrOpenInquiryDisable = '';
		var openOrLock = $translate.instant('LEAD_CLOSE_LEAD');
		var faOpenOrLOck = 'fa fa-lock';
		if (data.status != 'open') {
			disabled = 'disabled';
			disablePin = 'disabled';
			openOrLock = $translate.instant('LEAD_OPEN_LEAD');
			faOpenOrLOck = 'fa fa-unlock';
		}
		if (data.offer != null || data.sale != null) {
			closeOrOpenInquiryDisable = 'disabled';
		}
		if ($rootScope.globals.currentUser.role == 'user') {
			hasRightToDelete = 'disabled';
		}
		if (data.processor != null
				&& $rootScope.globals.currentUser.username != data.processor.username) {
			disablePin = 'disabled';
		}
		if (vm.windowWidth > 1300) {
			return '<div style="white-space: nowrap;"><button class="btn btn-white" '
					+ disabled
					+ ' ng-click="lead.followUp(lead.processes['
					+ data.id
					+ '])" title="'
					+ $translate.instant('LEAD_FOLLOW_UP')
					+ '">'
					+ '   <i class="fa fa-check"></i>'
					+ '</button>&nbsp;'
					+ '<button class="btn btn-white" '
					+ disablePin
					+ ' ng-click="lead.pin(lead.processes['
					+ data.id
					+ '])" title="'
					+ $translate.instant('LEAD_PIN')
					+ '">'
					+ '   <i class="fa fa-thumb-tack"></i>'
					+ '</button>&nbsp;'
					+ '<button class="btn btn-white" '
					+ closeOrOpenInquiryDisable
					+ ' ng-click="lead.closeOrOpenInquiry(lead.processes['
					+ data.id
					+ '])" title="'
					+ openOrLock
					+ '">'
					+ '   <i class="'
					+ faOpenOrLOck
					+ '"></i>'
					+ '</button>'
					+ '<button class="btn btn-white" '
					+ closeOrOpenInquiryDisable
					+ ' ng-click="lead.loadDataToModal(lead.processes['
					+ data.id
					+ '])" data-toggle="modal"'
					+ 'data-target="#editModal" title="'
					+ $translate.instant('LEAD_EDIT_LEAD')
					+ '">'
					+ '<i class="fa fa-edit"></i>'
					+ '</button>&nbsp;'
					+ '<button class="btn btn-white" '
					+ hasRightToDelete
					+ ' ng-click="lead.deleteRow(lead.processes['
					+ data.id
					+ '])" title="'
					+ $translate.instant('LEAD_DELETE_LEAD')
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
					+ ' ng-click="lead.followUp(lead.processes['
					+ data.id
					+ '])"><i class="fa fa-check">&nbsp;</i>'
					+ $translate.instant('LEAD_FOLLOW_UP')
					+ '</button></li>'
					+ '<li><button style="width: 100%; text-align: left;" class="btn btn-white" '
					+ disablePin
					+ ' ng-click="lead.pin(lead.processes['
					+ data.id
					+ '])"><i class="fa fa-thumb-tack">&nbsp;</i>'
					+ $translate.instant('LEAD_PIN')
					+ '</button></li>'
					+ '<li><button style="width: 100%; text-align: left;" class="btn btn-white" '
					+ closeOrOpenInquiryDisable
					+ ' ng-click="lead.closeOrOpenInquiry(lead.processes['
					+ data.id
					+ '])"><i class="'
					+ faOpenOrLOck
					+ '">&nbsp;</i>'
					+ openOrLock
					+ '</button></li>'
					+ '<li><button style="width: 100%; text-align: left;" class="btn btn-white" '
					+ closeOrOpenInquiryDisable
					+ ' data-toggle="modal" data-target="#editModal" ng-click="lead.loadDataToModal(lead.processes['
					+ data.id
					+ '])"><i class="fa fa-edit"">&nbsp;</i>'
					+ $translate.instant('LEAD_EDIT_LEAD')
					+ '</button></li>'
					+ '<li><button style="width: 100%; text-align: left;" class="btn btn-white" '
					+ hasRightToDelete
					+ ' ng-click="lead.deleteRow(lead.processes['
					+ data.id
					+ '])"><i class="fa fa-trash-o">&nbsp;</i>'
					+ $translate.instant('LEAD_DELETE_LEAD')
					+ '</button></li>'
					+ '</ul>' + '</div>'
		}
	}

	function addStatusStyle(data, type, full, meta) {
		vm.processes[data.id] = data;
		var hasProcessor = '';
		if (data.processor != null)
			hasProcessor = '&nbsp;<span style="color: #ea394c;"><i class="fa fa-thumb-tack"></i></span>';
		if (data.status == 'open') {
			return '<span style="color: green;">'
					+ $translate.instant('COMMON_STATUS_OPEN') + '</span>'
					+ hasProcessor;
		} else if (data.status == 'offer') {
			return '<span style="color: #f79d3c;">'
					+ $translate.instant('COMMON_STATUS_OFFER') + '</span>'
		} else if (data.status == 'followup') {
			return '<span style="color: #f79d3c;">'
					+ $translate.instant('COMMON_STATUS_FOLLOW_UP') + '</span>'
		} else if (data.status == 'sale') {
			return '<span style="color: #1872ab;">'
					+ $translate.instant('COMMON_STATUS_SALE') + '</span>'
		} else if (data.status == 'closed') {
			return '<span style="color: #ea394c;">'
					+ $translate.instant('COMMON_STATUS_CLOSED') + '</span>'
		}
	}

	function addDetailButton(data, type, full, meta) {
		vm.processes[data.id] = data;
		return '<a class="green shortinfo" href="javascript:;"'
				+ 'ng-click="lead.appendChildRow(lead.processes[' + data.id
				+ '], $event)" title="Details">'
				+ '<i class="glyphicon glyphicon-plus-sign"/></a>';
	}
}

LeadsCtrl.prototype.appendChildRow = function(process, event) {
	var childScope = this.scope.$new(true);
	childScope.childData = process;
	var vm = this;
	this.commentService.getComments({
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
						'<div childrow type="lead" class="clearfix"></div>')(
						childScope)).show();
		tr.addClass('shown');
	}
};

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

LeadsCtrl.prototype.loadCurrentIdToModal = function(id) {
	this.currentCommentModalId = id;
};

LeadsCtrl.prototype.addComment = function(id, source) {
	var vm = this;
	var commentText = '';
	if (angular.isUndefined(this.comments[id])) {
		this.comments[id] = [];
	}
	if (source == 'table' && this.commentInput[id] != ''
			&& !angular.isUndefined(this.commentInput[id])) {
		commentText = this.commentInput[id];
	} else if (source == 'modal' && this.commentModalInput[id] != ''
			&& !angular.isUndefined(this.commentModalInput[id])) {
		commentText = this.commentModalInput[id];
	}
	var comment = {
		process : this.processes[id],
		creator : this.user,
		commentText : commentText,
		timestamp : this.filter('date')(new Date(), "dd.MM.yyyy HH:mm:ss")
	};
	this.commentService.addComment(comment).$promise.then(function() {
		vm.comments[id].push(comment);
		vm.commentInput[id] = '';
		vm.commentModalInput[id] = '';
	});
};

LeadsCtrl.prototype.saveLead = function() {
	var vm = this;
	if (angular.isUndefined(this.newLead.inquirer)) {
		this.newLead.inquirer = {
			title : ''
		}
	}
	this.newLead.timestamp = this.filter('date')
			(new Date(), 'dd.MM.yyyy HH:mm');
	this.newLead.vendor = {
		name : "***REMOVED***"
	};
	var process = {
		lead : this.newLead,
		status : 'open'
	};
	this.processesService.addProcess(process).$promise.then(function(result) {
		vm.toaster.pop('success', '', vm.translate
				.instant('COMMON_TOAST_SUCCESS_ADD_LEAD'));
		vm.rootScope.leadsCount += 1;
		vm.addForm.$setPristine();
		vm.dtInstance.DataTable.row.add(result).draw();
	});
};

LeadsCtrl.prototype.clearNewLead = function() {
	this.newLead = {};
	this.newLead.containerAmount = 1;
	this.newLead.container = {
		priceNetto : 0
	}
};

LeadsCtrl.prototype.followUp = function(process) {
	var vm = this;
	var offer = {
		container : {
			name : process.lead.container.name,
			description : process.lead.container.description,
			priceNetto : process.lead.container.priceNetto
		},
		containerAmount : process.lead.containerAmount,
		deliveryAddress : process.lead.destination,
		offerPrice : (process.lead.containerAmount * process.lead.container.priceNetto),
		prospect : {
			company : process.lead.inquirer.company,
			email : process.lead.inquirer.email,
			firstname : process.lead.inquirer.firstname,
			lastname : process.lead.inquirer.lastname,
			phone : process.lead.inquirer.phone,
			title : process.lead.inquirer.title
		},
		timestamp : this.filter('date')(new Date(), 'dd.MM.yyyy HH:mm'),
		vendor : process.lead.vendor
	};
	this.processesService.addOffer({
		id : process.id
	}, offer).$promise.then(function() {
		vm.processesService.setStatus({
			id : process.id
		}, 'offer').$promise.then(function() {
			vm.toaster.pop('success', '', vm.translate
					.instant('COMMON_TOAST_SUCCESS_NEW_OFFER'));
			vm.rootScope.leadsCount -= 1;
			vm.rootScope.offersCount += 1;
			if (process.processor == null) {
				vm.processesService.setProcessor({
					id : process.id
				}, vm.user.username).$promise.then(function() {
					process.processor = vm.user;
					process.offer = offer;
					process.status = 'offer';
					vm.updateRow(process);
				});
			}
		});
	});
};

LeadsCtrl.prototype.pin = function(process) {
	var vm = this;
	if (process.processor == null) {
		this.processesService.setProcessor({
			id : process.id
		}, vm.user.username).$promise.then(function() {
			process.processor = vm.user;
			vm.updateRow(process);
		});
	} else {
		this.processesService.removeProcessor({
			id : process.id
		}).$promise.then(function() {
			process.processor = null;
			vm.updateRow(process);
		});
	}
}

LeadsCtrl.prototype.closeOrOpenInquiry = function(process) {
	var vm = this;
	if (process.status == "open") {
		this.processesService.setStatus({
			id : process.id
		}, 'closed').$promise.then(function() {
			vm.toaster.pop('success', '', vm.translate
					.instant('COMMON_TOAST_SUCCESS_CLOSE_LEAD'));
			vm.rootScope.leadsCount -= 1;
			process.status = 'closed';
			vm.updateRow(process);
		});
	} else if (process.status == "closed") {
		this.processesService.setStatus({
			id : process.id
		}, 'open').$promise.then(function() {
			vm.toaster.pop('success', '', vm.translate
					.instant('COMMON_TOAST_SUCCESS_OPEN_LEAD'));
			vm.rootScope.leadsCount += 1;
			process.status = 'open';
			vm.updateRow(process);
		});
	}
};

LeadsCtrl.prototype.loadDataToModal = function(process) {
	this.editProcess = process;
};

LeadsCtrl.prototype.saveEditedRow = function() {
	var vm = this;
	this.processesService.putLead({
		id : this.editProcess.lead.id
	}, this.editProcess.lead).$promise.then(function() {
		vm.toaster.pop('success', '', vm.translate
				.instant('COMMON_TOAST_SUCCESS_UPDATE_LEAD'));
		vm.editForm.$setPristine();
		vm.editProcess.lead.leadPrice = vm.editProcess.lead.containerAmount
				* vm.editProcess.lead.container.priceNetto;
		vm.updateRow(vm.editProcess);
	});
};

LeadsCtrl.prototype.deleteRow = function(process) {
	var vm = this;
	var leadId = process.lead.id;
	if (process.sale != null || process.offer != null) {
		vm.toaster.pop('error', '', vm.translate
				.instant('COMMON_TOAST_FAILURE_DELETE_LEAD'));
		return;
	}
	process.lead = null;
	this.processesService.putProcess({
		id : process.id
	}, process).$promise.then(function() {
		if (process.offer == null && process.sale == null) {
			vm.processesService.deleteProcess({
				id : process.id
			});
		}
		vm.processesService.deleteLead({
			id : leadId
		}).$promise.then(function() {
			vm.toaster.pop('success', '', vm.translate
					.instant('COMMON_TOAST_SUCCESS_DELETE_LEAD'));
			vm.rootScope.leadsCount -= 1;
			vm.dtInstance.DataTable.row(vm.rows[process.id]).remove().draw();
		});
	});
};

LeadsCtrl.prototype.updateRow = function(process) {
	this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw(
			false);
	this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
};
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

angular.module('app', [ 'app.services', 'app.dashboard', 'app.login',
		'app.signup', 'app.leads', 'app.offers', 'app.sales', 'app.statistics',
		'app.settings', 'app.profile', 'pascalprecht.translate', 'ngResource',
		'ngRoute', 'ngAnimate', 'ngCookies', 'datatables',
		'datatables.bootstrap', 'datatables.buttons', 'ui.sortable',
		'NgSwitchery', 'toaster', 'highcharts-ng','testModule']);

angular
		.module('app')
		.config(
				[
						'$routeProvider',
						'$httpProvider',
						function($routeProvider, $httpProvider) {
							$routeProvider
									.when(
											'/',
											{
												templateUrl : 'components/dashboard/dashboard.html',
												controller : 'DashboardCtrl',
												controllerAs : 'dashboard',
												authenticated : true
											})
									.when(
											'/dashboard',
											{
												templateUrl : 'components/dashboard/dashboard.html',
												controller : 'DashboardCtrl',
												controllerAs : 'dashboard',
												authenticated : true
											})
									.when(
											'/leads',
											{
												templateUrl : 'components/leads/leads.html',
												controller : 'LeadsCtrl',
												controllerAs : 'lead',
												authenticated : true
											})
									.when(
											'/offers',
											{
												templateUrl : 'components/offers/offers.html',
												controller : 'OffersCtrl',
												controllerAs : 'offer',
												authenticated : true
											})
									.when(
											'/sales',
											{
												templateUrl : 'components/sales/sales.html',
												controller : 'SalesCtrl',
												controllerAs : 'sale',
												authenticated : true
											})
									.when(
											'/statistic',
											{
												templateUrl : 'components/statistics/statistics.html',
												controller : 'StatisticsCtrl',
												controllerAs : 'statistic',
												authenticated : true
											})
									.when(
											'/settings',
											{
												templateUrl : 'components/settings/settings.html',
												controller : 'SettingsController',
												controllerAs : 'setting',
												authenticated : true
											})
									.when(
											'/profile',
											{
												templateUrl : 'components/profile/profile.html',
												controller : 'ProfileController',
												controllerAs : 'profile',
												authenticated : true
											})
									.when(
											'/signup',
											{
												templateUrl : 'components/signup/signup.html',
												controller : 'SignUpController',
												controllerAs : "signup"
											})
									.when(
											'/login',
											{
												templateUrl : 'components/login/login.html',
												controller : 'LoginController',
												controllerAs : 'login'
											}).when(
											'/test',
											{
												templateUrl : 'components/test/test.html',
												controller : 'TestController',
												controllerAs : 'testCtrl'
											}).otherwise({
										redirectTo : '/'
									});

							$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

						} ])
		.run(
				[
						'$location',
						'$http',
						'$rootScope',
						'Auth',
						'$cookieStore',
						function($location, $http, $rootScope, Auth,
								$cookieStore) {

							$rootScope.globals = $cookieStore.get('globals')
									|| {};
							if ($rootScope.globals.currentUser) {
								$http.defaults.headers.common['Authorization'] = 'Basic '
										+ $rootScope.globals.currentUser.authorization;
							}

							$rootScope.$on('$routeChangeStart', function(event,
									next, current) {

								if (next.authenticated === true) {
									if (!$rootScope.globals.currentUser) {
										$location.path('/login');
									}
								}
							});

							$rootScope.logout = function() {
								$location.path('/login');
								Auth.logout();
							};

						} ]);

angular
		.module('app')
		.controller(
				'appCtrl',
				function($translate, $scope, $rootScope, $interval, Processes,
						Profile) {
					$rootScope.leadsCount = 0;
					$rootScope.offersCount = 0;
					$rootScope.loadLabels = function() {
						if (!angular
								.isUndefined($rootScope.globals.currentUser)) {
							Processes.getProcessByLeadAndStatus({
								status : 'open'
							}).$promise.then(function(result) {
								$rootScope.leadsCount = result.length;
							});
							Processes.getProcessByOfferAndStatus({
								status : 'offer'
							}).$promise.then(function(result) {
								$rootScope.offersCount = result.length;
							});
						}
					}
					$rootScope.loadLabels();

					$rootScope.changeLanguage = function(langKey) {
						$translate.use(langKey);
						$rootScope.language = langKey;
					};

					$rootScope.setUserDefaultLanguage = function() {
						if (!angular
								.isUndefined($rootScope.globals.currentUser)) {
							Profile
									.get({
										username : $rootScope.globals.currentUser.username
									}).$promise.then(function(result) {
								$rootScope.changeLanguage(result.language);
							});
						}
					}

					$rootScope.setUserDefaultLanguage();

					var stop;
					$rootScope.$on('$destroy', function() {
						if (angular.isDefined(stop)) {
							$interval.cancel(stop);
							stop = undefined;
						}
					});
					stop = $interval(function() {
						if (!angular
								.isUndefined($rootScope.globals.currentUser)) {
							Processes.getProcessByLeadAndStatus({
								status : 'open'
							}).$promise.then(function(result) {
								$rootScope.leadsCount = result.length;
							});
							Processes.getProcessByOfferAndStatus({
								status : 'offer'
							}).$promise.then(function(result) {
								$rootScope.offersCount = result.length;
							});
						}
					}.bind(this), 300000);

				});

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

'use strict';

angular.module('app.services', ['ngResource'])
    .service('Auth', function ($http, $rootScope, $cookieStore, $location, $window) {

        return {

            signup: function (user, success, error) {

                $http.post('./api/rest/registrations', user, {
                        headers: {'Content-Type': "application/json"}
                    })
                    .success(success)
                    .error(error);
            },

            login: function (credentials, success, error) {

                if (credentials) {

                    var authorization = btoa(credentials.username + ":" + credentials.password);
                    var headers = credentials ? {authorization: "Basic " + authorization} : {};

                    $http.get('user', {headers: headers}).success(function (data) {

                        if (data.username) {
                            $rootScope.globals = {
                                currentUser: {
                                    username: data.username,
                                    role: data.role,
                                    authorization: authorization
                                }
                            };

                            $http.defaults.headers.common['Authorization'] = 'Basic ' + authorization;
                            $cookieStore.put('globals', $rootScope.globals);

                            success(data);
                        } else {
                        }
                    }).error(error);

                }
            },

            logout: function () {

                $rootScope.globals = {};
                console.log("Globals: ", $rootScope.globals);
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic';

                $http.post('logout', {})
                    .success(function () {
                        $location.path("#/login");
                    })
                    .error(function (data) {
                        $location.path("#/login");
                    });
            }
        };
    })
    .service('Processes', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/:id', {}, {
            getLead: {url: '/api/rest/processes/:id/leads', method: 'GET'},
            addLead: {url: '/api/rest/processes/:id/leads', method: 'POST'},
            putLead: {url: '/api/rest/processes/leads/:id', method: 'PUT'},
            deleteLead: {url: '/api/rest/processes/leads/:id', method: 'DELETE'},
            getOffer: {url: '/api/rest/processes/:id/offers', method: 'GET'},
            addOffer: {url: '/api/rest/processes/:id/offers', method: 'POST'},
            putOffer: {url: '/api/rest/processes/offers/:id', method: 'PUT'},
            deleteOffer: {url: '/api/rest/processes/offers/:id', method: 'DELETE'},
            getSale: {url: '/api/rest/processes/:id/sales', method: 'GET'},
            addSale: {url: '/api/rest/processes/:id/sales', method: 'POST'},
            putSale: {url: '/api/rest/processes/sales/:id', method: 'PUT'},
            deleteSale: {url: '/api/rest/processes/sales/:id', method: 'DELETE'},
            getProcessor: {url: '/api/rest/processes/:id/processors', method: 'GET'},
            setProcessor: {url: '/api/rest/processes/:id/processors', method: 'PUT'},
            removeProcessor: {url: '/api/rest/processes/:id/processors/remove', method: 'DELETE'},
            getStatus: {url: '/api/rest/processes/:id/:status', method: 'GET'},
            setStatus: {url: '/api/rest/processes/:id/status', method: 'PUT'},
            getByStatus: {url: '/api/rest/processes/status/:status', method: 'GET', isArray: true},
            addProcess: {url: '/api/rest/processes', method: 'POST'},
            putProcess: {url: '/api/rest/processes/:id', method: 'PUT'},
            deleteProcess: {url: '/api/rest/processes/:id', method: 'DELETE'},
            getProcessByLead: {url: '/api/rest/processes/leads', method: 'GET', isArray: true},
            getProcessByOffer: {url: '/api/rest/processes/offers', method: 'GET', isArray: true},
            getProcessBySale: {url: '/api/rest/processes/sales', method: 'GET', isArray: true},
            getProcessByLeadAndStatus: {
                url: '/api/rest/processes/state/:status/leads',
                method: 'GET',
                isArray: true
            },
            getProcessByOfferAndStatus: {
                url: '/api/rest/processes/state/:status/offers',
                method: 'GET',
                isArray: true
            },
            getProcessBySaleAndStatus: {
                url: '/api/rest/processes/state/:status/sales',
                method: 'GET',
                isArray: true
            },
            getLatestSales: {
                url: '/api/rest/processes/latestSales', method: 'GET', isArray: true
            },
            getLatest100Sales: {
                url: '/api/rest/processes/latest100Sales', method: 'GET', isArray: true
            }
        });
    }])
     .service('Comments', ['$resource', function ($resource) {
        return $resource('/api/rest/comments/', {}, {
            getComments: {url: '/api/rest/comments/processes/:id', method: 'GET', isArray: true},
            addComment: {url: '/api/rest/comments/processes', method: 'POST'},
        });
    }])
    .service('Profile', ['$resource', function ($resource) {
        return $resource('/users/:username', {}, {
            update: {url: '/users/:username/update', method: 'PUT'},
            pw: {url: '/users/:username/pw', method: 'PUT'}
        });
    }])
    .service('Settings', ['$resource', function ($resource) {
        return $resource('/users/:username', {username: '@Username'}, {
            activate: {url: '/users/:username/activate', method: 'PUT'},
            setRole: {url: '/users/:username/role', method: 'POST'},
            getSalesStatistics: {url: '/api/rest/processes/statitstics/sales', method: 'POST'},
            getProfitStatistics: {url: '/api/rest/processes/statitstics/profits', method: 'POST'},
            getReturnStatistics: {url: '/api/rest/processes/statitstics/returns', method: 'POST'}
        });
    }])
    .service('Turnover', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics/turnover', {}, {
            day: {url: '/api/rest/processes/statistics/turnover/day', method: 'GET'},
            week: {url: '/api/rest/processes/statistics/turnover/week', method: 'GET'},
            month: {url: '/api/rest/processes/statistics/turnover/month', method: 'GET'},
            year: {url: '/api/rest/processes/statistics/turnover/year', method: 'GET'},
            all: {url: '/api/rest/processes/statistics/turnover/all', method: 'GET'}
        });
    }])
    .service('Profit', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics/profit', {}, {
            day: {url: '/api/rest/processes/statistics/profit/day', method: 'GET'},
            week: {url: '/api/rest/processes/statistics/profit/week', method: 'GET'},
            month: {url: '/api/rest/processes/statistics/profit/month', method: 'GET'},
            year: {url: '/api/rest/processes/statistics/profit/year', method: 'GET'},
            all: {url: '/api/rest/processes/statistics/profit/all', method: 'GET'}
        });
    }])
    .service('Leads', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics/leads', {}, {
            day: {url: '/api/rest/processes/statistics/leads/day', method: 'GET'},
            week: {url: '/api/rest/processes/statistics/leads/week', method: 'GET'},
            month: {url: '/api/rest/processes/statistics/leads/month', method: 'GET'},
            year: {url: '/api/rest/processes/statistics/leads/year', method: 'GET'},
            all: {url: '/api/rest/processes/statistics/leads/all', method: 'GET'}
        });
    }])
    .service('Offers', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics/offers', {}, {
            day: {url: '/api/rest/processes/statistics/offers/day', method: 'GET'},
            week: {url: '/api/rest/processes/statistics/offers/week', method: 'GET'},
            month: {url: '/api/rest/processes/statistics/offers/month', method: 'GET'},
            year: {url: '/api/rest/processes/statistics/offers/year', method: 'GET'},
            all: {url: '/api/rest/processes/statistics/offers/all', method: 'GET'}
        });
    }])
    .service('Sales', ['$resource', function ($resource) {
        return $resource('/api/rest/processes/statistics/sales', {}, {
            day: {url: '/api/rest/processes/statistics/sales/day', method: 'GET'},
            week: {url: '/api/rest/processes/statistics/sales/week', method: 'GET'},
            month: {url: '/api/rest/processes/statistics/sales/month', method: 'GET'},
            year: {url: '/api/rest/processes/statistics/sales/year', method: 'GET'},
            all: {url: '/api/rest/processes/statistics/sales/all', method: 'GET'}
        });
    }]);

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

function config($translateProvider) {

	var pageTitle = 'test';
	var pageLogo  =  pageTitle+'+';
	
    $translateProvider
        .translations('de', {
            //GENERAL
        	TITLE:pageTitle,
        	LOGO: pageLogo,
        	
        	// Define all menu elements
            DASHBOARD_MENU: 'Dashboard',
            LEADS_MENU: 'Anfragen',
            OFFERS_MENU: 'Angebote',
            SALES_MENU: 'Verkäufe',
            STATISTIC_MENU: 'Statistiken',
            SETTINGS_MENU: 'Einstellungen',
            PROFILE_MENU: 'Profil',
            LOGIN: 'Anmelden',
            LOGOUT: 'Abmelden',
            LANGUAGE: 'Sprache',

            //Define login elements
            LOGIN_WELCOME: 'Willkommen bei '+pageTitle,
            LOGIN_WELCOME_DESCRIPTION: pageTitle+' Lead Management System',
            LOGIN_NO_ACCOUNT: 'Noch keinen Account?',
            LOGIN_CREATE_ACCOUNT: 'Registrieren',
            LOGIN_ERROR: 'Anmeldung fehlgeschlagen',

            //Define signup elements
            SIGNUP_REGISTER_WELCOME: 'Registrieren Sie sich bei '+pageLogo,
            SIGNUP_CREATE_ACCOUNT: 'Erstellen Sie sich ein Account',
            SIGNUP_LOGIN_AFTER: 'Melden Sie sich nach der Registrierung an',
            SIGNUP_TO_LOGIN: 'Zur Anmeldung',
            SIGNUP_SUCCESS: 'Willkommen bei '+pageLogo,
            SIGNUP_ERROR: 'Registrierung fehlgeschlagen',
            SIGNUP_VALIDATE_USER_IN_USE: 'Benutzername schon vergeben',
            SIGNUP_VALIDATE_USER_TO_SHORT: 'Benutzername muss mindestens 2 Zeichen enthalten',
            SIGNUP_VALIDATE_USER_TO_LONG: 'Benutzername darf höchstens 20 Zeichen enthalten',
            SIGNUP_VALIDATE_EMAIL_IN_USE: 'E-Mail schon vergeben',
            SIGNUP_VALIDATE_PASSWORD_TO_LONG: 'Passwort darf höchstens 20 Zeichen enthalten',


            //Define common elements
            Herr: 'Herr',
            Frau: 'Frau',
            day:'Heute',
            week:'Woche',
            month:'Monat',
            year:'Jahr',
            all:'Alle',
            COMMON_DETAILS: 'Details',
            COMMON_TITLE: 'Anrede',
            COMMON_TITLE_MR: 'Herr',
            COMMON_TITLE_MS: 'Frau',
            COMMON_FIRSTNAME: 'Vorname',
            COMMON_LASTNAME: 'Nachname',
            COMMON_USERNAME: 'Benutzername',
            COMMON_PASSWORD: 'Passwort',
            COMMON_USER: 'Benutzer',
            COMMON_ROLE: 'Rolle',
            COMMON_NAME: 'Name',
            COMMON_DATE: 'Datum',
            COMMON_STATUS: 'Status',
            COMMON_COMPANY: 'Firma',
            COMMON_EMAIL: 'E-Mail',
            COMMON_PHONE: 'Telefon',
            COMMON_CANCEL: 'Abbrechen',
            COMMON_SAVE: 'Speichern',
            COMMON_REFRESH: 'Aktualisieren',
            COMMON_PROCESSOR: 'Bearbeiter',
            COMMON_CHILDROW_ADDITONAL_TITLE: 'Zusätzliche Informationen',
            COMMON_CONTAINER: 'Container',
            COMMON_CONTAINER_DESC: 'Container Beschreibung',
            COMMON_CONTAINER_AMOUNT: 'Menge',
            COMMON_CONTAINER_SINGLE_PRICE: 'Einzelpreis',
            COMMON_CONTAINER_ENTIRE_PRICE: 'Gesamtpreis',
            COMMON_CONTAINER_OFFER_PRICE: 'Angebotspreis',
            COMMON_CONTAINER_DESTINATION: 'Lieferort',
            COMMON_CONTAINER_SALE_TURNOVER: 'Umsatz',
            COMMON_CONTAINER_SALE_PROFIT: 'Gewinn',
            COMMON_DELIVERY_TIME: 'Lieferdatum',
            COMMON_SALE_RETURN: 'Umsatz',
            COMMON_SALE_PROFIT: 'Gewinn',
            COMMON_CONVERSIONRATE: 'Conversionrate',
            COMMON_NOTE: 'Nachricht',
            COMMON_COMMENTS: 'Kommentare',
            COMMON_COMMENTS_LAST: 'Letzter Kommentar',
            COMMON_COMMENTS_ENTER: 'Kommentar eingeben',
            COMMON_COMMENTS_ADD: 'Kommentar senden',
            COMMON_COMMENTS_HISTORY: 'Verlauf...',
            COMMON_COMMENTS_MODAL_HISTORY: 'Kommentar Verlauf',
            COMMON_VALIDATE_MAX: 'Nicht mehr als ',
            COMMON_VALIDATE_MAX_END: ' Zeichen gültig!',
            COMMON_VALIDATE_REQ: 'Feld benötigt ',
            COMMON_VALIDATE_REQ_NUMBER: 'Eingabe darf nicht negativ sein oder ungültige Zeichen enthalten',
            COMMON_VALIDATE_EMAIL: 'E-Mail ungültig!',
            COMMON_NEW_PASSWORD: 'Neues Passwort',
            COMMON_VALIDATE_PASSWORD: 'Passwort muss mindestens 6 Zeichen lang sein',
            COMMON_VALIDATE_PASSWORD_NOT_MATCH: 'Passwörter stimmen nicht überein',
            COMMON_TOAST_SUCCESS_ADD_LEAD: 'Eine neue Anfrage wurde angelegt',
            COMMON_TOAST_SUCCESS_NEW_OFFER: 'Ein neues Angebot wurde erstellt',
            COMMON_TOAST_SUCCESS_NEW_SALE: 'Glückwunsch zum Verkauf!',
            COMMON_TOAST_SUCCESS_CLOSE_LEAD: 'Die Anfrage wurde geschlossen',
            COMMON_TOAST_SUCCESS_OPEN_LEAD: 'Die Anfrage wurde geöffnet',
            COMMON_TOAST_SUCCESS_UPDATE_LEAD: 'Die Anfrage wurde bearbeitet',
            COMMON_TOAST_SUCCESS_DELETE_LEAD: 'Die Anfrage wurde gelöscht',
            COMMON_TOAST_FAILURE_DELETE_LEAD: 'Die Anfrage konnte nicht gelöscht werden',
            COMMON_TOAST_SUCCESS_ADD_OFFER: 'Ein neues Angebot wurde angelegt',
            COMMON_TOAST_SUCCESS_CLOSE_OFFER: 'Das Angebot wurde geschlossen',
            COMMON_TOAST_SUCCESS_OPEN_OFFER: 'Das Angebot wurde geöffnet',
            COMMON_TOAST_SUCCESS_UPDATE_OFFER: 'Das Angebot wurde bearbeitet',
            COMMON_TOAST_SUCCESS_DELETE_OFFER: 'Das Angebot wurde gelöscht',
            COMMON_TOAST_FAILURE_DELETE_OFFER: 'Das Angebot konnte nicht gelöscht werden',
            COMMON_TOAST_SUCCESS_UPDATE_SALE: 'Der Verkauf wurde bearbeitet',
            COMMON_TOAST_SUCCESS_DELETE_SALE: 'Der Verkauf wurde gelöscht',
            COMMON_TOAST_FAILURE_DELETE_SALE: 'Der Verkauf konnte nicht gelöscht werden',
            COMMON_TOAST_SUCCESS_ADD_SALE: 'Ein neuer Verkauf wurde angelegt',
            COMMON_TOAST_SUCCESS_FOLLOW_UP: 'Angebot wurde auf Follow up gesetzt',
            COMMON_STATUS_OPEN: 'Offen',
            COMMON_STATUS_OFFER: 'Angebot',
            COMMON_STATUS_FOLLOW_UP: 'Follow up',
            COMMON_STATUS_SALE: 'Verkauf',
            COMMON_STATUS_CLOSED: 'Geschlossen',

            //Define dashboard elements
            DASHBOARD_MANAGE_LEADS: 'Anfragen verwalten',
            DASHBOARD_DRAG_INFO: 'Ziehen Sie die Elemente per Drag\'n\'Drop',
            DASHBOARD_REFRESH: 'Aktualisieren',
            DASHBOARD_OPEN_LEADS: 'Offene Anfragen',
            DASHBOARD_OPEN_OFFERS: 'Angebote',
            DASHBOARD_LATEST_SALES: 'Letzte Verkäufe',
            DASHBOARD_INFO_BUTTON: 'Info',
            DASHBOARD_GOTO_BUTTON: 'Go to',
            DASHBOARD_COMPLETION: 'Abschlüsse',

            //Define profile elements
            PROFILE_PROFILE_INFORMATION: 'Profilinformationen',
            PROFILE_DEFAULT_LANGUAGE: 'Standard Sprache',
            PROFILE_PASSWORD_MANAGEMENT: 'Passwortverwaltung',
            PROFILE_OLD_PASSWORD: 'Altes Passwort',
            PROFILE_VALIDATE_OLD_PASSWORD: 'Altes Passwort wird benötigt',
            PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS: 'Profilinformationen wurden aktualisiert',
            PROFILE_TOAST_PROFILE_INFORMATION_ERROR: 'Profilinformationen konnten nicht aktualisiert werden',
            PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS: 'Passwort wurde geändert',
            PROFILE_TOAST_PASSWORD_CHANGE_ERROR: 'Passwort konnte nicht geändert werden',

            // Define all lead elements
            LEAD_LEADS: 'Anfragen',
            LEAD_MANAGE_LEADS: 'Anfragen verwalten',
            LEAD_ADD_LEAD: 'Neue Anfrage',
            LEAD_ADD_LEAD_MODAL: 'Anfrage erstellen',
            LEAD_EDIT_LEAD_MODAL: 'Anfrage bearbeiten',
            LEAD_SHOW_ALL_LEADS: 'Alle Anfragen',
            LEAD_FOLLOW_UP: 'Angebot erstellen',
            LEAD_PIN: 'Zuweisen',
            LEAD_OPEN_LEAD: 'Anfrage öffnen',
            LEAD_CLOSE_LEAD: 'Anfrage schließen',
            LEAD_EDIT_LEAD: 'Anfrage bearbeiten',
            LEAD_DELETE_LEAD: 'Anfrage löschen',

            // Define all offer elements
            OFFER_OFFERS: 'Angebote',
            OFFER_MANAGE_OFFERS: 'Angebote verwalten',
            OFFER_ADD_OFFER: 'Neues Angebot',
            OFFER_ADD_OFFER_MODAL: 'Angebot erstellen',
            OFFER_EDIT_OFFER_MODAL: 'Angebot bearbeiten',
            OFFER_SHOW_ALL_OFFERS: 'Alle Angebote',
            OFFER_CREATE_SALE: 'Verkauf abschließen',
            OFFER_FOLLOW_UP:'Follow up',
            OFFER_OPEN_OFFER: 'Angebot öffnen',
            OFFER_CLOSE_OFFER: 'Angebot schließen',
            OFFER_EDIT_OFFER: 'Angebot bearbeiten',
            OFFER_DELETE_OFFER: 'Angebot löschen',

            // Define all offer elements
            SALE_SALES: 'Verkäufe',
            SALE_MANAGE_SALES: 'Verkäufe verwalten',
            SALE_ADD_SALE: 'Verkauf hinzufügen',
            SALE_EDIT_SALE: 'Verkauf bearbeiten',
            SALE_ADD_SALE_MODAL: 'Verkauf hinzufügen',
            SALE_EDIT_SALE_MODAL: 'Verkauf bearbeiten',
            SALE_SHOW_ALL_SALES: 'Alle Verkäufe',
            SALE_DELETE_SALE: 'Verkauf löschen',

            //Define setting elements
            SETTING_ACCESS_MANAGEMENT: 'Benutzer freischalten',
            SETTING_ACTIVATE_USER: 'Freischalten',
            SETTING_DEACTIVATE_USER: 'Deaktivieren',
            SETTING_ROLE_MANAGEMENT: 'Benutzerrollen verwalten',
            SETTING_TOAST_ACCESS_GRANTED: 'Der Benutzer wurde freigeschalten',
            SETTING_TOAST_ACCESS_GRANTED_ERROR: 'Der Benutzer konnte nicht freigeschaltet werden',
            SETTING_TOAST_ACCESS_REVOKED: 'Der Benutzer wurde deaktiviert',
            SETTING_TOAST_ACCESS_REVOKED_ERROR: 'Der Benutzer konnte nicht deaktiviert werden',
            SETTING_TOAST_SET_ROLE: 'Die Rolle wurde geändert',
            SETTING_TOAST_SET_ROLE_ERROR: 'Die Rolle konnte nicht geändert werden',

            //Define statistic elements
            STATISTIC_PERIOD: 'Zeitraum',
            STATISTIC_PERIOD_TODAY: 'Heute',
            STATISTIC_PERIOD_WEEK: 'Woche',
            STATISTIC_PERIOD_MONTH: 'Monat',
            STATISTIC_PERIOD_YEAR: 'Jahr',
            STATISTIC_PERIOD_ALL: 'Alle',
            STATISTIC_SINGLE_STATISTIC: 'Einzelstatistik',
            STATISTIC_GENERAL_STATISTIC: 'Gesamtstatistik',
            STATISTIC_USER_STATISTIC: 'Benutzer Statistik',
            STATISTIC_PROFIT: 'Gewinn',
            STATISTIC_TURNOVER: 'Umsatz',
            STATISTIC_SALES: 'Abschlüsse',
            STATISTIC_SALES_OF_LEADS: 'Verkäufe aus Anfragen',
            STATISTIC_SALES_OF_LEADS_Y_AXIS: 'Abschlüsse in %',
            STATISTIC_SALES_OF_OFFERS: 'Verkäufe aus Angeboten',
            STATISTIC_SALES_OF_OFFERS_Y_AXIS: 'Abschlüsse in %',
            STATISTIC_PROFIT_ON_SALES: 'Umsatzrentabilität',
            STATISTIC_PROFIT_PER_SALE: 'Gewinn pro Verkauf',
            STATISTIC_CONVERSIONRATE: 'Conversionrate',
            STATISTIC_PARTS: 'Anteile',
            STATISTIC_PROFIT_AND_RETURN: 'Gewinn und Umsatz',
            STATISTIC_PROFIT_AND_RETURN_Y_AXIS: 'Gewinn/Umsatz in €',
            STATISTIC_LEADS_OFFERS_SALES: 'Anfragen/Angebote/Verkäufe',
            STATISTIC_LEADS_OFFERS_SALES_Y_AXIS: 'Anzahl',
            STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE: 'Nicht verfügbar',
            STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE_MESSAGE: 'Die Gesamtstatistiken sind nur für Woche, Monat, Jahr und Alle verfügbar',

            //Define all week and month names
            SUNDAY:'Sonntag',
            MONDAY:'Montag',
            TUESDAY:'Dienstag',
            WEDNESDAY:'Mittwoch',
            THURSDAY:'Donnerstag',
            FRIDAY:'Freitag',
            SATURDAY:'Samstag',

            JANUARY:'Januar',
            FEBRUARY:'Februar',
            MARCH:'März',
            APRIL:'April',
            MAY:'Mai',
            JUNE:'Juni',
            JULY:'Juli',
            AUGUST:'August',
            SEPTEMBER:'September',
            OCTOBER:'Oktober',
            NOVEMBER:'November',
            DECEMBER:'Dezember'

        })
        .translations('en', {
            //GENERAL
        	TITLE: pageTitle,
        	LOGO: pageLogo,
        	
        	// Define all menu elements
            DASHBOARD_MENU: 'Dashboard',
            LEADS_MENU: 'Leads',
            OFFERS_MENU: 'Offers',
            SALES_MENU: 'Sales',
            STATISTIC_MENU: 'Statistics',
            SETTINGS_MENU: 'Settings',
            PROFILE_MENU: 'Profile',
            LOGIN: 'Login',
            LOGOUT: 'Logout',
            LANGUAGE: 'Language',

            //Define login elements
            LOGIN_WELCOME: 'Welcome to '+pageLogo,
            LOGIN_WELCOME_DESCRIPTION: pageTitle+' Lead Management System',
            LOGIN_NO_ACCOUNT: 'Do not have an account?',
            LOGIN_CREATE_ACCOUNT: 'Register',
            LOGIN_ERROR: 'Login failed',

            //Define signup elements
            SIGNUP_REGISTER_WELCOME: 'Register to '+pageLogo,
            SIGNUP_CREATE_ACCOUNT: 'Create an account',
            SIGNUP_LOGIN_AFTER: 'Login after your Signed Up',
            SIGNUP_TO_LOGIN: 'Go to login',
            SIGNUP_SUCCESS: 'Welcome to '+pageLogo,
            SIGNUP_ERROR: 'Registration failed',
            SIGNUP_VALIDATE_USER_IN_USE: 'Username already in use',
            SIGNUP_VALIDATE_USER_TO_SHORT: 'Username have to contain 6 or more characters',
            SIGNUP_VALIDATE_USER_TO_LONG: 'Username have to contain 20 or less characters',
            SIGNUP_VALIDATE_EMAIL_IN_USE: 'E-Mail already in use',
            SIGNUP_VALIDATE_PASSWORD_TO_LONG: 'Password have to contain 20 or less characters',

            //Define common elements
            Herr: 'Mr.',
            Frau: 'Ms.',
            day:'Today',
            week:'Week',
            month:'Month',
            year:'Year',
            all:'All',
            COMMON_DETAILS: 'Details',
            COMMON_TITLE: 'Title',
            COMMON_TITLE_MR: 'Mr',
            COMMON_TITLE_MS: 'Ms',
            COMMON_FIRSTNAME: 'Firstname',
            COMMON_LASTNAME: 'Lastname',
            COMMON_USERNAME: 'Username',
            COMMON_PASSWORD: 'Password',
            COMMON_USER: 'User',
            COMMON_ROLE: 'Role',
            COMMON_NAME: 'Name',
            COMMON_DATE: 'Date',
            COMMON_STATUS: 'Status',
            COMMON_COMPANY: 'Company',
            COMMON_EMAIL: 'E-Mail',
            COMMON_PHONE: 'Phone',
            COMMON_CANCEL: 'Cancel',
            COMMON_SAVE: 'Save',
            COMMON_REFRESH: 'Refresh',
            COMMON_PROCESSOR: 'Processor',
            COMMON_CHILDROW_ADDITONAL_TITLE: 'Additional informationen',
            COMMON_CONTAINER: 'Container',
            COMMON_CONTAINER_DESC: 'Container description',
            COMMON_CONTAINER_AMOUNT: 'Amount',
            COMMON_CONTAINER_SINGLE_PRICE: 'Unit price',
            COMMON_CONTAINER_ENTIRE_PRICE: 'Entire price',
            COMMON_CONTAINER_OFFER_PRICE: 'Offer price',
            COMMON_CONTAINER_DESTINATION: 'Place of delivery',
            COMMON_CONTAINER_SALE_TURNOVER: 'Turnover',
            COMMON_CONTAINER_SALE_PROFIT: 'Profit',
            COMMON_DELIVERY_TIME: 'Delivery date',
            COMMON_SALE_RETURN: 'Turnover',
            COMMON_SALE_PROFIT: 'Profit',
            COMMON_CONVERSIONRATE: 'Conversionrate',
            COMMON_NOTE: 'Note',
            COMMON_COMMENTS: 'Comments',
            COMMON_COMMENTS_LAST: 'Last comment',
            COMMON_COMMENTS_ENTER: 'Enter comment',
            COMMON_COMMENTS_ADD: 'Send comment',
            COMMON_COMMENTS_HISTORY: 'History...',
            COMMON_COMMENTS_MODAL_HISTORY: 'Comment history',
            COMMON_VALIDATE_MAX: 'Only ',
            COMMON_VALIDATE_MAX_END: ' letters are allowed',
            COMMON_VALIDATE_REQ: 'Field required ',
            COMMON_VALIDATE_REQ_NUMBER: 'Negative numbers and invalid characters are restricted',
            COMMON_VALIDATE_EMAIL: 'Enter a valid email',
            COMMON_VALIDATE_NEW_PASSWORD: 'New password',
            COMMON_VALIDATE_PASSWORD: 'Password have to be 6 characters long',
            COMMON_VALIDATE_PASSWORD_NOT_MATCH: 'Password doesn\'t match',
            COMMON_TOAST_SUCCESS_ADD_LEAD: 'A new lead was generated',
            COMMON_TOAST_SUCCESS_NEW_OFFER: 'A new offer was generated',
            COMMON_TOAST_SUCCESS_NEW_SALE: 'Congratulation for your sale!',
            COMMON_TOAST_SUCCESS_CLOSE_LEAD: 'The lead was locked',
            COMMON_TOAST_SUCCESS_OPEN_LEAD: 'The lead was unlocked',
            COMMON_TOAST_SUCCESS_UPDATE_LEAD: 'The lead was edited',
            COMMON_TOAST_SUCCESS_DELETE_LEAD: 'The lead was deleted',
            COMMON_TOAST_FAILURE_DELETE_LEAD: 'The lead cannot be deleted',
            COMMON_TOAST_SUCCESS_ADD_OFFER: 'A new offer was generated',
            COMMON_TOAST_SUCCESS_ADD_SALE: 'A new sale was created',
            COMMON_TOAST_SUCCESS_CLOSE_OFFER: 'The offer was locked',
            COMMON_TOAST_SUCCESS_OPEN_OFFER: 'The offer was unlocked',
            COMMON_TOAST_SUCCESS_UPDATE_OFFER: 'The offer was edited',
            COMMON_TOAST_SUCCESS_DELETE_OFFER: 'The offer was deleted',
            COMMON_TOAST_FAILURE_DELETE_OFFER: 'The offer cannot be deleted',
            COMMON_TOAST_SUCCESS_UPDATE_SALE: 'The sale was edited',
            COMMON_TOAST_SUCCESS_DELETE_SALE: 'The sale was deleted',
            COMMON_TOAST_FAILURE_DELETE_SALE: 'The sale cannot be deleted',
            COMMON_TOAST_SUCCESS_FOLLOW_UP: 'Offer is set to follow up',
            COMMON_STATUS_OPEN: 'Open',
            COMMON_STATUS_OFFER: 'Offer',
            COMMON_STATUS_FOLLOW_UP: 'Follow up',
            COMMON_STATUS_SALE: 'Sale',
            COMMON_STATUS_CLOSED: 'Closed',

            //Define dashboard elements
            DASHBOARD_MANAGE_LEADS: 'Manage leads',
            DASHBOARD_DRAG_INFO: 'Drag elements between list',
            DASHBOARD_REFRESH: 'Refresh',
            DASHBOARD_OPEN_LEADS: 'Open leads',
            DASHBOARD_OPEN_OFFERS: 'Open offers',
            DASHBOARD_LATEST_SALES: 'Latest sales',
            DASHBOARD_INFO_BUTTON: 'Info',
            DASHBOARD_GOTO_BUTTON: 'Go to',
            DASHBOARD_COMPLETION: 'Sales statements',

            //Define profile elements
            PROFILE_PROFILE_INFORMATION: 'Profile information',
            PROFILE_DEFAULT_LANGUAGE: 'Default language',
            PROFILE_PASSWORD_MANAGEMENT: 'Password management',
            PROFILE_OLD_PASSWORD: 'Old password',
            PROFILE_VALIDATE_OLD_PASSWORD: 'Old password is required',
            PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS: 'Profil changed',
            PROFILE_TOAST_PROFILE_INFORMATION_ERROR: 'Profil cannot be saved',
            PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS: 'Password changed',
            PROFILE_TOAST_PASSWORD_CHANGE_ERROR: 'Password cannot be saved',

            // Define all lead elements
            LEAD_LEADS: 'Leads',
            LEAD_MANAGE_LEADS: 'Manage leads',
            LEAD_ADD_LEAD: 'New lead',
            LEAD_ADD_LEAD_MODAL: 'Create lead',
            LEAD_EDIT_LEAD_MODAL: 'Edit lead',
            LEAD_SHOW_ALL_LEADS: 'Total leads',
            LEAD_FOLLOW_UP: 'Create offer ',
            LEAD_PIN: 'Assign to me',
            LEAD_OPEN_LEAD: 'Unlock lead',
            LEAD_CLOSE_LEAD: 'Lock lead',
            LEAD_EDIT_LEAD: 'Edit lead',
            LEAD_DELETE_LEAD: 'Delete lead',

            // Define all offer elements
            OFFER_OFFERS: 'Offers',
            OFFER_MANAGE_OFFERS: 'Manage offers',
            OFFER_ADD_OFFER: 'New offer',
            OFFER_ADD_OFFER_MODAL: 'Create offer',
            OFFER_EDIT_OFFER_MODAL: 'Edit offer',
            OFFER_SHOW_ALL_OFFERS: 'Total offers',
            OFFER_CREATE_SALE: 'Make sale',
            OFFER_FOLLOW_UP:'Follow up',
            OFFER_OPEN_OFFER: 'Unlock offer',
            OFFER_CLOSE_OFFER: 'Lock offer',
            OFFER_EDIT_OFFER: 'Edit offer',
            OFFER_DELETE_OFFER: 'Delete offer',

            // Define all sale elements
            SALE_SALES: 'Sales',
            SALE_MANAGE_SALES: 'Manage sales',
            SALE_ADD_SALE: 'Add sale',
            SALE_EDIT_SALE: 'Edit sale',
            SALE_ADD_SALE_MODAL: 'Create sale',
            SALE_EDIT_SALE_MODAL: 'Edit sale',
            SALE_SHOW_ALL_SALES: 'Total sales',
            SALE_DELETE_SALE: 'Delete sale',

            //Define setting elements
            SETTING_ACCESS_MANAGEMENT: 'Activate user',
            SETTING_ACTIVATE_USER: 'Activate',
            SETTING_DEACTIVATE_USER: 'Deactivate',
            SETTING_ROLE_MANAGEMENT: 'Manage user roles',
            SETTING_TOAST_ACCESS_GRANTED: 'User is activated',
            SETTING_TOAST_ACCESS_GRANTED_ERROR: 'User cannot be activated',
            SETTING_TOAST_ACCESS_REVOKED: 'User is deactivated',
            SETTING_TOAST_ACCESS_REVOKED_ERROR: 'User cannot be deactivated',
            SETTING_TOAST_SET_ROLE: 'Role has changed',
            SETTING_TOAST_SET_ROLE_ERROR: 'Role cannot be cahgend',

            //Define statistic elements
            STATISTIC_PERIOD: 'Period',
            STATISTIC_PERIOD_TODAY: 'Today',
            STATISTIC_PERIOD_WEEK: 'Week',
            STATISTIC_PERIOD_MONTH: 'Month',
            STATISTIC_PERIOD_YEAR: 'Year',
            STATISTIC_PERIOD_ALL: 'All',
            STATISTIC_SINGLE_STATISTIC: 'Single Statistic',
            STATISTIC_GENERAL_STATISTIC: 'General Statistic',
            STATISTIC_USER_STATISTIC: 'User Statistic',
            STATISTIC_PROFIT: 'Profit',
            STATISTIC_TURNOVER: 'Turnover',
            STATISTIC_SALES: 'Sales',
            STATISTIC_SALES_OF_LEADS: 'Sales of Leads',
            STATISTIC_SALES_OF_LEADS_Y_AXIS: 'Sales in %',
            STATISTIC_SALES_OF_OFFERS: 'Sales of Offers',
            STATISTIC_SALES_OF_OFFERS_Y_AXIS: 'Sales in %',
            STATISTIC_PROFIT_ON_SALES: 'Profit on Sales',
            STATISTIC_PROFIT_PER_SALE: 'Profit per Sale',
            STATISTIC_CONVERSIONRATE: 'Conversionrate',
            STATISTIC_PARTS: 'Parts',
            STATISTIC_PROFIT_AND_RETURN: 'Profit and Return',
            STATISTIC_PROFIT_AND_RETURN_Y_AXIS: 'Profit/Return in €',
            STATISTIC_LEADS_OFFERS_SALES: 'Leads/Offers/Sales',
            STATISTIC_LEADS_OFFERS_SALES_Y_AXIS: 'Amount',
            STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE: 'Not available',
            STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE_MESSAGE: 'The entire statistics only available for week, month, year and all',

            //Define all week and month names
            SUNDAY:'Sunday',
            MONDAY:'Monday',
            TUESDAY:'Tuesday',
            WEDNESDAY:'Wednesday',
            THURSDAY:'Thursday',
            FRIDAY:'Friday',
            SATURDAY:'Saturday',

            JANUARY:'January',
            FEBRUARY:'February',
            MARCH:'March',
            APRIL:'April',
            MAY:'May',
            JUNE:'June',
            JULY:'July',
            AUGUST:'August',
            SEPTEMBER:'September',
            OCTOBER:'October',
            NOVEMBER:'November',
            DECEMBER:'December'

        });

    $translateProvider.preferredLanguage('de');
    $translateProvider.fallbackLanguage('en');
    
}
'use strict';
angular
    .module('app')
    .config(config);

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
		'$scope', 'toaster', 'Processes', 'Comments', '$filter', 'Profile',
		'$rootScope', '$translate' ];
function OffersCtrl(DTOptionsBuilder, DTColumnBuilder, $compile, $scope,
		toaster, Processes, Comments, $filter, Profile, $rootScope, $translate) {

	var vm = this;
	this.filter = $filter;
	this.processesService = Processes;
	this.commentService = Comments;
	this.userService = Profile;
	this.user = {};
	this.windowWidth = $(window).width();
	if (!angular.isUndefined($rootScope.globals.currentUser))
		this.userService.get({
			username : $rootScope.globals.currentUser.username
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
		url : '/api/rest/processes/state/offer/offers',
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

	if ($rootScope.language == 'de') {
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
				url : '/api/rest/processes/state/offer/offers',
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
		if ((currentDate.businessDiff(offerDate, 'days') > 3 && data.status == 'offer')
				|| (currentDate.businessDiff(offerDate, 'days') > 5 && data.status == 'followup'))
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
		if (data.status != 'offer' && data.status != 'followup') {
			disableFollowUp = 'disabled';
			disabled = 'disabled';
			openOrLock = $translate.instant('OFFER_OPEN_OFFER');
			faOpenOrLOck = 'fa fa-unlock';
		}
		if (data.status == 'followup') {
			disableFollowUp = 'disabled';
		}
		if (data.sale != null) {
			closeOrOpenOfferDisable = 'disabled';
		}
		if ($rootScope.globals.currentUser.role == 'user') {
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
		if (data.status == 'offer' || data.status == 'open') {
			return '<div style="color: green;">'
					+ $translate.instant('COMMON_STATUS_OPEN') + '</div>'
		} else if (data.status == 'followup') {
			return '<div style="color: #f79d3c;">'
					+ $translate.instant('COMMON_STATUS_FOLLOW_UP') + '</div>'
		} else if (data.status == 'sale') {
			return '<div style="color: #1872ab;">'
					+ $translate.instant('COMMON_STATUS_SALE') + '</div>'
		} else if (data.status == 'closed') {
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
	this.commentService.getComments({
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

OffersCtrl.prototype.loadCurrentIdToModal = function(id) {
	this.currentCommentModalId = id;
};

OffersCtrl.prototype.addComment = function(id, source) {
	var vm = this;
	var commentText = '';
	if (angular.isUndefined(this.comments[id])) {
		this.comments[id] = [];
	}
	if (source == 'table' && this.commentInput[id] != ''
			&& !angular.isUndefined(this.commentInput[id])) {
		commentText = this.commentInput[id];
	} else if (source == 'modal' && this.commentModalInput[id] != ''
			&& !angular.isUndefined(this.commentModalInput[id])) {
		commentText = this.commentModalInput[id];
	}
	var comment = {
		process : this.processes[id],
		creator : this.user,
		commentText : commentText,
		timestamp : this.filter('date')(new Date(), "dd.MM.yyyy HH:mm:ss")
	};
	this.commentService.addComment(comment).$promise.then(function() {
		vm.comments[id].push(comment);
		vm.commentInput[id] = '';
		vm.commentModalInput[id] = '';
	});
};
/*
 * Not in Use. OffersCtrl.prototype.saveOffer = function () { var vm = this; if
 * (angular.isUndefined(this.newOffer.prospect)) { this.newOffer.prospect = {
 * title: '' } } this.newOffer.timestamp = this.filter('date')(new Date(),
 * 'dd.MM.yyyy HH:mm'); this.newOffer.vendor = { name: "***REMOVED***" }; var
 * process = { offer: this.newOffer, status: 'offer', processor: vm.user };
 * this.processesService.addProcess(process).$promise.then(function (result) {
 * vm.toaster.pop('success', '',
 * vm.translate.instant('COMMON_TOAST_SUCCESS_ADD_OFFER'));
 * vm.rootScope.offersCount += 1; vm.addForm.$setPristine();
 * vm.dtInstance.DataTable.row.add(result).draw(); }); };
 */

OffersCtrl.prototype.clearNewOffer = function() {
	this.newOffer = {};
	this.newOffer.containerAmount = 1;
	this.newOffer.container = {
		priceNetto : 0
	}
};

OffersCtrl.prototype.createSale = function(process) {
	var vm = this;
	var sale = {
		container : {
			name : process.offer.container.name,
			description : process.offer.container.description,
			priceNetto : process.offer.container.priceNetto
		},
		containerAmount : process.offer.containerAmount,
		transport : process.offer.deliveryAddress,
		customer : {
			company : process.offer.prospect.company,
			email : process.offer.prospect.email,
			firstname : process.offer.prospect.firstname,
			lastname : process.offer.prospect.lastname,
			phone : process.offer.prospect.phone,
			title : process.offer.prospect.title
		},
		saleProfit : 0,
		saleReturn : process.offer.offerPrice,
		timestamp : this.filter('date')(new Date(), 'dd.MM.yyyy HH:mm'),
		vendor : process.offer.vendor
	};
	this.processesService.addSale({
		id : process.id
	}, sale).$promise.then(function() {
		vm.processesService.setStatus({
			id : process.id
		}, 'sale').$promise.then(function() {
			vm.toaster.pop('success', '', vm.translate
					.instant('COMMON_TOAST_SUCCESS_NEW_SALE'));
			vm.rootScope.offersCount -= 1;
			vm.processesService.setProcessor({
				id : process.id
			}, vm.user.username).$promise.then(function() {
				process.processor = vm.user;
				process.sale = sale;
				process.status = 'sale';
				vm.updateRow(process);
			});
		});
	});
};

OffersCtrl.prototype.followUp = function(process) {
	var vm = this;
	this.processesService.setStatus({
		id : process.id
	}, 'followup').$promise.then(function() {
		vm.toaster.pop('success', '', vm.translate
				.instant('COMMON_TOAST_SUCCESS_FOLLOW_UP'));
		process.status = 'followup';
		vm.updateRow(process);
	});
};

OffersCtrl.prototype.closeOrOpenOffer = function(process) {
	var vm = this;
	if (process.status == "offer" || process.status == "followup") {
		this.processesService.setStatus({
			id : process.id
		}, 'closed').$promise.then(function() {
			vm.toaster.pop('success', '', vm.translate
					.instant('COMMON_TOAST_SUCCESS_CLOSE_OFFER'));
			vm.rootScope.offersCount -= 1;
			process.status = 'closed';
			vm.updateRow(process);
		});
	} else if (process.status == "closed") {
		this.processesService.setStatus({
			id : process.id
		}, 'offer').$promise.then(function() {
			vm.toaster.pop('success', '', vm.translate
					.instant('COMMON_TOAST_SUCCESS_OPEN_OFFER'));
			vm.rootScope.offersCount += 1;
			process.status = 'offer';
			vm.updateRow(process);
		});
	}
};

OffersCtrl.prototype.loadDataToModal = function(offer) {
	this.editProcess = offer;
};

OffersCtrl.prototype.saveEditedRow = function() {
	var vm = this;
	this.processesService.putOffer({
		id : this.editProcess.offer.id
	}, this.editProcess.offer).$promise.then(function() {
		vm.toaster.pop('success', '', vm.translate
				.instant('COMMON_TOAST_SUCCESS_UPDATE_OFFER'));
		vm.editForm.$setPristine();
		vm.updateRow(vm.editProcess);
	});
};

OffersCtrl.prototype.deleteRow = function(process) {
	var vm = this;
	var offerId = process.offer.id;
	if (process.sale != null) {
		vm.toaster.pop('error', '', vm.translate
				.instant('COMMON_TOAST_FAILURE_DELETE_OFFER'));
		return;
	}
	process.status = 'closed';
	process.offer = null;
	this.processesService.putProcess({
		id : process.id
	}, process).$promise.then(function() {
		if (process.lead == null && process.sale == null) {
			vm.processesService.deleteProcess({
				id : process.id
			});
		}
		vm.processesService.deleteOffer({
			id : offerId
		}).$promise.then(function() {
			vm.toaster.pop('success', '', vm.translate
					.instant('COMMON_TOAST_SUCCESS_DELETE_OFFER'));
			vm.rootScope.offersCount -= 1;
			vm.dtInstance.DataTable.row(vm.rows[process.id]).remove().draw();
		});
	});
};

OffersCtrl.prototype.updateRow = function(process) {
	this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw();
	this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
}
/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";
var ProfileController = (function () {
    function ProfileController($rootScope, toaster, Profile, $translate) {
        this.profileService = Profile;
        this.translate = $translate;
        var self = this;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.oldPassword = "";
        this.newPassword1 = "";
        this.newPassword2 = "";
        this.profileService.get({ username: $rootScope.globals.currentUser.username }).$promise.then(function (result) {
            self.user = result;
        });
    }
    ProfileController.prototype.submitProfilInfoForm = function (user) {
        var self = this;
        this.profileService.update({ username: user.username }, user).$promise.then(function () {
            self.rootScope.changeLanguage(user.language);
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
        }, function () {
            // TODO macht das Sinn?
            self.user.language = self.user.language;
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
        });
    };
    ;
    ProfileController.prototype.submitPasswordForm = function (user) {
        var self = this;
        this.profileService.pw({ username: user.username }, {
            newPassword: this.newPassword1,
            oldPassword: this.oldPassword
        }).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS"));
            // TODO
            // self.passwordForm.$setPristine();
            self.oldPassword = "";
            self.newPassword1 = "";
            self.newPassword2 = "";
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_ERROR"));
        });
    };
    ;
    ProfileController.$inject = ["$rootScope", "toaster", "Profile", "$translate"];
    return ProfileController;
}());
angular.module("app.profile", ["ngResource"]).controller("ProfileController", ProfileController);

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

angular.module('app.profile', ['ngResource']).controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$rootScope', 'toaster', 'Profile', '$translate'];

function ProfileCtrl($rootScope, toaster, Profile, $translate) {
    this.service = Profile;
    this.translate = $translate;
    vm = this;
    this.user = {};
    this.service.get({username: $rootScope.globals.currentUser.username}).$promise.then(function (result) {
        vm.user = result;
    });

    this.toaster = toaster;

    this.rootScope = $rootScope;
    this.oldPassword = '';
    this.newPassword1 = '';
    this.newPassword2 = '';
}

ProfileCtrl.prototype.submitProfilInfoForm = function (user) {
    vm = this;
    console.log(user);

    this.service.update({username: user.username}, user).$promise.then(function () {
        vm.rootScope.changeLanguage(user.language);
        vm.toaster.pop('success', '', vm.translate.instant('PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS'));
    }, function () {
        vm.user.language = vm.user.language;
        vm.toaster.pop('error', '', vm.translate.instant('PROFILE_TOAST_PROFILE_INFORMATION_ERROR'));
    });
};

ProfileCtrl.prototype.submitPasswordForm = function (user) {
    var vm = this;
    this.service.pw({username: user.username}, {
        newPassword: this.newPassword1,
        oldPassword: this.oldPassword
    }).$promise.then(function () {
        vm.toaster.pop('success', '', vm.translate.instant('PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS'));
        vm.passwordForm.$setPristine();
        vm.oldPassword = '';
        vm.newPassword1 = '';
        vm.newPassword2 = '';
    }, function () {
        vm.toaster.pop('error', '', vm.translate.instant('PROFILE_TOAST_PASSWORD_CHANGE_ERROR'));
    });
};
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
angular.module('app.sales', [ 'ngResource' ])
		.controller('SalesCtrl', SalesCtrl);
SalesCtrl.$inject = [ 'DTOptionsBuilder', 'DTColumnBuilder', '$compile',
		'$scope', 'toaster', 'Processes', 'Comments', '$filter', 'Profile',
		'$rootScope', '$translate' ];
function SalesCtrl(DTOptionsBuilder, DTColumnBuilder, $compile, $scope,
		toaster, Processes, Comments, $filter, Profile, $rootScope, $translate) {

	var vm = this;
	this.filter = $filter;
	this.processesService = Processes;
	this.commentService = Comments;
	this.userService = Profile;
	this.user = {};
	if (!angular.isUndefined($rootScope.globals.currentUser))
		this.userService.get({
			username : $rootScope.globals.currentUser.username
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
	this.newSale = {};
	this.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
		url : '/api/rest/processes/latest100Sales',
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
			columns : [ 6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14 ],
			modifier : {
				page : 'current'
			}
		}
	}, {
		extend : 'print',
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14 ],
			modifier : {
				page : 'current'
			}
		}
	}, {
		extend : 'csvHtml5',
		title : $translate('SALE_SALES'),
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14 ],
			modifier : {
				page : 'current'
			}

		}
	}, {
		extend : 'excelHtml5',
		title : $translate.instant('SALE_SALES'),
		exportOptions : {
			columns : [ 6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14 ],
			modifier : {
				page : 'current'
			}
		}
	}, {
		extend : 'pdfHtml5',
		title : $translate('SALE_SALES'),
		orientation : 'landscape',
		exportOptions : {
			columns : [ 6, 1, 2, 8, 7, 9, 10, 11, 12, 13, 14 ],
			modifier : {
				page : 'current'
			}
		}
	} ]).withBootstrap().withOption('createdRow', createdRow).withOption(
			'order', [ 4, 'desc' ]);
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
			DTColumnBuilder.newColumn('sale.container.name').withTitle(
					$translate('COMMON_CONTAINER')).notVisible(),
			DTColumnBuilder.newColumn('sale.transport').withTitle(
					$translate('COMMON_CONTAINER_DESTINATION')).notVisible(),
			DTColumnBuilder.newColumn('sale.containerAmount').withTitle(
					$translate('COMMON_CONTAINER_AMOUNT')).notVisible(),
			DTColumnBuilder.newColumn(null).withTitle(
					$translate('COMMON_CONTAINER_SINGLE_PRICE')).renderWith(
					function(data, type, full) {
						return $filter('currency')(
								data.sale.container.priceNetto, '€', 2);
					}).notVisible(),
			DTColumnBuilder.newColumn(null).withTitle(
					$translate('COMMON_CONTAINER_ENTIRE_PRICE')).renderWith(
					function(data, type, full) {
						return $filter('currency')(
								data.sale.container.priceNetto
										* data.sale.containerAmount, '€', 2);
					}).notVisible(),
			DTColumnBuilder.newColumn(null).withTitle(
					$translate('COMMON_CONTAINER_SALE_TURNOVER')).renderWith(
					function(data, type, full) {
						return $filter('currency')
								(data.sale.saleReturn, '€', 2);
					}).notVisible(),
			DTColumnBuilder.newColumn(null).withTitle(
					$translate('COMMON_CONTAINER_SALE_PROFIT')).renderWith(
					function(data, type, full) {
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
					'text-center').notSortable().renderWith(addActionsButtons) ];

	if ($rootScope.language == 'de') {
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
				url : '/api/rest/processes/sales',
				type : 'GET',
				pages : 5,
				dataSrc : 'data',
				error : function(xhr, error, thrown) {
					console.log(xhr);
				}
			}).withOption('searchDelay', 500);
		} else {
			vm.dtOptions.withOption('serverSide', false).withOption('ajax', {
				url : '/api/rest/processes/latest100Sales',
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
		vm.compile(angular.element(row).contents())(vm.scope);
	}

	function addActionsButtons(data, type, full, meta) {
		vm.processes[data.id] = data;
		var hasRightToDelete = '';
		if ($rootScope.globals.currentUser.role == 'user') {
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

SalesCtrl.prototype.appendChildRow = function(process, event) {
	var childScope = this.scope.$new(true);
	childScope.childData = process;
	var vm = this;
	this.commentService.getComments({
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
						'<div childrow type="sale" class="clearfix"></div>')(
						childScope)).show();
		tr.addClass('shown');
	}
};

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

SalesCtrl.prototype.loadCurrentIdToModal = function(id) {
	this.currentCommentModalId = id;
};

SalesCtrl.prototype.addComment = function(id, source) {
	var vm = this;
	var commentText = '';
	if (angular.isUndefined(this.comments[id])) {
		this.comments[id] = [];
	}
	if (source == 'table' && this.commentInput[id] != ''
			&& !angular.isUndefined(this.commentInput[id])) {
		commentText = this.commentInput[id];
	} else if (source == 'modal' && this.commentModalInput[id] != ''
			&& !angular.isUndefined(this.commentModalInput[id])) {
		commentText = this.commentModalInput[id];
	}
	var comment = {
		process : this.processes[id],
		creator : this.user,
		commentText : commentText,
		timestamp : this.filter('date')(new Date(), "dd.MM.yyyy HH:mm:ss")
	};
	this.commentService.addComment(comment).$promise.then(function() {
		vm.comments[id].push(comment);
		vm.commentInput[id] = '';
		vm.commentModalInput[id] = '';
	});
};
/*
 * Not in use SalesCtrl.prototype.saveSale = function () { var vm = this; if
 * (angular.isUndefined(this.newSale.customer)) { this.newSale.customer = {
 * title: '' } } this.newSale.timestamp = this.filter('date')(new Date(),
 * 'dd.MM.yyyy HH:mm'); this.newSale.vendor = { name: "***REMOVED***" }; var process = {
 * sale: this.newSale, status: 'sale', processor: vm.user };
 * this.processesService.addProcess(process).$promise.then(function () {
 * vm.toaster.pop('success', '',
 * vm.translate.instant('COMMON_TOAST_SUCCESS_ADD_SALE'));
 * vm.addForm.$setPristine(); vm.updateRow(process); }); };
 */

SalesCtrl.prototype.clearNewSale = function() {
	this.newSale = {};
	this.newSale.containerAmount = 1;
	this.newSale.container = {
		priceNetto : 0
	}
};

SalesCtrl.prototype.loadDataToModal = function(sale) {
	this.editProcess = sale;
};

SalesCtrl.prototype.saveEditedRow = function() {
	var vm = this;
	this.processesService.putSale({
		id : this.editProcess.sale.id
	}, this.editProcess.sale).$promise.then(function() {
		vm.toaster.pop('success', '', vm.translate
				.instant('COMMON_TOAST_SUCCESS_UPDATE_SALE'));
		vm.editForm.$setPristine();
		vm.updateRow(vm.editProcess);
	});
};

SalesCtrl.prototype.deleteRow = function(process) {
	var vm = this;
	var saleId = process.sale.id;
	process.status = 'closed';
	process.sale = null;
	this.processesService.putProcess({
		id : process.id
	}, process).$promise.then(function() {
		if (process.lead == null && process.sale == null) {
			vm.processesService.deleteProcess({
				id : process.id
			});
		}
		vm.processesService.deleteSale({
			id : saleId
		}).$promise.then(function() {
			vm.toaster.pop('success', '', vm.translate
					.instant('COMMON_TOAST_SUCCESS_DELETE_SALE'));
			vm.dtInstance.DataTable.row(vm.rows[process.id]).remove().draw();
		});
	});
};

SalesCtrl.prototype.updateRow = function(process) {
	this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw();
	this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
};
/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";
var SettingsController = (function () {
    function SettingsController($filter, toaster, Settings, $rootScope, $translate) {
        this.deactivateUser = function (user) {
            var self = this;
            this.service.activate({ username: user.username }, false).$promise.then(function () {
                self.filter("filter")(self.users, { id: user.id })[0].enabled = false;
                self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_ACCESS_REVOKED"));
            }, function () {
                self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_ACCESS_REVOKED_ERROR"));
            });
        };
        this.settingsService = Settings;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.users = [];
        this.roleSelection = {};
        this.filter = $filter;
        this.toaster = toaster;
        this.counter = 1;
        var self = this;
        this.settingsService.query().$promise.then(function (result) {
            self.users = result;
            for (var user in result) {
                if (user === "$promise")
                    break;
                self.roleSelection[result[user].id] = result[user].role;
            }
        });
    }
    SettingsController.prototype.incrementCounter = function () {
        this.counter++;
    };
    SettingsController.prototype.activateUser = function (user) {
        var self = this;
        this.settingsService.activate({ username: user.username }, true).$promise.then(function () {
            self.filter("filter")(self.users, { id: user.id })[0].enabled = true;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_ACCESS_GRANTED"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_ACCESS_GRANTED_ERROR"));
        });
    };
    ;
    SettingsController.prototype.hasRight = function (user) {
        if (user.username === this.rootScope.globals.currentUser.username
            || (user.role === this.rootScope.globals.currentUser.role)
            || this.rootScope.globals.currentUser.role === "user"
            || user.role === "superadmin") {
            return true;
        }
        else {
            return false;
        }
    };
    SettingsController.prototype.saveRole = function (user) {
        var self = this;
        user.role = this.roleSelection[user.id];
        this.settingsService.setRole({ username: user.username }, user.role).$promise.then(function () {
            // set rootScope role
            self.filter("filter")(self.users, { id: user.id })[0].role = user.role;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_SET_ROLE"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_SET_ROLE_ERROR"));
        });
    };
    ;
    SettingsController.$inject = ["$filter", "toaster", "Settings", "$rootScope", "$translate"];
    return SettingsController;
}());
angular.module("app.settings", ["ngResource"]).controller("SettingsController", SettingsController);

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

'use strict';

angular.module('app.settings', ['ngResource']).controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$filter', 'toaster', 'Settings', '$rootScope', '$translate'];

function SettingsCtrl($filter, toaster, Settings, $rootScope, $translate) {
    var vm = this;
    this.service = Settings;
    this.rootScope = $rootScope;
    this.translate = $translate;
    this.users = [];
    this.roleSelection = {};
    this.service.query().$promise.then(function (result) {
        vm.users = result;
        for (var user in result) {
            if (user == '$promise')
                break;
            vm.roleSelection[result[user].id] = result[user].role;
        }
    });
    this.filter = $filter;
    this.toaster = toaster;
    this.counter = 1;
}
SettingsCtrl.prototype.incrementCounter = function () {
    this.counter++;
}
SettingsCtrl.prototype.activateUser = function (user) {
    var vm = this;
    this.service.activate({username: user.username}, true).$promise.then(function () {
        vm.filter('filter')(vm.users, {id: user.id})[0].enabled = true;
        vm.toaster.pop('success', '', vm.translate.instant('SETTING_TOAST_ACCESS_GRANTED'));
    }, function () {
        vm.toaster.pop('error', '', vm.translate.instant('SETTING_TOAST_ACCESS_GRANTED_ERROR'));
    });
};

SettingsCtrl.prototype.deactivateUser = function (user) {
    var vm = this;
    this.service.activate({username: user.username}, false).$promise.then(function () {
        vm.filter('filter')(vm.users, {id: user.id})[0].enabled = false;
        vm.toaster.pop('success', '', vm.translate.instant('SETTING_TOAST_ACCESS_REVOKED'));
    }, function () {
        vm.toaster.pop('error', '', vm.translate.instant('SETTING_TOAST_ACCESS_REVOKED_ERROR'));
    });
};
SettingsCtrl.prototype.hasRight = function (user) {
    if (user.username == this.rootScope.globals.currentUser.username
        || (user.role == this.rootScope.globals.currentUser.role)
        || this.rootScope.globals.currentUser.role == 'user'
        || user.role == 'superadmin') {
        return true;
    } else {
        return false;
    }
}

SettingsCtrl.prototype.saveRole = function (user) {

    var vm = this;
    user.role = this.roleSelection[user.id];
    this.service.setRole({username: user.username}, user.role).$promise.then(function () {
        //set rootScope role
        vm.filter('filter')(vm.users, {id: user.id})[0].role = user.role;
        vm.toaster.pop('success', '', vm.translate.instant('SETTING_TOAST_SET_ROLE'));
    }, function () {
        vm.toaster.pop('error', '', vm.translate.instant('SETTING_TOAST_SET_ROLE_ERROR'));
    });
};


/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";
var SignUpController = (function () {
    function SignUpController($location, $http, $scope, Auth, toaster, $translate) {
        this.$inject = ["$location", "$http", "$scope", "Auth", "toaster", "$translate"];
        this.location = $location;
        this.http = $http;
        this.scope = $scope;
        this.auth = Auth;
        this.toaster = toaster;
        this.translate = $translate;
        this.emailExists = false;
        this.usernameExists = false;
    }
    SignUpController.prototype.uniqueEmail = function (email) {
        var self = this;
        self.http.post("./api/rest/registrations/unique/email", email, {
            headers: { "Content-Type": "text/plain" }
        }).success(function (data, status, headers, config) {
            self.scope.emailExists = data;
        }).error(function (data, status, headers, config) {
        });
    };
    ;
    SignUpController.prototype.uniqueUsername = function (username) {
        var self = this;
        self.http.post("./api/rest/registrations/unique/username", username, {
            headers: { "Content-Type": "text/plain" }
        }).success(function (data, status, headers, config) {
            self.scope.usernameExists = data;
            console.log("User: ", self.scope.usernameExists);
        }).error(function (data, status, headers, config) {
            console.log("User: ", data);
        });
    };
    ;
    SignUpController.prototype.signup = function (user) {
        var self = this;
        self.auth.signup(user, function () {
            self.scope.user = "";
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            self.location.path("/login");
        }, function (err) {
            self.scope.user = "";
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    };
    return SignUpController;
}());
angular.module("app.signup", ["ngResource"]).controller("SignUpController", SignUpController);

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

'use strict';

angular.module('app.signup', ['ngResource']).controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ['$location', '$http', '$scope', 'Auth', 'toaster', '$translate'];

function SignUpCtrl($location, $http, $scope, Auth, toaster, $translate) {
    var self = this;
    this.emailExists = false;
    this.usernameExists = false;

    this.uniqueEmail = function (email) {

        var that = self;

        $http.post('./api/rest/registrations/unique/email', email, {
            headers: {'Content-Type': "text/plain"}
        }).success(function (data, status, headers, config) {
            $scope.emailExists = data;
        }).error(function (data, status, headers, config) {
        });
    };

    this.uniqueUsername = function (username) {

        var that = self;

        $http.post('./api/rest/registrations/unique/username', username, {
            headers: {'Content-Type': "text/plain"}
        }).success(function (data, status, headers, config) {
            $scope.usernameExists = data;
            console.log("User: ", $scope.usernameExists);
        }).error(function (data, status, headers, config) {
            console.log("User: ", data);
        });
    };

    this.signup = function (user) {
        Auth.signup(user,
            function () {
                $scope.user = "";
                toaster.pop('success', '', $translate.instant('SIGNUP_SUCCESS'));
                $location.path('/login');
            },
            function (err) {
                $scope.user = "";
                toaster.pop('error', '', $translate.instant('SIGNUP_ERROR'));
            }
        );
    }
}
/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;

/**
 * Created by Max on 18.06.2016.
 */
/// <reference path="../../typeDefinitions/angular.d.ts" />
var TestController = (function () {
    function TestController() {
        this.name = "Susi";
    }
    TestController.prototype.changeName = function () {
        this.name = this.name === "Horst" ? "Hans" : "Horst";
    };
    return TestController;
}());
angular.module("testModule", []);
angular.module("testModule").controller("TestController", [TestController]);

/**
 * Created by Max on 27.07.2016.
 */
/// <reference path="../../typeDefinitions/angular.d.ts" />
var TestService = (function () {
    function TestService() {
        this.name = "Susi";
    }
    TestService.prototype.changeName = function () {
        this.name = this.name === "Horst" ? "Torsten" : "Horst";
    };
    return TestService;
}());
angular.module("app").factory("TestService", [function () { return new TestService(); }]);

/**
 * Created by Max on 27.07.2016.
 */
/// <reference path="../../typeDefinitions/angular.d.ts" />
/// <reference path="../../typeDefinitions/jasmine.d.ts" />
/// <reference path="../../typeDefinitions/angular-mock.d.ts" />
describe("TestController tests", function () {
    var testController;
    beforeEach(function () {
        angular.module("app");
        angular.module("testModule");
    });
    it("should not return the same name", function () {
        expect("Horst").toBe("Horst");
    });
    it("should be wrong", function () {
        expect(1).toBe(0);
    });
});

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

StatisticsCtrl.prototype.entireStatisticArea = function () {
    var chartConfig = {
        options: {
            chart: {
                type: 'area'
            },
            title: {
                text: ''
            },
            tooltip: {
                shared: true,
                valueSuffix: ' €',
                valueDecimals: 2
            },
            xAxis: {
                categories: [],
            },
            loading: false,
            yAxis: {
                title: {
                    text: this.translate.instant('STATISTIC_PROFIT_AND_RETURN_Y_AXIS'),
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            }
        },
        series: []
    };
    return chartConfig;
};

StatisticsCtrl.prototype.entireStatisticSpline = function () {
    var chartConfig = {
        options: {
            chart: {
                type: 'spline'
            },
            title: '',
            tooltip: {
                shared: true,
                valueSuffix: ''
            },
            loading: false,
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: this.translate.instant('STATISTIC_LEADS_OFFERS_SALES_Y_AXIS')
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            }
        },
        series: [],
        //function (optional)
        func: function (chart) {
            //setup some logic for the chart
        }
    };
    return chartConfig;
};

StatisticsCtrl.prototype.getLeadsConversionRate = function () {
    var chartConfig = {
        options: {
            chart: {
                type: 'spline'
            },
            title: {
                text: ''
            },
            loading: false,
            xAxis: {
                categories: [],
            },
            yAxis: {
                title: {
                    text: this.translate.instant('STATISTIC_SALES_OF_LEADS_Y_AXIS')
                },
                minorGridLineWidth: 1,
                gridLineWidth: 1,
                alternateGridColor: null

            },
            tooltip: {
                valueSuffix: ' %',
                valueDecimals: 2
            },
            plotOptions: {
                spline: {
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    marker: {
                        enabled: false
                    }
                }
            },
        },
        series: []
    };

    return chartConfig;
};


StatisticsCtrl.prototype.getOffersConversionRate = function () {
    var chartConfig = {
        options: {
            chart: {
                type: 'spline'
            },
            title: {
                text: ''
            },
            loading: false,
            xAxis: {
                categories: [],
            },
            yAxis: {
                title: {
                    text: this.translate.instant('STATISTIC_SALES_OF_OFFERS_Y_AXIS')
                },
                minorGridLineWidth: 1,
                gridLineWidth: 1,
                alternateGridColor: null

            },
            tooltip: {
                valueSuffix: ' %',
                valueDecimals: 2
            },
            plotOptions: {
                spline: {
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    marker: {
                        enabled: false
                    }
                }
            },
        },
        series: []
    };

    return chartConfig;
};

StatisticsCtrl.prototype.pushLeadsOffersSales = function () {
    this.chartEntireStatisticSpline.series.push({
        name: this.translate.instant('LEADS_MENU'),
        data: this.leadResult,
        color: '#ed5565'
    });
    this.chartEntireStatisticSpline.series.push({
        name: this.translate.instant('OFFERS_MENU'),
        data: this.offerResult,
        color: '#f8ac59'
    });
    this.chartEntireStatisticSpline.series.push({
        name: this.translate.instant('SALES_MENU'),
        data: this.saleResult,
        color: '#1a7bb9'
    });

}

StatisticsCtrl.prototype.pushProfitAndTurnover = function () {
    this.chartEntireStatisticArea.series.push({
        name: this.translate.instant('STATISTIC_TURNOVER'),
        data: this.turnoverResult,
        color: '#000000'
    });

    this.chartEntireStatisticArea.series.push({
        name: this.translate.instant('STATISTIC_PROFIT'),
        data: this.profitsResult,
        color: '#1a7bb9'
    });
}
/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

StatisticsCtrl.prototype.getProfit = function (profits) {
    this.profitsResult = profits.result;
    var summe = 0;
    for (var profit in profits.result) {
        summe = summe + profits.result[profit];
    }
    this.profit = summe;
};

StatisticsCtrl.prototype.getTurnover = function (turnovers) {
    this.turnoverResult = turnovers.result;
    var summe = 0;
    for (var turnover in turnovers.result) {
        summe = summe + turnovers.result[turnover];
    }
    this.turnover = summe;
};

StatisticsCtrl.prototype.getLeads = function (leads) {
    this.leadResult = leads.result;
    var summe = 0;
    for (var lead in leads.result) {
        summe += leads.result[lead];
    }
    this.leads = summe;
};

StatisticsCtrl.prototype.getOffers = function (offers) {
    this.offerResult = offers.result;
    var summe = 0;
    for (var offer in offers.result) {
        summe += offers.result[offer];
    }
    this.offers = summe;
};

StatisticsCtrl.prototype.getSales = function (sales) {
    this.saleResult = sales.result;
    var summe = 0;
    for (var sale in sales.result) {
        summe += sales.result[sale];
    }
    this.sales = summe;
};

StatisticsCtrl.prototype.getSalesLeadsRatePercentage = function () {
    if (this.leads != 0) {
        return (this.sales / this.leads) * 100;
    }
    else
        return 0;
};

StatisticsCtrl.prototype.getSalesOffersRatePercentage = function () {
    if (this.offers != 0) {
        return (this.sales / this.offers) * 100;
    }
    else
        return 0;
};

StatisticsCtrl.prototype.getEfficiency = function () {
    if (this.turnover != 0) {
        this.efficiency = (this.profit / this.turnover) * 100;
    }
    else
        this.efficiency = 0;
};

StatisticsCtrl.prototype.getConversionrate = function () {
    if (this.leads != 0) {
        this.conversionrate = (this.sales / this.leads) * 100;
    }
    else
        this.conversionrate = 0;
};

StatisticsCtrl.prototype.getProfitPerSale = function () {
    if (this.sales != 0) {
        this.profitPerSale = (this.profit / this.sales);
    }
    else
        this.profitPerSale = 0;
};

StatisticsCtrl.prototype.leadsConversionRate = function () {
    var salesToLeadsConversion = new Array();
    for (var counter in this.saleResult) {
        var lead = parseInt(this.leadResult[counter], 10);
        var sale = parseInt(this.saleResult[counter], 10);
        if (angular.isNumber(lead) && angular.isNumber(sale) && lead != 0) {
            salesToLeadsConversion.push((sale / lead) * 100);
        } else {
            salesToLeadsConversion.push(0);
        }
    }

    this.chartLeadsConversionRate.series.push({
        name: this.translate.instant('STATISTIC_SALES_OF_LEADS'),
        data: salesToLeadsConversion,
        color: '#ed5565'
    });
}

StatisticsCtrl.prototype.offersConversionRate = function () {
    var salesToOffersConversion = new Array();
    for (var counter in this.saleResult) {
        var offer = parseInt(this.offerResult[counter], 10);
        var sale = parseInt(this.saleResult[counter], 10);
        if (angular.isNumber(offer) && angular.isNumber(sale) && offer != 0) {
            salesToOffersConversion.push((sale / offer) * 100);
        } else {
            salesToOffersConversion.push(0);
        }
    }
    this.chartOffersConversionRate.series.push({
        name: this.translate.instant('STATISTIC_SALES_OF_OFFERS'),
        data: salesToOffersConversion,
        color: '#f8ac59'
    });
}

StatisticsCtrl.prototype.getSharedItemsPieChart = function () {
    var chartConfig = {
        options: {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            }
            ,
            title: {
                text: ''
            },
            tooltip: {},
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            }
        },
        series: [{
            name: this.translate.instant('STATISTIC_PARTS'),
            colorByPoint: true,
            data: []
        }],
        loading: false
    };

    return chartConfig;
};

StatisticsCtrl.prototype.pushToPieChart = function () {
    this.chartSingleStatisticPie.series[0].data.push({
        name: this.translate.instant('LEADS_MENU'),
        y: this.leads,
        color: '#ed5565'
    });

    this.chartSingleStatisticPie.series[0].data.push({
        name: this.translate.instant('OFFERS_MENU'),
        y: this.offers,
        color: '#f8ac59'
    });

    this.chartSingleStatisticPie.series[0].data.push({
        name: this.translate.instant('SALES_MENU'),
        y: this.sales,
        color: '#1a7bb9'
    });
}

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

'use strict';

angular.module('app.statistics', ['ngResource']).controller('StatisticsCtrl', StatisticsCtrl);

StatisticsCtrl.$inject = ['Leads', 'Offers', 'Sales', 'Profit', 'Turnover', '$translate', '$interval', '$scope'];

function StatisticsCtrl(Leads, Offers, Sales, Profit, Turnover, $translate, $interval, $scope) {

    this.translate = $translate;
    this.scope = $scope;
    this.interval = $interval;
    var vm = this;
    this.currentTab = 1;
    this.selectedPeriod = 'day';

    this.chartSingleStatisticPie = this.getSharedItemsPieChart();
    this.chartEntireStatisticSpline = this.entireStatisticSpline();
    this.chartEntireStatisticArea = this.entireStatisticArea();
    this.chartLeadsConversionRate = this.getLeadsConversionRate();
    this.chartOffersConversionRate = this.getOffersConversionRate();

    this.leadResult = {};
    this.offerResult = {};
    this.saleResult = {};
    this.profitsResult = {};
    this.turnoverResult = {};

    this.profit = {};
    this.turnover = {};
    this.leads = {};
    this.offers = {};
    this.sales = {};

    this.efficiency = {};
    this.conversionrate = {};
    this.profitPerSale = {};

    this.leadsService = Leads;
    this.offersService = Offers;
    this.salesService = Sales;
    this.profitService = Profit;
    this.turnoverService = Turnover;

    this.timeframe = [];
    this.weekday = new Array(7);
    this.weekday[0] = $translate.instant('SUNDAY');
    this.weekday[1] = $translate.instant('MONDAY');
    this.weekday[2] = $translate.instant('TUESDAY');
    this.weekday[3] = $translate.instant('WEDNESDAY');
    this.weekday[4] = $translate.instant('THURSDAY');
    this.weekday[5] = $translate.instant('FRIDAY');
    this.weekday[6] = $translate.instant('SATURDAY');

    this.month = new Array();
    this.month[0] = $translate.instant('JANUARY');
    this.month[1] = $translate.instant('FEBRUARY');
    this.month[2] = $translate.instant('MARCH');
    this.month[3] = $translate.instant('APRIL');
    this.month[4] = $translate.instant('MAY');
    this.month[5] = $translate.instant('JUNE');
    this.month[6] = $translate.instant('JULY');
    this.month[7] = $translate.instant('AUGUST');
    this.month[8] = $translate.instant('SEPTEMBER');
    this.month[9] = $translate.instant('OCTOBER');
    this.month[10] = $translate.instant('NOVEMBER');
    this.month[11] = $translate.instant('DECEMBER');

    this.isLeadPromise = false;
    this.isOfferPromise = false;
    this.isSalePromise = false;
    this.isProfitPromise = false;
    this.isTurnoverPromise = false;
    this.leadsService.day().$promise.then(function (result) {
        vm.getLeads(result);
        vm.isLeadPromise = true;
    });
    this.offersService.day().$promise.then(function (result) {
        vm.getOffers(result);
        vm.isOfferPromise = true;
    });
    this.salesService.day().$promise.then(function (result) {
        vm.getSales(result);
        vm.isSalePromise = true;
    });
    this.profitService.day().$promise.then(function (result) {
        vm.getProfit(result);
        vm.isProfitPromise = true;
    });
    this.turnoverService.day().$promise.then(function (result) {
        vm.getTurnover(result);
        vm.isTurnoverPromise = true;
    });

    this.checkPromises();

}
StatisticsCtrl.prototype.checkPromises = function () {
    var vm = this;
    var stop;
    this.scope.$on('$destroy', function () {
        if (angular.isDefined(stop)) {
            vm.interval.cancel(stop);
            stop = undefined;
        }
    });
    stop = this.interval(function () {
        if (vm.isLeadPromise == true && vm.isOfferPromise == true &&
            vm.isSalePromise == true && vm.isProfitPromise == true &&
            vm.isTurnoverPromise == true) {
            vm.getEfficiency();
            vm.getProfitPerSale();
            vm.pushProfitAndTurnover();
            vm.getConversionrate();
            vm.pushToPieChart();
            vm.pushLeadsOffersSales();
            vm.leadsConversionRate();
            vm.offersConversionRate();
            vm.interval.cancel(stop);
        }
    }.bind(this), 500);


}
StatisticsCtrl.prototype.tabOnClick = function (tab) {
    this.currentTab = tab;
};

StatisticsCtrl.prototype.onPeriodChange = function (selectedPeriod) {
    var vm = this;

    this.isLeadPromise = false;
    this.isOfferPromise = false;
    this.isSalePromise = false;
    this.isProfitPromise = false;
    this.isTurnoverPromise = false;

    this.selectedPeriod = selectedPeriod;

    this.chartSingleStatisticPie.series[0].data = [];
    this.chartEntireStatisticArea.series = [];
    this.chartEntireStatisticSpline.series = [];
    this.chartLeadsConversionRate.series = [];
    this.chartOffersConversionRate.series = [];

    this.timeframe = [];

    var date = Date.now();
    var currentDate = new Date();

    var dataProfit = [];
    var dataReturn = [];

    var dataLead = [];
    var dataOffer = [];
    var dataSale = [];

    var dataConversionLeads = [];
    var dataConversionOffers = [];

    switch (this.selectedPeriod) {
        case 'day':

            break;
        case 'week':
            var oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            while (oneWeekAgo <= currentDate) {
                this.timeframe.push(vm.weekday[oneWeekAgo.getDay()]);
                oneWeekAgo.setDate(oneWeekAgo.getDate() + 1);
            }

            break;
        case 'month':
            var oneMonthAgo = new Date();
            oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

            while (oneMonthAgo <= currentDate) {
                this.timeframe.push(oneMonthAgo.getDate() + '. ' + vm.month[oneMonthAgo.getMonth()]);
                oneMonthAgo.setDate(oneMonthAgo.getDate() + 1)
            }

            break;
        case 'year':
            var oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            while (oneYearAgo <= currentDate) {

                this.timeframe.push(vm.month[oneYearAgo.getMonth()]);
                oneYearAgo.setMonth(oneYearAgo.getMonth() + 1)
            }
            this.timeframe.push(oneYearAgo.toUTCString().split(' ')[2]);
            break;
        case 'all':
            var oneYearAgo = new Date(2014, 1, 1);

            while (oneYearAgo <= currentDate) {
                this.timeframe.push(oneYearAgo.getFullYear());
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() + 1);
            }

            break;
        default:
            console.log("Timeframe not found");
    }

    switch (selectedPeriod) {
        case 'day':
            this.leadsService.day().$promise.then(function (result) {
                vm.getLeads(result);
                vm.isLeadPromise = true;
            });
            vm.offersService.day().$promise.then(function (result) {
                vm.getOffers(result);
                vm.isOfferPromise = true;
            });
            vm.salesService.day().$promise.then(function (result) {
                vm.getSales(result);
                vm.isSalePromise = true;
            });
            vm.profitService.day().$promise.then(function (result) {
                vm.getProfit(result);
                vm.isProfitPromise = true;
            });
            vm.turnoverService.day().$promise.then(function (result) {
                vm.getTurnover(result);
                vm.isTurnoverPromise = true;
            });


            break;
        case 'week':
            this.leadsService.week().$promise.then(function (result) {
                vm.getLeads(result);
                vm.isLeadPromise = true;
            });
            vm.offersService.week().$promise.then(function (result) {
                vm.getOffers(result);
                vm.isOfferPromise = true;
            });
            vm.salesService.week().$promise.then(function (result) {
                vm.getSales(result);
                vm.isSalePromise = true;
            });
            vm.profitService.week().$promise.then(function (result) {
                vm.getProfit(result);
                vm.isProfitPromise = true;
            });
            vm.turnoverService.week().$promise.then(function (result) {
                vm.getTurnover(result);
                vm.isTurnoverPromise = true;
            });

            break;
        case 'month':
            this.leadsService.month().$promise.then(function (result) {
                vm.getLeads(result);
                vm.isLeadPromise = true;
            });
            vm.offersService.month().$promise.then(function (result) {
                vm.getOffers(result);
                vm.isOfferPromise = true;
            });
            vm.salesService.month().$promise.then(function (result) {
                vm.getSales(result);
                vm.isSalePromise = true;
            });
            vm.profitService.month().$promise.then(function (result) {
                vm.getProfit(result);
                vm.isProfitPromise = true;
            });
            vm.turnoverService.month().$promise.then(function (result) {
                vm.getTurnover(result);
                vm.isTurnoverPromise = true;
            });

            break;
        case 'year':
            this.leadsService.year().$promise.then(function (result) {
                vm.getLeads(result);
                vm.isLeadPromise = true;
            });
            vm.offersService.year().$promise.then(function (result) {
                vm.getOffers(result);
                vm.isOfferPromise = true;
            });
            vm.salesService.year().$promise.then(function (result) {
                vm.getSales(result);
                vm.isSalePromise = true;
            });
            vm.profitService.year().$promise.then(function (result) {
                vm.getProfit(result);
                vm.isProfitPromise = true;
            });
            vm.turnoverService.year().$promise.then(function (result) {
                vm.getTurnover(result);
                vm.isTurnoverPromise = true;
            });

            break;
        case 'all':
            this.leadsService.all().$promise.then(function (result) {
                vm.getLeads(result);
                vm.isLeadPromise = true;
            });
            vm.offersService.all().$promise.then(function (result) {
                vm.getOffers(result);
                vm.isOfferPromise = true;
            });
            vm.salesService.all().$promise.then(function (result) {
                vm.getSales(result);
                vm.isSalePromise = true;
            });
            vm.profitService.all().$promise.then(function (result) {
                vm.getProfit(result);
                vm.isProfitPromise = true;
            });
            vm.turnoverService.all().$promise.then(function (result) {
                vm.getTurnover(result);
                vm.isTurnoverPromise = true;
            });

            break;
        default:
            console.log("Time Frame not found.");
            break;
    }
    this.chartEntireStatisticArea.options.xAxis.categories = this.timeframe;
    this.chartEntireStatisticSpline.options.xAxis.categories = this.timeframe;
    this.chartLeadsConversionRate.options.xAxis.categories = this.timeframe;
    this.chartOffersConversionRate.options.xAxis.categories = this.timeframe;

    this.checkPromises();
};


/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

var app = angular.module("app");
app.directive("childrow", function () {
    var directive = {};
    directive.restrict = 'A';
    directive.templateUrl = function (elem, attr) {
        if (attr.type == 'lead')
            return 'component/leads/leadChildRow.html';
        else if (attr.type == 'offer')
            return 'component/offers/offerChildRow.html';
        else if (attr.type == 'sale')
            return 'component/sales/saleChildRow.html';

    };
    directive.transclude = true;
    directive.link = function (scope, element, attrs) {
    };
    return directive;
});

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

'use strict';

/* Directives */
var app = angular.module("app");
app.directive("pwCheck", function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    //console.info(elem.val() === $(firstPassword).val());
                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                });
            });
        }
    }
});
