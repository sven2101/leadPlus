/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />

const PriceCalculationDirectiveId: string = "priceCalculation";

class PriceCalculationDirective implements IDirective {
    templateUrl = () => { return "components/Wizard/view/Price.Calculation.html"; };
    transclude = false;
    restrict = "E";
    scope = {
        editWorkflowUnit: "=",
        editProcess: "=",
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope) {
    }

    static directiveFactory(): PriceCalculationDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope) => new PriceCalculationDirective(WorkflowService, $rootScope);
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.workflowService = this.WorkflowService;
        scope.rootScope = this.$rootScope;

        scope.sumOrderPositions = (array: Array<OrderPosition>) => this.sumOrderPositions(array, scope);
        scope.sumBasicPriceOrderPositions = (array: Array<OrderPosition>) => this.sumBasicPriceOrderPositions(array, scope);
        scope.calculateDiscount = (oldPrice: number, newPrice: number) => this.calculateDiscount(oldPrice, newPrice, scope);
        scope.isLead = () => this.isLead(scope);
        scope.isOffer = () => this.isOffer(scope);
        scope.isSale = () => this.isSale(scope);
        scope.isInOfferTransformation = () => this.isInOfferTransformation(scope);
        scope.isInSaleTransformation = () => this.isInSaleTransformation(scope);
    };

    sumOrderPositions(array: Array<OrderPosition>, scope: any): number {
        return scope.workflowService.sumOrderPositions(array);
    }

    sumBasicPriceOrderPositions(array: Array<OrderPosition>, scope: any): number {
        return scope.workflowService.sumBasicPriceOrderPositions(array);
    }

    calculateDiscount(oldPrice: number, newPrice: number, scope: any): number {
        return scope.workflowService.calculateDiscount(oldPrice, newPrice);
    }

    isLead(scope: any): boolean {
        return scope.workflowService.isLead(scope.editProcess);
    }

    isOffer(scope: any): boolean {
        return scope.workflowService.isOffer(scope.editProcess);
    }

    isSale(scope: any): boolean {
        return scope.workflowService.isSale(scope.editProcess);
    }

    isInOfferTransformation(scope: any): boolean {
        return scope.isLead() && !isNullOrUndefined(scope.editProcess.offer);
    }

    isInSaleTransformation(scope: any): boolean {
        return scope.isOffer() && !isNullOrUndefined(scope.editProcess.sale);
    }
}
angular.module(moduleApp).directive(PriceCalculationDirectiveId, PriceCalculationDirective.directiveFactory());