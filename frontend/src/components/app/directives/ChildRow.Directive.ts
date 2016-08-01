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

let app = angular.module("app");
app.directive("childrow", function () {
    let directive;
    directive.restrict = "A";
    directive.templateUrl = function (elem, attr) {
        if (attr.type === "lead")
            return "component/leads/leadChildRow.html";
        else if (attr.type === "offer")
            return "component/offers/offerChildRow.html";
        else if (attr.type === "sale")
            return "component/sales/saleChildRow.html";

    };
    directive.transclude = true;
    directive.link = function (scope, element, attrs) {
    };
    return directive;
});

