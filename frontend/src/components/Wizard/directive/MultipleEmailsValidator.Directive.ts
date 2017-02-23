
const MultipleEmailsValidatorDirectiveId: string = "multipleemails";
const EMAIL_REGEXP = /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/;

class MultipleEmailsValidatorDirective implements IDirective {

    templateUrl = undefined;
    transclude = false;
    restrict: "A";
    require: "?ngModel";
    scope = {
        form: "=",
        name: "@"
    };

    constructor() { }

    static directiveFactory(): MultipleEmailsValidatorDirective {
        let directive: any = () => new MultipleEmailsValidatorDirective();
        directive.$inject = [];
        return directive;
    }

    link(scope, element, attrs) {
        scope.form[scope.name].$validators.email = function (modelValue) {
            return scope.form[scope.name].$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
    }
}

angular.module(moduleApp).directive(MultipleEmailsValidatorDirectiveId, MultipleEmailsValidatorDirective.directiveFactory());

