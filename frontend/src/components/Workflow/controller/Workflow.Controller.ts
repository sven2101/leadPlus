/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Lead/controller/Lead.DataTableService.ts" />
/// <reference path="../../Offer/controller/Offer.DataTableService.ts" />
/// <reference path="../../Offer/controller/Offer.Service.ts" />
/// <reference path="../../Sale/controller/Sale.DataTableService.ts" />
/// <reference path="../../Sale/controller/Sale.Service.ts" />

const WorkflowControllerId: string = "WorkflowController";

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

    $inject = [$rootScopeId, $scopeId, $compileId, $routeParamsId, "$route", $sceId, $uibModalId, WorkflowServiceId, WorkflowDatatableServiceId, WorkflowDatatableRowServiceId, LeadDataTableServiceId, , OfferDataTableServiceId, SaleDataTableServiceId];

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

        let deleteRow = $rootScope.$on("deleteRow", (event, data) => {
            clearWatchers(self.loadAllData);
            self.workflowDatatableRowService.removeOrUpdateRow(data, self.loadAllData, self.dtInstance, self.controllerType, self.dropCreateScope("compileScope"));
        });

        let updateRow = $rootScope.$on("updateRow", (event, data) => {
            clearWatchers(self.loadAllData);
            self.workflowDatatableRowService.updateRow(data, self.dtInstance, self.controllerType, self.dropCreateScope("compileScope"));
        });

        let openEditModal = $rootScope.$on("openEditModal", (event, data: Process) => {
            self.openEditModal(data);
        });

        $scope.$on("$destroy", function handler() {
            deleteRow();
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

    getWizardTemplate(controllerTyp: WorkflowType): string {
        let editable = controllerTyp !== WorkflowType.SALE;
        let wizardSteps = `
        <customer-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.CUSTOMER}")' edit-workflow-unit='wizardCtrl.editProcess["${this.controllerType.toString().toLowerCase()}"]' edit-process='wizardCtrl.editProcess' editable='${editable}' small='false'/>
        <product-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.PRODUCT}")' edit-workflow-unit='wizardCtrl.editProcess["${this.controllerType.toString().toLowerCase()}"]' edit-process='wizardCtrl.editProcess' editable='${editable}'/>`;

        switch (controllerTyp) {
            case WorkflowType.LEAD:
                break;
            case WorkflowType.OFFER:
                wizardSteps += `<email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.EMAIL}")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>`;
                break;
            case WorkflowType.SALE:
                wizardSteps += `<email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.EMAIL}")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>`;
                wizardSteps += `<sale-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.SALE}")' edit-workflow-unit='wizardCtrl.editProcess["${this.controllerType.toString().toLowerCase()}"]' edit-process='wizardCtrl.editProcess' editable='true'/>`;
                break;
        };
        return `<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess["${this.controllerType.toString().toLowerCase()}"]' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardEditConfig' current-notification='wizardCtrl.notification' transform='false'>
            ` + wizardSteps + `</wizard>`;
    }

    openEditModal(process: Process) {
        let self = this;
        let wizardTemplate = this.getWizardTemplate(this.controllerType);

        this.uibModal.open({
            template: wizardTemplate,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
                },
                transformation: function () {
                    return null;
                }
            }
        }).result.then(function (result: Process) {
            if (!isNullOrUndefined(result)) {
                self.getScopeByKey("childRowScope" + result.id).workflowUnit = result[self.controllerType.toString().toLowerCase()];
                self.getScopeByKey("childRowScope" + result.id).process = result;
            }
        });
    }

    openNewLeadModal() {
        let self = this;
        let process = new Process();

        process.status = Status.OPEN;
        process.formerProcessors = [new Processor(self.rootScope.user, Activity.OPEN)];
        process.lead = new Lead();
        process.lead.orderPositions = new Array<OrderPosition>();
        process.lead.timestamp = newTimestamp();
        process.lead.customer = new Customer();

        let wizardTemplate = this.getWizardTemplate(WorkflowType.LEAD);
        this.uibModal.open({
            template: wizardTemplate,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
                },
                transformation: function () {
                    return null;
                }
            }
        }).result.then(function (result: Process) {
            if (!isNullOrUndefined(result)) {
                self.rootScope.leadsCount += 1;
                self.dtInstance.DataTable.row.add(result).draw();
            }
        });
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