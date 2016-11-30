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
    .directive("edit", function () {
        let directive: { restrict: string, scope: any, templateUrl: any, transclude: boolean, link: any };
        directive = { restrict: null, scope: null, templateUrl: null, transclude: null, link: null };
        directive.restrict = "A";
        directive.scope = {
            form: "=",
            parent: "=",
            type: "=",
        };
        directive.templateUrl = function (elem, attr) {
            return "components/Common/view/Workflow.Edit.Customer.html";
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
            if (scope.type === "lead") {
                scope.service = scope.parent.leadService;
            }
            else if (scope.type === "offer") {
                scope.service = scope.parent.offerService;
            }
            else if (scope.type === "sale") {
                scope.service = scope.parent.saleService;
            }
        };
        return directive;
    });

