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

    $inject = [$rootScopeId, $compileId, $scopeId, WorkflowServiceId, LeadDataTableServiceId, LeadServiceId, FileServiceId, $routeParamsId, $sceId];

    type: string = "lead";

    uibModalInstance;

    workflowService: WorkflowService;
    leadDataTableService: LeadDataTableService;
    leadService: LeadService;
    fileService: FileService;

    scope;

    compile;
    dtOptions;
    dtColumns;
    dtInstance: any = { DataTable: null };
    dtInstanceCallback: any;

    commentInput: string;
    commentModalInput: string;
    loadAllData: boolean = false;
    processes: { [key: number]: Process } = {};
    editProcess: Process;
    editWorkflowUnit: Lead = new Lead();
    edit: boolean;
    editable: boolean = true;


    currentProductId = "-1";
    currentProductAmount = 1;

    customerEditForm: any;
    leadEditForm: any;
    supplyEditForm: any;
    priceEditForm: any;
    emailEditForm: any;
    saleEditForm: any;

    constructor($rootScope, $compile, $scope, WorkflowService, LeadDataTableService, LeadService, FileService, $routeParams, $sce) {
        super(WorkflowService, $sce, FileService, $scope);
        this.workflowService = WorkflowService;
        this.leadDataTableService = LeadDataTableService;
        this.leadService = LeadService;
        this.fileService = FileService;

        this.scope = $scope;

        this.compile = $compile;
        this.currentWizard = 1;

        let self = this;

        function createdRow(row, data: Process, dataIndex) {
            self.leadService.setRow(data.id, row);
            self.leadDataTableService.configRow(row, data);
            self.compile(angular.element(row).contents())(self.getScopeByKey("actionButtonScope" + data.id));
        }
        function addActionsButtons(data: Process, type, full, meta) {
            return self.leadDataTableService.getActionButtonsHTML(data, self.actionButtonConfig);
        }
        function addStatusStyle(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.leadDataTableService.getStatusStyleHTML(data);
        }
        function addDetailButton(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.leadDataTableService.getDetailHTML(data.id);
        }

        this.dtInstanceCallback = function dtInstanceCallback(dtInstance) {
            self.dtInstance = dtInstance;
            dtInstance.DataTable.on("page.dt", function () {
                if (self.loadAllData) {
                    self.destroyAllScopes();
                }
            });
            dtInstance.DataTable.on("length.dt", function () {
                if (self.loadAllData) {
                    self.destroyAllScopes();
                }
            });

            let searchLink = "";
            let processId = $routeParams.processId;
            if (!isNullOrUndefined(processId) && processId !== "") {
                searchLink = "#id:" + processId + "#";
                self.dtInstance.DataTable.search(searchLink).draw;
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
        };

        this.dtOptions = this.leadDataTableService.getDTOptionsConfiguration(createdRow);
        this.dtColumns = this.leadDataTableService.getDTColumnConfiguration(addDetailButton, addStatusStyle, addActionsButtons);

        let deleteRow = $rootScope.$on("deleteRow", (event, data) => {
            if (self.loadAllData) {
                self.destroyAllScopes();
            }
            self.leadService.removeOrUpdateRow(data, self.loadAllData, self.dtInstance, self.dropCreateScope("compileScope"));
        });

        let updateRow = $rootScope.$on("updateRow", (event, data) => {
            if (self.loadAllData) {
                self.destroyAllScopes();
            }
            self.leadService.updateRow(data, self.dtInstance, self.dropCreateScope("compileScope"));
        });

        let loadDataToModal = $rootScope.$on("loadDataToModal", (event, data: Process) => {
            self.loadDataToModal(data);
        });

        $scope.$on("$destroy", function handler() {
            deleteRow();
            updateRow();
            loadDataToModal();
            self.destroyAllScopes();
        });


    }

    close() {
        this.clearNewLead();
        this.uibModalInstance.close();
    }

    changeDataInput() {
        this.destroyAllScopes();
        this.workflowService.changeDataInput(this.loadAllData, this.dtOptions, allDataLeadRoute, openDataLeadRoute);
    }

    refreshData() {
        let resetPaging = false;
        this.dtInstance.reloadData(resetPaging);
    }

    appendChildRow(process: Process) {

        this.workflowService.appendChildRow(this.getScopeByKey("childRowScope" + process.id, true), process, process.lead, this.dtInstance, this, "lead");
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

        this.editProcess = deepCopy(process);

        this.customerSelected = this.editProcess.lead.customer.id > 0;
        this.selectedCustomer = this.editProcess.lead.customer;
        this.editWorkflowUnit = this.editProcess.lead;
    }


    addComment(id: number, input: Array<string>, process: Process = null) {
        if (isNullOrUndefined(process)) {
            process = this.processes[id];
        }
        this.workflowService.addComment(process, input[id]).then(function () {
            input[id] = "";
        });
    }

    inContact(process: Process) {
        this.leadService.inContact(process, this.dtInstance, this.dropCreateScope("compileScope"));
    }


    async save(edit: boolean) {

        if (edit === true) {
            let process = await this.leadService.saveEditedRow(this.editWorkflowUnit, this.editProcess, this.dtInstance, this.dropCreateScope("compileScope"));
            this.getScopeByKey("childRowScope" + process.id).workflowUnit = process.lead;
            this.getScopeByKey("childRowScope" + process.id).process = process;
            this.getScopeByKey("childRowScope" + process.id).$apply();
        }
        else {
            let process = await this.leadService.saveLead(this.dtInstance, this.editWorkflowUnit, this.editProcess.source);
            this.getScopeByKey("childRowScope" + process.id).workflowUnit = process.lead;
            this.getScopeByKey("childRowScope" + process.id).process = process;
            this.getScopeByKey("childRowScope" + process.id).$apply();
        }
    }

    clearNewLead() {
        // this.editForm.$setPristine();
        this.edit = false;
        this.editWorkflowUnit = new Lead();
        this.editProcess = new Process();
        this.editWorkflowUnit.orderPositions = new Array<OrderPosition>();
        this.currentProductId = "-1";
        this.selectedCustomer = null;
        this.currentProductAmount = 1;
        this.customerSelected = false;
    }

    pin(process: Process, user: User) {
        this.leadService.pin(process, this.dtInstance, this.dropCreateScope("compileScope"), user);
    }

    closeOrOpen(process: Process) {
        this.leadService.closeOrOpenInquiry(process, this.dtInstance, this.dropCreateScope("compileScope"), this.loadAllData);
    }

    deleteRow(process: Process) {
        this.leadService.deleteRow(process, this.dtInstance);
    }

    preventPropagation($event) {
        $event.stopPropagation();
    }

    getOrderPositions(process: Process): Array<OrderPosition> {
        if (!isNullOrUndefined(process.lead)) {
            return process.lead.orderPositions;
        }
    }

    getActionButtonConfig(process: Process): { [key: string]: ActionButtonConfig } {
        return this.leadDataTableService.getActionButtonConfig(process);
    }



}
angular.module(moduleLead, [ngResourceId]).controller(LeadControllerId, LeadController);




