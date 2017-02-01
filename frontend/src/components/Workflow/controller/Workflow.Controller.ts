/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Lead/controller/Lead.DataTableService.ts" />
/// <reference path="../../Offer/controller/Offer.DataTableService.ts" />
/// <reference path="../../Sale/controller/Sale.DataTableService.ts" />
/// <reference path="../../Workflow/controller/Workflow.Datatable.Row.Service.ts" />

const WorkflowControllerId: string = "WorkflowController";

const broadcastUpdate: string = "updateRow";
const broadcastRemoveOrUpdate: string = "removeOrUpdateRow";
const broadcastRemove: string = "removeRow";
const broadcastOpenEditModal: string = "openEditModal";
const broadcastUpdateChildrow: string = "updateChildrow";


class WorkflowController {
    workflowService: WorkflowService;
    workflowDatatableService: WorkflowDatatableService;
    workflowDatatableRowService: WorkflowDatatableRowService;

    sce;
    actionButtonConfig: { [key: number]: any } = {};
    scopes: { [key: string]: any } = {};
    scope;
    processes: { [key: number]: Process } = {};

    dtOptions;
    dtColumns;
    dtInstance: any = { DataTable: null };
    dtInstanceCallback: any;

    compile: any;
    uibModal: any;
    rootScope: any;

    commentInput: string;
    commentModalInput: string;

    loadAllData: boolean = false;

    controllerType: WorkflowType;
    IDatatableService: IDatatableService;

    allDataRoute: string;
    openDataRoute: string;

    $inject = [$rootScopeId, $scopeId, $compileId, $routeParamsId, $routeId, $sceId, $uibModalId, WorkflowServiceId, WorkflowDatatableServiceId, WorkflowDatatableRowServiceId, LeadDataTableServiceId, , OfferDataTableServiceId, SaleDataTableServiceId];

