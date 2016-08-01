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

angular.module("app.services").factory("SaleService", SaleService);

class SaleService {

    static $inject = ["$resource"];

    resource;

    day;
    week;
    month;
    year;
    all;

    constructor($resource) {
        this.resource = $resource;
        this.routeInit();
    }

    routeInit() {
        this.day = { url: "/api/rest/processes/statistics/sales/day", method: "GET" };
        this.week = { url: "/api/rest/processes/statistics/sales/week", method: "GET" };
        this.month = { url: "/api/rest/processes/statistics/sales/month", method: "GET" };
        this.year = { url: "/api/rest/processes/statistics/sales/year", method: "GET" };
        this.all = { url: "/api/rest/processes/statistics/sales/all", method: "GET" };
    }
}
