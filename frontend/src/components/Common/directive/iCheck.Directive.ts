/// <reference path="../../app/App.Constants.ts" />

angular.module(moduleApp)
    .directive("icheck", ["$timeout", "$parse", function ($timeout, $parse) {
        return {
            require: "ngModel",
            link: function ($scope, element, $attrs, ngModel) {
                return $timeout(function () {
                    let value;
                    let jQueryElement: any = $(element);
                    value = $attrs["value"];
                    $scope.$watch($attrs["ngModel"], function (newValue) {
                        jQueryElement.iCheck("update");
                    });

                    return jQueryElement.iCheck({
                        checkboxClass: "icheckbox_square-green",
                        radioClass: "iradio_square-green"

                    }).on("ifChanged", function (event) {
                        if ($(element).attr("type") === "checkbox" && $attrs["ngModel"]) {
                            $scope.$apply(function () {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr("type") === "radio" && $attrs["ngModel"]) {
                            return $scope.$apply(function () {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
                });
            }
        };
    }]);


