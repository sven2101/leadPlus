/// <reference path="../../../typeDefinitions/moment.d.ts" />
/// <reference path="../../../typeDefinitions/moment-node.d.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../common/model/OrderPosition.Model.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
/// <reference path="../../Lead/model/Lead.Model.ts" />
/// <reference path="../../Sale/model/Sale.Model.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../common/service/Workflow.Service.ts" />
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

class SaleController {

    $inject = ["DTOptionsBuilder", "DTColumnBuilder", "$compile",
        "$scope", "toaster", "ProcessResource", "CommentResource", "$filter",
        "UserResource", "$rootScope", "$translate", "SaleResource", ProductServiceId, WorkflowServiceId];

    filter;
    processResource;
    commentResource;
    saleResource;
    userResource;
    workflowService;
    productService;
    scope;
    rootScope;
    translate;
    compile;
    toaster;
    dtOptions;
    dtColumns;

    user = new User();
    commentInput = {};
    commentModalInput = {};
    comments = {};
    currentCommentModalId = "";
    loadAllData = false;
    currentOrderPositions = [];
    currentProductId = "-1";
    currentProductAmount = 1;
    dtInstance = { DataTable: null };
    processes = {};
    rows = {};
    editProcess = new Process();
    newSale = new Sale();
    editForm;

