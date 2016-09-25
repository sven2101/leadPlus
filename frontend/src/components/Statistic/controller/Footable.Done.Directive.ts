/// <reference path="../../app/App.Constants.ts" />
angular.module(moduleApp)
.directive("fooRepeatDone", function() {
    return function($scope, element) {
        if ($scope.$last) { // all are rendered
            $(".table").trigger("footable_redraw");
        }
    };
});