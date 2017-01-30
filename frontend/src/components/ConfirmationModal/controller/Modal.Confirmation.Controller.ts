/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Process/model/Process.Model.ts" />
const ConfirmationModalControllerId: string = "ConfirmationModalController";

class ConfirmationModalController {

    $inject = ["process", "functionType", $uibModalId, WorkflowServiceId];

    uibModalInstance;
    rootScope;
    workflowService: WorkflowService;
    editProcess: Process;

    title: string;
    body: string;
    submitText: string;
    submitFunction: any;


    constructor(process: Process, functionType: ConfirmationFunctionType, $uibModalInstance, WorkflowService) {
        this.uibModalInstance = $uibModalInstance;
        console.log(this.uibModalInstance);
        this.editProcess = deepCopy(process);
        this.workflowService = WorkflowService;
        this.switchFunctionByType(functionType, this.editProcess);
    }

    switchFunctionByType(functionType: ConfirmationFunctionType, process: Process) {
        console.log(process);
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
        console.log("setUpRollbackOffer");
        this.title = "Angebot zurücksetzen";
        this.body = "Möchten Sie das Angebot wirklich zurücksetzen?";
        this.submitText = "Angebot zurücksetzen";
        this.submitFunction = this.rollbackOffer;

    }

    setUpRollbackSale() {
        console.log("setUpRollbackSale");
        this.title = "Verkauf zurücksetzen";
        this.body = "Möchten Sie den Verkauf wirklich zurücksetzen?";
        this.submitText = "Verkauf zurücksetzen";
        this.submitFunction = this.rollbackSale;

    }

    async rollbackOffer() {
        console.log("Rollback Offer!");
        let resultProcess = await this.workflowService.rollBackOffer(this.editProcess) as Process;
        console.log(resultProcess);
        this.uibModalInstance.close(resultProcess);
    }

    async rollbackSale() {
        console.log("Rollback Sale!");
        let resultProcess = await this.workflowService.rollBackSale(this.editProcess) as Process;
        console.log(resultProcess);
        this.uibModalInstance.close(resultProcess);
    }

    setUpDeleteProcess() {
        console.log("setUpDeleteProcess");
        this.title = "Prozess löschen";
        this.body = "Möchten Sie den Prozess wirklich löschen?";
        this.submitText = "Prozess löschen";
        this.submitFunction = this.deleteProcess;

    }

    async deleteProcess() {
        console.log("Delete Process!");
        let resultProcess = await this.workflowService.deleteProcess(this.editProcess) as Process;
        console.log(resultProcess);
        this.uibModalInstance.close(resultProcess);
    }




}

angular.module(moduleConfirmation, [moduleSummernote]).controller(ConfirmationModalControllerId, ConfirmationModalController);
