/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/service/Workflow.Service.ts" />
/// <reference path="../../Modal/model/WizardButtonConfig.Model.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../Common/service/Process.Service.ts" />
/// <reference path="../../../typeDefinitions/angular.d.ts" />
/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/


const TransitionDirectiveId: string = "transition";

class TransitionDirective implements IDirective {
    templateUrl = () => { return "components/Modal/view/Wizard.Transition.html"; };
    transclude = {
        "customerEdit": "?customerEdit",
        "productEdit": "?lead",
        "supplyEdit": "?supply",
        "emailEdit": "?email"
    };

    restrict = "E";
    scope = {
        modalTitle: "@",
        editProcess: "=",
        editWorkflowUnit: "=",
        modalInstance: "=",
        wizardConfig: "="
    };

    constructor(private WorkflowService: WorkflowService, private CustomerService: CustomerService, private ProcessService: ProcessService, private $rootScope) {
    }

    static directiveFactory(): TransitionDirective {
        let directive: any = (WorkflowService: WorkflowService, CustomerService: CustomerService, ProcessService: ProcessService, $rootScope) => new TransitionDirective(WorkflowService, CustomerService, ProcessService, $rootScope);
        directive.$inject = [WorkflowServiceId, CustomerServiceId, ProcessServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.workflowService = this.WorkflowService;
        scope.customerService = this.CustomerService;
        scope.processService = this.ProcessService;
        scope.rootScope = this.$rootScope;
        scope.wizardElements = new Array<WizardButtonConfig>();
        scope.step = 1;

        scope.close = (result: boolean, process: Process) => this.close(result, process, scope);
        scope.transform = () => this.transform(scope);
        scope.save = () => this.save(scope);
        scope.isAnyFormInvalid = () => this.isAnyFormInvalid(scope);
        scope.getWizardConfigByTransclusion = (wizardConfig: Array<WizardButtonConfig>, transclusion: any) => this.getWizardConfigByTransclusion(wizardConfig, transclusion);
        let wizardConfig: Array<WizardButtonConfig> = scope.wizardConfig;

        for (let transclusion in this.transclude) {
            transclude(function (content) {
                let wizardButtonConfig: WizardButtonConfig = scope.getWizardConfigByTransclusion(wizardConfig, transclusion);
                if (!isNullOrUndefined(wizardButtonConfig)) {
                    scope.wizardElements.push(wizardButtonConfig);
                }

            }, null, transclusion);
        }
    };

    getWizardConfigByTransclusion(wizardConfig: Array<WizardButtonConfig>, transclusion: any): WizardButtonConfig {
        for (let buttonConfig of wizardConfig) {
            if (buttonConfig.directiveType === transclusion) {
                return buttonConfig;
            }
        }
        return null;
    }

    close(result: boolean, process: Process, scope: any) {
        scope.modalInstance.close(process);
        if (!result && (scope.editProcess.status === Status.OPEN || scope.editProcess.status === Status.INCONTACT)) {
            scope.editProcess.offer = undefined;
        } else if (!result && (scope.editProcess.status === Status.OFFER || scope.editProcess.status === Status.FOLLOWUP || scope.editProcess.status === Status.DONE)) {
            scope.editProcess.sale = undefined;
        }
    }

    async transform(scope: any) {
        let process = scope.editProcess;
        let resultProcess = null;
        if (process.status === Status.OPEN || process.status === Status.INCONTACT) {
            let resultProcess: Process = await scope.workflowService.addLeadToOffer(process) as Process;
        } else if (process.status === Status.OFFER || process.status === Status.FOLLOWUP || process.status === Status.DONE) {
            let resultProcess: Process = await scope.workflowService.addOfferToSale(process) as Process;
        }
        scope.rootScope.$broadcast("deleteRow", resultProcess);
        scope.close(true, resultProcess);
    }

    async save(scope: any): Promise<Process> {
        let temp: IWorkflow = scope.editWorkflowUnit;
        if (isNullOrUndefined(temp.customer.id) || isNaN(Number(temp.customer.id)) || Number(temp.customer.id) <= 0) {
            temp.customer.timestamp = newTimestamp();
            temp.customer = await scope.customerService.insertCustomer(temp.customer) as Customer;
        }
        let resultProcess = await scope.processService.save(scope.editProcess) as Process;
        scope.close(true, resultProcess);
        return resultProcess;
    }

    isAnyFormInvalid(scope: any): boolean {
        for (let buttonConfig of scope.wizardConfig) {
            if (!isNullOrUndefined(buttonConfig.form) && buttonConfig.form.$invalid) {
                return true;
            }
        }
        return false;
    }

}
angular.module(moduleApp).directive(TransitionDirectiveId, TransitionDirective.directiveFactory());

