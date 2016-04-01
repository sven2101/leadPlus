/**
 * Created by Sven on 14.03.2016.
 */
var app = angular.module("app");
app.directive("childrow", function () {
    var directive = {};
    directive.restrict = 'A';
    directive.templateUrl = function (elem, attr) {
        if (attr.type == 'lead')
            return 'component/leads/leadChildRow.html';
        else if (attr.type == 'offer')
            return 'component/offers/offerChildRow.html';
        else if (attr.type == 'sale')
            return 'component/sales/saleChildRow.html';

    };
    directive.transclude = true;
    directive.link = function (scope, element, attrs) {
    };
    return directive;
});
