/**
 * Created by Sven on 14.03.2016.
 */
var app = angular.module("app");
app.directive("childrow", function () {
    var directive = {};
    directive.restrict = 'A';
    directive.templateUrl = 'component/leads/leadChildRow.html';
    directive.transclude = true;
    directive.link = function (scope, element, attrs) {
    }
    return directive;
});
