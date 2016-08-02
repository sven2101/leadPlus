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

class SalesController {

    $inject = ["DTOptionsBuilder", "DTColumnBuilder", "$compile", "$scope", "toaster", "Processes", "Comments", "$filter", "Profile", "$rootScope", "$translate"];

    filter;
    processesService;
    commentService;
    userService;
    DTOptionsBuilder;
    DTColumnBuilder;
    windowWidth;
    scope;
    rootScope;
    translate;
    compile;
    toaster;
    user;
    commentInput = {};
    commentModalInput = {};
    comments = {};
    currentCommentModalId = "";
    loadAllData = false;
    dtInstance;
    processes = {};
    rows = {};
    editProcess;
    newSale;
    addForm;
    editForm;

    dtOptions;
    dtColumns;

    constructor(DTOptionsBuilder, DTColumnBuilder, $compile, $scope, toaster, Processes, Comments, $filter, Profile, $rootScope, $translate) {
        this.filter = $filter;
        this.processesService = Processes;
        this.commentService = Comments;
        this.userService = Profile;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.DTColumnBuilder = DTColumnBuilder;
        this.user = {};
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.compile = $compile;
        this.toaster = toaster;
        this.setUser();
        this.setDTOptions();
        this.setDTColumns();

        if (this.rootScope.language === "de") {
            this.dtOptions
                .withLanguageSource("/assets/datatablesTranslationFiles/German.json");
        } else {
            this.dtOptions
                .withLanguageSource("/assets/datatablesTranslationFiles/English.json");
        }
    }

    setUser() {
        let self = this;
        if (!angular.isUndefined(this.rootScope.globals.currentUser))
            this.userService.get({
                username: this.rootScope.globals.currentUser.username
            }).$promise.then(function (result) {
                self.user = result;
            });
    }

