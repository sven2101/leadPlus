/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />

const ProductEditDirectiveId: string = "productEdit";

class ProductEditDirective implements IDirective {
    templateUrl = () => { return "components/Wizard/view/Edit.Product.html"; };
    transclude = false;
    restrict = "E";
    scope = {
        form: "=",
        editWorkflowUnit: "=",
        editProcess: "=",
        editable: "<"
    };

    constructor(private WorkflowService: WorkflowService, private ProductService: ProductService, private $rootScope) {
    }

    static directiveFactory(): ProductEditDirective {
        let directive: any = (WorkflowService: WorkflowService, ProductService: ProductService, $rootScope) => new ProductEditDirective(WorkflowService, ProductService, $rootScope);
        directive.$inject = [WorkflowServiceId, ProductServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.workflowService = this.WorkflowService;
        scope.productService = this.ProductService;
        scope.rootScope = this.$rootScope;
        if (!isNullOrUndefined(scope.form)) {
            scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.pform) : scope.pform = scope.form;
        }

        scope.currentProductId = "-1";
        scope.currentProductAmount = 1;

        scope.addProduct = (array: Array<OrderPosition>, currentProductId: string, currentProductAmount: number) => this.addProduct(array, currentProductId, currentProductAmount, scope);
        scope.deleteProduct = (array: Array<OrderPosition>, index: number) => this.deleteProduct(array, index, scope);
        scope.sumOrderPositions = (array: Array<OrderPosition>) => this.sumOrderPositions(array, scope);
        scope.reCalculateOffer = (offer: Offer, array: Array<OrderPosition>) => this.reCalculateOffer(offer, array, scope);
        scope.setPrice = (orderPosition: OrderPosition) => this.setPrice(orderPosition, scope);
        scope.setDiscount = (orderPosition: OrderPosition) => this.setDiscount(orderPosition, scope);
        scope.isLead = () => this.isLead(scope);
        scope.isOffer = () => this.isOffer(scope);
        scope.isSale = () => this.isSale(scope);
        scope.isInOfferTransformation = () => this.isInOfferTransformation(scope);
        scope.isInSaleTransformation = () => this.isInSaleTransformation(scope);

        this.initDatepicker(scope);
    };

    addProduct(array: Array<OrderPosition>, currentProductId: string, currentProductAmount: number, scope: any) {
        if (isNullOrUndefined(array)) {
            array = [];
        }
        if (!isNaN(Number(currentProductId))
            && Number(currentProductId) > 0) {
            let tempProduct = findElementById(scope.productService.products,
                Number(currentProductId));
            let tempOrderPosition = new OrderPosition();
            tempOrderPosition.product = tempProduct as Product;
            tempOrderPosition.amount = currentProductAmount;
            tempOrderPosition.discount = 0;
            tempOrderPosition.netPrice = tempOrderPosition.product.netPrice;
            array.push(tempOrderPosition);
        }
    }

    deleteProduct(array: Array<OrderPosition>, index: number, scope: any) {
        array.splice(index, 1);
    }

    reCalculateOffer(offer: Offer, array: Array<OrderPosition>, scope: any) {
        if (!isNullOrUndefined(offer)) {
            offer.netPrice = Math.round((offer.deliveryCosts + scope.workflowService.sumOrderPositions(array)) * 100) / 100;
        }
    }

    setPrice(orderPosition: OrderPosition, scope: any) {
        orderPosition.netPrice = scope.workflowService.calculatePrice(orderPosition.product.netPrice, orderPosition.discount);
    }


    setDiscount(orderPosition: OrderPosition, scope: any) {
        orderPosition.discount = scope.workflowService.calculateDiscount(orderPosition.product.netPrice, orderPosition.netPrice);
    }

    sumOrderPositions(array: Array<OrderPosition>, scope: any): number {
        return scope.workflowService.sumOrderPositions(array);
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

    initDatepicker(scope: any) {
        if (scope.editable) {
            let jqElement: any = $("#editOfferDatepicker .input-group.date");
            jqElement.datepicker({
                todayBtn: "linked ",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true
            });
        }
    }
}
angular.module(moduleApp).directive(ProductEditDirectiveId, ProductEditDirective.directiveFactory());