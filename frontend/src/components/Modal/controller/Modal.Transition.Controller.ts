/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/model/Process.Model.ts" />
/// <reference path="../../Modal/model/WizardButtonConfig.Model.ts" />
/// <reference path="../../Modal/model/Wizard.Form.Enum.Model.ts" />
const ModalTransitionControllerId: string = "ModalTransitionController";

class ModalTransitionController {

    $inject = ["process", "transformation", $uibModalId, $rootScopeId, WorkflowServiceId];

    uibModalInstance;
    rootScope;
    workflowService: WorkflowService;

    editProcess: Process;
    wizardEditConfig: Array<WizardButtonConfig>;
    wizardOfferTransitionConfig: Array<WizardButtonConfig>;
    wizardSaleTransitionConfig: Array<WizardButtonConfig>;

    notification = new Notification();


    constructor(process: Process, transformation: Workflow, $uibModalInstance, $rootScope, WorkflowService) {
        this.uibModalInstance = $uibModalInstance;
        this.rootScope = $rootScope;
        this.workflowService = WorkflowService;
        this.editProcess = deepCopy(process);
        this.appendTransformation(transformation);
        this.wizardEditConfig = this.getWizardEditConfig();
        this.wizardOfferTransitionConfig = this.getOfferWizardTransitionConfig();
        this.wizardSaleTransitionConfig = this.getSaleWizardTransitionConfig();
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
        SaleEditStep.setTitle("Verkauf").setIcon("fa fa-usd").setPosition(4).setAsFirstElement();
        wizardConfig.push(SaleEditStep);

        return wizardConfig;
    }

    getOfferWizardTransitionConfig(): Array<WizardButtonConfig> {
        let wizardConfig: Array<WizardButtonConfig> = new Array<WizardButtonConfig>();

        let customerEditStep = new WizardButtonConfig(WizardForm.CUSTOMER);
        customerEditStep.setTitle("Anfrage").setIcon("fa fa-inbox").setPosition(1);
        wizardConfig.push(customerEditStep);

        let emailEditStep = new WizardButtonConfig(WizardForm.EMAIL);
        emailEditStep.setTitle("E-Mail versenden").setIcon("fa fa-envelope").setPosition(2).setValidation(false).setEmail(true);
        wizardConfig.push(emailEditStep);

        let SaleEditStep = new WizardButtonConfig(WizardForm.SALE);
        SaleEditStep.setTitle("Verkauf").setIcon("fa fa-usd").setPosition(3).disable().setValidation(false);
        wizardConfig.push(SaleEditStep);

        return wizardConfig;
    }

    getSaleWizardTransitionConfig(): Array<WizardButtonConfig> {
        let wizardConfig: Array<WizardButtonConfig> = new Array<WizardButtonConfig>();

        let customerEditStep = new WizardButtonConfig(WizardForm.CUSTOMER);
        customerEditStep.setTitle("Anfrage").setIcon("fa fa-inbox").setPosition(1);
        wizardConfig.push(customerEditStep);

        let emailEditStep = new WizardButtonConfig(WizardForm.EMAIL);
        emailEditStep.setTitle("E-Mail versenden").setIcon("fa fa-envelope").setPosition(2).setValidation(false).setEmail(true);
        wizardConfig.push(emailEditStep);

        let SaleEditStep = new WizardButtonConfig(WizardForm.SALE);
        SaleEditStep.setTitle("Verkauf").setIcon("fa fa-usd").setPosition(3).setAsFirstElement();
        wizardConfig.push(SaleEditStep);

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

    appendTransformation(transformation: Workflow): void {
        if (isNullOrUndefined(transformation)) {
            return;
        }
        let self = this;
        if (transformation === Workflow.OFFER) {
            this.editProcess.offer = {
                id: null,
                orderPositions: deepCopy(self.editProcess.lead.orderPositions),
                deliveryAddress: self.editProcess.lead.deliveryAddress,
                deliveryDate: null,
                netPrice: self.workflowService.sumOrderPositions(self.editProcess.lead.orderPositions) + self.editProcess.lead.deliveryCosts,
                customer: self.editProcess.lead.customer,
                vat: self.rootScope.user.defaultVat,
                timestamp: newTimestamp(),
                vendor: self.editProcess.lead.vendor,
                deliveryCosts: self.editProcess.lead.deliveryCosts,
                message: self.editProcess.lead.message
            };

            for (let i = 0; i < this.editProcess.offer.orderPositions.length; i++) {
                this.editProcess.offer.orderPositions[i].id = 0;
            }
        }
        else if (transformation === Workflow.SALE) {
            this.editProcess.sale = {
                id: null,
                deliveryAddress: self.editProcess.offer.deliveryAddress,
                deliveryDate: self.editProcess.offer.deliveryDate,
                orderPositions: deepCopy(self.editProcess.offer.orderPositions),
                customer: self.editProcess.offer.customer,
                saleProfit: self.editProcess.offer.netPrice,
                saleCost: 0,
                saleTurnover: self.editProcess.offer.netPrice,
                invoiceNumber: "",
                timestamp: newTimestamp(),
                vendor: self.editProcess.offer.vendor,
                deliveryCosts: self.editProcess.offer.deliveryCosts,
                message: self.editProcess.offer.message
            };
            for (let i = 0; i < this.editProcess.sale.orderPositions.length; i++) {
                this.editProcess.sale.orderPositions[i].id = 0;
            }
        }

    }

}

angular.module(moduleTransition, [moduleSummernote]).controller(ModalTransitionControllerId, ModalTransitionController);
