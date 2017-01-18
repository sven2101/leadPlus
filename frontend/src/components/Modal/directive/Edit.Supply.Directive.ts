/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../Common/service/Workflow.Service.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
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
const SupplyEditDirectiveId: string = "supplyEdit";

class SupplyEditDirective implements IDirective {
    templateUrl = () => { return "components/Modal/view/Edit.Supply.html"; };
    transclude = false;
    restrict = "E";
    scope = {
        form: "=",
        editWorkflowUnit: "=",
        editProcess: "=",
        editable: "="
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope) {
    }

    static directiveFactory(): SupplyEditDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope) => new SupplyEditDirective(WorkflowService, $rootScope);
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.workflowService = this.WorkflowService;
        scope.rootScope = this.$rootScope;
        if (scope.form instanceof WizardButtonConfig) {
            scope.form.setForm(scope.sform);
        }
        else {
            scope.sform = scope.form;
        }

        scope.sumOrderPositions = (array: Array<OrderPosition>) => this.sumOrderPositions(array, scope);
    };

    sumOrderPositions(array: Array<OrderPosition>, scope: any): number {
        return scope.workflowService.sumOrderPositions(array);
    }

}
angular.module(moduleApp).directive(SupplyEditDirectiveId, SupplyEditDirective.directiveFactory());