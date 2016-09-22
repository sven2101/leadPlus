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

const LeadResourceId: string = "LeadResource";

class LeadResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/leads/:id", {}, {
            getAll: { url: "/api/rest/leads", method: "GET" },
            getById: { url: "/api/rest/leads/:id", method: "GET" },
            getByCustomerId: { url: "/api/rest/leads/customer/:id", method: "GET", isArray: true },
            save: { url: "/api/rest/leads/", method: "POST" },
            update: { url: "/api/rest/leads", method: "PUT" },
            drop: { url: "/api/rest/leads/:id", method: "DELETE" }
        });
    }
}

angular.module(moduleLeadResource, [ngResourceId]).service(LeadResourceId, LeadResource);

// ----------------------------------------------------------------------------------------

const OfferResourceId: string = "OfferResource";

class OfferResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/offers/:id", {}, {
            getAll: { url: "/api/rest/offers", method: "GET" },
            getById: { url: "/api/rest/offers/:id", method: "GET" },
            getByCustomerId: { url: "/api/rest/offers/customer/:id", method: "GET", isArray: true },
            save: { url: "/api/rest/offers/", method: "POST" },
            update: { url: "/api/rest/offers", method: "PUT" },
            drop: { url: "/api/rest/offers/:id", method: "DELETE" },
        });
    }
}

angular.module(moduleOfferResource, [ngResourceId]).service(OfferResourceId, OfferResource);

// ----------------------------------------------------------------------------------------

const SaleResourceId: string = "SaleResource";

class SaleResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/sales/:id", {}, {
            getAll: { url: "/api/rest/sales", method: "GET" },
            getById: { url: "/api/rest/sales/:id", method: "GET" },
            getByCustomerId: { url: "/api/rest/sales/customer/:id", method: "GET", isArray: true },
            save: { url: "/api/rest/sales/", method: "POST" },
            update: { url: "/api/rest/sales", method: "PUT" },
            drop: { url: "/api/rest/sales/:id", method: "DELETE" },
        });
    }
}

angular.module(moduleSaleResource, [ngResourceId]).service(SaleResourceId, SaleResource);

// ----------------------------------------------------------------------------------------

const ProcessResourceId: string = "ProcessResource";

class ProcessResource {

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
            getLatest100Sales: { url: "/api/rest/processes/sales/latest/100", method: "GET", isArray: true },
            getTodos: { url: "api/rest/processes/processor/:processorId", method: "GET", isArray: true },
        });
    }
}

angular.module(moduleProcessResource, [ngResourceId]).service(ProcessResourceId, ProcessResource);

// ----------------------------------------------------------------------------------------

const CommentResourceId: string = "CommentResource";

class CommentResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/comments/", {}, {
            getByProcessId: { url: "/api/rest/comments/processes/:id", method: "GET", isArray: true },
            getById: { url: "/api/rest/comments/:id", method: "GET" },
            save: { url: "/api/rest/comments/:id", method: "POST" },
            update: { url: "/api/rest/comments", method: "PUT" },
            drop: { url: "/api/rest/comments/:id", method: "DELETE" }
        });
    }
}

angular.module(moduleCommentResource, [ngResourceId]).service(CommentResourceId, CommentResource);

// ----------------------------------------------------------------------------------------

const UserResourceId: string = "UserResource";

class UserResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/users/:id", {}, {
            getById: { url: "/users/:id", method: "GET" },
            update: { url: "/users", method: "PUT" },
            changePassword: { url: "/users/:id/pw", method: "POST" },
            setProfilePicture: {
                url: "/users/:id/profile/picture", params: { file: "@file" }, method: "POST", transformRequest: angular.identity,
                headers: { "Content-Type": undefined }
            },
            getProfilePicture: {
                url: "/users/:id/profile/picture/object", method: "GET"
            },
            getAll: { url: "/users/all", method: "GET", isArray: true },
            setSmtpConnection: { url: "/users/:id/smtps", method: "POST" }
        });
    }
}

angular.module(moduleUserResource, [ngResourceId]).service(UserResourceId, UserResource);

// ----------------------------------------------------------------------------------------

const SettingResourceId: string = "SettingResource";

class SettingResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/users/:id", {}, {
            getAll: { url: "/users/all", method: "GET", isArray: true },
            activate: { url: "/users/:id/activate", method: "PUT" },
            changeRole: { url: "/users/:id/role/:role/update", method: "PUT" }
        });
    }
}

