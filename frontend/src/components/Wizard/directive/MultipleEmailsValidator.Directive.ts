
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
            let valid = scope.checkEmail();
            scope.form[scope.name] = {
                $error: {
                    email: !valid
                },
                $invalid: !valid

            };
            if (!isNullOrUndefined(scope.required) && (isNullOrUndefined(scope.emails) || scope.emails === "")) {
                scope.form[scope.name].$error.required = true;
            } else {
                scope.form[scope.name].$error.required = undefined;
            }

            if (scope.form.$valid === true && !valid) {
                scope.form.$valid = undefined;
                scope.form.$invalid = true;
            } else if (scope.form.$valid === true && valid) {
                scope.form.$valid = true;
                scope.form.$invalid = undefined;
            }
        }, true);

    }



}

angular.module(moduleApp).directive(MultipleEmailsValidatorDirectiveId, MultipleEmailsValidatorDirective.directiveFactory());

