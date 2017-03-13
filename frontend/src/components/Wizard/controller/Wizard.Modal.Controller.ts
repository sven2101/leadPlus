/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Process/model/Process.Model.ts" />
/// <reference path="../../Wizard/model/WizardButtonConfig.Model.ts" />
/// <reference path="../../Wizard/model/WizardType.Enum.ts" />
/// <reference path="../../Workflow/model/WorkflowType.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
const WizardModalControllerId: string = "WizardModalController";

class WizardModalController {

    $inject = ["process", "workflowType", "transformation", "notification", $uibModalId, $rootScopeId, WorkflowServiceId];

    uibModalInstance;
    rootScope;
    workflowService: WorkflowService;

    editProcess: Process;
    wizardEditConfig: Array<WizardButtonConfig>;
    wizardQuickEmailConfig: Array<WizardButtonConfig>;
    wizardOfferTransitionConfig: Array<WizardButtonConfig>;
    wizardSaleTransitionConfig: Array<WizardButtonConfig>;

    notification: Notification;


    constructor(process: Process, workflowType: WorkflowType, transformation: boolean, notification: Notification, $uibModalInstance, $rootScope, WorkflowService) {
        this.uibModalInstance = $uibModalInstance;
        this.rootScope = $rootScope;
        this.workflowService = WorkflowService;
        this.editProcess = deepCopy(process);
        this.appendTransformation(transformation, workflowType);
        this.wizardEditConfig = this.getWizardEditConfig();
        this.wizardQuickEmailConfig = this.getQuickEmailWizardConfig(workflowType);
        this.wizardOfferTransitionConfig = this.getOfferWizardTransitionConfig();
        this.wizardSaleTransitionConfig = this.getSaleWizardTransitionConfig();
        this.notification = notification == null ? new Notification() : notification;
    }

    getWizardEditConfig(): Array<WizardButtonConfig> {
        let wizardConfig: Array<WizardButtonConfig> = new Array<WizardButtonConfig>();

        let customerEditStep = new WizardButtonConfig(WizardType.CUSTOMER);
        customerEditStep.setTitle("CUSTOMER").setIcon("fa fa-user").setPosition(1);
        wizardConfig.push(customerEditStep);

        let productEditStep = new WizardButtonConfig(WizardType.PRODUCT);
        productEditStep.setTitle("LEAD").setIcon("fa fa-inbox").setPosition(2);
        wizardConfig.push(productEditStep);

        let emailEditStep = new WizardButtonConfig(WizardType.EMAIL);
        emailEditStep.setTitle("COMMON_EMAIL").setIcon("fa fa-envelope").setPosition(3).setValidation(false).setEmail(true, "COMMON_CONTINUE_AND_SENDING");
        wizardConfig.push(emailEditStep);

        let SaleEditStep = new WizardButtonConfig(WizardType.SALE);
        SaleEditStep.setTitle("SALE").setIcon("fa fa-usd").setPosition(4).setAsFirstElement();
        wizardConfig.push(SaleEditStep);

        return wizardConfig;
    }

    getQuickEmailWizardConfig(workflowType: WorkflowType): Array<WizardButtonConfig> {
        let wizardConfig: Array<WizardButtonConfig> = new Array<WizardButtonConfig>();

        let emailEditStep = new WizardButtonConfig(WizardType.EMAIL);
        emailEditStep.setTitle("COMMON_EMAIL").setIcon("fa fa-envelope").setPosition(1).setEmail(true, "COMMON_SEND").setShowSaveButton(false);
        switch (workflowType) {
            case WorkflowType.LEAD:
                break;
            case WorkflowType.OFFER:
                emailEditStep.setFollowUp(true);
                break;
            case WorkflowType.SALE:
                break;
        };
        wizardConfig.push(emailEditStep);

        return wizardConfig;
    }

    getOfferWizardTransitionConfig(): Array<WizardButtonConfig> {
        let wizardConfig: Array<WizardButtonConfig> = new Array<WizardButtonConfig>();

        let customerProductEditStep = new WizardButtonConfig(WizardType.CUSTOMER_PRODUCT);
        customerProductEditStep.setTitle("LEAD").setIcon("fa fa-inbox").setPosition(1);
        wizardConfig.push(customerProductEditStep);

        let emailEditStep = new WizardButtonConfig(WizardType.EMAIL);
        emailEditStep.setTitle("COMMON_EMAIL").setIcon("fa fa-envelope").setPosition(2).setValidation(false).setEmail(true, "COMMON_CONTINUE_AND_SENDING");
        wizardConfig.push(emailEditStep);

        let SaleEditStep = new WizardButtonConfig(WizardType.SALE);
        SaleEditStep.setTitle("SALE").setIcon("fa fa-usd").setPosition(3).disable().setValidation(false);
        wizardConfig.push(SaleEditStep);

        return wizardConfig;
    }

