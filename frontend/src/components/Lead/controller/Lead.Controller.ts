/// <reference path="../../../typeDefinitions/moment.d.ts" />
/// <reference path="../../../typeDefinitions/moment-node.d.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/OrderPosition.Model.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../Common/Process.Model.ts" />
/// <reference path="../../Lead/model/Lead.Model.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Workflow/Workflow.Service.ts" />
/// <reference path="../../Customer/controller/Customer.Service.ts" />
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

"use strict";

class LeadController {

    $inject = ["DTOptionsBuilder", "DTColumnBuilder", "$compile",
        "$scope", "toaster", "ProcessResource", "CommentResource", "$filter",
        "UserResource", "$rootScope", "$translate", "LeadResource", ProductServiceId, WorkflowServiceId, CustomerServiceId, CustomerResourceId];



    productService;
    workflowService: WorkflowService;
    customerService: CustomerService;
    scope;
    rootScope;
    commentResource;
    customerResource;
    filter;
    processResource;
    userResource;
    leadResource;
    translate;
    compile;
    toaster;
    dtOptions;
    dtColumns;
    windowWidth;
    addForm;

    user: User = new User();
    commentInput = {};
    commentModalInput = {};
    comments = {};
    currentCommentModalId = "";
    loadAllData = false;
    dtInstance = { DataTable: null };
    processes = {};
    rows = {};
    editProcess: Process = new Process();
    newLead: Lead = new Lead();
    editLead: Lead = new Lead();

    currentOrderPositions = [];
    currentProductId = "-1";
    currentProductAmount = 1;
    currentCustomerId = "-1";
    customerSelected: boolean = false;


