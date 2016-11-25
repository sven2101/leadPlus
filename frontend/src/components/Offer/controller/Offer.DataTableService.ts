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

const OfferDataTableServiceId: string = "OfferDataTableService";
const allDataOfferRoute: string = "/api/rest/processes/offers";
const openDataOfferRoute: string = "/api/rest/processes/workflow/OFFER/state/OFFER";

class OfferDataTableService {

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
                url: openDataOfferRoute,
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
            .withButtons(this.workflowService.getButtons(this.translate("OFFER_OFFERS"), [6, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13]))
            .withBootstrap()
            .withOption("createdRow", createdRow)
            .withOption("deferRender", true)
            .withOption("lengthMenu", [10, 20, 50])
            .withOption("order", [4, "desc"])
            .withOption("search", { "search": defaultSearch })
            .withLanguageSource(this.workflowService.getLanguageSource(this.rootScope.language));
    }

    configRow(row: any, data: Process) {
        let currentDate = moment(newTimestamp(), "DD.MM.YYYY");
        let offerDate = moment(data.offer.timestamp, "DD.MM.YYYY");

        if ((currentDate["businessDiff"](offerDate, "days") > 3 && data.status === "OFFER")
            || (currentDate["businessDiff"](offerDate, "days") > 5 && data.status === "FOLLOWUP")) {
            $(row).addClass("important");
        }
    }

    getDetailHTML(id: number): string {
        return "<a id='id_" + id + "' class='green shortinfo' href='javascript:;'"
            + "ng-click='offerCtrl.appendChildRow(offerCtrl.processes[" + id
            + "])' title='Details'>"
            + "<i class='glyphicon glyphicon-plus-sign'/></a>";
    }

    getDTColumnConfiguration(addDetailButton: Function, addStatusStyle: Function, addActionsButtons: Function): Array<any> {
        let self = this;
        return [
            this.DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                .renderWith(addDetailButton),
            this.DTColumnBuilder.newColumn("offer.customer.lastname").withTitle(
                this.translate("COMMON_NAME")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.customer.company").withTitle(
                this.translate("COMMON_COMPANY")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.customer.email").withTitle(
                this.translate("COMMON_EMAIL")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.timestamp").withTitle(
                this.translate("COMMON_DATE")).renderWith(
                function (data, type, full) {
                    return toLocalDate(data, "DD.MM.YYYY HH:mm");
                }).withOption("type", "date-euro")
                .withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.customer.phone").withTitle(
                this.translate("COMMON_PHONE")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.customer.firstname").withTitle(
                this.translate("COMMON_FIRSTNAME")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.deliveryAddress").withTitle(
                this.translate("COMMON_PRODUCT_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.deliveryDate").withTitle(
                this.translate("COMMON_DELIVERY_TIME")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_PRODUCT_DELIVERYCOSTS"))
                .renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.offer.deliveryCosts)) {
                        return self.filter("currency")(0, "€", 2);
                    }
                    return self.filter("currency")(data.lead.deliveryCosts,
                        "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_PRODUCT_ENTIRE_PRICE"))
                .renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.offer.price)) {
                        return self.filter("currency")(0, "€", 2);
                    }
                    return self.filter("currency")(data.offer.price,
                        "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_PRODUCT_OFFER_PRICE"))
                .renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.offer.offerPrice)) {
                        return self.filter("currency")(0, "€", 2);
                    }
                    return self.filter("currency")(data.offer.offerPrice,
                        "€", 2);
                }).notVisible(),

            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_PROCESSOR")).renderWith((data: Process, type, full) => {
                    if (isNullOrUndefined(data.processor)) {
                        return "";
                    }
                    return data.processor.email;
                }).notVisible(),

            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            this.DTColumnBuilder.newColumn(null).withTitle(
                "<span class='glyphicon glyphicon-cog'></span>").withClass(
                "text-center").withOption("width", "200px").notSortable().renderWith(addActionsButtons),
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
        config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setVisible().setTitle("OFFER_CREATE_SALE");
        if (process.status === Status.OFFER || process.status === Status.FOLLOWUP || process.status === Status.DONE) {
            config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setEnabled().setIcon("fa fa-usd");
        }
        if (user.role === Role.ADMIN || user.role === Role.SUPERADMIN) {
            config.get(ActionButtonType.PIN_DROPDOWN).setEnabled().setTitle("LEAD_PIN");
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setEnabled().setTitle("OFFER_DELETE_OFFER");
            config.get(ActionButtonType.PIN_DROPDOWN_EMPTY_PROCESSOR).setEnabled();
            config.get(ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL).setEnabled().setTitle("OFFER_ROLLBACK");
        } else {
            config.get(ActionButtonType.PIN_BUTTON).setVisible().setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("LEAD_PIN");
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setVisible()
                .setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("LEAD_DELETE_LEAD");
            config.get(ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL).setVisible()
                .setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("OFFER_ROLLBACK");
            config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id);

        }
        config.get(ActionButtonType.OPEN_FOLLOWUP_MODAL).setEnabled().setTitle("COMMON_STATUS_FOLLOW_UP");
        config.get(ActionButtonType.SET_OFFER_DONE).setEnabled().setTitle("COMMON_STATUS_SET_DONE").setIcon("fa fa-check");
        config.get(ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN).setEnabled().setTitle("OFFER_CLOSE_OFFER").setIcon("fa fa-lock");
        config.get(ActionButtonType.DETAILS_OPEN_EDIT_MODAL).setEnabled().setTitle("OFFER_EDIT_OFFER");
        config.get(ActionButtonType.DETAILS_DROPDOWN).setEnabled().setTitle("COMMON_DETAILS");
        if (!isNullOrUndefined(process.sale)
            || !(user.role === Role.ADMIN || user.role === Role.SUPERADMIN) && (!isNullOrUndefined(process.processor) && process.processor.id !== user.id)) {
            config.disableAll();
        }
        else if (process.status === Status.DONE) {
            config.get(ActionButtonType.SET_OFFER_DONE).setEnabled().setTitle("COMMON_STATUS_SET_OPEN").setIcon("fa fa-undo");
            config.get(ActionButtonType.OPEN_FOLLOWUP_MODAL).setEnabled(false);
        } else if (process.status === Status.CLOSED) {
            config.disableAll();
            config.get(ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN).setEnabled().setTitle("OFFER_OPEN_OFFER").setIcon("fa fa-unlock");
            config.get(ActionButtonType.DETAILS_DROPDOWN).setEnabled().setTitle("COMMON_DETAILS");
        }


        return config.build();

    }

    getActionButtonsHTML(process: Process, actionButtonConfig: { [key: number]: any }): string {
        actionButtonConfig[process.id] = this.getActionButtonConfig(process);
        return "<div actionbuttons actionbuttonconfig=offerCtrl.actionButtonConfig[" + process.id + "]  process='offerCtrl.processes[" + process.id + "]'></div>";


    }

    getStatusStyleHTML(data: Process): string {
        let hasProcessor: string = "";
        if (data.processor !== null) {
            hasProcessor = "&nbsp;<span style='color: #ea394c;'><i class='fa fa-thumb-tack'></i></span>";
        }
        if (data.status === "OPEN" || data.status === "OFFER") {
            return "<span style='color: green;'>"
                + this.translate.instant("COMMON_STATUS_OPEN") + "</span>"
                + hasProcessor;
        } else if (data.status === "FOLLOWUP") {
            return "<span style='color: #f79d3c;'>"
                + data.followUpAmount + "x " + this.translate.instant("COMMON_STATUS_FOLLOW_UP") + "</span>"
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
angular.module(moduleOfferDataTableService, [ngResourceId]).service(OfferDataTableServiceId, OfferDataTableService);