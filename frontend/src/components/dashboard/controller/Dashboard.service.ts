/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../lead/model/Lead.Model.ts" />
/// <reference path="../../offer/model/Offer.Model.ts" />
/// <reference path="../../sale/model/Sale.Model.ts" />
/// <reference path="../../common/service/Workflow.Service.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
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

const DashboardServiceId: string = "DashboardService";

class DashboardService {

    private $inject = [ProcessResourceId, toasterId, $rootScopeId, $translateId, $filterId, WorkflowServiceId];

    processResource: any;
    workflowService: WorkflowService;
    toaster: any;
    translate: any;
    orderBy: any;
    rootScope: any;

    openLeads: Array<Lead>;
    openOffers: Array<Offer>;
    closedSales: Array<Sale>;

    user: User;

    constructor(ProcessResource, toaster, $rootScope, $translate, $filter, WorkflowService) {
        this.processResource = ProcessResource.resource;
        this.workflowService = WorkflowService;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.orderBy = $filter("orderBy");
        this.user = $rootScope.currentUser;
        this.initDashboard();
    }

    initDashboard() {
        let self = this;
        this.processResource.getLeadsByStatus({ workflow: "LEAD", status: "OPEN" }).$promise.then(function (result) {
            self.openLeads = self.orderBy(result, "lead.timestamp", false);
        });
        this.processResource.getOffersByStatus({ workflow: "OFFER", status: "OFFER" }).$promise.then(function (result) {
            self.openOffers = self.orderBy(result, "offer.timestamp", false);
        });
        this.processResource.getLatestSales().$promise.then(function (result) {
            self.closedSales = result;
        });
    }

    setSortableOptions(): any {
        let self: DashboardService = this;
        return {
            update: function (e, ui) {
                let target = ui.item.sortable.droptargetModel;
                let source = ui.item.sortable.sourceModel;
                if ((self.openLeads === target && self.openOffers === source) ||
                    (self.openLeads === source && self.closedSales === target) ||
                    target === source) {
                    ui.item.sortable.cancel();
                }
            },
            stop: function (e, ui) {
                let target = ui.item.sortable.droptargetModel;
                let source = ui.item.sortable.sourceModel;
                let item = ui.item.sortable.model;
                if (self.closedSales === target && self.openOffers === source) {
                    self.createSale(item);
                }
                else if (self.openOffers === target && self.openLeads === source) {
                    self.createOffer(item);
                }
            },
            connectWith: ".connectList",
            items: "li:not(.not-sortable)"
        };
    }

    createOffer(process: Process) {
        let self = this;
        this.workflowService.addLeadToOffer(process).then(function (isResolved: boolean) {
            self.openOffers = self.orderBy(self.openOffers, "offer.timestamp", false);
        });
    }

    createSale(process: Process) {
        let self = this;
        this.workflowService.addOfferToSale(process).then(function (isResolved: boolean) {
            self.closedSales = self.orderBy(self.closedSales, "sale.timestamp", true);
        });
    }

    getOpenLeads(): Array<Lead> {
        return this.openLeads;
    }
    getOpenOffers(): Array<Offer> {
        return this.openOffers;
    }
    getClosedSales(): Array<Sale> {
        return this.closedSales;
    }
}
angular.module(moduleDashboardService, [ngResourceId]).service(DashboardServiceId, DashboardService);