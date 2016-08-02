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

class OfferController {

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
    newOffer;
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
        let self = this;
        this.dtOptions = this.DTOptionsBuilder.newOptions().withOption("ajax", {
            url: "/api/rest/processes/state/offer/offers",
            error: function (xhr, error, thrown) {
                console.log(xhr);
            },
            type: "GET"
        }).withDOM(
            /* tslint:disable:quotemark */
            '<"row"<"col-sm-12"l>>' + '<"row"<"col-sm-6"B><"col-sm-6"f>>'
            + '<"row"<"col-sm-12"tr>>'
            + '<"row"<"col-sm-5"i><"col-sm-7"p>>'
            /* tslint:enable:quotemark */
            ).withPaginationType(
            "full_numbers").withOption("stateSave", true).withButtons([{
                extend: "copyHtml5",
                exportOptions: {
                    columns: [6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15],
                    modifier: {
                        page: "current"
                    }
                }
            }, {
                    extend: "print",
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15],
                        modifier: {
                            page: "current"
                        }
                    }
                }, {
                    extend: "csvHtml5",
                    title: self.translate("OFFER_OFFERS"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15],
                        modifier: {
                            page: "current"
                        }

                    }
                }, {
                    extend: "excelHtml5",
                    title: self.translate.instant("OFFER_OFFERS"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15],
                        modifier: {
                            page: "current"
                        }
                    }
                }, {
                    extend: "pdfHtml5",
                    title: self.translate("OFFER_OFFERS"),
                    orientation: "landscape",
                    exportOptions: {
                        columns: [6, 1, 2, 7, 10, 11, 12, 8, 9, 13, 14],
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
            this.DTColumnBuilder.newColumn("offer.prospect.lastname").withTitle(
                this.translate("COMMON_NAME")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.prospect.company").withTitle(
                this.translate("COMMON_COMPANY")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.prospect.email").withTitle(
                this.translate("COMMON_EMAIL")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.timestamp").withTitle(
                this.translate("COMMON_DATE")).withOption("type", "date-euro")
                .withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.prospect.phone").withTitle(
                this.translate("COMMON_PHONE")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.prospect.firstname").withTitle(
                this.translate("COMMON_FIRSTNAME")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.container.name").withTitle(
                this.translate("COMMON_CONTAINER")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.deliveryAddress").withTitle(
                this.translate("COMMON_CONTAINER_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.deliveryDate").withTitle(
                this.translate("COMMON_DELIVERY_TIME")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.containerAmount").withTitle(
                this.translate("COMMON_CONTAINER_AMOUNT")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_CONTAINER_SINGLE_PRICE")).renderWith(
                function (data, type, full) {
                    return this.filter("currency")(
                        data.offer.container.priceNetto, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_CONTAINER_ENTIRE_PRICE")).renderWith(
                function (data, type, full) {
                    return this.filter("currency")(
                        data.offer.container.priceNetto
                        * data.offer.containerAmount, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_CONTAINER_OFFER_PRICE")).renderWith(
                function (data, type, full) {
                    return this.filter("currency")(data.offer.offerPrice, "€",
                        2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn("processor.username").withTitle(
                this.translate("COMMON_PROCESSOR")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(this.addStatusStyle),
            this.DTColumnBuilder.newColumn(null).withTitle(
                /* tslint:disable:quotemark */
                '<span class="glyphicon glyphicon-cog"></span>'
                /* tslint:enable:quotemark */
            ).withClass("text-center").notSortable().renderWith(this.addActionsButtons)];
    }
    refreshData() {
        let resetPaging = true;
        this.dtInstance.reloadData(resetPaging);
    }
    changeDataInput() {
        let self = this;
        if (self.loadAllData === true) {
            self.dtOptions.withOption("serverSide", true).withOption("ajax", {
                url: "/api/rest/processes/offers",
                type: "GET",
                pages: 5,
                dataSrc: "data",
                error: function (xhr, error, thrown) {
                    console.log(xhr);
                }
            }).withOption("searchDelay", 500);
        } else {
            self.dtOptions.withOption("serverSide", false).withOption("ajax", {
                url: "/api/rest/processes/state/offer/offers",
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
        let currentDate = window["moment"](window["moment"](), "DD.MM.YYYY");
        let offerDate = window["moment"](data.offer.timestamp, "DD.MM.YYYY");
        if ((currentDate.businessDiff(offerDate, "days") > 3 && data.status === "offer")
            || (currentDate.businessDiff(offerDate, "days") > 5 && data.status === "followup"))
            $(row).addClass("important");
        self.compile(angular.element(row).contents())(self.scope);
    }
    addActionsButtons(data, type, full, meta) {
        this.processes[data.id] = data;
        let disabled = "";
        let hasRightToDelete = "";
        let closeOrOpenOfferDisable = "";
        let disableFollowUp = "";
        let openOrLock = this.translate.instant("OFFER_CLOSE_OFFER");
        let faOpenOrLOck = "fa fa-lock";
        if (data.status !== "offer" && data.status !== "followup") {
            disableFollowUp = "disabled";
            disabled = "disabled";
            openOrLock = this.translate.instant("OFFER_OPEN_OFFER");
            faOpenOrLOck = "fa fa-unlock";
        }
        if (data.status === "followup") {
            disableFollowUp = "disabled";
        }
        if (data.sale !== null) {
            closeOrOpenOfferDisable = "disabled";
        }
        if (this.rootScope.globals.currentUser.role === "user") {
            hasRightToDelete = "disabled";
        }
        /* tslint:disable:quotemark */
        if (this.windowWidth > 1300) {
            return '<div style="white-space: nowrap;"><button class="btn btn-white" '
                + disabled
                + ' ng-click="offer.createSale(offer.processes['
                + data.id
                + '])" title="'
                + this.translate.instant('OFFER_CREATE_SALE')
                + '">'
                + ' <i class="fa fa-check"></i>'
                + '</button>&nbsp;'
                + '<button class="btn btn-white" '
                + disableFollowUp
                + ' ng-click="offer.followUp(offer.processes['
                + data.id
                + '])" title="'
                + this.translate.instant('OFFER_FOLLOW_UP')
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
                + this.translate.instant('OFFER_EDIT_OFFER')
                + '">'
                + '<i class="fa fa-edit"></i>'
                + '</button>&nbsp;'
                + '<button class="btn btn-white"'
                + hasRightToDelete
                + ' ng-click="offer.deleteRow(offer.processes['
                + data.id
                + '])" title="'
                + this.translate.instant('OFFER_DELETE_OFFER')
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
                + this.translate.instant('OFFER_CREATE_SALE')
                + '</button></li>'
                + '<li><button style="width: 100%; text-align: left;" class="btn btn-white" '
                + disableFollowUp
                + ' ng-click="offer.followUp(offer.processes['
                + data.id
                + '])"><i class="fa fa-eye">&nbsp;</i>'
                + this.translate.instant('OFFER_FOLLOW_UP')
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
                + this.translate.instant('OFFER_EDIT_OFFER')
                + '</button></li>'
                + '<li><button style="width: 100%; text-align: left;" class="btn btn-white" '
                + hasRightToDelete
                + ' ng-click="offer.deleteRow(offer.processes['
                + data.id
                + '])"><i class="fa fa-trash-o">&nbsp;</i>'
                + this.translate.instant('OFFER_DELETE_OFFER')
                + '</button></li>' + '</ul>' + '</div>';
        }
        /* tslint:enable:quotemark */
    }
    addStatusStyle(data, type, full, meta) {
        this.processes[data.id] = data;
        if (data.status === "offer" || data.status === "open") {
            return "<div style='color: green;'>"
                + this.translate.instant("COMMON_STATUS_OPEN") + "</div>";
        } else if (data.status === "followup") {
            return "<div style='color: #f79d3c;'>"
                + this.translate.instant("COMMON_STATUS_FOLLOW_UP") + "</div>";
        } else if (data.status === "sale") {
            return "<div style='color: #1872ab;'>"
                + this.translate.instant("COMMON_STATUS_SALE") + "</div>";
        } else if (data.status === "closed") {
            return "<div style='color: #ea394c;'>"
                + this.translate.instant("COMMON_STATUS_CLOSED") + "</div>";
        }
    }
    addDetailButton(data, type, full, meta) {
        this.processes[data.id] = data;
        return "<a class='green shortinfo' href='javascript:;'"
            + "ng-click='offer.appendChildRow(offer.processes[" + data.id
            + "], $event)' title='Details'>"
            + "<i class='glyphicon glyphicon-plus-sign'/></a>";
    }

    appendChildRow(process, event) {
        let childScope = this.scope.$new(true);
        childScope.childData = process;
        let vm = this;
        this.commentService.getComments({
            id: process.id
        }).$promise.then(function (result) {
            vm.comments[process.id] = [];
            for (let comment in result) {
                if (comment === "$promise")
                    break;
                vm.comments[process.id].push({
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
                    "<div childrow type='offer' class='clearfix'></div>")(
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
    clearNewOffer() {
        this.newOffer = {};
        this.newOffer.containerAmount = 1;
        this.newOffer.container = {
            priceNetto: 0
        };
    }

    createSale(process) {
        let self = this;
        let sale = {
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
            timestamp: this.filter("date")(new Date(), "dd.MM.yyyy HH:mm"),
            vendor: process.offer.vendor
        };
        this.processesService.addSale({
            id: process.id
        }, sale).$promise.then(function () {
            self.processesService.setStatus({
                id: process.id
            }, "sale").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_NEW_SALE"));
                self.rootScope.offersCount -= 1;
                self.processesService.setProcessor({
                    id: process.id
                }, self.user.username).$promise.then(function () {
                    process.processor = self.user;
                    process.sale = sale;
                    process.status = "sale";
                    self.updateRow(process);
                });
            });
        });
    }
    followUp(process) {
        let vm = this;
        this.processesService.setStatus({
            id: process.id
        }, "followup").$promise.then(function () {
            vm.toaster.pop("success", "", vm.translate
                .instant("COMMON_TOAST_SUCCESS_FOLLOW_UP"));
            process.status = "followup";
            vm.updateRow(process);
        });
    }
    closeOrOpenOffer(process) {
        let self = this;
        if (process.status === "offer" || process.status === "followup") {
            this.processesService.setStatus({
                id: process.id
            }, "closed").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_CLOSE_OFFER"));
                self.rootScope.offersCount -= 1;
                process.status = "closed";
                self.updateRow(process);
            });
        } else if (process.status === "closed") {
            this.processesService.setStatus({
                id: process.id
            }, "offer").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_OPEN_OFFER"));
                self.rootScope.offersCount += 1;
                process.status = "offer";
                self.updateRow(process);
            });
        }
    }
    oadDataToModal(offer) {
        this.editProcess = offer;
    };
    saveEditedRow() {
        let self = this;
        this.processesService.putOffer({
            id: this.editProcess.offer.id
        }, this.editProcess.offer).$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_UPDATE_OFFER"));
            self.editForm.$setPristine();
            self.updateRow(self.editProcess);
        });
    }
    deleteRow(process) {
        let self = this;
        let offerId = process.offer.id;
        if (process.sale != null) {
            self.toaster.pop("error", "", self.translate
                .instant("COMMON_TOAST_FAILURE_DELETE_OFFER"));
            return;
        }
        process.status = "closed";
        process.offer = null;
        this.processesService.putProcess({
            id: process.id
        }, process).$promise.then(function () {
            if (process.lead == null && process.sale == null) {
                self.processesService.deleteProcess({
                    id: process.id
                });
            }
            self.processesService.deleteOffer({
                id: offerId
            }).$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_DELETE_OFFER"));
                self.rootScope.offersCount -= 1;
                self.dtInstance.DataTable.row(self.rows[process.id]).remove().draw();
            });
        });
    }
    updateRow (process) {
        this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw();
        this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
    }

}

angular.module("app.offers", ["ngResource"]).controller("OfferController", OfferController);