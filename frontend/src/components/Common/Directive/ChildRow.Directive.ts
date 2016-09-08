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
    .directive("childrow", function () {
        let directive: { restrict: string, templateUrl: any, transclude: boolean, link: any };
        directive = { restrict: null, templateUrl: null, transclude: null, link: null };
        directive.restrict = "A";
        directive.templateUrl = function (elem, attr) {
            if (attr.type === "lead") {
                return "components/Lead/view/LeadChildRow.html";
            }
            else if (attr.type === "offer") {
                return "components/Offer/view/OfferChildRow.html";
            }
            else if (attr.type === "sale") {
                return "components/Sale/view/SaleChildRow.html";
            }
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
        };
        return directive;
    });

