/// <reference path="../../app/App.Constants.ts" />
/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";

angular.module(moduleApp)
    .directive("sparklinechart", function () {
        return {
            restrict: "E",
            scope: {
                data: "@"
            },
            compile: function (tElement, tAttrs, transclude) {
                let numberArray: Array<number> = tAttrs["data"];
                tElement.replaceWith("<span>" + numberArray + "</span>");
                return function (scope, element, attrs) {
                    let color = attrs["color"];
                    attrs.$observe("data", function (newValue: Array<number>) {
                        let inputData: string = newValue.toString();
                        inputData = inputData.slice(0, -1);
                        inputData = inputData.slice(1);
                        element.html(inputData);
                        element.sparkline("html", {
                            type: "line", width: "96%", height: "80px", barWidth: 11, barColor: color, lineColor: color,
                            fillColor: "white"
                        });
                    });
                };
            }
        };
    });
