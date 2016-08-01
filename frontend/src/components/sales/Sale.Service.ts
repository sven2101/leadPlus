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

angular.module("app.services", ["ngResource"]).factory("Sales", Sales);

class Sales {

    static $inject = ["$resource"];

    resource;

    constructor($resource) {
        this.resource = $resource("/api/rest/processes/statistics/sales", {}, {
            day: { url: "/api/rest/processes/statistics/sales/day", method: "GET" },
            week: { url: "/api/rest/processes/statistics/sales/week", method: "GET" },
            month: { url: "/api/rest/processes/statistics/sales/month", method: "GET" },
            year: { url: "/api/rest/processes/statistics/sales/year", method: "GET" },
            all: { url: "/api/rest/processes/statistics/sales/all", method: "GET" }
        });

    }


}
