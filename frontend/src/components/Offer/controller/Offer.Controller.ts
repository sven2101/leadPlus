/// <reference path="../../../typeDefinitions/moment.d.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Workflow/Workflow.Service.ts" />
/// <reference path="../../Common/Process.Model.ts" />
/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../common/Process.Model.ts" />

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

class OffersController {

    $inject = ["DTOptionsBuilder", "DTColumnBuilder", "$compile",
        "$scope", "toaster", "ProcessResource", "CommentResource", "$filter",
        "UserResource", "$rootScope", "$translate", "OfferResource", ProductServiceId, WorkflowServiceId];

    filter;
    processResource;
    commentResource;
    workflowService;
    productService;
    userResource;
    offerResource;
    scope;
    rootScope;
    translate;
    compile;
    toaster;
    dtOptions;
    dtColumns;

    user = new User();
    windowWidth;
    commentInput = {};
    commentModalInput = {};
    comments = {};
    currentCommentModalId = "";
    loadAllData = false;
    processes = {};
    rows = {};
    editProcess: Process;
    newOffer: Offer;
    currentOrderPositions = [];
    currentProductId = "-1";
    currentProductAmount = 1;
    dtInstance = { DataTable: null };
    editForm;

    constructor(DTOptionsBuilder, DTColumnBuilder, $compile, $scope,
        toaster, ProcessResource, CommentResource, $filter, UserResource,
        $rootScope, $translate, OfferResource, ProductService, WorkflowService) {

        this.filter = $filter;
        this.processResource = ProcessResource.resource;
        this.commentResource = CommentResource.resource;
        this.workflowService = WorkflowService;
        this.productService = ProductService;
        this.userResource = UserResource.resource;
        this.offerResource = OfferResource.resource;
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.compile = $compile;
        this.toaster = toaster;

        let self = this;
        this.windowWidth = $(window).width();
        if (!angular.isUndefined($rootScope.globals.user))
            this.userResource.get({
                id: $rootScope.globals.user.id
            }).$promise.then(function (result) {
                self.user = result;
            });

        this.dtOptions = DTOptionsBuilder.newOptions().withOption("ajax", {
            url: "/api/rest/processes/workflow/OFFER/state/OFFER",
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
                    title: $translate("OFFER_OFFERS"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15],
                        modifier: {
                            page: "current"
                        }

                    }
                }, {
                    extend: "excelHtml5",
                    title: $translate.instant("OFFER_OFFERS"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15],
                        modifier: {
                            page: "current"
                        }
                    }
                }, {
                    extend: "pdfHtml5",
                    title: $translate("OFFER_OFFERS"),
                    orientation: "landscape",
                    exportOptions: {
                        columns: [6, 1, 2, 7, 10, 11, 12, 8, 9, 13, 14],
                        modifier: {
                            page: "current"
                        }
                    }
                }]).withBootstrap().withOption("createdRow", createdRow).withOption(
            "order", [4, "desc"]);
        this.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                .renderWith(addDetailButton),
            DTColumnBuilder.newColumn("offer.customer.lastname").withTitle(
                $translate("COMMON_NAME")).withClass("text-center"),
            DTColumnBuilder.newColumn("offer.customer.company").withTitle(
                $translate("COMMON_COMPANY")).withClass("text-center"),
            DTColumnBuilder.newColumn("offer.customer.email").withTitle(
                $translate("COMMON_EMAIL")).withClass("text-center"),
            DTColumnBuilder.newColumn("offer.timestamp").withTitle(
                $translate("COMMON_DATE")).renderWith(
                function (data, type, full) {
                    let utcDate = moment.utc(data, "DD.MM.YYYY HH:mm");
                    let localDate = moment(utcDate).local();
                    return localDate.format("DD.MM.YYYY HH:mm");
                }).withOption("type", "date-euro")
                .withClass("text-center"),
            DTColumnBuilder.newColumn("offer.customer.phone").withTitle(
                $translate("COMMON_PHONE")).notVisible(),
            DTColumnBuilder.newColumn("offer.customer.firstname").withTitle(
                $translate("COMMON_FIRSTNAME")).notVisible(),
            DTColumnBuilder.newColumn("offer.deliveryAddress").withTitle(
                $translate("COMMON_CONTAINER")).notVisible(),
            DTColumnBuilder.newColumn("offer.deliveryAddress").withTitle(
                $translate("COMMON_CONTAINER_DESTINATION")).notVisible(),
            DTColumnBuilder.newColumn("offer.deliveryDate").withTitle(
                $translate("COMMON_DELIVERY_TIME")).notVisible(),
            DTColumnBuilder.newColumn("offer.deliveryAddress").withTitle(
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
                $translate("COMMON_CONTAINER_OFFER_PRICE")).renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.offer.offerPrice)) {
                        return $filter("currency")(0, "€", 2);
                    }
                    return $filter("currency")(data.offer.offerPrice, "€",
                        2);
                }).notVisible(),
            DTColumnBuilder.newColumn("processor.username").withTitle(
                $translate("COMMON_PROCESSOR")).notVisible(),
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
                    url: "/api/rest/processes/workflow/OFFER/state/OFFER",
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
            let offerDate = moment(data.offer.timestamp, "DD.MM.YYYY");
            if ((currentDate["businessDiff"](offerDate, "days") > 3 && data.status === "OFFER")
                || (currentDate["businessDiff"](offerDate, "days") > 5 && data.status === "FOLLOWUP"))
                $(row).addClass("important");
            self.compile(angular.element(row).contents())(self.scope);
        }

        function addActionsButtons(data, type, full, meta) {
            self.processes[data.id] = data;
            let disabled = "";
            let hasRightToDelete = "";
            let closeOrOpenOfferDisable = "";
            let disableFollowUp = "";
            let openOrLock = $translate.instant("OFFER_CLOSE_OFFER");
            let faOpenOrLOck = "fa fa-lock";
            if (data.status !== "OFFER" && data.status !== "FOLLOWUP") {
                disableFollowUp = "disabled";
                disabled = "disabled";
                openOrLock = $translate.instant("OFFER_OPEN_OFFER");
                faOpenOrLOck = "fa fa-unlock";
            }
            if (data.status === "FOLLOWUP") {
                disableFollowUp = "disabled";
            }
            if (data.sale !== null) {
                closeOrOpenOfferDisable = "disabled";
            }
            if ($rootScope.globals.user.role === "USER") {
                hasRightToDelete = "disabled";
            }
            if (self.windowWidth > 1300) {
                return "<div style='white-space: nowrap;'><button class='btn btn-white' "
                    + disabled
                    + " ng-click='offer.createSale(offer.processes["
                    + data.id
                    + "])' title='"
                    + $translate.instant("OFFER_CREATE_SALE")
                    + "'>"
                    + " <i class='fa fa-check'></i>"
                    + "</button>&nbsp;"
                    + "<button class='btn btn-white' "
                    + disableFollowUp
                    + " ng-click='offer.followUp(offer.processes["
                    + data.id
                    + "])' title='"
                    + $translate.instant("OFFER_FOLLOW_UP")
                    + "'>"
                    + "<i class='fa fa-eye'></i>"
                    + "</button>&nbsp;"
                    + "<button class='btn btn-white' "
                    + closeOrOpenOfferDisable
                    + " ng-click='offer.closeOrOpenOffer(offer.processes["
                    + data.id
                    + "])' title='"
                    + openOrLock
                    + "'>"
                    + "   <i class='"
                    + faOpenOrLOck
                    + "'></i>"
                    + "</button>&nbsp;"
                    + "<button class='btn btn-white' "
                    + closeOrOpenOfferDisable
                    + " ng-click='offer.loadDataToModal(offer.processes["
                    + data.id
                    + "])' data-toggle='modal'"
                    + "data-target='#editModal' title='"
                    + $translate.instant("OFFER_EDIT_OFFER")
                    + "'>"
                    + "<i class='fa fa-edit'></i>"
                    + "</button>&nbsp;"
                    + "<button class='btn btn-white'"
                    + hasRightToDelete
                    + " ng-click='offer.deleteRow(offer.processes["
                    + data.id
                    + "])' title='"
                    + $translate.instant("OFFER_DELETE_OFFER")
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
                    + " ng-click='offer.createSale(offer.processes["
                    + data.id
                    + "])'><i class='fa fa-check'>&nbsp;</i>"
                    + $translate.instant("OFFER_CREATE_SALE")
                    + "</button></li>"
                    + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                    + disableFollowUp
                    + " ng-click='offer.followUp(offer.processes["
                    + data.id
                    + "])'><i class='fa fa-eye'>&nbsp;</i>"
                    + $translate.instant("OFFER_FOLLOW_UP")
                    + "</button></li>"
                    + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                    + closeOrOpenOfferDisable
                    + " ng-click='offer.closeOrOpenOffer(offer.processes["
                    + data.id
                    + "])'><i class='"
                    + faOpenOrLOck
                    + "'>&nbsp;</i>"
                    + openOrLock
                    + "</button></li>"
                    + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                    + closeOrOpenOfferDisable
                    + " data-toggle='modal' data-target='#editModal' ng-click='offer.loadDataToModal(offer.processes["
                    + data.id
                    + "])'><i class='fa fa-edit''>&nbsp;</i>"
                    + $translate.instant("OFFER_EDIT_OFFER")
                    + "</button></li>"
                    + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                    + hasRightToDelete
                    + " ng-click='offer.deleteRow(offer.processes["
                    + data.id
                    + "])'><i class='fa fa-trash-o'>&nbsp;</i>"
                    + $translate.instant("OFFER_DELETE_OFFER")
                    + "</button></li>" + "</ul>" + "</div>";
            }
        }

        function addStatusStyle(data, type, full, meta) {
            self.processes[data.id] = data;
            if (data.status === "OFFER" || data.status === "OPEN") {
                return "<div style='color: green;'>"
                    + $translate.instant("COMMON_STATUS_OPEN") + "</div>";
            } else if (data.status === "FOLLOWUP") {
                return "<div style='color: #f79d3c;'>"
                    + $translate.instant("COMMON_STATUS_FOLLOW_UP") + "</div>";
            } else if (data.status === "SALE") {
                return "<div style='color: #1872ab;'>"
                    + $translate.instant("COMMON_STATUS_SALE") + "</div>";
            } else if (data.status === "CLOSED") {
                return "<div style='color: #ea394c;'>"
                    + $translate.instant("COMMON_STATUS_CLOSED") + "</div>";
            }
        }

        function addDetailButton(data, type, full, meta) {
            self.processes[data.id] = data;
            return "<a class='green shortinfo' href='javascript:;'"
                + "ng-click='offer.appendChildRow(offer.processes[" + data.id
                + "], $event)' title='Details'>"
                + "<i class='glyphicon glyphicon-plus-sign'/></a>";
        }
    }

    getOrderPositions(process) {
        return process.offer.orderPositions;
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
                    "<div childrow type='offer' class='clearfix'></div>")(
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

    clearNewOffer() {
        this.newOffer = new Offer();
        this.newOffer.containerAmount = 1;
        this.newOffer.container = {
            name: "placholder",
            priceNetto: 666
        };
        this.newOffer.orderPositions = [];
        this.currentOrderPositions = [];
        this.currentProductId = "-1";
        this.currentProductAmount = 1;
    };

    createSale(process: Process) {
        let self = this;
        let sale: Sale = {
            id: 0,
            deliveryAddress: process.offer.deliveryAddress,
            deliveryDate: process.offer.deliveryDate,
            container: {
                name: "",
                description: "",
                priceNetto: 0
            },
            orderPositions: deepCopy(process.lead.orderPositions),
            containerAmount: process.offer.containerAmount,
            transport: process.offer.deliveryAddress,
            customer: {
                company: process.offer.customer.company,
                email: process.offer.customer.email,
                firstname: process.offer.customer.firstname,
                lastname: process.offer.customer.lastname,
                phone: process.offer.customer.phone,
                title: process.offer.customer.title
            },
            saleProfit: 0,
            saleReturn: process.offer.offerPrice,
            timestamp: moment.utc().format("DD.MM.YYYY HH:mm"),
            vendor: process.offer.vendor
        };
        for (let i = 0; i < sale.orderPositions.length; i++) {
            sale.orderPositions[i].id = 0;
        }
        this.processResource.createSale({
            id: process.id
        }, sale).$promise.then(function () {
            self.processResource.setStatus({
                id: process.id
            }, "SALE").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_NEW_SALE"));
                self.rootScope.offersCount -= 1;
                self.processResource.setProcessor({
                    id: process.id
                }, self.user.id).$promise.then(function () {
                    process.processor = self.user;
                    process.sale = sale;
                    process.status = "SALE";
                    if (self.loadAllData === true) {
                        self.updateRow(process);
                    }
                });
                if (self.loadAllData === false) {
                    self.dtInstance.DataTable.row(self.rows[process.id]).remove()
                        .draw();
                }
            });
        });
    };

    followUp(process) {
        let self = this;
        this.processResource.setStatus({
            id: process.id
        }, "FOLLOWUP").$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_FOLLOW_UP"));
            process.status = "FOLLOWUP";
            self.updateRow(process);
        });
    };

    closeOrOpenOffer(process) {
        let self = this;
        if (process.status === "OFFER" || process.status === "FOLLOWUP") {
            this.processResource.setStatus({
                id: process.id
            }, "CLOSED").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_CLOSE_OFFER"));
                self.rootScope.offersCount -= 1;
                process.status = "CLOSED";
                self.updateRow(process);
            });
        } else if (process.status === "CLOSED") {
            this.processResource.setStatus({
                id: process.id
            }, "OFFER").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_OPEN_OFFER"));
                self.rootScope.offersCount += 1;
                process.status = "OFFER";
                self.updateRow(process);
            });
        }
    };

    loadDataToModal(process) {
        this.currentProductId = "-1";
        this.currentProductAmount = 1;
        this.editProcess = process;
        this.currentOrderPositions = deepCopy(this.editProcess.offer.orderPositions);
    };

    saveEditedRow() {
        let self = this;
        this.editProcess.offer.orderPositions = this.currentOrderPositions;
        this.offerResource.update(this.editProcess.offer).$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_UPDATE_OFFER"));
            self.editForm.$setPristine();
            self.updateRow(self.editProcess);
        });
    };

    deleteRow(process) {
        let self = this;
        let offerId = process.offer.id;
        if (process.sale !== null) {
            self.toaster.pop("error", "", self.translate
                .instant("COMMON_TOAST_FAILURE_DELETE_OFFER"));
            return;
        }
        process.status = "CLOSED";
        process.offer = null;
        this.processResource.update(process).$promise.then(function () {
            if (process.lead === null && process.sale === null) {
                self.processResource.deleteProcess({
                    id: process.id
                });
            }
            self.offerResource.drop({
                id: offerId
            }).$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_DELETE_OFFER"));
                self.rootScope.offersCount -= 1;
                self.dtInstance.DataTable.row(self.rows[process.id]).remove().draw();
            });
        });
    };

    updateRow(process) {
        this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw();
        this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
    }

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

angular.module("app.offer", ["ngResource"]).controller("OffersController", OffersController);



