/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/model/Process.Model.ts" />
const ModalTransitionControllerId: string = "ModalTransitionController";

class ModalTransitionController {

    $inject = ["process", "$uibModalInstance"];

    type: string;
    uibModalInstance;
    editProcess: Process;
    wizardEditConfig: Array<WizardButtonConfig>;
    wizardTransitionConfig: Array<WizardButtonConfig>;

    customerEditForm: any;
    productEditForm: any;
    supplyEditForm: any;
    emailEditForm: any;
    saleEditForm: any;


    constructor(process: Process, type, $uibModalInstance) {
        this.uibModalInstance = $uibModalInstance;
        this.editProcess = deepCopy(process);
        this.wizardEditConfig = this.getWizardEditConfig();
        this.wizardTransitionConfig = this.getWizardTransitionConfig();
    }

    getWizardEditConfig(): Array<WizardButtonConfig> {
        let wizardConfig: Array<WizardButtonConfig> = new Array<WizardButtonConfig>();

        let customerEditStep = new WizardButtonConfig(WizardForm.CUSTOMER);
        customerEditStep.setTitle("Kunde").setIcon("fa fa-user").setForm(this.customerEditForm).setPosition(1);
        wizardConfig.push(customerEditStep);

        let productEditStep = new WizardButtonConfig(WizardForm.PRODUCT);
        productEditStep.setTitle("Produkt").setIcon("fa fa-table").setForm(this.productEditForm).setPosition(2);
        wizardConfig.push(productEditStep);

        let supplyEditStep = new WizardButtonConfig(WizardForm.SUPPLY);
        supplyEditStep.setTitle("Lieferung").setIcon("fa fa-truck").setForm(this.supplyEditForm).setPosition(3).disable();
        wizardConfig.push(supplyEditStep);

        return wizardConfig;
    }

    getWizardTransitionConfig(): Array<WizardButtonConfig> {
        let wizardConfig: Array<WizardButtonConfig> = new Array<WizardButtonConfig>();

        let customerEditStep = new WizardButtonConfig(WizardForm.CUSTOMER);
        customerEditStep.setTitle("Kunde").setIcon("fa fa-user").setForm(this.customerEditForm).setPosition(1);
        wizardConfig.push(customerEditStep);

        let productEditStep = new WizardButtonConfig(WizardForm.PRODUCT);
        productEditStep.setTitle("Produkt").setIcon("fa fa-table").setForm(this.productEditForm).setPosition(2);
        wizardConfig.push(productEditStep);

        let supplyEditStep = new WizardButtonConfig(WizardForm.SUPPLY);
        supplyEditStep.setTitle("Lieferung").setIcon("fa fa-truck").setForm(this.supplyEditForm).setPosition(3).disable();
        wizardConfig.push(supplyEditStep);

        return wizardConfig;
    }
}

angular.module(moduleTransition, [moduleSummernote]).controller(ModalTransitionControllerId, ModalTransitionController);
