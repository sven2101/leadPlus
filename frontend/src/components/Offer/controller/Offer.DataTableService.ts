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
const allDataOfferRoute = "/api/rest/processes/offers";
const openDataOfferRoute = "/api/rest/processes/workflow/OFFER/state/OFFER";

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
                url: openDataOfferRoute,
                error: function (xhr, error, thrown) {
                    console.log(xhr);
                },
                type: "GET"
            })
            .withOption("stateSave", true)
            .withDOM(this.workflowService.getDomString())
            .withPaginationType("full_numbers")
            .withButtons(this.workflowService.getButtons(this.translate("OFFER_OFFERS"), [6, 1, 2, 3, 5, 7, 10, 11, 12, 8, 9, 13, 14, 15]))
            .withBootstrap()
            .withOption("createdRow", createdRow)
            .withOption("order", [4, "desc"])
            .withLanguageSource(this.workflowService.getLanguageSource(this.rootScope.language));
    }

    configRow(row: any, data: Process) {
        let currentDate = moment(moment().utc + "", "DD.MM.YYYY");
        let offerDate = moment(data.offer.timestamp, "DD.MM.YYYY");
        if ((currentDate["businessDiff"](offerDate, "days") > 3 && data.status === "OFFER")
            || (currentDate["businessDiff"](offerDate, "days") > 5 && data.status === "FOLLOWUP")) {
            $(row).addClass("important");
        }
    }

    getDetailHTML(id: number): string {
        return "<a class='green shortinfo' href='javascript:;'"
            + "ng-click='offerCtrl.appendChildRow(offerCtrl.processes[" + id
            + "], $event)' title='Details'>"
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
                    return toLocalDate(data);
                }).withOption("type", "date-euro")
                .withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.customer.phone").withTitle(
                this.translate("COMMON_PHONE")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.customer.firstname").withTitle(
                this.translate("COMMON_FIRSTNAME")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.deliveryAddress").withTitle(
                this.translate("COMMON_CONTAINER_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.deliveryDate").withTitle(
                this.translate("COMMON_DELIVERY_TIME")).notVisible(),
            this.DTColumnBuilder.newColumn("null").withTitle(
                this.translate("COMMON_CONTAINER_SINGLE_PRICE")).renderWith(
                function (data, type, full) {
                    return self.filter("currency")(
                        0, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_CONTAINER_ENTIRE_PRICE"))
                .renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.offer.offerPrice)) {
                        return self.filter("currency")(0, "€", 2);
                    }
                    return self.filter("currency")(data.offer.offerPrice,
                        "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn("processor.username").withTitle(
                this.translate("COMMON_PROCESSOR")).notVisible(),
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
            "disableFollowUp": false,
            "hasRightToDelete": false,
            "closeOrOpenDisable": false,
            "openOrLock": this.translate.instant("OFFER_CLOSE_OFFER"),
            "faOpenOrLock": "fa fa-lock"
        };
        if (templateData.process.status !== "OFFER" && templateData.process.status !== "FOLLOWUP") {
            config.disabled = true;
            config.disableFollowUp = true;
            config.openOrLock = this.translate.instant("OFFER_OPEN_OFFER");
            config.faOpenOrLock = "fa fa-unlock";
        }
        if (templateData.process.status === "FOLLOWUP") {
            config.disableFollowUp = true;
        }
        if (templateData.process.sale !== null) {
            config.closeOrOpenDisable = true;
        }
        if (user.role === Role.USER) {
            config.hasRightToDelete = true;
        }
        templateData.config = config;
        let translation = {
            "nextWorkflowUnit": this.translate.instant("OFFER_CREATE_SALE"),
            "editWorkflowUnit": this.translate.instant("OFFER_EDIT_OFFER"),
            "deleteWorkflowUnit": this.translate.instant("OFFER_DELETE_OFFER"),
        };
        templateData.translation = translation;
    }

    getActionButtonsHTML(templateData: any): string {
        this.setActionButtonsConfig(this.user, templateData);
        if ($(window).width() > 1300) {
            return "<div actionbuttons template='standard' parent='offerCtrl' type='offer' templatedata='" + JSON.stringify(templateData) + "'></div>";
        } else {
            return "<div actionbuttons template='dropdown' parent='offerCtrl' type='offer' templatedata='" + JSON.stringify(templateData) + "'></div>";
        }
    }

    getStatusStyleHTML(data: Process): string {
        if (data.status === "OPEN" || data.status === "OFFER") {
            return "<span style='color: green;'>"
                + this.translate.instant("COMMON_STATUS_OPEN") + "</span>";
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
angular.module(moduleOfferDataTableService, [ngResourceId]).service(OfferDataTableServiceId, OfferDataTableService);