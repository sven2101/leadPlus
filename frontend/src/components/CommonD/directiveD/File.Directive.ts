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
    .directive("ngFiles", ["$parse", function ($parse) {

    function fn_link(scope, element, attrs) {
        let onChange = $parse(attrs.ngFiles);
        element.on("change", function (event) {
            onChange(scope, { $files: event.target.files });
        });
    }

    return {
        link: fn_link
    };
}]);

