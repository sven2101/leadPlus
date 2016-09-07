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
    .directive("actionbuttons", function () {
        let directive: { restrict: string, scope: any, templateUrl: any, transclude: boolean, link: any };
        directive = { restrict: null, scope: null, templateUrl: null, transclude: null, link: null };
        directive.restrict = "A";
        directive.scope = {
            templatedata: "@",
            type: "@",
            parent: "="
        };
        directive.templateUrl = function (elem, attr) {
            if (attr.template === "standard") {
                return "components/common/view/Workflow.ActionButtons.html";
            }
            else if (attr.template === "dropdown") {
                return "components/common/view/Workflow.ActionButtons.Dropdown.html";
            }
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
            let templateData = JSON.parse(scope.templatedata);
            scope.directiveData = templateData;
        };
        return directive;
    });

