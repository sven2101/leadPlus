/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />

const SaleEditDirectiveId: string = "saleEdit";

class SaleEditDirective implements IDirective {
    templateUrl = () => { return "components/Wizard/view/Edit.Sale.html"; };
    transclude = false;
    restrict = "E";
    scope = {
        form: "=",
        editWorkflowUnit: "=",
        editProcess: "=",
        editable: "<"
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope) {
    }

    static directiveFactory(): SaleEditDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope) => new SaleEditDirective(WorkflowService, $rootScope);
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.workflowService = this.WorkflowService;
        scope.rootScope = this.$rootScope;
        if (!isNullOrUndefined(scope.form)) {
            scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.sform) : scope.sform = scope.form;
        }
        scope.invoiceNumberAlreadyExists = false;


        scope.existsInvoiceNumber = () => this.existsInvoiceNumber(scope);
        scope.calculateProfit = () => this.calculateProfit(scope);
    };

    async existsInvoiceNumber(scope: any) {
        if (!isNullOrUndefined(scope.editWorkflowUnit.invoiceNumber) && scope.editWorkflowUnit.invoiceNumber.length > 0) {
            let sales: Array<Sale> = await scope.workflowService.getSaleByInvoiceNumber(scope.editWorkflowUnit.invoiceNumber) as Array<Sale>;
            scope.invoiceNumberAlreadyExists = !isNullOrUndefined(sales) && sales.length > 0;
        } else {
            scope.invoiceNumberAlreadyExists = false;
        }
    }

    calculateProfit(scope: any) {
        if (!isNullOrUndefined(scope.editWorkflowUnit.saleTurnover) && !isNullOrUndefined(scope.editWorkflowUnit.saleCost)) {
            scope.editWorkflowUnit.saleProfit = Math.round((scope.editWorkflowUnit.saleTurnover - scope.editWorkflowUnit.saleCost) * 1000) / 1000;
        }
    }
}
angular.module(moduleApp).directive(SaleEditDirectiveId, SaleEditDirective.directiveFactory());