/// <reference path="../app/App.Constants.ts" />
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

class LeadResource {

    static serviceId: string = "LeadResource";

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/leads/:id", {}, {
            getAll: { url: "/api/rest/leads", method: "GET" },
            getById: { url: "/api/rest/leads/:id", method: "GET" },
            save: { url: "/api/rest/leads/", method: "POST" },
            update: { url: "/api/rest/leads", method: "PUT" },
            drop: { url: "/api/rest/leads/:id", method: "DELETE" }
        });
    }
}

angular.module(moduleLeadResource, [ngResourceId]).service(LeadResource.serviceId, LeadResource);

// ----------------------------------------------------------------------------------------

class OfferResource {

    static serviceId: string = "OfferResource";

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/offers/:id", {}, {
            getAll: { url: "/api/rest/offers", method: "GET" },
            getById: { url: "/api/rest/offers/:id", method: "GET" },
            save: { url: "/api/rest/offers/", method: "POST" },
            update: { url: "/api/rest/offers", method: "PUT" },
            drop: { url: "/api/rest/offers/:id", method: "DELETE" },
        });
    }
}

angular.module(moduleOfferResource, [ngResourceId]).service(OfferResource.serviceId, OfferResource);

// ----------------------------------------------------------------------------------------

class SaleResource {

    static serviceId: string = "SaleResource";

    resource: any;

    constructor($resource) {
        this.resource = ("/api/rest/sales/:id", {}, {
            getAll: { url: "/api/rest/sales", method: "GET" },
            getById: { url: "/api/rest/sales/:id", method: "GET" },
            save: { url: "/api/rest/sales/", method: "POST" },
            update: { url: "/api/rest/sales", method: "PUT" },
            drop: { url: "/api/rest/sales/:id", method: "DELETE" },
        });
    }
}

angular.module(moduleSaleResource, [ngResourceId]).service(SaleResource.serviceId, SaleResource);

// ----------------------------------------------------------------------------------------

class ProcessResource {

    static serviceId: string = "ProcessResource";

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/processes/:id", {}, {
            getById: { url: "/api/rest/processes/:id", method: "GET" },
            getStatus: { url: "/api/rest/processes/:id/status", method: "GET" },
            getAll: { url: "/api/rest/processes", method: "GET", isArray: true },
            save: { url: "/api/rest/processes", method: "POST" },
            update: { url: "/api/rest/processes", method: "PUT" },
            drop: { url: "/api/rest/processes/:id", method: "DELETE" },

            createOffer: { url: "/api/rest/processes/:id/offers", method: "POST" },
            createSale: { url: "/api/rest/processes/:id/sales", method: "POST" },

            getProcessor: { url: "/api/rest/processes/:id/processors", method: "GET" },
            setProcessor: { url: "/api/rest/processes/:id/processors", method: "PUT" },
            removeProcessor: { url: "/api/rest/processes/:id/processors", method: "DELETE" },

            setStatus: { url: "/api/rest/processes/:id/status/:status", method: "PUT" },
            getByStatus: { url: "/api/rest/processes/status/:status", method: "GET" },

            getProcessByLead: { url: "/api/rest/processes/leads", method: "GET", isArray: true },
            getProcessByOffer: { url: "/api/rest/processes/offers", method: "GET", isArray: true },
            getProcessBySale: { url: "/api/rest/processes/sales", method: "GET", isArray: true },

            getLeadsByStatus: { url: "/api/rest/processes/workflow/:workflow/state/:status", method: "GET", isArray: true },
            getOffersByStatus: { url: "/api/rest/processes/workflow/:workflow/state/:status", method: "GET", isArray: true },
            getSalesByStatus: { url: "/api/rest/processes/workflow/:workflow/state/:status", method: "GET", isArray: true },
            getFollowUpsByStatus: { url: "/api/rest/processes/workflow/:workflow/state/:status", method: "GET", isArray: true },
            getLatestSales: { url: "/api/rest/processes/sales/latest/10", method: "GET", isArray: true },
            getLatest100Sales: { url: "/api/rest/processes/sales/latest/100", method: "GET", isArray: true }
        });
    }
}

