/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/directive/Directive.Interface.ts" />
const CustomerProductEditDirectiveId: string = "customerProductEdit";

class CustomerProductEditDirective implements IDirective {
    templateUrl = (ele, attr) => {
        return "components/Wizard/view/Edit.Customer.Product.html";
    };
    transclude = false;
    restrict = "E";
    scope = {
        form: "=",
        editWorkflowUnit: "=",
        editProcess: "=",
        editable: "<",
    };

    constructor() {
    }

    static directiveFactory(): CustomerProductEditDirective {
        let directive: any = () => new CustomerProductEditDirective();
        directive.$inject = [];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        if (!isNullOrUndefined(scope.form)) {
            scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.cpform) : scope.cpform = scope.form;
        }
        scope.showDeliveryData = true;
        scope.showCustomerData = false;
        scope.deliveryProductEditElement = angular.element(document.querySelector("#deliveryProductEditDiv"));
        $(scope.deliveryProductEditElement[0]).css("overflow", "visible");
        scope.changeShowDeliveryData = () => this.changeShowDeliveryData(scope);
    };

    changeShowDeliveryData(scope: any) {
        scope.showDeliveryData = !scope.showDeliveryData;
        if (scope.showDeliveryData === true) {
            setTimeout(function () {
                $(scope.deliveryProductEditElement[0]).css("overflow", "visible");
            }, 500);
        } else {
            $(scope.deliveryProductEditElement[0]).css("overflow", "hidden");
        }
    }
}
angular.module(moduleApp).directive(CustomerProductEditDirectiveId, CustomerProductEditDirective.directiveFactory());


