/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />

const ConfirmationModalDirectiveId: string = "ConfirmationModalDirective";

class ConfirmationModalDirective implements IDirective {
    templateUrl = () => { return "components/Common/view/Confirmation.Modal.html"; };
    transclude = false;
    restrict = "E";
    scope = {
        modalid: "@",
        title: "@",
        body: "@",
        submittext: "@",
        process: "=",
        function: "@"
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope) {
    }

    static directiveFactory(): ConfirmationModalDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope) => new ConfirmationModalDirective(WorkflowService, $rootScope);
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.workflowService = this.WorkflowService;
        scope.rootScope = this.$rootScope;


        scope.isLead = () => this.isLead(scope);
        scope.isOffer = () => this.isOffer(scope);
        scope.isSale = () => this.isSale(scope);
    };

    action(scope: any) {
        switch (scope.currentFunction) {
            case "deleteRow": scope.parent.deleteRow(scope.currentProcess);
                break;
            case "rollBack": scope.parent.rollBack(scope.currentProcess);
                break;
        }
    }



    isLead(scope: any): boolean {
        if (scope.editProcess.status === Status.OPEN || scope.editProcess.status === Status.INCONTACT) {
            return true;
        }
        return false;
    }

    isOffer(scope: any): boolean {
        if (scope.editProcess.status === Status.OFFER || scope.editProcess.status === Status.FOLLOWUP || scope.editProcess.status === Status.DONE) {
            return true;
        }
        return false;
    }

    isSale(scope: any): boolean {
        if (scope.editProcess.status === Status.SALE) {
            return true;
        }
        return false;
    }
}
angular.module(moduleApp).directive(ConfirmationModalDirectiveId, ConfirmationModalDirective.directiveFactory());



angular.module(moduleApp)
    .directive("confirmationmodal", function () {
        let directive: { restrict: string, scope: any, templateUrl: any, transclude: boolean, link: any };
        directive = { restrict: null, scope: null, templateUrl: null, transclude: null, link: null };
        directive.scope = {
            parent: "=",
            modalid: "@",
            title: "@",
            body: "@",
            submittext: "@",
        };
        directive.restrict = "A";
        directive.templateUrl = function (elem, attr) {
            return "components/Common/view/Confirmation.Modal.html";
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
            scope.currentProcess = null;
            scope.currentFunction = null;
            scope.$on("confirmationModalFunction", function (evt, data) {

                scope.currentProcess = data.payload;
                scope.currentFunction = data.method;
            });
            scope.submitFunction = function () {
                switch (scope.currentFunction) {
                    case "deleteRow": scope.parent.deleteRow(scope.currentProcess);
                        break;
                    case "rollBack": scope.parent.rollBack(scope.currentProcess);
                        break;
                }
            };
        };
        return directive;
    });

