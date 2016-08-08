/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH. All rights reserved.
 * 
 * NOTICE: All information contained herein is, and remains the property of
 * Eviarc GmbH and its suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to Eviarc GmbH, and are protected
 * by trade secret or copyright law. Dissemination of this information or
 * reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Eviarc GmbH.
 ******************************************************************************/
"use strict";

angular.module("app",
    [
        "app.services",
        "app.dashboard",
        "app.login",
        "app.signup",
        "app.leads",
        "app.leads.service",
        "app.offers",
        "app.sales",
        "app.statistics",
        "app.settings",
        "app.profile",
        "pascalprecht.translate",
        "ngResource",
        "ngRoute",
        "ngAnimate",
        "ngCookies",
        "datatables",
        "datatables.bootstrap",
        "datatables.buttons",
        "ui.sortable",
        "NgSwitchery",
        "toaster",
        "highcharts-ng",
        "testModule",
        "app.product",
        "app.product.service",
        "app.customer",
        "app.customer.service"

    ]);

