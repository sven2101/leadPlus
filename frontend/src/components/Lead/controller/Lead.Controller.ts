/// <reference path="../../../typeDefinitions/moment.d.ts" />
/// <reference path="../../../typeDefinitions/moment-node.d.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/model/OrderPosition.Model.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
/// <reference path="../../Lead/model/Lead.Model.ts" />
/// <reference path="../../Lead/controller/Lead.DataTableService.ts" />
/// <reference path="../../Lead/controller/Lead.Service.ts" />
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

const LeadControllerId: string = "LeadController";

class LeadController extends AbstractWorkflow {

    $inject = [$compileId, $scopeId, WorkflowServiceId, LeadDataTableServiceId, LeadServiceId];

    workflowService: WorkflowService;
    leadDataTableService: LeadDataTableService;
    leadService: LeadService;
    scope;
    compile;
    dtOptions;
    dtColumns;
    dtInstance: any = { DataTable: null };

    commentInput: string;
    commentModalInput: string;
    comments: { [key: number]: Array<Commentary> } = {};
    currentCommentModalId: string = "";
    loadAllData: boolean = false;
    processes: { [key: number]: Process } = {};
    editForm: any;
    editProcess: Process;
    editWorkflowUnit: Lead = new Lead();
    edit: boolean;

    currentOrderPositions: Array<OrderPosition>;
    currentProductId = "-1";
    currentProductAmount = 1;
    currentCustomerId = "-1";
    customerSelected: boolean = false;

    constructor($compile, $scope, WorkflowService, LeadDataTableService, LeadService) {
        super();
        this.workflowService = WorkflowService;
        this.leadDataTableService = LeadDataTableService;
        this.leadService = LeadService;
        this.scope = $scope;
        this.compile = $compile;

        let self = this;
        function refreshData() {
            let resetPaging = false;
            this.dtInstance.reloadData(resetPaging);
        }
        function changeDataInput() {
            self.workflowService.changeDataInput(self.loadAllData, self.dtOptions, allDataRoute, openDataRoute);
        }
        function createdRow(row, data: Process, dataIndex) {
            self.leadService.setRow(data.id, row);
            self.leadDataTableService.configRow(row, data);
            self.compile(angular.element(row).contents())(self.scope);
        }
        function addActionsButtons(data: Process, type, full, meta) {
            let templatedata = { "process": self.processes[data.id] };
            return self.leadDataTableService.getActionButtonsHTML(templatedata);
        }
        function addStatusStyle(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.leadDataTableService.getStatusStyleHTML(data);
        }
        function addDetailButton(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.leadDataTableService.getDetailHTML(data.id);
        }
        this.dtOptions = this.leadDataTableService.getDTOptionsConfiguration(createdRow);
        this.dtColumns = this.leadDataTableService.getDTColumnConfiguration(addDetailButton, addStatusStyle, addActionsButtons);
    }

    appendChildRow(process: Process, event: any) {
        let childScope = this.scope.$new(true);
        this.comments[process.id] = this.workflowService.getCommentsByProcessId(process.id);
        this.workflowService.appendChildRow(childScope, process, process.lead, this.dtInstance, this, "lead");
    }

    loadCurrentIdToModal(id: string) {
        this.currentCommentModalId = id;
    }

    loadDataToModal(process: Process) {
        this.edit = true;
        this.currentProductId = "-1";
        this.currentProductAmount = 1;
        this.editProcess = process;
        this.currentOrderPositions = deepCopy(this.editProcess.lead.orderPositions);
        this.customerSelected = this.editProcess.lead.customer.id > 0;
        this.currentCustomerId = this.editProcess.lead.customer.id + "";
        this.editWorkflowUnit = deepCopy(this.editProcess.lead);
    }

    addComment(id: number, input: string) {
        this.workflowService.addComment(this.comments[id], this.processes[id], input[id]).then(function () {
            input[id] = "";
        });
    }

    save(edit: boolean) {
        if (edit === true) {
            this.leadService.saveEditedRow(this.editWorkflowUnit, this.editProcess, this.currentOrderPositions, this.dtInstance, this.scope, this.editForm);
        }
        else {
            this.leadService.saveLead(this.editForm, this.dtInstance, this.editWorkflowUnit, this.currentOrderPositions);
        }
    }

    clearNewLead() {
        this.edit = false;
        this.editWorkflowUnit = new Lead();
        this.editProcess = new Process();
        this.editWorkflowUnit.orderPositions = new Array<OrderPosition>();
        this.currentOrderPositions = new Array<OrderPosition>();
        this.currentProductId = "-1";
        this.currentCustomerId = "-1";
        this.currentProductAmount = 1;
        this.customerSelected = false;
    }

    createOffer(process: Process) {
        this.leadService.createOffer(process, this.loadAllData, this.dtInstance, this.scope);
    }

    pin(process: Process) {
        this.leadService.pin(process, this.dtInstance, this.scope);
    }

    closeOrOpen(process: Process) {
        this.leadService.closeOrOpenInquiry(process, this.dtInstance, this.scope);
    }

    deleteRow(process: Process) {
        this.leadService.deleteRow(process, this.dtInstance);
    }

    addProduct(array: Array<OrderPosition>) {
        this.workflowService.addProduct(array, this.currentProductId, this.currentProductAmount);
    }

    deleteProduct(array: Array<OrderPosition>, index: number) {
        this.workflowService.deleteProduct(array, index);
    }

    getOrderPositions(process: Process) {
        return process.lead.orderPositions;
    }

    sumOrderPositions(array: Array<OrderPosition>) {
        return this.workflowService.sumOrderPositions(array);
    }

    selectCustomer(workflow: any) {
        this.workflowService.selectCustomer(workflow, this.currentCustomerId, this.customerSelected);
    }
}
angular.module(moduleLead, [ngResourceId]).controller(LeadControllerId, LeadController);




