/// <reference path="../../app/App.Common.ts" />
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

    $inject = ["DTOptionsBuilder", "DTColumnBuilder", "$filter", "$rootScope", "$translate"];


    translate;
    dtOptions;
    dtColumns;
    DTOptionsBuilder;
    DTColumnBuilder;
    filter;
    rootScope;

    constructor(DTOptionsBuilder, DTColumnBuilder, $filter, $rootScope, $translate) {
        this.translate = $translate;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.DTColumnBuilder = DTColumnBuilder;
        this.filter = $filter;
        this.rootScope = $rootScope;

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
                this.translate("COMMON_CONTAINER")).notVisible(),
            this.DTColumnBuilder.newColumn("lead.deliveryAddress").withTitle(
                this.translate("COMMON_CONTAINER_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn("lead.customer.lastname").withTitle(
                this.translate("COMMON_CONTAINER_AMOUNT")).notVisible(),
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
                    if (isNullOrUndefined(data.lead.leadPrice)) {
                        return self.filter("currency")(0, "€", 2);
                    }
                    return self.filter("currency")(data.lead.leadPrice,
                        "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            this.DTColumnBuilder.newColumn(null).withTitle(
                "<span class='glyphicon glyphicon-cog'></span>").withClass(
                "text-center").notSortable().renderWith(addActionsButtons)];
    }

    getActionButtonsHTML(data: Process, user: User): string {
        let disabled = "";
        let disablePin = "";
        let hasRightToDelete = "";
        let closeOrOpenInquiryDisable = "";
        let openOrLock = this.translate.instant("LEAD_CLOSE_LEAD");
        let faOpenOrLock = "fa fa-lock";
        if (data.status !== "OPEN") {
            disabled = "disabled";
            disablePin = "disabled";
            openOrLock = this.translate.instant("LEAD_OPEN_LEAD");
            faOpenOrLock = "fa fa-unlock";
        }
        if (data.offer !== null || data.sale !== null) {
            closeOrOpenInquiryDisable = "disabled";
        }
        if (user.role === Role.USER) {
            hasRightToDelete = "disabled";
        }
        if (data.processor !== null
            && user.username !== data.processor.username) {
            disablePin = "disabled";
        }
        if ($(window).width() > 1300) {
            return "<div style='white-space: nowrap;'><button class='btn btn-white' " + disabled
                + " ng-click='lead.createOffer(lead.processes[" + data.id + "])' title='" + this.translate.instant("LEAD_FOLLOW_UP") + "'>"
                + "<i class='fa fa-check'></i></button>&nbsp;<button class='btn btn-white' "
                + disablePin
                + " ng-click='lead.pin(lead.processes["
                + data.id
                + "])' title='"
                + this.translate.instant("LEAD_PIN")
                + "'>"
                + "   <i class='fa fa-thumb-tack'></i>"
                + "</button>&nbsp;"
                + "<button class='btn btn-white' "
                + closeOrOpenInquiryDisable
                + " ng-click='lead.closeOrOpenInquiry(lead.processes["
                + data.id
                + "])' title='"
                + openOrLock
                + "'>"
                + "   <i class='"
                + faOpenOrLock
                + "'></i>"
                + "</button>&nbsp;"
                + "<button class='btn btn-white' "
                + closeOrOpenInquiryDisable
                + " ng-click='lead.loadDataToModal(lead.processes["
                + data.id
                + "])' data-toggle='modal'"
                + "data-target='#editModal' title='"
                + this.translate.instant("LEAD_EDIT_LEAD")
                + "'>"
                + "<i class='fa fa-edit'></i>"
                + "</button>&nbsp;"
                + "<button class='btn btn-white' "
                + hasRightToDelete
                + " ng-click='lead.deleteRow(lead.processes["
                + data.id
                + "])' title='"
                + this.translate.instant("LEAD_DELETE_LEAD")
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
                + " ng-click='lead.followUp(lead.processes["
                + data.id
                + "])'><i class='fa fa-check'>&nbsp;</i>"
                + this.translate.instant("LEAD_FOLLOW_UP")
                + "</button></li>"
                + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                + disablePin
                + " ng-click='lead.pin(lead.processes["
                + data.id
                + "])'><i class='fa fa-thumb-tack'>&nbsp;</i>"
                + this.translate.instant("LEAD_PIN")
                + "</button></li>"
                + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                + closeOrOpenInquiryDisable
                + " ng-click='lead.closeOrOpenInquiry(lead.processes["
                + data.id
                + "])'><i class='"
                + faOpenOrLock
                + "'>&nbsp;</i>"
                + openOrLock
                + "</button></li>"
                + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                + closeOrOpenInquiryDisable
                + " data-toggle='modal' data-target='#editModal' ng-click='lead.loadDataToModal(lead.processes["
                + data.id
                + "])'><i class='fa fa-edit''>&nbsp;</i>"
                + this.translate.instant("LEAD_EDIT_LEAD")
                + "</button></li>"
                + "<li><button style='width: 100%; text-align: left;' class='btn btn-white' "
                + hasRightToDelete
                + " ng-click='lead.deleteRow(lead.processes["
                + data.id
                + "])'><i class='fa fa-trash-o'>&nbsp;</i>"
                + this.translate.instant("LEAD_DELETE_LEAD")
                + "</button></li>"
                + "</ul>" + "</div>";
        }
    }

    getStatusStyleHTML(data: Process): string {
        let hasProcessor: string = "";
        if (data.processor !== null)
            hasProcessor = "&nbsp;<span style='color: #ea394c;'><i class='fa fa-thumb-tack'></i></span>";
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

angular.module("app.lead.service", ["ngResource"]).service("LeadDataTableService", LeadDataTableService);