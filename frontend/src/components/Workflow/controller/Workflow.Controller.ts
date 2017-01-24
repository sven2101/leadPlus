/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Offer/controller/Offer.DataTableService.ts" />
/// <reference path="../../Offer/controller/Offer.Service.ts" />

const WorkflowControllerId: string = "WorkflowController";

class WorkflowController {
    workflowService: WorkflowService;

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

    controllerType: Workflow;
    IDatatableService: IDatatableService;
    IWorkflowService: IWorkflowService;

    allDataRoute: string;
    openDataRoute: string;

    $inject = [$rootScopeId, $scopeId, $compileId, $routeParamsId, "$route", $sceId, $uibModalId, WorkflowServiceId, LeadDataTableServiceId, LeadServiceId, OfferDataTableServiceId, OfferServiceId, SaleDataTableServiceId, SaleServiceId];

    constructor($rootScope, $scope, $compile, $routeParams, $route, $sce, $uibModal, WorkflowService, LeadDataTableService, LeadService, OfferDataTableService, OfferService, SaleDataTableService, SaleService) {

        this.controllerType = $route.current.$$route.type;
        switch (this.controllerType) {
            case Workflow.LEAD:
                this.IDatatableService = LeadDataTableService;
                this.IWorkflowService = LeadService;
                this.allDataRoute = allDataLeadRoute;
                this.openDataRoute = openDataLeadRoute;
                break;
            case Workflow.OFFER:
                this.IDatatableService = OfferDataTableService;
                this.IWorkflowService = OfferService;
                this.allDataRoute = allDataOfferRoute;
                this.openDataRoute = openDataOfferRoute;
                break;
            case Workflow.SALE:
                this.IDatatableService = SaleDataTableService;
                this.IWorkflowService = SaleService;
                this.allDataRoute = allDataSaleRoute;
                this.openDataRoute = openDataSaleRoute;
                break;
        };

        this.workflowService = WorkflowService;
        this.sce = $sce;
        this.scope = $scope;
        this.compile = $compile;
        this.uibModal = $uibModal;
        this.rootScope = $rootScope;
        this.compile = $compile;

        let self = this;

        function createdRow(row, data: Process, dataIndex) {
            self.IWorkflowService.setRow(data.id, row);
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
            self.IWorkflowService.removeOrUpdateRow(data, self.loadAllData, self.dtInstance, self.dropCreateScope("compileScope"));
        });

        let updateRow = $rootScope.$on("updateRow", (event, data) => {
            clearWatchers(self.loadAllData);
            self.IWorkflowService.updateRow(data, self.dtInstance, self.dropCreateScope("compileScope"));
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

    getWizardTemplate(controllerTyp: Workflow): string {
        let editable = controllerTyp !== Workflow.SALE;
        let wizardSteps = `
        <customer-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardEditConfig,"${WizardForm.CUSTOMER}")' edit-workflow-unit='transitionCtrl.editProcess["${this.controllerType.toString().toLowerCase()}"]' edit-process='transitionCtrl.editProcess' editable='${editable}'/>
        <product-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardEditConfig,"${WizardForm.PRODUCT}")' edit-workflow-unit='transitionCtrl.editProcess["${this.controllerType.toString().toLowerCase()}"]' edit-process='transitionCtrl.editProcess' editable='${editable}'/>`;

        switch (controllerTyp) {
            case Workflow.LEAD:
                break;
            case Workflow.OFFER:
                wizardSteps += `<email-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardEditConfig,"${WizardForm.EMAIL}")' process='transitionCtrl.editProcess' disabled='false' notification='transitionCtrl.notification'/>`;
                break;
            case Workflow.SALE:
                wizardSteps += `<email-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardEditConfig,"${WizardForm.EMAIL}")' process='transitionCtrl.editProcess' disabled='false' notification='transitionCtrl.notification'/>`;
                wizardSteps += `<sale-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardEditConfig,"${WizardForm.SALE}")' edit-workflow-unit='transitionCtrl.editProcess["${this.controllerType.toString().toLowerCase()}"]' edit-process='transitionCtrl.editProcess' editable='true'/>`;
                break;
        };
        return `<transition edit-process='transitionCtrl.editProcess' edit-workflow-unit='transitionCtrl.editProcess["${this.controllerType.toString().toLowerCase()}"]' modal-instance='transitionCtrl.uibModalInstance' wizard-config='transitionCtrl.wizardEditConfig' current-notification='transitionCtrl.notification'>
            ` + wizardSteps + `</transition>`;
    }

    openEditModal(process: Process) {
        let self = this;
        let wizardTemplate = this.getWizardTemplate(this.controllerType);

        this.uibModal.open({
            template: wizardTemplate,
            controller: ModalTransitionController,
            controllerAs: "transitionCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
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

        let wizardTemplate = this.getWizardTemplate(Workflow.LEAD);
        this.uibModal.open({
            template: wizardTemplate,
            controller: ModalTransitionController,
            controllerAs: "transitionCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
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
        this.IWorkflowService.deleteRow(process, this.dtInstance);
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
        this.workflowService.changeDataInput(this.loadAllData, this.dtOptions, this.allDataRoute, this.openDataRoute);
    }

    appendChildRow(process: Process) {
        this.workflowService.appendChildRow(this.getScopeByKey("childRowScope" + process.id, true), process, process[this.controllerType.toString().toLowerCase()], this.dtInstance, this, this.controllerType.toString().toLowerCase());
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