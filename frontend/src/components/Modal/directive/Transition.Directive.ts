/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/service/Workflow.Service.ts" />
/// <reference path="../../Modal/model/WizardButtonConfig.Model.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
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
"use strict";


const TransitionDirectiveId: string = "transition";

class TransitionDirective implements IDirective {
    templateUrl = () => { return "components/Modal/view/Wizard.Transition.html"; };
    transclude = {
        "customerEdit": "?edit",
        "productEdit": "?lead",
        "supplyEdit": "?supply"
    };

    restrict = "E";
    scope = {
        modalTitle: "@",
        editProcess: "=",
        modalInstance: "=",
        wizardConfig: "="
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope) {
    }

    static directiveFactory(): TransitionDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope) => new TransitionDirective(WorkflowService, $rootScope);
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.workflowService = this.WorkflowService;
        scope.rootScope = this.$rootScope;
        scope.wizardElements = new Array<WizardButtonConfig>();
        scope.step = 1;

        scope.close = (result: boolean, process: Process) => this.close(result, process, scope);
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

}
angular.module(moduleApp).directive(TransitionDirectiveId, TransitionDirective.directiveFactory());

