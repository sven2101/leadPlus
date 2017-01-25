/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />

const SaleEditDirectiveId: string = "saleEdit";

class SaleEditDirective implements IDirective {
    templateUrl = () => { return "components/Modal/view/Edit.Sale.html"; };
    transclude = false;
    restrict = "E";
    scope = {
        form: "=",
        editWorkflowUnit: "=",
        editProcess: "=",
        editable: "<"
    };

    constructor(private WorkflowService: WorkflowService, private SaleService: SaleService, private $rootScope) {
    }

    static directiveFactory(): SaleEditDirective {
        let directive: any = (WorkflowService: WorkflowService, SaleService: SaleService, $rootScope) => new SaleEditDirective(WorkflowService, SaleService, $rootScope);
        directive.$inject = [WorkflowServiceId, SaleServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.workflowService = this.WorkflowService;
        scope.saleService = this.SaleService;
        scope.rootScope = this.$rootScope;
        scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.sform) : scope.sform = scope.form;
        scope.invoiceNumberAlreadyExists = false;


        scope.existsInvoiceNumber = () => this.existsInvoiceNumber(scope);
        scope.calculateProfit = () => this.calculateProfit(scope);
    };

    async existsInvoiceNumber(scope: any) {
        if (!isNullOrUndefined(scope.editWorkflowUnit.invoiceNumber) && scope.editWorkflowUnit.invoiceNumber.length > 0) {
            let sale = await scope.saleService.getSaleByInvoiceNumber(scope.editWorkflowUnit.invoiceNumber).catch(error => handleError(error));
            scope.invoiceNumberAlreadyExists = !isNullOrUndefined(sale.invoiceNumber);
            scope.$apply();
        }
    }

    calculateProfit(scope: any) {
        if (!isNullOrUndefined(scope.editWorkflowUnit.saleTurnover) && !isNullOrUndefined(scope.editWorkflowUnit.saleCost)) {
            scope.editWorkflowUnit.saleProfit = scope.editWorkflowUnit.saleTurnover - scope.editWorkflowUnit.saleCost;
        }
    }
}
angular.module(moduleApp).directive(SaleEditDirectiveId, SaleEditDirective.directiveFactory());