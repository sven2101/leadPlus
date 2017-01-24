/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/model/Process.Model.ts" />
/// <reference path="../../Modal/model/WizardButtonConfig.Model.ts" />
/// <reference path="../../Modal/model/Wizard.Form.Enum.Model.ts" />
const ModalTransitionControllerId: string = "ModalTransitionController";

class ModalTransitionController {

    $inject = ["process", $uibModalId];

    type: string;
    uibModalInstance;
    editProcess: Process;
    wizardEditConfig: Array<WizardButtonConfig>;
    wizardTransitionConfig: Array<WizardButtonConfig>;

    notification = new Notification();


    constructor(process: Process, $uibModalInstance) {
        this.uibModalInstance = $uibModalInstance;
        this.editProcess = deepCopy(process);
        this.wizardEditConfig = this.getWizardEditConfig();
        this.wizardTransitionConfig = this.getWizardTransitionConfig();
    }

    getWizardEditConfig(): Array<WizardButtonConfig> {
        let wizardConfig: Array<WizardButtonConfig> = new Array<WizardButtonConfig>();

        let customerEditStep = new WizardButtonConfig(WizardForm.CUSTOMER);
        customerEditStep.setTitle("Kunde").setIcon("fa fa-user").setPosition(1);
        wizardConfig.push(customerEditStep);

        let productEditStep = new WizardButtonConfig(WizardForm.PRODUCT);
        productEditStep.setTitle("Anfrage").setIcon("fa fa-inbox").setPosition(2);
        wizardConfig.push(productEditStep);

        let emailEditStep = new WizardButtonConfig(WizardForm.EMAIL);
        emailEditStep.setTitle("E-Mail versenden").setIcon("fa fa-envelope").setPosition(3).setValidation(false).setEmail(true);
        wizardConfig.push(emailEditStep);

        let SaleEditStep = new WizardButtonConfig(WizardForm.SALE);
        SaleEditStep.setTitle("Verkauf").setIcon("fa fa-usd").setPosition(4);
        wizardConfig.push(SaleEditStep);

        return wizardConfig;
    }

    getWizardTransitionConfig(): Array<WizardButtonConfig> {
        let wizardConfig: Array<WizardButtonConfig> = new Array<WizardButtonConfig>();

        let customerEditStep = new WizardButtonConfig(WizardForm.CUSTOMER);
        customerEditStep.setTitle("Kunde").setIcon("fa fa-user").setPosition(1);
        wizardConfig.push(customerEditStep);

        let productEditStep = new WizardButtonConfig(WizardForm.PRODUCT);
        productEditStep.setTitle("Produkt").setIcon("fa fa-table").setPosition(2);
        wizardConfig.push(productEditStep);

        return wizardConfig;
    }

    getWizardConfigByDirectiveType(wizardConfig: Array<WizardButtonConfig>, directiveType: WizardForm): WizardButtonConfig {
        for (let buttonConfig of wizardConfig) {
            if (buttonConfig.directiveType === directiveType) {
                return buttonConfig;
            }
        }
        return null;
    }
}

angular.module(moduleTransition, [moduleSummernote]).controller(ModalTransitionControllerId, ModalTransitionController);
