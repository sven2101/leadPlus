/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/service/Workflow.Service.ts" />
/// <reference path="./Directive.Interface.ts" />
/// <reference path="../../../typeDefinitions/angular.d.ts" />

const ActionButtonDirectiveId: string = "actionbuttons";

class ActionButtonDirective implements IDirective {

    templateUrl = () => { return "components/Common/view/Workflow.ActionButtons.html"; };
    transclude = false;
    restrict = "A";
    scope = {
        templatedata: "=",
        type: "@",
        parent: "="
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope) { }

    static directiveFactory(): ActionButtonDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope) => new ActionButtonDirective(WorkflowService, $rootScope);
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.process = scope.templatedata.process;
        scope.workflowService = this.WorkflowService;
        scope.rootScope = this.$rootScope;
        scope.openModal = function (payload: any, method: any) {
            this.$rootScope.$broadcast("confirmationModalFunction", { "payload": payload, "method": method });
        };
    };
}

angular.module(moduleApp).directive(ActionButtonDirectiveId, ActionButtonDirective.directiveFactory());

