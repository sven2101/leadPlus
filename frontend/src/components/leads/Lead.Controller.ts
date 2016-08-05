/// <reference path="./Lead.DataTableService.ts" />
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

    $inject = ["DTOptionsBuilder", "DTColumnBuilder", "$compile", "$scope", "toaster", "Processes", "Comments", "Leads", "$filter", "Profile", "$rootScope", "$translate", "LeadDataTableService"];

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
    dtInstance: { reloadData: any, DataTable: any };
    processes = {};
    rows = {};
    editProcess;
    newLead;
    addForm;
    editForm;

    dtOptions;
    dtColumns;

    constructor(DTOptionsBuilder, DTColumnBuilder, $compile, $scope, toaster, Processes, Comments, Leads, $filter, Profile, $rootScope, $translate, LeadDataTableService) {
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
        this.dtInstance = null;



        this.dtOptions = LeadDataTableService.dtOptions;
        this.dtColumns = LeadDataTableService.dtColumns;
        // this.setDTOptions();
        // this.setDTColumns();

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
            }).$promise.then(function (result) {
                self.user = result;
            });
    }

    setWindowWith() {
        let self = this;
        this.windowWidth = $(window).width();
        if (!angular.isUndefined(self.rootScope.globals.currentUser))
            this.userService.get({
                id: self.rootScope.globals.currentUser.id
            }).$promise.then(function (result) {
                self.user = result;
            });
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
                error: function (xhr, error, thrown) {
                    console.log(xhr);
                }
            }).withOption("searchDelay", 500);
        } else {
            this.dtOptions.withOption("serverSide", false).withOption("ajax", {
                url: "/api/rest/processes/workflow/LEAD/state/OPEN",
                error: function (xhr, error, thrown) {
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
        this.commentService.addComment(comment).$promise.then(function () {
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
        this.processesService.save(process).$promise.then(function (result) {
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

    followUp = function (process) {
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
        }, offer).$promise.then(function () {
            self.processesService.setStatus({
                id: process.id
            }, "offer").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_NEW_OFFER"));
                self.rootScope.leadsCount -= 1;
                self.rootScope.offersCount += 1;
                if (process.processor == null) {
                    self.processesService.setProcessor({
                        id: process.id
                    }, self.user.username).$promise.then(function () {
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
            }, self.user.username).$promise.then(function () {
                process.processor = self.user;
                self.updateRow(process);
            });
        } else {
            this.processesService.removeProcessor({
                id: process.id
            }).$promise.then(function () {
                process.processor = null;
                self.updateRow(process);
            });
        }
    }
    closeOrOpenInquiry = function (process) {
        let self = this;
        if (process.status === "open") {

            this.processesService.setStatus({
                id: process.id
            }, "closed").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_CLOSE_LEAD"));
                self.rootScope.leadsCount -= 1;
                process.status = "closed";
                self.updateRow(process);
            });
        } else if (process.status === "closed") {
            this.processesService.setStatus({
                id: process.id
            }, "open").$promise.then(function () {
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
        this.processesService.update({
            id: this.editProcess.lead.id
        }, this.editProcess.lead).$promise.then(function () {
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
        }, process).$promise.then(function () {
            if (process.offer == null && process.sale == null) {
                self.processesService.deleteProcess({
                    id: process.id
                });
            }
            self.processesService.deleteLead({
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
}



angular.module("app.leads", ["ngResource"]).controller("LeadController", LeadController);