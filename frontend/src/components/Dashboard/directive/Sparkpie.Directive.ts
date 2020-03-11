/// <reference path="../../app/App.Constants.ts" />
"use strict";

angular.module(moduleApp)
    .directive("sparkpiechart", function () {
        return {
            restrict: "E",
            scope: {
                data: "@"
            },
            compile: function (tElement, tAttrs, transclude) {
                tElement.replaceWith("<span>" + tAttrs["data"] + "</span>");
                return function (scope, element, attrs) {
                    let color = attrs["color"];
                    attrs.$observe("data", function (newValue) {
                        element.html(newValue);
                        element.sparkline("html", {
                            type: "pie", width: "96%", height: "80px", sliceColors: ["#1ab394", "#F5F5F5"]
                        });
                    });
                };
            }
        };
    });
