/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../lead/model/Lead.Model.ts" />
/// <reference path="../../offer/model/Offer.Model.ts" />
/// <reference path="../../sale/model/Sale.Model.ts" />
/// <reference path="../../common/service/Workflow.Service.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
/// <reference path="../../common/model/Promise.interface.ts" />
/// <reference path="../../common/service/Workflow.Controller.ts" />


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

    private $inject = [ProcessResourceId, toasterId, $rootScopeId, $translateId, WorkflowServiceId, $uibModalId, $qId];

    processResource: any;
    workflowService: WorkflowService;
    toaster: any;
    translate: any;
    rootScope: any;
    q: any;

    openLeads: Array<Process>;
    inContacts: Array<Process>;
    openOffers: Array<Process>;
    closedSales: Array<Process>;

    openLeadsValue: number = 0;
    inContactsValue: number = 0;
    openOffersValue: number = 0;
    closedSalesValue: number = 0;

    uibModal;

    user: User;
    todos: Array<Process> = [];

    constructor(ProcessResource, toaster, $rootScope, $translate, WorkflowService, $uibModal, $q) {
        this.processResource = ProcessResource.resource;
        this.workflowService = WorkflowService;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.q = $q;
        this.user = $rootScope.globals.user;
        this.uibModal = $uibModal;
        this.initDashboard();
        this.refreshTodos();

        $rootScope.$on("onTodosChange", (event) => {
            this.refreshTodos();
        });
        let self = this;
        setInterval(function () {
            self.refreshTodos();
        }, 5 * 60 * 1000);
    }

    initDashboard() {
        let self = this;
        this.processResource.getLeadsByStatus({ workflow: "LEAD", status: "OPEN" }).$promise.then(function (result) {
            let open: Array<Process> = new Array<Process>();
            let contact: Array<Process> = new Array<Process>();
            for (let i = 0; i < result.length; i++) {
                if (result[i].status === "OPEN") {
                    open.push(result[i]);
                }
                else if (result[i].status === "INCONTACT") {
                    contact.push(result[i]);
                }
            }
            self.openLeads = self.orderProcessByTimestamp(open, "lead");
            self.sumLeads();
            self.inContacts = self.orderProcessByTimestamp(contact, "lead");
            self.sumInContacts();
        });
        this.processResource.getOffersByStatus({ workflow: "OFFER", status: "OFFER" }).$promise.then(function (result) {
            self.openOffers = self.orderProcessByTimestamp(result, "offer");
            self.sumOffers();
        });
        this.processResource.getLatestSales().$promise.then(function (result) {
            self.closedSales = result;
            self.sumSales();
        });
    }

    sumLeads(): void {
        this.openLeadsValue = 0;
        for (let i = 0; i < this.openLeads.length; i++) {
            this.openLeadsValue += this.workflowService.sumOrderPositions(this.openLeads[i].lead.orderPositions);
        }
    }
    sumInContacts(): void {
        this.inContactsValue = 0;
        for (let i = 0; i < this.inContacts.length; i++) {
            this.inContactsValue += this.workflowService.sumOrderPositions(this.inContacts[i].lead.orderPositions);
        }
    }
    sumOffers(): void {
        this.openOffersValue = 0;
        for (let i = 0; i < this.openOffers.length; i++) {
            this.openOffersValue += this.openOffers[i].offer.offerPrice;
        }
    }
    sumSales(): void {
        this.closedSalesValue = 0;
        for (let i = 0; i < this.closedSales.length; i++) {
            this.closedSalesValue += this.closedSales[i].sale.saleTurnover;
        }
    }

    setSortableOptions(): any {
        let self: DashboardService = this;
        let sortableList = {
            update: function (e, ui) {
                let target = ui.item.sortable.droptargetModel;
                let source = ui.item.sortable.sourceModel;
                if ((self.openLeads === target && self.openOffers === source) ||
                    (self.openLeads === target && self.inContacts === source) ||
                    (self.openLeads === source && self.closedSales === target) ||
                    (self.inContacts === target && self.openOffers === source) ||
                    (self.inContacts === target && self.closedSales === source) ||
                    (self.closedSales === target && self.inContacts === source) ||
                    target === source) {
                    ui.item.sortable.cancel();
                }
            },
            stop: function (e, ui) {
                let target = ui.item.sortable.droptargetModel;
                let source = ui.item.sortable.sourceModel;
                let item = ui.item.sortable.model;
                if (self.closedSales === target && self.openOffers === source) {
                    self.startSaleTransformation(item).then(function (result) {
                        if (result === false) {
                            target.splice(target.indexOf(item), 1);
                            source.push(item);
                        }
                        self.updateDashboard("sale");
                    }, function (result) {
                        self.updateDashboard("sale");
                    });
                }
                else if (self.openOffers === target && self.openLeads === source
                    || self.openOffers === target && self.inContacts === source) {
                    self.startOfferTransformation(item).then(function (result) {
                        if (result === false) {
                            target.splice(target.indexOf(item), 1);
                            source.push(item);
                        }
                        self.updateDashboard("offer");
                    }, function (result) {
                        self.updateDashboard("offer");
                    });
                }
                else if (self.inContacts === target && self.openLeads === source) {
                    self.inContact(item);
                    self.updateDashboard("lead");
                }
            },
            connectWith: ".connectList",
            items: "li:not(.not-sortable)"
        };
        return sortableList;
    }

    updateDashboard(type: string) {
        if (type === "lead") {
            this.openLeads = this.orderProcessByTimestamp(this.openLeads, "lead");
            this.inContacts = this.orderProcessByTimestamp(this.inContacts, "lead");
            this.sumLeads();
            this.sumInContacts();
        }
        else if (type === "offer") {
            this.openOffers = this.orderProcessByTimestamp(this.openOffers, "offer");
            this.openLeads = this.orderProcessByTimestamp(this.openLeads, "lead");
            this.inContacts = this.orderProcessByTimestamp(this.inContacts, "lead");
            this.sumLeads();
            this.sumInContacts();
            this.sumOffers();
        } else if (type === "sale") {
            this.closedSales = this.orderProcessByTimestamp(this.closedSales, "sale");
            this.openOffers = this.orderProcessByTimestamp(this.openOffers, "offer");
            this.sumOffers();
            this.sumSales();
        }
    }

    startOfferTransformation(process: Process): IPromise<boolean> {
        let defer = this.q.defer();
        this.workflowService.startOfferTransformation(process).then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.reject(false);
        });
        return defer.promise;
    }

    startSaleTransformation(process: Process): IPromise<boolean> {
        let defer = this.q.defer();
        this.workflowService.startSaleTransformation(process).then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.reject(false);
        });
        return defer.promise;
    }

    inContact(process: Process) {
        let self = this;
        this.processResource.setStatus({
            id: process.id
        }, "INCONTACT").$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_INCONTACT"));
            process.status = "INCONTACT";
            self.sumLeads();
            self.sumInContacts();
        });
    }

    getOpenLeads(): Array<Process> {
        return this.openLeads;
    }
    getInContacts(): Array<Process> {
        return this.inContacts;
    }
    getOpenOffers(): Array<Process> {
        return this.openOffers;
    }
    getClosedSales(): Array<Process> {
        return this.closedSales;
    }

    refreshTodos(): void {
        if (isNullOrUndefined(this.rootScope.globals.user)) {
            return;
        }

        this.processResource.getTodos({ processorId: this.rootScope.globals.user.id }).$promise.then((data) => {
            this.todos = this.orderByTimestamp(data);
            this.rootScope.$broadcast("todosChanged", this.todos);
        }, (error) => console.log(error));

    }

    orderByTimestamp(todos: Array<Process>): Array<Process> {
        return todos.sort((a, b) => {
            let tempA = isNullOrUndefined(a.offer) ? moment(a.lead.timestamp, "DD.MM.YYYY HH:mm:ss") : moment(a.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
            let tempB = isNullOrUndefined(b.offer) ? moment(b.lead.timestamp, "DD.MM.YYYY HH:mm:ss") : moment(b.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
            if (tempA < tempB) { return -1; }
            else if (tempA > tempB) { return 1; }
            else { return 0; }
        });
    }

    orderProcessByTimestamp(process: Array<Process>, type: string): Array<Process> {
        if (type === "lead") {
            return process.sort((a, b) => {
                let tempA = moment(a.lead.timestamp, "DD.MM.YYYY HH:mm:ss");
                let tempB = moment(b.lead.timestamp, "DD.MM.YYYY HH:mm:ss");
                if (tempA < tempB) { return -1; }
                else if (tempA > tempB) { return 1; }
                else { return 0; }
            });
        } else if (type === "offer") {
            return process.sort((a, b) => {
                let tempA = moment(a.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
                let tempB = moment(b.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
                if (tempA < tempB) { return -1; }
                else if (tempA > tempB) { return 1; }
                else { return 0; }
            });
        } else if (type === "sale") {
            return process.sort((a, b) => {
                let tempA = moment(a.sale.timestamp, "DD.MM.YYYY HH:mm:ss");
                let tempB = moment(b.sale.timestamp, "DD.MM.YYYY HH:mm:ss");
                if (tempA < tempB) { return -1; }
                else if (tempA > tempB) { return 1; }
                else { return 0; }
            });
        }
    }
}
angular.module(moduleDashboardService, [ngResourceId]).service(DashboardServiceId, DashboardService);