    getSaleWizardTransitionConfig(): Array<WizardButtonConfig> {
        let wizardConfig: Array<WizardButtonConfig> = new Array<WizardButtonConfig>();

        let customerProductEditStep = new WizardButtonConfig(WizardType.CUSTOMER_PRODUCT);
        customerProductEditStep.setTitle("LEAD").setIcon("fa fa-inbox").setPosition(1);
        wizardConfig.push(customerProductEditStep);

        let emailEditStep = new WizardButtonConfig(WizardType.EMAIL);
        emailEditStep.setTitle("COMMON_EMAIL").setIcon("fa fa-envelope").setPosition(2).setValidation(false).setEmail(true, "COMMON_CONTINUE_AND_SENDING");
        wizardConfig.push(emailEditStep);

        let SaleEditStep = new WizardButtonConfig(WizardType.SALE);
        SaleEditStep.setTitle("SALE").setIcon("fa fa-usd").setPosition(3).setAsFirstElement();
        wizardConfig.push(SaleEditStep);

        return wizardConfig;
    }

    getWizardConfigByDirectiveType(wizardConfig: Array<WizardButtonConfig>, directiveType: WizardType): WizardButtonConfig {
        for (let buttonConfig of wizardConfig) {
            if (buttonConfig.directiveType === directiveType) {
                return buttonConfig;
            }
        }
        return null;
    }

    appendTransformation(transformation: boolean, workflowType: WorkflowType): void {
        if (!transformation || isNullOrUndefined(workflowType)) {
            return;
        }
        let self = this;
        if (workflowType === WorkflowType.OFFER) {
            let deliveryAddress: Address = deepCopy(self.editProcess.lead.deliveryAddress);
            deliveryAddress.id = null;
            let billingAddress: Address = deepCopy(self.editProcess.lead.billingAddress);
            billingAddress.id = null;
            this.editProcess.offer = {
                id: null,
                orderPositions: deepCopy(self.editProcess.lead.orderPositions),
                deliveryAddress: deliveryAddress,
                deliveryDate: self.editProcess.lead.deliveryDate,
                netPrice: self.workflowService.sumOrderPositions(self.editProcess.lead.orderPositions),
                customer: self.editProcess.lead.customer,
                vat: self.rootScope.user.defaultVat,
                timestamp: newTimestamp(),
                vendor: self.editProcess.lead.vendor,
                deliveryCosts: self.editProcess.lead.deliveryCosts,
                message: self.editProcess.lead.message,
                billingAddress: billingAddress,
                deliveryAddressLine: self.editProcess.lead.deliveryAddressLine,
                deliveryTerm: null,
                paymentTerm: null,
                skonto: 0
            };

            for (let i = 0; i < this.editProcess.offer.orderPositions.length; i++) {
                this.editProcess.offer.orderPositions[i].id = 0;
            }
        }
        else if (workflowType === WorkflowType.SALE) {
            let deliveryAddress: Address = deepCopy(self.editProcess.offer.deliveryAddress);
            deliveryAddress.id = null;
            let billingAddress: Address = deepCopy(self.editProcess.offer.billingAddress);
            billingAddress.id = null;
            this.editProcess.sale = {
                id: null,
                deliveryAddress: deliveryAddress,
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
                message: self.editProcess.offer.message,
                billingAddress: billingAddress,
                deliveryAddressLine: self.editProcess.offer.deliveryAddressLine,
                deliveryTerm: self.editProcess.offer.deliveryTerm,
                paymentTerm: self.editProcess.offer.paymentTerm,
                skonto: self.editProcess.offer.skonto
            };
            for (let i = 0; i < this.editProcess.sale.orderPositions.length; i++) {
                this.editProcess.sale.orderPositions[i].id = 0;
            }
        }

    }

}

angular.module(moduleWizard, [moduleSummernote]).controller(WizardModalControllerId, WizardModalController);
