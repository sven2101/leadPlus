
const MultipleEmailsValidatorDirectiveId: string = "multipleemails";

class MultipleEmailsValidatorDirective implements IDirective {

    templateUrl = undefined;
    transclude = false;
    restrict: "A";
    scope = {
        name: "@",
        form: "=",
        emails: "=",
        required: "@"
    };

    constructor() { }

    static directiveFactory(): MultipleEmailsValidatorDirective {
        let directive: any = () => new MultipleEmailsValidatorDirective();
        directive.$inject = [];
        return directive;
    }

    link(scope, element, attrs) {
        const EMAIL_REGEXP = /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/;

        scope.checkEmail = () => {
            if (isNullOrUndefined(scope.emails) || scope.emails === "") {
                return true;
            }
            return new RegExp(EMAIL_REGEXP).test(scope.emails);
        };

        scope.$watch("emails", function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            scope.pristine = false;
            let isEmail = scope.checkEmail();
            scope.form[scope.name].$error.email = !isEmail;

            if (scope.form[scope.name].$valid === false && isEmail) {
                scope.form[scope.name].$valid = true;
                scope.form[scope.name].$invalid = false;
            } else if (scope.form[scope.name].$valid === true && !isEmail) {
                scope.form[scope.name].$valid = false;
                scope.form[scope.name].$invalid = true;
            }

            if (!isNullOrUndefined(scope.required) && (isNullOrUndefined(scope.emails) || scope.emails === "")) {
                scope.form[scope.name].$error.required = true;
                scope.form[scope.name].$valid = false;
                scope.form[scope.name].$invalid = true;
            } else {
                scope.form[scope.name].$error.required = false;
            }
        }, true);

    }



}

angular.module(moduleApp).directive(MultipleEmailsValidatorDirectiveId, MultipleEmailsValidatorDirective.directiveFactory());

