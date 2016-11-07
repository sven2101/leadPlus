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
/// <reference path="../../FileUpload/controller/File.Service.ts" />

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

    $inject = [$rootScopeId, $compileId, $scopeId, $windowId, WorkflowServiceId, OfferDataTableServiceId, OfferServiceId, TemplateServiceId, FileServiceId, $routeParamsId, $sceId];

    type: string = "offer";

    workflowService: WorkflowService;
    offerDataTableService: OfferDataTableService;
    offerService: OfferService;
    templateService: TemplateService;
    fileService: FileService;

    scope;
    compile;
    window;

    dtOptions;
    dtColumns;
    dtInstance: any = { DataTable: null };
    dtInstanceCallback;

    commentInput: string;
    commentModalInput: string;
    loadAllData: boolean = false;
    processes: { [key: number]: Process } = {};
    editProcess: Process;
    editWorkflowUnit: Offer = new Offer();
    edit: boolean;
    editEmail: boolean = true;
    editable: boolean = true;

    currentOrderPositions: Array<OrderPosition>;
    templates: Array<Template> = [];

    currentProductId = "-1";
    currentProductAmount = 1;

    otherCurrentTab: number = 1;
    currentNotification: Notification;

    customerEditForm: any;
    leadEditForm: any;
    supplyEditForm: any;
    priceEditForm: any;
    emailEditForm: any;
    saleEditForm: any;

    constructor($rootScope, $compile, $scope, $window, WorkflowService, OfferDataTableService, OfferService, TemplateService, FileService, $routeParams, $sce) {
        super(WorkflowService, $sce, FileService, $scope);
        this.workflowService = WorkflowService;
        this.offerDataTableService = OfferDataTableService;
        this.offerService = OfferService;
        this.fileService = FileService;

        this.scope = $scope;
        this.compile = $compile;
        this.window = $window;
        this.templateService = TemplateService;
        this.currentWizard = 1;

        let self = this;
        function createdRow(row, data: Process, dataIndex) {
            self.offerService.setRow(data.id, row);
            self.offerDataTableService.configRow(row, data);
            self.compile(angular.element(row).contents())(self.getScopeByKey("actionButtonScope" + data.id));
        }
        function addActionsButtons(data: Process, type, full, meta) {
            return self.offerDataTableService.getActionButtonsHTML(data, self.actionButtonConfig);
        }
        function addStatusStyle(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.offerDataTableService.getStatusStyleHTML(data);
        }
        function addDetailButton(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.offerDataTableService.getDetailHTML(data.id);
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
        };

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

        this.dtOptions = this.offerDataTableService.getDTOptionsConfiguration(createdRow, searchLink);
        this.dtColumns = this.offerDataTableService.getDTColumnConfiguration(addDetailButton, addStatusStyle, addActionsButtons);
        this.getAllActiveTemplates();

        let deleteRow = $rootScope.$on("deleteRow", (event, data) => {
            if (self.loadAllData) {
                self.destroyAllScopes();
            }
            self.offerService.removeOrUpdateRow(data, self.loadAllData, self.dtInstance, self.dropCreateScope("compileScope"));
        });

        let updateRow = $rootScope.$on("updateRow", (event, data) => {
            if (self.loadAllData) {
                self.destroyAllScopes();
            }
            self.offerService.updateRow(data, self.dtInstance, self.dropCreateScope("compileScope"));
        });

        let loadDataToModal = $rootScope.$on("loadDataToModal", (event, data) => {
            self.loadDataToModal(data);
        });

        $scope.$on("$destroy", function handler() {
            deleteRow();
            updateRow();
            loadDataToModal();
            self.destroyAllScopes();
        });

    }

    refreshData() {
        let resetPaging = false;
        this.dtInstance.reloadData(resetPaging);
    }

    changeDataInput() {
        this.destroyAllScopes();
        this.workflowService.changeDataInput(this.loadAllData, this.dtOptions, allDataOfferRoute, openDataOfferRoute);
    }

    otherTabOnClick(tab: number) {
        this.otherCurrentTab = tab;
    }

    appendChildRow(process: Process) {
        this.workflowService.appendChildRow(this.getScopeByKey("childRowScope" + process.id, true), process, process.offer, this.dtInstance, this, "offer");
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
        this.currentOrderPositions = deepCopy(this.editProcess.offer.orderPositions);
        this.customerSelected = this.editProcess.offer.customer.id > 0;
        this.selectedCustomer = this.editProcess.offer.customer;
        this.editWorkflowUnit = deepCopy(this.editProcess.offer);
    }

    addComment(id: number, input: string) {
        this.workflowService.addComment(this.processes[id], input[id]).then(function () {
            input[id] = "";
        });
    }

    save(edit: boolean) {
        this.offerService.saveEditedRow(this.editWorkflowUnit, this.editProcess, this.currentOrderPositions, this.dtInstance, this.dropCreateScope("compileScope"));
    }

    clearNewOffer() {
        this.edit = false;
        this.editWorkflowUnit = new Offer();
        this.editProcess = new Process();
        this.editWorkflowUnit.orderPositions = new Array<OrderPosition>();
        this.currentOrderPositions = new Array<OrderPosition>();
        this.currentProductId = "-1";
        this.customerSelected = null;
        this.currentProductAmount = 1;
        this.customerSelected = false;
    }

    createNextWorkflowUnit(process: Process) {
        this.workflowService.startSaleTransformation(process);
    }

    closeOrOpen(process: Process) {
        this.offerService.closeOrOpenOffer(process, this.dtInstance, this.dropCreateScope("compileScope"), this.loadAllData);
    }

    deleteRow(process: Process) {
        this.offerService.deleteRow(process, this.dtInstance);
    }

    getOrderPositions(process: Process): Array<OrderPosition> {
        if (!isNullOrUndefined(process.offer)) {
            return process.offer.orderPositions;
        }
    }

    pin(process: Process, user: User) {
        this.offerService.pin(process, this.dtInstance, this.dropCreateScope("compileScope"), user);
    }

    rollBack(process: Process): void {
        this.offerService.rollBack(process, this.dtInstance, this.dropCreateScope("compileScope"));
    }

    getAllActiveTemplates() {
        let self = this;
        this.templateService.getAll().then((result) => self.templates = result, (error) => handleError(error));
    }

    setFormerNotification(notificationId: number) {
        if (Number(notificationId) === -1) {
            this.currentNotification = null;
        }
        let notification: Notification = findElementById(this.editProcess.notifications, Number(notificationId)) as Notification;
        if (!isNullOrUndefined(notification)) {
            this.currentNotification = deepCopy(notification);
        }
    }

    openFollowUpModal(process: Process) {
        this.workflowService.openFollowUpModal(process);
    }

    getActionButtonConfig(process: Process): { [key: string]: ActionButtonConfig } {
        return this.offerDataTableService.getActionButtonConfig(process);
    }
}

angular.module(moduleOffer, [ngResourceId]).controller(OfferControllerId, OfferController);



