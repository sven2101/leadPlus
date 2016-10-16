/// <reference path="../../../typeDefinitions/moment.d.ts" />
/// <reference path="../../../typeDefinitions/moment-node.d.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/model/OrderPosition.Model.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
/// <reference path="../../Sale/model/Sale.Model.ts" />
/// <reference path="../../Sale/controller/Sale.DataTableService.ts" />
/// <reference path="../../Sale/controller/Sale.Service.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../common/service/Workflow.Service.ts" />
/// <reference path="../../common/service/AbstractWorkflow.ts" />
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

const SaleControllerId: string = "SaleController";

class SaleController extends AbstractWorkflow {

    $inject = [$rootScopeId, $compileId, $scopeId, WorkflowServiceId, SaleDataTableServiceId, SaleServiceId, TemplateServiceId, , $routeParamsId];

    type: string = "sale";

    workflowService: WorkflowService;
    saleDataTableService: SaleDataTableService;
    saleService: SaleService;
    templateService: TemplateService;

    scope;
    compile;
    dtOptions;
    dtColumns;
    dtInstance: any = { DataTable: null };

    commentInput: string;
    commentModalInput: string;
    loadAllData: boolean = false;
    processes: { [key: number]: Process } = {};
    editProcess: Process;
    editWorkflowUnit: Sale = new Sale();
    edit: boolean;

    currentOrderPositions: Array<OrderPosition>;
    templates: Array<Template> = [];
    currentNotification: Notification;

    currentProductId = "-1";
    currentProductAmount = 1;
    currentCustomerId = "-1";
    customerSelected: boolean = false;

    currentTab: number = 1;

    customerEditForm: any;
    leadEditForm: any;
    supplyEditForm: any;
    priceEditForm: any;
    emailEditForm: any;
    saleEditForm: any;

    constructor($rootScope, $compile, $scope, WorkflowService, SaleDataTableService, SaleService, TemplateService, $routeParams) {
        super(WorkflowService);
        this.workflowService = WorkflowService;
        this.saleDataTableService = SaleDataTableService;
        this.saleService = SaleService;
        this.scope = $scope;
        this.compile = $compile;
        this.templateService = TemplateService;
        this.currentWizard = 1;

        let self = this;

        function createdRow(row, data: Process, dataIndex) {
            self.saleService.setRow(data.id, row);
            self.compile(angular.element(row).contents())(self.scope);
        }
        function addActionsButtons(data: Process, type, full, meta) {
            let templatedata = { "process": deepCopy(self.processes[data.id]) };
            return self.saleDataTableService.getActionButtonsHTML(templatedata);
        }
        function addStatusStyle(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.saleDataTableService.getStatusStyleHTML(data);
        }
        function addDetailButton(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.saleDataTableService.getDetailHTML(data.id);
        }

        let searchLink = "";
        let processId = $routeParams.processId;
        if (!isNullOrUndefined(processId) && processId !== "") {
            searchLink = "#id:" + processId + "#";
            let intervall = setInterval(function () {
                if (!isNullOrUndefined(angular.element("#id_" + processId)) && !isNullOrUndefined(self.processes[processId])) {
                    self.appendChildRow(self.processes[processId]);
                    clearInterval(intervall);
                }
            }, 100);

            setTimeout(function () {
                clearInterval(intervall);
            }, 10000);
        }

        this.dtOptions = this.saleDataTableService.getDTOptionsConfiguration(createdRow, searchLink);
        this.dtColumns = this.saleDataTableService.getDTColumnConfiguration(addDetailButton, addStatusStyle, addActionsButtons);

        this.getAllActiveTemplates();
    }

    refreshData() {
        let resetPaging = false;
        this.dtInstance.reloadData(resetPaging);
    }
    changeDataInput() {
        this.workflowService.changeDataInput(this.loadAllData, this.dtOptions, allDataSaleRoute, openDataSaleRoute);
    }

    tabOnClick(tab: number) {
        this.currentTab = tab;
    }

    appendChildRow(process: Process) {
        let childScope = this.scope.$new(true);
        this.workflowService.appendChildRow(childScope, process, process.sale, this.dtInstance, this, "sale");
    }

    loadDataToModal(process: Process) {
        if (!isNullOrUndefined(this.customerEditForm)) {
            this.customerEditForm.$setPristine();
        }
        if (!isNullOrUndefined(this.leadEditForm)) {
            this.leadEditForm.$setPristine();
        }
        if (!isNullOrUndefined(this.supplyEditForm)) {
            this.supplyEditForm.$setPristine();
        }
        if (!isNullOrUndefined(this.priceEditForm)) {
            this.priceEditForm.$setPristine();
        }
        if (!isNullOrUndefined(this.emailEditForm)) {
            this.emailEditForm.$setPristine();
        }
        if (!isNullOrUndefined(this.saleEditForm)) {
            this.saleEditForm.$setPristine();
        }

        this.edit = true;
        this.currentProductId = "-1";
        this.currentProductAmount = 1;
        this.editProcess = process;
        this.currentOrderPositions = deepCopy(this.editProcess.sale.orderPositions);
        this.customerSelected = this.editProcess.sale.customer.id > 0;
        this.currentCustomerId = this.editProcess.sale.customer.id + "";
        this.editWorkflowUnit = deepCopy(this.editProcess.sale);
        // this.editWorkflowUnit.saleTurnover = this.editProcess.offer.offerPrice;
    }

    addComment(id: number, input: string) {
        this.workflowService.addComment(this.processes[id], input[id]).then(function () {
            input[id] = "";
        });
    }

    calculateProfit() {
        this.editWorkflowUnit.saleProfit = this.editWorkflowUnit.saleTurnover - this.editWorkflowUnit.saleCost;
    }

    save(edit: boolean) {
        this.saleService.save(this.editWorkflowUnit, this.editProcess, this.currentOrderPositions, this.dtInstance, this.scope);
    }

    clearNewSale() {
        this.edit = false;
        this.editWorkflowUnit = new Sale();
        this.editProcess = new Process();
        this.editWorkflowUnit.orderPositions = new Array<OrderPosition>();
        this.currentOrderPositions = new Array<OrderPosition>();
        this.currentProductId = "-1";
        this.currentCustomerId = "-1";
        this.currentProductAmount = 1;
        this.customerSelected = false;
    }

    deleteRow(process: Process) {
        this.saleService.deleteRow(process, this.dtInstance);
    }

    getOrderPositions(process: Process): Array<OrderPosition> {
        if (!isNullOrUndefined(process.sale)) {
            return process.sale.orderPositions;
        }
    }

    pin(process: Process, user: User) {
        this.saleService.pin(process, this.dtInstance, this.scope, user);
    }

    selectCustomer(workflow: any) {
        this.customerSelected = this.workflowService.selectCustomer(workflow, this.currentCustomerId);
    }

    rollBack(process: Process): void {
        this.saleService.rollBack(process, this.dtInstance, this.scope);
    }

    getAllActiveTemplates() {
        this.templateService.getAll().then((result) => this.templates = result, (error) => console.log(error));
    }

    setFormerNotification(notificationId: number) {
        if (Number(notificationId) === -1) {
            this.currentNotification = null;
        }
        let notification: Notification = findElementById(this.editProcess.notifications, Number(notificationId)) as Notification;
        console.log(this.editProcess);
        console.log(notificationId);
        if (!isNullOrUndefined(notification)) {
            this.currentNotification = deepCopy(notification);
        }
    }
}
angular.module(moduleSale, [ngResourceId]).controller(SaleControllerId, SaleController);