    constructor(DTOptionsBuilder, DTColumnBuilder, $compile, $scope,
        toaster, ProcessResource, CommentResource, $filter, UserResource,
        $rootScope, $translate, SaleResource, ProductService, WorkflowService) {

        this.filter = $filter;
        this.processResource = ProcessResource.resource;
        this.commentResource = CommentResource.resource;
        this.saleResource = SaleResource.resource;
        this.userResource = UserResource.resource;
        this.workflowService = WorkflowService;
        this.productService = ProductService;
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.compile = $compile;
        this.toaster = toaster;

        let self = this;

        if (!angular.isUndefined($rootScope.globals.user))
            this.userResource.get({
                id: $rootScope.globals.user.id
            }).$promise.then(function (result) {
                self.user = result;
            });

        this.dtOptions = DTOptionsBuilder.newOptions().withOption("ajax", {
            url: "/api/rest/processes/sales/latest/100",
            error: function (xhr, error, thrown) {
                console.log(xhr);
            },
            type: "GET"
        }).withDOM(
            "<'row'<'col-sm-12'l>>" + "<'row'<'col-sm-6'B><'col-sm-6'f>>"
            + "<'row'<'col-sm-12'tr>>"
            + "<'row'<'col-sm-5'i><'col-sm-7'p>>").withPaginationType(
            "full_numbers").withOption("stateSave", true).withButtons([{
                extend: "copyHtml5",
                exportOptions: {
                    columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
                    modifier: {
                        page: "current"
                    }
                }
            }, {
                    extend: "print",
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
                        modifier: {
                            page: "current"
                        }
                    }
                }, {
                    extend: "csvHtml5",
                    title: $translate("SALE_SALES"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
                        modifier: {
                            page: "current"
                        }

                    }
                }, {
                    extend: "excelHtml5",
                    title: $translate.instant("SALE_SALES"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
                        modifier: {
                            page: "current"
                        }
                    }
                }, {
                    extend: "pdfHtml5",
                    title: $translate("SALE_SALES"),
                    orientation: "landscape",
                    exportOptions: {
                        columns: [6, 1, 2, 8, 7, 9, 10, 11, 12, 13, 14],
                        modifier: {
                            page: "current"
                        }
                    }
                }]).withBootstrap().withOption("createdRow", createdRow).withOption(
            "order", [4, "desc"]);
        this.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                .renderWith(addDetailButton),
            DTColumnBuilder.newColumn("sale.customer.lastname").withTitle(
                $translate("COMMON_NAME")).withClass("text-center"),
            DTColumnBuilder.newColumn("sale.customer.company").withTitle(
                $translate("COMMON_COMPANY")).withClass("text-center"),
            DTColumnBuilder.newColumn("sale.customer.email").withTitle(
                $translate("COMMON_EMAIL")).withClass("text-center"),
            DTColumnBuilder.newColumn("sale.timestamp").withTitle(
                $translate("COMMON_DATE")).renderWith(
                function (data, type, full) {
                    let utcDate = moment.utc(data, "DD.MM.YYYY HH:mm");
                    let localDate = moment(utcDate).local();
                    return localDate.format("DD.MM.YYYY HH:mm");
                }).withOption("type", "date-euro")
                .withClass("text-center"),
            DTColumnBuilder.newColumn("sale.customer.phone").withTitle(
                $translate("COMMON_PHONE")).notVisible(),
            DTColumnBuilder.newColumn("sale.customer.firstname").withTitle(
                $translate("COMMON_FIRSTNAME")).notVisible(),
            DTColumnBuilder.newColumn("sale.customer.lastname").withTitle(
                $translate("COMMON_CONTAINER")).notVisible(),
            DTColumnBuilder.newColumn("sale.transport").withTitle(
                $translate("COMMON_CONTAINER_DESTINATION")).notVisible(),
            DTColumnBuilder.newColumn("sale.customer.lastname").withTitle(
                $translate("COMMON_CONTAINER_AMOUNT")).notVisible(),
            DTColumnBuilder.newColumn(null).withTitle(
                $translate("COMMON_CONTAINER_SINGLE_PRICE")).renderWith(
                function (data, type, full) {
                    return $filter("currency")(
                        0, "€", 2);
                }).notVisible(),
            DTColumnBuilder.newColumn(null).withTitle(
                $translate("COMMON_CONTAINER_ENTIRE_PRICE")).renderWith(
                function (data, type, full) {
                    return $filter("currency")(
                        0, "€", 2);
                }).notVisible(),
            DTColumnBuilder.newColumn(null).withTitle(
                $translate("COMMON_CONTAINER_SALE_TURNOVER")).renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.sale.saleReturn)) {
                        return $filter("currency")(0, "€", 2);
                    }
                    return $filter("currency")
                        (data.sale.saleReturn, "€", 2);
                }).notVisible(),
            DTColumnBuilder.newColumn(null).withTitle(
                $translate("COMMON_CONTAINER_SALE_PROFIT")).renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.sale.saleProfit)) {
                        return $filter("currency")(0, "€", 2);
                    }
                    return $filter("currency")
                        (data.sale.saleProfit, "€", 2);
                }).notVisible(),
            DTColumnBuilder.newColumn("processor.username").withTitle(
                $translate("COMMON_PROCESSOR")).notVisible(),
            DTColumnBuilder.newColumn(null).withTitle(
                $translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            DTColumnBuilder.newColumn(null).withTitle(
                "<span class='glyphicon glyphicon-cog'></span>").withClass(
                "text-center").notSortable().renderWith(addActionsButtons)];

        if ($rootScope.language === "de") {
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
                    url: "/api/rest/processes/sales",
                    type: "GET",
                    pages: 5,
                    dataSrc: "data",
                    error: function (xhr, error, thrown) {
                        console.log(xhr);
                    }
                }).withOption("searchDelay", 500);
            } else {
                self.dtOptions.withOption("serverSide", false).withOption("ajax", {
                    url: "/api/rest/processes/sales/latest/100",
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
            self.compile(angular.element(row).contents())(self.scope);
        }

        function addActionsButtons(data, type, full, meta) {
            self.processes[data.id] = data;
            let hasRightToDelete = "";
            if ($rootScope.globals.user.role === "USER") {
                hasRightToDelete = "disabled";
            }
            return "<button class='btn btn-white' ng-click='sale.loadDataToModal(sale.processes["
                + data.id
                + "])' data-toggle='modal'"
                + "data-target='#editModal' title='"
                + $translate.instant("SALE_EDIT_SALE")
                + "'>"
                + "<i class='fa fa-edit'></i>"
                + "</button>&nbsp;"
                + "<button class='btn btn-white'"
                + hasRightToDelete
                + " ng-click='sale.deleteRow(sale.processes["
                + data.id
                + "])' title='"
                + $translate.instant("SALE_DELETE_SALE")
                + "'>"
                + "   <i class='fa fa-trash-o'></i>" + "</button>";
        }

        function addStatusStyle(data, type, full, meta) {
            return "<div style='color: #1872ab;'>"
                + $translate.instant("COMMON_STATUS_SALE") + "</div>";
        }

        function addDetailButton(data, type, full, meta) {
            self.processes[data.id] = data;
            return "<a class='green shortinfo' href='javascript:;'"
                + "ng-click='sale.appendChildRow(sale.processes[" + data.id
                + "], $event)' title='Details'>"
                + "<i class='glyphicon glyphicon-plus-sign'/></a>";
        }
    }
    getOrderPositions(process) {
        return process.sale.orderPositions;
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
                    "<div childrow type='sale' class='clearfix'></div>")(
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

    clearNewSale() {
        this.newSale = new Sale();
        this.newSale.containerAmount = 1;
        this.newSale.container = {
            name: "placholder",
            priceNetto: 666
        };
        this.newSale.containerAmount = 1;
        this.newSale.container = {
            priceNetto: 0
        };
    };

    loadDataToModal(sale) {
        this.currentProductId = "-1";
        this.currentProductAmount = 1;
        this.editProcess = sale;
        this.currentOrderPositions = deepCopy(this.editProcess.sale.orderPositions);

    };

    saveEditedRow() {
        let self = this;
        this.editProcess.sale.orderPositions = this.currentOrderPositions;
        this.saleResource.update(this.editProcess.sale).$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_UPDATE_SALE"));
            self.editForm.$setPristine();
            self.updateRow(self.editProcess);
        });
    };

    deleteRow(process) {
        let self = this;
        let saleId = process.sale.id;
        process.status = "CLOSED";
        process.sale = null;
        this.processResource.update(process).$promise.then(function () {
            if (process.lead === null && process.sale === null) {
                self.processResource.deleteProcess({
                    id: process.id
                });
            }
            self.saleResource.drop({
                id: saleId
            }).$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_DELETE_SALE"));
                self.dtInstance.DataTable.row(self.rows[process.id]).remove().draw();
            });
        });
    };

    updateRow(process) {
        this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw();
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

}
angular.module("app.sale", ["ngResource"]).controller("SaleController", SaleController);


