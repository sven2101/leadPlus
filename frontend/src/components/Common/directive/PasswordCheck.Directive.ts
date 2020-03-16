/// <reference path="../../app/App.Constants.ts" />
"use strict";

angular.module(moduleApp)
    .directive("pwCheck", function () {
        return {
            require: "ngModel",
            link: function (scope, elem, attrs: any, ctrl: any) {
                let firstPassword = "#" + attrs.pwCheck;
                elem.add(firstPassword).on("keyup", function () {
                    scope.$apply(function () {
                        ctrl.$setValidity("pwmatch", elem.val() === $(firstPassword).val());
                    });
                });
            }
        };
    });