angular.module(moduleProcessResource, [ngResourceId]).service(ProcessResource.serviceId, ProcessResource);

// ----------------------------------------------------------------------------------------

class CommentResource {

    static serviceId: string = "CommentResource";

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/comments/", {}, {
            getByProcessId: { url: "/api/rest/comments/processes/:id", method: "GET", isArray: true },
            getById: { url: "/api/rest/comments/:id", method: "GET" },
            save: { url: "/api/rest/comments/", method: "POST" },
            update: { url: "/api/rest/comments", method: "PUT" },
            drop: { url: "/api/rest/comments/:id", method: "DELETE" }
        });
    }
}

angular.module(moduleCommentResource, [ngResourceId]).service(CommentResource.serviceId, CommentResource);

// ----------------------------------------------------------------------------------------

class UserResource {

    static serviceId: string = "UserResource";

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/users/:id", {}, {
            update: { url: "/users", method: "PUT" },
            changePassword: { url: "/users/:id/pw", method: "PUT" }
        });
    }
}

angular.module(moduleUserResource, [ngResourceId]).service(UserResource.serviceId, UserResource);

// ----------------------------------------------------------------------------------------

class SettingsResource {

    static serviceId: string = "SettingsResource";

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/users/:id", {}, {
            getAll: { url: "/users/all", method: "GET", isArray: true },
            activate: { url: "/users/:id/activate", method: "PUT" },
            setRole: { url: "/users/:id/role", method: "PUT" }
        });
    }
}

angular.module(moduleSettingsResource, [ngResourceId]).service(SettingsResource.serviceId, SettingsResource);

// ----------------------------------------------------------------------------------------

class StatisticResource {

    static serviceId: string = "StatisticResource";

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/processes/statistics", {}, {
            getWorkflowStatistic: {
                url: "/api/rest/processes/statistics/workflow/:workflow/daterange/:dateRange", method: "GET"
            },
            getProfitStatistic: {
                url: "/api/rest/processes/statistics/profit/:workflow/daterange/:dateRange", method: "GET"
            },
            getTurnoverStatistic: {
                url: "/api/rest/processes/statistics/turnover/:workflow/daterange/:dateRange", method: "GET"
            }
        });
    }
}

angular.module(moduleStatisticResource, [ngResourceId]).service(StatisticResource.serviceId, StatisticResource);

// ----------------------------------------------------------------------------------------

class ProductResource {

    static serviceId: string = "ProductResource";

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/product", {}, {
            getProductById: { url: "/api/rest/product/:id", method: "GET" },
            getAllProducts: { url: "/api/rest/product", method: "GET", isArray: true },
            createProduct: { url: "/api/rest/product", method: "POST" },
            updateProduct: { url: "/api/rest/product", method: "PUT" },
            deleteProduct: { url: "/api/rest/product", method: "DELETE" }
        });
    }
}

angular.module(moduleProductResource, [ngResourceId]).service(ProductResource.serviceId, ProductResource);

// ----------------------------------------------------------------------------------------

class CustomerResource {

    static serviceId: string = "CustomerResource";

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/customer", {}, {
            getCustomerById: { url: "/api/rest/customer/:id", method: "GET" },
            getAllCustomer: { url: "/api/rest/customer", method: "GET", isArray: true },
            createCustomer: { url: "/api/rest/customer", method: "POST" },
            updateCustomer: { url: "/api/rest/customer", method: "PUT" },
            deleteCustomer: { url: "/api/rest/customer", method: "DELETE" }
        });
    }
}

angular.module(moduleCustomerResource, [ngResourceId]).service(CustomerResource.serviceId, CustomerResource);
