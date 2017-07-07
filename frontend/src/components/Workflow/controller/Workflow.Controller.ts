/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Lead/controller/Lead.DataTableService.ts" />
/// <reference path="../../Offer/controller/Offer.DataTableService.ts" />
/// <reference path="../../Sale/controller/Sale.DataTableService.ts" />
/// <reference path="../../Workflow/controller/Workflow.Datatable.Row.Service.ts" />

const WorkflowControllerId: string = "WorkflowController";

const broadcastUpdate: string = "updateRow";
const broadcastRemove: string = "removeRow";
const broadcastRemoveOrUpdate: string = "removeOrUpdateRow";
const broadcastOpenEditModal: string = "openEditModal";
const broadcastUpdateChildrow: string = "updateChildrow";
const broadcastClickChildrow: string = "clickChildrow";
const broadcastRefreshDatatable: string = "refreshDatatable";
const broadcastInitProcess: string = "initProcess";


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
    showMyTasks: boolean = false;

    compile: any;
    uibModal: any;
    rootScope: any;
    translate: any;

    commentInput: string;
    commentModalInput: string;

    loadAllData: boolean = false;

    controllerType: WorkflowType;
    IDatatableService: IDatatableService;

    allDataRoute: string;
    openDataRoute: string;

    processResource: any;
    createdRows: { [key: number]: Process } = {};

    $inject = [$rootScopeId, $scopeId, $compileId, $routeParamsId, $routeId, $sceId, $uibModalId, WorkflowServiceId, WorkflowDatatableServiceId, WorkflowDatatableRowServiceId, LeadDataTableServiceId, , OfferDataTableServiceId, SaleDataTableServiceId, $translateId, ProcessResourceId];

    constructor($rootScope, $scope, $compile, $routeParams, $route, $sce, $uibModal, WorkflowService, WorkflowDatatableService, WorkflowDatatableRowService, LeadDataTableService, OfferDataTableService, SaleDataTableService, $translate, ProcessResource) {
        this.workflowDatatableService = WorkflowDatatableService;
        this.processResource = ProcessResource.resource;
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
        this.workflowDatatableRowService = WorkflowDatatableRowService;
        this.sce = $sce;
        this.scope = $scope;
        this.compile = $compile;
        this.uibModal = $uibModal;
        this.rootScope = $rootScope;
        this.compile = $compile;
        this.translate = $translate;
        let self = this;

        function createdRow(row, data: Process, dataIndex) {
            /*let actionbuttonOld = angular.element(row).contents()[6];
            console.log(actionbuttonOld);
            setTimeout(function () {
                console.log(actionbuttonOld.outerHTML);
            }, 300);
               console.log((angular.element(actionbuttonOld)));
            */


            self.workflowDatatableRowService.setRow(data.id, self.controllerType, row);
            self.IDatatableService.configRow(row, data);
            self.compile(angular.element(row).contents())(self.getScopeByKey("actionButtonScope" + data.id));
            //self.compile(angular.element(row).contents()[6])(self.getScopeByKey("actionButtonScope" + data.id));

            /* let childScope = self.scopes["actionButtonScope" + data.id];
             if (isNullOrUndefined(childScope) || childScope.$$destroyed) {
                 self.compile(angular.element(row).contents()[6])(self.getScopeByKey("actionButtonScope" + data.id));
             } else {
                 setTimeout(function () {
                     angular.element(angular.element(row).contents()[6]).html(actionbuttonOld.outerHTML);
                 }, 300);
             }
             */
        }
        function addActionsButtons(data: Process, type, full, meta) {
            return self.IDatatableService.getActionButtonsHTML(data, self.actionButtonConfig);
        }
        function addStatusStyle(data: Process, type, full, meta) {
            self.processes[data.id] = data;
            return self.IDatatableService.getStatusStyleHTML(data);
        }
        function addDetailButton(data: Process, type, full, meta) {
            // self.processes[data.id] = data;
            // return self.IDatatableService.getDetailHTML(data.id);
        }

        this.dtOptions = this.IDatatableService.getDTOptionsConfiguration(createdRow, "");
        this.dtColumns = this.IDatatableService.getDTColumnConfiguration(addDetailButton, addStatusStyle, addActionsButtons);

        let clearWatchers = function (doClear: boolean) {
            if (doClear) {
                self.destroyAllScopes();
            }
        };
        let searchLink = "";
        let processId = $routeParams.processId;
        if (!isNullOrUndefined(processId) && processId !== "") {
            searchLink = "#id:" + processId + "#";
        }

        this.dtInstanceCallback = function dtInstanceCallback(dtInstance) {
            self.dtInstance = dtInstance;
            if (!isNullOrUndefined(processId) && processId !== "" && searchLink !== "") {
                self.dtInstance.DataTable.search(searchLink);
                self.refreshData();
                let intervall = setInterval(function () {
                    if (!isNullOrUndefined(angular.element("#id_" + processId)) && !isNullOrUndefined(self.processes[processId])) {
                        self.appendChildRow(processId);
                        clearInterval(intervall);
                    }
                }, 100);

                setTimeout(function () {
                    clearInterval(intervall);
                }, 10000);
                searchLink = "";
            }
        };

        let deleteRow = $rootScope.$on(broadcastRemove, (event, data) => {
            clearWatchers(self.loadAllData);
            self.workflowDatatableRowService.deleteRow(data, self.dtInstance, self.controllerType);
        });

        let updateOrRemove = $rootScope.$on(broadcastRemoveOrUpdate, (event, data) => {
            clearWatchers(self.loadAllData);
            this.processes[data.id] = data;
            self.workflowDatatableRowService.removeOrUpdateRow(data, self.loadAllData, self.dtInstance, self.controllerType, self.dropCreateScope("compileScope" + data.id));
        });


        let updateRow = $rootScope.$on(broadcastUpdate, (event, data: Process) => {
            clearWatchers(self.loadAllData);
            this.processes[data.id] = data;
            self.workflowDatatableRowService.updateRow(data, self.dtInstance, self.controllerType, self.dropCreateScope("compileScope" + data.id));
        });

        let updateChildRow = $rootScope.$on(broadcastUpdateChildrow, (event, data) => {
            this.updateChildRow(data);
        });

        let clickChildRow = $rootScope.$on(broadcastClickChildrow, (event, data: Process) => {
            if (!isNullOrUndefined(data) && !isNullOrUndefined(data.id)) {
                this.appendChildRow(data.id);
            }
        });

        let openEditModal = $rootScope.$on(broadcastOpenEditModal, (event, data: Process) => {
            self.openEditModal(data);
        });

        let refreshDatatable = $rootScope.$on(broadcastRefreshDatatable, (event) => {
            self.refreshData();
        });

        $scope.$on("$destroy", function handler() {
            self.workflowDatatableRowService.resetWorkflowProcessMap();
            self.workflowDatatableService.showMyTasksUserId[self.controllerType.toString()] = 0;
            deleteRow();
            updateOrRemove();
            updateRow();
            openEditModal();
            refreshDatatable();
            clickChildRow();
            updateChildRow();
            self.destroyAllScopes();
        });
        this.registerIntervall();
    }

    async setDtOptions() {

    }

    getShowMyTasksInfo(type: string): string {
        return this.translate.instant("SHOW_MY_OPEN_" + type + "_INFO");
    }

    filterMyTasks() {
        if (this.loadAllData === true) {
            return;
        }
        let table = this.dtInstance.DataTable;
        if (this.showMyTasks === true) {
            this.workflowDatatableService.showMyTasksUserId[this.controllerType.toString()] = this.rootScope.user.id;
            this.refreshData();
        } else {
            this.workflowDatatableService.showMyTasksUserId[this.controllerType.toString()] = 0;
            this.dtInstance.reloadData(false);
            this.refreshData();
        }
    }

    registerIntervall() {
        let self = this;
        let intervall = setInterval(function () {
            self.refreshData();
        }, 3 * 60 * 1000);
        self.scope.$on("$destroy", function () {
            clearInterval(intervall);
        });
    }

    refreshData() {
        let resetPaging = false;
        this.dtInstance.reloadData(resetPaging);
        this.rootScope.loadLabels();
        this.rootScope.$broadcast(broadcastOnTodosChanged);
    }

    getStatusByWorkflowType(): string {
        switch (this.controllerType) {
            case WorkflowType.LEAD:
                return "OPEN";
            case WorkflowType.OFFER:
                return "OFFER";
            case WorkflowType.SALE:
                return "SALE";
        };
    }

    async openEditModal(process: Process) {
        let resultProcess: Process = await this.workflowService.openEditModal(process, this.controllerType);
        this.updateChildRow(resultProcess);
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
        if (this.loadAllData === false) {
            this.workflowDatatableService.showMyTasksUserId[this.controllerType.toString()] = 0;
        } else if (this.loadAllData === true) {
            this.showMyTasks = false;
        }
        this.workflowDatatableService.changeDataInput(this.loadAllData, this.dtOptions, this.allDataRoute, this.openDataRoute);
        this.rootScope.loadLabels();
    }

    appendChildRow(id: number) {
        if (isNullOrUndefined(id) || isNullOrUndefined(this.processes[id])) {
            return;
        }
        let process = this.processes[id];
        this.workflowDatatableService.appendChildRow(this.getScopeByKey("childRowScope" + process.id, true), process, process[this.controllerType.toString().toLowerCase()], this.dtInstance, this, this.controllerType.toString().toLowerCase());
    }

    getAsHtml(html: string) {
        return this.sce.trustAsHtml(html);
    }

    getNameOfUser(user: User): string {
        return getNameOfUser(user);
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