/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../common/service/Workflow.Service.ts" />
/// <reference path="../../statistic/controller/Statistic.Service.ts" />
/// <reference path="../../dashboard/controller/Dashboard.Service.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
/// <reference path="../../common/model/Commentary.Model.ts" />
/// <reference path="../../common/model/IWorkflow.Interface.ts" />
/// <reference path="../../Lead/controller/Lead.Service.ts" />
/// <reference path="../../Offer/controller/Offer.Service.ts" />
/// <reference path="../../Sale/controller/Sale.Service.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />
/// <reference path="../../Notification/controller/Notification.Service.ts" />

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";

const DashboardControllerId: string = "DashboardController";

class DashboardController {

    $inject = [WorkflowServiceId, StatisticServiceId, DashboardServiceId, $rootScopeId, TemplateServiceId, NotificationServiceId];

    workflowService: WorkflowService;
    statisticService: StatisticService;
    dashboardService: DashboardService;
    templateService: TemplateService;
    notificationService: NotificationService;

    commentModalInput: string;
    workflowModalData: IWorkflow;
    workflowModalType: string;
    editWorkflowUnit: Offer;
    workflowModalProcess: Process;
    sortableOptions: any;

    rootScope;

    template: Template = new Template();
    templates: Array<Template> = [];

    constructor(WorkflowService, StatisticService, DashboardService, $rootScope, TemplateService, NotificationService) {
        this.workflowService = WorkflowService;
        this.statisticService = StatisticService;
        this.dashboardService = DashboardService;
        this.templateService = TemplateService;
        this.getAllActiveTemplates();

        this.rootScope = $rootScope;
        this.statisticService.loadAllResourcesByDateRange("MONTHLY");
        this.sortableOptions = this.dashboardService.setSortableOptions();

        this.refreshData();
        this.refreshTodos();
    }

    refreshTodos(): void {
        this.dashboardService.refreshTodos();
    }

    getAllActiveTemplates() {
        this.templateService.getAll().then((result) => this.templates = result, (error) => console.log(error));
    }
    /*
        createOffer(process: Process) {
            this.dashboardService.createOffer(process);
        }
    */
    createSale(process: Process) {
        this.dashboardService.createSale(process);
    }

    saveDataToModal(info, type, process) {
        this.workflowModalData = info;
        this.workflowModalType = type;
        this.workflowModalProcess = process;
    }

    refreshData() {
        this.dashboardService.initDashboard();
    }

    addComment(process) {
        let self: DashboardController = this;
        this.workflowService.addComment(process, this.commentModalInput).then(function () {
            self.commentModalInput = "";
        });
    }

    getOpenLeads(): Array<Process> {
        return this.dashboardService.getOpenLeads();
    }
    getInContacts(): Array<Process> {
        return this.dashboardService.getInContacts();
    }
    getOpenOffers(): Array<Process> {
        return this.dashboardService.getOpenOffers();
    }
    getClosedSales(): Array<Process> {
        return this.dashboardService.getClosedSales();
    }
    getProfit(): number {
        return this.statisticService.getProfitTotal();
    }
    getTurnover(): number {
        return this.statisticService.getTurnoverTotal();
    }
    getLeadAmount(): number {
        return this.statisticService.getLeadAmount();
    }
    getOfferAmount(): number {
        return this.statisticService.getOfferAmount();
    }
    getSaleAmount(): number {
        return this.statisticService.getSaleAmount();
    }
    getLeadsArray(): Array<number> {
        return this.statisticService.getLeadsArray();
    }
    getOffersArray(): Array<number> {
        return this.statisticService.getOffersArray();
    }
    getSalesArray(): Array<number> {
        return this.statisticService.getSalesArray();
    }
    getConversionrate(): number {
        return this.statisticService.getLeadConversionRate();
    }
    toLocalDate(timestamp: any): any {
        return toLocalDate(timestamp);
    }
    sumOrderPositions(array: Array<OrderPosition>): number {
        return this.workflowService.sumOrderPositions(array);
    }

    openFollowUpModal(process: Process) {
        this.dashboardService.openFollowUpModal(process);
    }

    getOrderPositionList(workflow: any): string {
        if (isNullOrUndefined(workflow)) {
            return;
        }
        let text = "";
        for (let i = 0; i < workflow.orderPositions.length; i++) {
            text += workflow.orderPositions[i].amount + " " + workflow.orderPositions[i].product.name;
            if (i + 1 < workflow.orderPositions.length) {
                text += ", ";
            }
        }
        return text;
    }

    getAmountOfFollowUps(process: Process): number {
        let amount: number = 0;
        for (let i = 0; i < process.notifications.length; i++) {
            if (process.notifications[i].notificationType === NotificationType.FOLLOWUP) {
                amount++;
            }
        }
        return amount;
    }

}

angular.module(moduleDashboard, [ngResourceId, "summernote"]).controller(DashboardControllerId, DashboardController);