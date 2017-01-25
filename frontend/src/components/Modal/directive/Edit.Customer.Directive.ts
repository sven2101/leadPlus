/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Setting/controller/Setting.Source.Service.ts" />
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
const CustomerEditDirectiveId: string = "customerEdit";

class CustomerEditDirective implements IDirective {
    templateUrl = (ele, attr) => {
        if (attr.small === "true") {
            return "components/Modal/view/Edit.Customer.Small.html";
        } else {
            return "components/Modal/view/Edit.Customer.html";
        }
    };
    transclude = false;
    restrict = "E";
    scope = {
        form: "=",
        editWorkflowUnit: "=",
        editProcess: "=",
        editable: "<",
        small: "<"
    };

    constructor(private WorkflowService: WorkflowService, private SourceService: SourceService, private CustomerService: CustomerService, private $rootScope, private $sce) {
    }

    static directiveFactory(): CustomerEditDirective {
        let directive: any = (WorkflowService: WorkflowService, SourceService: SourceService, CustomerService: CustomerService, $rootScope, $sce) => new CustomerEditDirective(WorkflowService, SourceService, CustomerService, $rootScope, $sce);
        directive.$inject = [WorkflowServiceId, SourceServiceId, CustomerServiceId, $rootScopeId, $sceId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.workflowService = this.WorkflowService;
        scope.customerService = this.CustomerService;
        scope.sourceService = this.SourceService;
        scope.rootScope = this.$rootScope;
        scope.sce = this.$sce;
        scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.cform) : scope.cform = scope.form;

        scope.customerSelected = !isNullOrUndefined(scope.editWorkflowUnit.customer.id);
        scope.selectedCustomer = scope.customerSelected ? scope.editWorkflowUnit.customer : null;

        scope.selectCustomer = (customer: Customer) => this.selectCustomer(customer, scope);
        scope.getAsHtml = (html: string) => this.getAsHtml(html, scope);
    };

    selectCustomer(customer: Customer, scope: any) {
        if (isNullOrUndefined(customer)) {
            scope.selectedCustomer = null;
        }
        scope.editWorkflowUnit.customer = scope.workflowService.selectCustomer(customer);
        scope.customerSelected = !isNullOrUndefined(scope.editWorkflowUnit.customer.id);
    }

    getAsHtml(html: string, scope: any) {
        return scope.sce.trustAsHtml(html);
    }

}
angular.module(moduleApp).directive(CustomerEditDirectiveId, CustomerEditDirective.directiveFactory());


