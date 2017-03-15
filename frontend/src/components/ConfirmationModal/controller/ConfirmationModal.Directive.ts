/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />

const ConfirmationModalDirectiveId: string = "confirmationModal";

class ConfirmationModalDirective implements IDirective {
    templateUrl = () => { return "components/ConfirmationModal/view/Confirmation.Modal.html"; };
    transclude = false;
    restrict = "E";
    scope = {
        modalInstance: "<",
        title: "<",
        body: "<",
        submitText: "<",
        icon: "<",
        submitFunction: "&",
        submitButtonClass: "@"
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope) {
    }

    static directiveFactory(): ConfirmationModalDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope) => new ConfirmationModalDirective(WorkflowService, $rootScope);
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.close = (process: Process) => this.close(process, scope);
    };

    close(process: Process, scope: any) {
        scope.modalInstance.close(process);
    }
}
angular.module(moduleApp).directive(ConfirmationModalDirectiveId, ConfirmationModalDirective.directiveFactory());



