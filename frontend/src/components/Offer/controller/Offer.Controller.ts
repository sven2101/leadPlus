/*
/// <reference path="../../../typeDefinitions/moment.d.ts" />
/// <reference path="../../../typeDefinitions/moment-node.d.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../Process/model/Process.Model.ts" />
/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../Offer/controller/Offer.DataTableService.ts" />
/// <reference path="../../Offer/controller/Offer.Service.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../common/service/AbstractWorkflow.ts" />
/// <reference path="../../FileUpload/controller/File.Service.ts" />
/*
const OfferControllerId: string = "OfferController";

class OfferController {

    $inject = [$rootScopeId, $compileId, $scopeId, WorkflowServiceId, OfferDataTableServiceId, OfferServiceId, $routeParamsId, $sceId, $uibModalId];

    workflowService: WorkflowService;
    offerDataTableService: OfferDataTableService;
    offerService: OfferService;

    scope;
    compile;
    uibModal;

    dtOptions;
    dtColumns;
    dtInstance: any = { DataTable: null };
    dtInstanceCallback;

    commentInput: string;
    commentModalInput: string;
    loadAllData: boolean = false;
    processes: { [key: number]: Process } = {};

    constructor($rootScope, $compile, $scope, $window, WorkflowService, OfferDataTableService, OfferService, $routeParams, $sce, $uibModal) {
        this.workflowService = WorkflowService;
        this.offerDataTableService = OfferDataTableService;
        this.offerService = OfferService;

        this.scope = $scope;
        this.compile = $compile;
        this.uibModal = $uibModal;

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

        this.dtOptions = this.offerDataTableService.getDTOptionsConfiguration(createdRow);
        this.dtColumns = this.offerDataTableService.getDTColumnConfiguration(addDetailButton, addStatusStyle, addActionsButtons);

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

        let openEditModal = $rootScope.$on("openEditModal", (event, data) => {
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

    changeDataInput() {
        this.destroyAllScopes();
        this.workflowService.changeDataInput(this.loadAllData, this.dtOptions, allDataOfferRoute, openDataOfferRoute);
    }

    appendChildRow(process: Process) {
        this.workflowService.appendChildRow(this.getScopeByKey("childRowScope" + process.id, true), process, process.offer, this.dtInstance, this, "offer");
    }

    openEditModal(process: Process) {
        let self = this;
        this.uibModal.open({
            template: `<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess.offer' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardEditConfig' current-notification='wizardCtrl.notification'>
            <customer-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.CUSTOMER}")' edit-workflow-unit='wizardCtrl.editProcess.offer' edit-process='wizardCtrl.editProcess' editable='true'/>
            <product-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.PRODUCT}")' edit-workflow-unit='wizardCtrl.editProcess.offer' edit-process='wizardCtrl.editProcess' editable='true'/>
            <email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.EMAIL}")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>
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
                self.getScopeByKey("childRowScope" + result.id).workflowUnit = result.offer;
                self.getScopeByKey("childRowScope" + result.id).process = result;
            }
        });
    }

    // TODO In Directive überführen
    addComment(id: number, input: Array<string>, process: Process = null) {
        if (isNullOrUndefined(process)) {
            process = this.processes[id];
        }
        this.workflowService.addComment(process, input[id]).then(function () {
            input[id] = "";
        });
    }

    // TODO In Directive überführen
    deleteRow(process: Process) {
        this.offerService.deleteRow(process, this.dtInstance);
    }

    // TODO In Directive überführen
    getOrderPositions(process: Process): Array<OrderPosition> {
        if (!isNullOrUndefined(process.offer)) {
            return process.offer.orderPositions;
        }
    }

    // TODO In Directive überführen
    rollBack(process: Process): void {
        this.offerService.rollBack(process, this.dtInstance, this.dropCreateScope("compileScope"));
    }
}

angular.module(moduleOffer, [ngResourceId]).controller(OfferControllerId, OfferController);
*/