    constructor($rootScope, $scope, $compile, $routeParams, $route, $sce, $uibModal, WorkflowService, WorkflowDatatableService, WorkflowDatatableRowService, LeadDataTableService, OfferDataTableService, SaleDataTableService) {

        this.controllerType = $route.current.$$route.type;
        switch (this.controllerType) {
            case WorkflowType.LEAD:
                this.IDatatableService = LeadDataTableService;
                this.allDataRoute = allDataLeadRoute;
                this.openDataRoute = openDataLeadRoute;
                break;
            case WorkflowType.OFFER:
                this.IDatatableService = OfferDataTableService;
                this.allDataRoute = allDataOfferRoute;
                this.openDataRoute = openDataOfferRoute;
                break;
            case WorkflowType.SALE:
                this.IDatatableService = SaleDataTableService;
                this.allDataRoute = allDataSaleRoute;
                this.openDataRoute = openDataSaleRoute;
                break;
        };

        this.workflowService = WorkflowService;
        this.workflowDatatableService = WorkflowDatatableService;
        this.workflowDatatableRowService = WorkflowDatatableRowService;
        this.sce = $sce;
        this.scope = $scope;
        this.compile = $compile;
        this.uibModal = $uibModal;
        this.rootScope = $rootScope;
        this.compile = $compile;

        let self = this;

        function createdRow(row, data: Process, dataIndex) {
            self.workflowDatatableRowService.setRow(data.id, self.controllerType, row);
            self.IDatatableService.configRow(row, data);
            self.compile(angular.element(row).contents())(self.getScopeByKey("actionButtonScope" + data.id));
        }
        function addActionsButtons(data: Process, type, full, meta) {
            return self.IDatatableService.getActionButtonsHTML(data, self.actionButtonConfig);
        }
        function addStatusStyle(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.IDatatableService.getStatusStyleHTML(data);
        }
        function addDetailButton(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.IDatatableService.getDetailHTML(data.id);
        }

        this.dtOptions = this.IDatatableService.getDTOptionsConfiguration(createdRow, "");
        this.dtColumns = this.IDatatableService.getDTColumnConfiguration(addDetailButton, addStatusStyle, addActionsButtons);

        let clearWatchers = function (doClear: boolean) {
            if (doClear) {
                self.destroyAllScopes();
            }
        };

        this.dtInstanceCallback = function dtInstanceCallback(dtInstance) {
            self.dtInstance = dtInstance;
            dtInstance.DataTable.on("page.dt length.dt search.dt", function () {
                clearWatchers(self.loadAllData);
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

        let deleteRow = $rootScope.$on(broadcastRemove, (event, data) => {
            clearWatchers(self.loadAllData);
            self.workflowDatatableRowService.deleteRow(data, self.dtInstance, self.controllerType);
        });

        let updateOrRemove = $rootScope.$on(broadcastRemoveOrUpdate, (event, data) => {
            clearWatchers(self.loadAllData);
            self.workflowDatatableRowService.removeOrUpdateRow(data, self.loadAllData, self.dtInstance, self.controllerType, self.dropCreateScope("compileScope" + data.id));
        });

        let updateRow = $rootScope.$on(broadcastUpdate, (event, data) => {
            clearWatchers(self.loadAllData);
            self.workflowDatatableRowService.updateRow(data, self.dtInstance, self.controllerType, self.dropCreateScope("compileScope" + data.id));
        });

        let updateChildRow = $rootScope.$on(broadcastUpdateChildrow, (event, data) => {
            this.updateChildRow(data);
        });

        let openEditModal = $rootScope.$on(broadcastOpenEditModal, (event, data: Process) => {
            self.openEditModal(data);
        });

        $scope.$on("$destroy", function handler() {
            deleteRow();
            updateOrRemove();
            updateRow();
            openEditModal();
            self.destroyAllScopes();
        });
        this.registerIntervall();
    }

    registerIntervall() {
        let self = this;
        let intervall = setInterval(function () {
            self.refreshData();
        }, 10 * 60 * 1000);
        self.scope.$on("$destroy", function () {
            clearInterval(intervall);
        });
    }

    refreshData() {
        let resetPaging = false;
        this.dtInstance.reloadData(resetPaging);
    }

    async openEditModal(process: Process) {
        let resultProcess: Process = await this.workflowService.openEditModal(process, this.controllerType);
        this.updateChildRow(process);
    }

    updateChildRow(resultProcess: Process) {
        if (!isNullOrUndefined(resultProcess)) {
            this.getScopeByKey("childRowScope" + resultProcess.id).workflowUnit = resultProcess[this.controllerType.toString().toLowerCase()];
            this.getScopeByKey("childRowScope" + resultProcess.id).process = resultProcess;
        }
    }

    async openNewLeadModal() {
        let resultProcess: Process = await this.workflowService.openNewLeadModal();
        if (!isNullOrUndefined(resultProcess)) {
            this.rootScope.leadsCount += 1;
            this.dtInstance.DataTable.row.add(resultProcess).draw();
        }
    }

    deleteRow(process: Process) {
        this.workflowDatatableRowService.deleteRow(process, this.dtInstance, this.controllerType);
    }

    getOrderPositions(process: Process): Array<OrderPosition> {
        if (!isNullOrUndefined(process[this.controllerType.toString().toLowerCase()])) {
            return process[this.controllerType.toString().toLowerCase()].orderPositions;
        }
    }

    getActionButtonConfig(process: Process): { [key: string]: ActionButtonConfig } {
        return this.IDatatableService.getActionButtonConfig(process);
    }

    changeDataInput() {
        this.destroyAllScopes();
        this.workflowDatatableService.changeDataInput(this.loadAllData, this.dtOptions, this.allDataRoute, this.openDataRoute);
    }

    appendChildRow(process: Process) {
        this.workflowDatatableService.appendChildRow(this.getScopeByKey("childRowScope" + process.id, true), process, process[this.controllerType.toString().toLowerCase()], this.dtInstance, this, this.controllerType.toString().toLowerCase());
    }

    getAsHtml(html: string) {
        return this.sce.trustAsHtml(html);
    }

    addComment(id: number, input: Array<string>, process: Process = null) {
        if (isNullOrUndefined(process)) {
            process = this.processes[id];
        }
        this.workflowService.addComment(process, input[id]).then(function () {
            input[id] = "";
        });
    }

    destroyAllScopes(): void {
        for (let key in this.scopes) {
            if (this.scopes.hasOwnProperty(key)) {
                this.scopes[key].$destroy();
            }
        }
        this.scopes = {};
    }

    getScopeByKey(key: string, isolated: boolean = false): any {
        let childScope = this.scopes[key];
        if (isNullOrUndefined(childScope) || childScope.$$destroyed) {
            childScope = this.scope.$new(isolated);
            this.scopes[key] = childScope;
        }
        return childScope;
    }

    dropCreateScope(key: string, isolated: boolean = false): any {
        let childScope = this.scopes[key];
        if (isNullOrUndefined(childScope) || childScope.$$destroyed) {
            childScope = this.scope.$new(isolated);
            this.scopes[key] = childScope;
        } else {
            this.scopes[key].$destroy();
            childScope = this.scope.$new(isolated);
            this.scopes[key] = childScope;
        }
        return childScope;
    }
}
angular.module(moduleWorkflow, [ngResourceId]).controller(WorkflowControllerId, WorkflowController);