angular.module(moduleSettingResource, [ngResourceId]).service(SettingResourceId, SettingResource);

// ----------------------------------------------------------------------------------------

const StatisticResourceId: string = "StatisticResource";

class StatisticResource {

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

angular.module(moduleStatisticResource, [ngResourceId]).service(StatisticResourceId, StatisticResource);

// ----------------------------------------------------------------------------------------

const ProductResourceId: string = "ProductResource";

class ProductResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/products", {}, {
            getProductById: { url: "/api/rest/products/:id", method: "GET" },
            getAllProducts: { url: "/api/rest/products", method: "GET", isArray: true },
            createProduct: { url: "/api/rest/products", method: "POST" },
            updateProduct: { url: "/api/rest/products", method: "PUT" },
            deleteProduct: { url: "/api/rest/products", method: "DELETE" },
            uploadImage: {
                url: "/api/rest/products/:id/image", params: { file: "@file" }, method: "POST", transformRequest: angular.identity,
                headers: { "Content-Type": undefined }
            },
            getImage: {
                url: "/api/rest/products/:id/image", method: "GET", transformRequest: angular.identity,
                headers: { "Content-Type": undefined }
            },
        });
    }
}

angular.module(moduleProductResource, [ngResourceId]).service(ProductResourceId, ProductResource);

// ----------------------------------------------------------------------------------------

const CustomerResourceId: string = "CustomerResource";

class CustomerResource {

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

angular.module(moduleCustomerResource, [ngResourceId]).service(CustomerResourceId, CustomerResource);

// ----------------------------------------------------------------------------------------

const SignupResourceId: string = "SignupResource";

class SignupResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/registrations", {}, {
            signup: { url: "/api/rest/registrations", method: "POST" },
            uniqueUsername: { url: "/api/rest/registrations/unique/username", method: "POST", headers: { "Content-Type": "application/json" } },
            uniqueEmail: { url: "/api/rest/registrations/unique/email", method: "POST", headers: { "Content-Type": "application/json" } }
        });
    }
}

angular.module(moduleSignupResource, [ngResourceId]).service(SignupResourceId, SignupResource);

// ----------------------------------------------------------------------------------------

const FileResourceId: string = "FileResource";

class FileResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/files", {}, {
            uploadFiles: {
                url: "/api/rest/files", method: "POST", transformRequest: angular.identity,
                headers: { "Content-Type": undefined }
            }
        });
    }
}

angular.module(moduleFileResource, [ngResourceId]).service(FileResourceId, FileResource);

// ----------------------------------------------------------------------------------------

const TemplateResourceId: string = "TemplateResource";

class TemplateResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/templates", {}, {
            getAll: { url: "/api/rest/templates", method: "GET", isArray: true },
            save: { url: "/api/rest/templates", method: "POST" },
            update: { url: "/api/rest/templates", method: "PUT" },
            remove: { url: "/api/rest/templates/:id", method: "DELETE" },
            generate: {
                url: "/api/rest/templates/:templateId/offers/:offerId/generate", method: "POST", params: {
                    templateId: "@templateId",
                    offerId: "@offerId"
                }
            },
            generatePDF: {
                url: "/api/rest/templates/:templateId/offers/:offerId/pdf/generate", method: "POST", params: {
                    templateId: "@templateId",
                    offerId: "@offerId"
                }, responseType: "arraybuffer"
            }
        });
    }
}

angular.module(moduleTemplateResource, [ngResourceId]).service(TemplateResourceId, TemplateResource);

// ----------------------------------------------------------------------------------------

const SmtpResourceId: string = "SmtpResource";

class SmtpResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/smtp", {}, {
            save: { url: "/api/rest/smtp/", method: "POST" },
            test: { url: "/api/rest/smtp/connections/test", method: "POST" },
            getByUserId: { url: "/api/rest/smtp/user/:id", method: "GET" },
        });
    }
}

angular.module(moduleSmtpResource, [ngResourceId]).service(SmtpResourceId, SmtpResource);

// ----------------------------------------------------------------------------------------

const NotificationResourceId: string = "NotificationResource";

class NotificationResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/notifications", {}, {
            send: { url: "/api/rest/notifications/users/:id/offers/send", method: "POST" }
        });
    }
}

angular.module(moduleNotificationResource, [ngResourceId]).service(NotificationResourceId, NotificationResource);
