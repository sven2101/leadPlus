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

/// <reference path='../../typeDefinitions/moment.d.ts' />



class LeadController {

    $inject = ["DTOptionsBuilder", "DTColumnBuilder", "$compile", "$scope", "toaster", "Processes", "Comments", "Leads", "$filter", "Profile", "$rootScope", "$translate"];

    filter;
    processesService;
    commentService;
    leadService;
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
    dtInstance = {};
    processes = {};
    rows = {};
    editProcess;
    newLead;
    addForm;
    editForm;

    dtOptions;
    dtColumns;

    constructor(DTOptionsBuilder, DTColumnBuilder, $compile, $scope, toaster, Processes, Comments, Leads, $filter, Profile, $rootScope, $translate) {
        this.filter = $filter;
        this.processesService = Processes;
        this.commentService = Comments;
        this.leadService = Leads;
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
        this.setWindowWith();
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
                id: this.rootScope.globals.currentUser.id
            }).$promise.then(function(result) {
                self.user = result;
            });
    }

    setWindowWith() {
        let self = this;
        this.windowWidth = $(window).width();
        if (!angular.isUndefined(self.rootScope.globals.currentUser))
            this.userService.get({
                id: self.rootScope.globals.currentUser.id
            }).$promise.then(function(result) {
                self.user = result;
            });
    }

    setDTOptions() {
        let self = this;
        let createdRow = function(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            self.rows[data.id] = row;
            let currentDate = window["moment"](window["moment"]().toString(), "DD.MM.YYYY");
            let leadDate = window["moment"](data.timestamp, "DD.MM.YYYY");
            if (currentDate["businessDiff"](leadDate, "days") > 3
                && data.status === "open")
                $(row).addClass("important");
            self.compile(angular.element(row).contents())(this.scope);
        };

        this.dtOptions = self.DTOptionsBuilder.newOptions().withOption("ajax", {
            url: "/api/rest/processes/workflow/LEAD/state/OPEN",
            error: function(xhr, error, thrown) {
                console.log(xhr);
            },
            type: "GET"
        }).withOption("stateSave", true).withDOM(
            /* tslint:disable:quotemark */

            '<"row"<"col-sm-12"l>>' + '<"row"<"col-sm-6"B><"col-sm-6"f>>'
            + '<"row"<"col-sm-12"tr>>'
            + '<"row"<"col-sm-5"i><"col-sm-7"p>>'

            /* tslint:enable:quotemark */
            ).withPaginationType(
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
                    title: self.translate("LEAD_LEADS"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12],
                        modifier: {
                            page: "current"
                        }

                    }
                }, {
                    extend: "excelHtml5",
                    title: self.translate.instant("LEAD_LEADS"),
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12],
                        modifier: {
                            page: "current"
                        }
                    }
                }, {
                    extend: "pdfHtml5",
                    title: self.translate("LEAD_LEADS"),
                    orientation: "landscape",
                    exportOptions: {
                        columns: [6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12],
                        modifier: {
                            page: "current"
                        }
                    }
                }]).withBootstrap().withOption("createdRow", createdRow).withOption(
            "order", [4, "desc"]);
    }
    setDTColumns() {
        let self = this;
        let addDetailButton = function(data, type, full, meta) {
            self.processes[data.id] = data;
            /* tslint:disable:quotemark */
            return '<a class="green shortinfo" href="javascript:;"'
                + 'ng-click="lead.appendChildRow(lead.processes[' + data.id
                + '], $event)" title="Details">'
                + '<i class="glyphicon glyphicon-plus-sign"/></a>';
            /* tslint:enable:quotemark */
        };
        let addStatusStyle = function(data, type, full, meta) {
            self.processes[data.id] = data;
            let hasProcessor = "";
            /* tslint:disable:quotemark */
            if (data.processor !== null)
                hasProcessor = '&nbsp;<span style="color: #ea394c;"><i class="fa fa-thumb-tack"></i></span>';
            if (data.status === 'open') {
                return '<span style="color: green;">'
                    + self.translate.instant("COMMON_STATUS_OPEN") + '</span>'
                    + hasProcessor;
            } else if (data.status === "offer") {
                return '<span style="color: #f79d3c;">'
                    + self.translate.instant("COMMON_STATUS_OFFER") + '</span>';
            } else if (data.status === "followup") {
                return '<span style="color: #f79d3c;">'
                    + self.translate.instant("COMMON_STATUS_FOLLOW_UP") + '</span>';
            } else if (data.status === "sale") {
                return '<span style="color: #1872ab;">'
                    + self.translate.instant("COMMON_STATUS_SALE") + '</span>';
            } else if (data.status === "closed") {
                return '<span style="color: #ea394c;">'
                    + self.translate.instant("COMMON_STATUS_CLOSED") + '</span>';
            }
            /* tslint:enable:quotemark */
        };

        this.dtColumns = [
            this.DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                .renderWith(addDetailButton),
            this.DTColumnBuilder.newColumn("inquirer.lastname").withTitle(
                this.translate("COMMON_NAME")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("inquirer.company").withTitle(
                this.translate("COMMON_COMPANY")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("inquirer.email").withTitle(
                this.translate("COMMON_EMAIL")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("timestamp").withTitle(
                this.translate("COMMON_DATE")).withOption("type", "date-euro")
                .withClass("text-center"),
            this.DTColumnBuilder.newColumn("inquirer.phone").withTitle(
                this.translate("COMMON_PHONE")).notVisible(),
            this.DTColumnBuilder.newColumn("inquirer.firstname").withTitle(
                this.translate("COMMON_FIRSTNAME")).notVisible(),
            this.DTColumnBuilder.newColumn("container.name").withTitle(
                this.translate("COMMON_CONTAINER")).notVisible(),
            this.DTColumnBuilder.newColumn("destination").withTitle(
                this.translate("COMMON_CONTAINER_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn("containerAmount").withTitle(
                this.translate("COMMON_CONTAINER_AMOUNT")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_CONTAINER_SINGLE_PRICE")).renderWith(
                function(data, type, full) {
                    return self.filter("currency")(
                        data.container.priceNetto, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_CONTAINER_ENTIRE_PRICE"))
                .renderWith(
                function(data, type, full) {
                    return self.filter("currency")(data.leadPrice,
                        "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            this.DTColumnBuilder.newColumn(null).withTitle(
                /* tslint:disable:quotemark */
                '<span class="glyphicon glyphicon- cog"></span>'
                /* tslint:enable:quotemark */
            ).withClass("text-center").notSortable().renderWith("addActionsButtons")];

    }
    refreshData() {
        let resetPaging = false;
        this.dtInstance.reloadData(resetPaging);
    }
    changeDataInput() {
        if (this.loadAllData === true) {
            this.dtOptions.withOption("serverSide", true).withOption("ajax", {
                url: "/api/rest/processes/leads",
                type: "GET",
                pages: 5,
                dataSrc: "data",
                error: function(xhr, error, thrown) {
                    console.log(xhr);
                }
            }).withOption("searchDelay", 500);
        } else {
            this.dtOptions.withOption("serverSide", false).withOption("ajax", {
                url: "/api/rest/processes/workflow/LEAD/state/OPEN",
                error: function(xhr, error, thrown) {
                    console.log(xhr);
                },
                type: "GET"
            }).withOption("searchDelay", 0);
        }
    }





    appendChildRow(process, event) {
        let childScope = this.scope.$new(true);
        childScope.childData = process;
        let self = this;
        this.commentService.getComments({
            id: process.id
        }).$promise.then(function(result) {
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
                    /* tslint:disable:quotemark */
                    '<div childrow type="lead" class="clearfix"></div>'
                    /* tslint:enable:quotemark */
                )(
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
        this.commentService.addComment(comment).$promise.then(function() {
            self.comments[id].push(comment);
            self.commentInput[id] = "";
            self.commentModalInput[id] = "";
        });
    }
    saveLead() {
        let self = this;
        if (angular.isUndefined(this.newLead.inquirer)) {
            this.newLead.inquirer = {
                title: "UNKNOWN"
            };
        }
        this.newLead.timestamp = this.filter("date")
            (new Date(), "dd.MM.yyyy HH:mm");
        this.newLead.vendor = {
            name: "***REMOVED***"
        };
        let process = {
            lead: this.newLead,
            status: "OPEN"
        };
        this.processesService.save(process).$promise.then(function(result) {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
            self.rootScope.leadsCount += 1;
            self.addForm.$setPristine();
            self.dtInstance.DataTable.row.add(result).draw();
        });
    }
    clearNewLead() {
        this.newLead = {};
        this.newLead.containerAmount = 1;
        this.newLead.container = {
            priceNetto: 0
        };
    };

    followUp = function(process) {
        let self = this;
        let offer = {
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
            timestamp: this.filter("date")(new Date(), "dd.MM.yyyy HH:mm"),
            vendor: process.lead.vendor
        };
        this.processesService.addOffer({
            id: process.id
        }, offer).$promise.then(function() {
            self.processesService.setStatus({
                id: process.id
            }, "offer").$promise.then(function() {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_NEW_OFFER"));
                self.rootScope.leadsCount -= 1;
                self.rootScope.offersCount += 1;
                if (process.processor == null) {
                    self.processesService.setProcessor({
                        id: process.id
                    }, self.user.username).$promise.then(function() {
                        process.processor = self.user;
                        process.offer = offer;
                        process.status = "offer";
                        self.updateRow(process);
                    });
                }
            });
        });
    };

    pin(process) {
        let self = this;
        if (process.processor == null) {
            this.processesService.setProcessor({
                id: process.id
            }, self.user.username).$promise.then(function() {
                process.processor = self.user;
                self.updateRow(process);
            });
        } else {
            this.processesService.removeProcessor({
                id: process.id
            }).$promise.then(function() {
                process.processor = null;
                self.updateRow(process);
            });
        }
    }
    closeOrOpenInquiry = function(process) {
        let self = this;
        if (process.status === "open") {
            this.processesService.setStatus({
                id: process.id
            }, "closed").$promise.then(function() {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_CLOSE_LEAD"));
                self.rootScope.leadsCount -= 1;
                process.status = "closed";
                self.updateRow(process);
            });
        } else if (process.status === "closed") {
            this.processesService.setStatus({
                id: process.id
            }, "open").$promise.then(function() {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_OPEN_LEAD"));
                self.rootScope.leadsCount += 1;
                process.status = "open";
                self.updateRow(process);
            });
        }
    };
    loadDataToModal(process) {
        this.editProcess = process;
    };
    saveEditedRow() {
        let self = this;
        this.processesService.putLead({
            id: this.editProcess.lead.id
        }, this.editProcess.lead).$promise.then(function() {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_UPDATE_LEAD"));
            self.editForm.$setPristine();
            self.editProcess.lead.leadPrice = self.editProcess.lead.containerAmount
                * self.editProcess.lead.container.priceNetto;
            self.updateRow(self.editProcess);
        });
    };

    deleteRow(process) {
        let self = this;
        let leadId = process.lead.id;
        if (process.sale != null || process.offer != null) {
            self.toaster.pop("error", "", self.translate
                .instant("COMMON_TOAST_FAILURE_DELETE_LEAD"));
            return;
        }
        process.lead = null;
        this.processesService.putProcess({
            id: process.id
        }, process).$promise.then(function() {
            if (process.offer == null && process.sale == null) {
                self.processesService.deleteProcess({
                    id: process.id
                });
            }
            self.processesService.deleteLead({
                id: leadId
            }).$promise.then(function() {
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
}



angular.module("app.leads", ["ngResource"]).controller("LeadController", LeadController);