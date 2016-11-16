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


