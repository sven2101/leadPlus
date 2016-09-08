/// <reference path="../../../typeDefinitions/moment.d.ts" />
/// <reference path="../../../typeDefinitions/moment-node.d.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/model/OrderPosition.Model.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../Offer/controller/Offer.DataTableService.ts" />
/// <reference path="../../Offer/controller/Offer.Service.ts" />
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

const OfferControllerId: string = "OfferController";

class OfferController extends AbstractWorkflow {

    $inject = [$compileId, $scopeId, WorkflowServiceId, OfferDataTableServiceId, OfferServiceId];

    workflowService: WorkflowService;
    offerDataTableService: OfferDataTableService;
    offerService: OfferService;
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
    editWorkflowUnit: Offer = new Offer();
    edit: boolean;

    currentOrderPositions: Array<OrderPosition>;
    currentProductId = "-1";
    currentProductAmount = 1;
    currentCustomerId = "-1";
    customerSelected: boolean = false;

    currentTab: number = 1;

    constructor($compile, $scope, WorkflowService, OfferDataTableService, OfferService) {
        super();
        this.workflowService = WorkflowService;
        this.offerDataTableService = OfferDataTableService;
        this.offerService = OfferService;
        this.scope = $scope;
        this.compile = $compile;

        let self = this;
        function refreshData() {
            let resetPaging = false;
            this.dtInstance.reloadData(resetPaging);
        }
        function changeDataInput() {
            self.workflowService.changeDataInput(self.loadAllData, self.dtOptions, allDataOfferRoute, openDataOfferRoute);
        }
        function createdRow(row, data: Process, dataIndex) {
            self.offerService.setRow(data.id, row);
            self.offerDataTableService.configRow(row, data);
            self.compile(angular.element(row).contents())(self.scope);
        }
        function addActionsButtons(data: Process, type, full, meta) {
            let templatedata = { "process": self.processes[data.id] };
            return self.offerDataTableService.getActionButtonsHTML(templatedata);
        }
        function addStatusStyle(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.offerDataTableService.getStatusStyleHTML(data);
        }
        function addDetailButton(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.offerDataTableService.getDetailHTML(data.id);
        }
        this.dtOptions = this.offerDataTableService.getDTOptionsConfiguration(createdRow);
        this.dtColumns = this.offerDataTableService.getDTColumnConfiguration(addDetailButton, addStatusStyle, addActionsButtons);
    }

    tabOnClick(tab: number) {
        this.currentTab = tab;
    }

    appendChildRow(process: Process, event: any) {
        let childScope = this.scope.$new(true);
        this.comments[process.id] = this.workflowService.getCommentsByProcessId(process.id);
        this.workflowService.appendChildRow(childScope, process, process.offer, this.dtInstance, this, "offer");
    }

    loadCurrentIdToModal(id: string) {
        this.currentCommentModalId = id;
    }

    loadDataToModal(process: Process) {
        this.edit = true;
        this.currentProductId = "-1";
        this.currentProductAmount = 1;
        this.editProcess = process;
        this.currentOrderPositions = deepCopy(this.editProcess.offer.orderPositions);
        this.customerSelected = this.editProcess.offer.customer.id > 0;
        this.currentCustomerId = this.editProcess.offer.customer.id + "";
        this.editWorkflowUnit = deepCopy(this.editProcess.offer);
    }

    addComment(id: number, input: string) {
        this.workflowService.addComment(this.comments[id], this.processes[id], input[id]).then(function () {
            input[id] = "";
        });
    }

    save(edit: boolean) {
        this.offerService.saveEditedRow(this.editWorkflowUnit, this.editProcess, this.currentOrderPositions, this.dtInstance, this.scope, this.editForm);
    }

    clearNewOffer() {
        this.edit = false;
        this.editWorkflowUnit = new Offer();
        this.editProcess = new Process();
        this.editWorkflowUnit.orderPositions = new Array<OrderPosition>();
        this.currentOrderPositions = new Array<OrderPosition>();
        this.currentProductId = "-1";
        this.currentCustomerId = "-1";
        this.currentProductAmount = 1;
        this.customerSelected = false;
    }

    createNextWorkflowUnit(process: Process) {
        this.offerService.createSale(process, this.loadAllData, this.dtInstance, this.scope);
    }

    closeOrOpen(process: Process) {
        this.offerService.closeOrOpenOffer(process, this.dtInstance, this.scope);
    }

    deleteRow(process: Process) {
        this.offerService.deleteRow(process, this.dtInstance);
    }

    addProduct(array: Array<OrderPosition>) {
        this.workflowService.addProduct(array, this.currentProductId, this.currentProductAmount);
    }

    deleteProduct(array: Array<OrderPosition>, index: number) {
        this.workflowService.deleteProduct(array, index);
    }

    getOrderPositions(process: Process) {
        return process.offer.orderPositions;
    }

    sumOrderPositions(array: Array<OrderPosition>) {
        return this.workflowService.sumOrderPositions(array);
    }

    selectCustomer(workflow: any) {
        this.workflowService.selectCustomer(workflow, this.currentCustomerId, this.customerSelected);
    }

    followUp(process: Process) {
        this.offerService.followUp(process, this.loadAllData, this.scope);
    }
}
angular.module(moduleOffer, [ngResourceId]).controller(OfferControllerId, OfferController);



