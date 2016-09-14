/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../User/Model/User.Model.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
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

const LeadDataTableServiceId: string = "LeadDataTableService";
const allDataLeadRoute = "/api/rest/processes/leads";
const openDataLeadRoute = "/api/rest/processes/workflow/LEAD/state/OPEN";

class LeadDataTableService {

    $inject = [DTOptionsBuilderId, DTColumnBuilderId, $filterId, $compileId, $rootScopeId, $translateId, WorkflowServiceId];

    workflowService: WorkflowService;
    translate;
    dtOptions;
    dtColumns;
    DTOptionsBuilder;
    DTColumnBuilder;
    filter;
    compile;
    rootScope;

    user: User;

    constructor(DTOptionsBuilder, DTColumnBuilder, $filter, $compile, $rootScope, $translate, WorkflowService) {
        this.translate = $translate;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.DTColumnBuilder = DTColumnBuilder;
        this.filter = $filter;
        this.compile = $compile;
        this.rootScope = $rootScope;
        this.workflowService = WorkflowService;
        this.user = $rootScope.currentUser;
    }

    getDTOptionsConfiguration(createdRow: Function) {
        return this.DTOptionsBuilder.newOptions()
            .withOption("ajax", {
                url: openDataLeadRoute,
                error: function (xhr, error, thrown) {
                    console.log(xhr);
                },
                type: "GET"
            })
            .withOption("stateSave", true)
            .withDOM(this.workflowService.getDomString())
            .withPaginationType("full_numbers")
            .withButtons(this.workflowService.getButtons(this.translate("LEAD_LEADS"), [6, 1, 2, 3, 4, 5, 7, 8, 9]))
            .withBootstrap()
            .withOption("createdRow", createdRow)
            .withOption("order", [4, "desc"])
            .withLanguageSource(this.workflowService.getLanguageSource(this.rootScope.language));
    }

    configRow(row: any, data: Process) {
        let currentDate = moment(moment().utc + "", "DD.MM.YYYY");
        let leadDate = moment(data.lead.timestamp, "DD.MM.YYYY");
        if (currentDate["businessDiff"](leadDate, "days") > 3
            && data.status === "OPEN") {
            $(row).addClass("important");
        }
    }

    getDetailHTML(id: number): string {
        return "<a class='green shortinfo' href='javascript:;'"
            + "ng-click='leadCtrl.appendChildRow(leadCtrl.processes[" + id
            + "], $event)' title='Details'>"
            + "<i class='glyphicon glyphicon-plus-sign'/></a>";
    }

    getDTColumnConfiguration(addDetailButton: Function, addStatusStyle: Function, addActionsButtons: Function): Array<any> {
        let self = this;
        return [
            this.DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                .renderWith(addDetailButton),
            this.DTColumnBuilder.newColumn("lead.customer.lastname").withTitle(
                this.translate("COMMON_NAME")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("lead.customer.company").withTitle(
                this.translate("COMMON_COMPANY")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("lead.customer.email").withTitle(
                this.translate("COMMON_EMAIL")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("lead.timestamp").withTitle(
                this.translate("COMMON_DATE")).renderWith(
                function (data, type, full) {
                    return toLocalDate(data);
                }).withOption("type", "date-euro")
                .withClass("text-center"),
            this.DTColumnBuilder.newColumn("lead.customer.phone").withTitle(
                this.translate("COMMON_PHONE")).notVisible(),
            this.DTColumnBuilder.newColumn("lead.customer.firstname").withTitle(
                this.translate("COMMON_FIRSTNAME")).notVisible(),
            this.DTColumnBuilder.newColumn("lead.deliveryAddress").withTitle(
                this.translate("COMMON_PRODUCT_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_PRODUCT_ENTIRE_PRICE"))
                .renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.lead.price)) {
                        return self.filter("currency")(0, "€", 2);
                    }
                    return self.filter("currency")(data.lead.price,
                        "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            this.DTColumnBuilder.newColumn(null).withTitle(
                "<span class='glyphicon glyphicon-cog'></span>").withClass(
                "text-center").notSortable().renderWith(addActionsButtons)];
    }

    setActionButtonsConfig(user: User, templateData: any) {
        let config = {
            "disabled": false,
            "disablePin": false,
            "disablePinDropdown": false,
            "hasRightToDelete": false,
            "closeOrOpenDisable": false,
            "openOrLock": this.translate.instant("LEAD_CLOSE_LEAD"),
            "faOpenOrLock": "fa fa-lock"
        };
        if (templateData.process.status !== "OPEN") {
            config.disabled = true;
            config.disablePin = true;
            config.openOrLock = this.translate.instant("LEAD_OPEN_LEAD");
            config.faOpenOrLock = "fa fa-unlock";
        }
        if (templateData.process.offer !== null || templateData.process.sale !== null) {
            config.closeOrOpenDisable = true;
        }
        if (user.role === Role.USER) {
            config.hasRightToDelete = true;
            config.disablePinDropdown = true;
        }
        if (templateData.process.processor !== null
            && user.username !== templateData.process.processor.username) {
            config.disablePin = true;
        }
        templateData.config = config;
        let translation = {
            "nextWorkflowUnit": this.translate.instant("LEAD_FOLLOW_UP"),
            "editWorkflowUnit": this.translate.instant("LEAD_EDIT_LEAD"),
            "deleteWorkflowUnit": this.translate.instant("LEAD_DELETE_LEAD"),
        };
        templateData.translation = translation;
    }

    getActionButtonsHTML(templateData: any): string {
        this.setActionButtonsConfig(this.user, templateData);
        if ($(window).width() > 1300) {
            return "<div actionbuttons template='standard' type='lead' parent='leadCtrl' templatedata='" + JSON.stringify(templateData) + "'></div>";
        } else {
            return "<div actionbuttons template='dropdown' type='lead' parent='leadCtrl' templatedata='" + JSON.stringify(templateData) + "'></div>";
        }
    }

    getStatusStyleHTML(data: Process): string {
        let hasProcessor: string = "";
        if (data.processor !== null) {
            hasProcessor = "&nbsp;<span style='color: #ea394c;'><i class='fa fa-thumb-tack'></i></span>";
        }
        if (data.status === "OPEN") {
            return "<span style='color: green;'>"
                + this.translate.instant("COMMON_STATUS_OPEN") + "</span>"
                + hasProcessor;
        } else if (data.status === "OFFER") {
            return "<span style='color: #f79d3c;'>"
                + this.translate.instant("COMMON_STATUS_OFFER") + "</span>";
        } else if (data.status === "FOLLOWUP") {
            return "<span style='color: #f79d3c;'>"
                + this.translate.instant("COMMON_STATUS_FOLLOW_UP") + "</span>";
        } else if (data.status === "SALE") {
            return "<span style='color: #1872ab;'>"
                + this.translate.instant("COMMON_STATUS_SALE") + "</span>";
        } else if (data.status === "CLOSED") {
            return "<span style='color: #ea394c;'>"
                + this.translate.instant("COMMON_STATUS_CLOSED") + "</span>";
        }
    }

}

angular.module(moduleLeadDataTableService, [ngResourceId]).service(LeadDataTableServiceId, LeadDataTableService);