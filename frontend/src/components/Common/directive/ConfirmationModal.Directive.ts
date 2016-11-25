/// <reference path="../../app/App.Constants.ts" />

angular.module(moduleApp)
    .directive("confirmationmodal", function () {
        let directive: { restrict: string, scope: any, templateUrl: any, transclude: boolean, link: any };
        directive = { restrict: null, scope: null, templateUrl: null, transclude: null, link: null };
        directive.scope = {
            parent: "=",
            modalid: "@",
            title: "@",
            body: "@",
            submittext: "@",
        };
        directive.restrict = "A";
        directive.templateUrl = function (elem, attr) {
            return "components/Common/view/Confirmation.Modal.html";
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
            scope.currentProcess = null;
            scope.currentFunction = null;
            scope.$on("confirmationModalFunction", function (evt, data) {

                scope.currentProcess = data.payload;
                scope.currentFunction = data.method;
            });
            scope.submitFunction = function () {
                switch (scope.currentFunction) {
                    case "deleteRow": scope.parent.deleteRow(scope.currentProcess);
                        break;
                    case "rollBack": scope.parent.rollBack(scope.currentProcess);
                        break;
                }
            };
        };
        return directive;
    });