    setDTOptions() {
        this.dtOptions = this.DTOptionsBuilder.newOptions().withOption("ajax", {
            url: "/api/rest/processes/latest100Sales",
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
                    title: this.translate("SALE_SALES"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
                        modifier: {
                            page: "current"
                        }

                    }
                }, {
                    extend: "excelHtml5",
                    title: this.translate.instant("SALE_SALES"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 8, 7, 9, 10, 11, 12, 13, 14],
                        modifier: {
                            page: "current"
                        }
                    }
                }, {
                    extend: "pdfHtml5",
                    title: this.translate("SALE_SALES"),
                    orientation: "landscape",
                    exportOptions: {
                        columns: [6, 1, 2, 8, 7, 9, 10, 11, 12, 13, 14],
                        modifier: {
                            page: "current"
                        }
                    }
                }]).withBootstrap().withOption("createdRow", this.createdRow).withOption(
            "order", [4, "desc"]);
    }

    setDTColumns() {
        this.dtColumns = [
            this.DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                .renderWith(this.addDetailButton),
            this.DTColumnBuilder.newColumn("sale.customer.lastname").withTitle(
                this.translate("COMMON_NAME")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.company").withTitle(
                this.translate("COMMON_COMPANY")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.email").withTitle(
                this.translate("COMMON_EMAIL")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.timestamp").withTitle(
                this.translate("COMMON_DATE")).withOption("type", "date-euro")
                .withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.phone").withTitle(
                this.translate("COMMON_PHONE")).notVisible(),
            this.DTColumnBuilder.newColumn("sale.customer.firstname").withTitle(
                this.translate("COMMON_FIRSTNAME")).notVisible(),
            this.DTColumnBuilder.newColumn("sale.container.name").withTitle(
                this.translate("COMMON_CONTAINER")).notVisible(),
            this.DTColumnBuilder.newColumn("sale.transport").withTitle(
                this.translate("COMMON_CONTAINER_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn("sale.containerAmount").withTitle(
                this.translate("COMMON_CONTAINER_AMOUNT")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_CONTAINER_SINGLE_PRICE")).renderWith(
                function (data, type, full) {
                    return this.filter("currency")(
                        data.sale.container.priceNetto, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_CONTAINER_ENTIRE_PRICE")).renderWith(
                function (data, type, full) {
                    return this.filter("currency")(
                        data.sale.container.priceNetto
                        * data.sale.containerAmount, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_CONTAINER_SALE_TURNOVER")).renderWith(
                function (data, type, full) {
                    return this.filter("currency")
                        (data.sale.saleReturn, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_CONTAINER_SALE_PROFIT")).renderWith(
                function (data, type, full) {
                    return this.filter("currency")
                        (data.sale.saleProfit, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn("processor.username").withTitle(
                this.translate("COMMON_PROCESSOR")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(this.addStatusStyle),
            this.DTColumnBuilder.newColumn(null).withTitle(
                "<span class='glyphicon glyphicon-cog'></span>").withClass(
                "text-center").notSortable().renderWith(this.addActionsButtons)];
    }
    refreshData() {
        let resetPaging = true;
        this.dtInstance.reloadData(resetPaging);
    }
    changeDataInput() {
        let self = this;
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
                url: "/api/rest/processes/latest100Sales",
                error: function (xhr, error, thrown) {
                    console.log(xhr);
                },
                type: "GET"
            }).withOption("searchDelay", 0);
        }
    }
    createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        let self = this;
        self.rows[data.id] = row;
        self.compile(angular.element(row).contents())(self.scope);
    }
    addActionsButtons(data, type, full, meta) {
        this.processes[data.id] = data;
        let hasRightToDelete = "";
        if (this.rootScope.globals.currentUser.role === "user") {
            hasRightToDelete = "disabled";
        }
        return "<button class='btn btn-white' ng-click='sale.loadDataToModal(sale.processes["
            + data.id
            + "])' data-toggle='modal'"
            + "data-target='#editModal' title='"
            + this.translate.instant("SALE_EDIT_SALE")
            + "'>"
            + "<i class='fa fa-edit'></i>"
            + "</button>&nbsp;"
            + "<button class='btn btn-white'"
            + hasRightToDelete
            + " ng-click='sale.deleteRow(sale.processes["
            + data.id
            + "])' title='"
            + this.translate.instant("SALE_DELETE_SALE")
            + "'>"
            + "   <i class='fa fa-trash-o'></i>" + "</button>";
    }
    addStatusStyle(data, type, full, meta) {
        return "<div style='color: #1872ab;'>"
            + this.translate.instant("COMMON_STATUS_SALE") + "</div>";
    }
    addDetailButton(data, type, full, meta) {
        let self = this;
        self.processes[data.id] = data;
        return "<a class='green shortinfo' href='javascript:;'"
            + "ng-click='sale.appendChildRow(sale.processes[" + data.id
            + "], $event)' title='Details'>"
            + "<i class='glyphicon glyphicon-plus-sign'/></a>";
    }

    appendChildRow(process, event) {
        let childScope = this.scope.$new(true);
        childScope.childData = process;
        let self = this;
        this.commentService.getComments({
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
    }
    addComment(id, source) {
        let self = this;
        let commentText = "";
        if (angular.isUndefined(this.comments[id])) {
            this.comments[id] = [];
        }
        if (source === "table" && this.commentInput[id] !== ""
            && !angular.isUndefined(this.commentInput[id])) {
            commentText = this.commentInput[id];
        } else if (source === "modal" && this.commentModalInput[id] !== ""
            && !angular.isUndefined(this.commentModalInput[id])) {
            commentText = this.commentModalInput[id];
        }
        let comment = {
            process: this.processes[id],
            creator: this.user,
            commentText: commentText,
            timestamp: this.filter("date")(new Date(), "dd.MM.yyyy HH:mm:ss")
        };
        this.commentService.addComment(comment).$promise.then(function () {
            self.comments[id].push(comment);
            self.commentInput[id] = "";
            self.commentModalInput[id] = "";
        });
    }
    clearNewSale() {
        this.newSale = {};
        this.newSale.containerAmount = 1;
        this.newSale.container = {
            priceNetto: 0
        };
    }
    loadDataToModal(sale) {
        this.editProcess = sale;
    };
    saveEditedRow() {
        let self = this;
        this.processesService.putSale({
            id: this.editProcess.sale.id
        }, this.editProcess.sale).$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_UPDATE_SALE"));
            self.editForm.$setPristine();
            self.updateRow(self.editProcess);
        });
    }
    deleteRow(process) {
        let self = this;
        let saleId = process.sale.id;
        process.status = "closed";
        process.sale = null;
        this.processesService.putProcess({
            id: process.id
        }, process).$promise.then(function () {
            if (process.lead == null && process.sale == null) {
                self.processesService.deleteProcess({
                    id: process.id
                });
            }
            self.processesService.deleteSale({
                id: saleId
            }).$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_DELETE_SALE"));
                self.dtInstance.DataTable.row(self.rows[process.id]).remove().draw();
            });
        });
    }
    updateRow(process) {
        this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw();
        this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
    }
}

angular.module("app.sales", ["ngResource"]).controller("SalesController", SalesController);