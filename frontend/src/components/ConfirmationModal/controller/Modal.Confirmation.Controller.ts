/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Process/model/Process.Model.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../ConfirmationModal/model/ConfirmationFunctionType.ts" />
const ConfirmationModalControllerId: string = "ConfirmationModalController";

class ConfirmationModalController {

    $inject = ["process", "functionType", $uibModalId, WorkflowServiceId, $translateId];

    uibModalInstance;
    rootScope;
    translate;
    workflowService: WorkflowService;
    editProcess: Process;

    title: string;
    body: string;
    submitText: string;
    submitFunction: any;


    constructor(process: Process, functionType: ConfirmationFunctionType, $uibModalInstance, WorkflowService, $translate) {
        this.uibModalInstance = $uibModalInstance;
        this.translate = $translate;
        this.editProcess = deepCopy(process);
        this.workflowService = WorkflowService;
        this.switchFunctionByType(functionType, this.editProcess);
    }

    switchFunctionByType(functionType: ConfirmationFunctionType, process: Process) {
        switch (functionType) {
            case ConfirmationFunctionType.ROLLBACK:
                if (this.workflowService.isOffer(process)) {
                    this.setUpRollbackOffer();
                } else if (this.workflowService.isSale(process)) {
                    this.setUpRollbackSale();
                }
                break;
            case ConfirmationFunctionType.DELETE:
                this.setUpDeleteProcess();
                break;
        };

    }

    setUpRollbackOffer() {
        this.title = this.translate.instant("OFFER_ROLLBACK_TITLE");
        this.body = this.translate.instant("OFFER_ROLLBACK_BODY");
        this.submitText = this.translate.instant("OFFER_ROLLBACK_TITLE");
        this.submitFunction = this.rollbackOffer;
    }

    setUpRollbackSale() {
        this.title = this.translate.instant("SALE_ROLLBACK_TITLE");
        this.body = this.translate.instant("SALE_ROLLBACK_BODY");
        this.submitText = this.translate.instant("SALE_ROLLBACK_TITLE");
        this.submitFunction = this.rollbackSale;

    }

    async rollbackOffer() {
        let resultProcess = await this.workflowService.rollBackOffer(this.editProcess) as Process;
        this.uibModalInstance.close(resultProcess);
    }

    async rollbackSale() {
        let resultProcess = await this.workflowService.rollBackSale(this.editProcess) as Process;
        this.uibModalInstance.close(resultProcess);
    }

    setUpDeleteProcess() {
        this.title = this.translate.instant("PROCESS_DELETE_PROCESS_TITLE");
        this.body = this.translate.instant("PROCESS_DELETE_PROCESS_BODY");
        this.submitText = this.translate.instant("PROCESS_DELETE_PROCESS_TITLE");
        this.submitFunction = this.deleteProcess;
    }

    async deleteProcess() {
        let resultProcess = await this.workflowService.deleteProcess(this.editProcess) as Process;
        this.uibModalInstance.close(resultProcess);
    }
}
angular.module(moduleConfirmation, [moduleSummernote]).controller(ConfirmationModalControllerId, ConfirmationModalController);
