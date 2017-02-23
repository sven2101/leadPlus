/// <reference path="../app/App.Constants.ts" />

const LeadResourceId: string = "LeadResource";

class LeadResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/leads/:id", {}, {
            getAll: { url: "/api/rest/leads", method: "GET" },
            getById: { url: "/api/rest/leads/:id", method: "GET" },
            getByCustomerId: { url: "/api/rest/leads/customer/:id", method: "GET", isArray: true },
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
            getByinvoiceNumber: { url: "/api/rest/sales/invoice", method: "POST", isArray: true },
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
            update: { url: "/api/rest/processes/update", method: "POST" },
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

            getWorkflowByStatus: { url: "/api/rest/processes/workflow/:workflow/state/:status", method: "GET", isArray: true },
            getCountWorkflowByStatus: { url: "/api/rest/processes/count/workflow/:workflow/state/:status", method: "GET" },
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
        this.resource = $resource("/api/rest/users/:id", {}, {
            getById: { url: "/api/rest/users/:id", method: "GET" },
            update: { url: "/api/rest/users", method: "PUT" },
            changePassword: { url: "/api/rest/users/:id/pw", method: "POST" },
            setProfilePicture2: {
                url: "/api/rest/users/:id/profile/picture", params: { file: "@file" }, method: "POST", transformRequest: angular.identity,
                headers: { "Content-Type": undefined }
            },
            setProfilePicture: {
                url: "/api/rest/users/profile/picture", method: "POST"
            },
            getProfilePicture: {
                url: "/api/rest/users/:id/profile/picture/object", method: "GET"
            },
            getAll: { url: "/api/rest/users", method: "GET", isArray: true },
            // setSmtpConnection: { url: "/api/rest/users/:id/smtps", method: "POST" }
            getByEmail: { url: "/api/rest/users/email", method: "POST" }
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
            changeRole: { url: "/users/:id/role/:role/update", method: "GET" }
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
                url: "/api/rest/processes/statistics/workflow/:workflow/daterange/:dateRange/source/:source", method: "GET", isArray: true
            },
            getProfitStatistic: {
                url: "/api/rest/processes/statistics/profit/:workflow/daterange/:dateRange/source/:source", method: "GET", isArray: true
            },
            getTurnoverStatistic: {
                url: "/api/rest/processes/statistics/turnover/:workflow/daterange/:dateRange/source/:source", method: "GET", isArray: true
            },
            getProductStatistic: {
                url: "/api/rest/processes/statistics/product/:workflow/daterange/:dateRange/source/:source", method: "GET", isArray: true
            },
            getSingleProductStatistic: {
                url: "/api/rest/processes/statistics/product/:workflow/daterange/:dateRange/source/:source/id/:id", method: "GET"
            },
            getUserStatistic: {
                url: "/api/rest/processes/statistics/user/daterange/:dateRange/source/:source", method: "GET", isArray: true
            },
            getSingleUserStatistic: {
                url: "/api/rest/processes/statistics/user/daterange/:dateRange/source/:source/id/:id", method: "GET"
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
            getRealCustomer: { url: "/api/rest/customer/real", method: "GET", isArray: true },
            getAllCustomerByPage: { url: "/api/rest/customer/all/:start/:length/:searchtext/:allCustomers", method: "GET", isArray: false },
            getAllCustomerBySearchText: { url: "/api/rest/customer/search/:searchtext", method: "GET", isArray: true },
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
            signup: { url: "/api/rest/registrations", method: "POST", headers: { "Content-Type": "application/json" } },
            uniqueUsername: { url: "/api/rest/registrations/unique/username", method: "POST", headers: { "Content-Type": "application/json" } },
            uniqueEmail: { url: "/api/rest/registrations/unique/email", method: "POST", headers: { "Content-Type": "application/json" } },
            init: { url: "/api/rest/registrations/init", method: "POST", headers: { "Content-Type": "application/json" } }
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
            save: { url: "/api/rest/files", method: "POST" },
            getFileUploadById: { url: "/api/rest/files/:id", method: "GET" },
            getContentByFileUploadId: { url: "/api/rest/files/content/:id", method: "GET", responseType: "arraybuffer" }
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
                url: "/api/rest/templates/:templateId/offers/generate", method: "POST", params: {
                    templateId: "@templateId",
                    offerId: "@offerId"
                }
            },
            test: { url: "/api/rest/templates/test", method: "POST" },
            generatePDF: {
                url: "/api/rest/templates/:templateId/offers/pdf/generate", method: "POST", params: {
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
            createSmtp: { url: "/api/rest/smtp/", method: "POST" },
            testSmtp: { url: "/api/rest/smtp/:id/test", method: "POST" },
            getByUserId: { url: "/users/smtp/user/:id", method: "GET" },
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
            sendNotification: { url: "/api/rest/notifications/proccess/:processId/user/:senderId/send", method: "POST" },
            getNotificationsBySenderId: { url: "/api/rest/notifications/sender/:senderId", method: "GET", isArray: true }
        });
    }
}

angular.module(moduleNotificationResource, [ngResourceId]).service(NotificationResourceId, NotificationResource);

// ----------------------------------------------------------------------------------------

const TenantResourceId: string = "TenantResource";

class TenantResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/tenants", {}, {
            save: { url: "/api/rest/tenants", method: "POST" },
            uniqueTenantKey: { url: "/api/rest/tenants/unique/key", method: "POST" }
        });
    }
}
angular.module(moduleTenantResource, [ngResourceId]).service(TenantResourceId, TenantResource);
// ----------------------------------------------------------------------------------------
const SourceResourceId: string = "SourceResource";

class SourceResource {

    private $inject = [$resourceId];

    resource: any;

    constructor($resource) {
        this.resource = $resource("/api/rest/source", {}, {
            getSourceById: { url: "/api/rest/source/:id", method: "GET" },
            getAllSources: { url: "/api/rest/source", method: "GET", isArray: true },
            createSource: { url: "/api/rest/source", method: "POST" },
            updateSource: { url: "/api/rest/source", method: "PUT" },
            deleteSource: { url: "/api/rest/source", method: "DELETE" }
        });
    }
}

angular.module(moduleSourceResource, [ngResourceId]).service(SourceResourceId, SourceResource);


