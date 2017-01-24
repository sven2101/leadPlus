/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
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
        "productEdit": "?productEdit",
        "emailEdit": "?emailEdit",
        "saleEdit": "?saleEdit"
    };

    restrict = "E";
    scope = {
        modalTitle: "@",
        editProcess: "=",
        editWorkflowUnit: "=",
        modalInstance: "=",
        wizardConfig: "=",
        currentNotification: "="
    };

    constructor(private WorkflowService: WorkflowService, private CustomerService: CustomerService, private ProcessService: ProcessService, private FileService: FileService, private NotificationService: NotificationService, private $rootScope) {
    }

    static directiveFactory(): TransitionDirective {
        let directive: any = (WorkflowService: WorkflowService, CustomerService: CustomerService, ProcessService: ProcessService, FileService: FileService, NotificationService: NotificationService, $rootScope) => new TransitionDirective(WorkflowService, CustomerService, ProcessService, FileService, NotificationService, $rootScope);
        directive.$inject = [WorkflowServiceId, CustomerServiceId, ProcessServiceId, FileServiceId, NotificationServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.workflowService = this.WorkflowService;
        scope.customerService = this.CustomerService;
        scope.processService = this.ProcessService;
        scope.fileService = this.FileService;
        scope.notificationService = this.NotificationService;
        scope.rootScope = this.$rootScope;
        scope.wizardElements = new Array<WizardButtonConfig>();
        scope.step = 1;
        scope.currentWizard;

        if (!isNullOrUndefined(scope.currentNotification)) {
            scope.currentNotification.recipients = scope.editWorkflowUnit.customer.email;
            scope.$watch("editWorkflowUnit.customer.email", function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.currentNotification.recipients = scope.editWorkflowUnit.customer.email;
                }
            }, true);
        }

        scope.close = (result: boolean, process: Process) => this.close(result, process, scope);
        scope.transform = () => this.transform(scope);
        scope.save = () => this.save(scope);
        scope.send = () => this.send(scope);
        scope.isAnyFormInvalid = () => this.isAnyFormInvalid(scope);
        scope.isLead = () => this.isLead(scope);
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
        scope.currentWizard = scope.wizardElements[0];
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
        if (scope.isLead()) {
            let resultProcess: Process = await scope.workflowService.addLeadToOffer(process) as Process;
        } else if (process.status === Status.OFFER || process.status === Status.FOLLOWUP || process.status === Status.DONE) {
            let resultProcess: Process = await scope.workflowService.addOfferToSale(process) as Process;
        }
        scope.rootScope.$broadcast("deleteRow", resultProcess);
        scope.close(true, resultProcess);
    }

    async save(scope: any): Promise<Process> {
        if (isNullOrUndefined(scope.editWorkflowUnit.customer.timestamp)) {
            scope.editWorkflowUnit.customer.timestamp = newTimestamp();
        }
        let isNewProcess: boolean = isNullOrUndefined(scope.editProcess.id);
        console.log(scope.editProcess);
        let resultProcess = await scope.processService.save(scope.editProcess, !isNewProcess, false) as Process;
        console.log(resultProcess);
        scope.close(true, resultProcess);
        return resultProcess;
    }

    async send(scope: any) {
        let process = scope.editProcess;
        process.notifications = process.notifications ? process.notifications : [];

        let notification: Notification = deepCopy(scope.currentNotification);
        notification.attachments = notification.attachments ? notification.attachments : [];
        notification.notificationType = NotificationType.OFFER;
        notification.id = undefined;
        let deleteRow = false;
        if (scope.isLead()) {
            deleteRow = true;
            await scope.workflowService.addLeadToOffer(process);
        }
        let promises: Array<Promise<void>> = notification.attachments ?
            notification.attachments
                .filter(a => isNullOrUndefined(a.id))
                .map(a => scope.fileService.saveAttachment(a)) : [];
        for (let p of promises) {
            await p;
        }
        notification.attachments.forEach(a => a.id = undefined);
        process.notifications.push(notification);

        let resultProcess = await scope.processService.save(process, !deleteRow, deleteRow) as Process;
        scope.close(true, resultProcess);
        try {
            await scope.notificationService.sendNotification(notification);
        } catch (error) {
            // TODO Set Notification to Error            
            console.log("Set Notification to Error....");
            notification.notificationType = NotificationType.ERROR;
        }
    }

    isLead(scope: any): boolean {
        if (scope.editProcess.status === Status.OPEN || scope.editProcess.status === Status.INCONTACT) {
            return true;
        }
        return false;
    }

    isAnyFormInvalid(scope: any): boolean {
        for (let buttonConfig of scope.wizardConfig) {
            if (!isNullOrUndefined(buttonConfig.form) && buttonConfig.form.$invalid && buttonConfig.validation) {
                return true;
            }
        }
        return false;
    }

}
angular.module(moduleApp).directive(TransitionDirectiveId, TransitionDirective.directiveFactory());

