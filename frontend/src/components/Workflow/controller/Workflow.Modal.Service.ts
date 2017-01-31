/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Process/model/Activity.enum.ts" />
/// <reference path="../../Process/model/Processor.Model.ts" />
/// <reference path="../../ConfirmationModal/controller/Modal.Confirmation.Controller.ts" />
/// <reference path="../../ConfirmationModal/model/ConfirmationFunctionType.ts" />

const WorkflowModalServiceId: string = "WorkflowModalService";

class WorkflowModalService {

    $inject = [$rootScopeId, $translateId, toasterId, $qId, $uibModalId];

    translate;
    rootScope;
    toaster;
    $q;
    uibModal;

    constructor($rootScope, $translate, toaster, $q, $uibModal) {
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.toaster = toaster;
        this.$q = $q;
        this.uibModal = $uibModal;
    }

    getWizardTemplate(controllerType: WorkflowType): string {
        let editable = controllerType !== WorkflowType.SALE;
        let wizardSteps = `
        <customer-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.CUSTOMER}")' edit-workflow-unit='wizardCtrl.editProcess["${controllerType.toString().toLowerCase()}"]' edit-process='wizardCtrl.editProcess' editable='${editable}' small='false'/>
        <product-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.PRODUCT}")' edit-workflow-unit='wizardCtrl.editProcess["${controllerType.toString().toLowerCase()}"]' edit-process='wizardCtrl.editProcess' editable='${editable}'/>`;

        switch (controllerType) {
            case WorkflowType.LEAD:
                break;
            case WorkflowType.OFFER:
                wizardSteps += `<email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.EMAIL}")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>`;
                break;
            case WorkflowType.SALE:
                wizardSteps += `<email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.EMAIL}")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>`;
                wizardSteps += `<sale-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,"${WizardType.SALE}")' edit-workflow-unit='wizardCtrl.editProcess["${controllerType.toString().toLowerCase()}"]' edit-process='wizardCtrl.editProcess' editable='true'/>`;
                break;
        };
        return `<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess["${controllerType.toString().toLowerCase()}"]' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardEditConfig' current-notification='wizardCtrl.notification' transform='false'>
            ` + wizardSteps + `</wizard>`;
    }


    openNewLeadModal(): Promise<Process> {
        let defer = this.$q.defer();
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
                process: function (): Process {
                    return process;
                },
                workflowType: function (): WorkflowType {
                    return WorkflowType.LEAD;
                }
                ,
                transformation: function (): boolean {
                    return false;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    }

    openEditModal(process: Process, controllerType: WorkflowType) {
        let defer = this.$q.defer();
        let wizardTemplate = this.getWizardTemplate(controllerType);

        this.uibModal.open({
            template: wizardTemplate,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function (): Process {
                    return process;
                },
                workflowType: function (): WorkflowType {
                    return controllerType;
                },
                transformation: function (): boolean {
                    return false;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    }


    getQuickEmailWizardTemplate(workflowType: WorkflowType): string {
        let wizardSteps = `
      <email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardQuickEmailConfig,"${WizardType.EMAIL}")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>`;
        return `<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess["${workflowType.toString().toLowerCase()}"]' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardQuickEmailConfig' current-notification='wizardCtrl.notification' transform='false'>
            ` + wizardSteps + `</wizard>`;
    }

    openQuickEmailModal(process: Process, workflowType: WorkflowType) {
        let defer = this.$q.defer();
        let self = this;
        if (isNullOrUndefined(workflowType)) {
            return;
        }
        let wizardTemplate = this.getQuickEmailWizardTemplate(workflowType);
        this.uibModal.open({
            template: wizardTemplate,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function (): Process {
                    return process;
                },
                workflowType: function (): WorkflowType {
                    return workflowType;
                },
                transformation: function (): boolean {
                    return false;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    }

    getOfferTransformationWizardTemplate(): string {
        let wizardSteps = `
        <customer-product-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardOfferTransitionConfig,"${WizardType.CUSTOMER_PRODUCT}")' edit-workflow-unit='wizardCtrl.editProcess.offer' edit-process='wizardCtrl.editProcess' editable='true'/>`;
        wizardSteps += `<email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardOfferTransitionConfig,"${WizardType.EMAIL}")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>`;
        wizardSteps += `<sale-edit />`;

        return `<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess.offer' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardOfferTransitionConfig' current-notification='wizardCtrl.notification' transform='true'>
            ` + wizardSteps + `</wizard>`;
    }

    openOfferTransformationModal(process: Process): Promise<Process> {
        let defer = this.$q.defer();

        let wizardTemplate = this.getOfferTransformationWizardTemplate();
        this.uibModal.open({
            template: wizardTemplate,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function (): Process {
                    return process;
                },
                workflowType: function (): WorkflowType {
                    return WorkflowType.OFFER;
                }
                ,
                transformation: function (): boolean {
                    return true;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    }

    getSaleTransformationWizardTemplate(): string {
        let wizardSteps = `
        <customer-product-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardSaleTransitionConfig,"${WizardType.CUSTOMER_PRODUCT}")' edit-workflow-unit='wizardCtrl.editProcess.sale' edit-process='wizardCtrl.editProcess' editable='false'/>`;
        wizardSteps += `<email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardSaleTransitionConfig,"${WizardType.EMAIL}")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>`;
        wizardSteps += `<sale-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardSaleTransitionConfig,"${WizardType.SALE}")' edit-workflow-unit='wizardCtrl.editProcess.sale' edit-process='wizardCtrl.editProcess' editable='true'/>`;

        return `<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess.sale' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardSaleTransitionConfig' current-notification='wizardCtrl.notification' transform='true'>
            ` + wizardSteps + `</wizard>`;
    }

    openSaleTransformationModal(process: Process): Promise<Process> {
        let defer = this.$q.defer();
        let wizardTemplate = this.getSaleTransformationWizardTemplate();
        this.uibModal.open({
            template: wizardTemplate,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function (): Process {
                    return process;
                }, workflowType: function (): WorkflowType {
                    return WorkflowType.SALE;
                },
                transformation: function (): boolean {
                    return true;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    }

    openConfirmationModal(process: Process, confirmationFunctionType: ConfirmationFunctionType, submitButtonClass: string = "danger") {
        let defer = this.$q.defer();
        this.uibModal.open({
            template: `<confirmation-modal modal-instance='confirmationCtrl.uibModalInstance' title='confirmationCtrl.title' body='confirmationCtrl.body' submit-text='confirmationCtrl.submitText' submit-function='confirmationCtrl.submitFunction()' submit-button-class='${submitButtonClass}'></confirmation-modal>`,
            controller: ConfirmationModalController,
            controllerAs: "confirmationCtrl",
            backdrop: "static",
            resolve: {
                process: function (): Process {
                    return process;
                },
                functionType: function (): ConfirmationFunctionType {
                    return confirmationFunctionType;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    }
}

angular.module(moduleWorkflowModalService, [ngResourceId]).service(WorkflowModalServiceId, WorkflowModalService);