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

class LeadDataTableService {

    $inject = ["DTOptionsBuilder", "DTColumnBuilder", "$compile", "Processes", "Comments", "Leads", "$filter", "Profile", "$rootScope", "$translate"];


    translate;
    dtOptions;
    dtColumns;
    rows = {};
    compile;
    DTOptionsBuilder;
    DTColumnBuilder;
    processes;
    filter;

    constructor(DTOptionsBuilder, DTColumnBuilder, $compile, Processes, $filter, $translate) {
        this.translate = $translate;
        this.compile = $compile;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.DTColumnBuilder = DTColumnBuilder;
        this.processes = Processes;
        this.filter = $filter;

        this.setDTOptions();
        this.setDTColumns();
    }

    setDTOptions() {
        let self = this;
        let createdRow = function (row, data, dataIndex) {
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
            error: function (xhr, error, thrown) {
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
        let addDetailButton = function (data, type, full, meta) {
            self.processes[data.id] = data;
            /* tslint:disable:quotemark */
            return '<a class="green shortinfo" href="javascript:;"'
                + 'ng-click="lead.appendChildRow(lead.processes[' + data.id
                + '], $event)" title="Details">'
                + '<i class="glyphicon glyphicon-plus-sign"/></a>';
            /* tslint:enable:quotemark */
        };
        let addStatusStyle = function (data, type, full, meta) {
            self.processes[data.id] = data;
            let hasProcessor = "";
            /* tslint:disable:quotemark */
            if (data.processor !== null)
                hasProcessor = '&nbsp;<span style="color: #ea394c;"><i class="fa fa-thumb-tack"></i></span>';
            if (data.status === 'OPEN') {
                return '<span style="color: green;">'
                    + self.translate.instant("COMMON_STATUS_OPEN") + '</span>'
                    + hasProcessor;
            } else if (data.status === "OFFER") {
                return '<span style="color: #f79d3c;">'
                    + self.translate.instant("COMMON_STATUS_OFFER") + '</span>';
            } else if (data.status === "FOLLOWUP") {
                return '<span style="color: #f79d3c;">'
                    + self.translate.instant("COMMON_STATUS_FOLLOW_UP") + '</span>';
            } else if (data.status === "SALE") {
                return '<span style="color: #1872ab;">'
                    + self.translate.instant("COMMON_STATUS_SALE") + '</span>';
            } else if (data.status === "CLOSED") {
                return '<span style="color: #ea394c;">'
                    + self.translate.instant("COMMON_STATUS_CLOSED") + '</span>';
            }
            else {
                return "";
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
                function (data, type, full) {
                    return self.filter("currency")(
                        data.container.priceNetto, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_CONTAINER_ENTIRE_PRICE"))
                .renderWith(
                function (data, type, full) {
                    return self.filter("currency")(data.leadPrice,
                        "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle)
            /*this.DTColumnBuilder.newColumn(null).withTitle(
                /* tslint:disable:quotemark */
                /*'<span class="glyphicon glyphicon- cog"></span>'*/
                /* tslint:enable:quotemark */
           /* ).withClass("text-center").notSortable().renderWith("addActionsButtons")*/];

    }

}

angular.module("app.leads.service", ["ngResource"]).service("LeadDataTableService", LeadDataTableService);