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
 **************Z****************************************************************/
"use strict";

angular.module("app")
    .directive("pwCheck", function () {
        return {
            require: "ngModel",
            link: function (scope, elem, attrs, ctrl: any) {
                let firstPassword = "#" + attrs.pwCheck;
                elem.add(firstPassword).on("keyup", function () {
                    scope.$apply(function () {
                        ctrl.$setValidity("pwmatch", elem.val() === $(firstPassword).val());
                    });
                });
            }
        };
    });
