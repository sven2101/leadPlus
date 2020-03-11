/// <reference path="../../app/App.Constants.ts" />
"use strict";

angular.module(moduleApp)
    .directive("focusMe", function ($timeout, $parse) {
        return {
            link: function (scope, element, attrs) {
                let model = $parse(attrs["focusMe"]);
                scope.$watch(model, function (value) {
                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });
            }
        };
    });
