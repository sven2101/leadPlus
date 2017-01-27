/*/// <reference path="../../../typeDefinitions/moment.d.ts" />
/// <reference path="../../../typeDefinitions/moment-node.d.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../Process/model/Process.Model.ts" />
/// <reference path="../../Lead/model/Lead.Model.ts" />
/// <reference path="../../Modal/controller/Modal.Transition.Controller.ts" />
/// <reference path="../../Modal/model/Wizard.Form.Enum.Model.ts" />
/// <reference path="../../Lead/controller/Lead.DataTableService.ts" />
/// <reference path="../../Lead/controller/Lead.Service.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../common/service/AbstractWorkflow.ts" />
/*
const LeadControllerId: string = "LeadController";

class LeadController extends AbstractWorkflow {

    $inject = [$rootScopeId, $compileId, $scopeId, WorkflowServiceId, LeadDataTableServiceId, LeadServiceId, $routeParamsId, $sceId, $uibModalId, "$route"];

    leadDataTableService: LeadDataTableService;
    leadService: IWorkflowService;

    constructor($rootScope, $compile, $scope, WorkflowService, LeadDataTableService, LeadService, $routeParams, $sce, $uibModal, $route) {
        super(WorkflowService, $sce, $scope, $rootScope, $compile, $routeParams, $uibModal, $route, LeadDataTableService, LeadService);
        let paramValue = $route.current.$$route.type;
        console.log(paramValue);
        this.leadDataTableService = LeadDataTableService;
        this.leadService = LeadService;

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

    changeDataInput() {
        this.destroyAllScopes();
        this.workflowService.changeDataInput(this.loadAllData, this.dtOptions, allDataLeadRoute, openDataLeadRoute);
    }


    openEditModal(process: Process) {
        let self = this;
        this.uibModal.open({
            template: `<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess.lead' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardEditConfig'>
            <customer-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.CUSTOMER}")' edit-workflow-unit='wizardCtrl.editProcess.lead' edit-process='wizardCtrl.editProcess' editable='true'/>
            <product-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.PRODUCT}")' edit-workflow-unit='wizardCtrl.editProcess.lead' edit-process='wizardCtrl.editProcess' editable='true'/>
            </wizard>`,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
                }
            }
        }).result.then(function (result: Process) {
            if (!isNullOrUndefined(result)) {
                self.getScopeByKey("childRowScope" + result.id).workflowUnit = result.lead;
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

        console.log(process);
        this.uibModal.open({
            template: `<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess.lead' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardEditConfig'>
            <customer-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.CUSTOMER}")' edit-workflow-unit='wizardCtrl.editProcess.lead' edit-process='wizardCtrl.editProcess' editable='true'/>
            <product-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.PRODUCT}")' edit-workflow-unit='wizardCtrl.editProcess.lead' edit-process='wizardCtrl.editProcess' editable='true'/>
            </wizard>`,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
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
        this.leadService.deleteRow(process, this.dtInstance);
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
*/


