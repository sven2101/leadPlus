/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/service/Workflow.Service.ts" />
/// <reference path="../../../typeDefinitions/angular.d.ts" />

const ToDoTableRowDirectiveId: string = "todoitem";

class ToDoTableRowDirective implements IDirective {

    templateUrl = () => { return "components/Dashboard/view/ToDoTableRow.Directive.html"; };
    transclude = false;
    restrict = "A";
    scope = {
        process: "=",
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope) { }

    static directiveFactory(): ToDoTableRowDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope) => new ToDoTableRowDirective(WorkflowService, $rootScope);
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.statusTranslation = this.getStatusTranslationKeyByProcess(scope.process);
        scope.badgeClass = this.getStatusBadgeClassByProcess(scope.process);
        scope.editWorkflowUnit = (scope.process.status === Status.OPEN || scope.process.status === Status.INCONTACT ? scope.process.lead : scope.process.offer);
        scope.toLocalDate = (timestamp: any) => toLocalDate(timestamp, "DD.MM.YYYY HH:mm");
        scope.text = scope.editWorkflowUnit.customer.company ? scope.editWorkflowUnit.customer.company : scope.editWorkflowUnit.customer.firstname + " " + scope.editWorkflowUnit.customer.lastname;
        scope.price = scope.process.status === Status.OPEN || scope.process.status === Status.INCONTACT ? this.sumOrderPositions(scope.editWorkflowUnit.orderPositions) : scope.editWorkflowUnit.netPrice;
        scope.goToLink = scope.process.status === Status.OPEN || scope.process.status === Status.INCONTACT ? "#/leads/" + scope.process.id : "#/offers/" + scope.process.id;
    };

    getStatusTranslationKeyByProcess(process: Process): string {
        switch (process.status) {
            case Status.OPEN: return "LEAD";
            case Status.OFFER: return "COMMON_STATUS_OFFER";
            case Status.FOLLOWUP: return "COMMON_STATUS_FOLLOW_UP";
            case Status.INCONTACT: return "COMMON_STATUS_INCONTACT";
            case Status.DONE: return "COMMON_STATUS_DONE";
        }
    }

    getStatusBadgeClassByProcess(process: Process): string {
        switch (process.status) {
            case Status.OPEN: return "label label-danger";
            case Status.OFFER: return "label label-warning";
            case Status.FOLLOWUP: return "label label-warning";
            case Status.INCONTACT: return "label label-danger";
            case Status.DONE: return "label label-success";
        }
    }
    sumOrderPositions(array: Array<OrderPosition>): number {
        return this.WorkflowService.sumOrderPositions(array);
    }

}

angular.module(moduleApp).directive(ToDoTableRowDirectiveId, ToDoTableRowDirective.directiveFactory());

