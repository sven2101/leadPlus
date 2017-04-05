/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Workflow/controller/Workflow.Modal.Service.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../../typeDefinitions/angular.d.ts" />

const ActionButtonDirectiveId: string = "actionbuttons";

class ActionButtonDirective implements IDirective {

    templateUrl = () => { return "components/ActionButtons/view/Workflow.ActionButtons.html"; };
    transclude = false;
    restrict = "A";
    scope = {
        actionbuttonconfig: "=",
        process: "=",
        minwidth: "@"
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope, private TemplateService: TemplateService, private FileSaver) { }

    static directiveFactory(): ActionButtonDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope, TemplateService, FileSaver) =>
            new ActionButtonDirective(WorkflowService, $rootScope, TemplateService, FileSaver);
        directive.$inject = [WorkflowServiceId, $rootScopeId, TemplateServiceId, FileSaverId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.minwidth = isNullOrUndefined(scope.minwidth) ? 210 : scope.minwidth;
        scope.workflowService = this.WorkflowService;
        scope.rootScope = this.$rootScope;
        scope.config = scope.actionbuttonconfig;
        scope.ConfirmationFunctionType = ConfirmationFunctionType;
        scope.workflow = scope.process.offer == null ? scope.process.lead : scope.process.offer;
        scope.workflow = scope.process.sale != null ? scope.process.sale : scope.workflow;
        scope.workflow.processor = scope.process.processor;
        scope.exportProcessAsPDF = () => this.exportProcessAsPDF(scope.workflow);
        scope.openEditModal = (process: Process): void => {
            this.$rootScope.$broadcast(broadcastOpenEditModal, process);
        };
    };

    async exportProcessAsPDF(workflow: WorkflowTemplateObject): Promise<void> {
        let response = await this.TemplateService.exportProcessAsPDF(workflow);
        let file = b64toBlob(response.data, "application/pdf");
        this.FileSaver.saveAs(file, "export.pdf");
    }
}

angular.module(moduleApp).directive(ActionButtonDirectiveId, ActionButtonDirective.directiveFactory());

