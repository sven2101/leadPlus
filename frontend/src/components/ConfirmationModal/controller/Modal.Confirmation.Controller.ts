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


    constructor(process: Process, functionType: ActionButtonType, $uibModalInstance, WorkflowService) {
        this.uibModalInstance = $uibModalInstance;
        console.log(this.uibModalInstance);
        this.editProcess = deepCopy(process);
        this.workflowService = WorkflowService;
        this.switchFunctionByType(functionType);
    }

    switchFunctionByType(functionType: ActionButtonType) {
        switch (functionType) {
            case ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL:
                this.setUpRollbackOffer();
                break;
            case ActionButtonType.DETAILS_OPEN_DELETE_MODAL:

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

    async rollbackOffer() {
        console.log("Rollback!");
        let resultProcess = await this.workflowService.rollBackOffer(this.editProcess) as Process;
        console.log(resultProcess);
        this.uibModalInstance.close(resultProcess);
    }



}

angular.module(moduleConfirmation, [moduleSummernote]).controller(ConfirmationModalControllerId, ConfirmationModalController);
