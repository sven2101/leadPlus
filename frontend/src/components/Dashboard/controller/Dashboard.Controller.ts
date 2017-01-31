/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../statistic/controller/Statistic.Service.ts" />
/// <reference path="../../dashboard/controller/Dashboard.Service.ts" />
/// <reference path="../../Process/model/Process.Model.ts" />
/// <reference path="../../Commentary/model/Commentary.Model.ts" />
/// <reference path="../../Workflow/model/IWorkflow.Interface.ts" />
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

    $inject = [WorkflowServiceId, StatisticServiceId, DashboardServiceId, $rootScopeId, TemplateServiceId, NotificationServiceId, $sceId, $scopeId];

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
    currentUser: User;
    showMyTasks: boolean = false;
    todoAmountLimit: number = 10;
    height: number;
    cardSearchText: string;

    rootScope;
    scope;
    sce;

    template: Template = new Template();
    templates: Array<Template> = [];

    constructor(WorkflowService, StatisticService, DashboardService, $rootScope, TemplateService, NotificationService, $sce, $scope) {
        this.workflowService = WorkflowService;
        this.statisticService = StatisticService;
        this.dashboardService = DashboardService;
        this.templateService = TemplateService;
        this.getAllActiveTemplates();

        this.sce = $sce;
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.statisticService.loadAllResourcesByDateRange("MONTHLY", "ALL");
        this.sortableOptions = this.dashboardService.setSortableOptions(this.scope);
        this.currentUser = this.rootScope.user;
        this.registerIntervall();

        this.refreshData();
        this.refreshTodos();
        let self = this;
        $scope.$watch("dashboardCtrl.cardSearchText", function (newValue) {
            self.dashboardService.filterBySearch(newValue, self.showMyTasks);
        });
    }
    registerIntervall() {
        let self = this;
        let intervall = setInterval(function () {
            if (!self.dashboardService.dragging && !self.dashboardService.inModal) {
                self.refreshData();
            }
        }, 10 * 60 * 1000);
        self.scope.$on("$destroy", function () {
            clearInterval(intervall);
        });
    }

    async openNewLeadModal() {
        let resultProcess: Process = await this.workflowService.openNewLeadModal();
        if (!isNullOrUndefined(resultProcess)) {
            this.rootScope.leadsCount += 1;
            this.dashboardService.addNewLead(resultProcess);
        }
    }

    refreshTodos(): void {
        this.dashboardService.refreshTodos();
    }

    getAllActiveTemplates() {
        this.templateService.getAll().then((result) => this.templates = result, (error) => handleError(error));
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

    getAsHtml(html: string) {
        return this.sce.trustAsHtml(html);
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
    getDoneOffers(): Array<Process> {
        return this.dashboardService.getDoneOffers();
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
    toLocalDate(timestamp: any, process: Process = null): any {
        if (timestamp === undefined) {
            timestamp = newTimestamp();
        }
        return toLocalDate(timestamp, "DD.MM.YYYY HH:mm");
    }
    sumOrderPositions(array: Array<OrderPosition>): number {
        return this.workflowService.sumOrderPositions(array);
    }

    openQuickEmailModal(process: Process) {
        this.workflowService.openQuickEmailModal(process);
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

    hasRightToDrag(process: Process): boolean {
        if (isNullOrUndefined(process.processor)) {
            return true;
        } else if (this.currentUser.role === Role.ADMIN || this.currentUser.role === Role.SUPERADMIN) {
            return true;
        } else if (this.currentUser.id === process.processor.id) {
            return true;
        }
        return false;
    }

    getClassToDrag(process: Process, element: string): string {
        return element + (this.hasRightToDrag(process) ? "-element draggable dragItem" : "-element not-sortable draggable dragItem");
    }

    getHeight(): number {
        if (!stringIsNullorEmpty(this.cardSearchText) || this.showMyTasks) {
            return this.height;
        }
        let max = 0;
        let array: Array<number> = new Array<number>(this.getOpenLeads().length, this.getInContacts().length, this.getOpenOffers().length, this.getDoneOffers().length, this.getClosedSales().length);
        for (let element of array) {
            if (element > max) {
                max = element;
            }
        }
        if (max >= 7) {
            this.height = 7 * 85;
            return this.height;
        }
        this.height = (max * 85) + 100;
        return this.height;
    }
}

angular.module(moduleDashboard, [ngResourceId, moduleSummernote]).controller(DashboardControllerId, DashboardController);