    constructor(DTOptionsBuilder, DTColumnBuilder, $compile, $scope,
        toaster, ProcessResource, CommentResource, $filter, UserResource,
        $rootScope, $translate, LeadResource, ProductService, WorkflowService, CustomerService, CustomerResource) {

        this.productService = ProductService;
        this.workflowService = WorkflowService;
        this.customerService = CustomerService;
        this.filter = $filter;
        this.processResource = ProcessResource.resource;
        this.commentResource = CommentResource.resource;
        this.customerResource = CustomerResource.resource;
        this.userResource = UserResource.resource;
        this.leadResource = LeadResource.resource;
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.compile = $compile;
        this.toaster = toaster;

        let self = this;

        this.windowWidth = $(window).width();

        if (!angular.isUndefined($rootScope.globals.currentUser))
            this.userResource.get({
                id: $rootScope.globals.currentUser.id
            }).$promise.then(function (result) {
                self.user = result;
            });

        this.dtOptions = DTOptionsBuilder.newOptions().withOption("ajax", {
            url: "/api/rest/processes/workflow/LEAD/state/OPEN",
            error: function (xhr, error, thrown) {
                console.log(xhr);
            },
            type: "GET"
        }).withOption("stateSave", true).withDOM(
            "<'row'<'col-sm-12'l>>" + "<'row'<'col-sm-6'B><'col-sm-6'f>>"
            + "<'row'<'col-sm-12'tr>>"
            + "<'row'<'col-sm-5'i><'col-sm-7'p>>").withPaginationType(
            "full_numbers").withButtons([{
                extend: "copyHtml5",
                exportOptions: {
                    columns: [6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12],
                    modifier: {
                        page: "current"
                    }
                }
            }, {
                    extend: "print",
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12],
                        modifier: {
                            page: "current"
                        }
                    }
                }, {
                    extend: "csvHtml5",
                    title: $translate("LEAD_LEADS"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12],
                        modifier: {
                            page: "current"
                        }

                    }
                }, {
                    extend: "excelHtml5",
                    title: $translate.instant("LEAD_LEADS"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12],
                        modifier: {
                            page: "current"
                        }
                    }
                }, {
                    extend: "pdfHtml5",
                    title: $translate("LEAD_LEADS"),
                    orientation: "landscape",
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12],
                        modifier: {
                            page: "current"
                        }
                    }
                }]).withBootstrap().withOption("createdRow", createdRow).withOption(
            "order", [4, "desc"]);

        this.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                .renderWith(addDetailButton),
            DTColumnBuilder.newColumn("lead.customer.lastname").withTitle(
                $translate("COMMON_NAME")).withClass("text-center"),
            DTColumnBuilder.newColumn("lead.customer.company").withTitle(
                $translate("COMMON_COMPANY")).withClass("text-center"),
            DTColumnBuilder.newColumn("lead.customer.email").withTitle(
                $translate("COMMON_EMAIL")).withClass("text-center"),
            DTColumnBuilder.newColumn("lead.timestamp").withTitle(
                $translate("COMMON_DATE")).renderWith(
                function (data, type, full) {
                    let utcDate = moment.utc(data, "DD.MM.YYYY HH:mm");
                    let localDate = moment(utcDate).local();
                    return localDate.format("DD.MM.YYYY HH:mm");
                }).withOption("type", "date-euro")
                .withClass("text-center"),
            DTColumnBuilder.newColumn("lead.customer.phone").withTitle(
                $translate("COMMON_PHONE")).notVisible(),
            DTColumnBuilder.newColumn("lead.customer.firstname").withTitle(
                $translate("COMMON_FIRSTNAME")).notVisible(),
            DTColumnBuilder.newColumn("lead.deliveryAddress").withTitle(
                $translate("COMMON_CONTAINER")).notVisible(),
            DTColumnBuilder.newColumn("lead.deliveryAddress").withTitle(
                $translate("COMMON_CONTAINER_DESTINATION")).notVisible(),
            DTColumnBuilder.newColumn("lead.customer.lastname").withTitle(
                $translate("COMMON_CONTAINER_AMOUNT")).notVisible(),
            DTColumnBuilder.newColumn("null").withTitle(
                $translate("COMMON_CONTAINER_SINGLE_PRICE")).renderWith(
                function (data, type, full) {
                    return $filter("currency")(
                        0, "€", 2);
                }).notVisible(),
            DTColumnBuilder.newColumn(null).withTitle(
                $translate("COMMON_CONTAINER_ENTIRE_PRICE"))
                .renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.lead.leadPrice)) {
                        return $filter("currency")(0, "€", 2);
                    }
                    return $filter("currency")(data.lead.leadPrice,
                        "€", 2);
                }).notVisible(),

            DTColumnBuilder.newColumn(null).withTitle(
                $translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            DTColumnBuilder.newColumn(null).withTitle(
                "<span class='glyphicon glyphicon-cog'></span>").withClass(
                "text-center").notSortable().renderWith(addActionsButtons)];

        if ($rootScope.language === "DE") {
            self.dtOptions
                .withLanguageSource("/assets/datatablesTranslationFiles/German.json");
        } else {
            self.dtOptions
                .withLanguageSource("/assets/datatablesTranslationFiles/English.json");
        }


        function refreshData() {
            let resetPaging = false;
            this.dtInstance.reloadData(resetPaging);
        }

        function changeDataInput() {
            if (self.loadAllData === true) {
                self.dtOptions.withOption("serverSide", true).withOption("ajax", {
                    url: "/api/rest/processes/leads",
                    type: "GET",
                    pages: 5,
                    dataSrc: "data",
                    error: function (xhr, error, thrown) {
                        console.log(xhr);
                    }
                }).withOption("searchDelay", 500);
            } else {
                self.dtOptions.withOption("serverSide", false).withOption("ajax", {
                    url: "/api/rest/processes/workflow/LEAD/state/OPEN",
                    error: function (xhr, error, thrown) {
                        console.log(xhr);
                    },
                    type: "GET"
                }).withOption("searchDelay", 0);
            }
        }

        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            self.rows[data.id] = row;
            let currentDate = moment(moment() + "", "DD.MM.YYYY");
            let leadDate = moment(data.lead.timestamp, "DD.MM.YYYY");
            if (currentDate["businessDiff"](leadDate, "days") > 3
                && data.status === "OPEN")
                $(row).addClass("important");
            self.compile(angular.element(row).contents())(self.scope);
        }

        function addActionsButtons(data, type, full, meta) {
            self.processes[data.id] = data;
            let disabled = "";
            let disablePin = "";
            let hasRightToDelete = "";
            let closeOrOpenInquiryDisable = "";
            let openOrLock = $translate.instant("LEAD_CLOSE_LEAD");
            let faOpenOrLock = "fa fa-lock";
            if (data.status !== "OPEN") {
                disabled = "disabled";
                disablePin = "disabled";
                openOrLock = $translate.instant("LEAD_OPEN_LEAD");
                faOpenOrLock = "fa fa-unlock";
            }
            if (data.offer !== null || data.sale !== null) {
                closeOrOpenInquiryDisable = "disabled";
            }
            if ($rootScope.globals.currentUser.role === "USER") {
                hasRightToDelete = "disabled";
            }
            if (data.processor !== null
                && $rootScope.globals.currentUser.username !== data.processor.username) {
                disablePin = "disabled";
            }
            if (self.windowWidth > 1300) {
                return "<div style='white-space: nowrap;'><button class='btn btn-white' "
                    + disabled
                    + " ng-click='lead.createOffer(lead.processes["
                    + data.id
                    + "])' title='"
                    + $translate.instant("LEAD_FOLLOW_UP")
                    + "'>"
                    + "   <i class='fa fa-check'></i>"
                    + "</button>&nbsp;"
                    + "<button class='btn btn-white' "
                    + disablePin
                    + " ng-click='lead.pin(lead.processes["
                    + data.id
                    + "])' title='"
                    + $translate.instant("LEAD_PIN")
                    + "'>"
                    + "   <i class='fa fa-thumb-tack'></i>"
                    + "</button>&nbsp;"
                    + "<button class='btn btn-white' "
                    + closeOrOpenInquiryDisable
                    + " ng-click='lead.closeOrOpenInquiry(lead.processes["
                    + data.id
                    + "])' title='"
                    + openOrLock
                    + "'>"
                    + "   <i class='"
                    + faOpenOrLock
                    + "'></i>"
                    + "</button>&nbsp;"
                    + "<button class='btn btn-white' "
                    + closeOrOpenInquiryDisable
                    + " ng-click='lead.loadDataToModal(lead.processes["
                    + data.id
                    + "])' data-toggle='modal'"
                    + "data-target='#editModal' title='"
                    + $translate.instant("LEAD_EDIT_LEAD")
                    + "'>"
                    + "<i class='fa fa-edit'></i>"
                    + "</button>&nbsp;"
                    + "<button class='btn btn-white' "
                    + hasRightToDelete
                    + " ng-click='lead.deleteRow(lead.processes["
                    + data.id
                    + "])' title='"
                    + $translate.instant("LEAD_DELETE_LEAD")
                    + "'>"
                    + "   <i class='fa fa-trash-o'></i>"
                    + "</button></div>";
            } else {
                return "<div class='dropdown'>"
                    + "<button class='btn btn-white dropdown-toggle' type='button' data-toggle='dropdown'>"
                    + "<i class='fa fa-wrench'></i></button>"
                    + "<ul class='dropdown-menu pull-right'>"
                    + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                    + disabled
                    + " ng-click='lead.followUp(lead.processes["
                    + data.id
                    + "])'><i class='fa fa-check'>&nbsp;</i>"
                    + $translate.instant("LEAD_FOLLOW_UP")
                    + "</button></li>"
                    + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                    + disablePin
                    + " ng-click='lead.pin(lead.processes["
                    + data.id
                    + "])'><i class='fa fa-thumb-tack'>&nbsp;</i>"
                    + $translate.instant("LEAD_PIN")
                    + "</button></li>"
                    + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                    + closeOrOpenInquiryDisable
                    + " ng-click='lead.closeOrOpenInquiry(lead.processes["
                    + data.id
                    + "])'><i class='"
                    + faOpenOrLock
                    + "'>&nbsp;</i>"
                    + openOrLock
                    + "</button></li>"
                    + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                    + closeOrOpenInquiryDisable
                    + " data-toggle='modal' data-target='#editModal' ng-click='lead.loadDataToModal(lead.processes["
                    + data.id
                    + "])'><i class='fa fa-edit''>&nbsp;</i>"
                    + $translate.instant("LEAD_EDIT_LEAD")
                    + "</button></li>"
                    + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                    + hasRightToDelete
                    + " ng-click='lead.deleteRow(lead.processes["
                    + data.id
                    + "])'><i class='fa fa-trash-o'>&nbsp;</i>"
                    + $translate.instant("LEAD_DELETE_LEAD")
                    + "</button></li>"
                    + "</ul>" + "</div>";
            }
        }

        function addStatusStyle(data, type, full, meta) {
            self.processes[data.id] = data;
            let hasProcessor = "";
            if (data.processor !== null)
                hasProcessor = "&nbsp;<span style='color: #ea394c;'><i class='fa fa-thumb-tack'></i></span>";
            if (data.status === "OPEN") {
                return "<span style='color: green;'>"
                    + $translate.instant("COMMON_STATUS_OPEN") + "</span>"
                    + hasProcessor;
            } else if (data.status === "OFFER") {
                return "<span style='color: #f79d3c;'>"
                    + $translate.instant("COMMON_STATUS_OFFER") + "</span>";
            } else if (data.status === "FOLLOWUP") {
                return "<span style='color: #f79d3c;'>"
                    + $translate.instant("COMMON_STATUS_FOLLOW_UP") + "</span>";
            } else if (data.status === "SALE") {
                return "<span style='color: #1872ab;'>"
                    + $translate.instant("COMMON_STATUS_SALE") + "</span>";
            } else if (data.status === "CLOSED") {
                return "<span style='color: #ea394c;'>"
                    + $translate.instant("COMMON_STATUS_CLOSED") + "</span>";
            }
        }

        function addDetailButton(data, type, full, meta) {
            self.processes[data.id] = data;
            return "<a class='green shortinfo' href='javascript:;'"
                + "ng-click='lead.appendChildRow(lead.processes[" + data.id
                + "], $event)' title='Details'>"
                + "<i class='glyphicon glyphicon-plus-sign'/></a>";
        }
    }

    getOrderPositions(process) {
        return process.lead.orderPositions;
    }

    appendChildRow(process, event) {
        let childScope = this.scope.$new(true);
        childScope.childData = process;
        let self = this;
        this.commentResource.getByProcessId({
            id: process.id
        }).$promise.then(function (result) {
            self.comments[process.id] = [];
            for (let comment in result) {
                if (comment === "$promise")
                    break;
                self.comments[process.id].push({
                    commentText: result[comment].commentText,
                    timestamp: result[comment].timestamp,
                    creator: result[comment].creator
                });
            }
        });
        childScope.parent = this;

        let link = angular.element(event.currentTarget), icon = link
            .find(".glyphicon"), tr = link.parent().parent(), table = this.dtInstance.DataTable, row = table
                .row(tr);

        if (row.child.isShown()) {
            icon.removeClass("glyphicon-minus-sign")
                .addClass("glyphicon-plus-sign");
            row.child.hide();
            tr.removeClass("shown");
        } else {
            icon.removeClass("glyphicon-plus-sign")
                .addClass("glyphicon-minus-sign");
            row.child(
                this.compile(
                    "<div childrow type='lead' class='clearfix'></div>")(
                    childScope)).show();
            tr.addClass("shown");
        }
    }

    loadCurrentIdToModal(id) {
        this.currentCommentModalId = id;
    };

    addComment(id, source) {
        this.workflowService.addComment(id, source, this.processes[id], this.user, this.comments, this.commentInput, this.commentModalInput);
    };

    saveLead() {
        let self = this;
        if (angular.isUndefined(this.newLead.customer)) {
            this.newLead.customer = {
                title: "UNKNOWN"
            };
        }
        this.newLead.timestamp = this.filter("date")
            (new Date(), "dd.MM.yyyy HH:mm", "UTC");
        this.newLead.vendor = {
            name: "***REMOVED***"
        };
        let process = {
            lead: this.newLead,
            status: "OPEN"
        };
        let tempLead: Lead = this.newLead;
        if (isNullOrUndefined(tempLead.customer.id) || isNaN(Number(tempLead.customer.id)) || Number(tempLead.customer.id) <= 0) {
            tempLead.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(tempLead.customer).$promise.then(function (customer) {
                tempLead.customer = customer;
                self.processResource.save(process).$promise.then(function (result) {
                    self.toaster.pop("success", "", self.translate
                        .instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
                    self.rootScope.leadsCount += 1;
                    self.addForm.$setPristine();
                    self.dtInstance.DataTable.row.add(result).draw();
                    self.customerService.getAllCustomer();
                });
            });
            return;
        }

        this.processResource.save(process).$promise.then(function (result) {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
            self.rootScope.leadsCount += 1;
            self.addForm.$setPristine();
            self.dtInstance.DataTable.row.add(result).draw();
        });
    };

    clearNewLead() {
        this.newLead = new Lead();
        this.newLead.containerAmount = 1;
        this.newLead.container = {
            name: "placholder",
            priceNetto: 666
        };
        this.newLead.orderPositions = [];
        this.currentOrderPositions = [];
        this.currentProductId = "-1";
        this.currentCustomerId = "-1";
        this.currentProductAmount = 1;
        this.customerSelected = false;
    };

    createOffer(process: Process) {
        let self = this;
        let offer: Offer = {
            id: 0,
            container: {
                name: "",
                description: "",
                priceNetto: 0
            },
            orderPositions: deepCopy(process.lead.orderPositions),
            containerAmount: process.lead.containerAmount,
            deliveryAddress: process.lead.deliveryAddress,
            deliveryDate: null,
            offerPrice: self.sumOrderPositions(process.lead.orderPositions),
            customer: process.lead.customer,
            timestamp: moment.utc().format("DD.MM.YYYY HH:mm"),
            vendor: process.lead.vendor
        };
        for (let i = 0; i < offer.orderPositions.length; i++) {
            offer.orderPositions[i].id = 0;
        }
        this.processResource.createOffer({
            id: process.id
        }, offer).$promise.then(function () {
            self.processResource.setStatus({
                id: process.id
            }, "OFFER").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_NEW_OFFER"));
                self.rootScope.leadsCount -= 1;
                self.rootScope.offersCount += 1;
                if (process.processor === null) {
                    self.processResource.setProcessor({
                        id: process.id
                    }, self.user.id).$promise.then(function () {
                        process.processor = self.user;
                        process.offer = offer;
                        process.status = "OFFER";
                        if (self.loadAllData === true) {
                            self.updateRow(process);
                        }
                    });
                }
                if (self.loadAllData === false) {
                    self.dtInstance.DataTable.row(self.rows[process.id]).remove()
                        .draw();
                }
            });
        });
    };

    pin(process) {
        let self = this;
        if (process.processor === null) {
            this.processResource.setProcessor({
                id: process.id
            }, self.user.id).$promise.then(function () {
                process.processor = self.user;
                self.updateRow(process);
            });
        } else {
            this.processResource.removeProcessor({
                id: process.id
            }).$promise.then(function () {
                process.processor = null;
                self.updateRow(process);
            });
        }
    }

    closeOrOpenInquiry(process) {
        let self = this;
        if (process.status === "OPEN") {
            this.processResource.setStatus({
                id: process.id
            }, "CLOSED").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_CLOSE_LEAD"));
                self.rootScope.leadsCount -= 1;
                process.status = "CLOSED";
                self.updateRow(process);
            });
        } else if (process.status === "CLOSED") {
            this.processResource.setStatus({
                id: process.id
            }, "OPEN").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_OPEN_LEAD"));
                self.rootScope.leadsCount += 1;
                process.status = "OPEN";
                self.updateRow(process);
            });
        }
    };

    loadDataToModal(process) {
        this.currentProductId = "-1";
        this.currentProductAmount = 1;
        this.editProcess = process;
        this.currentOrderPositions = deepCopy(this.editProcess.lead.orderPositions);
        this.customerSelected = false;
        this.currentCustomerId = this.editProcess.lead.customer.id + "";
        this.selectCustomer(this.editProcess.lead);
        this.editLead = this.editProcess.lead;
    };

    saveEditedRow = function () {
        let self = this;
        this.editLead.orderPositions = this.currentOrderPositions;
        let tempLead: Lead = this.editProcess.lead;
        tempLead.customer.id = this.editLead.customer.id;

        if (isNullOrUndefined(tempLead.customer.id) || isNaN(Number(tempLead.customer.id)) || Number(tempLead.customer.id) <= 0) {
            tempLead.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(tempLead.customer).$promise.then(function (customer) {
                tempLead.customer = customer;

                self.processResource.save(self.editProcess).$promise.then(function (result) {
                    self.toaster.pop("success", "", self.translate
                        .instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
                    self.rootScope.leadsCount += 1;
                    self.addForm.$setPristine();
                    self.dtInstance.DataTable.row.add(result).draw();
                    self.customerService.getAllCustomer();
                });
            });
            return;
        }


        this.leadResource.update(this.editProcess.lead).$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_UPDATE_LEAD"));
            self.editForm.$setPristine();
            self.editProcess.lead.leadPrice = self.sumOrderPositions(self.editProcess.lead.orderPositions);
            self.updateRow(self.editProcess);
        });
    };

    deleteRow(process) {
        let self = this;
        let leadId = process.lead.id;
        if (process.sale !== null || process.offer !== null) {
            self.toaster.pop("error", "", self.translate
                .instant("COMMON_TOAST_FAILURE_DELETE_LEAD"));
            return;
        }
        process.lead = null;
        this.processResource.update(process).$promise.then(function () {
            if (process.offer === null && process.sale === null) {
                self.processResource.drop({
                    id: process.id
                });
            }
            self.leadResource.drop({
                id: leadId
            }).$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_DELETE_LEAD"));
                self.rootScope.leadsCount -= 1;
                self.dtInstance.DataTable.row(self.rows[process.id]).remove().draw();
            });
        });
    };

    updateRow(process) {
        this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw(
            false);
        this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
    };

    addProduct(array) {
        this.workflowService.addProduct(array, this.currentProductId, this.currentProductAmount);
    }
    deleteProduct(array, index) {
        this.workflowService.deleteProduct(array, index);
    }
    sumOrderPositions(array) {
        return this.workflowService.sumOrderPositions(array);
    }

    selectCustomer(lead: Lead) {
        if (isNullOrUndefined(Number(this.currentCustomerId)) || Number(this.currentCustomerId) <= 0) {
            this.customerSelected = false;
            lead.customer = new Customer();
            lead.customer.id = 0;
            this.editLead.customer.id = 0;
            console.log(this.customerSelected);
            return;
        }

        let temp: Customer = findElementById(this.customerService.customer, Number(this.currentCustomerId)) as Customer;
        if (isNullOrUndefined(temp)) {
            this.customerSelected = false;
            lead.customer = new Customer();
            lead.customer.id = 0;
            this.editLead.customer.id = 0;
            console.log(this.customerSelected);
            return;
        }
        lead.customer = deepCopy(temp);
        this.customerSelected = true;
        console.log(this.customerSelected);
    }





}
angular.module("app.lead", ["ngResource"]).controller("LeadController", LeadController);




