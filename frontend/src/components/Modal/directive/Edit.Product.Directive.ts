/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
const ProductEditDirectiveId: string = "productEdit";

class ProductEditDirective implements IDirective {
    templateUrl = () => { return "components/Modal/view/Edit.Product.html"; };
    transclude = false;
    restrict = "E";
    scope = {
        form: "=",
        editWorkflowUnit: "=",
        editProcess: "=",
        editable: "="
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
        scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.pform) : scope.pform = scope.form;

        scope.currentProductId = "-1";
        scope.currentProductAmount = 1;

        scope.addProduct = (array: Array<OrderPosition>, currentProductId: string, currentProductAmount: number) => this.addProduct(array, currentProductId, currentProductAmount, scope);
        scope.deleteProduct = (array: Array<OrderPosition>, index: number) => this.deleteProduct(array, index, scope);
        scope.sumOrderPositions = (array: Array<OrderPosition>) => this.sumOrderPositions(array, scope);
        scope.isLead = () => this.isLead(scope);
        scope.isOffer = () => this.isOffer(scope);
        scope.isSale = () => this.isSale(scope);
        this.initDatepicker();
    };

    addProduct(array: Array<OrderPosition>, currentProductId: string, currentProductAmount: number, scope: any) {
        scope.workflowService.addProduct(array, currentProductId, currentProductAmount);
    }

    deleteProduct(array: Array<OrderPosition>, index: number, scope: any) {
        scope.workflowService.deleteProduct(array, index);
    }

    sumOrderPositions(array: Array<OrderPosition>, scope: any): number {
        return scope.workflowService.sumOrderPositions(array);
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

    initDatepicker() {
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
angular.module(moduleApp).directive(ProductEditDirectiveId, ProductEditDirective.directiveFactory());