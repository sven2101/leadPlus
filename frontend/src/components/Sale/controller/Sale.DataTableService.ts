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

const SaleDataTableServiceId: string = "SaleDataTableService";
const allDataSaleRoute: string = "/api/rest/processes/sales";
const openDataSaleRoute: string = "/api/rest/processes/workflow/SALE/state/SALE";

class SaleDataTableService {

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
        this.user = $rootScope.globals.user;
    }

    getDTOptionsConfiguration(createdRow: Function, defaultSearch: string = "") {
        return this.DTOptionsBuilder.newOptions()
            .withOption("ajax", {
                url: openDataSaleRoute,
                error: function (xhr, error, thrown) {
                    console.log(xhr);
                },
                type: "GET"
            })
            .withOption("stateSave", true)
            .withDOM(this.workflowService.getDomString())
            .withPaginationType("full_numbers")
            .withButtons(this.workflowService.getButtons(this.translate("SALE_SALES"), [6, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11]))
            .withBootstrap()
            .withOption("createdRow", createdRow)
            .withOption("order", [4, "desc"])
            .withOption("search", { "search": defaultSearch })
            .withLanguageSource(this.workflowService.getLanguageSource(this.rootScope.language));
    }

    getDetailHTML(id: number): string {
        return "<a id='id_" + id + "' class='green shortinfo' href='javascript:;'"
            + "ng-click='saleCtrl.appendChildRow(saleCtrl.processes[" + id
            + "])' title='Details'>"
            + "<i class='glyphicon glyphicon-plus-sign'/></a>";
    }

    getDTColumnConfiguration(addDetailButton: Function, addStatusStyle: Function, addActionsButtons: Function): Array<any> {
        let self = this;
        return [
            this.DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                .renderWith(addDetailButton),
            this.DTColumnBuilder.newColumn("sale.customer.lastname").withTitle(
                this.translate("COMMON_NAME")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.company").withTitle(
                this.translate("COMMON_COMPANY")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.email").withTitle(
                this.translate("COMMON_EMAIL")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.timestamp").withTitle(
                this.translate("COMMON_DATE")).renderWith(
                function (data, type, full) {
                    return toLocalDate(data);
                }).withOption("type", "date-euro")
                .withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.phone").withTitle(
                this.translate("COMMON_PHONE")).notVisible(),
            this.DTColumnBuilder.newColumn("sale.customer.firstname").withTitle(
                this.translate("COMMON_FIRSTNAME")).notVisible(),
            this.DTColumnBuilder.newColumn("sale.deliveryAddress").withTitle(
                this.translate("COMMON_PRODUCT_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_PRODUCT_SALE_TURNOVER")).renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.sale.saleTurnover)) {
                        return self.filter("currency")(0, "€", 2);
                    }
                    return self.filter("currency")
                        (data.sale.saleTurnover, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_PRODUCT_SALE_PROFIT")).renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.sale.saleProfit)) {
                        return self.filter("currency")(0, "€", 2);
                    }
                    return self.filter("currency")
                        (data.sale.saleProfit, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn("processor.username").withTitle(
                this.translate("COMMON_PROCESSOR")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            this.DTColumnBuilder.newColumn(null).withTitle(
                "<span class='glyphicon glyphicon-cog'></span>").withClass(
                "text-center").notSortable().renderWith(addActionsButtons),
            this.DTColumnBuilder.newColumn(null)
                .renderWith(
                function (data, type, full) {
                    return "#id:" + data.id + "#";
                }).notVisible()];
    }

    setActionButtonsConfig(user: User, templateData: any) {
        let config = {
            "hasRightToDelete": false,
            "disablePinDropdown": false,
            "disablePin": false,
            "minwidth": 100
        };
        if (isNullOrUndefined(templateData.process.processor) || (templateData.process.processor !== null
            && user.username === templateData.process.processor.username)) {
            config.hasRightToDelete = true;
        }

        if (user.role === Role.USER) {
            config.disablePinDropdown = true;
        }

        if (templateData.process.processor !== null
            && user.username !== templateData.process.processor.username) {
            config.disablePin = true;
        }
        templateData.config = config;
        let translation = {
            "editWorkflowUnit": this.translate.instant("SALE_EDIT_SALE"),
            "deleteWorkflowUnit": this.translate.instant("SALE_DELETE_SALE"),
            "rollBackWorkflowUnit": this.translate.instant("SALE_ROLLBACK"),
        };
        templateData.translation = translation;
    }

    getActionButtonsHTML(templateData: any): string {
        this.setActionButtonsConfig(this.user, templateData);
        if ($(window).width() > 1300) {
            return "<div actionbuttons template='standard' parent='saleCtrl' type='sale' templatedata='" + JSON.stringify(templateData) + "'></div>";
        } else {
            return "<div actionbuttons template='dropdown' parent='saleCtrl' type='sale' templatedata='" + JSON.stringify(templateData) + "'></div>";
        }
    }

    getStatusStyleHTML(data: Process): string {
        return "<span style='color: #1872ab;'>"
            + this.translate.instant("COMMON_STATUS_SALE") + "</span>";
    }

}
angular.module(moduleSaleDataTableService, [ngResourceId]).service(SaleDataTableServiceId, SaleDataTableService);