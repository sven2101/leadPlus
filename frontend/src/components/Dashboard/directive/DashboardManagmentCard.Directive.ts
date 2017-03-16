/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Workflow/controller/Workflow.Modal.Service.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../../typeDefinitions/angular.d.ts" />

const DashboardManagmentCardDirectiveId: string = "dashboardmanagamentcard";

class DashboardManagmentCardDirective implements IDirective {

    templateUrl = () => { return "components/Dashboard/view/DashboardManagmentCard.html"; };
    transclude = false;
    restrict = "E";

    scope = {
        process: "=",
        workflowunittype: "@",
        disabled: "@"
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope) { }

    static directiveFactory(): DashboardManagmentCardDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope) => new DashboardManagmentCardDirective(WorkflowService, $rootScope);
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        if (isNullOrUndefined(scope.process)) {
            return;
        }
        scope.editWorkflowUnit = scope.process[scope.workflowunittype];
        scope.toLocalDate = this.toLocalDate;
        scope.workflowService = this.WorkflowService;
        scope.onInfoClick = (editWorkflowUnit, workflowunittype, process) => scope.$parent.$parent.$parent.dashboardCtrl.saveDataToModal(editWorkflowUnit, workflowunittype, process);
        scope.openQuickEmailModal = (process) => this.openQuickEmailModal(process, scope);
        scope.pin = (process) => this.WorkflowService.togglePin(process, this.$rootScope.user);
        scope.goToLink = "#/" + scope.workflowunittype + "s/" + scope.process.id;
        if (scope.editWorkflowUnit) {
            scope.text = scope.text = scope.editWorkflowUnit.customer.company ? scope.editWorkflowUnit.customer.company : scope.editWorkflowUnit.customer.firstname + " " + scope.editWorkflowUnit.customer.lastname;
        }
    };

    async openQuickEmailModal(process: Process, scope: any) {
        let resultProcess: Process = await scope.workflowService.openQuickEmailModal(process);
        if (!isNullOrUndefined(resultProcess)) {
            scope.process = resultProcess;
        }
    }

    toLocalDate(timestamp: any): any {
        if (timestamp === undefined) {
            timestamp = newTimestamp();
        }
        return toLocalDate(timestamp, "DD.MM.YYYY HH:mm");
    }
}

angular.module(moduleApp).directive(DashboardManagmentCardDirectiveId, DashboardManagmentCardDirective.directiveFactory());

