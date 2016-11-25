/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../User/Model/User.Model.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
/// <reference path="../../common/model/ActionButtonConfigBuilder.Model.ts" />
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

    constructor(DTOptionsBuilder, DTColumnBuilder, $filter, $compile, $rootScope, $translate, WorkflowService) {
        this.translate = $translate;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.DTColumnBuilder = DTColumnBuilder;
        this.filter = $filter;
        this.compile = $compile;
        this.rootScope = $rootScope;
        this.workflowService = WorkflowService;
    }

    getDTOptionsConfiguration(createdRow: Function, defaultSearch: string = "") {
        let self = this;
        return this.DTOptionsBuilder.newOptions()
            .withOption("ajax", {
                url: openDataLeadRoute,
                error: function (xhr, error, thrown) {
                    handleError(xhr);
                },
                type: "GET",
                "beforeSend": function (request) {
                    request.setRequestHeader("Authorization", "Basic " + self.rootScope.user.authorization);
                    request.setRequestHeader("X-TenantID", self.rootScope.tenant.tenantKey);
                }
            })
            .withOption("stateSave", false)
            .withDOM(this.workflowService.getDomString())
            .withPaginationType("full_numbers")
            .withButtons(this.workflowService.getButtons(this.translate("LEAD_LEADS"), [6, 1, 2, 3, 4, 5, 7, 9, 8, 10]))
            .withBootstrap()
            .withOption("createdRow", createdRow)
            .withOption("deferRender", true)
            .withOption("order", [4, "desc"])
            .withOption("lengthMenu", [10, 20, 50])
            .withOption("search", { "search": defaultSearch })
            .withLanguageSource(this.workflowService.getLanguageSource(this.rootScope.language));
    }

    configRow(row: any, data: Process) {
        let currentDate = moment(newTimestamp(), "DD.MM.YYYY");
        let leadDate = moment(data.lead.timestamp, "DD.MM.YYYY");

        if (currentDate["businessDiff"](leadDate, "days") > 3
            && data.status === "OPEN") {
            $(row).addClass("important");
        }
    }

    getDetailHTML(id: number): string {
        return "<a id='id_" + id + "' class='green shortinfo' href='javascript:;'"
            + "ng-click='leadCtrl.appendChildRow(leadCtrl.processes[" + id
            + "])' title='Details'>"
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
                    return toLocalDate(data, "DD.MM.YYYY HH:mm");
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
                this.translate("COMMON_PRODUCT_DELIVERYCOSTS"))
                .renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.lead.deliveryCosts)) {
                        return self.filter("currency")(0, "€", 2);
                    }
                    return self.filter("currency")(data.lead.deliveryCosts,
                        "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            this.DTColumnBuilder.newColumn(null).withTitle(
                "<span class='glyphicon glyphicon-cog'></span>").withClass(
                "text-center").withOption("width", "180px").notSortable().renderWith(addActionsButtons),
            this.DTColumnBuilder.newColumn(null)
                .renderWith(
                function (data, type, full) {
                    return "#id:" + data.id + "#";
                }).notVisible()];
    }

    getActionButtonConfig(process: Process): { [key: string]: ActionButtonConfig } {
        let user = new User();
        let rootScopeUser: User = this.rootScope.user;
        user.id = rootScopeUser.id;
        user.role = Role.SUPERADMIN;

        let config = new ActionButtonConfigBuilder();
        config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setVisible().setTitle("LEAD_FOLLOW_UP");
        if (process.status === Status.OPEN || process.status === Status.INCONTACT) {
            config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setEnabled().setIcon("fa fa-level-up");
        }
        if (user.role === Role.ADMIN || user.role === Role.SUPERADMIN) {
            config.get(ActionButtonType.PIN_DROPDOWN).setEnabled().setTitle("LEAD_PIN");
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setEnabled().setTitle("LEAD_DELETE_LEAD");
            config.get(ActionButtonType.PIN_DROPDOWN_EMPTY_PROCESSOR).setEnabled();
        } else {
            config.get(ActionButtonType.PIN_BUTTON).setVisible().setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("LEAD_PIN");
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setVisible()
                .setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("LEAD_DELETE_LEAD");
            config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id);
        }
        config.get(ActionButtonType.SET_INCONTACT).setVisible().setTitle("COMMON_STATUS_INCONTACT");
        if (process.status === Status.OPEN) {
            config.get(ActionButtonType.SET_INCONTACT).setEnabled();
        }
        config.get(ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN).setEnabled().setTitle("LEAD_CLOSE_LEAD").setIcon("fa fa-lock");
        config.get(ActionButtonType.DETAILS_OPEN_EDIT_MODAL).setEnabled().setTitle("LEAD_EDIT_LEAD");
        config.get(ActionButtonType.DETAILS_DROPDOWN).setEnabled().setTitle("COMMON_DETAILS");
        if (!isNullOrUndefined(process.offer)
            || !(user.role === Role.ADMIN || user.role === Role.SUPERADMIN) && (!isNullOrUndefined(process.processor) && process.processor.id !== user.id)) {
            config.disableAll();
        } else if (process.status === Status.CLOSED) {
            config.disableAll();
            config.get(ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN).setEnabled().setTitle("LEAD_OPEN_LEAD").setIcon("fa fa-unlock");
            config.get(ActionButtonType.DETAILS_DROPDOWN).setEnabled().setTitle("COMMON_DETAILS");
        }

        return config.build();
    }

    getActionButtonsHTML(process: Process, actionButtonConfig: { [key: number]: any }): string {
        actionButtonConfig[process.id] = this.getActionButtonConfig(process);
        return "<div actionbuttons actionbuttonconfig=leadCtrl.actionButtonConfig[" + process.id + "]  process='leadCtrl.processes[" + process.id + "]'></div>";
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
                + this.translate.instant("COMMON_STATUS_OFFER") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "INCONTACT") {
            return "<span style='color: #f79d3c;'>"
                + this.translate.instant("COMMON_STATUS_INCONTACT") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "FOLLOWUP") {
            return "<span style='color: #f79d3c;'>"
                + this.translate.instant("COMMON_STATUS_FOLLOW_UP") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "DONE") {
            return "<span style='color: #f79d3c;'>"
                + this.translate.instant("COMMON_STATUS_DONE") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "SALE") {
            return "<span style='color: #1872ab;'>"
                + this.translate.instant("COMMON_STATUS_SALE") + "</span>";
        } else if (data.status === "CLOSED") {
            return "<span style='color: #ea394c;'>"
                + this.translate.instant("COMMON_STATUS_CLOSED") + "</span>"
                + hasProcessor;
        }
    }

}

angular.module(moduleLeadDataTableService, [ngResourceId]).service(LeadDataTableServiceId, LeadDataTableService);