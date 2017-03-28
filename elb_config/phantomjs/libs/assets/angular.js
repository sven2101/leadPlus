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
var $translateId = "$translate";
var toasterId = "toaster";
var DTOptionsBuilderId = "DTOptionsBuilder";
var DTColumnBuilderId = "DTColumnBuilder";
var $filterId = "$filter";
var $scopeId = "$scope";
var $compileId = "$compile";
var $resourceId = "$resource";
var $rootScopeId = "$rootScope";
var ngResourceId = "ngResource";
var $locationId = "$location";
var $httpId = "$http";
var $cookiesId = "$cookies";
var $windowId = "$window";
var $intervalId = "$interval";
var $qId = "$q";
var $routeParamsId = "$routeParams";
var ngImgCropId = "ngImgCrop";
var $routeProviderId = "$routeProvider";
var $httpProviderId = "$httpProvider";
var $uibModalId = "$uibModal";
var $injectorId = "$injector";
var $sceId = "$sce";
var $routeId = "$route";
var $locationProviderId = "$locationProvider";
var $compileProviderId = "$compileProvider";
var moduleApp = "app";
var moduleAppController = moduleApp + ".controller";
var moduleServices = moduleApp + ".services";
var moduleDashboard = moduleApp + ".dashboard";
var moduleDashboardService = moduleDashboard + ".service";
var moduleAuthService = moduleApp + "authentication.service";
var moduleLogin = moduleApp + ".login";
var moduleLoginService = moduleLogin + ".service";
var moduleSignup = moduleApp + ".signup";
var moduleSignupResource = moduleSignup + ".resource";
var moduleSignupService = moduleSignup + ".service";
var moduleLead = moduleApp + ".lead";
var moduleLeadResource = moduleLead + ".resource";
var moduleLeadDataTableService = moduleLead + ".dataTableService";
var moduleOffer = moduleApp + ".offer";
var moduleOfferResource = moduleOffer + ".resource";
var moduleOfferDataTableService = moduleOffer + ".dataTableService";
var moduleSale = moduleApp + ".sale";
var moduleSaleResource = moduleSale + ".resource";
var moduleSaleDataTableService = moduleSale + ".dataTableService";
var moduleProcess = moduleApp + ".process";
var moduleProcessService = moduleProcess + ".service";
var moduleProcessResource = moduleProcess + ".resource";
var moduleUser = moduleApp + ".user";
var moduleUserDetail = moduleUser + ".detail";
var moduleUserResource = moduleUser + ".resource";
var moduleComment = moduleApp + ".comment";
var moduleCommentResource = moduleComment + ".resource";
var moduleStatistic = moduleApp + ".statistic";
var moduleStatisticResource = moduleStatistic + ".resource";
var moduleStatisticService = moduleStatistic + ".service";
var moduleSetting = moduleApp + ".settings";
var moduleSettingResource = moduleSetting + ".resource";
var moduleSettingService = moduleSetting + ".service";
var moduleProfile = moduleApp + ".profile";
var moduleProfileService = moduleProfile + ".service";
var moduleProduct = moduleApp + ".product";
var moduleProductDetail = moduleProduct + ".detail";
var moduleProductResource = moduleProduct + ".resource";
var moduleProductService = moduleProduct + ".service";
var moduleCustomer = moduleApp + ".customer";
var moduleCustomerDetail = moduleCustomer + ".detail";
var moduleCustomerResource = moduleCustomer + ".resource";
var moduleCustomerService = moduleCustomer + ".service";
var moduleWorkflow = moduleApp + ".workflow";
var moduleWorkflowService = moduleWorkflow + ".service";
var moduleWorkflowDatatableService = moduleWorkflow + ".datatableService";
var moduleWorkflowDatatableRowService = moduleWorkflow + ".datatableRowService";
var moduleWorkflowModalService = moduleWorkflow + ".modalService";
var moduleFollowUp = moduleApp + ".followUp";
var moduleFile = moduleApp + ".file";
var moduleFileResource = moduleFile + ".resource";
var moduleFileService = moduleFile + ".service";
var moduleSmtp = moduleApp + ".smtp";
var moduleSmtpResource = moduleSmtp + ".resource";
var moduleSmtpService = moduleSmtp + ".service";
var moduleTemplate = moduleApp + ".template";
var moduleTemplateResource = moduleTemplate + ".resource";
var moduleTemplateService = moduleTemplate + ".service";
var moduleNotification = moduleApp + ".notification";
var moduleNotificationResource = moduleNotification + ".resource";
var moduleNotificationService = moduleNotification + ".service";
var moduleTenant = moduleApp + ".tenant";
var moduleTenantResource = moduleTenant + ".resource";
var moduleTenantService = moduleTenant + ".service";
var moduleRegistration = moduleApp + ".registration";
var moduleRegistrationService = moduleRegistration + ".service";
var moduleSubdomain = moduleApp + ".subdomain";
var moduleSubdomainService = moduleSubdomain + ".service";
var moduleSource = moduleApp + ".source";
var moduleSourceResource = moduleSource + ".resource";
var moduleSourceService = moduleSource + ".service";
var moduleWizard = moduleApp + ".wizard";
var moduleConfirmation = moduleApp + ".confirmationModal";
var moduleTranslate = "pascalprecht.translate";
var moduleNgResource = "ngResource";
var moduleNgRoute = "ngRoute";
var moduleNgAnimate = "ngAnimate";
var moduleNgCookies = "ngCookies";
var moduleDatatables = "datatables";
var moduleDatatablesBootstrap = "datatables.bootstrap";
var moduleDatatablesButtons = "datatables.buttons";
var moduleUiSortable = "ui.sortable";
var moduleNgSwitchery = "NgSwitchery";
var moduleToaster = "toaster";
var moduleNgImgCrop = "ngImgCrop";
var moduleHighchartsNg = "highcharts-ng";
var moduleUIBootstrap = "ui.bootstrap";
var moduleSummernote = "summernote";
var moduleSummernoteService = moduleSummernote + ".service";
var moduleFootable = "ui.footable";
var moduleSanitize = "ngSanitize";
var moduleSweetAlert = "oitozero.ngSweetAlert";
var moduleAngularChosen = "localytics.directives";

var FileUpload = (function () {
    function FileUpload() {
    }
    return FileUpload;
}());

var Role;
(function (Role) {
    Role[Role["ADMIN"] = "ADMIN"] = "ADMIN";
    Role[Role["SUPERADMIN"] = "SUPERADMIN"] = "SUPERADMIN";
    Role[Role["USER"] = "USER"] = "USER";
})(Role || (Role = {}));

var Language;
(function (Language) {
    Language[Language["EN"] = "EN"] = "EN";
    Language[Language["DE"] = "DE"] = "DE";
})(Language || (Language = {}));

var User = (function () {
    function User() {
    }
    return User;
}());

var LeadResourceId = "LeadResource";
var LeadResource = (function () {
    function LeadResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/api/rest/leads/:id", {}, {
            getAll: { url: "/api/rest/leads", method: "GET" },
            getById: { url: "/api/rest/leads/:id", method: "GET" },
            getByCustomerId: { url: "/api/rest/leads/customer/:id", method: "GET", isArray: true },
            drop: { url: "/api/rest/leads/:id", method: "DELETE" }
        });
    }
    return LeadResource;
}());
angular.module(moduleLeadResource, [ngResourceId]).service(LeadResourceId, LeadResource);
var OfferResourceId = "OfferResource";
var OfferResource = (function () {
    function OfferResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/api/rest/offers/:id", {}, {
            getAll: { url: "/api/rest/offers", method: "GET" },
            getById: { url: "/api/rest/offers/:id", method: "GET" },
            getByCustomerId: { url: "/api/rest/offers/customer/:id", method: "GET", isArray: true },
            drop: { url: "/api/rest/offers/:id", method: "DELETE" }
        });
    }
    return OfferResource;
}());
angular.module(moduleOfferResource, [ngResourceId]).service(OfferResourceId, OfferResource);
var SaleResourceId = "SaleResource";
var SaleResource = (function () {
    function SaleResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/api/rest/sales/:id", {}, {
            getAll: { url: "/api/rest/sales", method: "GET" },
            getById: { url: "/api/rest/sales/:id", method: "GET" },
            getByCustomerId: { url: "/api/rest/sales/customer/:id", method: "GET", isArray: true },
            getByinvoiceNumber: { url: "/api/rest/sales/invoice", method: "POST", isArray: true },
            drop: { url: "/api/rest/sales/:id", method: "DELETE" }
        });
    }
    return SaleResource;
}());
angular.module(moduleSaleResource, [ngResourceId]).service(SaleResourceId, SaleResource);
var ProcessResourceId = "ProcessResource";
var ProcessResource = (function () {
    function ProcessResource($resource) {
        this.$inject = [$resourceId];
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
            getTodos: { url: "api/rest/processes/processor/:processorId", method: "GET", isArray: true }
        });
    }
    return ProcessResource;
}());
angular.module(moduleProcessResource, [ngResourceId]).service(ProcessResourceId, ProcessResource);
var CommentResourceId = "CommentResource";
var CommentResource = (function () {
    function CommentResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/api/rest/comments/", {}, {
            getByProcessId: { url: "/api/rest/comments/processes/:id", method: "GET", isArray: true },
            getById: { url: "/api/rest/comments/:id", method: "GET" },
            save: { url: "/api/rest/comments/:id", method: "POST" },
            update: { url: "/api/rest/comments", method: "PUT" },
            drop: { url: "/api/rest/comments/:id", method: "DELETE" }
        });
    }
    return CommentResource;
}());
angular.module(moduleCommentResource, [ngResourceId]).service(CommentResourceId, CommentResource);
var UserResourceId = "UserResource";
var UserResource = (function () {
    function UserResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/users/:id", {}, {
            getById: { url: "/users/:id", method: "GET" },
            update: { url: "/users", method: "PUT" },
            changePassword: { url: "/users/:id/pw", method: "POST" },
            setProfilePicture2: {
                url: "/users/:id/profile/picture", params: { file: "@file" }, method: "POST", transformRequest: angular.identity,
                headers: { "Content-Type": undefined }
            },
            setProfilePicture: {
                url: "/users/profile/picture", method: "POST"
            },
            getProfilePicture: {
                url: "/users/:id/profile/picture/object", method: "GET"
            },
            getAll: { url: "/users/all", method: "GET", isArray: true },
            setSmtpConnection: { url: "/users/:id/smtps", method: "POST" }
        });
    }
    return UserResource;
}());
angular.module(moduleUserResource, [ngResourceId]).service(UserResourceId, UserResource);
var SettingResourceId = "SettingResource";
var SettingResource = (function () {
    function SettingResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/users/:id", {}, {
            getAll: { url: "/users/all", method: "GET", isArray: true },
            activate: { url: "/users/:id/activate", method: "PUT" },
            changeRole: { url: "/users/:id/role/:role/update", method: "GET" }
        });
    }
    return SettingResource;
}());
angular.module(moduleSettingResource, [ngResourceId]).service(SettingResourceId, SettingResource);
var StatisticResourceId = "StatisticResource";
var StatisticResource = (function () {
    function StatisticResource($resource) {
        this.$inject = [$resourceId];
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
    return StatisticResource;
}());
angular.module(moduleStatisticResource, [ngResourceId]).service(StatisticResourceId, StatisticResource);
var ProductResourceId = "ProductResource";
var ProductResource = (function () {
    function ProductResource($resource) {
        this.$inject = [$resourceId];
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
            }
        });
    }
    return ProductResource;
}());
angular.module(moduleProductResource, [ngResourceId]).service(ProductResourceId, ProductResource);
var CustomerResourceId = "CustomerResource";
var CustomerResource = (function () {
    function CustomerResource($resource) {
        this.$inject = [$resourceId];
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
    return CustomerResource;
}());
angular.module(moduleCustomerResource, [ngResourceId]).service(CustomerResourceId, CustomerResource);
var SignupResourceId = "SignupResource";
var SignupResource = (function () {
    function SignupResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/api/rest/registrations", {}, {
            signup: { url: "/api/rest/registrations", method: "POST", headers: { "Content-Type": "application/json" } },
            uniqueUsername: { url: "/api/rest/registrations/unique/username", method: "POST", headers: { "Content-Type": "application/json" } },
            uniqueEmail: { url: "/api/rest/registrations/unique/email", method: "POST", headers: { "Content-Type": "application/json" } },
            init: { url: "/api/rest/registrations/init", method: "POST", headers: { "Content-Type": "application/json" } }
        });
    }
    return SignupResource;
}());
angular.module(moduleSignupResource, [ngResourceId]).service(SignupResourceId, SignupResource);
var FileResourceId = "FileResource";
var FileResource = (function () {
    function FileResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/api/rest/files", {}, {
            save: { url: "/api/rest/files", method: "POST" },
            getFileUploadById: { url: "/api/rest/files/:id", method: "GET" },
            getContentByFileUploadId: { url: "/api/rest/files/content/:id", method: "GET", responseType: "arraybuffer" }
        });
    }
    return FileResource;
}());
angular.module(moduleFileResource, [ngResourceId]).service(FileResourceId, FileResource);
var TemplateResourceId = "TemplateResource";
var TemplateResource = (function () {
    function TemplateResource($resource) {
        this.$inject = [$resourceId];
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
    return TemplateResource;
}());
angular.module(moduleTemplateResource, [ngResourceId]).service(TemplateResourceId, TemplateResource);
var SmtpResourceId = "SmtpResource";
var SmtpResource = (function () {
    function SmtpResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/api/rest/smtp", {}, {
            createSmtp: { url: "/api/rest/smtp/:smtpKey", method: "POST" },
            testSmtp: { url: "/api/rest/smtp/test/:id/:smtpKey", method: "GET" },
            getByUserId: { url: "/api/rest/smtp/user/:id", method: "GET" }
        });
    }
    return SmtpResource;
}());
angular.module(moduleSmtpResource, [ngResourceId]).service(SmtpResourceId, SmtpResource);
var NotificationResourceId = "NotificationResource";
var NotificationResource = (function () {
    function NotificationResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/api/rest/notifications", {}, {
            sendNotification: { url: "/api/rest/notifications/users/:senderId/notifications/send/:smtpKey", method: "POST" },
            getNotificationsBySenderId: { url: "/api/rest/notifications/sender/:senderId", method: "GET" }
        });
    }
    return NotificationResource;
}());
angular.module(moduleNotificationResource, [ngResourceId]).service(NotificationResourceId, NotificationResource);
var TenantResourceId = "TenantResource";
var TenantResource = (function () {
    function TenantResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/api/rest/tenants", {}, {
            save: { url: "/api/rest/tenants", method: "POST" },
            uniqueTenantKey: { url: "/api/rest/tenants/unique/key", method: "POST" }
        });
    }
    return TenantResource;
}());
angular.module(moduleTenantResource, [ngResourceId]).service(TenantResourceId, TenantResource);
var SourceResourceId = "SourceResource";
var SourceResource = (function () {
    function SourceResource($resource) {
        this.$inject = [$resourceId];
        this.resource = $resource("/api/rest/source", {}, {
            getSourceById: { url: "/api/rest/source/:id", method: "GET" },
            getAllSources: { url: "/api/rest/source", method: "GET", isArray: true },
            createSource: { url: "/api/rest/source", method: "POST" },
            updateSource: { url: "/api/rest/source", method: "PUT" },
            deleteSource: { url: "/api/rest/source", method: "DELETE" }
        });
    }
    return SourceResource;
}());
angular.module(moduleSourceResource, [ngResourceId]).service(SourceResourceId, SourceResource);

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var findElementById = function (array, id) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return array[i];
        }
    }
    return null;
};
var isNullOrUndefined = function (object) {
    return object === null || typeof object === "undefined";
};
var hasLicense = function (userLicense, routeLicense) {
    if (isNullOrUndefined(userLicense) || isNullOrUndefined(routeLicense)) {
        return false;
    }
    else if (userLicense.package.indexOf(routeLicense) !== -1 && moment(userLicense.term, "DD.MM.YYYY").isAfter(moment(newTimestamp(), "DD.MM.YYYY"))) {
        return true;
    }
    return false;
};
var getNameOfUser = function (user) {
    if (isNullOrUndefined(user)) {
        return "";
    }
    else if (!isNullOrUndefined(user.firstname) && user.firstname !== "" && !isNullOrUndefined(user.lastname) && user.lastname !== "") {
        return user.firstname + " " + user.lastname;
    }
    else {
        return user.email;
    }
};
var deepCopy = function (old) {
    if (isNullOrUndefined(old)) {
        return old;
    }
    return JSON.parse(JSON.stringify(old));
};
var shallowCopy = function (oldObject, newObject) {
    for (var propertyName in oldObject) {
        newObject[propertyName] = oldObject[propertyName];
    }
    if (!isNullOrUndefined(oldObject["id"])) {
        newObject["id"] = oldObject["id"];
    }
};
var newTimestamp = function () {
    var pattern = "DD.MM.YYYY HH:mm:ss:SSS";
    var timezone = jstz.determine().name();
    var date = moment.utc();
    return date.format(pattern);
};
var toLocalDate = function (date, pattern) {
    if (pattern === void 0) { pattern = "DD.MM.YYYY HH:mm:ss"; }
    var timezone = jstz.determine().name();
    var currentDateUtc = moment.utc(date, pattern);
    var currentDateLocal = currentDateUtc.tz(timezone);
    if (currentDateLocal.isDST()) {
        currentDateLocal.add(-1, "h");
    }
    return currentDateLocal.format(pattern);
};
var partial = function (func, _a) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var allArguments = args.concat(Array.prototype.slice.call(arguments));
        return func.apply(this, allArguments);
    };
};
var size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
        }
    }
    return size;
};
var escapeHtmlBrackets = function (html) {
    return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
var unescapeHtmlBrackets = function (html) {
    return html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};
var unescapeHtmlQuote = function (html) {
    return html.replace(/&quot;/g, "'");
};
var sha256ToBase64 = function (text, iterations) {
    if (isNullOrUndefined(text) || text === "") {
        return;
    }
    if (isNaN(iterations) || iterations <= 0) {
        iterations = 1;
    }
    var hash = btoa(text);
    for (var i = 0; i < iterations; i++) {
        hash = sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(atob(hash)));
    }
    return hash;
};
var hashPasswordSha256 = function (password) {
    return sha256ToBase64(password, 10000);
};
var hashPasswordPbkdf2 = function (password, salt) {
    return sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(password, salt, 10000));
};
var handleError = function (error) {
    console.log(error);
};
var stringIsNullorEmpty = function (text) {
    if (isNullOrUndefined(text)) {
        return true;
    }
    return text === "";
};
var b64toBlob = function (b64Data, contentType, sliceSize) {
    if (sliceSize === void 0) { sliceSize = 512; }
    contentType = contentType || "";
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
};
var contains = function (array, obj) {
    var i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
};
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function sleep(ms) {
    if (ms === void 0) { ms = 1000; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 , setTimeout(function () {
                    }, ms)];
                case 1:
                    _a.sent();
                    return [2 ];
            }
        });
    });
}

var Credentials = (function () {
    function Credentials() {
    }
    return Credentials;
}());

var AuthServiceId = "AuthService";
var AuthService = (function () {
    function AuthService($http, $rootScope, $cookies, $location, $window, UserResource, $injector, $q) {
        this.$inject = [$httpId, $rootScopeId, $cookiesId, $locationId, $windowId, UserResourceId, $injectorId, $qId];
        this.http = $http;
        this.$q = $q;
        this.rootScope = $rootScope;
        this.cookies = $cookies;
        this.location = $location;
        this.window = $window;
        this.userResource = UserResource.resource;
        this.injector = $injector;
    }
    AuthService.prototype.login = function (credentials) {
        var self = this;
        var defer = this.$q.defer();
        if (credentials) {
            var salt_1 = credentials.email;
            var hashedPassword_1 = hashPasswordPbkdf2(credentials.password, salt_1);
            console.log("Hashed:", hashedPassword_1);
            console.log("Hashed:", hashedPassword_1.length);
            var authorization_1 = btoa(credentials.email + ":" + hashedPassword_1);
            console.log("Authorization: ", authorization_1);
            var header = credentials ? { Authorization: "Basic " + authorization_1 } : {};
            this.http.defaults.headers.common["Authorization"] = "Basic " + authorization_1;
            this.http.defaults.headers.common["X-TenantID"] = credentials.tenant;
            this.http.get("user").then(function (response) {
                var data = response.data;
                if (data) {
                    self.rootScope.user = {
                        id: data.id,
                        role: data.role,
                        email: data.email,
                        tenant: data.tenant,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        phone: data.phone,
                        language: data.language,
                        defaultVat: data.defaultVat,
                        smtpKey: encodeURIComponent(hashPasswordPbkdf2(hashedPassword_1, salt_1)),
                        authorization: authorization_1,
                        picture: data.picture,
                        thumbnail: data.thumbnail
                    };
                    console.log("SMTP:", hashPasswordPbkdf2(hashedPassword_1, salt_1));
                    console.log("USER: ", self.rootScope.user);
                    self.rootScope.tenant = {
                        tenantKey: credentials.tenant,
                        license: {
                            package: ["basic", "pro", "ultimate"],
                            term: "09.12.2020",
                            trial: false
                        }
                    };
                    if (!hasLicense(self.rootScope.tenant.license, "basic")) {
                        alert("Lizenz abgelaufen am: " + self.rootScope.tenant.license.term);
                        self.rootScope.user = null;
                        self.rootScope.tenant = null;
                        defer.reject(false);
                    }
                    else {
                        self.http.defaults.headers.common["Authorization"] = "Basic " + authorization_1;
                        self.http.defaults.headers.common["X-TenantID"] = credentials.tenant;
                        var date = new Date();
                        date = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
                        self.cookies.putObject("user", self.rootScope.user, { domain: credentials.tenant, path: "/", expires: date });
                        self.cookies.putObject("tenant", self.rootScope.tenant, { domain: credentials.tenant, path: "/", expires: date });
                        self.rootScope.$broadcast(broadcastOnTodosChanged);
                        defer.resolve(true);
                    }
                }
                else {
                    defer.reject(false);
                }
            }, (function (error) {
                defer.reject(false);
            }));
        }
        else {
            defer.reject(false);
        }
        return defer.promise;
    };
    AuthService.prototype.logout = function () {
        this.cookies.remove("user", { domain: this.location.host(), path: "/" });
        this.cookies.remove("tenant", { domain: this.location.host(), path: "/" });
        this.http.defaults.headers.common.Authorization = "Basic";
        var port = this.location.port();
        port = ":" + port;
        if (port !== ":8080") {
            port = "";
        }
        window.open("https://" + this.location.host() + port, "_self");
    };
    return AuthService;
}());
angular.module(moduleAuthService, [ngResourceId]).service(AuthServiceId, AuthService);

var ProductState;
(function (ProductState) {
    ProductState[ProductState["NEW"] = "NEW"] = "NEW";
    ProductState[ProductState["USED_A"] = "USED_A"] = "USED_A";
    ProductState[ProductState["USED_B"] = "USED_B"] = "USED_B";
    ProductState[ProductState["USED_C"] = "USED_C"] = "USED_C";
    ProductState[ProductState["USED_D"] = "USED_D"] = "USED_D";
})(ProductState || (ProductState = {}));

var Product = (function () {
    function Product() {
        this.name = "";
        this.description = "";
        this.deactivated = false;
        this.productState = ProductState.NEW;
    }
    return Product;
}());

var OrderPosition = (function () {
    function OrderPosition() {
    }
    return OrderPosition;
}());

var Customer = (function () {
    function Customer() {
    }
    return Customer;
}());


var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["LEAD"] = "LEAD"] = "LEAD";
    NotificationType[NotificationType["OFFER"] = "OFFER"] = "OFFER";
    NotificationType[NotificationType["FOLLOWUP"] = "FOLLOWUP"] = "FOLLOWUP";
    NotificationType[NotificationType["SALE"] = "SALE"] = "SALE";
    NotificationType[NotificationType["ERROR"] = "ERROR"] = "ERROR";
    NotificationType[NotificationType["getAll"] = function () {
        return Object.keys(NotificationType).filter(function (f) { return f !== "getAll"; }).map(function (k) { return NotificationType[k]; }).filter(function (f) { return f !== "getAll"; });
    }] = "getAll";
})(NotificationType || (NotificationType = {}));

var Notification = (function () {
    function Notification() {
    }
    return Notification;
}());

var Lead = (function () {
    function Lead() {
        this.deliveryCosts = 0;
        this.customer = new Customer();
        this.customer.firstname = "";
        this.customer.lastname = "";
    }
    return Lead;
}());

var Offer = (function () {
    function Offer() {
        this.deliveryCosts = 0;
        this.netPrice = 0;
        this.vat = 0;
    }
    return Offer;
}());

var Sale = (function () {
    function Sale() {
        this.deliveryCosts = 0;
        this.saleCost = 0;
        this.saleTurnover = 0;
        this.saleProfit = 0;
    }
    return Sale;
}());

var ProductServiceId = "ProductService";
var ProductService = (function () {
    function ProductService(toaster, $translate, ProductResource, $q) {
        this.$inject = [toasterId, $translateId, ProductResourceId, $qId];
        this.toaster = toaster;
        this.translate = $translate;
        this.q = $q;
        this.productResource = ProductResource.resource;
        this.products = new Array();
        this.formdata = new FormData();
        this.getAllProducts();
    }
    ProductService.prototype.saveProduct = function (product, insert) {
        var self = this;
        if (insert) {
            product.timestamp = newTimestamp();
            this.productResource.createProduct(product).$promise.then(function (result) {
                self.getAllProducts();
                self.toaster.pop("success", "", self.translate.instant("PRODUCT_TOAST_SAVE"));
            }, function () {
                self.toaster.pop("error", "", self.translate.instant("PRODUCT_TOAST_SAVE_ERROR"));
            });
        }
        else {
            this.productResource.createProduct(product).$promise.then(function (result) {
                self.getAllProducts();
                self.toaster.pop("success", "", self.translate.instant("PRODUCT_TOAST_UPDATE"));
            }, function () {
                self.toaster.pop("error", "", self.translate.instant("PRODUCT_TOAST_UPDATE_ERROR"));
            });
        }
    };
    ProductService.prototype.getAllProducts = function () {
        var defer = this.q.defer();
        var self = this;
        this.productResource.getAllProducts().$promise.then(function (result) {
            self.products = result;
            defer.resolve(self.products);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };
    ProductService.prototype.getActiveProducts = function () {
        var temp = new Array();
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var product = _a[_i];
            if (product.deactivated === false) {
                temp.push(product);
            }
        }
        return temp;
    };
    ProductService.prototype.getTheFiles = function ($files) {
        this.formdata.append("file", $files[0]);
    };
    return ProductService;
}());
angular.module(moduleProductService, [ngResourceId]).service(ProductServiceId, ProductService);

var Commentary = (function () {
    function Commentary() {
        this.commentText = "";
        this.timestamp = "";
    }
    return Commentary;
}());

var Status;
(function (Status) {
    Status[Status["OPEN"] = "OPEN"] = "OPEN";
    Status[Status["OFFER"] = "OFFER"] = "OFFER";
    Status[Status["FOLLOWUP"] = "FOLLOWUP"] = "FOLLOWUP";
    Status[Status["DONE"] = "DONE"] = "DONE";
    Status[Status["SALE"] = "SALE"] = "SALE";
    Status[Status["CLOSED"] = "CLOSED"] = "CLOSED";
    Status[Status["INCONTACT"] = "INCONTACT"] = "INCONTACT";
})(Status || (Status = {}));

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ProcessServiceId = "ProcessService";
var ProcessService = (function () {
    function ProcessService(ProcessResource, CustomerService, toaster, $rootScope, $translate) {
        this.$inject = [ProcessResourceId, CustomerServiceId, toasterId, $rootScopeId, $translateId];
        this.processResource = ProcessResource.resource;
        this.customerService = CustomerService;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
    }
    ProcessService.prototype.save = function (editProcess, editWorkflowUnit, updateRow, deleteRow) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, resultProcess;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!isNullOrUndefined(editWorkflowUnit) && isNullOrUndefined(editWorkflowUnit.customer.id)))
                            return [3 , 2];
                        editWorkflowUnit.customer.timestamp = newTimestamp();
                        _a = editWorkflowUnit;
                        return [4 , this.customerService.insertCustomer(editWorkflowUnit.customer)];
                    case 1:
                        _a.customer = (_b.sent());
                        _b.label = 2;
                    case 2: return [4 , this.processResource.save(editProcess).$promise];
                    case 3:
                        resultProcess = _b.sent();
                        if (updateRow === true) {
                            this.rootScope.$broadcast(broadcastUpdate, resultProcess);
                        }
                        if (deleteRow === true) {
                            this.rootScope.$broadcast(broadcastRemove, resultProcess);
                        }
                        this.rootScope.$broadcast(broadcastOnTodosChanged);
                        return [2 , resultProcess];
                }
            });
        });
    };
    ProcessService.prototype["delete"] = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isNullOrUndefined(process)) {
                            return [2 ];
                        }
                        return [4 , this.processResource.drop({ id: process.id }).$promise];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    ProcessService.prototype.setStatus = function (process, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isNullOrUndefined(process) || isNullOrUndefined(status)) {
                            return [2 ];
                        }
                        return [4 , this.processResource.setStatus({ id: process.id }, status).$promise];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    ProcessService.prototype.setProcessor = function (process, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isNullOrUndefined(process) || isNullOrUndefined(user)) {
                            return [2 ];
                        }
                        return [4 , this.processResource.setProcessor({ id: process.id }, user.id).$promise];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    ProcessService.prototype.removeProcessor = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isNullOrUndefined(process)) {
                            return [2 ];
                        }
                        return [4 , this.processResource.removeProcessor({ id: process.id }).$promise];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    return ProcessService;
}());
angular.module(moduleProcessService, [ngResourceId]).service(ProcessServiceId, ProcessService);

var WorkflowType;
(function (WorkflowType) {
    WorkflowType[WorkflowType["LEAD"] = "LEAD"] = "LEAD";
    WorkflowType[WorkflowType["OFFER"] = "OFFER"] = "OFFER";
    WorkflowType[WorkflowType["SALE"] = "SALE"] = "SALE";
})(WorkflowType || (WorkflowType = {}));


var Source = (function () {
    function Source() {
    }
    return Source;
}());

var Activity;
(function (Activity) {
    Activity[Activity["OPEN"] = "OPEN"] = "OPEN";
    Activity[Activity["OFFER"] = "OFFER"] = "OFFER";
    Activity[Activity["SALE"] = "SALE"] = "SALE";
    Activity[Activity["INCONTACT"] = "INCONTACT"] = "INCONTACT";
    Activity[Activity["DONE"] = "DONE"] = "DONE";
})(Activity || (Activity = {}));

var Processor = (function () {
    function Processor(user, activity) {
        if (user === void 0) { user = undefined; }
        if (activity === void 0) { activity = undefined; }
        this.user = user;
        this.activity = activity;
        this.timestamp = newTimestamp();
    }
    return Processor;
}());

var Process = (function () {
    function Process() {
        this.comments = new Array();
        this.formerProcessors = [];
    }
    return Process;
}());

var ActionButtonType;
(function (ActionButtonType) {
    ActionButtonType[ActionButtonType["CREATE_NEXT_WORKFLOWUNIT"] = "CREATE_NEXT_WORKFLOWUNIT"] = "CREATE_NEXT_WORKFLOWUNIT";
    ActionButtonType[ActionButtonType["PIN_DROPDOWN"] = "PIN_DROPDOWN"] = "PIN_DROPDOWN";
    ActionButtonType[ActionButtonType["PIN_DROPDOWN_EMPTY_PROCESSOR"] = "PIN_DROPDOWN_EMPTY_PROCESSOR"] = "PIN_DROPDOWN_EMPTY_PROCESSOR";
    ActionButtonType[ActionButtonType["PIN_BUTTON"] = "PIN_BUTTON"] = "PIN_BUTTON";
    ActionButtonType[ActionButtonType["SET_INCONTACT"] = "SET_INCONTACT"] = "SET_INCONTACT";
    ActionButtonType[ActionButtonType["QUICK_MAIL"] = "QUICK_MAIL"] = "QUICK_MAIL";
    ActionButtonType[ActionButtonType["SET_OFFER_DONE"] = "SET_OFFER_DONE"] = "SET_OFFER_DONE";
    ActionButtonType[ActionButtonType["DETAILS_DROPDOWN"] = "DETAILS_DROPDOWN"] = "DETAILS_DROPDOWN";
    ActionButtonType[ActionButtonType["DETAILS_TOGGLE_CLOSE_OR_OPEN"] = "DETAILS_TOGGLE_CLOSE_OR_OPEN"] = "DETAILS_TOGGLE_CLOSE_OR_OPEN";
    ActionButtonType[ActionButtonType["DETAILS_OPEN_EDIT_MODAL"] = "DETAILS_OPEN_EDIT_MODAL"] = "DETAILS_OPEN_EDIT_MODAL";
    ActionButtonType[ActionButtonType["DETAILS_OPEN_ROLLBACK_MODAL"] = "DETAILS_OPEN_ROLLBACK_MODAL"] = "DETAILS_OPEN_ROLLBACK_MODAL";
    ActionButtonType[ActionButtonType["DETAILS_OPEN_DELETE_MODAL"] = "DETAILS_OPEN_DELETE_MODAL"] = "DETAILS_OPEN_DELETE_MODAL";
})(ActionButtonType || (ActionButtonType = {}));

var ActionButtonConfig = (function () {
    function ActionButtonConfig(type) {
        this.type = type;
        this.visible = false;
        this.disabled = true;
    }
    ActionButtonConfig.prototype.setEnabled = function (enabled) {
        if (enabled === void 0) { enabled = true; }
        this.disabled = !enabled;
        this.visible = enabled ? true : this.visible;
        return this;
    };
    ActionButtonConfig.prototype.setVisible = function (visible) {
        if (visible === void 0) { visible = true; }
        this.visible = visible;
        return this;
    };
    ActionButtonConfig.prototype.setTitle = function (title) {
        this.title = title;
        return this;
    };
    ActionButtonConfig.prototype.setIcon = function (icon) {
        this.icon = icon;
        return this;
    };
    return ActionButtonConfig;
}());

var ActionButtonConfigBuilder = (function () {
    function ActionButtonConfigBuilder() {
        this.actionButtons = {};
        this.actionButtons[ActionButtonType.CREATE_NEXT_WORKFLOWUNIT] = new ActionButtonConfig(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT);
        this.actionButtons[ActionButtonType.PIN_DROPDOWN] = new ActionButtonConfig(ActionButtonType.PIN_DROPDOWN);
        this.actionButtons[ActionButtonType.PIN_DROPDOWN_EMPTY_PROCESSOR] = new ActionButtonConfig(ActionButtonType.PIN_DROPDOWN_EMPTY_PROCESSOR);
        this.actionButtons[ActionButtonType.PIN_BUTTON] = new ActionButtonConfig(ActionButtonType.PIN_BUTTON);
        this.actionButtons[ActionButtonType.SET_INCONTACT] = new ActionButtonConfig(ActionButtonType.SET_INCONTACT);
        this.actionButtons[ActionButtonType.QUICK_MAIL] = new ActionButtonConfig(ActionButtonType.QUICK_MAIL);
        this.actionButtons[ActionButtonType.SET_OFFER_DONE] = new ActionButtonConfig(ActionButtonType.SET_OFFER_DONE);
        this.actionButtons[ActionButtonType.DETAILS_DROPDOWN] = new ActionButtonConfig(ActionButtonType.DETAILS_DROPDOWN);
        this.actionButtons[ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN] = new ActionButtonConfig(ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN);
        this.actionButtons[ActionButtonType.DETAILS_OPEN_EDIT_MODAL] = new ActionButtonConfig(ActionButtonType.DETAILS_OPEN_EDIT_MODAL);
        this.actionButtons[ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL] = new ActionButtonConfig(ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL);
        this.actionButtons[ActionButtonType.DETAILS_OPEN_DELETE_MODAL] = new ActionButtonConfig(ActionButtonType.DETAILS_OPEN_DELETE_MODAL);
    }
    ActionButtonConfigBuilder.prototype.get = function (type) {
        return this.actionButtons[type];
    };
    ActionButtonConfigBuilder.prototype.disableAll = function () {
        for (var actionButtonConfig in this.actionButtons) {
            this.actionButtons[actionButtonConfig].setEnabled(false);
        }
    };
    ActionButtonConfigBuilder.prototype.build = function () {
        return this.actionButtons;
    };
    return ActionButtonConfigBuilder;
}());


var AbstractStatisticModel = (function () {
    function AbstractStatisticModel(translate, id) {
        this.translate = translate;
        this.id = id;
    }
    AbstractStatisticModel.prototype.getId = function () {
        return this.id;
    };
    AbstractStatisticModel.prototype.pushData = function (name, data, color) {
        this.chartConfig.series.push({
            name: this.translate.instant(name),
            data: data,
            color: color
        });
    };
    AbstractStatisticModel.prototype.clearData = function () {
        this.chartConfig.series = [];
    };
    return AbstractStatisticModel;
}());


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PieChart = (function (_super) {
    __extends(PieChart, _super);
    function PieChart(translate, id, seriesName, tooltip) {
        var _this = _super.call(this, translate, id) || this;
        _this.translate = translate;
        _this.chartConfig = {
            options: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: "pie"
                },
                title: {
                    text: ""
                },
                tooltip: {
                    pointFormat: tooltip
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true,
                            format: "<b>{point.y} {point.name} </b>",
                            style: {
                                color: (window["Highcharts"].theme && window["Highcharts"].theme.contrastTextColor) || "black"
                            }
                        }
                    }
                }
            },
            series: [{
                    name: _this.translate.instant(seriesName),
                    colorByPoint: true,
                    data: []
                }],
            loading: false
        };
        return _this;
    }
    PieChart.prototype.pushData = function (name, data, color, slice, selected) {
        if (slice === void 0) { slice = false; }
        if (selected === void 0) { selected = false; }
        this.chartConfig.series[0].data.push({
            name: this.translate.instant(name),
            y: data[0],
            color: color,
            sliced: slice,
            selected: selected
        });
    };
    PieChart.prototype.clearData = function () {
        this.chartConfig.series[0].data = [];
    };
    return PieChart;
}(AbstractStatisticModel));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AreaChart = (function (_super) {
    __extends(AreaChart, _super);
    function AreaChart(translate, id, yname, valueSuffix) {
        var _this = _super.call(this, translate, id) || this;
        _this.chartConfig = {
            options: {
                chart: {
                    type: "area"
                },
                title: {
                    text: ""
                },
                tooltip: {
                    shared: true,
                    valueSuffix: valueSuffix,
                    valueDecimals: 2
                },
                xAxis: {
                    categories: []
                },
                loading: false,
                yAxis: {
                    title: {
                        text: _this.translate.instant(yname)
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                }
            },
            series: []
        };
        return _this;
    }
    return AreaChart;
}(AbstractStatisticModel));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ColumnChart = (function (_super) {
    __extends(ColumnChart, _super);
    function ColumnChart(translate, id, yname, valueSuffix, tooltip, categories) {
        var _this = _super.call(this, translate, id) || this;
        _this.chartConfig = {
            options: {
                chart: {
                    type: "column"
                },
                title: {
                    text: ""
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    title: {
                        text: ""
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: tooltip
                }
            },
            series: [{
                    name: _this.translate.instant(yname),
                    colorByPoint: true,
                    data: []
                }],
            loading: false
        };
        return _this;
    }
    ColumnChart.prototype.pushData = function (name, data, color) {
        this.chartConfig.series[0].data.push({
            name: this.translate.instant(name),
            y: data[0],
            color: color
        });
    };
    ColumnChart.prototype.clearData = function () {
        this.chartConfig.series[0].data = [];
    };
    return ColumnChart;
}(AbstractStatisticModel));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SplineChart = (function (_super) {
    __extends(SplineChart, _super);
    function SplineChart(translate, id, yName, valueSuffix) {
        var _this = _super.call(this, translate, id) || this;
        _this.translate = translate;
        _this.chartConfig = {
            options: {
                chart: {
                    type: "spline"
                },
                title: "",
                tooltip: {
                    shared: true,
                    valueSuffix: valueSuffix
                },
                loading: false,
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: _this.translate.instant(yName)
                    },
                    plotLines: [{
                            value: 0,
                            width: 1,
                            color: "#808080"
                        }]
                }
            },
            series: [],
            func: function (chart) {
            }
        };
        return _this;
    }
    return SplineChart;
}(AbstractStatisticModel));


var StatisticServiceId = "StatisticService";
var StatisticService = (function () {
    function StatisticService(toaster, $translate, StatisticResource, $q) {
        this.$inject = [toasterId, $translateId, StatisticResourceId, $qId];
        this.statisticModelMap = {};
        this.leadResultArr = new Array();
        this.offerResultArr = new Array();
        this.saleResultArr = new Array();
        this.profitResultArr = new Array();
        this.turnoverResultArr = new Array();
        this.profitTotal = 0;
        this.turnoverTotal = 0;
        this.leadAmount = 0;
        this.offerAmount = 0;
        this.saleAmount = 0;
        this.singleStatisticEfficiency = 0;
        this.singleStatisticLeadConversionRate = 0;
        this.singleStatisticOfferConversionRate = 0;
        this.singleStatisticProfitPerSale = 0;
        this.isLeadPromise = false;
        this.isOfferPromise = false;
        this.isSalePromise = false;
        this.isProfitPromise = false;
        this.isTurnoverPromise = false;
        this.weekday = new Array(7);
        this.month = new Array(12);
        this.toaster = toaster;
        this.translate = $translate;
        this.statisticResource = StatisticResource.resource;
        this.setAllModels();
        this.setWeekDayTranslationsArray();
        this.setMonthTranslationsArray();
        this.q = $q;
    }
    StatisticService.prototype.setAllModels = function () {
        this.SingleStatisticWorkflowPieChart = new PieChart(this.translate, "SPLOS", "STATISTIC_PARTS", "{series.name}: <b>{point.percentage:.1f}%</b>");
        this.EntireStatisticProfitTurnoverAreaChart = new AreaChart(this.translate, "EATAP", "STATISTIC_PROFIT_AND_RETURN_Y_AXIS", " €");
        this.EntireStatisticWorkflowAmountSplineChart = new SplineChart(this.translate, "ESLOS", "STATISTIC_LEADS_OFFERS_SALES_Y_AXIS", "");
        this.EntireStatisticLeadConversionRateSplineChart = new SplineChart(this.translate, "ESLSCR", "STATISTIC_SALES_OF_LEADS_Y_AXIS", " %");
        this.EntireStatisticOfferConversionRateSplineChart = new SplineChart(this.translate, "ESOSCR", "STATISTIC_SALES_OF_OFFERS_Y_AXIS", " %");
        this.statisticModelMap[this.SingleStatisticWorkflowPieChart.getId()] = this.SingleStatisticWorkflowPieChart;
        this.statisticModelMap[this.EntireStatisticWorkflowAmountSplineChart.getId()] = this.EntireStatisticWorkflowAmountSplineChart;
        this.statisticModelMap[this.EntireStatisticProfitTurnoverAreaChart.getId()] = this.EntireStatisticProfitTurnoverAreaChart;
        this.statisticModelMap[this.EntireStatisticLeadConversionRateSplineChart.getId()] = this.EntireStatisticLeadConversionRateSplineChart;
        this.statisticModelMap[this.EntireStatisticOfferConversionRateSplineChart.getId()] = this.EntireStatisticOfferConversionRateSplineChart;
    };
    StatisticService.prototype.generateMyStatistic = function (user) {
        if (!isNullOrUndefined(user.id)) {
            this.MyUserStatisticColumnChart = new PieChart(this.translate, "SPCLOS", getNameOfUser(user), this.translate.instant("DETAIL_STATISTIC_USER_TOOLTIP", { username: "{series.name}", count: "{point.y}", workflow: "{point.name}" }) + "<br>" + this.translate.instant("STATISTIC_PARTS") + ": <b>{point.percentage:.1f}%</b>");
        }
    };
    StatisticService.prototype.getChartModelById = function (id) {
        return this.statisticModelMap[id];
    };
    StatisticService.prototype.clearAllModelsData = function () {
        this.SingleStatisticWorkflowPieChart.clearData();
        this.EntireStatisticWorkflowAmountSplineChart.clearData();
        this.EntireStatisticProfitTurnoverAreaChart.clearData();
        this.EntireStatisticLeadConversionRateSplineChart.clearData();
        this.EntireStatisticOfferConversionRateSplineChart.clearData();
    };
    StatisticService.prototype.setWeekDayTranslationsArray = function () {
        this.weekday[0] = this.translate.instant("SUNDAY");
        this.weekday[1] = this.translate.instant("MONDAY");
        this.weekday[2] = this.translate.instant("TUESDAY");
        this.weekday[3] = this.translate.instant("WEDNESDAY");
        this.weekday[4] = this.translate.instant("THURSDAY");
        this.weekday[5] = this.translate.instant("FRIDAY");
        this.weekday[6] = this.translate.instant("SATURDAY");
    };
    StatisticService.prototype.getWeekTranslation = function () {
        return this.weekday;
    };
    StatisticService.prototype.setMonthTranslationsArray = function () {
        this.month[0] = this.translate.instant("JANUARY");
        this.month[1] = this.translate.instant("FEBRUARY");
        this.month[2] = this.translate.instant("MARCH");
        this.month[3] = this.translate.instant("APRIL");
        this.month[4] = this.translate.instant("MAY");
        this.month[5] = this.translate.instant("JUNE");
        this.month[6] = this.translate.instant("JULY");
        this.month[7] = this.translate.instant("AUGUST");
        this.month[8] = this.translate.instant("SEPTEMBER");
        this.month[9] = this.translate.instant("OCTOBER");
        this.month[10] = this.translate.instant("NOVEMBER");
        this.month[11] = this.translate.instant("DECEMBER");
    };
    StatisticService.prototype.checkPromises = function () {
        if (this.isLeadPromise === true && this.isOfferPromise === true &&
            this.isSalePromise === true && this.isProfitPromise === true &&
            this.isTurnoverPromise === true) {
            this.singleStatisticEfficiency = this.getRatePercentage(this.profitTotal, this.turnoverTotal);
            this.singleStatisticProfitPerSale = (this.getRatePercentage(this.profitTotal, this.saleAmount)) / 100;
            this.singleStatisticLeadConversionRate = this.getRatePercentage(this.saleAmount, this.leadAmount);
            this.singleStatisticOfferConversionRate = this.getRatePercentage(this.saleAmount, this.offerAmount);
            this.pushToProfitAndTurnoverAreaChart();
            this.pushToWorkflowPieChart();
            this.pushToWorkflowAmountSplineChart();
            this.pushConversionRateSplineChartByModel(this.EntireStatisticLeadConversionRateSplineChart, this.saleResultArr, this.leadResultArr, "STATISTIC_SALES_OF_LEADS", "#ed5565");
            this.pushConversionRateSplineChartByModel(this.EntireStatisticOfferConversionRateSplineChart, this.saleResultArr, this.offerResultArr, "STATISTIC_SALES_OF_OFFERS", "#f8ac59");
        }
    };
    StatisticService.prototype.setPromises = function (value) {
        this.isLeadPromise = value;
        this.isOfferPromise = value;
        this.isSalePromise = value;
        this.isProfitPromise = value;
        this.isTurnoverPromise = value;
    };
    StatisticService.prototype.loadAllResourcesByDateRange = function (dateRange, source) {
        this.loadWorkflowResourcesByDateRange(dateRange, source);
        this.loadProfitResourcesByDateRange(dateRange, source);
        this.loadTurnoverResourcesByDateRange(dateRange, source);
        this.loadProductResourcesByDateRange(dateRange, source);
        this.loadUserStatisticResourcesByDateRange(dateRange, source);
    };
    StatisticService.prototype.loadWorkflowResourcesByDateRange = function (dateRange, source) {
        var self = this;
        this.statisticResource.getWorkflowStatistic({ workflow: WorkflowType.LEAD, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.leadResultArr = result;
            self.leadAmount = self.getTotalSumOf(self.leadResultArr);
            self.isLeadPromise = true;
            self.checkPromises();
        });
        this.statisticResource.getWorkflowStatistic({ workflow: WorkflowType.OFFER, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.offerResultArr = result;
            self.offerAmount = self.getTotalSumOf(self.offerResultArr);
            self.isOfferPromise = true;
            self.checkPromises();
        });
        this.statisticResource.getWorkflowStatistic({ workflow: WorkflowType.SALE, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.saleResultArr = result;
            self.saleAmount = self.getTotalSumOf(self.saleResultArr);
            self.isSalePromise = true;
            self.checkPromises();
        });
    };
    StatisticService.prototype.loadProfitResourcesByDateRange = function (dateRange, source) {
        var self = this;
        this.statisticResource.getProfitStatistic({ workflow: WorkflowType.SALE, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.profitResultArr = result;
            self.profitTotal = self.getTotalSumOf(self.profitResultArr);
            self.isProfitPromise = true;
            self.checkPromises();
        });
    };
    StatisticService.prototype.loadTurnoverResourcesByDateRange = function (dateRange, source) {
        var self = this;
        this.statisticResource.getTurnoverStatistic({ workflow: WorkflowType.SALE, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.turnoverResultArr = result;
            self.turnoverTotal = self.getTotalSumOf(self.turnoverResultArr);
            self.isTurnoverPromise = true;
            self.checkPromises();
        });
    };
    StatisticService.prototype.loadProductResourcesByDateRange = function (dateRange, source) {
        var self = this;
        this.statisticResource.getProductStatistic({ workflow: WorkflowType.SALE, dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.productStatisticArr = result;
        });
    };
    StatisticService.prototype.loadUserStatisticResourcesByDateRange = function (dateRange, source) {
        var self = this;
        this.statisticResource.getUserStatistic({ dateRange: dateRange, source: source }).$promise.then(function (result) {
            self.userStatisticArr = result;
        });
    };
    StatisticService.prototype.setTimeSegmentByDateRange = function (dateRange) {
        var currentDate = new Date();
        var oneYearAgo = new Date();
        var timeSegment = new Array();
        switch (dateRange) {
            case "DAILY": {
                break;
            }
            case "WEEKLY": {
                var oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
                while (oneWeekAgo <= currentDate) {
                    timeSegment.push(this.weekday[oneWeekAgo.getDay()]);
                    oneWeekAgo.setDate(oneWeekAgo.getDate() + 1);
                }
                break;
            }
            case "MONTHLY": {
                var oneMonthAgo = new Date();
                oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
                while (oneMonthAgo <= currentDate) {
                    timeSegment.push(oneMonthAgo.getDate() + ". " + this.month[oneMonthAgo.getMonth()]);
                    oneMonthAgo.setDate(oneMonthAgo.getDate() + 1);
                }
                break;
            }
            case "YEARLY": {
                oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                while (oneYearAgo <= currentDate) {
                    timeSegment.push(this.month[oneYearAgo.getMonth()]);
                    oneYearAgo.setMonth(oneYearAgo.getMonth() + 1);
                }
                timeSegment.push(oneYearAgo.toUTCString().split(" ")[2]);
                break;
            }
            case "ALL": {
                oneYearAgo = new Date(2014, 1, 1);
                while (oneYearAgo <= currentDate) {
                    timeSegment.push(oneYearAgo.getFullYear().toString());
                    oneYearAgo.setFullYear(oneYearAgo.getFullYear() + 1);
                }
                break;
            }
            default: {
            }
        }
        this.setTimeSegment(timeSegment);
        return timeSegment;
    };
    StatisticService.prototype.setTimeSegment = function (timeSegment) {
        this.EntireStatisticProfitTurnoverAreaChart.chartConfig.options.xAxis.categories = timeSegment;
        this.EntireStatisticWorkflowAmountSplineChart.chartConfig.options.xAxis.categories = timeSegment;
        this.EntireStatisticLeadConversionRateSplineChart.chartConfig.options.xAxis.categories = timeSegment;
        this.EntireStatisticOfferConversionRateSplineChart.chartConfig.options.xAxis.categories = timeSegment;
    };
    StatisticService.prototype.getMonthTranslation = function () {
        return this.month;
    };
    StatisticService.prototype.pushToWorkflowPieChart = function () {
        this.SingleStatisticWorkflowPieChart.pushData("LEADS_MENU", [this.leadAmount], "#ed5565");
        this.SingleStatisticWorkflowPieChart.pushData("OFFERS_MENU", [this.offerAmount], "#f8ac59");
        this.SingleStatisticWorkflowPieChart.pushData("SALES_MENU", [this.saleAmount], "#1a7bb9", true, true);
    };
    StatisticService.prototype.pushToWorkflowAmountSplineChart = function () {
        this.EntireStatisticWorkflowAmountSplineChart.pushData("LEADS_MENU", this.leadResultArr, "#ed5565");
        this.EntireStatisticWorkflowAmountSplineChart.pushData("OFFERS_MENU", this.offerResultArr, "#f8ac59");
        this.EntireStatisticWorkflowAmountSplineChart.pushData("SALES_MENU", this.saleResultArr, "#1a7bb9");
    };
    StatisticService.prototype.pushToProfitAndTurnoverAreaChart = function () {
        this.EntireStatisticProfitTurnoverAreaChart.pushData("STATISTIC_TURNOVER", this.turnoverResultArr, "#000000");
        this.EntireStatisticProfitTurnoverAreaChart.pushData("STATISTIC_PROFIT", this.profitResultArr, "#1a7bb9");
    };
    StatisticService.prototype.pushConversionRateSplineChartByModel = function (model, firstAmount, secondAmount, name, color) {
        var conversion = new Array();
        var counter = 0;
        for (var _i = 0, firstAmount_1 = firstAmount; _i < firstAmount_1.length; _i++) {
            var element = firstAmount_1[_i];
            var first = firstAmount[counter];
            var second = secondAmount[counter];
            if (angular.isNumber(second) && angular.isNumber(first) && second !== 0) {
                conversion.push(Math.round((((first / second) * 100)) * 100) / 100);
            }
            else {
                conversion.push(0);
            }
            counter++;
        }
        model.pushData(name, conversion, color);
    };
    StatisticService.prototype.getTotalSumOf = function (array) {
        var total = 0;
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var amount = array_1[_i];
            total += amount;
        }
        return total;
    };
    StatisticService.prototype.getRatePercentage = function (firstAmount, secondAmount) {
        if (secondAmount !== 0) {
            return Math.round((((firstAmount / secondAmount) * 100)) * 100) / 100;
        }
        else {
            return 0;
        }
    };
    StatisticService.prototype.getProductStatisticById = function (workflow, dateRange, source, id) {
        var deferred = this.q.defer();
        this.statisticResource.getSingleProductStatistic({ workflow: workflow, dateRange: dateRange, source: source, id: id }).$promise.then(function (result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    };
    StatisticService.prototype.getUserStatisticById = function (dateRange, source, id) {
        var deferred = this.q.defer();
        this.statisticResource.getSingleUserStatistic({ dateRange: dateRange, source: source, id: id }).$promise.then(function (result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    };
    StatisticService.prototype.getProductStatistic = function () {
        return this.productStatisticArr;
    };
    StatisticService.prototype.getUserStatistic = function () {
        return this.userStatisticArr;
    };
    StatisticService.prototype.getLeadAmount = function () {
        return this.leadAmount;
    };
    StatisticService.prototype.getOfferAmount = function () {
        return this.offerAmount;
    };
    StatisticService.prototype.getSaleAmount = function () {
        return this.saleAmount;
    };
    StatisticService.prototype.getLeadsArray = function () {
        return this.leadResultArr;
    };
    StatisticService.prototype.getOffersArray = function () {
        return this.offerResultArr;
    };
    StatisticService.prototype.getSalesArray = function () {
        return this.saleResultArr;
    };
    StatisticService.prototype.getProfitTotal = function () {
        return this.profitTotal;
    };
    StatisticService.prototype.getTurnoverTotal = function () {
        return this.turnoverTotal;
    };
    StatisticService.prototype.getEfficiency = function () {
        return this.singleStatisticEfficiency;
    };
    StatisticService.prototype.getLeadConversionRate = function () {
        return this.singleStatisticLeadConversionRate;
    };
    StatisticService.prototype.getOfferConversionRate = function () {
        return this.singleStatisticOfferConversionRate;
    };
    StatisticService.prototype.getProfitPerSale = function () {
        return this.singleStatisticProfitPerSale;
    };
    return StatisticService;
}());
angular.module(moduleStatisticService, [ngResourceId]).service(StatisticServiceId, StatisticService);


var Encryption;
(function (Encryption) {
    Encryption[Encryption["SSL"] = 0] = "SSL";
    Encryption[Encryption["TLS"] = 1] = "TLS";
})(Encryption || (Encryption = {}));

var Template = (function () {
    function Template() {
    }
    return Template;
}());


var SourceServiceId = "SourceService";
var SourceService = (function () {
    function SourceService(toaster, $translate, SourceResource, $q) {
        this.$inject = [toasterId, $translateId, SourceResourceId, $qId];
        this.toaster = toaster;
        this.translate = $translate;
        this.q = $q;
        this.SourceResource = SourceResource.resource;
        this.sources = new Array();
        this.formdata = new FormData();
        this.getAllSources();
    }
    SourceService.prototype.saveSource = function (source) {
        var self = this;
        this.SourceResource.createSource(source).$promise.then(function (result) {
            self.getAllSources();
            self.toaster.pop("success", "", self.translate.instant("SOURCE_TOAST_SAVE"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SOURCE_TOAST_SAVE_ERROR"));
        });
    };
    SourceService.prototype.getAllSources = function () {
        var defer = this.q.defer();
        var self = this;
        this.SourceResource.getAllSources().$promise.then(function (result) {
            self.sources = result;
            defer.resolve(self.sources);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };
    SourceService.prototype.getActiveSources = function () {
        var temp = new Array();
        for (var _i = 0, _a = this.sources; _i < _a.length; _i++) {
            var source = _a[_i];
            if (source.deactivated === false) {
                temp.push(source);
            }
        }
        return temp;
    };
    SourceService.prototype.checkSourceName = function (source) {
        if (isNullOrUndefined(source) || isNullOrUndefined(source.name)) {
            return false;
        }
        return this.sources.filter(function (s) { return s.name.toLowerCase() === source.name.toLowerCase(); }).length > 0;
    };
    return SourceService;
}());
angular.module(moduleSourceService, [ngResourceId]).service(SourceServiceId, SourceService);

var SummernoteServiceId = "SummernoteService";
var SummernoteService = (function () {
    function SummernoteService($rootScope, $translate) {
        this.$inject = [$rootScopeId, $translateId];
        this.rootScope = $rootScope;
        this.translate = $translate;
    }
    SummernoteService.prototype.getDefaultOptions = function () {
        var options = {
            lang: "en-US",
            toolbar: [
                ["edit", ["undo", "redo"]],
                ["headline", ["style"]],
                ["style", ["bold", "italic", "underline", "superscript", "subscript", "strikethrough", "clear"]],
                ["fontface", ["fontname"]],
                ["textsize", ["fontsize"]],
                ["fontclr", ["color"]],
                ["alignment", ["ul", "ol", "paragraph", "lineheight"]],
                ["height", ["height"]],
                ["table", ["table"]],
                ["insert", ["link", "picture", "hr"]],
                ["view", ["fullscreen", "codeview"]],
            ]
        };
        if (this.rootScope.language === Language[Language.DE]) {
            options.lang = "de-DE";
            this.loadSummernoteGerman();
        }
        return options;
    };
    SummernoteService.prototype.getTemplateOptions = function () {
        var self = this;
        var options = {
            lang: "en-US",
            toolbar: [
                ["edit", ["undo", "redo"]],
                ["headline", ["style"]],
                ["style", ["bold", "italic", "underline", "superscript", "subscript", "strikethrough", "clear"]],
                ["fontface", ["fontname"]],
                ["textsize", ["fontsize"]],
                ["fontclr", ["color"]],
                ["alignment", ["ul", "ol", "paragraph", "lineheight"]],
                ["height", ["height"]],
                ["table", ["table"]],
                ["insert", ["link", "picture", "hr"]],
                ["view", ["fullscreen", "codeview"]],
                ["orderListButton", ["orderList"]],
                ["templateButtonGroup", ["workflowDropdown", "customerDropdown", "orderDropdown", "userDropdown"]]
            ],
            buttons: {
                orderList: this.getSingleTemplateButton(self.translate.instant("SUMMERNOTE_ORDER_LIST"), "<#list orderPositions as orderPosition> <br> Item: ${orderPosition.product.name} / ${orderPosition.price} <br> &lt;/#list&gt;", "fa fa-truck", true),
                workflowDropdown: this.getWorkflowDropdown(),
                customerDropdown: this.getCustomerDropdown(),
                orderDropdown: this.getOrderDropdown(),
                userDropdown: this.getUserDropdown()
            }
        };
        if (this.rootScope.language === Language[Language.DE]) {
            options.lang = "de-DE";
            this.loadSummernoteGerman();
        }
        return options;
    };
    SummernoteService.prototype.getSingleTemplateButton = function (buttonName, insertText, fa, asHtml) {
        if (asHtml === void 0) { asHtml = false; }
        var editorInvoke = "editor.insertText";
        if (asHtml === true) {
            editorInvoke = "editor.pasteHTML";
        }
        var templateButton = function (context) {
            var ui = $.summernote.ui;
            var button = ui.button({
                contents: "<i class='" + fa + "'/> " + buttonName,
                click: function () {
                    context.invoke(editorInvoke, insertText);
                }
            });
            return button.render();
        };
        return templateButton;
    };
    SummernoteService.prototype.getWorkflowDropdown = function () {
        var self = this;
        return function dropdownExample(context) {
            var ui = $.summernote.ui;
            var templateVarButtonGroup = ui.buttonGroup([
                self.getTemplateButton(ui, context, self.translate.instant("SUMMERNOTE_WORKFLOW_TEMPLATE_BUTTON")),
                self.getTemplateDropdown(ui, context, self.getWorkflowTemplateVar()),
            ]);
            return templateVarButtonGroup.render();
        };
    };
    SummernoteService.prototype.getCustomerDropdown = function () {
        var self = this;
        return function dropdownExample(context) {
            var ui = $.summernote.ui;
            var templateVarButtonGroup = ui.buttonGroup([
                self.getTemplateButton(ui, context, self.translate.instant("SUMMERNOTE_CUSTOMER_TEMPLATE_BUTTON")),
                self.getTemplateDropdown(ui, context, self.getCustomerTemplateVar()),
            ]);
            return templateVarButtonGroup.render();
        };
    };
    SummernoteService.prototype.getOrderDropdown = function () {
        var self = this;
        return function dropdownExample(context) {
            var ui = $.summernote.ui;
            var templateVarButtonGroup = ui.buttonGroup([
                self.getTemplateButton(ui, context, self.translate.instant("SUMMERNOTE_ORDER_TEMPLATE_BUTTON")),
                self.getTemplateDropdown(ui, context, self.getOrderTemplateVar()),
            ]);
            return templateVarButtonGroup.render();
        };
    };
    SummernoteService.prototype.getUserDropdown = function () {
        var self = this;
        return function dropdownExample(context) {
            var ui = $.summernote.ui;
            var templateVarButtonGroup = ui.buttonGroup([
                self.getTemplateButton(ui, context, self.translate.instant("SUMMERNOTE_USER_TEMPLATE_BUTTON")),
                self.getTemplateDropdown(ui, context, self.getUserTemplateVar()),
            ]);
            return templateVarButtonGroup.render();
        };
    };
    SummernoteService.prototype.getTemplateButton = function (ui, context, buttonName) {
        return ui.button({
            className: "dropdown-toggle",
            contents: buttonName + " <span class='caret'</span>",
            data: {
                toggle: "dropdown"
            },
            click: function () {
                context.invoke("editor.saveRange");
            }
        });
    };
    SummernoteService.prototype.getTemplateDropdown = function (ui, context, templateVar) {
        var self = this;
        return ui.dropdown({
            className: "dropdown-menu note-check template-dropdown",
            contents: templateVar,
            callback: function ($dropdown) {
                $dropdown.find("li a").each(function () {
                    $(this).click(function () {
                        context.invoke("editor.restoreRange");
                        context.invoke("editor.focus");
                        context.invoke("editor.insertText", $(this)[0].attributes[0].nodeValue);
                    });
                });
            }
        });
    };
    SummernoteService.prototype.getWorkflowTemplateVar = function () {
        return "<li><a template-value='${workflow.netPrice}'>" + this.translate.instant("PRODUCT_PRICE") + "</a></li>" +
            "<li><a template-value='${workflow.vat}'>" + this.translate.instant("CALCULATION_VAT") + "</a></li>" +
            " <li><a template-value='${workflow.deliverycosts}'>" + this.translate.instant("COMMON_PRODUCT_DELIVERYCOSTS") + "</a></li>" +
            "<li><a template-value='${workflow.deliveryaddress}'>" + this.translate.instant("COMMON_PRODUCT_DESTINATION") + "</a></li>" +
            "<li><a template-value='${workflow.deliverydate}'>" + this.translate.instant("COMMON_DELIVERY_TIME") + "</a></li>" +
            "<li><a template-value='${workflow.message}'>" + this.translate.instant("EMAIL_MESSAGE") + "</a></li>";
    };
    SummernoteService.prototype.getCustomerTemplateVar = function () {
        return "<li><a template-value='${customer.title}'>" + this.translate.instant("COMMON_TITLE") + "</a></li>" +
            "<li><a template-value='${customer.firstname}'>" + this.translate.instant("Vorname") + "</a></li>" +
            " <li><a template-value='${customer.lastname}'>" + this.translate.instant("Nachname") + "</a></li>" +
            "<li><a template-value='${customer.company}'>" + this.translate.instant("COMMON_COMPANY") + "</a></li>" +
            "<li><a template-value='${customer.email}'>" + this.translate.instant("COMMON_EMAIL") + "</a></li>" +
            "<li><a template-value='${customer.phone}'>" + this.translate.instant("COMMON_PHONE") + "</a></li>" +
            "<li><a template-value='${customer.address}'>" + this.translate.instant("COMMON_ADDRESS") + "</a></li>" +
            "<li><a template-value='${customer.customerNumber}'>" + this.translate.instant("CUSTOMER_NUMBER") + "</a></li>";
    };
    SummernoteService.prototype.getOrderTemplateVar = function () {
        return "<li><a template-value='${orderPosition.product.name}'>" + this.translate.instant("PRODUCT_PRODUCTNAME") + "</a></li>" +
            "<li><a template-value='${orderPosition.product.description}'>" + this.translate.instant("PRODUCT_DESCRIPTION") + "</a></li>" +
            " <li><a template-value='${orderPosition.netPrice}'>" + this.translate.instant("PRODUCT_PRICE") + "</a></li>" +
            "<li><a template-value='${orderPosition.discount}'>" + this.translate.instant("PRODUCT_DISCOUNT") + "</a></li>" +
            "<li><a template-value='${orderPosition.amount}'>" + this.translate.instant("COMMON_PRODUCT_AMOUNT") + "</a></li>" +
            "<li><a template-value='${orderPosition.product.netPrice}'> " + this.translate.instant("Originalpreis") + "</a></li>" +
            "<li><a template-value='${orderPosition.product.productstate}'>" + this.translate.instant("PRODUCT_PRODUCT_STATE") + "</a></li>" +
            "<li><a template-value='${orderPosition.product.productnumber}'>" + this.translate.instant("PRODUCT_NUMBER") + "</a></li>";
    };
    SummernoteService.prototype.getUserTemplateVar = function () {
        return "<li><a template-value='${user.firstname}'>" + this.translate.instant("COMMON_FIRSTNAME") + "</a></li>" +
            "<li><a template-value='${user.lastname}'>" + this.translate.instant("COMMON_LASTNAME") + "</a></li>" +
            " <li><a template-value='${user.email}'>" + this.translate.instant("COMMON_EMAIL") + "</a></li>" +
            "<li><a template-value='${user.phone}'>" + this.translate.instant("COMMON_PHONE") + "</a></li>" +
            "<li><a template-value='${user.fax}'>" + this.translate.instant("COMMON_FAX") + "</a></li>" +
            "<li><a template-value='${user.skype}'>" + this.translate.instant("COMMON_SKYPE") + "</a></li>" +
            "<li><a template-value='${user.job}'>" + this.translate.instant("COMMON_JOB") + "</a></li>";
    };
    SummernoteService.prototype.loadSummernoteGerman = function () {
        $.extend($.summernote.lang, this.getGermanTranslation());
    };
    SummernoteService.prototype.getGermanTranslation = function () {
        return {
            "de-DE": {
                font: {
                    bold: "Fett",
                    italic: "Kursiv",
                    underline: "Unterstreichen",
                    clear: "Zurücksetzen",
                    height: "Zeilenhöhe",
                    strikethrough: "Durchgestrichen",
                    size: "Schriftgröße"
                },
                image: {
                    image: "Grafik",
                    insert: "Grafik einfügen",
                    resizeFull: "Originalgröße",
                    resizeHalf: "Größe 1/2",
                    resizeQuarter: "Größe 1/4",
                    floatLeft: "Linksbündig",
                    floatRight: "Rechtsbündig",
                    floatNone: "Kein Textfluss",
                    shapeRounded: "Rahmen: Abgerundet",
                    shapeCircle: "Rahmen: Kreisförmig",
                    shapeThumbnail: "Rahmen: Thumbnail",
                    shapeNone: "Kein Rahmen",
                    dragImageHere: "Ziehen Sie ein Bild mit der Maus hierher",
                    selectFromFiles: "Wählen Sie eine Datei aus",
                    maximumFileSize: "Maximale Dateigröße",
                    maximumFileSizeError: "Maximale Dateigröße überschritten",
                    url: "Grafik URL",
                    remove: "Grafik entfernen"
                },
                video: {
                    video: "Video",
                    videoLink: "Video Link",
                    insert: "Video einfügen",
                    url: "Video URL?",
                    providers: "(YouTube, Vimeo, Vine, Instagram, DailyMotion oder Youku)"
                },
                link: {
                    link: "Link",
                    insert: "Link einfügen",
                    unlink: "Link entfernen",
                    edit: "Editieren",
                    textToDisplay: "Anzeigetext",
                    url: "Ziel des Links?",
                    openInNewWindow: "In einem neuen Fenster öffnen"
                },
                table: {
                    table: "Tabelle"
                },
                hr: {
                    insert: "Eine horizontale Linie einfügen"
                },
                style: {
                    style: "Stil",
                    p: "p",
                    blockquote: "Zitat",
                    pre: "Quellcode",
                    h1: "Überschrift 1",
                    h2: "Überschrift 2",
                    h3: "Überschrift 3",
                    h4: "Überschrift 4",
                    h5: "Überschrift 5",
                    h6: "Überschrift 6"
                },
                lists: {
                    unordered: "Aufzählung",
                    ordered: "Nummerierung"
                },
                options: {
                    help: "Hilfe",
                    fullscreen: "Vollbild",
                    codeview: "HTML-Code anzeigen"
                },
                paragraph: {
                    paragraph: "Absatz",
                    outdent: "Einzug vergrößern",
                    indent: "Einzug verkleinern",
                    left: "Links ausrichten",
                    center: "Zentriert ausrichten",
                    right: "Rechts ausrichten",
                    justify: "Blocksatz"
                },
                color: {
                    recent: "Letzte Farbe",
                    more: "Mehr Farben",
                    background: "Hintergrundfarbe",
                    foreground: "Schriftfarbe",
                    transparent: "Transparenz",
                    setTransparent: "Transparenz setzen",
                    reset: "Zurücksetzen",
                    resetToDefault: "Auf Standard zurücksetzen"
                },
                shortcut: {
                    shortcuts: "Tastenkürzel",
                    close: "Schließen",
                    textFormatting: "Textformatierung",
                    action: "Aktion",
                    paragraphFormatting: "Absatzformatierung",
                    documentStyle: "Dokumentenstil"
                },
                history: {
                    undo: "Rückgängig",
                    redo: "Wiederholen"
                }
            }
        };
    };
    return SummernoteService;
}());
angular.module(moduleSummernoteService, [moduleSummernote]).service(SummernoteServiceId, SummernoteService);


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var TemplateControllerId = "TemplateController";
var TemplateController = (function () {
    function TemplateController(TemplateService, $uibModalInstance, template, SummernoteService, SourceService, $translate, toaster) {
        this.SummernoteService = SummernoteService;
        this.SourceService = SourceService;
        this.$translate = $translate;
        this.toaster = toaster;
        this.$inject = [TemplateServiceId, $uibModalId, "template"];
        this.currentSelectedNotificationTypes = [];
        this.currentSelectedSource = [];
        this.availableNotificationTypes = NotificationType.getAll();
        this.availablesourceNames = [];
        this.templateService = TemplateService;
        this.uibModalInstance = $uibModalInstance;
        this.template = template;
        this.currentSelectedNotificationTypes = this.template.notificationTypeString == null ? [] : this.template.notificationTypeString.split(",");
        this.currentSelectedSource = this.template.sourceString == null ? [] : this.template.sourceString.split(",");
        this.SetAvailablesourceNames();
        this.summernoteOptions = SummernoteService.getTemplateOptions();
    }
    TemplateController.prototype.SetAvailablesourceNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.SourceService.getActiveSources().map(function (s) { return s.name; })];
                    case 1:
                        temp = _a.sent();
                        this.availablesourceNames = this.availablesourceNames.concat(temp);
                        return [2 ];
                }
            });
        });
    };
    TemplateController.prototype.getTranslationByKey = function (key) {
        return this.$translate.instant(key);
    };
    TemplateController.prototype.save = function () {
        if (this.currentSelectedNotificationTypes.length > 0) {
            this.template.notificationTypeString = this.currentSelectedNotificationTypes.join(",");
        }
        else {
            this.template.notificationTypeString = null;
        }
        if (this.currentSelectedSource.length > 0) {
            this.template.sourceString = this.currentSelectedSource.join(",");
        }
        else {
            this.template.sourceString = null;
        }
        if (isNullOrUndefined(this.template.id)) {
            this.templateService.save(this.template);
        }
        else {
            this.templateService.update(this.template);
        }
        this.template = null;
        this.close();
    };
    TemplateController.prototype.remove = function () {
        this.templateService.remove(this.template);
        this.close();
    };
    TemplateController.prototype.close = function () {
        this.uibModalInstance.close();
    };
    TemplateController.prototype.testSyntax = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 , this.templateService.testTemplate(this.template, new WorkflowTemplateObject(), new Notification())];
                    case 1:
                        _a.sent();
                        this.toaster.pop("success", "", this.$translate.instant("EMAIL_TEMPLATE_SYNTAX_SUCCESS"));
                        return [3 , 3];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1.data != null && error_1.data.exception !== "dash.templatemanagement.business.TemplateCompilationException") {
                            return [2 , this.toaster.pop("error", "", this.$translate.instant("EMAIL_TEMPLATE_ERROR"))];
                        }
                        errorMessage = error_1 == null || error_1.data == null ? "" : ": " + error_1.data.message;
                        if (error_1 != null && error_1.data != null && error_1.data.message != null && error_1.data.message.substring(0, 6) !== "Syntax") {
                            this.toaster.pop("error", "", this.$translate.instant("EMAIL_TEMPLATE_ERROR") + errorMessage);
                            return [2 ];
                        }
                        errorMessage = error_1 == null || error_1.data == null ? "" : ": " + error_1.data.message.substring(36);
                        this.toaster.pop("error", "", this.$translate.instant("EMAIL_TEMPLATE_ERROR") + errorMessage);
                        return [3 , 3];
                    case 3: return [2 ];
                }
            });
        });
    };
    return TemplateController;
}());
angular.module(moduleTemplate, [ngResourceId, moduleAngularChosen]).controller(TemplateControllerId, TemplateController);


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var TemplateServiceId = "TemplateService";
var TemplateService = (function () {
    function TemplateService(toaster, $translate, $rootScope, TemplateResource, $uibModal, $q, $window, $sce) {
        this.$inject = [toasterId, $translateId, TemplateResourceId, $uibModalId, $qId, $windowId, $sceId];
        this.toaster = toaster;
        this.translate = $translate;
        this.uibModal = $uibModal;
        this.q = $q;
        this.window = $window;
        this.templateResource = TemplateResource.resource;
        this.sce = $sce;
    }
    TemplateService.prototype.openEmailTemplateModal = function (template) {
        this.uibModal.open({
            templateUrl: "components/Template/view/Template.Modal.html",
            controller: "TemplateController",
            controllerAs: "templateCtrl",
            size: "lg",
            backdrop: "static",
            resolve: {
                template: function () {
                    return template;
                }
            }
        });
    };
    TemplateService.prototype.openEmailTemplateDeleteModal = function (template) {
        this.uibModal.open({
            templateUrl: "components/Template/view/Template.Delete.Modal.html",
            controller: "TemplateController",
            controllerAs: "templateCtrl",
            size: "sm",
            resolve: {
                template: function () {
                    return template;
                }
            }
        });
    };
    TemplateService.prototype.save = function (template) {
        var defer = this.q.defer();
        var self = this;
        this.templateResource.save(template).$promise.then(function (result) {
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_SAVE"));
            self.templates.push(result);
            defer.resolve(result);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_SAVE_ERROR"));
            defer.reject(null);
        });
        return defer.promise;
    };
    TemplateService.prototype.update = function (template) {
        var defer = this.q.defer();
        var self = this;
        this.templateResource.update(template).$promise.then(function (result) {
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_UPDATE"));
            defer.resolve(result);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_UPDATE_ERROR"));
            defer.reject(null);
        });
        return defer.promise;
    };
    TemplateService.prototype.remove = function (template) {
        var self = this;
        var indexOfTemplate = this.templates.indexOf(template);
        this.templateResource.remove({ id: template.id }).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_DELETE"));
            self.templates.splice(indexOfTemplate, 1);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_DELETE_ERROR"));
        });
    };
    TemplateService.prototype.generate = function (templateId, workflow, notification) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.templateResource.generate({ templateId: templateId }, { workflowTemplateObject: workflow, notification: notification }).$promise];
            });
        });
    };
    TemplateService.prototype.testTemplate = function (template, workflow, notification) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.templateResource.test({ workflowTemplateObject: workflow, notification: notification, template: template }).$promise];
            });
        });
    };
    TemplateService.prototype.generatePDF = function (templateId, offer) {
        var defer = this.q.defer();
        var self = this;
        this.templateResource.generatePDF({ templateId: templateId }, offer).$promise.then(function (result) {
            var file = new Blob([result], { type: "application/pdf" });
            var fileURL = URL.createObjectURL(file);
            self.window.open(self.sce.trustAsResourceUrl(fileURL), "_blank");
            self.window.open(fileURL);
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };
    TemplateService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 , this.templateResource.getAll().$promise];
                    case 1:
                        _a.templates = _b.sent();
                        return [2 , this.templates];
                }
            });
        });
    };
    return TemplateService;
}());
angular.module(moduleTemplateService, [ngResourceId]).service(TemplateServiceId, TemplateService);

var Attachment = (function () {
    function Attachment() {
    }
    return Attachment;
}());


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var NotificationServiceId = "NotificationService";
var NotificationService = (function () {
    function NotificationService(toaster, $translate, $rootScope, NotificationResource, $q) {
        this.$inject = [toasterId, $translateId, $rootScopeId, NotificationResourceId, $qId];
        this.userNotifications = [];
        this.notificationResource = NotificationResource.resource;
        this.toaster = toaster;
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.q = $q;
        this.formdata = new FormData();
        this.fileReader = new FileReader();
        this.notification = new Notification();
    }
    NotificationService.prototype.sendNotification = function (notification) {
        var self = this;
        var defer = this.q.defer();
        console.log("SMTP KEY: ", this.rootScope.user.smtpKey);
        this.notificationResource.sendNotification({ senderId: this.rootScope.user.id, smtpKey: this.rootScope.user.smtpKey }, notification).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("NOTIICATION_SEND"));
            defer.resolve(true);
            self.refreshUserNotifications();
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("NOTIICATION_SEND_ERROR"));
            defer.reject(false);
        });
        return defer.promise;
    };
    NotificationService.prototype.getNotificationsBySenderId = function (senderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.notificationResource.getNotificationsBySenderId({ senderId: this.rootScope.user.id }).$promise];
            });
        });
    };
    NotificationService.prototype.refreshUserNotifications = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 , this.getNotificationsBySenderId(this.rootScope.user.id)];
                    case 1:
                        _a.userNotifications = _b.sent();
                        return [2 ];
                }
            });
        });
    };
    return NotificationService;
}());
angular.module(moduleNotificationService, [ngResourceId]).service(NotificationServiceId, NotificationService);


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DashboardControllerId = "DashboardController";
var DashboardController = (function () {
    function DashboardController(WorkflowService, StatisticService, DashboardService, $rootScope, TemplateService, NotificationService, $sce, $scope) {
        this.$inject = [WorkflowServiceId, StatisticServiceId, DashboardServiceId, $rootScopeId, TemplateServiceId, NotificationServiceId, $sceId, $scopeId];
        this.showMyTasks = false;
        this.todoAmountLimit = 10;
        this.template = new Template();
        this.templates = [];
        this.workflowService = WorkflowService;
        this.statisticService = StatisticService;
        this.dashboardService = DashboardService;
        this.templateService = TemplateService;
        this.getAllActiveTemplates();
        this.sce = $sce;
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.statisticService.loadAllResourcesByDateRange("MONTHLY", "ALL");
        this.sortableOptions = this.dashboardService.setSortableOptions(this.scope);
        this.currentUser = this.rootScope.user;
        this.registerIntervall();
        this.refreshData();
        this.refreshTodos();
        var self = this;
        $scope.$watch("dashboardCtrl.cardSearchText", function (newValue) {
            self.dashboardService.filterBySearch(newValue, self.showMyTasks);
        });
    }
    DashboardController.prototype.registerIntervall = function () {
        var self = this;
        var intervall = setInterval(function () {
            if (!self.dashboardService.dragging && !self.dashboardService.inModal) {
                self.refreshData();
            }
        }, 10 * 60 * 1000);
        self.scope.$on("$destroy", function () {
            clearInterval(intervall);
        });
    };
    DashboardController.prototype.openNewLeadModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.workflowService.openNewLeadModal()];
                    case 1:
                        resultProcess = _a.sent();
                        if (!isNullOrUndefined(resultProcess)) {
                            this.rootScope.leadsCount += 1;
                            this.dashboardService.addNewLead(resultProcess);
                        }
                        return [2 ];
                }
            });
        });
    };
    DashboardController.prototype.openQuickEmailModal = function (process) {
        this.workflowService.openQuickEmailModal(process);
    };
    DashboardController.prototype.refreshTodos = function () {
        this.dashboardService.refreshTodos();
    };
    DashboardController.prototype.getNameOfUser = function (user) {
        return getNameOfUser(user);
    };
    DashboardController.prototype.getAllActiveTemplates = function () {
        var _this = this;
        this.templateService.getAll().then(function (result) { return _this.templates = result; }, function (error) { return handleError(error); });
    };
    DashboardController.prototype.saveDataToModal = function (info, type, process) {
        this.workflowModalData = info;
        this.workflowModalType = type;
        this.workflowModalProcess = process;
    };
    DashboardController.prototype.refreshData = function () {
        this.dashboardService.initDashboard();
    };
    DashboardController.prototype.addComment = function (process) {
        var self = this;
        this.workflowService.addComment(process, this.commentModalInput).then(function () {
            self.commentModalInput = "";
        });
    };
    DashboardController.prototype.getAsHtml = function (html) {
        return this.sce.trustAsHtml(html);
    };
    DashboardController.prototype.getOpenLeads = function () {
        return this.dashboardService.getOpenLeads();
    };
    DashboardController.prototype.getInContacts = function () {
        return this.dashboardService.getInContacts();
    };
    DashboardController.prototype.getOpenOffers = function () {
        return this.dashboardService.getOpenOffers();
    };
    DashboardController.prototype.getDoneOffers = function () {
        return this.dashboardService.getDoneOffers();
    };
    DashboardController.prototype.getClosedSales = function () {
        return this.dashboardService.getClosedSales();
    };
    DashboardController.prototype.getProfit = function () {
        return this.statisticService.getProfitTotal();
    };
    DashboardController.prototype.getTurnover = function () {
        return this.statisticService.getTurnoverTotal();
    };
    DashboardController.prototype.getLeadAmount = function () {
        return this.statisticService.getLeadAmount();
    };
    DashboardController.prototype.getOfferAmount = function () {
        return this.statisticService.getOfferAmount();
    };
    DashboardController.prototype.getSaleAmount = function () {
        return this.statisticService.getSaleAmount();
    };
    DashboardController.prototype.getLeadsArray = function () {
        return this.statisticService.getLeadsArray();
    };
    DashboardController.prototype.getOffersArray = function () {
        return this.statisticService.getOffersArray();
    };
    DashboardController.prototype.getSalesArray = function () {
        return this.statisticService.getSalesArray();
    };
    DashboardController.prototype.getConversionrate = function () {
        return this.statisticService.getLeadConversionRate();
    };
    DashboardController.prototype.toLocalDate = function (timestamp, process) {
        if (process === void 0) { process = null; }
        if (timestamp === undefined) {
            timestamp = newTimestamp();
        }
        return toLocalDate(timestamp, "DD.MM.YYYY HH:mm");
    };
    DashboardController.prototype.sumOrderPositions = function (array) {
        return this.workflowService.sumOrderPositions(array);
    };
    DashboardController.prototype.getOrderPositionList = function (workflow) {
        if (isNullOrUndefined(workflow)) {
            return;
        }
        var text = "";
        for (var i = 0; i < workflow.orderPositions.length; i++) {
            text += workflow.orderPositions[i].amount + " " + workflow.orderPositions[i].product.name;
            if (i + 1 < workflow.orderPositions.length) {
                text += ", ";
            }
        }
        return text;
    };
    DashboardController.prototype.getAmountOfFollowUps = function (process) {
        var amount = 0;
        for (var i = 0; i < process.notifications.length; i++) {
            if (process.notifications[i].notificationType === NotificationType.FOLLOWUP) {
                amount++;
            }
        }
        return amount;
    };
    DashboardController.prototype.hasRightToDrag = function (process) {
        if (isNullOrUndefined(process.processor)) {
            return true;
        }
        else if (this.currentUser.role === Role.ADMIN || this.currentUser.role === Role.SUPERADMIN) {
            return true;
        }
        else if (this.currentUser.id === process.processor.id) {
            return true;
        }
        return false;
    };
    DashboardController.prototype.getClassToDrag = function (process, element) {
        return element + (this.hasRightToDrag(process) ? "-element draggable dragItem" : "-element not-sortable draggable dragItem");
    };
    DashboardController.prototype.getHeight = function () {
        if (!stringIsNullorEmpty(this.cardSearchText) || this.showMyTasks) {
            return this.height;
        }
        var max = 0;
        var array = new Array(this.getOpenLeads().length, this.getInContacts().length, this.getOpenOffers().length, this.getDoneOffers().length, this.getClosedSales().length);
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var element = array_1[_i];
            if (element > max) {
                max = element;
            }
        }
        if (max >= 7) {
            this.height = 7 * 85;
            return this.height;
        }
        this.height = (max * 85) + 100;
        return this.height;
    };
    return DashboardController;
}());
angular.module(moduleDashboard, [ngResourceId, moduleSummernote]).controller(DashboardControllerId, DashboardController);


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CustomerServiceId = "CustomerService";
var CustomerService = (function () {
    function CustomerService(CustomerResource, $http, toaster, $translate) {
        this.$inject = [CustomerResourceId, $httpId, toasterId, $translateId];
        this.pagingCustomers = new Array();
        this.searchCustomers = new Array();
        this.customerResource = CustomerResource.resource;
        this.http = $http;
        this.toaster = toaster;
        this.translate = $translate;
        this.getAllCustomerByPage(1, 20, "noSearchText", false);
    }
    CustomerService.prototype.saveCustomer = function (customer, insert) {
        if (insert === void 0) { insert = true; }
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (!insert)
                            return [3 , 2];
                        customer.timestamp = newTimestamp();
                        customer.realCustomer = true;
                        return [4 , this.customerResource.createCustomer(customer).$promise];
                    case 1:
                        customer = (_a.sent());
                        return [3 , 4];
                    case 2: return [4 , this.customerResource.updateCustomer(customer).$promise];
                    case 3:
                        customer = (_a.sent());
                        _a.label = 4;
                    case 4: return [2 , customer];
                }
            });
        });
    };
    CustomerService.prototype.insertCustomer = function (customer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.customerResource.createCustomer(customer).$promise];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    CustomerService.prototype.updateCustomer = function (customer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.customerResource.updateCustomer(customer).$promise];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    CustomerService.prototype.getAllCustomerByPage = function (start, length, searchtext, allCustomers) {
        var self = this;
        this.customerResource.getAllCustomerByPage({ start: start, length: length, searchtext: searchtext, allCustomers: allCustomers }).$promise.then(function (result) {
            self.page = result;
            for (var _i = 0, _a = result.content; _i < _a.length; _i++) {
                var customer = _a[_i];
                self.pagingCustomers.push(customer);
            }
        });
    };
    CustomerService.prototype.getCustomerBySearchText = function (searchtext) {
        if (!isNullOrUndefined(searchtext) && searchtext.length > 0) {
            var self_1 = this;
            return this.http.get("/api/rest/customer/search/" + searchtext).then(function (response) {
                var temp = new Array();
                for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
                    var customer = _a[_i];
                    if (customer.deactivated === false) {
                        self_1.searchCustomers.push(customer);
                        temp.push(customer);
                    }
                }
                return temp;
            });
        }
    };
    return CustomerService;
}());
angular.module(moduleCustomerService, [ngResourceId]).service(CustomerServiceId, CustomerService);


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var FileServiceId = "FileService";
var FileService = (function () {
    function FileService(FileResource, $q, $http, $window, toaster, $translate, $sce) {
        this.$q = $q;
        this.$inject = [FileResourceId, $qId, $httpId, $windowId, toasterId, $translateId, $sceId];
        this.fileResource = FileResource.resource;
        this.http = $http;
        this.window = $window;
        this.toaster = toaster;
        this.translate = $translate;
        this.sce = $sce;
    }
    FileService.prototype.getContentFileById = function (id) {
        var self = this;
        this.http.get("/api/rest/files/content/" + id, { method: "GET", responseType: "arraybuffer" }).
            success(function (data, status, headers, config, statusText) {
            var contentType = headers("content-type");
            var file = new Blob([data], { type: contentType });
            var fileURL = URL.createObjectURL(file);
            self.window.open(self.sce.trustAsResourceUrl(fileURL), "_blank");
        }).error(function (data, status) {
            self.toaster.pop("error", "", self.translate.instant("COMMON_TOAST_FAILURE_DELETE_LEAD"));
        });
    };
    FileService.prototype.save = function (fileUpload) {
        return this.fileResource.save(fileUpload).$promise;
    };
    FileService.prototype.saveAttachment = function (attachment) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = attachment;
                        return [4 , this.save(attachment.fileUpload)];
                    case 1:
                        _a.fileUpload = _b.sent();
                        return [2 ];
                }
            });
        });
    };
    return FileService;
}());
angular.module(moduleFileService, [ngResourceId]).service(FileServiceId, FileService);

var WizardButtonConfig = (function () {
    function WizardButtonConfig(directiveType) {
        this.directiveType = directiveType;
        this.isVisible = true;
        this.showSaveButton = true;
        this.isDisabled = false;
        this.isFirstActiveElement = false;
        this.validation = true;
        this.isEmail = false;
        this.isFollowUp = false;
    }
    WizardButtonConfig.prototype.setTitle = function (title) {
        this.title = title;
        return this;
    };
    WizardButtonConfig.prototype.setIcon = function (icon) {
        this.icon = icon;
        return this;
    };
    WizardButtonConfig.prototype.setForm = function (form) {
        this.form = form;
        return this;
    };
    WizardButtonConfig.prototype.setPosition = function (position) {
        this.position = position;
        return this;
    };
    WizardButtonConfig.prototype.setVisibility = function (visibility) {
        this.isVisible = visibility;
        return this;
    };
    WizardButtonConfig.prototype.setEmail = function (isEmail, sendButtonName) {
        if (sendButtonName === void 0) { sendButtonName = "EMAIL_SEND"; }
        this.isEmail = isEmail;
        this.sendButtonName = sendButtonName;
        return this;
    };
    WizardButtonConfig.prototype.setFollowUp = function (isFollowUp) {
        this.isFollowUp = isFollowUp;
        return this;
    };
    WizardButtonConfig.prototype.setShowSaveButton = function (showSaveButton) {
        this.showSaveButton = showSaveButton;
        return this;
    };
    WizardButtonConfig.prototype.disable = function () {
        this.isDisabled = true;
        return this;
    };
    WizardButtonConfig.prototype.enable = function () {
        this.isDisabled = false;
        return this;
    };
    WizardButtonConfig.prototype.setValidation = function (validation) {
        this.validation = validation;
        return this;
    };
    WizardButtonConfig.prototype.setAsFirstElement = function () {
        this.isFirstActiveElement = true;
        return this;
    };
    return WizardButtonConfig;
}());

var WizardType;
(function (WizardType) {
    WizardType[WizardType["CUSTOMER"] = "customerEdit"] = "CUSTOMER";
    WizardType[WizardType["PRODUCT"] = "productEdit"] = "PRODUCT";
    WizardType[WizardType["CUSTOMER_PRODUCT"] = "customerProductEdit"] = "CUSTOMER_PRODUCT";
    WizardType[WizardType["EMAIL"] = "emailEdit"] = "EMAIL";
    WizardType[WizardType["SALE"] = "saleEdit"] = "SALE";
})(WizardType || (WizardType = {}));

var WizardModalControllerId = "WizardModalController";
var WizardModalController = (function () {
    function WizardModalController(process, workflowType, transformation, $uibModalInstance, $rootScope, WorkflowService) {
        this.$inject = ["process", "workflowType", "transformation", $uibModalId, $rootScopeId, WorkflowServiceId];
        this.notification = new Notification();
        this.uibModalInstance = $uibModalInstance;
        this.rootScope = $rootScope;
        this.workflowService = WorkflowService;
        this.editProcess = deepCopy(process);
        this.appendTransformation(transformation, workflowType);
        this.wizardEditConfig = this.getWizardEditConfig();
        this.wizardQuickEmailConfig = this.getQuickEmailWizardConfig(workflowType);
        this.wizardOfferTransitionConfig = this.getOfferWizardTransitionConfig();
        this.wizardSaleTransitionConfig = this.getSaleWizardTransitionConfig();
    }
    WizardModalController.prototype.getWizardEditConfig = function () {
        var wizardConfig = new Array();
        var customerEditStep = new WizardButtonConfig(WizardType.CUSTOMER);
        customerEditStep.setTitle("CUSTOMER").setIcon("fa fa-user").setPosition(1);
        wizardConfig.push(customerEditStep);
        var productEditStep = new WizardButtonConfig(WizardType.PRODUCT);
        productEditStep.setTitle("LEAD").setIcon("fa fa-inbox").setPosition(2);
        wizardConfig.push(productEditStep);
        var emailEditStep = new WizardButtonConfig(WizardType.EMAIL);
        emailEditStep.setTitle("COMMON_EMAIL").setIcon("fa fa-envelope").setPosition(3).setValidation(false).setEmail(true, "COMMON_CONTINUE_AND_SENDING");
        wizardConfig.push(emailEditStep);
        var SaleEditStep = new WizardButtonConfig(WizardType.SALE);
        SaleEditStep.setTitle("SALE").setIcon("fa fa-usd").setPosition(4).setAsFirstElement();
        wizardConfig.push(SaleEditStep);
        return wizardConfig;
    };
    WizardModalController.prototype.getQuickEmailWizardConfig = function (workflowType) {
        var wizardConfig = new Array();
        var emailEditStep = new WizardButtonConfig(WizardType.EMAIL);
        emailEditStep.setTitle("COMMON_EMAIL").setIcon("fa fa-envelope").setPosition(1).setEmail(true, "COMMON_SEND").setShowSaveButton(false);
        switch (workflowType) {
            case WorkflowType.LEAD:
                break;
            case WorkflowType.OFFER:
                emailEditStep.setFollowUp(true);
                break;
            case WorkflowType.SALE:
                break;
        }
        ;
        wizardConfig.push(emailEditStep);
        return wizardConfig;
    };
    WizardModalController.prototype.getOfferWizardTransitionConfig = function () {
        var wizardConfig = new Array();
        var customerProductEditStep = new WizardButtonConfig(WizardType.CUSTOMER_PRODUCT);
        customerProductEditStep.setTitle("LEAD").setIcon("fa fa-inbox").setPosition(1);
        wizardConfig.push(customerProductEditStep);
        var emailEditStep = new WizardButtonConfig(WizardType.EMAIL);
        emailEditStep.setTitle("COMMON_EMAIL").setIcon("fa fa-envelope").setPosition(2).setValidation(false).setEmail(true, "COMMON_CONTINUE_AND_SENDING");
        wizardConfig.push(emailEditStep);
        var SaleEditStep = new WizardButtonConfig(WizardType.SALE);
        SaleEditStep.setTitle("SALE").setIcon("fa fa-usd").setPosition(3).disable().setValidation(false);
        wizardConfig.push(SaleEditStep);
        return wizardConfig;
    };
    WizardModalController.prototype.getSaleWizardTransitionConfig = function () {
        var wizardConfig = new Array();
        var customerProductEditStep = new WizardButtonConfig(WizardType.CUSTOMER_PRODUCT);
        customerProductEditStep.setTitle("LEAD").setIcon("fa fa-inbox").setPosition(1);
        wizardConfig.push(customerProductEditStep);
        var emailEditStep = new WizardButtonConfig(WizardType.EMAIL);
        emailEditStep.setTitle("COMMON_EMAIL").setIcon("fa fa-envelope").setPosition(2).setValidation(false).setEmail(true, "COMMON_CONTINUE_AND_SENDING");
        wizardConfig.push(emailEditStep);
        var SaleEditStep = new WizardButtonConfig(WizardType.SALE);
        SaleEditStep.setTitle("SALE").setIcon("fa fa-usd").setPosition(3).setAsFirstElement();
        wizardConfig.push(SaleEditStep);
        return wizardConfig;
    };
    WizardModalController.prototype.getWizardConfigByDirectiveType = function (wizardConfig, directiveType) {
        for (var _i = 0, wizardConfig_1 = wizardConfig; _i < wizardConfig_1.length; _i++) {
            var buttonConfig = wizardConfig_1[_i];
            if (buttonConfig.directiveType === directiveType) {
                return buttonConfig;
            }
        }
        return null;
    };
    WizardModalController.prototype.appendTransformation = function (transformation, workflowType) {
        if (!transformation || isNullOrUndefined(workflowType)) {
            return;
        }
        var self = this;
        if (workflowType === WorkflowType.OFFER) {
            this.editProcess.offer = {
                id: null,
                orderPositions: deepCopy(self.editProcess.lead.orderPositions),
                deliveryAddress: self.editProcess.lead.deliveryAddress,
                deliveryDate: null,
                netPrice: self.workflowService.sumOrderPositions(self.editProcess.lead.orderPositions) + self.editProcess.lead.deliveryCosts,
                customer: self.editProcess.lead.customer,
                vat: self.rootScope.user.defaultVat,
                timestamp: newTimestamp(),
                vendor: self.editProcess.lead.vendor,
                deliveryCosts: self.editProcess.lead.deliveryCosts,
                message: self.editProcess.lead.message
            };
            for (var i = 0; i < this.editProcess.offer.orderPositions.length; i++) {
                this.editProcess.offer.orderPositions[i].id = 0;
            }
        }
        else if (workflowType === WorkflowType.SALE) {
            this.editProcess.sale = {
                id: null,
                deliveryAddress: self.editProcess.offer.deliveryAddress,
                deliveryDate: self.editProcess.offer.deliveryDate,
                orderPositions: deepCopy(self.editProcess.offer.orderPositions),
                customer: self.editProcess.offer.customer,
                saleProfit: self.editProcess.offer.netPrice,
                saleCost: 0,
                saleTurnover: self.editProcess.offer.netPrice,
                invoiceNumber: "",
                timestamp: newTimestamp(),
                vendor: self.editProcess.offer.vendor,
                deliveryCosts: self.editProcess.offer.deliveryCosts,
                message: self.editProcess.offer.message
            };
            for (var i = 0; i < this.editProcess.sale.orderPositions.length; i++) {
                this.editProcess.sale.orderPositions[i].id = 0;
            }
        }
    };
    return WizardModalController;
}());
angular.module(moduleWizard, [moduleSummernote]).controller(WizardModalControllerId, WizardModalController);

var WorkflowDatatableServiceId = "WorkflowDatatableService";
var WorkflowDatatableService = (function () {
    function WorkflowDatatableService($rootScope, $compile) {
        this.$inject = [$rootScopeId, $compileId];
        this.rootScope = $rootScope;
        this.compile = $compile;
    }
    WorkflowDatatableService.prototype.getButtons = function (title, columns) {
        return [{
                extend: "copyHtml5",
                exportOptions: {
                    columns: columns,
                    modifier: {
                        page: "current"
                    }
                }
            }, {
                extend: "print",
                orientation: "landscape",
                title: title,
                exportOptions: {
                    columns: columns,
                    modifier: {
                        page: "current"
                    }
                }
            }, {
                extend: "csvHtml5",
                title: title,
                exportOptions: {
                    columns: columns,
                    modifier: {
                        page: "current"
                    }
                }
            }, {
                extend: "excelHtml5",
                title: title,
                exportOptions: {
                    columns: columns,
                    modifier: {
                        page: "current"
                    }
                }
            }, {
                extend: "pdfHtml5",
                title: title,
                orientation: "landscape",
                exportOptions: {
                    columns: columns,
                    modifier: {
                        page: "current"
                    }
                }
            }];
    };
    WorkflowDatatableService.prototype.getDomString = function () {
        return "<'row'<'col-sm-12'l>>" + "<'row'<'col-sm-6'B><'col-sm-6'f>>"
            + "<'row'<'col-sm-12'tr>>"
            + "<'row'<'col-sm-5'i><'col-sm-7'p>>";
    };
    WorkflowDatatableService.prototype.getLanguageSource = function (language) {
        switch (language) {
            case Language[Language.DE]:
                return "/assets/datatablesTranslationFiles/German.json";
            case Language[Language.EN]:
                return "/assets/datatablesTranslationFiles/English.json";
            default:
                return "/assets/datatablesTranslationFiles/English.json";
        }
    };
    WorkflowDatatableService.prototype.changeDataInput = function (loadAllData, dtOptions, allDataRoute, latestDataRoute) {
        var searchDelay = 0;
        if (loadAllData === true) {
            searchDelay = 600;
        }
        dtOptions.withOption("serverSide", loadAllData)
            .withOption("ajax", this.getData(loadAllData, allDataRoute, latestDataRoute))
            .withOption("searchDelay", searchDelay);
    };
    WorkflowDatatableService.prototype.getData = function (loadAllData, allDataRoute, latestDataRoute) {
        var self = this;
        if (loadAllData === true) {
            return {
                url: allDataRoute,
                type: "GET",
                pages: 2,
                dataSrc: "data",
                error: function (xhr, error, thrown) {
                    handleError(xhr);
                },
                "beforeSend": function (request) {
                    request.setRequestHeader("Authorization", "Basic " + self.rootScope.user.authorization);
                    request.setRequestHeader("X-TenantID", self.rootScope.tenant.tenantKey);
                }
            };
        }
        else {
            return {
                url: latestDataRoute,
                error: function (xhr, error, thrown) {
                    handleError(xhr);
                },
                type: "GET",
                "beforeSend": function (request) {
                    request.setRequestHeader("Authorization", "Basic " + self.rootScope.user.authorization);
                    request.setRequestHeader("X-TenantID", self.rootScope.tenant.tenantKey);
                }
            };
        }
    };
    WorkflowDatatableService.prototype.appendChildRow = function (childScope, process, workflowUnit, dtInstance, parent, type) {
        childScope.workflowUnit = workflowUnit;
        childScope.process = process;
        childScope.parent = parent;
        childScope.type = type;
        var link = angular.element("#id_" + process.id), icon = link
            .find(".glyphicon"), tr = link.parent().parent(), table = dtInstance.DataTable, row = table
            .row(tr);
        if (row.child.isShown()) {
            icon.removeClass("glyphicon-minus-sign")
                .addClass("glyphicon-plus-sign");
            row.child.hide();
            tr.removeClass("shown");
            childScope.$destroy();
        }
        else {
            icon.removeClass("glyphicon-plus-sign")
                .addClass("glyphicon-minus-sign");
            var childRow = row.child(this.compile("<div childrow id='childRow" + process.id + "' type='" + type + "' class='clearfix'></div>")(childScope));
            childRow.show();
            tr.addClass("shown");
            var newChildRow = angular.element("#childRow" + process.id).parent().parent();
            newChildRow.addClass("childstyle");
        }
    };
    return WorkflowDatatableService;
}());
angular.module(moduleWorkflowDatatableService, [ngResourceId]).service(WorkflowDatatableServiceId, WorkflowDatatableService);




var LeadDataTableServiceId = "LeadDataTableService";
var allDataLeadRoute = "/api/rest/processes/leads";
var openDataLeadRoute = "/api/rest/processes/workflow/LEAD/state/OPEN";
var LeadDataTableService = (function () {
    function LeadDataTableService(DTOptionsBuilder, DTColumnBuilder, $filter, $compile, $rootScope, $translate, WorkflowService, WorkflowDatatableService) {
        this.$inject = [DTOptionsBuilderId, DTColumnBuilderId, $filterId, $compileId, $rootScopeId, $translateId, WorkflowServiceId, WorkflowDatatableServiceId];
        this.translate = $translate;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.DTColumnBuilder = DTColumnBuilder;
        this.filter = $filter;
        this.compile = $compile;
        this.rootScope = $rootScope;
        this.workflowService = WorkflowService;
        this.workflowDatatableService = WorkflowDatatableService;
    }
    LeadDataTableService.prototype.getDTOptionsConfiguration = function (createdRow, defaultSearch) {
        if (defaultSearch === void 0) { defaultSearch = ""; }
        var self = this;
        return this.DTOptionsBuilder.newOptions()
            .withOption("ajax", {
            url: openDataLeadRoute,
            error: function (xhr, error, thrown) {
                handleError(xhr);
            },
            type: "GET",
            "beforeSend": function (request) {
                request.setRequestHeader("Authorization", "Basic " + self.rootScope.user.authorization);
                request.setRequestHeader("X-TenantID", self.rootScope.tenant.tenantKey);
            }
        })
            .withOption("stateSave", false)
            .withDOM(this.workflowDatatableService.getDomString())
            .withPaginationType("full_numbers")
            .withButtons(this.workflowDatatableService.getButtons(this.translate("LEAD_LEADS"), [6, 1, 2, 3, 4, 5, 7, 9, 8, 10]))
            .withBootstrap()
            .withOption("createdRow", createdRow)
            .withOption("deferRender", true)
            .withOption("order", [4, "desc"])
            .withOption("lengthMenu", [10, 20, 50])
            .withOption("search", { "search": defaultSearch })
            .withLanguageSource(this.workflowDatatableService.getLanguageSource(this.rootScope.language));
    };
    LeadDataTableService.prototype.configRow = function (row, data) {
        var currentDate = moment(newTimestamp(), "DD.MM.YYYY");
        var leadDate = moment(data.lead.timestamp, "DD.MM.YYYY");
        if (currentDate["businessDiff"](leadDate, "days") > 3
            && data.status === "OPEN") {
            $(row).addClass("important");
        }
    };
    LeadDataTableService.prototype.getDetailHTML = function (id) {
        return "<a id='id_" + id + "' class='green shortinfo' href='javascript:;'"
            + "ng-click='leadCtrl.appendChildRow(leadCtrl.processes[" + id
            + "])' title='Details'>"
            + "<i class='glyphicon glyphicon-plus-sign'/></a>";
    };
    LeadDataTableService.prototype.getDTColumnConfiguration = function (addDetailButton, addStatusStyle, addActionsButtons) {
        var self = this;
        return [
            this.DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                .renderWith(addDetailButton),
            this.DTColumnBuilder.newColumn("lead.customer.lastname").withTitle(this.translate("COMMON_NAME")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("lead.customer.company").withTitle(this.translate("COMMON_COMPANY")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("lead.customer.email").withTitle(this.translate("COMMON_EMAIL")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("lead.timestamp").withTitle(this.translate("COMMON_DATE")).renderWith(function (data, type, full) {
                return toLocalDate(data, "DD.MM.YYYY HH:mm");
            }).withOption("type", "date-euro")
                .withClass("text-center"),
            this.DTColumnBuilder.newColumn("lead.customer.phone").withTitle(this.translate("COMMON_PHONE")).notVisible(),
            this.DTColumnBuilder.newColumn("lead.customer.firstname").withTitle(this.translate("COMMON_FIRSTNAME")).notVisible(),
            this.DTColumnBuilder.newColumn("lead.deliveryAddress").withTitle(this.translate("COMMON_PRODUCT_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_PRODUCT_ENTIRE_PRICE"))
                .renderWith(function (data, type, full) {
                return self.filter("currency")(self.workflowService.sumOrderPositions(data.lead.orderPositions) + data.lead.deliveryCosts, "€", 2);
            }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_PRODUCT_DELIVERYCOSTS"))
                .renderWith(function (data, type, full) {
                if (isNullOrUndefined(data.lead.deliveryCosts)) {
                    return self.filter("currency")(0, "€", 2);
                }
                return self.filter("currency")(data.lead.deliveryCosts, "€", 2);
            }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            this.DTColumnBuilder.newColumn(null).withTitle("<span class='glyphicon glyphicon-cog'></span>").withClass("text-center").withOption("width", "210px").notSortable().renderWith(addActionsButtons),
            this.DTColumnBuilder.newColumn(null)
                .renderWith(function (data, type, full) {
                return "#id:" + data.id + "#";
            }).notVisible()
        ];
    };
    LeadDataTableService.prototype.getActionButtonConfig = function (process) {
        var user = new User();
        var rootScopeUser = this.rootScope.user;
        user.id = rootScopeUser.id;
        user.role = Role.SUPERADMIN;
        var config = new ActionButtonConfigBuilder();
        config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setVisible().setTitle("LEAD_FOLLOW_UP").setIcon("fa fa-level-up");
        if (process.status === Status.OPEN || process.status === Status.INCONTACT) {
            config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setEnabled().setIcon("fa fa-level-up");
        }
        if (user.role === Role.ADMIN || user.role === Role.SUPERADMIN) {
            config.get(ActionButtonType.PIN_DROPDOWN).setEnabled().setTitle("LEAD_PIN");
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setEnabled().setTitle("LEAD_DELETE_LEAD");
            config.get(ActionButtonType.PIN_DROPDOWN_EMPTY_PROCESSOR).setEnabled();
        }
        else {
            config.get(ActionButtonType.PIN_BUTTON).setVisible().setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("LEAD_PIN");
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setVisible()
                .setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("LEAD_DELETE_LEAD");
            config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id);
        }
        config.get(ActionButtonType.QUICK_MAIL).setEnabled().setTitle("EMAIL_SEND");
        config.get(ActionButtonType.SET_INCONTACT).setVisible().setTitle("COMMON_STATUS_INCONTACT");
        if (process.status === Status.OPEN) {
            config.get(ActionButtonType.SET_INCONTACT).setEnabled();
        }
        config.get(ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN).setEnabled().setTitle("LEAD_CLOSE_LEAD").setIcon("fa fa-lock");
        config.get(ActionButtonType.DETAILS_OPEN_EDIT_MODAL).setEnabled().setTitle("LEAD_EDIT_LEAD");
        config.get(ActionButtonType.DETAILS_DROPDOWN).setEnabled().setTitle("COMMON_DETAILS");
        if (!isNullOrUndefined(process.offer)
            || !(user.role === Role.ADMIN || user.role === Role.SUPERADMIN) && (!isNullOrUndefined(process.processor) && process.processor.id !== user.id)) {
            config.disableAll();
        }
        else if (process.status === Status.CLOSED) {
            config.disableAll();
            config.get(ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN).setEnabled().setTitle("LEAD_OPEN_LEAD").setIcon("fa fa-unlock");
            config.get(ActionButtonType.DETAILS_DROPDOWN).setEnabled().setTitle("COMMON_DETAILS");
        }
        return config.build();
    };
    LeadDataTableService.prototype.getActionButtonsHTML = function (process, actionButtonConfig) {
        actionButtonConfig[process.id] = this.getActionButtonConfig(process);
        return "<div actionbuttons actionbuttonconfig=leadCtrl.actionButtonConfig[" + process.id + "]  process='leadCtrl.processes[" + process.id + "]'></div>";
    };
    LeadDataTableService.prototype.getStatusStyleHTML = function (data) {
        var hasProcessor = "";
        if (data.processor !== null) {
            hasProcessor = "&nbsp;<span style='color: #ea394c;'><i class='fa fa-thumb-tack'></i></span>";
        }
        if (data.status === "OPEN") {
            return "<span style='color: green;'>"
                + this.translate.instant("COMMON_STATUS_OPEN") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "OFFER") {
            return "<span style='color: #f79d3c;'>"
                + this.translate.instant("COMMON_STATUS_OFFER") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "INCONTACT") {
            return "<span style='color: #f79d3c;'>"
                + this.translate.instant("COMMON_STATUS_INCONTACT") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "FOLLOWUP") {
            return "<span style='color: #f79d3c;'>"
                + this.translate.instant("COMMON_STATUS_FOLLOW_UP") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "DONE") {
            return "<span style='color: #f79d3c;'>"
                + this.translate.instant("COMMON_STATUS_DONE") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "SALE") {
            return "<span style='color: #1872ab;'>"
                + this.translate.instant("COMMON_STATUS_SALE") + "</span>";
        }
        else if (data.status === "CLOSED") {
            return "<span style='color: #ea394c;'>"
                + this.translate.instant("COMMON_STATUS_CLOSED") + "</span>"
                + hasProcessor;
        }
    };
    return LeadDataTableService;
}());
angular.module(moduleLeadDataTableService, [ngResourceId]).service(LeadDataTableServiceId, LeadDataTableService);


var OfferDataTableServiceId = "OfferDataTableService";
var allDataOfferRoute = "/api/rest/processes/offers";
var openDataOfferRoute = "/api/rest/processes/workflow/OFFER/state/OFFER";
var OfferDataTableService = (function () {
    function OfferDataTableService(DTOptionsBuilder, DTColumnBuilder, $filter, $compile, $rootScope, $translate, WorkflowService, WorkflowDatatableService) {
        this.$inject = [DTOptionsBuilderId, DTColumnBuilderId, $filterId, $compileId, $rootScopeId, $translateId, WorkflowServiceId, WorkflowDatatableServiceId];
        this.translate = $translate;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.DTColumnBuilder = DTColumnBuilder;
        this.filter = $filter;
        this.compile = $compile;
        this.rootScope = $rootScope;
        this.workflowService = WorkflowService;
        this.workflowDatatableService = WorkflowDatatableService;
    }
    OfferDataTableService.prototype.getDTOptionsConfiguration = function (createdRow, defaultSearch) {
        if (defaultSearch === void 0) { defaultSearch = ""; }
        var self = this;
        return this.DTOptionsBuilder.newOptions()
            .withOption("ajax", {
            url: openDataOfferRoute,
            error: function (xhr, error, thrown) {
                handleError(xhr);
            },
            type: "GET",
            "beforeSend": function (request) {
                request.setRequestHeader("Authorization", "Basic " + self.rootScope.user.authorization);
                request.setRequestHeader("X-TenantID", self.rootScope.tenant.tenantKey);
            }
        })
            .withOption("stateSave", false)
            .withDOM(this.workflowDatatableService.getDomString())
            .withPaginationType("full_numbers")
            .withButtons(this.workflowDatatableService.getButtons(this.translate("OFFER_OFFERS"), [6, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13]))
            .withBootstrap()
            .withOption("createdRow", createdRow)
            .withOption("deferRender", true)
            .withOption("lengthMenu", [10, 20, 50])
            .withOption("order", [4, "desc"])
            .withOption("search", { "search": defaultSearch })
            .withLanguageSource(this.workflowDatatableService.getLanguageSource(this.rootScope.language));
    };
    OfferDataTableService.prototype.configRow = function (row, data) {
        var currentDate = moment(newTimestamp(), "DD.MM.YYYY");
        var offerDate = moment(data.offer.timestamp, "DD.MM.YYYY");
        if ((currentDate["businessDiff"](offerDate, "days") > 3 && data.status === "OFFER")
            || (currentDate["businessDiff"](offerDate, "days") > 5 && data.status === "FOLLOWUP")) {
            $(row).addClass("important");
        }
    };
    OfferDataTableService.prototype.getDetailHTML = function (id) {
        return "<a id='id_" + id + "' class='green shortinfo' href='javascript:;'"
            + "ng-click='offerCtrl.appendChildRow(offerCtrl.processes[" + id
            + "])' title='Details'>"
            + "<i class='glyphicon glyphicon-plus-sign'/></a>";
    };
    OfferDataTableService.prototype.getDTColumnConfiguration = function (addDetailButton, addStatusStyle, addActionsButtons) {
        var self = this;
        return [
            this.DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                .renderWith(addDetailButton),
            this.DTColumnBuilder.newColumn("offer.customer.lastname").withTitle(this.translate("COMMON_NAME")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.customer.company").withTitle(this.translate("COMMON_COMPANY")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.customer.email").withTitle(this.translate("COMMON_EMAIL")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.timestamp").withTitle(this.translate("COMMON_DATE")).renderWith(function (data, type, full) {
                return toLocalDate(data, "DD.MM.YYYY HH:mm");
            }).withOption("type", "date-euro")
                .withClass("text-center"),
            this.DTColumnBuilder.newColumn("offer.customer.phone").withTitle(this.translate("COMMON_PHONE")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.customer.firstname").withTitle(this.translate("COMMON_FIRSTNAME")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.deliveryAddress").withTitle(this.translate("COMMON_PRODUCT_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn("offer.deliveryDate").withTitle(this.translate("COMMON_DELIVERY_TIME")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_PRODUCT_DELIVERYCOSTS"))
                .renderWith(function (data, type, full) {
                if (isNullOrUndefined(data.offer.deliveryCosts)) {
                    return self.filter("currency")(0, "€", 2);
                }
                return self.filter("currency")(data.lead.deliveryCosts, "€", 2);
            }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_PRODUCT_OFFER_PRICE"))
                .renderWith(function (data, type, full) {
                if (isNullOrUndefined(data.offer.netPrice)) {
                    return self.filter("currency")(0, "€", 2);
                }
                return self.filter("currency")(data.offer.netPrice, "€", 2);
            }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_PROCESSOR")).renderWith(function (data, type, full) {
                if (isNullOrUndefined(data.processor)) {
                    return "";
                }
                return data.processor.email;
            }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            this.DTColumnBuilder.newColumn(null).withTitle("<span class='glyphicon glyphicon-cog'></span>").withClass("text-center").withOption("width", "210px").notSortable().renderWith(addActionsButtons),
            this.DTColumnBuilder.newColumn(null)
                .renderWith(function (data, type, full) {
                return "#id:" + data.id + "#";
            }).notVisible()
        ];
    };
    OfferDataTableService.prototype.getActionButtonConfig = function (process) {
        var user = new User();
        var rootScopeUser = this.rootScope.user;
        user.id = rootScopeUser.id;
        user.role = Role.SUPERADMIN;
        var config = new ActionButtonConfigBuilder();
        config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setVisible().setTitle("OFFER_CREATE_SALE").setIcon("fa fa-usd");
        if (process.status === Status.OFFER || process.status === Status.FOLLOWUP || process.status === Status.DONE) {
            config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setEnabled().setIcon("fa fa-usd");
        }
        if (user.role === Role.ADMIN || user.role === Role.SUPERADMIN) {
            config.get(ActionButtonType.PIN_DROPDOWN).setEnabled().setTitle("LEAD_PIN");
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setEnabled().setTitle("OFFER_DELETE_OFFER");
            config.get(ActionButtonType.PIN_DROPDOWN_EMPTY_PROCESSOR).setEnabled();
            config.get(ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL).setEnabled().setTitle("OFFER_ROLLBACK_TITLE");
        }
        else {
            config.get(ActionButtonType.PIN_BUTTON).setVisible().setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("LEAD_PIN");
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setVisible()
                .setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("LEAD_DELETE_LEAD");
            config.get(ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL).setVisible()
                .setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("OFFER_ROLLBACK_TITLE");
            config.get(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT).setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id);
        }
        config.get(ActionButtonType.QUICK_MAIL).setEnabled().setTitle("EMAIL_SEND");
        config.get(ActionButtonType.SET_OFFER_DONE).setEnabled().setTitle("COMMON_STATUS_SET_DONE").setIcon("fa fa-check");
        config.get(ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN).setEnabled().setTitle("OFFER_CLOSE_OFFER").setIcon("fa fa-lock");
        config.get(ActionButtonType.DETAILS_OPEN_EDIT_MODAL).setEnabled().setTitle("OFFER_EDIT_OFFER");
        config.get(ActionButtonType.DETAILS_DROPDOWN).setEnabled().setTitle("COMMON_DETAILS");
        if (!isNullOrUndefined(process.sale)
            || !(user.role === Role.ADMIN || user.role === Role.SUPERADMIN) && (!isNullOrUndefined(process.processor) && process.processor.id !== user.id)) {
            config.disableAll();
        }
        else if (process.status === Status.DONE) {
            config.get(ActionButtonType.SET_OFFER_DONE).setEnabled().setTitle("COMMON_STATUS_SET_OPEN").setIcon("fa fa-undo");
        }
        else if (process.status === Status.CLOSED) {
            config.disableAll();
            config.get(ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN).setEnabled().setTitle("OFFER_OPEN_OFFER").setIcon("fa fa-unlock");
            config.get(ActionButtonType.DETAILS_DROPDOWN).setEnabled().setTitle("COMMON_DETAILS");
        }
        return config.build();
    };
    OfferDataTableService.prototype.getActionButtonsHTML = function (process, actionButtonConfig) {
        actionButtonConfig[process.id] = this.getActionButtonConfig(process);
        return "<div actionbuttons actionbuttonconfig=offerCtrl.actionButtonConfig[" + process.id + "]  process='offerCtrl.processes[" + process.id + "]'></div>";
    };
    OfferDataTableService.prototype.getStatusStyleHTML = function (data) {
        var hasProcessor = "";
        if (data.processor !== null) {
            hasProcessor = "&nbsp;<span style='color: #ea394c;'><i class='fa fa-thumb-tack'></i></span>";
        }
        if (data.status === "OPEN" || data.status === "OFFER") {
            return "<span style='color: green;'>"
                + this.translate.instant("COMMON_STATUS_OPEN") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "FOLLOWUP") {
            return "<span style='color: #f79d3c;'>"
                + data.followUpAmount + "x " + this.translate.instant("COMMON_STATUS_FOLLOW_UP") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "DONE") {
            return "<span style='color: #f79d3c;'>"
                + this.translate.instant("COMMON_STATUS_DONE") + "</span>"
                + hasProcessor;
        }
        else if (data.status === "SALE") {
            return "<span style='color: #1872ab;'>"
                + this.translate.instant("COMMON_STATUS_SALE") + "</span>";
        }
        else if (data.status === "CLOSED") {
            return "<span style='color: #ea394c;'>"
                + this.translate.instant("COMMON_STATUS_CLOSED") + "</span>"
                + hasProcessor;
        }
    };
    return OfferDataTableService;
}());
angular.module(moduleOfferDataTableService, [ngResourceId]).service(OfferDataTableServiceId, OfferDataTableService);


var SaleDataTableServiceId = "SaleDataTableService";
var allDataSaleRoute = "/api/rest/processes/sales";
var openDataSaleRoute = "/api/rest/processes/sales/latest/50";
var SaleDataTableService = (function () {
    function SaleDataTableService(DTOptionsBuilder, DTColumnBuilder, $filter, $compile, $rootScope, $translate, WorkflowService, WorkflowDatatableService) {
        this.$inject = [DTOptionsBuilderId, DTColumnBuilderId, $filterId, $compileId, $rootScopeId, $translateId, WorkflowServiceId, WorkflowDatatableServiceId];
        this.translate = $translate;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.DTColumnBuilder = DTColumnBuilder;
        this.filter = $filter;
        this.compile = $compile;
        this.rootScope = $rootScope;
        this.workflowService = WorkflowService;
        this.workflowDatatableService = WorkflowDatatableService;
    }
    SaleDataTableService.prototype.getDTOptionsConfiguration = function (createdRow, defaultSearch) {
        if (defaultSearch === void 0) { defaultSearch = ""; }
        var self = this;
        return this.DTOptionsBuilder.newOptions()
            .withOption("ajax", {
            url: openDataSaleRoute,
            error: function (xhr, error, thrown) {
                handleError(xhr);
            },
            type: "GET",
            "beforeSend": function (request) {
                request.setRequestHeader("Authorization", "Basic " + self.rootScope.user.authorization);
                request.setRequestHeader("X-TenantID", self.rootScope.tenant.tenantKey);
            }
        })
            .withOption("stateSave", false)
            .withDOM(this.workflowDatatableService.getDomString())
            .withPaginationType("full_numbers")
            .withButtons(this.workflowDatatableService.getButtons(this.translate("SALE_SALES"), [6, 1, 2, 3, 4, 5, 7, 8, 9, 10, 12]))
            .withBootstrap()
            .withOption("createdRow", createdRow)
            .withOption("deferRender", true)
            .withOption("lengthMenu", [10, 20, 50])
            .withOption("order", [4, "desc"])
            .withOption("search", { "search": defaultSearch })
            .withLanguageSource(this.workflowDatatableService.getLanguageSource(this.rootScope.language));
    };
    SaleDataTableService.prototype.getDetailHTML = function (id) {
        return "<a id='id_" + id + "' class='green shortinfo' href='javascript:;'"
            + "ng-click='saleCtrl.appendChildRow(saleCtrl.processes[" + id
            + "])' title='Details'>"
            + "<i class='glyphicon glyphicon-plus-sign'/></a>";
    };
    SaleDataTableService.prototype.getDTColumnConfiguration = function (addDetailButton, addStatusStyle, addActionsButtons) {
        var self = this;
        return [
            this.DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                .renderWith(addDetailButton),
            this.DTColumnBuilder.newColumn("sale.customer.lastname").withTitle(this.translate("COMMON_NAME")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.company").withTitle(this.translate("COMMON_COMPANY")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.email").withTitle(this.translate("COMMON_EMAIL")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.timestamp").withTitle(this.translate("COMMON_DATE")).renderWith(function (data, type, full) {
                return toLocalDate(data, "DD.MM.YYYY HH:mm");
            }).withOption("type", "date-euro")
                .withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.phone").withTitle(this.translate("COMMON_PHONE")).notVisible(),
            this.DTColumnBuilder.newColumn("sale.customer.firstname").withTitle(this.translate("COMMON_FIRSTNAME")).notVisible(),
            this.DTColumnBuilder.newColumn("sale.deliveryAddress").withTitle(this.translate("COMMON_PRODUCT_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_PRODUCT_SALE_TURNOVER")).renderWith(function (data, type, full) {
                if (isNullOrUndefined(data.sale.saleTurnover)) {
                    return self.filter("currency")(0, "€", 2);
                }
                return self.filter("currency")(data.sale.saleTurnover, "€", 2);
            }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_PRODUCT_SALE_PROFIT")).renderWith(function (data, type, full) {
                if (isNullOrUndefined(data.sale.saleProfit)) {
                    return self.filter("currency")(0, "€", 2);
                }
                return self.filter("currency")(data.sale.saleProfit, "€", 2);
            }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_PROCESSOR")).renderWith(function (data, type, full) {
                if (isNullOrUndefined(data.processor)) {
                    return "";
                }
                return data.processor.email;
            }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            this.DTColumnBuilder.newColumn("sale.invoiceNumber").withTitle(this.translate("COMMON_PRODUCT_SALE_INVOICE_NUMBER")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle("<span class='glyphicon glyphicon-cog'></span>").withClass("text-center").withOption("width", "90px").notSortable().renderWith(addActionsButtons),
            this.DTColumnBuilder.newColumn(null)
                .renderWith(function (data, type, full) {
                return "#id:" + data.id + "#";
            }).notVisible()
        ];
    };
    SaleDataTableService.prototype.getActionButtonConfig = function (process) {
        var user = new User();
        var rootScopeUser = this.rootScope.user;
        user.id = rootScopeUser.id;
        user.role = Role.SUPERADMIN;
        var config = new ActionButtonConfigBuilder();
        if (user.role === Role.ADMIN || user.role === Role.SUPERADMIN) {
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setEnabled().setTitle("SALE_DELETE_SALE");
            config.get(ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL).setEnabled().setTitle("SALE_ROLLBACK_TITLE");
        }
        else {
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setVisible()
                .setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("SALE_DELETE_SALE");
            config.get(ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL).setVisible()
                .setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("SALE_ROLLBACK_TITLE");
        }
        config.get(ActionButtonType.QUICK_MAIL).setEnabled().setTitle("EMAIL_SEND");
        config.get(ActionButtonType.DETAILS_OPEN_EDIT_MODAL).setEnabled().setTitle("SALE_EDIT_SALE");
        config.get(ActionButtonType.DETAILS_DROPDOWN).setEnabled().setTitle("COMMON_DETAILS");
        if (!(user.role === Role.ADMIN || user.role === Role.SUPERADMIN) && (!isNullOrUndefined(process.processor) && process.processor.id !== user.id)) {
            config.disableAll();
        }
        return config.build();
    };
    SaleDataTableService.prototype.configRow = function (row, data) {
    };
    SaleDataTableService.prototype.getActionButtonsHTML = function (process, actionButtonConfig) {
        actionButtonConfig[process.id] = this.getActionButtonConfig(process);
        return "<div actionbuttons minwidth='90' actionbuttonconfig=saleCtrl.actionButtonConfig[" + process.id + "]  process='saleCtrl.processes[" + process.id + "]'></div>";
    };
    SaleDataTableService.prototype.getStatusStyleHTML = function (data) {
        return "<span style='color: #1872ab;'>"
            + this.translate.instant("COMMON_STATUS_SALE") + "</span>";
    };
    return SaleDataTableService;
}());
angular.module(moduleSaleDataTableService, [ngResourceId]).service(SaleDataTableServiceId, SaleDataTableService);

var WorkflowProcessMap = (function () {
    function WorkflowProcessMap() {
        this.lead = {};
        this.offer = {};
        this.sale = {};
    }
    return WorkflowProcessMap;
}());

var WorkflowDatatableRowServiceId = "WorkflowDatatableRowService";
var WorkflowDatatableRowService = (function () {
    function WorkflowDatatableRowService($rootScope, $translate, toaster, $compile, ProcessService) {
        this.$inject = [$rootScopeId, $translateId, toasterId, $compileId, ProcessServiceId];
        this.worfklowProcessMap = new WorkflowProcessMap();
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.toaster = toaster;
        this.compile = $compile;
        this.processService = ProcessService;
    }
    WorkflowDatatableRowService.prototype.setRow = function (id, workflowType, row) {
        this.worfklowProcessMap[workflowType.toString().toLowerCase()][id] = row;
    };
    WorkflowDatatableRowService.prototype.updateRow = function (process, dtInstance, workflowType, scope) {
        dtInstance.DataTable.row(this.worfklowProcessMap[workflowType.toString().toLowerCase()][process.id]).data(process).draw(false);
        this.compile(angular.element(this.worfklowProcessMap[workflowType.toString().toLowerCase()][process.id]).contents())(scope);
    };
    WorkflowDatatableRowService.prototype.removeOrUpdateRow = function (process, loadAllData, dtInstance, workflowType, scope) {
        if (loadAllData === true) {
            this.updateRow(process, dtInstance, workflowType, scope);
        }
        else if (loadAllData === false) {
            this.deleteRow(process, dtInstance, workflowType);
        }
    };
    WorkflowDatatableRowService.prototype.deleteRow = function (process, dtInstance, workflowType) {
        dtInstance.DataTable.row(this.worfklowProcessMap[workflowType.toString().toLowerCase()][process.id]).remove().draw();
    };
    return WorkflowDatatableRowService;
}());
angular.module(moduleWorkflowDatatableRowService, [ngResourceId]).service(WorkflowDatatableRowServiceId, WorkflowDatatableRowService);

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WorkflowControllerId = "WorkflowController";
var broadcastUpdate = "updateRow";
var broadcastRemoveOrUpdate = "removeOrUpdateRow";
var broadcastRemove = "removeRow";
var broadcastOpenEditModal = "openEditModal";
var broadcastUpdateChildrow = "updateChildrow";
var WorkflowController = (function () {
    function WorkflowController($rootScope, $scope, $compile, $routeParams, $route, $sce, $uibModal, WorkflowService, WorkflowDatatableService, WorkflowDatatableRowService, LeadDataTableService, OfferDataTableService, SaleDataTableService) {
        var _this = this;
        this.actionButtonConfig = {};
        this.scopes = {};
        this.processes = {};
        this.dtInstance = { DataTable: null };
        this.loadAllData = false;
        this.$inject = [$rootScopeId, $scopeId, $compileId, $routeParamsId, $routeId, $sceId, $uibModalId, WorkflowServiceId, WorkflowDatatableServiceId, WorkflowDatatableRowServiceId, LeadDataTableServiceId, , OfferDataTableServiceId, SaleDataTableServiceId];
        this.controllerType = $route.current.$$route.type;
        switch (this.controllerType) {
            case WorkflowType.LEAD:
                this.IDatatableService = LeadDataTableService;
                this.allDataRoute = allDataLeadRoute;
                this.openDataRoute = openDataLeadRoute;
                break;
            case WorkflowType.OFFER:
                this.IDatatableService = OfferDataTableService;
                this.allDataRoute = allDataOfferRoute;
                this.openDataRoute = openDataOfferRoute;
                break;
            case WorkflowType.SALE:
                this.IDatatableService = SaleDataTableService;
                this.allDataRoute = allDataSaleRoute;
                this.openDataRoute = openDataSaleRoute;
                break;
        }
        ;
        this.workflowService = WorkflowService;
        this.workflowDatatableService = WorkflowDatatableService;
        this.workflowDatatableRowService = WorkflowDatatableRowService;
        this.sce = $sce;
        this.scope = $scope;
        this.compile = $compile;
        this.uibModal = $uibModal;
        this.rootScope = $rootScope;
        this.compile = $compile;
        var self = this;
        function createdRow(row, data, dataIndex) {
            self.workflowDatatableRowService.setRow(data.id, self.controllerType, row);
            self.IDatatableService.configRow(row, data);
            self.compile(angular.element(row).contents())(self.getScopeByKey("actionButtonScope" + data.id));
        }
        function addActionsButtons(data, type, full, meta) {
            return self.IDatatableService.getActionButtonsHTML(data, self.actionButtonConfig);
        }
        function addStatusStyle(data, type, full, meta) {
            self.processes[data.id] = data;
            return self.IDatatableService.getStatusStyleHTML(data);
        }
        function addDetailButton(data, type, full, meta) {
            self.processes[data.id] = data;
            return self.IDatatableService.getDetailHTML(data.id);
        }
        this.dtOptions = this.IDatatableService.getDTOptionsConfiguration(createdRow, "");
        this.dtColumns = this.IDatatableService.getDTColumnConfiguration(addDetailButton, addStatusStyle, addActionsButtons);
        var clearWatchers = function (doClear) {
            if (doClear) {
                self.destroyAllScopes();
            }
        };
        this.dtInstanceCallback = function dtInstanceCallback(dtInstance) {
            self.dtInstance = dtInstance;
            dtInstance.DataTable.on("page.dt length.dt search.dt", function () {
                clearWatchers(self.loadAllData);
            });
            var searchLink = "";
            var processId = $routeParams.processId;
            if (!isNullOrUndefined(processId) && processId !== "") {
                searchLink = "#id:" + processId + "#";
                self.dtInstance.DataTable.search(searchLink).draw;
                var intervall_1 = setInterval(function () {
                    if (!isNullOrUndefined(angular.element("#id_" + processId)) && !isNullOrUndefined(self.processes[processId])) {
                        self.appendChildRow(self.processes[processId]);
                        clearInterval(intervall_1);
                    }
                }, 100);
                setTimeout(function () {
                    clearInterval(intervall_1);
                }, 10000);
            }
        };
        var deleteRow = $rootScope.$on(broadcastRemove, function (event, data) {
            clearWatchers(self.loadAllData);
            self.workflowDatatableRowService.deleteRow(data, self.dtInstance, self.controllerType);
        });
        var updateOrRemove = $rootScope.$on(broadcastRemoveOrUpdate, function (event, data) {
            clearWatchers(self.loadAllData);
            self.workflowDatatableRowService.removeOrUpdateRow(data, self.loadAllData, self.dtInstance, self.controllerType, self.dropCreateScope("compileScope" + data.id));
        });
        var updateRow = $rootScope.$on(broadcastUpdate, function (event, data) {
            clearWatchers(self.loadAllData);
            self.workflowDatatableRowService.updateRow(data, self.dtInstance, self.controllerType, self.dropCreateScope("compileScope" + data.id));
        });
        var updateChildRow = $rootScope.$on(broadcastUpdateChildrow, function (event, data) {
            _this.updateChildRow(data);
        });
        var openEditModal = $rootScope.$on(broadcastOpenEditModal, function (event, data) {
            self.openEditModal(data);
        });
        $scope.$on("$destroy", function handler() {
            deleteRow();
            updateOrRemove();
            updateRow();
            openEditModal();
            self.destroyAllScopes();
        });
        this.registerIntervall();
    }
    WorkflowController.prototype.registerIntervall = function () {
        var self = this;
        var intervall = setInterval(function () {
            self.refreshData();
        }, 10 * 60 * 1000);
        self.scope.$on("$destroy", function () {
            clearInterval(intervall);
        });
    };
    WorkflowController.prototype.refreshData = function () {
        var resetPaging = false;
        this.dtInstance.reloadData(resetPaging);
    };
    WorkflowController.prototype.openEditModal = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.workflowService.openEditModal(process, this.controllerType)];
                    case 1:
                        resultProcess = _a.sent();
                        this.updateChildRow(resultProcess);
                        return [2 ];
                }
            });
        });
    };
    WorkflowController.prototype.updateChildRow = function (resultProcess) {
        if (!isNullOrUndefined(resultProcess)) {
            this.getScopeByKey("childRowScope" + resultProcess.id).workflowUnit = resultProcess[this.controllerType.toString().toLowerCase()];
            this.getScopeByKey("childRowScope" + resultProcess.id).process = resultProcess;
        }
    };
    WorkflowController.prototype.openNewLeadModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.workflowService.openNewLeadModal()];
                    case 1:
                        resultProcess = _a.sent();
                        if (!isNullOrUndefined(resultProcess)) {
                            this.rootScope.leadsCount += 1;
                            this.dtInstance.DataTable.row.add(resultProcess).draw();
                        }
                        return [2 ];
                }
            });
        });
    };
    WorkflowController.prototype.deleteRow = function (process) {
        this.workflowDatatableRowService.deleteRow(process, this.dtInstance, this.controllerType);
    };
    WorkflowController.prototype.getOrderPositions = function (process) {
        if (!isNullOrUndefined(process[this.controllerType.toString().toLowerCase()])) {
            return process[this.controllerType.toString().toLowerCase()].orderPositions;
        }
    };
    WorkflowController.prototype.getActionButtonConfig = function (process) {
        return this.IDatatableService.getActionButtonConfig(process);
    };
    WorkflowController.prototype.changeDataInput = function () {
        this.destroyAllScopes();
        this.workflowDatatableService.changeDataInput(this.loadAllData, this.dtOptions, this.allDataRoute, this.openDataRoute);
    };
    WorkflowController.prototype.appendChildRow = function (process) {
        this.workflowDatatableService.appendChildRow(this.getScopeByKey("childRowScope" + process.id, true), process, process[this.controllerType.toString().toLowerCase()], this.dtInstance, this, this.controllerType.toString().toLowerCase());
    };
    WorkflowController.prototype.getAsHtml = function (html) {
        return this.sce.trustAsHtml(html);
    };
    WorkflowController.prototype.getNameOfUser = function (user) {
        return getNameOfUser(user);
    };
    WorkflowController.prototype.addComment = function (id, input, process) {
        if (process === void 0) { process = null; }
        if (isNullOrUndefined(process)) {
            process = this.processes[id];
        }
        this.workflowService.addComment(process, input[id]).then(function () {
            input[id] = "";
        });
    };
    WorkflowController.prototype.destroyAllScopes = function () {
        for (var key in this.scopes) {
            if (this.scopes.hasOwnProperty(key)) {
                this.scopes[key].$destroy();
            }
        }
        this.scopes = {};
    };
    WorkflowController.prototype.getScopeByKey = function (key, isolated) {
        if (isolated === void 0) { isolated = false; }
        var childScope = this.scopes[key];
        if (isNullOrUndefined(childScope) || childScope.$$destroyed) {
            childScope = this.scope.$new(isolated);
            this.scopes[key] = childScope;
        }
        return childScope;
    };
    WorkflowController.prototype.dropCreateScope = function (key, isolated) {
        if (isolated === void 0) { isolated = false; }
        var childScope = this.scopes[key];
        if (isNullOrUndefined(childScope) || childScope.$$destroyed) {
            childScope = this.scope.$new(isolated);
            this.scopes[key] = childScope;
        }
        else {
            this.scopes[key].$destroy();
            childScope = this.scope.$new(isolated);
            this.scopes[key] = childScope;
        }
        return childScope;
    };
    return WorkflowController;
}());
angular.module(moduleWorkflow, [ngResourceId]).controller(WorkflowControllerId, WorkflowController);

var ConfirmationFunctionType;
(function (ConfirmationFunctionType) {
    ConfirmationFunctionType[ConfirmationFunctionType["ROLLBACK"] = "ROLLBACK"] = "ROLLBACK";
    ConfirmationFunctionType[ConfirmationFunctionType["DELETE"] = "DELETE"] = "DELETE";
})(ConfirmationFunctionType || (ConfirmationFunctionType = {}));

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ConfirmationModalControllerId = "ConfirmationModalController";
var ConfirmationModalController = (function () {
    function ConfirmationModalController(process, functionType, $uibModalInstance, WorkflowService, $translate) {
        this.$inject = ["process", "functionType", $uibModalId, WorkflowServiceId, $translateId];
        this.uibModalInstance = $uibModalInstance;
        this.translate = $translate;
        this.editProcess = deepCopy(process);
        this.workflowService = WorkflowService;
        this.switchFunctionByType(functionType, this.editProcess);
    }
    ConfirmationModalController.prototype.switchFunctionByType = function (functionType, process) {
        switch (functionType) {
            case ConfirmationFunctionType.ROLLBACK:
                if (this.workflowService.isOffer(process)) {
                    this.setUpRollbackOffer();
                }
                else if (this.workflowService.isSale(process)) {
                    this.setUpRollbackSale();
                }
                break;
            case ConfirmationFunctionType.DELETE:
                this.setUpDeleteProcess();
                break;
        }
        ;
    };
    ConfirmationModalController.prototype.setUpRollbackOffer = function () {
        this.title = this.translate.instant("OFFER_ROLLBACK_TITLE");
        this.body = this.translate.instant("OFFER_ROLLBACK_BODY");
        this.submitText = this.translate.instant("OFFER_ROLLBACK_TITLE");
        this.submitFunction = this.rollbackOffer;
    };
    ConfirmationModalController.prototype.setUpRollbackSale = function () {
        this.title = this.translate.instant("SALE_ROLLBACK_TITLE");
        this.body = this.translate.instant("SALE_ROLLBACK_BODY");
        this.submitText = this.translate.instant("SALE_ROLLBACK_TITLE");
        this.submitFunction = this.rollbackSale;
    };
    ConfirmationModalController.prototype.rollbackOffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.workflowService.rollBackOffer(this.editProcess)];
                    case 1:
                        resultProcess = _a.sent();
                        this.uibModalInstance.close(resultProcess);
                        return [2 ];
                }
            });
        });
    };
    ConfirmationModalController.prototype.rollbackSale = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.workflowService.rollBackSale(this.editProcess)];
                    case 1:
                        resultProcess = _a.sent();
                        this.uibModalInstance.close(resultProcess);
                        return [2 ];
                }
            });
        });
    };
    ConfirmationModalController.prototype.setUpDeleteProcess = function () {
        this.title = this.translate.instant("PROCESS_DELETE_PROCESS_TITLE");
        this.body = this.translate.instant("PROCESS_DELETE_PROCESS_BODY");
        this.submitText = this.translate.instant("PROCESS_DELETE_PROCESS_TITLE");
        this.submitFunction = this.deleteProcess;
    };
    ConfirmationModalController.prototype.deleteProcess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.workflowService.deleteProcess(this.editProcess)];
                    case 1:
                        resultProcess = _a.sent();
                        this.uibModalInstance.close(resultProcess);
                        return [2 ];
                }
            });
        });
    };
    return ConfirmationModalController;
}());
angular.module(moduleConfirmation, [moduleSummernote]).controller(ConfirmationModalControllerId, ConfirmationModalController);

var WorkflowModalServiceId = "WorkflowModalService";
var WorkflowModalService = (function () {
    function WorkflowModalService($rootScope, $translate, toaster, $q, $uibModal) {
        this.$inject = [$rootScopeId, $translateId, toasterId, $qId, $uibModalId];
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.toaster = toaster;
        this.$q = $q;
        this.uibModal = $uibModal;
    }
    WorkflowModalService.prototype.getWizardTemplate = function (controllerType) {
        var editable = controllerType !== WorkflowType.SALE;
        var wizardSteps = "\n        <customer-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,\"" + WizardType.CUSTOMER + "\")' edit-workflow-unit='wizardCtrl.editProcess[\"" + controllerType.toString().toLowerCase() + "\"]' edit-process='wizardCtrl.editProcess' editable='" + editable + "' small='false'/>\n        <product-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,\"" + WizardType.PRODUCT + "\")' edit-workflow-unit='wizardCtrl.editProcess[\"" + controllerType.toString().toLowerCase() + "\"]' edit-process='wizardCtrl.editProcess' editable='" + editable + "'/>";
        switch (controllerType) {
            case WorkflowType.LEAD:
                break;
            case WorkflowType.OFFER:
                wizardSteps += "<email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,\"" + WizardType.EMAIL + "\")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>";
                break;
            case WorkflowType.SALE:
                wizardSteps += "<email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,\"" + WizardType.EMAIL + "\")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>";
                wizardSteps += "<sale-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardEditConfig,\"" + WizardType.SALE + "\")' edit-workflow-unit='wizardCtrl.editProcess[\"" + controllerType.toString().toLowerCase() + "\"]' edit-process='wizardCtrl.editProcess' editable='true'/>";
                break;
        }
        ;
        return "<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess[\"" + controllerType.toString().toLowerCase() + "\"]' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardEditConfig' current-notification='wizardCtrl.notification' transform='false'>\n            " + wizardSteps + "</wizard>";
    };
    WorkflowModalService.prototype.openNewLeadModal = function () {
        var defer = this.$q.defer();
        var self = this;
        var process = new Process();
        process.status = Status.OPEN;
        process.formerProcessors = [new Processor(self.rootScope.user, Activity.OPEN)];
        process.lead = new Lead();
        process.lead.orderPositions = new Array();
        process.lead.timestamp = newTimestamp();
        process.lead.customer = new Customer();
        var wizardTemplate = this.getWizardTemplate(WorkflowType.LEAD);
        this.uibModal.open({
            template: wizardTemplate,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
                },
                workflowType: function () {
                    return WorkflowType.LEAD;
                },
                transformation: function () {
                    return false;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    };
    WorkflowModalService.prototype.openEditModal = function (process, controllerType) {
        var defer = this.$q.defer();
        var wizardTemplate = this.getWizardTemplate(controllerType);
        this.uibModal.open({
            template: wizardTemplate,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
                },
                workflowType: function () {
                    return controllerType;
                },
                transformation: function () {
                    return false;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    };
    WorkflowModalService.prototype.getQuickEmailWizardTemplate = function (workflowType) {
        var wizardSteps = "\n      <email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardQuickEmailConfig,\"" + WizardType.EMAIL + "\")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>";
        return "<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess[\"" + workflowType.toString().toLowerCase() + "\"]' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardQuickEmailConfig' current-notification='wizardCtrl.notification' transform='false'>\n            " + wizardSteps + "</wizard>";
    };
    WorkflowModalService.prototype.openQuickEmailModal = function (process, workflowType) {
        var defer = this.$q.defer();
        var self = this;
        if (isNullOrUndefined(workflowType)) {
            return;
        }
        var wizardTemplate = this.getQuickEmailWizardTemplate(workflowType);
        this.uibModal.open({
            template: wizardTemplate,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
                },
                workflowType: function () {
                    return workflowType;
                },
                transformation: function () {
                    return false;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    };
    WorkflowModalService.prototype.getOfferTransformationWizardTemplate = function () {
        var wizardSteps = "\n        <customer-product-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardOfferTransitionConfig,\"" + WizardType.CUSTOMER_PRODUCT + "\")' edit-workflow-unit='wizardCtrl.editProcess.offer' edit-process='wizardCtrl.editProcess' editable='true'/>";
        wizardSteps += "<email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardOfferTransitionConfig,\"" + WizardType.EMAIL + "\")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>";
        wizardSteps += "<sale-edit />";
        return "<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess.offer' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardOfferTransitionConfig' current-notification='wizardCtrl.notification' transform='true'>\n            " + wizardSteps + "</wizard>";
    };
    WorkflowModalService.prototype.openOfferTransformationModal = function (process) {
        var defer = this.$q.defer();
        var wizardTemplate = this.getOfferTransformationWizardTemplate();
        this.uibModal.open({
            template: wizardTemplate,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
                },
                workflowType: function () {
                    return WorkflowType.OFFER;
                },
                transformation: function () {
                    return true;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    };
    WorkflowModalService.prototype.getSaleTransformationWizardTemplate = function () {
        var wizardSteps = "\n        <customer-product-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardSaleTransitionConfig,\"" + WizardType.CUSTOMER_PRODUCT + "\")' edit-workflow-unit='wizardCtrl.editProcess.sale' edit-process='wizardCtrl.editProcess' editable='false'/>";
        wizardSteps += "<email-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardSaleTransitionConfig,\"" + WizardType.EMAIL + "\")' process='wizardCtrl.editProcess' disabled='false' notification='wizardCtrl.notification'/>";
        wizardSteps += "<sale-edit form='wizardCtrl.getWizardConfigByDirectiveType(wizardCtrl.wizardSaleTransitionConfig,\"" + WizardType.SALE + "\")' edit-workflow-unit='wizardCtrl.editProcess.sale' edit-process='wizardCtrl.editProcess' editable='true'/>";
        return "<wizard edit-process='wizardCtrl.editProcess' edit-workflow-unit='wizardCtrl.editProcess.sale' modal-instance='wizardCtrl.uibModalInstance' wizard-config='wizardCtrl.wizardSaleTransitionConfig' current-notification='wizardCtrl.notification' transform='true'>\n            " + wizardSteps + "</wizard>";
    };
    WorkflowModalService.prototype.openSaleTransformationModal = function (process) {
        var defer = this.$q.defer();
        var wizardTemplate = this.getSaleTransformationWizardTemplate();
        this.uibModal.open({
            template: wizardTemplate,
            controller: WizardModalController,
            controllerAs: "wizardCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
                }, workflowType: function () {
                    return WorkflowType.SALE;
                },
                transformation: function () {
                    return true;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    };
    WorkflowModalService.prototype.openConfirmationModal = function (process, confirmationFunctionType, submitButtonClass, modalSize) {
        if (submitButtonClass === void 0) { submitButtonClass = "danger"; }
        if (modalSize === void 0) { modalSize = ""; }
        var defer = this.$q.defer();
        this.uibModal.open({
            template: "<confirmation-modal modal-instance='confirmationCtrl.uibModalInstance' title='confirmationCtrl.title' body='confirmationCtrl.body' submit-text='confirmationCtrl.submitText' submit-function='confirmationCtrl.submitFunction()' submit-button-class='" + submitButtonClass + "'></confirmation-modal>",
            controller: ConfirmationModalController,
            controllerAs: "confirmationCtrl",
            backdrop: "static",
            size: modalSize,
            resolve: {
                process: function () {
                    return process;
                },
                functionType: function () {
                    return confirmationFunctionType;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    };
    return WorkflowModalService;
}());
angular.module(moduleWorkflowModalService, [ngResourceId]).service(WorkflowModalServiceId, WorkflowModalService);

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WorkflowServiceId = "WorkflowService";
var WorkflowService = (function () {
    function WorkflowService(CommentResource, SaleResource, OfferResource, toaster, $rootScope, $translate, $q, CustomerService, UserResource, ProcessService, WorkflowModalService) {
        this.$inject = [CommentResourceId, SaleResourceId, OfferResourceId, toasterId, $rootScopeId, $translateId, $qId, CustomerServiceId, UserResourceId, ProcessServiceId, WorkflowModalServiceId];
        this.users = [];
        this.commentResource = CommentResource.resource;
        this.saleResource = SaleResource.resource;
        this.userResource = UserResource.resource;
        this.offerResource = OfferResource.resource;
        this.toaster = toaster;
        this.processService = ProcessService;
        this.workflowModalService = WorkflowModalService;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.$q = $q;
        this.customerService = CustomerService;
        this.refreshUsers();
    }
    WorkflowService.prototype.addComment = function (process, commentText) {
        var defer = this.$q.defer();
        if (angular.isUndefined(commentText) || commentText === "") {
            defer.reject(false);
            return defer.promise;
        }
        if (isNullOrUndefined(process.comments)) {
            process.comments = new Array();
        }
        var self = this;
        var comment = {
            id: null,
            creator: this.rootScope.user,
            commentText: commentText,
            timestamp: newTimestamp()
        };
        this.commentResource.save({ id: process.id }, comment).$promise.then(function (result) {
            var timestamp = toLocalDate(comment.timestamp, "DD.MM.YYYY HH:mm:ss");
            comment.timestamp = timestamp;
            result.creator = self.rootScope.user;
            process.comments.push(result);
            defer.resolve(true);
        }, function () {
            defer.reject(false);
        });
        return defer.promise;
    };
    WorkflowService.prototype.getCommentsByProcessId = function (id) {
        var comments = new Array();
        this.commentResource.getByProcessId({ id: id }).$promise.then(function (result) {
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var comment = result_1[_i];
                var timestamp = toLocalDate(comment.timestamp);
                comment.timestamp = timestamp;
                comments.push(comment);
            }
        });
        return comments;
    };
    WorkflowService.prototype.sumOrderPositions = function (array) {
        var sum = 0;
        if (isNullOrUndefined(array)) {
            return 0;
        }
        for (var i = 0; i < array.length; i++) {
            var temp = array[i];
            if (!isNullOrUndefined(temp) && !isNaN(temp.amount)
                && !isNaN(temp.netPrice)) {
                sum += temp.amount * temp.netPrice;
            }
        }
        return Math.round(sum * 100) / 100;
    };
    WorkflowService.prototype.sumBasicPriceOrderPositions = function (array) {
        var sum = 0;
        if (isNullOrUndefined(array)) {
            return 0;
        }
        for (var i = 0; i < array.length; i++) {
            var temp = array[i];
            if (!isNullOrUndefined(temp) && !isNaN(temp.amount)
                && !isNullOrUndefined(temp.product)
                && !isNaN(temp.product.netPrice)) {
                sum += temp.amount * temp.product.netPrice;
            }
        }
        return sum;
    };
    WorkflowService.prototype.calculateDiscount = function (oldPrice, newPrice) {
        var temp = Math.round((((oldPrice - newPrice) / oldPrice) * 100) * 100) / 100;
        return isNaN(temp) || temp < 0 ? 0 : temp;
    };
    WorkflowService.prototype.calculatePrice = function (oldPrice, discount) {
        var temp = Math.round((oldPrice * (1 - (discount / 100))) * 100) / 100;
        return isNaN(temp) ? 0 : temp;
    };
    WorkflowService.prototype.getWorkflowTypeByProcess = function (process) {
        if (this.isLead(process)) {
            return WorkflowType.LEAD;
        }
        else if (this.isOffer(process)) {
            return WorkflowType.OFFER;
        }
        else if (this.isSale(process)) {
            return WorkflowType.SALE;
        }
        else {
            return null;
        }
    };
    WorkflowService.prototype.startOfferTransformation = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.workflowModalService.openOfferTransformationModal(process)];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    WorkflowService.prototype.startSaleTransformation = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.workflowModalService.openSaleTransformationModal(process)];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    WorkflowService.prototype.openQuickEmailModal = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            var workflowType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workflowType = this.getWorkflowTypeByProcess(process);
                        return [4 , this.workflowModalService.openQuickEmailModal(process, workflowType)];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    WorkflowService.prototype.openNewLeadModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.workflowModalService.openNewLeadModal()];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    WorkflowService.prototype.openEditModal = function (process, workflowType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.workflowModalService.openEditModal(process, workflowType)];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    WorkflowService.prototype.openConfirmationModal = function (process, confirmationFunctionType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.workflowModalService.openConfirmationModal(process, confirmationFunctionType)];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    WorkflowService.prototype.addLeadToOffer = function (tempProcess) {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempProcess.formerProcessors = tempProcess.formerProcessors ? tempProcess.formerProcessors : [];
                        if (!this.checkForDupsInFormerProcessors(tempProcess.formerProcessors, this.rootScope.user, Activity.OFFER)) {
                            tempProcess.formerProcessors.push(new Processor(this.rootScope.user, Activity.OFFER));
                        }
                        tempProcess.status = Status.OFFER;
                        tempProcess.processor = this.rootScope.user;
                        return [4 , this.processService.save(tempProcess, tempProcess.offer, false, true)];
                    case 1:
                        resultProcess = _a.sent();
                        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_NEW_OFFER"));
                        this.rootScope.leadsCount -= 1;
                        this.rootScope.offersCount += 1;
                        return [2 , resultProcess];
                }
            });
        });
    };
    WorkflowService.prototype.addOfferToSale = function (tempProcess) {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess, customer, updatedCustomer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempProcess.formerProcessors = tempProcess.formerProcessors ? tempProcess.formerProcessors : [];
                        if (!this.checkForDupsInFormerProcessors(tempProcess.formerProcessors, this.rootScope.user, Activity.SALE)) {
                            tempProcess.formerProcessors.push(new Processor(this.rootScope.user, Activity.SALE));
                        }
                        tempProcess.status = Status.SALE;
                        tempProcess.processor = this.rootScope.user;
                        return [4 , this.processService.save(tempProcess, tempProcess.sale, false, true)];
                    case 1:
                        resultProcess = _a.sent();
                        customer = resultProcess.offer.customer;
                        if (!!customer.realCustomer)
                            return [3 , 3];
                        customer.realCustomer = true;
                        return [4 , this.customerService.updateCustomer(customer)];
                    case 2:
                        updatedCustomer = _a.sent();
                        resultProcess.offer.customer = updatedCustomer;
                        _a.label = 3;
                    case 3:
                        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_NEW_SALE"));
                        this.rootScope.offersCount -= 1;
                        return [2 , resultProcess];
                }
            });
        });
    };
    WorkflowService.prototype.refreshUsers = function () {
        var _this = this;
        this.userResource.getAll().$promise.then(function (data) {
            _this.users = data;
        }, function (error) { return handleError(error); });
    };
    WorkflowService.prototype.createNextWorkflowUnit = function (process) {
        switch (process.status) {
            case Status.OPEN:
                this.startOfferTransformation(process);
                break;
            case Status.INCONTACT:
                this.startOfferTransformation(process);
                break;
            case Status.OFFER:
                this.startSaleTransformation(process);
                break;
            case Status.FOLLOWUP:
                this.startSaleTransformation(process);
                break;
            case Status.DONE:
                this.startSaleTransformation(process);
                break;
            default:
                ;
                break;
        }
    };
    WorkflowService.prototype.togglePin = function (process, user) {
        var self = this;
        if (user !== null) {
            this.processService.setProcessor(process, user).then(function (result) {
                process.processor = user;
                self.rootScope.$broadcast(broadcastOnTodosChanged);
                self.rootScope.$broadcast(broadcastUpdate, result);
                self.rootScope.$broadcast(broadcastUpdateChildrow, result);
            }, function (error) { return handleError(error); });
        }
        else if (process.processor !== null) {
            this.processService.removeProcessor(process).then(function () {
                process.processor = null;
                self.rootScope.$broadcast(broadcastUpdate, process);
                self.rootScope.$broadcast(broadcastOnTodosChanged);
            }, function (error) { return handleError(error); });
        }
    };
    WorkflowService.prototype.inContact = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        process.status = Status.INCONTACT;
                        process.processor = this.rootScope.user;
                        if (isNullOrUndefined(process.formerProcessors)) {
                            process.formerProcessors = [];
                        }
                        if (!this.checkForDupsInFormerProcessors(process.formerProcessors, this.rootScope.user, Activity.INCONTACT)) {
                            process.formerProcessors.push(new Processor(process.processor, Activity.INCONTACT));
                        }
                        return [4 , this.processService.save(process, null, false, false)];
                    case 1:
                        resultProcess = _a.sent();
                        this.rootScope.$broadcast(broadcastOnTodosChanged);
                        this.rootScope.$broadcast(broadcastUpdate, resultProcess);
                        this.rootScope.$broadcast(broadcastUpdateChildrow, resultProcess);
                        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_INCONTACT"));
                        return [2 , resultProcess];
                }
            });
        });
    };
    WorkflowService.prototype.doneOffer = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            var toastMsg, resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toastMsg = "";
                        if (process.status === Status.OFFER || process.status === Status.FOLLOWUP) {
                            process.status = Status.DONE;
                            toastMsg = "COMMON_TOAST_SUCCESS_DONE_OFFER";
                            process.processor = null;
                        }
                        else if (process.status === Status.DONE) {
                            if (process.followUpAmount > 0) {
                                process.status = Status.FOLLOWUP;
                            }
                            else {
                                process.status = Status.OFFER;
                            }
                            toastMsg = "COMMON_TOAST_SUCCESS_REVERT_DONE_OFFER";
                            process.processor = this.rootScope.user;
                        }
                        return [4 , this.processService.save(process, null, true, false)];
                    case 1:
                        resultProcess = _a.sent();
                        this.rootScope.$broadcast(broadcastOnTodosChanged);
                        this.toaster.pop("success", "", this.translate.instant(toastMsg));
                        return [2 , resultProcess];
                }
            });
        });
    };
    WorkflowService.prototype.toggleClosedOrOpenState = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(process.status !== Status.CLOSED))
                            return [3 , 3];
                        return [4 , this.processService.setStatus(process, Status.CLOSED)];
                    case 1:
                        resultProcess = _a.sent();
                        return [4 , this.processService.removeProcessor(resultProcess)];
                    case 2:
                        _a.sent();
                        resultProcess.processor = null;
                        if (isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)) {
                            this.rootScope.leadsCount -= 1;
                        }
                        else if (!isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)) {
                            this.rootScope.offersCount -= 1;
                        }
                        this.rootScope.$broadcast(broadcastRemoveOrUpdate, resultProcess);
                        this.rootScope.$broadcast(broadcastOnTodosChanged, resultProcess);
                        return [3 , 7];
                    case 3:
                        if (!(isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)))
                            return [3 , 5];
                        return [4 , this.processService.setStatus(process, Status.OPEN)];
                    case 4:
                        resultProcess = _a.sent();
                        this.rootScope.leadsCount += 1;
                        this.rootScope.$broadcast(broadcastUpdate, resultProcess);
                        return [3 , 7];
                    case 5:
                        if (!(!isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)))
                            return [3 , 7];
                        return [4 , this.processService.setStatus(process, Status.OFFER)];
                    case 6:
                        resultProcess = _a.sent();
                        this.rootScope.offersCount += 1;
                        this.rootScope.$broadcast(broadcastUpdate, resultProcess);
                        _a.label = 7;
                    case 7: return [2 ];
                }
            });
        });
    };
    WorkflowService.prototype.rollBackOffer = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            var offerId, resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isNullOrUndefined(process)) {
                            return [2 ];
                        }
                        offerId = process.offer.id;
                        process.offer = null;
                        process.status = Status.OPEN;
                        return [4 , this.processService.save(process, null, false, true)];
                    case 1:
                        resultProcess = _a.sent();
                        this.offerResource.drop({ id: offerId });
                        this.rootScope.leadsCount += 1;
                        this.rootScope.offersCount -= 1;
                        return [2 , resultProcess];
                }
            });
        });
    };
    WorkflowService.prototype.rollBackSale = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            var saleId, self, resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isNullOrUndefined(process)) {
                            return [2 ];
                        }
                        saleId = process.sale.id;
                        process.sale = null;
                        process.status = Status.OFFER;
                        self = this;
                        return [4 , this.processService.save(process, null, false, true)];
                    case 1:
                        resultProcess = _a.sent();
                        self.saleResource.drop({ id: saleId });
                        this.rootScope.offersCount += 1;
                        this.rootScope.salesCount -= 1;
                        return [2 , resultProcess];
                }
            });
        });
    };
    WorkflowService.prototype.deleteProcess = function (process) {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.processService["delete"](process)];
                    case 1:
                        resultProcess = _a.sent();
                        this.toaster.pop("success", "", this.translate
                            .instant("COMMON_TOAST_SUCCESS_DELETE_LEAD"));
                        if (this.isLead(process)) {
                            this.rootScope.leadsCount -= 1;
                        }
                        else if (this.isOffer(process)) {
                            this.rootScope.offersCount -= 1;
                        }
                        this.rootScope.$broadcast(broadcastOnTodosChanged);
                        this.rootScope.$broadcast(broadcastRemove, process);
                        return [2 , resultProcess];
                }
            });
        });
    };
    WorkflowService.prototype.checkForDupsInFormerProcessors = function (formerProcessors, user, activity) {
        if (isNullOrUndefined(formerProcessors)) {
            return false;
        }
        return formerProcessors.filter(function (fp) { return fp.user.id === user.id && fp.activity === activity; }).length > 0;
    };
    WorkflowService.prototype.getSaleByInvoiceNumber = function (invoiceNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , this.saleResource.getByinvoiceNumber({}, invoiceNumber).$promise];
                    case 1: return [2 , _a.sent()];
                }
            });
        });
    };
    WorkflowService.prototype.isLead = function (process) {
        return !isNullOrUndefined(process) && (process.status === Status.OPEN || process.status === Status.INCONTACT);
    };
    WorkflowService.prototype.isOffer = function (process) {
        return !isNullOrUndefined(process) && (process.status === Status.OFFER || process.status === Status.FOLLOWUP || process.status === Status.DONE);
    };
    WorkflowService.prototype.isSale = function (process) {
        return !isNullOrUndefined(process) && (process.status === Status.SALE);
    };
    return WorkflowService;
}());
angular.module(moduleWorkflowService, [ngResourceId]).service(WorkflowServiceId, WorkflowService);


var DashboardServiceId = "DashboardService";
var broadcastOnTodosChanged = "onTodosChange";
var DashboardService = (function () {
    function DashboardService(ProcessResource, toaster, $rootScope, $translate, WorkflowService, $uibModal, $q, SweetAlert) {
        var _this = this;
        this.$inject = [ProcessResourceId, toasterId, $rootScopeId, $translateId, WorkflowServiceId, $uibModalId, $qId, "SweetAlert"];
        this.dragging = false;
        this.inModal = false;
        this.openLeads = [];
        this.inContacts = [];
        this.openOffers = [];
        this.doneOffers = [];
        this.closedSales = [];
        this.elementToDelete = [];
        this.delementDropzoneVisibility = "hidden";
        this.allOpenLeads = [];
        this.allInContacts = [];
        this.allOpenOffers = [];
        this.allDoneOffers = [];
        this.allClosedSales = [];
        this.openLeadsValue = 0;
        this.inContactsValue = 0;
        this.openOffersValue = 0;
        this.doneOffersValue = 0;
        this.closedSalesValue = 0;
        this.todos = [];
        this.dropzoneClass = {
            lead: "none",
            contact: "none",
            offer: "none",
            done: "none",
            sale: "none"
        };
        this.processResource = ProcessResource.resource;
        this.workflowService = WorkflowService;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.q = $q;
        this.SweetAlert = SweetAlert;
        this.uibModal = $uibModal;
        this.refreshTodos();
        $rootScope.$on(broadcastOnTodosChanged, function (event) {
            _this.refreshTodos();
        });
        var self = this;
        setInterval(function () {
            self.refreshTodos();
        }, 10 * 60 * 1000);
    }
    DashboardService.prototype.initDashboard = function () {
        var self = this;
        this.processResource.getWorkflowByStatus({ workflow: "LEAD", status: "OPEN" }).$promise.then(function (result) {
            var open = new Array();
            var contact = new Array();
            for (var i = 0; i < result.length; i++) {
                if (result[i].status === "OPEN") {
                    open.push(result[i]);
                }
                else if (result[i].status === "INCONTACT") {
                    contact.push(result[i]);
                }
            }
            self.openLeads = self.orderProcessByTimestamp(open, "lead");
            self.allOpenLeads = self.openLeads;
            self.sumLeads();
            self.inContacts = self.orderProcessByTimestamp(contact, "lead");
            self.allInContacts = self.inContacts;
            self.sumInContacts();
        });
        this.processResource.getWorkflowByStatus({ workflow: "OFFER", status: "OFFER" }).$promise.then(function (result) {
            var open = new Array();
            var done = new Array();
            for (var i = 0; i < result.length; i++) {
                if (result[i].status === "OFFER" || result[i].status === "FOLLOWUP") {
                    open.push(result[i]);
                }
                else if (result[i].status === "DONE") {
                    done.push(result[i]);
                }
            }
            self.openOffers = self.orderProcessByTimestamp(open, "offer");
            self.allOpenOffers = self.openOffers;
            self.sumOffers();
            self.doneOffers = self.orderProcessByTimestamp(done, "offer");
            self.allDoneOffers = self.doneOffers;
            self.sumDoneOffers();
        });
        this.processResource.getLatestSales().$promise.then(function (result) {
            self.closedSales = result;
            self.allClosedSales = self.closedSales;
            self.sumSales();
        });
    };
    DashboardService.prototype.sumLeads = function () {
        this.openLeadsValue = 0;
        for (var i = 0; i < this.openLeads.length; i++) {
            this.openLeadsValue += this.workflowService.sumOrderPositions(this.openLeads[i].lead.orderPositions);
        }
    };
    DashboardService.prototype.sumInContacts = function () {
        this.inContactsValue = 0;
        for (var i = 0; i < this.inContacts.length; i++) {
            this.inContactsValue += this.workflowService.sumOrderPositions(this.inContacts[i].lead.orderPositions);
        }
    };
    DashboardService.prototype.sumOffers = function () {
        this.openOffersValue = 0;
        for (var i = 0; i < this.openOffers.length; i++) {
            this.openOffersValue += this.openOffers[i].offer.netPrice;
        }
    };
    DashboardService.prototype.sumDoneOffers = function () {
        this.doneOffersValue = 0;
        for (var i = 0; i < this.doneOffers.length; i++) {
            this.doneOffersValue += this.doneOffers[i].offer.netPrice;
        }
    };
    DashboardService.prototype.sumSales = function () {
        this.closedSalesValue = 0;
        for (var i = 0; i < this.closedSales.length; i++) {
            this.closedSalesValue += this.closedSales[i].sale.saleTurnover;
        }
    };
    DashboardService.prototype.setSortableOptions = function (scope) {
        var self = this;
        var sortableList = {
            start: function (e, ui) {
                var source = ui.item.sortable.sourceModel;
                self.delementDropzoneVisibility = "show";
                self.dragging = true;
                if (source === self.openLeads) {
                    self.dropzoneClass.contact = "2px dashed grey";
                    self.dropzoneClass.offer = "2px dashed grey";
                }
                else if (source === self.inContacts) {
                    self.dropzoneClass.offer = "2px dashed grey";
                }
                else if (source === self.openOffers) {
                    self.dropzoneClass.done = "2px dashed grey";
                    self.dropzoneClass.sale = "2px dashed grey";
                }
                else if (source === self.doneOffers) {
                    self.dropzoneClass.offer = "2px dashed grey";
                    self.dropzoneClass.sale = "2px dashed grey";
                }
                else if (source === self.closedSales) {
                    self.dropzoneClass.sale = "2px dashed grey";
                }
                scope.$apply();
            },
            update: function (e, ui) {
                var target = ui.item.sortable.droptargetModel;
                var source = ui.item.sortable.sourceModel;
                var item = ui.item.sortable.model;
                if ((self.openLeads === target && self.openOffers === source) ||
                    (self.openLeads === target && self.inContacts === source) ||
                    (self.openLeads === target && self.doneOffers === source) ||
                    (self.inContacts === target && self.openOffers === source) ||
                    (self.inContacts === target && self.doneOffers === source) ||
                    (self.inContacts === target && self.closedSales === source) ||
                    (self.doneOffers === target && self.openLeads === source) ||
                    (self.doneOffers === target && self.inContacts === source) ||
                    (self.closedSales === target && self.inContacts === source) ||
                    (self.closedSales === target && self.openLeads === source) ||
                    target === source) {
                    ui.item.sortable.cancel();
                }
            },
            stop: function (e, ui) {
                var target = ui.item.sortable.droptargetModel;
                var source = ui.item.sortable.sourceModel;
                var item = ui.item.sortable.model;
                self.delementDropzoneVisibility = "hidden";
                self.dragging = false;
                self.dropzoneClass.lead = "none";
                self.dropzoneClass.contact = "none";
                self.dropzoneClass.offer = "none";
                self.dropzoneClass.done = "none";
                self.dropzoneClass.sale = "none";
                if (self.closedSales === target && self.openOffers === source
                    || self.closedSales === target && self.doneOffers === source) {
                    self.inModal = true;
                    self.startSaleTransformation(item).then(function (result) {
                        if (result === undefined) {
                            item.sale = undefined;
                            target.splice(target.indexOf(item), 1);
                            source.push(item);
                            self.inModal = false;
                        }
                        else {
                            var index = target.indexOf(item);
                            target[index] = result;
                            self.removeFromSourceAndAddToTarget(self.allClosedSales, self.allOpenOffers, item, result);
                            self.removeFromSourceAndAddToTarget(self.allClosedSales, self.allDoneOffers, item, result);
                            self.inModal = false;
                        }
                        self.updateDashboard("sale");
                    }, function (result) {
                        item.sale = undefined;
                        target.splice(target.indexOf(item), 1);
                        source.push(item);
                        self.inModal = false;
                        self.updateDashboard("sale");
                    });
                }
                else if (self.openOffers === target && self.openLeads === source
                    || self.openOffers === target && self.inContacts === source) {
                    self.inModal = true;
                    self.startOfferTransformation(item).then(function (result) {
                        if (result === undefined) {
                            item.offer = undefined;
                            target.splice(target.indexOf(item), 1);
                            source.push(item);
                            self.inModal = false;
                        }
                        else {
                            var index = target.indexOf(item);
                            target[index] = result;
                            self.removeFromSourceAndAddToTarget(self.allOpenOffers, self.allOpenLeads, item, result);
                            self.removeFromSourceAndAddToTarget(self.allOpenOffers, self.allInContacts, item, result);
                            self.inModal = false;
                        }
                        self.updateDashboard("offer");
                    }, function (result) {
                        item.offer = undefined;
                        target.splice(target.indexOf(item), 1);
                        source.push(item);
                        self.inModal = false;
                        self.updateDashboard("offer");
                    });
                }
                else if (self.inContacts === target && self.openLeads === source) {
                    self.inContact(item);
                    item.processor = self.rootScope.user;
                    self.removeFromSourceAndAddToTarget(self.allInContacts, self.allOpenLeads, item, item);
                    self.updateDashboard("lead");
                }
                else if (self.doneOffers === target && self.openOffers === source) {
                    self.doneOffer(item);
                    item.processor = null;
                    self.removeFromSourceAndAddToTarget(self.allDoneOffers, self.allOpenOffers, item, item);
                    self.updateDashboard("offer");
                }
                else if (self.openOffers === target && self.doneOffers === source) {
                    self.doneOffer(item);
                    item.processor = self.rootScope.user;
                    self.removeFromSourceAndAddToTarget(self.allOpenOffers, self.allDoneOffers, item, item);
                    self.updateDashboard("offer");
                }
                else if (target === self.elementToDelete) {
                    var title = "";
                    var text = "";
                    if (source === self.openLeads || source === self.inContacts) {
                        title = self.translate.instant("LEAD_CLOSE_LEAD");
                        text = self.translate.instant("LEAD_CLOSE_LEAD_REALLY");
                    }
                    else if (source === self.openOffers || source === self.doneOffers) {
                        title = self.translate.instant("OFFER_CLOSE_OFFER");
                        text = self.translate.instant("OFFER_CLOSE_OFFER_REALLY");
                    }
                    self.inModal = true;
                    self.SweetAlert.swal({
                        title: title,
                        text: text,
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: self.translate.instant("NO"),
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: self.translate.instant("YES")
                    }, function (isConfirm) {
                        if (isConfirm) {
                            self.closeProcess(item, source);
                            target.splice(source.indexOf(item), 1);
                            self.sliceElementFromArray(self.allOpenLeads, item);
                            self.sliceElementFromArray(self.allInContacts, item);
                            self.sliceElementFromArray(self.allOpenOffers, item);
                            self.sliceElementFromArray(self.allDoneOffers, item);
                            var todoElement = findElementById(self.todos, item.id);
                            if (!isNullOrUndefined(todoElement)) {
                                self.todos.splice(self.todos.indexOf(todoElement), 1);
                                self.rootScope.$broadcast("todosChanged", self.todos);
                            }
                            self.inModal = false;
                        }
                        else {
                            target.splice(target.indexOf(item), 1);
                            source.push(item);
                            self.inModal = false;
                        }
                    });
                }
            },
            connectWith: ".connectList",
            items: "li:not(.not-sortable)"
        };
        return sortableList;
    };
    DashboardService.prototype.removeFromSourceAndAddToTarget = function (target, source, item, replaceItem) {
        if (source.indexOf(item) > -1) {
            target.push(replaceItem);
            source.splice(source.indexOf(item), 1);
        }
    };
    DashboardService.prototype.sliceElementFromArray = function (arr, item) {
        if (arr.indexOf(item) > -1) {
            arr.splice(arr.indexOf(item), 1);
        }
    };
    DashboardService.prototype.addNewLead = function (process) {
        this.openLeads.push(process);
        this.openLeads = this.orderProcessByTimestamp(this.openLeads, "lead");
        this.sumLeads();
    };
    DashboardService.prototype.updateDashboard = function (type) {
        if (type === "lead") {
            this.openLeads = this.orderProcessByTimestamp(this.openLeads, "lead");
            this.inContacts = this.orderProcessByTimestamp(this.inContacts, "lead");
            this.sumLeads();
            this.sumInContacts();
        }
        else if (type === "offer") {
            this.openOffers = this.orderProcessByTimestamp(this.openOffers, "offer");
            this.doneOffers = this.orderProcessByTimestamp(this.doneOffers, "offer");
            this.openLeads = this.orderProcessByTimestamp(this.openLeads, "lead");
            this.inContacts = this.orderProcessByTimestamp(this.inContacts, "lead");
            this.sumLeads();
            this.sumInContacts();
            this.sumDoneOffers();
            this.sumOffers();
        }
        else if (type === "sale") {
            this.closedSales = this.orderProcessByTimestamp(this.closedSales, "sale").reverse();
            this.doneOffers = this.orderProcessByTimestamp(this.doneOffers, "offer");
            this.openOffers = this.orderProcessByTimestamp(this.openOffers, "offer");
            this.sumOffers();
            this.sumDoneOffers();
            this.sumSales();
        }
    };
    DashboardService.prototype.startOfferTransformation = function (process) {
        var defer = this.q.defer();
        this.workflowService.startOfferTransformation(process).then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };
    DashboardService.prototype.startSaleTransformation = function (process) {
        var defer = this.q.defer();
        this.workflowService.startSaleTransformation(process).then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.reject(undefined);
        });
        return defer.promise;
    };
    DashboardService.prototype.inContact = function (process) {
        this.workflowService.inContact(process);
    };
    DashboardService.prototype.doneOffer = function (process) {
        this.workflowService.doneOffer(process);
    };
    DashboardService.prototype.closeProcess = function (process, source) {
        var self = this;
        this.processResource.setStatus({
            id: process.id
        }, "CLOSED").$promise.then(function () {
            var message = "";
            if (source === self.openLeads) {
                self.sumLeads();
                self.rootScope.leadsCount -= 1;
                message = self.translate.instant("COMMON_TOAST_SUCCESS_CLOSE_LEAD");
            }
            else if (source === self.inContacts) {
                self.rootScope.leadsCount -= 1;
                self.sumInContacts();
                message = self.translate.instant("COMMON_TOAST_SUCCESS_CLOSE_LEAD");
            }
            else if (source === self.openOffers) {
                self.rootScope.offersCount -= 1;
                self.sumOffers();
                message = self.translate.instant("COMMON_TOAST_SUCCESS_CLOSE_OFFER");
            }
            else if (source === self.doneOffers) {
                self.rootScope.offersCount -= 1;
                self.sumDoneOffers();
                message = self.translate.instant("COMMON_TOAST_SUCCESS_CLOSE_OFFER");
            }
            self.toaster.pop("success", "", message);
            process.status = "CLOSED";
        });
    };
    DashboardService.prototype.getOpenLeads = function () {
        return this.openLeads;
    };
    DashboardService.prototype.getInContacts = function () {
        return this.inContacts;
    };
    DashboardService.prototype.getOpenOffers = function () {
        return this.openOffers;
    };
    DashboardService.prototype.getDoneOffers = function () {
        return this.doneOffers;
    };
    DashboardService.prototype.getClosedSales = function () {
        return this.closedSales;
    };
    DashboardService.prototype.filterMytasks = function (showMytasks) {
        var self = this;
        if (showMytasks) {
            this.openLeads = this.openLeads.filter(function (process) { return !isNullOrUndefined(process.processor) && process.processor.id === self.rootScope.user.id; });
            this.inContacts = this.inContacts.filter(function (process) { return !isNullOrUndefined(process.processor) && process.processor.id === self.rootScope.user.id; });
            this.openOffers = this.openOffers.filter(function (process) { return !isNullOrUndefined(process.processor) && process.processor.id === self.rootScope.user.id; });
            this.doneOffers = this.doneOffers.filter(function (process) { return !isNullOrUndefined(process.processor) && process.processor.id === self.rootScope.user.id; });
            this.closedSales = this.closedSales.filter(function (process) { return !isNullOrUndefined(process.processor) && process.processor.id === self.rootScope.user.id; });
        }
        else {
            this.openLeads = this.allOpenLeads;
            this.inContacts = this.allInContacts;
            this.openOffers = this.allOpenOffers;
            this.doneOffers = this.allDoneOffers;
            this.closedSales = this.allClosedSales;
        }
        this.updateDashboard("lead");
        this.updateDashboard("offer");
        this.updateDashboard("sale");
    };
    DashboardService.prototype.filterBySearch = function (searchText, showMyTasks) {
        var self = this;
        if (!stringIsNullorEmpty(searchText)) {
            this.openLeads = this.allOpenLeads.filter(function (process) { return (!isNullOrUndefined(process.lead.customer.firstname) && process.lead.customer.firstname.toLowerCase().includes(searchText.toLowerCase()))
                || (!isNullOrUndefined(process.lead.customer.lastname) && process.lead.customer.lastname.toLowerCase().includes(searchText.toLowerCase()))
                || (!isNullOrUndefined(process.lead.customer.company) && process.lead.customer.company.toLowerCase().includes(searchText.toLowerCase())); });
            this.inContacts = this.allInContacts.filter(function (process) { return (!isNullOrUndefined(process.lead.customer.firstname) && process.lead.customer.firstname.toLowerCase().includes(searchText.toLowerCase()))
                || (!isNullOrUndefined(process.lead.customer.lastname) && process.lead.customer.lastname.toLowerCase().includes(searchText.toLowerCase()))
                || (!isNullOrUndefined(process.lead.customer.company) && process.lead.customer.company.toLowerCase().includes(searchText.toLowerCase())); });
            this.openOffers = this.allOpenOffers.filter(function (process) { return (!isNullOrUndefined(process.offer.customer.firstname) && process.offer.customer.firstname.toLowerCase().includes(searchText.toLowerCase()))
                || (!isNullOrUndefined(process.offer.customer.lastname) && process.offer.customer.lastname.toLowerCase().includes(searchText.toLowerCase()))
                || (!isNullOrUndefined(process.offer.customer.company) && process.offer.customer.company.toLowerCase().includes(searchText.toLowerCase())); });
            this.doneOffers = this.allDoneOffers.filter(function (process) { return (!isNullOrUndefined(process.offer.customer.firstname) && process.offer.customer.firstname.toLowerCase().includes(searchText.toLowerCase()))
                || (!isNullOrUndefined(process.offer.customer.lastname) && process.offer.customer.lastname.toLowerCase().includes(searchText.toLowerCase()))
                || (!isNullOrUndefined(process.offer.customer.company) && process.offer.customer.company.toLowerCase().includes(searchText.toLowerCase())); });
            this.closedSales = this.allClosedSales.filter(function (process) { return (!isNullOrUndefined(process.sale.customer.firstname) && process.sale.customer.firstname.toLowerCase().includes(searchText.toLowerCase()))
                || (!isNullOrUndefined(process.sale.customer.lastname) && process.sale.customer.lastname.toLowerCase().includes(searchText.toLowerCase()))
                || (!isNullOrUndefined(process.sale.customer.company) && process.sale.customer.company.toLowerCase().includes(searchText.toLowerCase())); });
        }
        else {
            this.openLeads = this.allOpenLeads;
            this.inContacts = this.allInContacts;
            this.openOffers = this.allOpenOffers;
            this.doneOffers = this.allDoneOffers;
            this.closedSales = this.allClosedSales;
        }
        if (showMyTasks) {
            self.filterMytasks(showMyTasks);
        }
        this.updateDashboard("lead");
        this.updateDashboard("offer");
        this.updateDashboard("sale");
    };
    DashboardService.prototype.refreshTodos = function () {
        var _this = this;
        if (isNullOrUndefined(this.rootScope.user)) {
            return;
        }
        this.processResource.getTodos({ processorId: this.rootScope.user.id }).$promise.then(function (data) {
            _this.todos = _this.orderByTimestamp(data);
            _this.rootScope.$broadcast("todosChanged", _this.todos);
        }, function (error) { return handleError(error); });
    };
    DashboardService.prototype.orderByTimestamp = function (todos) {
        return todos.sort(function (a, b) {
            var tempA = isNullOrUndefined(a.offer) ? moment(a.lead.timestamp, "DD.MM.YYYY HH:mm:ss") : moment(a.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
            var tempB = isNullOrUndefined(b.offer) ? moment(b.lead.timestamp, "DD.MM.YYYY HH:mm:ss") : moment(b.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
            if (tempA < tempB) {
                return -1;
            }
            else if (tempA > tempB) {
                return 1;
            }
            else {
                return 0;
            }
        });
    };
    DashboardService.prototype.orderProcessByTimestamp = function (process, type) {
        if (type === "lead") {
            return process.sort(function (a, b) {
                var tempA = moment(a.lead.timestamp, "DD.MM.YYYY HH:mm:ss");
                var tempB = moment(b.lead.timestamp, "DD.MM.YYYY HH:mm:ss");
                if (tempA < tempB) {
                    return -1;
                }
                else if (tempA > tempB) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        else if (type === "offer") {
            return process.sort(function (a, b) {
                var tempA = moment(a.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
                var tempB = moment(b.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
                if (tempA < tempB) {
                    return -1;
                }
                else if (tempA > tempB) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        else if (type === "sale") {
            return process.sort(function (a, b) {
                var tempA = moment(a.sale.timestamp, "DD.MM.YYYY HH:mm:ss");
                var tempB = moment(b.sale.timestamp, "DD.MM.YYYY HH:mm:ss");
                if (tempA < tempB) {
                    return -1;
                }
                else if (tempA > tempB) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
    };
    return DashboardService;
}());
angular.module(moduleDashboardService, [ngResourceId]).service(DashboardServiceId, DashboardService);


var ProfileServiceId = "ProfileService";
var ProfileService = (function () {
    function ProfileService($rootScope, toaster, $translate, UserResource, FileResource, $q, $cookies, $location) {
        this.$inject = [$rootScopeId, toasterId, $translateId, UserResourceId, FileResourceId, $qId, $cookiesId, $locationId];
        this.fileResource = FileResource.resource;
        this.userResource = UserResource.resource;
        this.translate = $translate;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.formdata = new FormData();
        this.q = $q;
        this.cookies = $cookies;
        this.location = $location;
    }
    ProfileService.prototype.updateProfilInfo = function (user) {
        var defer = this.q.defer();
        var self = this;
        this.userResource.update(user).$promise.then(function (updatedUser) {
            self.updateRootScope(updatedUser);
            var date = new Date();
            date = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
            self.cookies.putObject("user", self.rootScope.user, { domain: self.rootScope.tenant.tenantKey, path: "/", expires: date });
            self.rootScope.changeLanguage(self.rootScope.user.language);
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
            defer.resolve(updatedUser);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
            defer.reject(self.rootScope.user);
        });
        return defer.promise;
    };
    ProfileService.prototype.updateProfileImage = function (user) {
        var self = this;
        this.userResource.setProfilePicture(user).$promise.then(function (data) {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
            data.authorization = self.rootScope.user.authorization;
            data.smtpKey = self.rootScope.user.smtpKey;
            self.rootScope.user = data;
            var date = new Date();
            date = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
            self.cookies.putObject("user", self.rootScope.user, { domain: self.rootScope.tenant.tenantKey, path: "/", expires: date });
            $("#profilePicture").prop("src", "data:image/jpeg;base64," + user.picture.content);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
        });
    };
    ProfileService.prototype.updatePassword = function (oldPassword, newPassword1, newPassword2) {
        var salt = this.rootScope.user.email;
        oldPassword = hashPasswordPbkdf2(oldPassword, salt);
        newPassword1 = hashPasswordPbkdf2(newPassword1, salt);
        newPassword2 = hashPasswordPbkdf2(newPassword2, salt);
        var defer = this.q.defer();
        var self = this;
        this.userResource.changePassword({
            id: this.rootScope.user.id
        }, {
            newPassword: newPassword1,
            oldPassword: oldPassword,
            oldSmtpKey: self.rootScope.user.smtpKey,
            newSmtpKey: encodeURIComponent(hashPasswordPbkdf2(newPassword1, salt))
        }).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS"));
            var authorization = btoa(self.rootScope.user.email + ":" + newPassword1);
            self.rootScope.user.authorization = authorization;
            var date = new Date();
            date = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
            self.cookies.putObject("user", self.rootScope.user, { domain: self.location.host(), path: "/", expires: date });
            self.rootScope.user.smtpKey = encodeURIComponent(hashPasswordPbkdf2(newPassword1, salt));
            defer.resolve(true);
        }, function (error) {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PASSWORD_CHANGE_ERROR"));
            defer.reject(error);
        });
        return defer.promise;
    };
    ProfileService.prototype.uploadFiles = function () {
        var self = this;
        this.userResource.setProfilePicture({ id: this.rootScope.user.id }, this.formdata).$promise.then(function (data) {
            self.rootScope.user.picture = data.picture;
            self.toaster.pop("success", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS"));
            self.getById();
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("PROFILE_TOAST_PROFILE_INFORMATION_ERROR"));
        });
    };
    ProfileService.prototype.getById = function () {
        var defer = this.q.defer();
        var self = this;
        this.userResource.getById({ id: this.rootScope.user.id }).$promise.then(function (resultUser) {
            defer.resolve(resultUser);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };
    ProfileService.prototype.updateRootScope = function (user) {
        this.rootScope.user.email = user.email;
        this.rootScope.user.firstname = user.firstname;
        this.rootScope.user.lastname = user.lastname;
        this.rootScope.user.phone = user.phone;
        this.rootScope.user.language = user.language;
        this.rootScope.user.skype = user.skype;
        this.rootScope.user.job = user.job;
        this.rootScope.user.fax = user.fax;
        this.rootScope.user.defaultVat = user.defaultVat;
    };
    ProfileService.prototype.getTheFiles = function ($files) {
        this.formdata.append("file", $files[0]);
    };
    return ProfileService;
}());
angular.module(moduleProfileService, [ngResourceId, ngImgCropId]).service(ProfileServiceId, ProfileService);

var NotificationSendState;
(function (NotificationSendState) {
    NotificationSendState[NotificationSendState["SENDING"] = "SENDING"] = "SENDING";
    NotificationSendState[NotificationSendState["SUCCESS"] = "SUCCESS"] = "SUCCESS";
    NotificationSendState[NotificationSendState["ERROR"] = "ERROR"] = "ERROR";
    NotificationSendState[NotificationSendState["DEFAULT"] = "DEFAULT"] = "DEFAULT";
})(NotificationSendState || (NotificationSendState = {}));

var AppControllerId = "AppController";
var broadcastSetNotificationSendState = "setNotificationSendState";
var broadcastAddNotification = "AddNotification";
var AppController = (function () {
    function AppController($translate, $rootScope, $interval, ProcessResource, UserResource, ProfileService, $location, $scope, NotificationService) {
        var _this = this;
        this.NotificationService = NotificationService;
        this.$inject = [$translateId, $rootScopeId, $intervalId, ProcessResourceId, UserResourceId, ProfileServiceId, $locationId, $scopeId, NotificationServiceId];
        this.todos = [];
        this.userNotifications = [];
        this.notificationSendState = NotificationSendState.DEFAULT;
        this.rendered = false;
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.interval = $interval;
        this.processResource = ProcessResource.resource;
        this.userResource = UserResource.resource;
        this.profileService = ProfileService;
        this.rootScope.leadsCount = 0;
        this.location = $location;
        this.rootScope.offersCount = 0;
        this.stop = undefined;
        this.setCurrentUserPicture();
        this.registerLoadLabels();
        this.rootScope.loadLabels();
        this.registerChangeLanguage();
        this.registerSetUserDefaultLanguage();
        this.rootScope.setUserDefaultLanguage();
        this.registerInterval();
        var todosChanged = $rootScope.$on("todosChanged", function (event, result) {
            _this.todos = result;
        });
        $scope.$on("$destroy", function handler() {
            todosChanged();
        });
        $scope.$on(broadcastAddNotification, function (event, notification) {
            _this.userNotifications.push(notification);
        });
        $scope.$on(broadcastSetNotificationSendState, function (event, notificationSendState) {
            _this.notificationSendState = notificationSendState;
            if ($scope.$$phase == null) {
                $scope.$apply();
            }
        });
    }
    AppController.prototype.navigateTo = function (todo) {
        if (todo.status === "OPEN" || todo.status === "INCONTACT") {
            this.location.path("/leads/" + todo.id);
        }
        else if (todo.status === "OFFER" || todo.status === "FOLLOWUP" || todo.status === "DONE") {
            this.location.path("/offers/" + todo.id);
        }
    };
    AppController.prototype.hasLicense = function (userLicense, routeLicense) {
        return hasLicense(userLicense, routeLicense);
    };
    AppController.prototype.registerLoadLabels = function () {
        var self = this;
        self.rootScope.loadLabels = function () {
            if (!angular
                .isUndefined(self.rootScope.user)) {
                self.processResource.getCountWorkflowByStatus({
                    workflow: "LEAD",
                    status: "OPEN"
                }).$promise.then(function (result) {
                    self.rootScope.leadsCount = result.value;
                });
                self.processResource.getCountWorkflowByStatus({
                    workflow: "OFFER",
                    status: "OFFER"
                }).$promise.then(function (result) {
                    self.rootScope.offersCount = result.value;
                });
            }
        };
    };
    AppController.prototype.registerChangeLanguage = function () {
        var self = this;
        self.rootScope.changeLanguage = function (langKey) {
            self.translate.use(langKey);
            self.rootScope.language = langKey;
        };
    };
    AppController.prototype.registerSetUserDefaultLanguage = function () {
        var self = this;
        self.rootScope.setUserDefaultLanguage = function () {
            if (!angular
                .isUndefined(self.rootScope.user)) {
                self.userResource
                    .get({
                    id: self.rootScope.user.id
                }).$promise.then(function (result) {
                    self.rootScope.changeLanguage(result.language);
                });
            }
        };
    };
    AppController.prototype.registerInterval = function () {
        var self = this;
        self.rootScope.$on("$destroy", function () {
            if (angular.isDefined(self.stop)) {
                self.interval.cancel(self.stop);
                self.stop = undefined;
            }
        });
        self.stop = self.interval(function () {
            if (!angular
                .isUndefined(self.rootScope.user)) {
                self.processResource.getCountWorkflowByStatus({
                    workflow: "LEAD",
                    status: "OPEN"
                }).$promise.then(function (result) {
                    self.rootScope.leadsCount = result.value;
                });
                self.processResource.getCountWorkflowByStatus({
                    workflow: "OFFER",
                    status: "OFFER"
                }).$promise.then(function (result) {
                    self.rootScope.offersCount = result.value;
                });
            }
        }.bind(this), 300000);
    };
    AppController.prototype.setCurrentUserPicture = function () {
        var self = this;
        if (!isNullOrUndefined(self.rootScope.user)) {
            self.userResource.getProfilePicture({ id: self.rootScope.user.id }).$promise.then(function (result) {
                self.rootScope.user.picture = result;
            });
        }
    };
    AppController.prototype.sumOrderPositions = function (array) {
        var sum = 0;
        if (isNullOrUndefined(array)) {
            return 0;
        }
        for (var i = 0; i < array.length; i++) {
            var temp = array[i];
            if (!isNullOrUndefined(temp) && !isNaN(temp.amount)
                && !isNullOrUndefined(temp.product)
                && !isNaN(temp.product.netPrice)) {
                sum += temp.amount * temp.product.netPrice;
            }
        }
        return sum;
    };
    return AppController;
}());
angular.module(moduleAppController, [ngResourceId, moduleSanitize]).controller(AppControllerId, AppController);

angular.module(moduleApp, [
    moduleApp,
    moduleAppController,
    moduleProcessResource,
    moduleProcessService,
    moduleAuthService,
    moduleDashboard,
    moduleDashboardService,
    moduleLogin,
    moduleLoginService,
    moduleSignup,
    moduleSignupService,
    moduleSignupResource,
    moduleLeadResource,
    moduleLeadDataTableService,
    moduleOfferResource,
    moduleOfferDataTableService,
    moduleSaleResource,
    moduleSaleDataTableService,
    moduleCommentResource,
    moduleUserResource,
    moduleUserDetail,
    moduleStatistic,
    moduleStatisticService,
    moduleStatisticResource,
    moduleSetting,
    moduleSettingResource,
    moduleSettingService,
    moduleProfile,
    moduleProfileService,
    moduleProduct,
    moduleProductDetail,
    moduleProductService,
    moduleProductResource,
    moduleCustomer,
    moduleCustomerService,
    moduleCustomerResource,
    moduleCustomerDetail,
    moduleWorkflow,
    moduleWorkflowService,
    moduleWorkflowModalService,
    moduleWorkflowDatatableService,
    moduleWorkflowDatatableRowService,
    moduleFileResource,
    moduleFileService,
    moduleSmtpResource,
    moduleSmtpService,
    moduleTemplate,
    moduleTemplateResource,
    moduleTemplateService,
    moduleNotificationResource,
    moduleNotificationService,
    moduleTenantResource,
    moduleTenantService,
    moduleRegistration,
    moduleRegistrationService,
    moduleSubdomainService,
    moduleSource,
    moduleSourceService,
    moduleSourceResource,
    moduleWizard,
    moduleConfirmation,
    moduleTranslate,
    moduleNgResource,
    moduleNgRoute,
    moduleNgAnimate,
    moduleNgCookies,
    moduleDatatables,
    moduleDatatablesBootstrap,
    moduleDatatablesButtons,
    moduleUiSortable,
    moduleNgSwitchery,
    moduleToaster,
    moduleHighchartsNg,
    moduleNgImgCrop,
    moduleUIBootstrap,
    moduleSummernote,
    moduleSummernoteService,
    moduleFootable,
    moduleSanitize,
    moduleSweetAlert
]);

angular.module(moduleApp).config([$routeProviderId, $httpProviderId, $locationProviderId, $compileProviderId,
    function ($routeProvider, $httpProvider, $locationProvider, $compileProvider) {
        $routeProvider
            .when("/", {
            templateUrl: "components/Dashboard/view/Dashboard.html",
            controller: "DashboardController",
            controllerAs: "dashboardCtrl",
            authenticated: true,
            package: "basic"
        })
            .when("/dashboard", {
            templateUrl: "components/Dashboard/view/Dashboard.html",
            controller: "DashboardController",
            controllerAs: "dashboardCtrl",
            authenticated: true,
            package: "basic"
        })
            .when("/leads/:processId?", {
            templateUrl: "components/Lead/view/Lead.html",
            controller: "WorkflowController",
            controllerAs: "leadCtrl",
            authenticated: true,
            package: "basic",
            type: WorkflowType.LEAD
        })
            .when("/offers/:processId?", {
            templateUrl: "components/Offer/view/Offer.html",
            controller: "WorkflowController",
            controllerAs: "offerCtrl",
            authenticated: true,
            package: "basic",
            type: WorkflowType.OFFER
        })
            .when("/sales/:processId?", {
            templateUrl: "components/Sale/view/Sale.html",
            controller: "WorkflowController",
            controllerAs: "saleCtrl",
            authenticated: true,
            package: "basic",
            type: WorkflowType.SALE
        })
            .when("/statistic/:tab?", {
            templateUrl: "components/Statistic/view/Statistic.html",
            controller: "StatisticController",
            controllerAs: "statisticCtrl",
            authenticated: true,
            package: "basic"
        })
            .when("/settings", {
            templateUrl: "components/Setting/view/Setting.html",
            controller: "SettingController",
            controllerAs: "settingCtrl",
            authenticated: true,
            package: "basic"
        })
            .when("/statistic/user/detail/:userId", {
            templateUrl: "components/Statistic/view/UserDetail.html",
            controller: "UserDetailController",
            controllerAs: "UserDetailCtrl",
            authenticated: true,
            package: "basic"
        })
            .when("/profile", {
            templateUrl: "components/Profile/view/ProfileMain.html",
            controller: "ProfileController",
            controllerAs: "profileCtrl",
            authenticated: true,
            package: "basic"
        })
            .when("/licence", {
            templateUrl: "components/Licence/view/Licence.html",
            controller: "RegistrationController",
            controllerAs: "registrationCtrl",
            package: "basic"
        })
            .when("/signup", {
            templateUrl: "components/Signup/view/Signup.html",
            controller: "SignupController",
            controllerAs: "signupCtrl",
            package: "basic"
        })
            .when("/tenants/registration", {
            templateUrl: "components/Tenant/registration/view/Registration.html",
            controller: "RegistrationController",
            controllerAs: "registrationCtrl"
        })
            .when("/login", {
            templateUrl: "components/Login/view/Login.html",
            controller: "LoginController",
            controllerAs: "loginCtrl"
        }).when("/product", {
            templateUrl: "components/Product/view/Product.html",
            controller: "ProductController",
            controllerAs: "productCtrl",
            authenticated: true,
            package: "basic"
        }).when("/statistic/product/detail/:productId", {
            templateUrl: "components/Statistic/view/ProductDetail.html",
            controller: "ProductDetailController",
            controllerAs: "ProductDetailCtrl",
            authenticated: true,
            package: "basic"
        }).when("/customer", {
            templateUrl: "components/Customer/view/Customer.html",
            controller: "CustomerController",
            controllerAs: "customerCtrl",
            authenticated: true,
            package: "basic"
        }).when("/customer/detail/:customerId", {
            templateUrl: "components/Customer/view/CustomerDetail.html",
            controller: "CustomerDetailController",
            controllerAs: "customerDetailCtrl",
            authenticated: true,
            package: "basic"
        }).when("/401", {
            templateUrl: "components/Common/view/Unauthorized.html"
        }).when("/403", {
            templateUrl: "components/Common/view/Forbidden.html"
        }).when("/404", {
            templateUrl: "components/Common/view/NotFound.html"
        }).otherwise({
            redirectTo: "/404"
        });
        $locationProvider.hashPrefix("");
        $compileProvider.preAssignBindingsEnabled(true);
        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        $httpProvider.interceptors.push(function ($q, $location, $rootScope) {
            return {
                "responseError": function (rejection) {
                    var defer = $q.defer();
                    if (rejection.status < 300) {
                        defer.resolve(rejection);
                    }
                    else {
                        if (rejection.config && rejection.config.url.includes(".html")) {
                            switch (rejection.status) {
                                case 401:
                                    $location.path("/401");
                                    break;
                                case 403:
                                    $location.path("/403");
                                    break;
                                case 404:
                                    $location.path("/404");
                                    break;
                                default: break;
                            }
                            defer.reject(rejection);
                        }
                        else {
                            defer.reject(rejection);
                        }
                    }
                    return defer.promise;
                }
            };
        });
    }])
    .run([$locationId, $httpId, $rootScopeId, AuthServiceId, $cookiesId, $injectorId, $windowId, $qId,
    function ($location, $http, $rootScope, Auth, $cookies, $injector, $window, $q) {
        $window.Promise = $q;
        try {
            $rootScope.user = $cookies.getObject("user");
            $rootScope.tenant = $cookies.getObject("tenant");
        }
        catch (error) {
            $rootScope.user = undefined;
            $rootScope.tenant = undefined;
            Auth.logout();
        }
        if (!isNullOrUndefined($rootScope.user) && !isNullOrUndefined($rootScope.tenant)) {
            $http.defaults.headers.common["Authorization"] = "Basic " + $rootScope.user.authorization;
            $http.defaults.headers.common["X-TenantID"] = $rootScope.tenant.tenantKey;
            var dashboardService = $injector.get("DashboardService");
            dashboardService.refreshTodos();
        }
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            try {
                if (isNullOrUndefined($rootScope.user) || isNullOrUndefined($rootScope.tenant)) {
                    $rootScope.user = $cookies.getObject("user");
                    $rootScope.tenant = $cookies.getObject("tenant");
                }
            }
            catch (error) {
                $cookies.remove("user");
                $cookies.remove("tenant");
            }
            if (isNullOrUndefined($http.defaults.headers.common["X-TenantID"])) {
                if (!isNullOrUndefined($rootScope.tenant)) {
                    $http.defaults.headers.common["X-TenantID"] = $rootScope.tenant.tenantKey;
                }
                else {
                    $http.defaults.headers.common["X-TenantID"] = $location.host();
                }
            }
            if (!isNullOrUndefined($rootScope.user)) {
                $http.defaults.headers.common["Authorization"] = "Basic " + $rootScope.user.authorization;
            }
            if (!isNullOrUndefined($rootScope.tenant)) {
                $http.defaults.headers.common["X-TenantID"] = $rootScope.tenant.tenantKey;
            }
            if (next.authenticated === true) {
                if (isNullOrUndefined($rootScope.user)) {
                    $location.path("/login");
                }
            }
        });
        $rootScope.logout = function () {
            Auth.logout();
        };
    }]);

function config($translateProvider) {
    var pageTitle = "lead";
    var pageLogo = pageTitle + "+";
    $translateProvider
        .translations(Language[Language.DE], {
        TITLE: pageTitle,
        LOGO: pageLogo,
        DASHBOARD_MENU: "Dashboard",
        LEADS_MENU: "Anfragen",
        OFFERS_MENU: "Angebote",
        SALES_MENU: "Verkäufe",
        STATISTIC_MENU: "Statistiken",
        SETTINGS_MENU: "Einstellungen",
        PROFILE_MENU: "Profil",
        PRODUCT_MENU: "Produkte",
        CUSTOMER_MENU: "Kunden",
        CUSTOMER_DETAIL_MENU: "Kundendetails",
        LOGIN: "Anmelden",
        LOGOUT: "Abmelden",
        LANGUAGE: "Sprache",
        LOGIN_WELCOME: "Willkommen bei " + pageLogo,
        LOGIN_WELCOME_DESCRIPTION: pageLogo + " Lead Management System",
        LOGIN_NO_ACCOUNT: "Noch keinen Account?",
        LOGIN_CREATE_ACCOUNT: "Registrieren",
        LOGIN_ERROR: "Anmeldung fehlgeschlagen",
        SIGNUP_REGISTER_WELCOME: "Registrieren Sie sich bei " + pageLogo,
        SIGNUP_CREATE_ACCOUNT: "Erstellen Sie sich ein Account",
        SIGNUP_LOGIN_AFTER: "Melden Sie sich nach der Registrierung an",
        SIGNUP_TO_LOGIN: "Zur Anmeldung",
        SIGNUP_SUCCESS: "Willkommen bei " + pageLogo,
        SIGNUP_ERROR: "Registrierung fehlgeschlagen",
        SIGNUP_FIRSTNAME: "Vorname",
        SIGNUP_LASTNAME: "Nachname",
        SIGNUP_VALIDATE_FIRSTNAME_TO_SHORT: "Vorname muss mindestens 2 Zeichen enthalten",
        SIGNUP_VALIDATE_LASTNAME_TO_SHORT: "Nachname muss mindestens 2 Zeichen enthalten",
        SIGNUP_VALIDATE_USER_IN_USE: "Benutzername schon vergeben",
        SIGNUP_VALIDATE_USER_TO_SHORT: "Benutzername muss mindestens 2 Zeichen enthalten",
        SIGNUP_VALIDATE_USER_TO_LONG: "Benutzername darf höchstens 20 Zeichen enthalten",
        SIGNUP_VALIDATE_EMAIL_IN_USE: "E-Mail schon vergeben",
        SIGNUP_VALIDATE_PASSWORD_TO_LONG: "Passwort darf höchstens 20 Zeichen enthalten",
        PROFIL_VALIDATE_PHONE_TO_SHORT: "Telefonnummer muss mindestens 2 Zeichen enthalten",
        PROFIL_VALIDATE_SKYPE_TO_SHORT: "Skype muss mindestens 2 Zeichen enthalten",
        PROFIL_VALIDATE_FAX_TO_SHORT: "FAX muss mindestens 2 Zeichen enthalten",
        PROFIL_VALIDATE_JOB_TO_SHORT: "Job muss mindestens 2 Zeichen enthalten",
        REGISTRATION_VALIDATE_SUBDOMAIN_IN_USE: "Subdomain wird bereits verwendet",
        REGISTRATION_VALIDATE_TENANT_COMPANY_NAME: "Firmenname",
        REGISTRATION_VALIDATE_TENANT_ADDRESS: "Adresse",
        REGISTRATION_VALIDATE_TENANT_PHONE: "Telefonnummer",
        REGISTRATION_VALIDATE_TENANT_EMAIL: "Email",
        REGISTRATION_VALIDATE_PASSWORD_TOO_SHORT: "Subdomain ist zu kurz",
        REGISTRATION_VALIDATE_PASSWORD_TOO_LONG: "Subdomain ist zu lang",
        MR: "Herr",
        MS: "Frau",
        DAILY: "Heute",
        WEEKLY: "Woche",
        MONTHLY: "Monat",
        YEARLY: "Jahr",
        ALL: "Alle",
        LEAD: "Anfrage",
        SUPPLY: "Lieferung",
        EMAIL: "Email",
        SALE: "Verkauf",
        YES: "Ja",
        NO: "Nein",
        EMAIL_TEMPLATE: "Email Vorlagen",
        EMAIL_TEMPLATE_ERROR: "Fehler im Email-Template",
        EMAIL_TEMPLATE_SELECT: "Keine Vorlage",
        EMAIL_TEMPLATE_SYNTAX_SUCCESS: "Template ist valide",
        SETTING_TEMPLATE_TEST_SYNTAX: "Template testen",
        EMAIL_RECIPIENT_COMMA: "(mit Komma getrennt)",
        EMAIL_RECIPIENT: "Empfänger",
        EMAIL_SUBJECT: "Betreff",
        EMAIL_ATTACHMENT: "Anhang",
        EMAIL_ATTACHMENT_SELECT: "Datei auswählen",
        EMAIL_ATTACHMENT_CHANGE: "Ändern",
        EMAIL_MESSAGE: "Nachricht",
        EMAIL_SEND: "E-Mail senden",
        EMAIL_ONLY_FOLLOWUP: "Nur FollowUp setzen",
        EMAIL_NOTIFICATION_HISTORY: "Bisher gesendete Nachrichten",
        EMAIL_NOTIFICATION_SELECT: "Nachricht auswählen",
        TEMPLATE_VARIABLES_INFO: "Sie können all die unten aufgelisteten Variablen innerhalb Ihres Templates verwenden.",
        COMMON_SKYPE: "Skype",
        COMMON_FAX: "Fax",
        COMMON_JOB: "Berufsbezeichnung",
        COMMON_LOAD_MORE: "weitere laden",
        COMMON_CURRENCY: "€",
        COMMON_UPLOAD_NEW_IMAGE: "Neues Bild hochladen",
        COMMON_RESET: "Zurücksetzen",
        COMMON_SEND: "Senden",
        COMMON_CONTINUE_AND_SENDING: "Speichern und senden",
        COMMON_CONTINUE_WITHOUT_SENDING: "Speichern ohne senden",
        COMMON_DELETE: "Löschen",
        COMMON_DELETE_SUCCESS: "Löschen erfolgreich",
        COMMON_DELETE_ERROR: "Löschen fehlgeschlagen",
        COMMON_DETAILS: "Details",
        COMMON_FOLLOWUP: "Follow Up Mail",
        COMMON_ACTIVATED: "Aktiviert",
        COMMON_DEACTIVATED: "Deaktiviert",
        COMMON_DEACTIVATE: "Deaktivieren",
        COMMON_CREATED: "Erstellt",
        COMMON_TITLE: "Anrede",
        COMMON_FORM_OF_ADDRESS: "Anrede",
        COMMON_TITLE_MR: "Herr",
        COMMON_TITLE_MS: "Frau",
        COMMON_FIRSTNAME: "Vorname",
        COMMON_LASTNAME: "Nachname",
        COMMON_USERNAME: "Benutzername",
        COMMON_DESCRIPTION: "Beschreibung",
        COMMON_PASSWORD: "Passwort",
        COMMON_PASSWORD_2: "Passwort wiederholen",
        COMMON_USER: "Benutzer",
        COMMON_ADMIN: "Administrator",
        COMMON_SUPERADMIN: "Superadmin",
        COMMON_ROLE: "Rolle",
        COMMON_NAME: "Name",
        COMMON_DATE: "Datum",
        COMMON_STATUS: "Status",
        COMMON_COMPANY: "Firma",
        COMMON_EMAIL: "E-Mail",
        COMMON_ADDRESS: "Adresse",
        COMMON_PHONE: "Telefon",
        COMMON_CANCEL: "Abbrechen",
        COMMON_SAVE: "Speichern",
        COMMON_REFRESH: "Aktualisieren",
        COMMON_PROCESSOR: "Bearbeiter",
        COMMON_CHILDROW_ADDITONAL_TITLE: "Zusätzliche Informationen",
        COMMON_PRODUCT_AMOUNT: "Menge",
        COMMON_PRODUCT_SINGLE_PRICE: "Einzelpreis",
        COMMON_PRODUCT_BASE_PRICE: "Grundpreis",
        COMMON_PRODUCT_ENTIRE_PRICE: "Gesamtpreis",
        COMMON_PRODUCT_INCL_DELIVERY_COSTS: "inkl. Lieferkosten",
        COMMON_PRODUCT_OFFER_PRICE: "Nettopreis",
        COMMON_PRODUCT_DESTINATION: "Lieferort",
        COMMON_PRODUCT_DELIVERYCOSTS: "Lieferkosten",
        COMMON_PRODUCT_SALE_TURNOVER: "Umsatz",
        COMMON_PRODUCT_SALE_INVOICE_NUMBER: "Rechnungsnummer",
        COMMON_PRODUCT_SALE_INVOICE_NUMBER_SHORT: "Rechnungs Nr.",
        COMMON_PRODUCT_SALE_PROFIT: "Gewinn",
        COMMON_PRODUCT_SALE_COST: "Kosten",
        COMMON_PRODUCT_CALCULATION: "Preiskalkulation",
        COMMON_DELIVERY_TIME: "Lieferdatum",
        COMMON_SALE_RETURN: "Umsatz",
        COMMON_SALE_PROFIT: "Gewinn",
        COMMON_CONVERSIONRATE: "Conversionrate",
        COMMON_NOTE: "Nachricht",
        COMMON_COMMENTS: "Kommentare",
        COMMON_COMMENTS_LAST: "Letzter Kommentar",
        COMMON_COMMENTS_ENTER: "Kommentar eingeben",
        COMMON_COMMENTS_ADD: "Kommentar senden",
        COMMON_COMMENTS_HISTORY: "Verlauf...",
        COMMON_COMMENTS_MODAL_HISTORY: "Kommentar Verlauf",
        COMMON_VALIDATE_MAX_FILE_SIZE: "Das Bild darf nicht größer als 4MB sein",
        COMMON_VALIDATE_TOO_LONG: "Eingabe zu lang!",
        COMMON_VALIDATE_TOO_BIG: "Eingabe zu groß!",
        COMMON_VALIDATE_MAX: "Nicht mehr als ",
        COMMON_VALIDATE_MIN: "Das Feld muss mindestens {{number}} Zeichen lang sein",
        COMMON_VALIDATE_MAX_END: " Zeichen gültig!",
        COMMON_VALIDATE_REQ: "Feld benötigt ",
        COMMON_VALIDATE_REQ_NUMBER: "Eingabe darf nicht negativ sein",
        COMMON_VALIDATE_INVALID: "Eingabe ungültig!",
        COMMON_VALIDATE_ALPHANUMERIC: "Es sind nur Alphanumerische Zeichen erlaubt. Z.b. A-Z und 0-9",
        COMMON_VALIDATE_EMAIL: "E-Mail ungültig!",
        COMMON_NEW_PASSWORD: "Neues Passwort",
        COMMON_VALIDATE_PASSWORD: "Passwort muss mindestens 6 Zeichen lang sein",
        COMMON_VALIDATE_PASSWORD_NOT_MATCH: "Passwörter stimmen nicht überein",
        COMMON_VALIDATE_INVOICE_NUMBER_ALREADY_EXISTS: "Rechnungsnummer existiert bereits",
        COMMON_TOAST_SUCCESS_ADD_LEAD: "Eine neue Anfrage wurde angelegt",
        COMMON_TOAST_SUCCESS_INCONTACT: "Anfrage wurde auf in Kontakt gesetzt",
        COMMON_TOAST_SUCCESS_NEW_OFFER: "Ein neues Angebot wurde erstellt",
        COMMON_TOAST_SUCCESS_NEW_SALE: "Glückwunsch zum Verkauf!",
        COMMON_TOAST_SUCCESS_CLOSE_LEAD: "Die Anfrage wurde geschlossen",
        COMMON_TOAST_SUCCESS_OPEN_LEAD: "Die Anfrage wurde geöffnet",
        COMMON_TOAST_SUCCESS_UPDATE_LEAD: "Die Anfrage wurde bearbeitet",
        COMMON_TOAST_SUCCESS_DELETE_LEAD: "Die Anfrage wurde gelöscht",
        COMMON_TOAST_FAILURE_DELETE_LEAD: "Die Anfrage konnte nicht gelöscht werden",
        COMMON_TOAST_SUCCESS_ADD_OFFER: "Ein neues Angebot wurde angelegt",
        COMMON_TOAST_SUCCESS_DONE_OFFER: "Angebot wurde auf Erledigt gesetzt",
        COMMON_TOAST_SUCCESS_REVERT_DONE_OFFER: "Das Angebot wurde zurückgesetzt",
        COMMON_TOAST_SUCCESS_CLOSE_OFFER: "Das Angebot wurde geschlossen",
        COMMON_TOAST_SUCCESS_OPEN_OFFER: "Das Angebot wurde geöffnet",
        COMMON_TOAST_SUCCESS_UPDATE_OFFER: "Das Angebot wurde bearbeitet",
        COMMON_TOAST_SUCCESS_DELETE_OFFER: "Das Angebot wurde gelöscht",
        COMMON_TOAST_FAILURE_DELETE_OFFER: "Das Angebot konnte nicht gelöscht werden",
        COMMON_TOAST_SUCCESS_UPDATE_SALE: "Der Verkauf wurde bearbeitet",
        COMMON_TOAST_SUCCESS_DELETE_SALE: "Der Verkauf wurde gelöscht",
        COMMON_TOAST_FAILURE_DELETE_SALE: "Der Verkauf konnte nicht gelöscht werden",
        COMMON_TOAST_SUCCESS_ADD_SALE: "Ein neuer Verkauf wurde angelegt",
        COMMON_TOAST_SUCCESS_FOLLOW_UP: "Angebot wurde auf Follow up gesetzt",
        COMMON_TOAST_ROLLBACK_OPEN_TO_LEAD: "Angebot wurde erfolgreich auf eine Anfrage zurückgesetzt",
        COMMON_TOAST_ROLLBACK_OPEN_TO_LEAD_ERROR: "Angebot konnte nicht auf eine Anfrage zurückgesetzt werden",
        COMMON_STATUS_OPEN: "Offen",
        COMMON_STATUS_LEAD: "Anfrage",
        COMMON_STATUS_INCONTACT: "In Kontakt",
        COMMON_STATUS_OFFER: "Angebot",
        COMMON_STATUS_DONE: "Erledigt",
        COMMON_STATUS_FOLLOW_UP: "Follow up",
        COMMON_STATUS_FOLLOW_UP_NO_SEND: "Follow up",
        COMMON_STATUS_FOLLOW_UP_AND_SEND: "Follow up und Nachricht versenden",
        COMMON_STATUS_SALE: "Verkauf",
        COMMON_STATUS_CLOSED: "Geschlossen",
        COMMON_EMPTY_PROCESSOR: "Niemand",
        COMMON_STATUS_SET_DONE: "Als erledigt markieren",
        COMMON_STATUS_SET_OPEN: "Als offen markieren",
        COMMON_SEARCH: "Suchen...",
        DASHBOARD_MANAGE_LEADS: "Anfragen verwalten",
        DASHBOARD_DRAG_INFO: "Ziehen Sie die Elemente per Drag\"n\"Drop",
        DASHBOARD_REFRESH: "Aktualisieren",
        DASHBOARD_OPEN_LEADS: "Offene Anfragen",
        DASHBOARD_OPEN_OFFERS: "Angebote",
        DASHBOARD_DONE_OFFERS: "Erledigte Angebote",
        DASHBOARD_LATEST_SALES: "Heutige Verkäufe",
        DASHBOARD_INFO_BUTTON: "Info",
        DASHBOARD_GOTO_BUTTON: "Go to",
        DASHBOARD_COMPLETION: "Abschlüsse",
        NOTIICATION_SEND: "Nachricht erfolgreich versendet",
        NOTIICATION_SEND_ERROR: "Fehler beim Senden. Bitte überprüfen sie ihre SMTP Einstellungen",
        NOTIFICATION_NO_NOTIFICATIONS: "Keine versendeten Nachrichten vorhanden",
        NOTIFICATION_SEND_NOTIFICATIONS: "Versendete Nachrichten",
        PROFILE_PROFILE_INFORMATION: "Profilinformationen",
        PROFILE_DEFAULT_LANGUAGE: "Standard Sprache",
        PROFILE_DEFAULT_VAT: "Standard Mehrwertsteuer",
        PROFILE_PASSWORD_MANAGEMENT: "Passwortverwaltung",
        PROFILE_OLD_PASSWORD: "Altes Passwort",
        PROFILE_VALIDATE_OLD_PASSWORD: "Altes Passwort wird benötigt",
        PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS: "Profilinformationen wurden aktualisiert",
        PROFILE_TOAST_PROFILE_INFORMATION_ERROR: "Profilinformationen konnten nicht aktualisiert werden",
        PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS: "Passwort wurde geändert",
        PROFILE_TOAST_PASSWORD_CHANGE_ERROR: "Passwort konnte nicht geändert werden",
        PROFILE_PICTURE_MANAGEMENT: "Profilbildverwaltung",
        PROFILE_SMTP_TAB: "SMTP",
        PROFILE_PASSWORD_TAB: "Passwort und Profilbild",
        PROFILE_ACCOUNT_TAB: "Profilinformationen",
        PROCESS_DELETE_PROCESS_TITLE: "Prozess löschen",
        PROCESS_DELETE_PROCESS_BODY: "Möchten Sie den Prozess wirklich löschen?",
        LEAD_LEADS: "Anfragen",
        LEAD_MANAGE_LEADS: "Anfragen verwalten",
        LEAD_ADD_LEAD: "Neue Anfrage",
        LEAD_ADD_LEAD_MODAL: "Anfrage erstellen",
        LEAD_EDIT_LEAD_MODAL: "Anfrage bearbeiten",
        LEAD_SHOW_ALL_LEADS: "Alle Anfragen",
        LEAD_FOLLOW_UP: "Angebot erstellen",
        LEAD_PIN: "Zuweisen",
        LEAD_OPEN_LEAD: "Anfrage öffnen",
        LEAD_CLOSE_LEAD: "Anfrage schließen",
        LEAD_CLOSE_LEAD_REALLY: "Möchten Sie die Anfrage wirklich schließen?",
        LEAD_EDIT_LEAD: "Anfrage bearbeiten",
        LEAD_DELETE_LEAD: "Anfrage löschen",
        LEAD_DELETE_LEAD_BODY: "Möchten Sie die Anfrage wirklich löschen?",
        LEAD_EDIT_SELECT_PRODUCT: "Produkt wählen",
        OFFER_OFFERS: "Angebote",
        OFFER_OFFER: "Angebot",
        OFFER_MANAGE_OFFERS: "Angebote verwalten",
        OFFER_ADD_OFFER: "Neues Angebot",
        OFFER_ADD_OFFER_MODAL: "Angebot erstellen",
        OFFER_EDIT_OFFER_MODAL: "Angebot bearbeiten",
        OFFER_SHOW_ALL_OFFERS: "Alle Angebote",
        OFFER_CREATE_SALE: "Verkauf abschließen",
        OFFER_FOLLOW_UP: "Follow up",
        LEAD_IN_CONTACT: "In Kontakt",
        OFFER_OPEN_OFFER: "Angebot öffnen",
        OFFER_CLOSE_OFFER: "Angebot schließen",
        OFFER_CLOSE_OFFER_REALLY: "Möchten Sie das Angebot wirklich schließen?",
        OFFER_EDIT_OFFER: "Angebot bearbeiten",
        OFFER_DELETE_OFFER: "Angebot löschen",
        OFFER_DELETE_OFFER_BODY: "Möchten Sie das Angebot wirklich löschen?",
        OFFER_TAB_OFFERS: "Angebot - Angebote",
        OFFER_TAB_FILES: "Angebote - Dateien",
        OFFER_TAB_TEMPLATES: "Angebote - Vorlagen",
        OFFER_GENERATION_AND_SENDING: "Angebot generieren und versenden",
        OFFER_ROLLBACK_TITLE: "Angebot zurücksetzen",
        OFFER_ROLLBACK_BODY: "Möchten Sie das Angebot wirklich zurücksetzen?",
        SALE_SALES: "Verkäufe",
        SALE_MANAGE_SALES: "Verkäufe verwalten",
        SALE_ADD_SALE: "Verkauf hinzufügen",
        SALE_EDIT_SALE: "Verkauf bearbeiten",
        SALE_ADD_SALE_MODAL: "Verkauf hinzufügen",
        SALE_EDIT_SALE_MODAL: "Verkauf bearbeiten",
        SALE_SHOW_ALL_SALES: "Alle Verkäufe",
        SALE_DELETE_SALE: "Verkauf löschen",
        SALE_DELETE_SALE_BODY: "Möchten Sie den Verkauf wirklich löschen?",
        SALE_ROLLBACK_TITLE: "Verkauf zurücksetzen",
        SALE_ROLLBACK_BODY: "Möchten Sie den Verkauf wirklich zurücksetzen?",
        SETTING_USER: "Benutzer",
        SETTING_USER_MANAGEMENT: "Benutzer Einstellungen",
        SETTING_EMAIL: "Email Templates",
        SETTING_EMAIL_MANAGEMENT: "Email Einstellungen",
        SETTING_EMAIL_MANAGEMENT_SENDER: "Absendername",
        SETTING_EMAIL_MANAGEMENT_EMAIL: "Email",
        SETTING_EMAIL_MANAGEMENT_SERVER: "Server",
        SETTING_EMAIL_MANAGEMENT_USERNAME: "Benutzername",
        SETTING_EMAIL_MANAGEMENT_PASSWORD: "Passwort",
        SETTING_EMAIL_MANAGEMENT_ENCRYPTION: "Verschlüsselung",
        SETTING_EMAIL_MANAGEMENT_PORT: "Port",
        SETTING_EMAIL_MANAGEMENT_PORT_NO_INPUT: "Keine Eingabe = Standardport",
        SETTING_EMAIL_MANAGEMENT_CONNECTION_TEST: "Verbindung testen",
        SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST: "Verbindung zum SMTP Server erfolgreich. ",
        SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST_ERROR: "Verbindung zum SMTP Server fehlgeschlagen. ",
        SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE: "Speichern der SMTP Server Verbindung erfolgreich. ",
        SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE_ERROR: "Speichern der SMTP Server Verbindung fehlgeschlagen. ",
        SETTING_EMAIL_TEMPLATES_MANAGEMENT: "Email Templates",
        SETTING_EMAIL_NEW_TEMPLATE: "Neues Template",
        SETTING_ACCESS_MANAGEMENT: "Benutzer verwalten",
        SETTING_ACTIVATE_USER: "Freischalten",
        SETTING_DEACTIVATE_USER: "Deaktivieren",
        SETTING_ROLE_MANAGEMENT: "Benutzerrollen verwalten",
        SETTING_TOAST_ACCESS_GRANTED: "Der Benutzer wurde freigeschalten",
        SETTING_TOAST_ACCESS_GRANTED_ERROR: "Der Benutzer konnte nicht freigeschaltet werden",
        SETTING_TOAST_ACCESS_REVOKED: "Der Benutzer wurde deaktiviert",
        SETTING_TOAST_ACCESS_REVOKED_ERROR: "Der Benutzer konnte nicht deaktiviert werden",
        SETTING_TOAST_SET_ROLE: "Die Rolle wurde geändert",
        SETTING_TOAST_SET_ROLE_ERROR: "Die Rolle konnte nicht geändert werden",
        SETTING_EMAIL_TEMPLATE_CREATE: "Email Template erstellen",
        SETTING_EMAIL_TEMPLATE_DELETE: "Email Template löschen",
        SETTING_EMAIL_TEMPLATE_DELETE_CONFIRMATION_1: "Möchten Sie sicher das Email Template ",
        SETTING_EMAIL_TEMPLATE_DELETE_CONFIRMATION_2: "löschen ",
        SETTING_EMAIL_TEMPLATE_EDIT: "Email Template bearbeiten",
        SETTING_EMAIL_TEMPLATE_TEXT: "Template",
        SETTING_TEMPLATE_NOTIFICATION_TYPE: "Nachrichtentypen",
        SETTING_TEMPLATE_ALL_TYPES: "Alle Typen",
        SETTING_TEMPLATE_NOTIFICATION_TYPE_SELECT: "Nachrichtentyp auswählen",
        SETTING_TEMPLATE_SOURCE: "Quellen",
        SETTING_TEMPLATE_ALL_SOURCES: "Alle mit Quelle",
        SETTING_TEMPLATE_NO_SOURCES: "Alle ohne Quelle",
        SETTING_TEMPLATE_SOURCE_SELECT: "Quelle auswählen",
        SETTING_TOAST_EMAIL_TEMPLATE_SAVE: "Email Template wurde erfolgreich erstellt",
        SETTING_TOAST_EMAIL_TEMPLATE_SAVE_ERROR: "Fehler beim Erstellen des Email Templates",
        SETTING_TOAST_EMAIL_TEMPLATE_UPDATE: "Email Template wurde erfolgreich verändert",
        SETTING_TOAST_EMAIL_TEMPLATE_UPDATE_ERROR: "Fehler beim Verändern des Email Templates",
        SETTING_TOAST_EMAIL_TEMPLATE_DELETE: "Email Template wurde erfolgreich gelöscht",
        SETTING_TOAST_EMAIL_TEMPLATE_DELETE_ERROR: "Fehler beim Löschen des Email Templates",
        STATISTIC_PERIOD: "Zeitraum",
        STATISTIC_PERIOD_TODAY: "Heute",
        STATISTIC_PERIOD_WEEK: "Woche",
        STATISTIC_PERIOD_MONTH: "Monat",
        STATISTIC_PERIOD_YEAR: "Jahr",
        STATISTIC_PERIOD_ALL: "Alle",
        STATISTIC_PERIOD_LAST_30_DAYS: "Letzte 30 Tage",
        STATISTIC_SINGLE_STATISTIC: "Einzelstatistik",
        STATISTIC_GENERAL_STATISTIC: "Gesamtstatistik",
        STATISTIC_USER_STATISTIC: "Benutzer Statistik",
        STATISTIC_MY_STATISTIC: "Meine Statistik",
        STATISTIC_PROFIT: "Gewinn",
        STATISTIC_TURNOVER: "Umsatz",
        STATISTIC_SALES: "Abschlüsse",
        STATISTIC_SALES_OF_LEADS: "Verkäufe aus Anfragen",
        STATISTIC_SALES_OF_LEADS_Y_AXIS: "Abschlüsse in %",
        STATISTIC_SALES_OF_OFFERS: "Verkäufe aus Angeboten",
        STATISTIC_SALES_OF_OFFERS_Y_AXIS: "Abschlüsse in %",
        STATISTIC_PROFIT_ON_SALES: "Umsatzrentabilität",
        STATISTIC_PROFIT_PER_SALE: "Gewinn pro Verkauf",
        STATISTIC_CONVERSIONRATE: "Conversionrate",
        STATISTIC_PARTS: "Anteile",
        STATISTIC_PROFIT_AND_RETURN: "Gewinn und Umsatz",
        STATISTIC_PROFIT_AND_RETURN_Y_AXIS: "Gewinn/Umsatz in €",
        STATISTIC_LEADS_OFFERS_SALES: "Anfragen/Angebote/Verkäufe",
        STATISTIC_LEADS_OFFERS_SALES_Y_AXIS: "Anzahl",
        STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE: "Nicht verfügbar",
        STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE_MESSAGE: "Die Gesamtstatistiken sind nur für Woche, Monat, Jahr und Alle verfügbar",
        STATISTIC_TOP_SELL: "Top Verkäufe",
        STATISTIC_TOP_SALESMAN: "Top Verkäufer",
        STATISTIC_INVOLVED_IN_PROCESSES: "An Prozessen beteiligt",
        STATISTIC_WORKED_ON_LEADS: "Bearbeitete Anfragen",
        STATISTIC_WORKED_ON_OFFERS: "Bearbeitete Angebote",
        STATISTIC_WORKED_ON_SALES: "Bearbeitete Verkäufe",
        STATISTIC_COMPLETED_PROCESSES: "Abgeschlossene Prozesse",
        STATISTIC_PRODUCT_SALES: "Verkaufte Produkte",
        STATISTIC_EARNING_RATE: "Erfolgsrate",
        STATISTIC_EARNING_RATE_PROCESS: "Erfolgsrate - Prozessbeteilgung",
        DETAIL_STATISTIC_PRODUCTSTATISTIC: "Produktstatistik",
        DETAIL_STATISTIC_USERSTATISTIC: "Benutzerstatistik",
        DETAIL_STATISTIC_REALISED_TURNOVER: "Erzielter Umsatz",
        DETAIL_STATISTIC_REALISED_PROFIT: "Erzielter Gewinn",
        DETAIL_STATISTIC_TURNOVER_PER_LEAD: "Umsatz pro Anfrage",
        DETAIL_STATISTIC_PROFIT_PER_LEAD: "Gewinn pro Anfrage",
        DETAIL_STATISTIC_GUARANTEED_DISCOUNT: "Gewährter Rabatt",
        DETAIL_STATISTIC_SALES_PRICE: "Verkaufspreis",
        DETAIL_STATISTIC_ADVERTISED_PRICE: "Angezeigter Preis",
        DETAIL_STATISTIC_TOOLTIP: "<span>Das Produkt {{productname}} wurde <b>{{count}}x</b> in {{workflow}} verwendet.</span>",
        DETAIL_STATISTIC_USER_TOOLTIP: "<span>{{username}} hat <b>{{count}}</b> {{workflow}} bearbeitet.</span>",
        DETAIL_STATISTIC_SUCCESS_INDICATOR: "Erfolgskennzahlen",
        PROFIT_PER_LEAD: "Gewinn pro Anfrage",
        PROFIT_PER_OFFER: "Gewinn pro Angebot",
        TURNOVER_PER_LEAD: "Umsatz pro Anfrage",
        TURNOVER_PER_OFFER: "Umsatz pro Angebot",
        SUNDAY: "Sonntag",
        MONDAY: "Montag",
        TUESDAY: "Dienstag",
        WEDNESDAY: "Mittwoch",
        THURSDAY: "Donnerstag",
        FRIDAY: "Freitag",
        SATURDAY: "Samstag",
        JANUARY: "Januar",
        FEBRUARY: "Februar",
        MARCH: "März",
        APRIL: "April",
        MAY: "Mai",
        JUNE: "Juni",
        JULY: "Juli",
        AUGUST: "August",
        SEPTEMBER: "September",
        OCTOBER: "Oktober",
        NOVEMBER: "November",
        DECEMBER: "Dezember",
        PRODUCT_PRODUCTS: "Produkte",
        PRODUCT_PRODUCT: "Produkt",
        PRODUCT_MANAGE_PRODUCTS: "Produkte verwalten",
        PRODUCT_CREATE: "Neues Produkt",
        PRODUCT_PRODUCTNAME: "Produktname",
        PRODUCT_DESCRIPTION: "Beschreibung",
        PRODUCT_PRICE: "Nettopreis",
        PRODUCT_GROSS_PRICE: "Bruttopreis",
        PRODUCT_IMAGE: "Bild",
        PRODUCT_EDIT: "Produkt bearbeiten",
        PRODUCT_DEACTIVATED: "Deaktivieren",
        PRODUCT_CREATED: "Erstellt",
        PRODUCT_PRODUCT_STATE: "Zustand",
        PRODUCT_PRODUCT_STATE_NEW: "Neu",
        PRODUCT_PRODUCT_STATE_USED: "Gebraucht",
        PRODUCT_DISCOUNT: "Rabatt",
        PRODUCT_TOAST_SAVE: "Produkt wurde erfolgreich angelegt",
        PRODUCT_TOAST_SAVE_ERROR: "Produkt konnte nicht angelegt werden",
        PRODUCT_TOAST_UPDATE: "Produkt wurde erfolgreich aktuallisiert",
        PRODUCT_TOAST_UPDATE_ERROR: "Produkt konnte nicht aktuallisiert werden",
        PRODUCT_NUMBER: "Produktnummer",
        PRODUCT_ORIGINAL_PRICE: "Originalpreis",
        SOURCE_SOURCES: "Quellen",
        SOURCE_SOURCE: "Quelle",
        SOURCE_MANAGE_SOURCES: "Quellen verwalten",
        SOURCE_CREATE: "Neue Quelle",
        SOURCE_SOURCENAME: "Quellenname",
        SOURCE_DESCRIPTION: "Beschreibung",
        SOURCE_EDIT: "Quelle bearbeiten",
        SOURCE_DEACTIVATED: "Deaktivieren",
        SOURCE_CREATED: "Erstellt",
        SOURCE_TOAST_SAVE: "Quelle wurde erfolgreich angelegt/bearbeitet",
        SOURCE_TOAST_SAVE_ERROR: "Quelle konnte nicht angelegt/aktualisiert werden",
        SOURCE_NAME_EXISTS: "Der Name existiert bereits",
        CUSTOMER: "Kunde",
        CUSTOMER_MANAGE_CUSTOMER: "Kunden verwalten",
        CUSTOMER_SELECT: "Kunde suchen",
        CUSTOMER_INCL: "Inkl. Interessenten",
        CUSTOMER_CREATE: "Kunde erstellen",
        CUSTOMER_EDIT: "Kunde bearbeiten",
        CUSTOMER_DEACTIVATED: "Deaktivieren",
        CUSTOMER_CREATED: "Erstellt",
        CUSTOMER_DETAIL_LEAD: "Anfrage",
        CUSTOMER_DETAIL_OFFER: "Angebot",
        CUSTOMER_DETAIL_SALE: "Verkauf",
        CUSTOMER_DETAIL_TIMELINE: "Kunden Timeline",
        CUSTOMER_DETAIL_CREATED: "wurde erstellt",
        CUSTOMER_NUMBER: "Kundennummer",
        CUSTOMER_TOAST_SAVE: "Der Kunde wurde erfolgreich angelegt/aktualisiert",
        CUSTOMER_TOAST_ERROR: "Der Kunde konnte nicht angelegt/aktualisiert werden",
        TODO_TODOS: "Aufgaben",
        SHOW_MY_TASKS: "Zeige meine Aufgaben",
        TODO_NO_TODOS: "Keine Aufgaben vorhanden",
        CALCULATION_NET: "Netto",
        CALCULATION_GROSS: "Brutto",
        CALCULATION_VAT: "Mehrwertsteuer",
        TOOLTIP_SIGN_UP: "Registrieren Sie sich jetzt unter ihrer spezifischen Subdomain um vollen Zugriff auf die Anwendung zu erhalten. Nach der erfolgreichen Registrierung, muss ihr Anwendungs-Administrator ihren Account freischalten.",
        TOOLTIP_TODO: "Über Aufgaben kannst Du all die Prozesse im Auge behalten, an denen Du beteiligt bist.",
        TOOLTIP_PROFIL_PICTURE: "Wähle dein Profilbild und speichere es. Danach präsentiert es Dich innerhalb der Anwendung.",
        TOOLTIP_CUSTOMER_LOOKUP: "Ab einer Eingabe von 3 Zeichen werden dir relevante Kunden angezeigt.\nDu kannst nach Vorname, Nachname, Firma, E-Mail und Kundennummer suchen.",
        FORMER_PROCESSOR: "Ehemalige Bearbeiter",
        FORMER_PROCESSOR_NAME: "Bearbeiter",
        FORMER_PROCESSOR_ACTIVITY: "Tätigkeit",
        FORMER_PROCESSOR_TIMESTAMP: "Datum",
        FORMER_PROCESSOR_SELECT_ACTIVITY: "Tätigkeit auswählen",
        SUMMERNOTE_WORKFLOW_TEMPLATE_BUTTON: "Auftragsvariablen",
        SUMMERNOTE_CUSTOMER_TEMPLATE_BUTTON: "Kundenvariablen",
        SUMMERNOTE_ORDER_TEMPLATE_BUTTON: "Bestellvariablen",
        SUMMERNOTE_USER_TEMPLATE_BUTTON: "Benutzervariablen",
        SUMMERNOTE_ORDER_LIST: "Bestell liste"
    })
        .translations(Language[Language.EN], {
        TITLE: pageTitle,
        LOGO: pageLogo,
        DASHBOARD_MENU: "Dashboard",
        LEADS_MENU: "Leads",
        OFFERS_MENU: "Offers",
        SALES_MENU: "Sales",
        STATISTIC_MENU: "Statistics",
        SETTINGS_MENU: "Settings",
        PROFILE_MENU: "Profile",
        PRODUCT_MENU: "Products",
        CUSTOMER_MENU: "Customer",
        CUSTOMER_DETAIL_MENU: "Customer details",
        LOGIN: "Login",
        LOGOUT: "Logout",
        LANGUAGE: "Language",
        LOGIN_WELCOME: "Welcome to " + pageLogo,
        LOGIN_WELCOME_DESCRIPTION: "Lead Management System",
        LOGIN_NO_ACCOUNT: "Do not have an account?",
        LOGIN_CREATE_ACCOUNT: "Register",
        LOGIN_ERROR: "Login failed",
        SIGNUP_REGISTER_WELCOME: "Register to " + pageLogo,
        SIGNUP_CREATE_ACCOUNT: "Create an account",
        SIGNUP_LOGIN_AFTER: "Login after your Signed Up",
        SIGNUP_TO_LOGIN: "Go to login",
        SIGNUP_SUCCESS: "Welcome to " + pageLogo,
        SIGNUP_ERROR: "Registration failed",
        SIGNUP_FIRSTNAME: "Firstname",
        SIGNUP_LASTNAME: "Lastname",
        SIGNUP_VALIDATE_FIRSTNAME_TO_SHORT: "Firstname has to contain 2 or more characters",
        SIGNUP_VALIDATE_LASTNAME_TO_SHORT: "Lastname has to contain 2 or more characters",
        SIGNUP_VALIDATE_USER_IN_USE: "Username already in use",
        SIGNUP_VALIDATE_USER_TO_SHORT: "Username has to contain 2 or more characters",
        SIGNUP_VALIDATE_USER_TO_LONG: "Username has to contain 20 or less characters",
        SIGNUP_VALIDATE_EMAIL_IN_USE: "E-Mail already in use",
        SIGNUP_VALIDATE_PASSWORD_TO_LONG: "Password have to contain 20 or less characters",
        PROFIL_VALIDATE_PHONE_TO_SHORT: "Telefonnummer has to contain 2 or more characters",
        PROFIL_VALIDATE_SKYPE_TO_SHORT: "Skype has to contain 2 or more characters",
        PROFIL_VALIDATE_FAX_TO_SHORT: "FAX has to contain 2 or more characters",
        PROFIL_VALIDATE_JOB_TO_SHORT: "Job has to contain 2 or more characters",
        REGISTRATION_VALIDATE_SUBDOMAIN_IN_USE: "Subdomain is already in use",
        REGISTRATION_VALIDATE_TENANT_COMPANY_NAME: "Company Name",
        REGISTRATION_VALIDATE_TENANT_ADDRESS: "Address",
        REGISTRATION_VALIDATE_TENANT_PHONE: "Phone",
        REGISTRATION_VALIDATE_TENANT_EMAIL: "Email",
        REGISTRATION_VALIDATE_PASSWORD_TOO_SHORT: "Subdomain is too short",
        REGISTRATION_VALIDATE_PASSWORD_TOO_LONG: "Subdomain is too long",
        MR: "Mr.",
        MS: "Ms.",
        DAILY: "Today",
        WEEKLY: "Week",
        MONTHLY: "Month",
        YEARLY: "Year",
        ALL: "All",
        LEAD: "Lead",
        SUPPLY: "Supply",
        EMAIL: "Email",
        SALE: "Sale",
        YES: "Yes",
        NO: "No",
        EMAIL_TEMPLATE: "Email templates",
        EMAIL_TEMPLATE_ERROR: "Error in email template",
        EMAIL_TEMPLATE_SELECT: "No template",
        EMAIL_TEMPLATE_SYNTAX_SUCCESS: "Template is valid",
        SETTING_TEMPLATE_TEST_SYNTAX: "Test Template",
        EMAIL_RECIPIENT_COMMA: "(seperated by comma)",
        EMAIL_RECIPIENT: "Recipient",
        EMAIL_SUBJECT: "Subject",
        EMAIL_ATTACHMENT: "Attachment",
        EMAIL_ATTACHMENT_SELECT: "Select file",
        EMAIL_ATTACHMENT_CHANGE: "Change",
        EMAIL_MESSAGE: "Message",
        EMAIL_SEND: "Send E-Mail",
        EMAIL_ONLY_FOLLOWUP: "Only set FollowUp",
        EMAIL_NOTIFICATION_HISTORY: "Previous send notifications",
        EMAIL_NOTIFICATION_SELECT: "Select notification",
        TEMPLATE_VARIABLES_INFO: "Within your Template you can use each Variable listed below.",
        COMMON_SKYPE: "Skype",
        COMMON_FAX: "Fax",
        COMMON_JOB: "Job Description",
        COMMON_LOAD_MORE: "more",
        COMMON_UPLOAD_NEW_IMAGE: "Upload new image",
        COMMON_CURRENCY: "€",
        COMMON_RESET: "Reset",
        COMMON_SEND: "Send",
        COMMON_CONTINUE_AND_SENDING: "Save and send",
        COMMON_CONTINUE_WITHOUT_SENDING: "Save without send",
        COMMON_DELETE: "Delete",
        COMMON_DELETE_SUCCESS: "Successfully deleted",
        COMMON_DELETE_ERROR: "Delete failed",
        COMMON_DETAILS: "Details",
        COMMON_FOLLOWUP: "Follow Up Mail",
        COMMON_ACTIVATED: "Activated",
        COMMON_DEACTIVATED: "Deactivated",
        COMMON_DEACTIVATE: "Deactivate",
        COMMON_CREATED: "Created",
        COMMON_TITLE: "Title",
        COMMON_FORM_OF_ADDRESS: "Form of address",
        COMMON_TITLE_MR: "Mr",
        COMMON_TITLE_MS: "Ms",
        COMMON_FIRSTNAME: "Firstname",
        COMMON_LASTNAME: "Lastname",
        COMMON_USERNAME: "Username",
        COMMON_DESCRIPTION: "Description",
        COMMON_PASSWORD: "Password",
        COMMON_PASSWORD_2: "Repeat Password",
        COMMON_USER: "User",
        COMMON_ADMIN: "Administrator",
        COMMON_SUPERADMIN: "Superadmin",
        COMMON_ROLE: "Role",
        COMMON_NAME: "Name",
        COMMON_DATE: "Date",
        COMMON_STATUS: "Status",
        COMMON_COMPANY: "Company",
        COMMON_EMAIL: "E-Mail",
        COMMON_PHONE: "Phone",
        COMMON_ADDRESS: "Address",
        COMMON_CANCEL: "Cancel",
        COMMON_SAVE: "Save",
        COMMON_REFRESH: "Refresh",
        COMMON_PROCESSOR: "Processor",
        COMMON_CHILDROW_ADDITONAL_TITLE: "Additional informationen",
        COMMON_PRODUCT_AMOUNT: "Amount",
        COMMON_PRODUCT_SINGLE_PRICE: "Unit price",
        COMMON_PRODUCT_BASE_PRICE: "Base price",
        COMMON_PRODUCT_ENTIRE_PRICE: "Entire price",
        COMMON_PRODUCT_INCL_DELIVERY_COSTS: "incl. delivery costs",
        COMMON_PRODUCT_OFFER_PRICE: "Net price",
        COMMON_PRODUCT_DESTINATION: "Place of delivery",
        COMMON_PRODUCT_DELIVERYCOSTS: "Delivery costs",
        COMMON_PRODUCT_SALE_TURNOVER: "Turnover",
        COMMON_PRODUCT_SALE_INVOICE_NUMBER: "Invoice number",
        COMMON_PRODUCT_SALE_INVOICE_NUMBER_SHORT: "Invoice No.",
        COMMON_PRODUCT_SALE_PROFIT: "Profit",
        COMMON_PRODUCT_SALE_COST: "Costs",
        COMMON_PRODUCT_CALCULATION: "Price calculation",
        COMMON_DELIVERY_TIME: "Delivery date",
        COMMON_SALE_RETURN: "Turnover",
        COMMON_SALE_PROFIT: "Profit",
        COMMON_CONVERSIONRATE: "Conversionrate",
        COMMON_NOTE: "Note",
        COMMON_COMMENTS: "Comments",
        COMMON_COMMENTS_LAST: "Last comment",
        COMMON_COMMENTS_ENTER: "Enter comment",
        COMMON_COMMENTS_ADD: "Send comment",
        COMMON_COMMENTS_HISTORY: "History...",
        COMMON_COMMENTS_MODAL_HISTORY: "Comment history",
        COMMON_VALIDATE_TOO_LONG: "Input too long!",
        COMMON_VALIDATE_TOO_BIG: "Input to big",
        COMMON_VALIDATE_MAX_FILE_SIZE: "The image may not exceed 4MB",
        COMMON_VALIDATE_MAX: "Only ",
        COMMON_VALIDATE_MIN: "The field have to be {{number}} characters long",
        COMMON_VALIDATE_MAX_END: " letters are allowed",
        COMMON_VALIDATE_REQ: "Field required ",
        COMMON_VALIDATE_REQ_NUMBER: "Negative numbers are restricted",
        COMMON_VALIDATE_INVALID: "Input invalid!",
        COMMON_VALIDATE_ALPHANUMERIC: "Only alphanumeric characters are allowed. E.g. A-z and 0-9",
        COMMON_VALIDATE_EMAIL: "Enter a valid email",
        COMMON_VALIDATE_NEW_PASSWORD: "New password",
        COMMON_VALIDATE_PASSWORD: "Password have to be 6 characters long",
        COMMON_VALIDATE_PASSWORD_NOT_MATCH: "Password doesn\"t match",
        COMMON_NEW_PASSWORD: "New password",
        COMMON_VALIDATE_INVOICE_NUMBER_ALREADY_EXISTS: "Invoice number already exists",
        COMMON_TOAST_SUCCESS_ADD_LEAD: "A new lead was generated",
        COMMON_TOAST_SUCCESS_INCONTACT: "Lead is set to in contact",
        COMMON_TOAST_SUCCESS_NEW_OFFER: "A new offer was generated",
        COMMON_TOAST_SUCCESS_NEW_SALE: "Congratulation for your sale!",
        COMMON_TOAST_SUCCESS_CLOSE_LEAD: "The lead was locked",
        COMMON_TOAST_SUCCESS_OPEN_LEAD: "The lead was unlocked",
        COMMON_TOAST_SUCCESS_UPDATE_LEAD: "The lead was edited",
        COMMON_TOAST_SUCCESS_DELETE_LEAD: "The lead was deleted",
        COMMON_TOAST_FAILURE_DELETE_LEAD: "The lead cannot be deleted",
        COMMON_TOAST_SUCCESS_ADD_OFFER: "A new offer was generated",
        COMMON_TOAST_SUCCESS_DONE_OFFER: "Offer is set to done",
        COMMON_TOAST_SUCCESS_REVERT_DONE_OFFER: "Offer was reverted",
        COMMON_TOAST_SUCCESS_ADD_SALE: "A new sale was created",
        COMMON_TOAST_SUCCESS_CLOSE_OFFER: "The offer was locked",
        COMMON_TOAST_SUCCESS_OPEN_OFFER: "The offer was unlocked",
        COMMON_TOAST_SUCCESS_UPDATE_OFFER: "The offer was edited",
        COMMON_TOAST_SUCCESS_DELETE_OFFER: "The offer was deleted",
        COMMON_TOAST_FAILURE_DELETE_OFFER: "The offer cannot be deleted",
        COMMON_TOAST_SUCCESS_UPDATE_SALE: "The sale was edited",
        COMMON_TOAST_SUCCESS_DELETE_SALE: "The sale was deleted",
        COMMON_TOAST_FAILURE_DELETE_SALE: "The sale cannot be deleted",
        COMMON_TOAST_SUCCESS_FOLLOW_UP: "Offer is set to follow up",
        COMMON_TOAST_ROLLBACK_OPEN_TO_LEAD: "Succesfull rollback of Offer to Lead",
        COMMON_TOAST_ROLLBACK_OPEN_TO_LEAD_ERROR: "Unsuccesfull rollback of Offer to Lead",
        COMMON_STATUS_OPEN: "Open",
        COMMON_STATUS_LEAD: "Lead",
        COMMON_STATUS_INCONTACT: "In contact",
        COMMON_STATUS_OFFER: "Offer",
        COMMON_STATUS_DONE: "Done",
        COMMON_STATUS_FOLLOW_UP: "Follow up",
        COMMON_STATUS_FOLLOW_UP_NO_SEND: "Follow up",
        COMMON_STATUS_FOLLOW_UP_AND_SEND: "Follow up and send notification",
        COMMON_STATUS_SALE: "Sale",
        COMMON_STATUS_CLOSED: "Closed",
        COMMON_EMPTY_PROCESSOR: "Nobody",
        COMMON_STATUS_SET_DONE: "Mark as done",
        COMMON_STATUS_SET_OPEN: "Mark as open",
        COMMON_SEARCH: "Search...",
        DASHBOARD_MANAGE_LEADS: "Manage leads",
        DASHBOARD_DRAG_INFO: "Drag elements between list",
        DASHBOARD_REFRESH: "Refresh",
        DASHBOARD_OPEN_LEADS: "Open leads",
        DASHBOARD_OPEN_OFFERS: "Open offers",
        DASHBOARD_DONE_OFFERS: "Done offers",
        DASHBOARD_LATEST_SALES: "Today's sales",
        DASHBOARD_INFO_BUTTON: "Info",
        DASHBOARD_GOTO_BUTTON: "Go to",
        DASHBOARD_COMPLETION: "Sales statements",
        NOTIICATION_SEND: "Notification successfully send",
        NOTIICATION_SEND_ERROR: "Error sending Notification. Please check your SMTP settings",
        NOTIFICATION_NO_NOTIFICATIONS: "No sent notifications available",
        NOTIFICATION_SEND_NOTIFICATIONS: "Sent notifications",
        PROFILE_PROFILE_INFORMATION: "Profile information",
        PROFILE_DEFAULT_LANGUAGE: "Default language",
        PROFILE_DEFAULT_VAT: "Default vat",
        PROFILE_PASSWORD_MANAGEMENT: "Password management",
        PROFILE_OLD_PASSWORD: "Old password",
        PROFILE_VALIDATE_OLD_PASSWORD: "Old password is required",
        PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS: "Profil changed",
        PROFILE_TOAST_PROFILE_INFORMATION_ERROR: "Profil cannot be saved",
        PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS: "Password changed",
        PROFILE_TOAST_PASSWORD_CHANGE_ERROR: "Password cannot be saved",
        PROFILE_PICTURE_MANAGEMENT: "Profile picture management",
        PROFILE_SMTP_TAB: "SMTP",
        PROFILE_PASSWORD_TAB: "Password and Picture",
        PROFILE_ACCOUNT_TAB: "Profile information",
        PROCESS_DELETE_PROCESS_TITLE: "Delete process",
        PROCESS_DELETE_PROCESS_BODY: "Are you sure to delete this process?",
        LEAD_LEADS: "Leads",
        LEAD_MANAGE_LEADS: "Manage leads",
        LEAD_ADD_LEAD: "New lead",
        LEAD_ADD_LEAD_MODAL: "Create lead",
        LEAD_EDIT_LEAD_MODAL: "Edit lead",
        LEAD_SHOW_ALL_LEADS: "Total leads",
        LEAD_FOLLOW_UP: "Create offer ",
        LEAD_PIN: "Assign to me",
        LEAD_OPEN_LEAD: "Unlock lead",
        LEAD_CLOSE_LEAD: "Lock lead",
        LEAD_CLOSE_LEAD_REALLY: "Are you sure to close this lead?",
        LEAD_EDIT_LEAD: "Edit lead",
        LEAD_DELETE_LEAD: "Delete lead",
        LEAD_DELETE_LEAD_BODY: "Are you sure to delete this lead?",
        LEAD_EDIT_SELECT_PRODUCT: "Choose product",
        OFFER_OFFERS: "Offers",
        OFFER_OFFER: "Offer",
        OFFER_MANAGE_OFFERS: "Manage offers",
        OFFER_ADD_OFFER: "New offer",
        OFFER_ADD_OFFER_MODAL: "Create offer",
        OFFER_EDIT_OFFER_MODAL: "Edit offer",
        OFFER_SHOW_ALL_OFFERS: "Total offers",
        OFFER_CREATE_SALE: "Make sale",
        OFFER_FOLLOW_UP: "Follow up",
        LEAD_IN_CONTACT: "In contact",
        OFFER_OPEN_OFFER: "Unlock offer",
        OFFER_CLOSE_OFFER: "Lock offer",
        OFFER_CLOSE_OFFER_REALLY: "Are you sure to close this offer?",
        OFFER_EDIT_OFFER: "Edit offer",
        OFFER_DELETE_OFFER: "Delete offer",
        OFFER_DELETE_OFFER_BODY: "Are you sure to delete this offer?",
        OFFER_TAB_OFFERS: "Offer - Offers",
        OFFER_TAB_FILES: "Offer - Files",
        OFFER_TAB_TEMPLATES: "Offer - Templates",
        OFFER_GENERATION_AND_SENDING: "Generate and Send Offer",
        OFFER_ROLLBACK_TITLE: "Reset offer",
        OFFER_ROLLBACK_BODY: "Are you sure to reset this offer?",
        SALE_SALES: "Sales",
        SALE_MANAGE_SALES: "Manage sales",
        SALE_ADD_SALE: "Add sale",
        SALE_EDIT_SALE: "Edit sale",
        SALE_ADD_SALE_MODAL: "Create sale",
        SALE_EDIT_SALE_MODAL: "Edit sale",
        SALE_SHOW_ALL_SALES: "Total sales",
        SALE_DELETE_SALE: "Delete sale",
        SALE_DELETE_SALE_BODY: "Are you sure to delete this sale?",
        SALE_ROLLBACK_TITLE: "Reset sale",
        SALE_ROLLBACK_BODY: "Are you sure to reset this sale?",
        SETTING_USER: "Users",
        SETTING_USER_MANAGEMENT: "User Management",
        SETTING_EMAIL: "Email Templates",
        SETTING_EMAIL_MANAGEMENT: "Email Management",
        SETTING_EMAIL_MANAGEMENT_SENDER: "Sender-Name",
        SETTING_EMAIL_MANAGEMENT_EMAIL: "Email",
        SETTING_EMAIL_MANAGEMENT_SERVER: "Server",
        SETTING_EMAIL_MANAGEMENT_USERNAME: "Username",
        SETTING_EMAIL_MANAGEMENT_PASSWORD: "Password",
        SETTING_EMAIL_MANAGEMENT_ENCRYPTION: "Encryption",
        SETTING_EMAIL_MANAGEMENT_PORT: "Port",
        SETTING_EMAIL_MANAGEMENT_PORT_NO_INPUT: "No input = standardport",
        SETTING_EMAIL_MANAGEMENT_CONNECTION_TEST: "Testing Connection",
        SETTING_EMAIL_TEMPLATES_MANAGEMENT: "Email Templates",
        SETTING_EMAIL_NEW_TEMPLATE: "New template",
        SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST: "Connection to SMTP Server successful.  ",
        SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST_ERROR: "Connection to SMTP Server failed. ",
        SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE: "Successfully saved SMTP Server Connection. ",
        SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE_ERROR: "Error saving SMTP Server Connection. ",
        SETTING_ACCESS_MANAGEMENT: "Manage user",
        SETTING_ACTIVATE_USER: "Activate",
        SETTING_DEACTIVATE_USER: "Deactivate",
        SETTING_ROLE_MANAGEMENT: "Manage user roles",
        SETTING_TOAST_ACCESS_GRANTED: "User is activated",
        SETTING_TOAST_ACCESS_GRANTED_ERROR: "User cannot be activated",
        SETTING_TOAST_ACCESS_REVOKED: "User is deactivated",
        SETTING_TOAST_ACCESS_REVOKED_ERROR: "User cannot be deactivated",
        SETTING_TOAST_SET_ROLE: "Role has changed",
        SETTING_TOAST_SET_ROLE_ERROR: "Role cannot be changed",
        SETTING_EMAIL_TEMPLATE_CREATE: "Create Email Template",
        SETTING_EMAIL_TEMPLATE_DELETE: "Delete Email Template",
        SETTING_EMAIL_TEMPLATE_DELETE_CONFIRMATION_1: "Sure you want to delete Email Template ",
        SETTING_EMAIL_TEMPLATE_DELETE_CONFIRMATION_2: " ",
        SETTING_EMAIL_TEMPLATE_EDIT: "Edit Email Template",
        SETTING_EMAIL_TEMPLATE_TEXT: "Template",
        SETTING_TEMPLATE_NOTIFICATION_TYPE: "Notification types",
        SETTING_TEMPLATE_ALL_TYPES: "All types",
        SETTING_TEMPLATE_NOTIFICATION_TYPE_SELECT: "Select type of notification",
        SETTING_TEMPLATE_SOURCE: "Sources",
        SETTING_TEMPLATE_ALL_SOURCES: "All with source",
        SETTING_TEMPLATE_NO_SOURCES: "All with no source",
        SETTING_TEMPLATE_SOURCE_SELECT: "Select source",
        SETTING_TOAST_EMAIL_TEMPLATE_SAVE: "Email Template successfully created",
        SETTING_TOAST_EMAIL_TEMPLATE_SAVE_ERROR: "Error creating Email Template",
        SETTING_TOAST_EMAIL_TEMPLATE_UPDATE: "Email Template successfully updated",
        SETTING_TOAST_EMAIL_TEMPLATE_UPDATE_ERROR: "Error updating Email Template",
        SETTING_TOAST_EMAIL_TEMPLATE_DELETE: "Email Template successfully deleted",
        SETTING_TOAST_EMAIL_TEMPLATE_DELETE_ERROR: "Error deleting Email Template",
        STATISTIC_PERIOD: "Period",
        STATISTIC_PERIOD_TODAY: "Today",
        STATISTIC_PERIOD_WEEK: "Week",
        STATISTIC_PERIOD_MONTH: "Month",
        STATISTIC_PERIOD_YEAR: "Year",
        STATISTIC_PERIOD_ALL: "All",
        STATISTIC_PERIOD_LAST_30_DAYS: "Last 30 days",
        STATISTIC_SINGLE_STATISTIC: "Single Statistic",
        STATISTIC_GENERAL_STATISTIC: "General Statistic",
        STATISTIC_USER_STATISTIC: "User Statistic",
        STATISTIC_MY_STATISTIC: "My Statistic",
        STATISTIC_PROFIT: "Profit",
        STATISTIC_TURNOVER: "Turnover",
        STATISTIC_SALES: "Sales",
        STATISTIC_SALES_OF_LEADS: "Sales of Leads",
        STATISTIC_SALES_OF_LEADS_Y_AXIS: "Sales in %",
        STATISTIC_SALES_OF_OFFERS: "Sales of Offers",
        STATISTIC_SALES_OF_OFFERS_Y_AXIS: "Sales in %",
        STATISTIC_PROFIT_ON_SALES: "Profit on Sales",
        STATISTIC_PROFIT_PER_SALE: "Profit per Sale",
        STATISTIC_CONVERSIONRATE: "Conversionrate",
        STATISTIC_PARTS: "Parts",
        STATISTIC_PROFIT_AND_RETURN: "Profit and Return",
        STATISTIC_PROFIT_AND_RETURN_Y_AXIS: "Profit/Return in €",
        STATISTIC_LEADS_OFFERS_SALES: "Leads/Offers/Sales",
        STATISTIC_LEADS_OFFERS_SALES_Y_AXIS: "Amount",
        STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE: "Not available",
        STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE_MESSAGE: "The entire statistics only available for week, month, year and all",
        STATISTIC_TOP_SELL: "Top sells",
        STATISTIC_TOP_SALESMAN: "Top salesmen",
        STATISTIC_INVOLVED_IN_PROCESSES: "Involved in processes",
        STATISTIC_WORKED_ON_LEADS: "Worked on leads",
        STATISTIC_WORKED_ON_OFFERS: "Worked on offers",
        STATISTIC_WORKED_ON_SALES: "Worked on sales",
        STATISTIC_COMPLETED_PROCESSES: "Completed Processes",
        STATISTIC_PRODUCT_SALES: "Sold products",
        STATISTIC_EARNING_RATE: "Successrate",
        STATISTIC_EARNING_RATE_PROCESS: "Successrate - process involvement",
        DETAIL_STATISTIC_PRODUCTSTATISTIC: "Productstatistic",
        DETAIL_STATISTIC_USERSTATISTIC: "Userstatistic",
        DETAIL_STATISTIC_REALISED_TURNOVER: "Realised turnover",
        DETAIL_STATISTIC_TURNOVER_PER_LEAD: "Turnover per lead",
        DETAIL_STATISTIC_REALISED_PROFIT: "Realised profit",
        DETAIL_STATISTIC_PROFIT_PER_LEAD: "Profit per lead",
        DETAIL_STATISTIC_GUARANTEED_DISCOUNT: "Guaranteed discount",
        DETAIL_STATISTIC_SALES_PRICE: "Sales price",
        DETAIL_STATISTIC_ADVERTISED_PRICE: "Advertised Price",
        DETAIL_STATISTIC_TOOLTIP: "<span>The product {{productname}} is used <b>{{count}}x</b> in {{workflow}}.</span>",
        DETAIL_STATISTIC_USER_TOOLTIP: "<span>{{username}} worked on <b>{{count}}</b> {{workflow}}.</span>",
        DETAIL_STATISTIC_SUCCESS_INDICATOR: "Success key data",
        PROFIT_PER_LEAD: "Profit per lead",
        PROFIT_PER_OFFER: "Profit per offer",
        TURNOVER_PER_LEAD: "Turnover per lead",
        TURNOVER_PER_OFFER: "Turnover per offer",
        SUNDAY: "Sunday",
        MONDAY: "Monday",
        TUESDAY: "Tuesday",
        WEDNESDAY: "Wednesday",
        THURSDAY: "Thursday",
        FRIDAY: "Friday",
        SATURDAY: "Saturday",
        JANUARY: "January",
        FEBRUARY: "February",
        MARCH: "March",
        APRIL: "April",
        MAY: "May",
        JUNE: "June",
        JULY: "July",
        AUGUST: "August",
        SEPTEMBER: "September",
        OCTOBER: "October",
        NOVEMBER: "November",
        DECEMBER: "December",
        PRODUCT_PRODUCTS: "Products",
        PRODUCT_PRODUCT: "Product",
        PRODUCT_MANAGE_PRODUCTS: "Manage Products",
        PRODUCT_CREATE: "New product",
        PRODUCT_PRODUCTNAME: "Product Name",
        PRODUCT_DESCRIPTION: "Description",
        PRODUCT_PRICE: "Net price",
        PRODUCT_GROSS_PRICE: "Gross price",
        PRODUCT_IMAGE: "Image",
        PRODUCT_EDIT: "Edit Product",
        PRODUCT_DEACTIVATED: "Deactivate",
        PRODUCT_CREATED: "Created",
        PRODUCT_PRODUCT_STATE: "State",
        PRODUCT_PRODUCT_STATE_NEW: "New",
        PRODUCT_PRODUCT_STATE_USED: "Used",
        PRODUCT_DISCOUNT: "Discount",
        PRODUCT_TOAST_SAVE: "Creating product was successful",
        PRODUCT_TOAST_SAVE_ERROR: "Creating product was unsuccessful",
        PRODUCT_TOAST_UPDATE: "Updating product was successful",
        PRODUCT_TOAST_UPDATE_ERROR: "Updating product was unsuccessful",
        PRODUCT_NUMBER: "Product number",
        PRODUCT_ORIGINAL_PRICE: "Original price",
        SOURCE_SOURCES: "Sources",
        SOURCE_SOURCE: "Source",
        SOURCE_MANAGE_SOURCES: "Manage Sources",
        SOURCE_CREATE: "New Source",
        SOURCE_SOURCENAME: "Source Name",
        SOURCE_DESCRIPTION: "Description",
        SOURCE_EDIT: "Edit Source",
        SOURCE_DEACTIVATED: "Deactivate",
        SOURCE_CREATED: "Created",
        SOURCE_TOAST_SAVE: "Creating/Editing Source was successful",
        SOURCE_TOAST_SAVE_ERROR: "Creating/Editing Source was unsuccessful",
        SOURCE_NAME_EXISTS: "Name is already in use",
        CUSTOMER: "Customer",
        CUSTOMER_MANAGE_CUSTOMER: "Manage Customer",
        CUSTOMER_SELECT: "Search Customer",
        CUSTOMER_INCL: "Incl. prospects",
        CUSTOMER_CREATE: "Create Customer",
        CUSTOMER_EDIT: "Edit Customer",
        CUSTOMER_DEACTIVATED: "Deactivate",
        CUSTOMER_CREATED: "Created",
        CUSTOMER_DETAIL_LEAD: "Lead",
        CUSTOMER_DETAIL_OFFER: "Offer",
        CUSTOMER_DETAIL_SALE: "Sale",
        CUSTOMER_DETAIL_TIMELINE: "Customer Timeline",
        CUSTOMER_DETAIL_CREATED: "has been created",
        CUSTOMER_NUMBER: "Customer number",
        CUSTOMER_TOAST_SAVE: "Creating/Editing Customer was successful",
        CUSTOMER_TOAST_ERROR: "Creating/Editing Customer was unsuccessful",
        TODO_TODOS: "Tasks",
        SHOW_MY_TASKS: "Show my tasks",
        TODO_NO_TODOS: "No tasks available",
        CALCULATION_NET: "Net",
        CALCULATION_GROSS: "Gross",
        CALCULATION_VAT: "Value-added tax",
        TOOLTIP_SIGN_UP: "Sign up now under your unique tenant domain section to get full acces<br>s. After Sign up your administrator needs to enable your account.",
        TOOLTIP_TODO: "Via task you can keep all your processes in mind.",
        TOOLTIP_PROFIL_PICTURE: "Select your Profil Picture and press save to keep it. Afterwards it will present you within this Application.",
        TOOLTIP_CUSTOMER_LOOKUP: "From 3 characters the relevant customers will appear.\nYou can search for firstname, lastname, company, e-mail and customernumber.",
        FORMER_PROCESSOR: "Former Processors",
        FORMER_PROCESSOR_NAME: "Processor",
        FORMER_PROCESSOR_ACTIVITY: "Activity",
        FORMER_PROCESSOR_TIMESTAMP: "Date",
        FORMER_PROCESSOR_SELECT_ACTIVITY: "Select activity",
        SUMMERNOTE_WORKFLOW_TEMPLATE_BUTTON: "Mandate values",
        SUMMERNOTE_CUSTOMER_TEMPLATE_BUTTON: "Customer values",
        SUMMERNOTE_ORDER_TEMPLATE_BUTTON: "Order values",
        SUMMERNOTE_USER_TEMPLATE_BUTTON: "User values",
        SUMMERNOTE_ORDER_LIST: "Order list"
    });
    $translateProvider.preferredLanguage(Language[Language.EN]);
    $translateProvider.fallbackLanguage(Language[Language.EN]);
}

angular.module("app").config(config);



var ActionButtonDirectiveId = "actionbuttons";
var ActionButtonDirective = (function () {
    function ActionButtonDirective(WorkflowService, $rootScope) {
        this.WorkflowService = WorkflowService;
        this.$rootScope = $rootScope;
        this.templateUrl = function () { return "components/ActionButtons/view/Workflow.ActionButtons.html"; };
        this.transclude = false;
        this.restrict = "A";
        this.scope = {
            actionbuttonconfig: "=",
            process: "=",
            minwidth: "@"
        };
    }
    ActionButtonDirective.directiveFactory = function () {
        var directive = function (WorkflowService, $rootScope) { return new ActionButtonDirective(WorkflowService, $rootScope); };
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    };
    ActionButtonDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        var _this = this;
        scope.minwidth = isNullOrUndefined(scope.minwidth) ? 210 : scope.minwidth;
        scope.workflowService = this.WorkflowService;
        scope.rootScope = this.$rootScope;
        scope.config = scope.actionbuttonconfig;
        scope.ConfirmationFunctionType = ConfirmationFunctionType;
        scope.openEditModal = function (process) {
            _this.$rootScope.$broadcast(broadcastOpenEditModal, process);
        };
    };
    ;
    return ActionButtonDirective;
}());
angular.module(moduleApp).directive(ActionButtonDirectiveId, ActionButtonDirective.directiveFactory());


angular.module(moduleApp)
    .directive("focusMe", function ($timeout, $parse) {
    return {
        link: function (scope, element, attrs) {
            var model = $parse(attrs["focusMe"]);
            scope.$watch(model, function (value) {
                if (value === true) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
        }
    };
});

angular.module(moduleApp)
    .directive("icheck", ["$timeout", "$parse", function ($timeout, $parse) {
        return {
            require: "ngModel",
            link: function ($scope, element, $attrs, ngModel) {
                return $timeout(function () {
                    var value;
                    var jQueryElement = $(element);
                    value = $attrs["value"];
                    $scope.$watch($attrs["ngModel"], function (newValue) {
                        jQueryElement.iCheck("update");
                    });
                    return jQueryElement.iCheck({
                        checkboxClass: "icheckbox_square-green",
                        radioClass: "iradio_square-green"
                    }).on("ifChanged", function (event) {
                        if ($(element).attr("type") === "checkbox" && $attrs["ngModel"]) {
                            $scope.$apply(function () {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr("type") === "radio" && $attrs["ngModel"]) {
                            return $scope.$apply(function () {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
                });
            }
        };
    }]);

angular.module(moduleApp)
    .directive("img", function () {
    return {
        restrict: "E",
        link: function (scope, element, attrs) {
            element.error(function () {
                var w = element.width();
                var h = element.height();
                if (w <= 20) {
                    w = 100;
                }
                if (h <= 20) {
                    h = 100;
                }
                var url = "assets/img/placeholder_person.png";
                element.prop("src", url);
            });
        }
    };
});

angular.module(moduleApp)
    .directive("imagecrop", function ($rootScope) {
    var directive;
    directive = { restrict: null, scope: null, templateUrl: null, transclude: null, link: null };
    directive.scope = {
        event: "@",
        defaultpicture: "=",
        quality: "@",
        savebutton: "@"
    };
    directive.restrict = "A";
    directive.templateUrl = function (elem, attr) {
        return "components/Common/view/ImageCrop.html";
    };
    directive.transclude = true;
    directive.link = function (scope, element, attrs) {
        $("#errorMessage").hide();
        scope.hideErrorMessage = function () {
            $("#errorMessage").hide();
        };
        scope.buildImageCropper = function () {
            var $image = $(".image-crop > img");
            $image.cropper({
                aspectRatio: 1,
                preview: ".img-preview"
            });
            var $inputImage = $("#inputImage");
            if (window["FileReader"]) {
                $inputImage.change(function () {
                    var fileReader = new FileReader(), files = this.files, file;
                    if (!files.length) {
                        return;
                    }
                    file = files[0];
                    scope.currentFileSize = file.size;
                    if (file.size > 1024 * 1024 * 4) {
                        $("#errorMessage").show();
                        return;
                    }
                    else {
                        $("#errorMessage").hide();
                    }
                    if (/^image\/\w+$/.test(file.type)) {
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function () {
                            $inputImage.val("");
                            $image.cropper("reset", true).cropper("replace", this.result);
                        };
                    }
                });
            }
            else {
                $inputImage.addClass("hide");
            }
        };
        scope.buildImageCropper();
        scope.save = function () {
            var qualityArray = scope.quality.split(",");
            var result = [];
            for (var i = 0; i < qualityArray.length; i++) {
                var quality = Number(qualityArray[i]);
                if (isNullOrUndefined(quality) || isNaN(quality) || quality <= 0 || quality > 100) {
                    $rootScope.$broadcast(scope.event, undefined);
                    return;
                }
                var $image = $(".image-crop > img");
                var canvas = $image.cropper("getCroppedCanvas");
                if (isNullOrUndefined(canvas.toDataURL)) {
                    $rootScope.$broadcast(scope.event, undefined);
                    return;
                }
                var picture = new FileUpload();
                picture.mimeType = "image/jpeg";
                picture.filename = "profilepicture";
                picture.content = canvas.toDataURL("image/jpeg", quality / 100).split(",")[1];
                picture.size = Math.round((picture.content.length) * 3 / 4);
                result.push(picture);
            }
            $rootScope.$broadcast(scope.event, result);
        };
        scope.buildImageCropper();
        scope.$on("saveCroppedImage", function (evt, data) {
            scope.save(data);
        });
    };
    return directive;
});

var ImageLoaderDirectiveId = "httpsrc";
var ImageLoaderDirective = (function () {
    function ImageLoaderDirective($http) {
        this.$http = $http;
        this.templateUrl = undefined;
        this.transclude = false;
        this.restrict = "A";
        this.scope = {};
    }
    ImageLoaderDirective.directiveFactory = function () {
        var directive = function ($http) { return new ImageLoaderDirective($http); };
        directive.$inject = [$httpId];
        return directive;
    };
    ImageLoaderDirective.prototype.link = function (scope, element, attrs) {
        if (isNullOrUndefined(attrs.pictureid) || attrs.pictureid === "") {
            attrs.$set("src", "");
            return;
        }
        var requestConfig = {
            method: "Get",
            url: attrs.httpsrc + attrs.pictureid,
            responseType: "arraybuffer",
            cache: "true"
        };
        attrs.$set("src", "assets/img/placeholder_person.png");
        var self = this;
        this.$http(requestConfig)
            .then(function (data) {
            var arr = new Uint8Array(data.data);
            var raw = "";
            var i, j, subArray, chunk = 5000;
            for (i = 0, j = arr.length; i < j; i += chunk) {
                subArray = arr.subarray(i, i + chunk);
                raw += String.fromCharCode.apply(null, subArray);
            }
            var b64 = btoa(raw);
            attrs.$set("src", "data:image/jpeg;base64," + b64);
        });
    };
    return ImageLoaderDirective;
}());
angular.module(moduleApp).directive(ImageLoaderDirectiveId, ImageLoaderDirective.directiveFactory());


angular.module(moduleApp)
    .directive("pwCheck", function () {
    return {
        require: "ngModel",
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = "#" + attrs.pwCheck;
            elem.add(firstPassword).on("keyup", function () {
                scope.$apply(function () {
                    ctrl.$setValidity("pwmatch", elem.val() === $(firstPassword).val());
                });
            });
        }
    };
});

var ConfirmationModalDirectiveId = "confirmationModal";
var ConfirmationModalDirective = (function () {
    function ConfirmationModalDirective(WorkflowService, $rootScope) {
        this.WorkflowService = WorkflowService;
        this.$rootScope = $rootScope;
        this.templateUrl = function () { return "components/ConfirmationModal/view/Confirmation.Modal.html"; };
        this.transclude = false;
        this.restrict = "E";
        this.scope = {
            modalInstance: "<",
            title: "<",
            body: "<",
            submitText: "<",
            submitFunction: "&",
            submitButtonClass: "@"
        };
    }
    ConfirmationModalDirective.directiveFactory = function () {
        var directive = function (WorkflowService, $rootScope) { return new ConfirmationModalDirective(WorkflowService, $rootScope); };
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    };
    ConfirmationModalDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        var _this = this;
        scope.close = function (process) { return _this.close(process, scope); };
    };
    ;
    ConfirmationModalDirective.prototype.close = function (process, scope) {
        scope.modalInstance.close(process);
    };
    return ConfirmationModalDirective;
}());
angular.module(moduleApp).directive(ConfirmationModalDirectiveId, ConfirmationModalDirective.directiveFactory());


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CustomerControllerId = "CustomerController";
var CustomerController = (function () {
    function CustomerController(CustomerService, $location, $scope) {
        this.$inject = [CustomerServiceId, $locationId, $scopeId];
        this.pageStart = 20;
        this.loadAllCustomers = false;
        this.getLocalTimestamp = function (customer) {
            return toLocalDate(customer.timestamp);
        };
        this.customerService = CustomerService;
        this.location = $location;
        this.searchCustomer("noSearchText");
        var self = this;
        $scope.$watch("customerCtrl.searchText", function (searchText) {
            if (!isNullOrUndefined(searchText) && searchText.length !== 0) {
                self.searchCustomer(searchText);
            }
            else if (!isNullOrUndefined(searchText) && searchText.length === 0) {
                self.searchCustomer("noSearchText");
            }
        });
    }
    CustomerController.prototype.clearCustomer = function () {
        this.createCustomerForm.$setPristine();
        this.currentCustomer = new Customer();
        this.isCurrentCustomerNew = true;
    };
    CustomerController.prototype.editCustomer = function (customer) {
        this.currentEditCustomer = customer;
        this.currentCustomer = new Customer();
        shallowCopy(this.currentEditCustomer, this.currentCustomer);
        this.isCurrentCustomerNew = false;
    };
    CustomerController.prototype.searchCustomer = function (searchText) {
        if (isNullOrUndefined(searchText) || searchText.length === 0) {
            searchText = "noSearchText";
        }
        this.pageStart = 1;
        this.customerService.pagingCustomers = new Array();
        this.customerService.getAllCustomerByPage(this.pageStart, 20, searchText, this.loadAllCustomers);
        this.pageStart += 20;
    };
    CustomerController.prototype.loadNextCustomers = function () {
        var searchText = this.searchText;
        if (isNullOrUndefined(searchText) || searchText.length === 0) {
            searchText = "noSearchText";
        }
        this.customerService.getAllCustomerByPage(this.pageStart, 20, searchText, this.loadAllCustomers);
        this.pageStart += 20;
    };
    CustomerController.prototype.saveCustomer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isCurrentCustomerNew) {
                            shallowCopy(this.currentCustomer, this.currentEditCustomer);
                        }
                        return [4 , this.customerService.saveCustomer(this.currentCustomer, this.isCurrentCustomerNew)];
                    case 1:
                        _a.sent();
                        if (!isNullOrUndefined(this.searchText) && this.searchText.length > 0) {
                            this.searchText = "";
                        }
                        else {
                            this.searchCustomer("noSearchText");
                        }
                        return [2 ];
                }
            });
        });
    };
    CustomerController.prototype.goToCustomerDetail = function (customerId) {
        this.location.path("customer/detail/" + customerId);
    };
    return CustomerController;
}());
angular.module(moduleCustomer, [ngResourceId]).controller(CustomerControllerId, CustomerController);


var CustomerDetailControllerId = "CustomerDetailController";
var CustomerDetailController = (function () {
    function CustomerDetailController(CustomerService, $routeParams, CustomerResource, LeadResource, OfferResource, SaleResource, $q, WorkflowService, $sce) {
        this.$inject = [CustomerServiceId, $routeParamsId, CustomerResourceId, LeadResourceId, OfferResourceId, SaleResourceId, $qId, WorkflowServiceId, $sceId];
        this.customerFound = false;
        this.customerService = CustomerService;
        this.workflowService = WorkflowService;
        this.customerResource = CustomerResource.resource;
        this.leadResource = LeadResource.resource;
        this.offerResource = OfferResource.resource;
        this.saleResource = SaleResource.resource;
        this.routeParams = $routeParams;
        this.currentCustomerId = this.routeParams.customerId;
        this.getCustomerById();
        var self = this;
        this.q = $q;
        this.sce = $sce;
        this.getWorkflowByCustomerId().then(function (result) { self.workflows = self.orderByTimestamp(result); });
    }
    CustomerDetailController.prototype.getAsHtml = function (html) {
        return this.sce.trustAsHtml(html);
    };
    CustomerDetailController.prototype.getCustomerById = function () {
        var self = this;
        this.customerResource.getCustomerById({ id: this.currentCustomerId }).$promise.then(function (result) {
            self.currentCustomer = result;
            if (!isNullOrUndefined(self.currentCustomer.id)) {
                self.customerFound = true;
            }
        });
    };
    CustomerDetailController.prototype.getWorkflowByCustomerId = function () {
        var deferred = this.q.defer();
        var self = this;
        var leads = new Array();
        var offers = new Array();
        var sales = new Array();
        var leadPromiseReady = false;
        var offerPromiseReady = false;
        var salePromiseReady = false;
        this.leadResource.getByCustomerId({ id: this.currentCustomerId }).$promise.then(function (result) {
            leads = result;
            leadPromiseReady = true;
            if (leadPromiseReady && offerPromiseReady && salePromiseReady) {
                deferred.resolve(self.getWorkflow(leads, offers, sales));
            }
        });
        this.offerResource.getByCustomerId({ id: this.currentCustomerId }).$promise.then(function (result) {
            offers = result;
            offerPromiseReady = true;
            if (leadPromiseReady && offerPromiseReady && salePromiseReady) {
                deferred.resolve(self.getWorkflow(leads, offers, sales));
            }
        });
        this.saleResource.getByCustomerId({ id: this.currentCustomerId }).$promise.then(function (result) {
            sales = result;
            salePromiseReady = true;
            if (leadPromiseReady && offerPromiseReady && salePromiseReady) {
                deferred.resolve(self.getWorkflow(leads, offers, sales));
            }
        });
        return deferred.promise;
    };
    CustomerDetailController.prototype.getWorkflow = function (leads, offers, sales) {
        for (var i = 0; i < leads.length; i++) {
            var temp_1 = leads[i];
            temp_1.type = "lead";
            temp_1.showChildRow = false;
        }
        for (var i = 0; i < offers.length; i++) {
            var temp_2 = offers[i];
            temp_2.type = "offer";
            temp_2.showChildRow = false;
        }
        for (var i = 0; i < sales.length; i++) {
            var temp_3 = sales[i];
            temp_3.type = "sale";
            temp_3.showChildRow = false;
        }
        var temp = new Array();
        temp = leads.concat(offers.concat(sales));
        return temp.sort(function (a, b) { return a.timestamp - b.timestamp; });
    };
    CustomerDetailController.prototype.toLocalDate = function (timestamp) {
        return toLocalDate(timestamp);
    };
    CustomerDetailController.prototype.sumOrderPositions = function (array) {
        return this.workflowService.sumOrderPositions(array);
    };
    CustomerDetailController.prototype.orderByTimestamp = function (workflows) {
        return workflows.sort(function (a, b) {
            var tempA = moment(a.timestamp, "DD.MM.YYYY HH:mm:ss");
            var tempB = moment(b.timestamp, "DD.MM.YYYY HH:mm:ss");
            if (tempA < tempB) {
                return -1;
            }
            else if (tempA > tempB) {
                return 1;
            }
            else {
                return 0;
            }
        });
    };
    return CustomerDetailController;
}());
angular.module(moduleCustomerDetail, [ngResourceId]).controller(CustomerDetailControllerId, CustomerDetailController);

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DashboardManagmentCardDirectiveId = "dashboardmanagamentcard";
var DashboardManagmentCardDirective = (function () {
    function DashboardManagmentCardDirective(WorkflowService, $rootScope) {
        this.WorkflowService = WorkflowService;
        this.$rootScope = $rootScope;
        this.templateUrl = function () { return "components/Dashboard/view/DashboardManagmentCard.html"; };
        this.transclude = false;
        this.restrict = "E";
        this.scope = {
            process: "=",
            workflowunittype: "@",
            disabled: "@"
        };
    }
    DashboardManagmentCardDirective.directiveFactory = function () {
        var directive = function (WorkflowService, $rootScope) { return new DashboardManagmentCardDirective(WorkflowService, $rootScope); };
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    };
    DashboardManagmentCardDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        var _this = this;
        if (isNullOrUndefined(scope.process)) {
            return;
        }
        scope.editWorkflowUnit = scope.process[scope.workflowunittype];
        scope.toLocalDate = this.toLocalDate;
        scope.workflowService = this.WorkflowService;
        scope.onInfoClick = function (editWorkflowUnit, workflowunittype, process) { return scope.$parent.$parent.$parent.dashboardCtrl.saveDataToModal(editWorkflowUnit, workflowunittype, process); };
        scope.openQuickEmailModal = function (process) { return _this.openQuickEmailModal(process, scope); };
        scope.pin = function (process) { return _this.WorkflowService.togglePin(process, _this.$rootScope.user); };
        scope.goToLink = "#/" + scope.workflowunittype + "s/" + scope.process.id;
        if (scope.editWorkflowUnit) {
            scope.text = scope.text = scope.editWorkflowUnit.customer.company ? scope.editWorkflowUnit.customer.company : scope.editWorkflowUnit.customer.firstname + " " + scope.editWorkflowUnit.customer.lastname;
        }
    };
    ;
    DashboardManagmentCardDirective.prototype.openQuickEmailModal = function (process, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 , scope.workflowService.openQuickEmailModal(process)];
                    case 1:
                        resultProcess = _a.sent();
                        if (!isNullOrUndefined(resultProcess)) {
                            scope.process = resultProcess;
                        }
                        return [2 ];
                }
            });
        });
    };
    DashboardManagmentCardDirective.prototype.toLocalDate = function (timestamp) {
        if (timestamp === undefined) {
            timestamp = newTimestamp();
        }
        return toLocalDate(timestamp, "DD.MM.YYYY HH:mm");
    };
    return DashboardManagmentCardDirective;
}());
angular.module(moduleApp).directive(DashboardManagmentCardDirectiveId, DashboardManagmentCardDirective.directiveFactory());


angular.module(moduleApp)
    .directive("sparklinechart", function () {
    return {
        restrict: "E",
        scope: {
            data: "@"
        },
        compile: function (tElement, tAttrs, transclude) {
            var numberArray = tAttrs["data"];
            tElement.replaceWith("<span>" + numberArray + "</span>");
            return function (scope, element, attrs) {
                var color = attrs["color"];
                attrs.$observe("data", function (newValue) {
                    var inputData = newValue.toString();
                    inputData = inputData.slice(0, -1);
                    inputData = inputData.slice(1);
                    element.html(inputData);
                    element.sparkline("html", {
                        type: "line", width: "96%", height: "80px", barWidth: 11, barColor: color, lineColor: color,
                        fillColor: "white"
                    });
                });
            };
        }
    };
});


angular.module(moduleApp)
    .directive("sparkpiechart", function () {
    return {
        restrict: "E",
        scope: {
            data: "@"
        },
        compile: function (tElement, tAttrs, transclude) {
            tElement.replaceWith("<span>" + tAttrs["data"] + "</span>");
            return function (scope, element, attrs) {
                var color = attrs["color"];
                attrs.$observe("data", function (newValue) {
                    element.html(newValue);
                    element.sparkline("html", {
                        type: "pie", width: "96%", height: "80px", sliceColors: ["#1ab394", "#F5F5F5"]
                    });
                });
            };
        }
    };
});

var ToDoTableRowDirectiveId = "todoitem";
var ToDoTableRowDirective = (function () {
    function ToDoTableRowDirective(WorkflowService, $rootScope) {
        this.WorkflowService = WorkflowService;
        this.$rootScope = $rootScope;
        this.templateUrl = function () { return "components/Dashboard/view/ToDoTableRow.Directive.html"; };
        this.transclude = false;
        this.restrict = "A";
        this.scope = {
            process: "="
        };
    }
    ToDoTableRowDirective.directiveFactory = function () {
        var directive = function (WorkflowService, $rootScope) { return new ToDoTableRowDirective(WorkflowService, $rootScope); };
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    };
    ToDoTableRowDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        scope.statusTranslation = this.getStatusTranslationKeyByProcess(scope.process);
        scope.badgeClass = this.getStatusBadgeClassByProcess(scope.process);
        scope.editWorkflowUnit = (scope.process.status === Status.OPEN || scope.process.status === Status.INCONTACT ? scope.process.lead : scope.process.offer);
        scope.toLocalDate = function (timestamp) { return toLocalDate(timestamp, "DD.MM.YYYY HH:mm"); };
        scope.text = scope.editWorkflowUnit.customer.company ? scope.editWorkflowUnit.customer.company : scope.editWorkflowUnit.customer.firstname + " " + scope.editWorkflowUnit.customer.lastname;
        scope.price = scope.process.status === Status.OPEN || scope.process.status === Status.INCONTACT ? this.sumOrderPositions(scope.editWorkflowUnit.orderPositions) : scope.editWorkflowUnit.netPrice;
        scope.goToLink = scope.process.status === Status.OPEN || scope.process.status === Status.INCONTACT ? "#/leads/" + scope.process.id : "#/offers/" + scope.process.id;
    };
    ;
    ToDoTableRowDirective.prototype.getStatusTranslationKeyByProcess = function (process) {
        switch (process.status) {
            case Status.OPEN: return "LEAD";
            case Status.OFFER: return "COMMON_STATUS_OFFER";
            case Status.FOLLOWUP: return "COMMON_STATUS_FOLLOW_UP";
            case Status.INCONTACT: return "COMMON_STATUS_INCONTACT";
            case Status.DONE: return "COMMON_STATUS_DONE";
        }
    };
    ToDoTableRowDirective.prototype.getStatusBadgeClassByProcess = function (process) {
        switch (process.status) {
            case Status.OPEN: return "label label-danger";
            case Status.OFFER: return "label label-warning";
            case Status.FOLLOWUP: return "label label-warning";
            case Status.INCONTACT: return "label label-danger";
            case Status.DONE: return "label label-success";
        }
    };
    ToDoTableRowDirective.prototype.sumOrderPositions = function (array) {
        return this.WorkflowService.sumOrderPositions(array);
    };
    return ToDoTableRowDirective;
}());
angular.module(moduleApp).directive(ToDoTableRowDirectiveId, ToDoTableRowDirective.directiveFactory());


var SubdomainServiceId = "SubdomainService";
var SubdomainService = (function () {
    function SubdomainService($location) {
        this.$inject = [$locationId];
        this.location = $location;
    }
    SubdomainService.prototype.getSubdomain = function () {
        var host = this.location.host();
        if (host.indexOf(".") < 0) {
            return null;
        }
        else {
            return host.split(".")[0];
        }
    };
    return SubdomainService;
}());
angular.module(moduleSubdomainService, [ngResourceId]).service(SubdomainServiceId, SubdomainService);


var LoginServiceId = "LoginService";
var LoginService = (function () {
    function LoginService($location, $window, AuthService, toaster, $rootScope, $translate, SubdomainService) {
        this.$inject = [$locationId, $windowId, AuthServiceId, toasterId, $rootScopeId, $translateId, SubdomainServiceId];
        this.location = $location;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.window = $window;
        this.authService = AuthService;
        this.subdomainService = SubdomainService;
    }
    LoginService.prototype.login = function (credentials) {
        var self = this;
        credentials.email = credentials.email.toLowerCase();
        self.authService.login(credentials).then(function (data) {
            if (self.location.host() === credentials.tenant) {
                self.location.path("/dashboard");
            }
            else {
                var domain = "https://" + credentials.tenant;
                if (Number(self.location.port()) === 8080) {
                    domain += ":" + self.location.port();
                }
                domain += "/#/login";
                self.window.open(domain, "_self");
            }
            self.rootScope.setUserDefaultLanguage();
            self.rootScope.loadLabels();
        }, function (error) {
            self.toaster.pop("error", "", self.translate.instant("LOGIN_ERROR"));
        });
    };
    return LoginService;
}());
angular.module(moduleLoginService, [ngResourceId]).service(LoginServiceId, LoginService);


var LoginControllerId = "LoginController";
var LoginController = (function () {
    function LoginController(LoginService, $location) {
        this.$inject = [LoginServiceId, $locationId];
        this.loginService = LoginService;
        this.location = $location;
        this.credentials = new Credentials();
    }
    LoginController.prototype.login = function () {
        this.credentials.tenant = this.location.host();
        this.loginService.login(this.credentials);
    };
    return LoginController;
}());
angular.module(moduleLogin, [ngResourceId]).controller(LoginControllerId, LoginController);

var ProcessorHistoryDirectiveId = "processorhistory";
var ProcessorHistoryDirective = (function () {
    function ProcessorHistoryDirective(WorkflowService, $rootScope) {
        this.WorkflowService = WorkflowService;
        this.$rootScope = $rootScope;
        this.templateUrl = function () { return "components/Process/view/ProcessorHistory.html"; };
        this.transclude = false;
        this.restrict = "A";
        this.scope = {
            form: "=",
            process: "="
        };
    }
    ProcessorHistoryDirective.directiveFactory = function () {
        var directive = function (WorkflowService, $rootScope) { return new ProcessorHistoryDirective(WorkflowService, $rootScope); };
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    };
    ProcessorHistoryDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        var _this = this;
        scope.workflowService = this.WorkflowService;
        scope.currentSelectedActivity = "-1";
        scope.currentSelectedFomerProcessorId = this.$rootScope.user.id + "";
        scope.currentSelectedFomerProcessor = this.$rootScope.user;
        scope.addFormerProcessor = this.addFormerProcessor;
        scope.setUserById = function (id) {
            scope.currentSelectedFomerProcessor = _this.getUserById(id);
        };
        scope.deletFormerProcessor = function (currentFormerProcessors, index) { return currentFormerProcessors.splice(index, 1); };
        scope.checkForDups = function (formerProcessors, user, activity) { return scope.existsDups = _this.checkForDups(formerProcessors, user, activity); };
        scope.toLocalDate = this.toLocalDate;
    };
    ;
    ProcessorHistoryDirective.prototype.addFormerProcessor = function (currentFormerProcessors, user, activity) {
        if (isNullOrUndefined(currentFormerProcessors)) {
            currentFormerProcessors = [];
        }
        currentFormerProcessors.push(new Processor(user, activity));
    };
    ProcessorHistoryDirective.prototype.getUserById = function (userId) {
        return this.WorkflowService.users.filter(function (user) { return user.id === Number(userId); })[0];
    };
    ProcessorHistoryDirective.prototype.checkForDups = function (formerProcessors, user, activity) {
        if (isNullOrUndefined(formerProcessors)) {
            return false;
        }
        return formerProcessors.filter(function (fp) { return fp.user.id === user.id && fp.activity === activity; }).length > 0;
    };
    ProcessorHistoryDirective.prototype.toLocalDate = function (timestamp) {
        if (timestamp === undefined) {
            timestamp = newTimestamp();
        }
        return toLocalDate(timestamp);
    };
    return ProcessorHistoryDirective;
}());
angular.module(moduleApp).directive(ProcessorHistoryDirectiveId, ProcessorHistoryDirective.directiveFactory());

var ProductControllerId = "ProductController";
var ProductController = (function () {
    function ProductController(ProductService, $rootScope, $translate, toaster, $scope) {
        this.$inject = [ProductServiceId, $rootScopeId, $translateId, toasterId, $scopeId];
        this.showImageCropper = true;
        this.productAmountLimit = 20;
        this.getLocalTimestamp = function (product) {
            return toLocalDate(product.timestamp);
        };
        this.productService = ProductService;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.toaster = toaster;
        var self = this;
        var productImageSaved = $rootScope.$on("productImageSaved", function (evt, data) {
            self.currentProduct.picture = isNullOrUndefined(data) ? self.currentProduct.picture : data[0];
            self.saveProduct();
        });
        $scope.$on("$destroy", function handler() {
            productImageSaved();
        });
    }
    ProductController.prototype.refreshData = function () {
        this.productService.getAllProducts();
    };
    ProductController.prototype.clearProduct = function () {
        this.showImageCropper = false;
        this.createProductForm.$setPristine();
        this.currentProduct = new Product();
        this.isCurrentProductNew = true;
        this.showImageCropper = true;
    };
    ProductController.prototype.editProduct = function (product) {
        this.currentEditProduct = product;
        this.currentProduct = new Product();
        shallowCopy(this.currentEditProduct, this.currentProduct);
        this.isCurrentProductNew = false;
        this.showImageCropper = true;
    };
    ProductController.prototype.savePicture = function () {
        this.rootScope.$broadcast("saveCroppedImage");
    };
    ProductController.prototype.saveProduct = function () {
        if (!this.isCurrentProductNew) {
            shallowCopy(this.currentProduct, this.currentEditProduct);
        }
        this.productService.saveProduct(this.currentProduct, this.isCurrentProductNew);
        this.showImageCropper = false;
    };
    ProductController.prototype.getTheFiles = function ($files) {
        this.productService.getTheFiles($files);
    };
    ProductController.prototype.arrayBufferToBase64 = function (buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    return ProductController;
}());
angular.module(moduleProduct, [ngResourceId]).controller(ProductControllerId, ProductController);


var Smtp = (function () {
    function Smtp() {
    }
    return Smtp;
}());


var SmtpServiceId = "SmtpService";
var SmtpService = (function () {
    function SmtpService(toaster, $translate, $rootScope, SmtpResource, UserResource, $q) {
        this.$inject = [toasterId, $translateId, $rootScopeId, SmtpResourceId, UserResourceId, $qId];
        this.currentPasswordLength = 10;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.q = $q;
        this.smtpResource = SmtpResource.resource;
        this.userResource = UserResource.resource;
        this.getSMtp();
    }
    SmtpService.prototype.test = function () {
        var self = this;
        var defer = this.q.defer();
        this.save().then(function () {
            self.smtpResource.testSmtp({ id: self.currentSmtp.id, smtpKey: self.rootScope.user.smtpKey }).$promise.then(function () {
                defer.resolve(null);
                self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST"));
            }, function (error) {
                self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST_ERROR"));
                defer.reject(error);
            });
        });
        return defer.promise;
    };
    SmtpService.prototype.getSMtp = function () {
        var self = this;
        this.smtpResource.getByUserId({ id: this.rootScope.user.id }).$promise.then(function (data) {
            self.currentSmtp = data;
            self.currentSmtp.stringPassword = "";
            for (var i = 0; i < self.currentPasswordLength; i++) {
                self.currentSmtp.stringPassword += "x";
            }
        }, function (error) { return handleError(error); });
    };
    SmtpService.prototype.save = function () {
        this.currentPasswordLength = this.currentSmtp.stringPassword !== null ? this.currentSmtp.stringPassword.length : this.currentPasswordLength;
        if (this.currentSmtp.stringPassword.replace(/x/g, "") === "") {
            this.currentSmtp.stringPassword = null;
        }
        var defer = this.q.defer();
        this.currentSmtp.user = this.rootScope.user;
        this.currentSmtp.password = this.currentSmtp.stringPassword !== null ? btoa(this.currentSmtp.stringPassword) : null;
        var self = this;
        this.smtpResource.createSmtp({ smtpKey: self.rootScope.user.smtpKey }, this.currentSmtp).$promise.then(function (data) {
            self.currentSmtp = data;
            self.currentSmtp.stringPassword = "";
            for (var i = 0; i < self.currentPasswordLength; i++) {
                self.currentSmtp.stringPassword += "x";
            }
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE"));
            defer.resolve(self.currentSmtp);
        }, function (error) {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE_ERROR"));
            defer.reject(error);
        });
        return defer.promise;
    };
    return SmtpService;
}());
angular.module(moduleSmtpService, [ngResourceId]).service(SmtpServiceId, SmtpService);

var SmtpEncryptionType;
(function (SmtpEncryptionType) {
    SmtpEncryptionType[SmtpEncryptionType["SSL"] = "SSL"] = "SSL";
    SmtpEncryptionType[SmtpEncryptionType["TLS"] = "TLS"] = "TLS";
    SmtpEncryptionType[SmtpEncryptionType["STARTTLS"] = "STARTTLS"] = "STARTTLS";
    SmtpEncryptionType[SmtpEncryptionType["PLAIN"] = "PLAIN"] = "PLAIN";
    SmtpEncryptionType[SmtpEncryptionType["getAll"] = function () {
        return Object.keys(SmtpEncryptionType).filter(function (f) { return f !== "getAll"; }).map(function (k) { return SmtpEncryptionType[k]; }).filter(function (f) { return f !== "getAll"; });
    }] = "getAll";
})(SmtpEncryptionType || (SmtpEncryptionType = {}));

var ProfileControllerId = "ProfileController";
var ProfileController = (function () {
    function ProfileController(ProfileService, $rootScope, $scope, SmtpService) {
        this.SmtpService = SmtpService;
        this.$inject = [ProfileServiceId, $rootScopeId, $scopeId];
        this.myImage = "";
        this.myCroppedImage = "";
        this.currentTab = 1;
        this.SmtpEncryptionType = SmtpEncryptionType;
        this.profileService = ProfileService;
        this.rootscope = $rootScope;
        this.currentUser = deepCopy(this.rootscope.user);
        this.getById();
        var self = this;
        var profileImageSaved = $rootScope.$on("profileImageSaved", function (evt, data) {
            if (!isNullOrUndefined(data)) {
                var user = deepCopy(self.rootscope.user);
                user.picture = data[0];
                user.thumbnail = data[1];
                self.updateProfileImage(user);
            }
        });
        $scope.$on("$destroy", function handler() {
            profileImageSaved();
        });
    }
    ProfileController.prototype.saveProfileImage = function () {
        this.rootscope.$broadcast("saveCroppedImage");
    };
    ProfileController.prototype.updateProfilInfo = function () {
        var _this = this;
        this.profileService.updateProfilInfo(this.currentUser).then(function (result) { return _this.currentUser = result; }, function (error) { _this.reduceCurrentUserInfo(); });
    };
    ProfileController.prototype.reduceCurrentUserInfo = function () {
        this.currentUser.email = this.rootscope.user.email;
        this.currentUser.firstname = this.rootscope.user.firstname;
        this.currentUser.lastname = this.rootscope.user.lastname;
        this.currentUser.phone = this.rootscope.user.phone;
        this.currentUser.language = this.rootscope.user.language;
        this.currentUser.skype = this.rootscope.user.skype;
        this.currentUser.job = this.rootscope.user.job;
        this.currentUser.fax = this.rootscope.user.fax;
        this.currentUser.defaultVat = this.rootscope.user.defaultVat;
    };
    ProfileController.prototype.updateProfileImage = function (user) {
        this.profileService.updateProfileImage(user);
    };
    ProfileController.prototype.updatePassword = function () {
        var _this = this;
        this.profileService.updatePassword(this.oldPassword, this.newPassword1, this.newPassword2).then(function (result) {
            _this.passwordForm.$setPristine();
            _this.clearPasswordForm();
        }, function (error) {
            handleError(error);
        });
    };
    ProfileController.prototype.clearPasswordForm = function () {
        this.oldPassword = "";
        this.newPassword1 = "";
        this.newPassword2 = "";
    };
    ProfileController.prototype.uploadFiles = function () {
        this.profileService.uploadFiles();
    };
    ProfileController.prototype.getById = function () {
        var _this = this;
        this.profileService.getById().then(function (result) { return _this.currentUser = result; }, function (error) { return handleError(error); });
    };
    ProfileController.prototype.getTheFiles = function ($files) {
        this.profileService.getTheFiles($files);
    };
    ProfileController.prototype.saveSmtpConnection = function () {
        this.SmtpService.save();
    };
    return ProfileController;
}());
angular.module(moduleProfile, [ngResourceId]).controller(ProfileControllerId, ProfileController);


var Setting = (function () {
    function Setting() {
    }
    return Setting;
}());


var SettingServiceId = "SettingService";
var SettingService = (function () {
    function SettingService($filter, toaster, $translate, $rootScope, SettingResource, SmtpResource, UserResource, FileResource, TemplateService) {
        this.$inject = [$filterId, toasterId, $translateId, $rootScopeId, SettingResourceId, SmtpResourceId, UserResourceId, FileResourceId, TemplateServiceId];
        this.roleSelection = Array();
        this.filter = $filter;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.settingsResource = SettingResource.resource;
        this.smtpResource = SmtpResource.resource;
        this.userResource = UserResource.resource;
        this.fileResource = FileResource.resource;
        this.loadUsers();
        this.templateService = TemplateService;
        this.templateService.getAll();
    }
    SettingService.prototype.loadUsers = function () {
        var self = this;
        this.settingsResource.getAll().$promise.then(function (result) {
            self.users = result;
        });
    };
    SettingService.prototype.activateUser = function (user) {
        var self = this;
        this.settingsResource.activate({ id: user.id }, true).$promise.then(function () {
            self.filter("filter")(self.users, { id: user.id })[0].enabled = true;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_ACCESS_GRANTED"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_ACCESS_GRANTED_ERROR"));
        });
    };
    SettingService.prototype.deactivateUser = function (user) {
        var self = this;
        this.settingsResource.activate({ id: user.id }, false).$promise.then(function () {
            self.filter("filter")(self.users, { id: user.id })[0].enabled = false;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_ACCESS_REVOKED"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_ACCESS_REVOKED_ERROR"));
        });
    };
    SettingService.prototype.changeRole = function (user) {
        var self = this;
        this.settingsResource.changeRole({ id: user.id, role: user.role }).$promise.then(function (data) {
            user = data;
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_SET_ROLE"));
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_SET_ROLE_ERROR"));
        });
    };
    SettingService.prototype.hasRight = function (user) {
        if (user.id === this.rootScope.user.id
            || (user.role === this.rootScope.user.role)
            || this.rootScope.user.role === Role.USER
            || user.role === Role.SUPERADMIN) {
            return true;
        }
        else {
            return false;
        }
    };
    return SettingService;
}());
angular.module(moduleSettingService, [ngResourceId]).service(SettingServiceId, SettingService);


var SettingControllerId = "SettingController";
var SettingController = (function () {
    function SettingController(SettingService, SmtpService, TemplateService, $rootScope) {
        this.$inject = [SettingServiceId, SmtpServiceId, TemplateServiceId, $rootScopeId];
        this.currentTab = 1;
        this.roleSelection = Array();
        this.smtp = new Smtp();
        this.template = new Template();
        this.settingService = SettingService;
        this.templateService = TemplateService;
        this.smtpService = SmtpService;
        this.rootScope = $rootScope;
        this.currentUser = this.rootScope.user;
        this.settingService.loadUsers();
    }
    SettingController.prototype.tabOnClick = function (tab) {
        this.currentTab = tab;
    };
    SettingController.prototype.activateUser = function (user) {
        this.settingService.activateUser(user);
    };
    SettingController.prototype.deactivateUser = function (user) {
        this.settingService.deactivateUser(user);
    };
    SettingController.prototype.hasRight = function (user) {
        return this.settingService.hasRight(user);
    };
    SettingController.prototype.changeRole = function (user) {
        this.settingService.changeRole(user);
    };
    SettingController.prototype.openEmailTemplateModal = function () {
        this.templateService.openEmailTemplateModal(new Template());
    };
    SettingController.prototype.openEditEmailTemplateModal = function (template) {
        this.templateService.openEmailTemplateModal(template);
    };
    SettingController.prototype.openEmailTemplateDeleteModal = function (template) {
        this.templateService.openEmailTemplateDeleteModal(template);
    };
    SettingController.prototype.testSmtpConnection = function () {
        this.smtpService.test();
    };
    return SettingController;
}());
angular.module(moduleSetting, [ngResourceId]).controller(SettingControllerId, SettingController);


var SourceControllerId = "SourceController";
var SourceController = (function () {
    function SourceController(SourceService, $rootScope, $translate, toaster, $scope) {
        this.$inject = [SourceServiceId, $rootScopeId, $translateId, toasterId, $scopeId];
        this.sourceAmountLimit = 20;
        this.sourceService = SourceService;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.toaster = toaster;
    }
    SourceController.prototype.refreshData = function () {
        this.sourceService.getAllSources();
    };
    SourceController.prototype.clearSource = function () {
        this.createSourceForm.$setPristine();
        this.currentSource = new Source();
        this.isCurrentSourceNew = true;
        this.nameExists = false;
    };
    SourceController.prototype.editSource = function (source) {
        this.createSourceForm.$setPristine();
        this.currentEditSource = source;
        this.currentSource = new Source();
        this.isCurrentSourceNew = false;
        this.nameExists = false;
        shallowCopy(this.currentEditSource, this.currentSource);
    };
    SourceController.prototype.checkSourceName = function () {
        if (this.isCurrentSourceNew === false
            && !isNullOrUndefined(this.currentSource.name)
            && !isNullOrUndefined(this.currentEditSource.name)
            && this.currentSource.name.toLowerCase() === this.currentEditSource.name.toLowerCase()) {
            this.nameExists = false;
            return;
        }
        this.nameExists = this.sourceService.checkSourceName(this.currentSource);
    };
    SourceController.prototype.saveSource = function () {
        if (!this.isCurrentSourceNew) {
            shallowCopy(this.currentSource, this.currentEditSource);
        }
        this.sourceService.saveSource(this.currentSource);
    };
    return SourceController;
}());
angular.module(moduleSource, [ngResourceId]).controller(SourceControllerId, SourceController);


var Signup = (function () {
    function Signup() {
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.password = "";
        this.password2 = "";
    }
    return Signup;
}());


var SignupServiceId = "SignupService";
var SignupService = (function () {
    function SignupService($location, toaster, $translate, $q, SignupResource) {
        this.$inject = [$locationId, toasterId, $translateId, $qId, SignupResourceId];
        this.location = $location;
        this.toaster = toaster;
        this.translate = $translate;
        this.q = $q;
        this.signupResource = SignupResource.resource;
        this.usernameExist = false;
        this.emailExist = false;
    }
    SignupService.prototype.uniqueEmail = function (user) {
        var self = this;
        user.email = user.email.toLowerCase();
        this.signupResource.uniqueEmail(user).$promise.then(function (data, headersGetter, status) {
            self.emailExist = data.validation;
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    };
    SignupService.prototype.signup = function (user) {
        var defer = this.q.defer();
        var self = this;
        user.email = user.email.toLowerCase();
        var salt = user.email;
        user.password = hashPasswordPbkdf2(user.password, salt);
        user.password2 = hashPasswordPbkdf2(user.password2, salt);
        this.signupResource.signup(user).$promise.then(function (createdUser) {
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            defer.resolve(createdUser);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
            defer.reject(null);
        });
        return defer.promise;
    };
    SignupService.prototype.init = function (apiPassword, tenantKey) {
        this.signupResource.init(hashPasswordPbkdf2(apiPassword, "api@" + tenantKey));
    };
    return SignupService;
}());
angular.module(moduleSignupService, [ngResourceId]).service(SignupServiceId, SignupService);


var SignupControllerId = "SignupController";
var SignupController = (function () {
    function SignupController(SignupService) {
        this.$inject = [SignupServiceId];
        this.signupService = SignupService;
        this.user = new Signup();
    }
    SignupController.prototype.uniqueEmail = function () {
        this.signupService.uniqueEmail(this.user);
    };
    SignupController.prototype.signup = function () {
        this.signupService.signup(this.user);
    };
    return SignupController;
}());
angular.module(moduleSignup, [ngResourceId]).controller(SignupControllerId, SignupController);

angular.module(moduleApp)
    .directive("fooRepeatDone", function () {
    return function ($scope, element) {
        if ($scope.$last) {
            $(".table").trigger("footable_redraw");
        }
    };
});

var ProductDetailControllerId = "ProductDetailController";
var ProductDetailController = (function () {
    function ProductDetailController(ProductService, $routeParams, ProductResource, StatisticService, SourceService, $scope, $translate) {
        this.$inject = [ProductServiceId, $routeParamsId, ProductResourceId, StatisticServiceId, SourceServiceId, $scopeId, $translateId];
        this.productFound = false;
        this.productService = ProductService;
        this.statisticService = StatisticService;
        this.sourceService = SourceService;
        this.productResource = ProductResource.resource;
        this.dateRange = "ALL";
        this.source = "ALL";
        this.routeParams = $routeParams;
        this.currentProductId = this.routeParams.productId;
        this.translate = $translate;
        this.getProductById();
    }
    ProductDetailController.prototype.getProductById = function () {
        var self = this;
        this.productResource.getProductById({ id: this.currentProductId }).$promise.then(function (result) {
            self.currentProduct = result;
            if (!isNullOrUndefined(self.currentProduct.id)) {
                self.productStatisticColumnChart = new PieChart(self.translate, "SPCLOS", self.currentProduct.name, self.translate.instant("DETAIL_STATISTIC_TOOLTIP", { productname: "{series.name}", count: "{point.y}", workflow: "{point.name}" }) + "<br>" + self.translate.instant("STATISTIC_PARTS") + ": <b>{point.percentage:.1f}%</b>");
                self.productFound = true;
            }
        });
    };
    return ProductDetailController;
}());
angular.module(moduleProductDetail, [ngResourceId]).controller(ProductDetailControllerId, ProductDetailController);

angular.module(moduleApp)
    .directive("product", [$translateId, StatisticServiceId, function ($translate, StatisticService) {
        var directive;
        directive = { restrict: null, scope: null, templateUrl: null, transclude: null, link: null };
        directive.restrict = "A";
        directive.scope = {
            chart: "=",
            daterange: "=",
            source: "=",
            productobj: "="
        };
        directive.templateUrl = function (elem, attr) {
            return "components/Statistic/view/ProductStatistic.Directive.html";
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
            scope.productLeads;
            scope.productOffers;
            scope.productSales;
            var productLeadPromise = false;
            var productOfferPromise = false;
            var productSalePromise = false;
            var emptyProduct = {
                "count": 0,
                "turnover": 0,
                "discount": 0,
                "product": {
                    "netPrice": 0
                }
            };
            loadData(scope.daterange, scope.source);
            scope.$watch("daterange", function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.chart.clearData();
                    loadData(newValue, scope.source);
                }
            }, true);
            scope.$watch("source", function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.chart.clearData();
                    loadData(scope.daterange, newValue);
                }
            }, true);
            function loadData(dateRange, source) {
                productLeadPromise = false;
                productOfferPromise = false;
                productSalePromise = false;
                StatisticService.getProductStatisticById(WorkflowType[WorkflowType.LEAD], dateRange, source, scope.productobj.id).then(function (resultLeads) {
                    scope.productLeads = resultLeads;
                    if (isNullOrUndefined(resultLeads.product)) {
                        scope.productLeads = emptyProduct;
                    }
                    productLeadPromise = true;
                    checkPromise();
                });
                StatisticService.getProductStatisticById(WorkflowType[WorkflowType.OFFER], dateRange, source, scope.productobj.id).then(function (resultOffers) {
                    scope.productOffers = resultOffers;
                    if (isNullOrUndefined(resultOffers.product)) {
                        scope.productOffers = emptyProduct;
                    }
                    productOfferPromise = true;
                    checkPromise();
                });
                StatisticService.getProductStatisticById(WorkflowType[WorkflowType.SALE], dateRange, source, scope.productobj.id).then(function (resultSales) {
                    scope.productSales = resultSales;
                    if (isNullOrUndefined(resultSales.product)) {
                        scope.productSales = emptyProduct;
                    }
                    productSalePromise = true;
                    checkPromise();
                });
            }
            function checkPromise() {
                if (productLeadPromise && productOfferPromise && productSalePromise) {
                    scope.chart.pushData($translate.instant("LEAD_LEADS"), [scope.productLeads.count], "#ed5565");
                    scope.chart.pushData($translate.instant("OFFER_OFFERS"), [scope.productOffers.count], "#f8ac59");
                    scope.chart.pushData($translate.instant("SALE_SALES"), [scope.productSales.count], "#1a7bb9", true, true);
                }
            }
        };
        return directive;
    }]);


angular.module(moduleApp)
    .directive("userstatistic", [$translateId, StatisticServiceId, function ($translate, StatisticService) {
        var directive;
        directive = { restrict: null, scope: null, templateUrl: null, transclude: null, link: null };
        directive.restrict = "A";
        directive.scope = {
            chart: "=",
            daterange: "=",
            source: "=",
            userobj: "="
        };
        directive.templateUrl = function (elem, attr) {
            return "components/Statistic/view/UserStatistic.Directive.html";
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
            scope.userStatistic;
            scope.chart.clearData();
            loadData(scope.daterange, scope.source);
            scope.$watch("daterange", function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.chart.clearData();
                    loadData(newValue, scope.source);
                }
            }, true);
            scope.$watch("source", function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.chart.clearData();
                    loadData(scope.daterange, newValue);
                }
            }, true);
            function loadData(dateRange, source) {
                StatisticService.getUserStatisticById(dateRange, source, scope.userobj.id).then(function (resultUserStatistic) {
                    scope.userStatistic = resultUserStatistic;
                    scope.chart.pushData($translate.instant("LEAD_LEADS"), [scope.userStatistic.countLead], "#ed5565");
                    scope.chart.pushData($translate.instant("OFFER_OFFERS"), [scope.userStatistic.countOffer], "#f8ac59");
                    scope.chart.pushData($translate.instant("SALE_SALES"), [scope.userStatistic.countSale], "#1a7bb9", true, true);
                });
            }
            scope.calculateRate = function calculateRate(firstAmount, secondAmount) {
                return StatisticService.getRatePercentage(firstAmount, secondAmount);
            };
            scope.getNameOfUser = getNameOfUser;
        };
        return directive;
    }]);


var StatisticControllerId = "StatisticController";
var StatisticController = (function () {
    function StatisticController(StatisticService, SourceService, $routeParams, $rootScope) {
        this.$inject = [StatisticServiceId, SourceServiceId, $routeParamsId, $rootScopeId];
        this.currentTab = 1;
        this.dateRange = "MONTHLY";
        this.source = "ALL";
        this.statisticService = StatisticService;
        this.sourceService = SourceService;
        var paramTab = $routeParams.tab;
        this.currentUser = $rootScope.user;
        if (!isNullOrUndefined(paramTab)) {
            this.currentTab = Number(paramTab);
        }
        this.onStatisticChange(this.dateRange, this.source);
        this.statisticService.generateMyStatistic(this.currentUser);
    }
    StatisticController.prototype.tabOnClick = function (tab) {
        this.currentTab = tab;
    };
    StatisticController.prototype.getChartModelById = function (id) {
        return this.statisticService.getChartModelById(id);
    };
    StatisticController.prototype.onStatisticChange = function (dateRange, source) {
        this.statisticService.setPromises(false);
        this.statisticService.clearAllModelsData();
        this.dateRange = dateRange;
        this.statisticService.setTimeSegmentByDateRange(dateRange);
        this.statisticService.loadAllResourcesByDateRange(dateRange, source);
    };
    StatisticController.prototype.getProductStatistic = function () {
        return this.statisticService.getProductStatistic();
    };
    StatisticController.prototype.getUserStatistic = function () {
        return this.statisticService.getUserStatistic();
    };
    StatisticController.prototype.getUserString = function (user) {
        return getNameOfUser(user);
    };
    StatisticController.prototype.getRatePercentage = function (firstAmount, secondAmount) {
        return this.statisticService.getRatePercentage(firstAmount, secondAmount);
    };
    StatisticController.prototype.getProfitTotal = function () {
        return this.statisticService.getProfitTotal();
    };
    StatisticController.prototype.getTurnoverTotal = function () {
        return this.statisticService.getTurnoverTotal();
    };
    StatisticController.prototype.getEfficiency = function () {
        return this.statisticService.getEfficiency();
    };
    StatisticController.prototype.getLeadConversionRate = function () {
        return this.statisticService.getLeadConversionRate();
    };
    StatisticController.prototype.getOfferConversionRate = function () {
        return this.statisticService.getOfferConversionRate();
    };
    StatisticController.prototype.getProfitPerSale = function () {
        return this.statisticService.getProfitPerSale();
    };
    StatisticController.prototype.getLeadAmount = function () {
        return this.statisticService.getLeadAmount();
    };
    StatisticController.prototype.getOfferAmount = function () {
        return this.statisticService.getOfferAmount();
    };
    StatisticController.prototype.getSaleAmount = function () {
        return this.statisticService.getSaleAmount();
    };
    return StatisticController;
}());
angular.module(moduleStatistic, [ngResourceId]).controller(StatisticControllerId, StatisticController);


var UserDetailControllerId = "UserDetailController";
var UserDetailController = (function () {
    function UserDetailController($routeParams, UserResource, StatisticService, SourceService, $scope, $translate) {
        this.$inject = [$routeParamsId, UserResourceId, StatisticServiceId, SourceServiceId, $scopeId, $translateId];
        this.userFound = false;
        this.statisticService = StatisticService;
        this.sourceService = SourceService;
        this.userResource = UserResource.resource;
        this.dateRange = "ALL";
        this.source = "ALL";
        this.routeParams = $routeParams;
        this.currentUserId = this.routeParams.userId;
        this.translate = $translate;
        this.getUserById();
    }
    UserDetailController.prototype.getUserById = function () {
        var self = this;
        this.userResource.getById({ id: this.currentUserId }).$promise.then(function (result) {
            self.currentUser = result;
            if (!isNullOrUndefined(self.currentUser.id)) {
                self.userStatisticColumnChart = new PieChart(self.translate, "SPCLOS", getNameOfUser(self.currentUser), self.translate.instant("DETAIL_STATISTIC_USER_TOOLTIP", { username: "{series.name}", count: "{point.y}", workflow: "{point.name}" }) + "<br>" + self.translate.instant("STATISTIC_PARTS") + ": <b>{point.percentage:.1f}%</b>");
                self.userFound = true;
            }
        });
    };
    UserDetailController.prototype.getNameOfUser = function (user) {
        return getNameOfUser(user);
    };
    return UserDetailController;
}());
angular.module(moduleUserDetail, [ngResourceId]).controller(UserDetailControllerId, UserDetailController);

var WorkflowTemplateObject = (function () {
    function WorkflowTemplateObject() {
        this.id = 0;
        var p = new Product();
        p.description = "test";
        p.id = 0;
        p.name = "test";
        p.netPrice = 0;
        p.productNumber = "test";
        p.productState = ProductState.NEW;
        p.timestamp = "01.01.1900 00:00:00:000";
        p.deactivated = false;
        p.description = "test";
        var op = new OrderPosition();
        op.id = 0;
        op.amount = 0;
        op.discount = 0;
        op.netPrice = 0;
        op.product = p;
        this.orderPositions = [op];
        var c = new Customer();
        c.id = 0;
        c.address = "test";
        c.company = "test";
        c.customerNumber = "test";
        c.deactivated = false;
        c.email = "test@test.de";
        c.firstname = "test";
        c.lastname = "test";
        c.phone = "test";
        c.realCustomer = true;
        c.timestamp = "01.01.1900 00:00:00:000";
        c.title = "MR";
        this.customer = c;
        this.timestamp = "01.01.1900  00:00:00:000";
        this.vendor = null;
        this.deliveryAddress = "test";
        this.deliveryDate = "01.01.1900";
        this.saleProfit = 0;
        this.saleCost = 0;
        this.deliveryCosts = 0;
        this.invoiceNumber = "test";
        this.message = "test";
        this.netPrice = 0;
        this.vat = 0;
    }
    return WorkflowTemplateObject;
}());

var License = (function () {
    function License() {
    }
    return License;
}());

var Tenant = (function () {
    function Tenant() {
        this.license = new License();
    }
    return Tenant;
}());


var TenantServiceId = "TenantService";
var TenantService = (function () {
    function TenantService($location, toaster, $translate, TenantResource, $q) {
        this.$inject = [$locationId, toasterId, $translateId, TenantResourceId, $qId];
        this.location = $location;
        this.toaster = toaster;
        this.translate = $translate;
        this.tenantResource = TenantResource.resource;
        this.q = $q;
    }
    TenantService.prototype.save = function (tenant) {
        var defer = this.q.defer();
        var self = this;
        this.tenantResource.save(tenant).$promise.then(function (tenant) {
            self.toaster.pop("success", "", self.translate.instant("SIGNUP_SUCCESS"));
            defer.resolve(tenant);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
            defer.reject(null);
        });
        return defer.promise;
    };
    return TenantService;
}());
angular.module(moduleTenantService, [ngResourceId]).service(TenantServiceId, TenantService);

var CustomerEditDirectiveId = "customerEdit";
var CustomerEditDirective = (function () {
    function CustomerEditDirective(WorkflowService, SourceService, CustomerService, SummernoteService, $rootScope, $sce) {
        this.WorkflowService = WorkflowService;
        this.SourceService = SourceService;
        this.CustomerService = CustomerService;
        this.SummernoteService = SummernoteService;
        this.$rootScope = $rootScope;
        this.$sce = $sce;
        this.templateUrl = function (ele, attr) {
            if (attr.small === "true") {
                return "components/Wizard/view/Edit.Customer.Small.html";
            }
            else {
                return "components/Wizard/view/Edit.Customer.html";
            }
        };
        this.transclude = false;
        this.restrict = "E";
        this.scope = {
            form: "=",
            editWorkflowUnit: "=",
            editProcess: "=",
            editable: "<",
            small: "<"
        };
    }
    CustomerEditDirective.directiveFactory = function () {
        var directive = function (WorkflowService, SourceService, CustomerService, SummernoteService, $rootScope, $sce) { return new CustomerEditDirective(WorkflowService, SourceService, CustomerService, SummernoteService, $rootScope, $sce); };
        directive.$inject = [WorkflowServiceId, SourceServiceId, CustomerServiceId, SummernoteServiceId, $rootScopeId, $sceId];
        return directive;
    };
    CustomerEditDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        var _this = this;
        scope.workflowService = this.WorkflowService;
        scope.customerService = this.CustomerService;
        scope.sourceService = this.SourceService;
        scope.rootScope = this.$rootScope;
        scope.sce = this.$sce;
        scope.summernoteOptions = this.SummernoteService.getDefaultOptions();
        if (!isNullOrUndefined(scope.form)) {
            scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.cform) : scope.cform = scope.form;
        }
        scope.customerSelected = !isNullOrUndefined(scope.editWorkflowUnit.customer.id);
        scope.selectedCustomer = scope.customerSelected ? scope.editWorkflowUnit.customer : null;
        scope.selectCustomer = function (customer) { return _this.selectCustomer(customer, scope); };
        scope.getNewOrSelectedCustomer = function (customer) { return _this.getNewOrSelectedCustomer(customer, scope); };
        scope.getAsHtml = function (html) { return _this.getAsHtml(html, scope); };
    };
    ;
    CustomerEditDirective.prototype.selectCustomer = function (customer, scope) {
        if (isNullOrUndefined(customer)) {
            scope.selectedCustomer = null;
        }
        scope.editWorkflowUnit.customer = scope.getNewOrSelectedCustomer(customer);
        scope.customerSelected = !isNullOrUndefined(scope.editWorkflowUnit.customer.id);
    };
    CustomerEditDirective.prototype.getNewOrSelectedCustomer = function (customer, scope) {
        if (isNullOrUndefined(customer) || isNullOrUndefined(Number(customer.id))) {
            return new Customer();
        }
        var temp = findElementById(scope.customerService.searchCustomers, Number(customer.id));
        if (isNullOrUndefined(temp) || isNullOrUndefined(Number(temp.id))) {
            return new Customer();
        }
        return deepCopy(temp);
    };
    CustomerEditDirective.prototype.getAsHtml = function (html, scope) {
        return scope.sce.trustAsHtml(html);
    };
    return CustomerEditDirective;
}());
angular.module(moduleApp).directive(CustomerEditDirectiveId, CustomerEditDirective.directiveFactory());

var CustomerProductEditDirectiveId = "customerProductEdit";
var CustomerProductEditDirective = (function () {
    function CustomerProductEditDirective() {
        this.templateUrl = function (ele, attr) {
            return "components/Wizard/view/Edit.Customer.Product.html";
        };
        this.transclude = false;
        this.restrict = "E";
        this.scope = {
            form: "=",
            editWorkflowUnit: "=",
            editProcess: "=",
            editable: "<"
        };
    }
    CustomerProductEditDirective.directiveFactory = function () {
        var directive = function () { return new CustomerProductEditDirective(); };
        directive.$inject = [];
        return directive;
    };
    CustomerProductEditDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        if (!isNullOrUndefined(scope.form)) {
            scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.cpform) : scope.cpform = scope.form;
        }
    };
    ;
    return CustomerProductEditDirective;
}());
angular.module(moduleApp).directive(CustomerProductEditDirectiveId, CustomerProductEditDirective.directiveFactory());

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var EditEmailDirectiveId = "emailEdit";
var EditEmailDirective = (function () {
    function EditEmailDirective(WorkflowService, $rootScope, TemplateService, SummernoteService, $sce, $http, $window, $translate, toaster) {
        this.WorkflowService = WorkflowService;
        this.$rootScope = $rootScope;
        this.TemplateService = TemplateService;
        this.SummernoteService = SummernoteService;
        this.$sce = $sce;
        this.$http = $http;
        this.$window = $window;
        this.$translate = $translate;
        this.toaster = toaster;
        this.templateUrl = function () { return "components/Wizard/view/Edit.Email.html"; };
        this.transclude = false;
        this.restrict = "E";
        this.scope = {
            form: "=",
            process: "=",
            disabled: "<",
            notification: "="
        };
    }
    EditEmailDirective.directiveFactory = function () {
        var directive = function (WorkflowService, $rootScope, TemplateService, SummernoteService, $sce, $http, $window, $translate, toaster) {
            return new EditEmailDirective(WorkflowService, $rootScope, TemplateService, SummernoteService, $sce, $http, $window, $translate, toaster);
        };
        directive.$inject = [WorkflowServiceId, $rootScopeId, TemplateServiceId, SummernoteServiceId, $sceId, $httpId, $windowId, $translateId, toasterId];
        return directive;
    };
    EditEmailDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        scope.$sce = this.$sce;
                        scope.$window = this.$window;
                        scope.$http = this.$http;
                        scope.htmlString = "";
                        scope.onNotificationSelected = function () { return _this.onNotificationSelected(scope); };
                        scope.openAttachment = function (fileUpload) { return _this.openAttachment(fileUpload, scope); };
                        scope.showCC_BCC = scope.disabled;
                        scope.currentTemplate = null;
                        if (!isNullOrUndefined(scope.form)) {
                            scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.eform) : scope.eform = scope.form;
                        }
                        if (scope.disabled) {
                            return [2 ];
                        }
                        scope.sizeInvalid = false;
                        scope.TemplateService = this.TemplateService;
                        scope.summernoteOptions = this.SummernoteService.getDefaultOptions();
                        scope.workflow = scope.process.offer == null ? scope.process.lead : scope.process.offer;
                        scope.workflow = scope.process.sale != null ? scope.process.sale : scope.workflow;
                        scope.notification.recipient = scope.workflow.customer.email;
                        scope.generate = function (template, workflow, currentNotification) { return _this.generateContent(template, workflow, currentNotification, scope); };
                        scope.setAttachments = function (files) { return _this.setAttachments(files, scope.notification, scope); };
                        scope.deleteAttachment = function (index) { return _this.deleteAttachment(index, scope); };
                        _a = scope;
                        return [4 , this.TemplateService.getAll()];
                    case 1:
                        _a.templates = _b.sent();
                        this.setDefaultTemplate(scope);
                        return [2 ];
                }
            });
        });
    };
    ;
    EditEmailDirective.prototype.setAttachments = function (files, notification, scope) {
        if (isNullOrUndefined(notification.attachments)) {
            notification.attachments = [];
        }
        var self = this;
        var _loop_1 = function (file) {
            var attachment = new Attachment();
            var fileUpload = new FileUpload();
            var fileReader = new FileReader();
            fileUpload.filename = file.name;
            fileUpload.mimeType = file.type;
            fileUpload.size = file.size;
            fileReader.readAsDataURL(file);
            fileReader.onload = function () {
                fileUpload.content = this.result.split(",")[1];
                attachment.fileUpload = fileUpload;
                notification.attachments.push(attachment);
                self.isFileSizeInvalid(notification, scope);
                scope.$apply();
            };
            fileReader.onerror = function (error) {
                handleError(error);
            };
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            _loop_1(file);
        }
    };
    EditEmailDirective.prototype.isFileSizeInvalid = function (notification, scope) {
        if (isNullOrUndefined(notification.attachments)) {
            return;
        }
        scope.fileSize = notification.attachments.map(function (a) { return a.fileUpload.size; }).reduce(function (a, b) { return a + b; }, 0);
    };
    EditEmailDirective.prototype.openAttachment = function (fileUpload, scope) {
        if (!isNullOrUndefined(fileUpload.content)) {
            var file = b64toBlob(fileUpload.content, fileUpload.mimeType);
            var fileURL = URL.createObjectURL(file);
            window.open(scope.$sce.trustAsResourceUrl(fileURL), "_blank");
            return;
        }
        scope.$http.get("/api/rest/files/content/" + fileUpload.id, { method: "GET", responseType: "arraybuffer" }).
            success(function (data, status, headers, config, statusText) {
            var contentType = headers("content-type");
            var file = new Blob([data], { type: contentType });
            var fileURL = URL.createObjectURL(file);
            window.open(scope.$sce.trustAsResourceUrl(fileURL), "_blank");
        });
    };
    EditEmailDirective.prototype.generateContent = function (template, workflow, currentNotification, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var id, notification, error_1, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (template == null) {
                            return [2 ];
                        }
                        id = isNumeric(template) ? template : template.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 , scope.TemplateService.generate(id, workflow, currentNotification)];
                    case 2:
                        notification = _a.sent();
                        notification.subject = !isNumeric(template) ? template.subject : currentNotification.subject;
                        scope.notification.content = notification.content;
                        scope.notification.subject = notification.subject;
                        return [3 , 4];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.data != null && error_1.data.exception !== "dash.templatemanagement.business.TemplateCompilationException") {
                            return [2 , this.toaster.pop("error", "", this.$translate.instant("EMAIL_TEMPLATE_ERROR"))];
                        }
                        errorMessage = error_1 == null || error_1.data == null ? "" : ": " + error_1.data.message;
                        if (error_1 != null && error_1.data != null && error_1.data.message != null && error_1.data.message.substring(0, 6) !== "Syntax") {
                            this.toaster.pop("error", "", this.$translate.instant("EMAIL_TEMPLATE_ERROR") + errorMessage);
                            return [2 ];
                        }
                        errorMessage = error_1 == null || error_1.data == null ? "" : ": " + error_1.data.message.substring(36);
                        this.toaster.pop("error", "", this.$translate.instant("EMAIL_TEMPLATE_ERROR") + errorMessage);
                        return [3 , 4];
                    case 4: return [2 ];
                }
            });
        });
    };
    ;
    EditEmailDirective.prototype.reloadHtmlString = function (scope) {
        if (isNullOrUndefined(scope.notification)) {
            return;
        }
        scope.htmlString = scope.$sce.trustAsHtml(scope.notification.content);
    };
    EditEmailDirective.prototype.deleteAttachment = function (index, scope) {
        scope.notification.attachments.splice(index, 1);
        scope.sizeInvalid = this.isFileSizeInvalid(scope.notification, scope);
    };
    EditEmailDirective.prototype.onNotificationSelected = function (scope) {
        if (isNullOrUndefined(scope.notification)) {
            scope.notification = new Notification();
        }
        this.reloadHtmlString(scope);
        scope.sizeInvalid = this.isFileSizeInvalid(scope.notification, scope);
    };
    EditEmailDirective.prototype.setDefaultTemplate = function (scope) {
        var notificationType = scope.notification.notificationType;
        var sourceName = scope.process.source == null ? "NONE" : scope.process.source.name;
        var templates = scope.templates;
        for (var _i = 0, templates_1 = templates; _i < templates_1.length; _i++) {
            var t = templates_1[_i];
            var containsNotificationType = t.notificationTypeString == null ? false : contains(t.notificationTypeString.split(","), notificationType);
            var containsSourceName = t.sourceString == null ? false : contains(t.sourceString.split(","), sourceName);
            if (containsNotificationType === true && containsSourceName === true) {
                this.setTemplate(scope, t);
                return;
            }
        }
        for (var _a = 0, _b = templates.filter(function (t) { return t.notificationTypeString != null && contains(t.notificationTypeString.split(","), "ALL"); }); _a < _b.length; _a++) {
            var t = _b[_a];
            if (contains(t.sourceString.split(","), sourceName)) {
                this.setTemplate(scope, t);
                return;
            }
        }
        for (var _c = 0, _d = templates.filter(function (t) { return t.sourceString != null && contains(t.sourceString.split(","), "ALL"); }); _c < _d.length; _c++) {
            var t = _d[_c];
            if (contains(t.notificationTypeString.split(","), notificationType)) {
                this.setTemplate(scope, t);
                return;
            }
        }
    };
    EditEmailDirective.prototype.setTemplate = function (scope, t) {
        scope.currentTemplate = t;
        scope.notification.subject = t.subject;
        scope.generate(t, scope.workflow, scope.notification);
    };
    return EditEmailDirective;
}());
angular.module(moduleApp).directive(EditEmailDirectiveId, EditEmailDirective.directiveFactory());

var ProductEditDirectiveId = "productEdit";
var ProductEditDirective = (function () {
    function ProductEditDirective(WorkflowService, ProductService, $rootScope) {
        this.WorkflowService = WorkflowService;
        this.ProductService = ProductService;
        this.$rootScope = $rootScope;
        this.templateUrl = function () { return "components/Wizard/view/Edit.Product.html"; };
        this.transclude = false;
        this.restrict = "E";
        this.scope = {
            form: "=",
            editWorkflowUnit: "=",
            editProcess: "=",
            editable: "<"
        };
    }
    ProductEditDirective.directiveFactory = function () {
        var directive = function (WorkflowService, ProductService, $rootScope) { return new ProductEditDirective(WorkflowService, ProductService, $rootScope); };
        directive.$inject = [WorkflowServiceId, ProductServiceId, $rootScopeId];
        return directive;
    };
    ProductEditDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        var _this = this;
        scope.workflowService = this.WorkflowService;
        scope.productService = this.ProductService;
        scope.rootScope = this.$rootScope;
        if (!isNullOrUndefined(scope.form)) {
            scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.pform) : scope.pform = scope.form;
        }
        scope.currentProductId = "-1";
        scope.currentProductAmount = 1;
        scope.addProduct = function (array, currentProductId, currentProductAmount) { return _this.addProduct(array, currentProductId, currentProductAmount, scope); };
        scope.deleteProduct = function (array, index) { return _this.deleteProduct(array, index, scope); };
        scope.sumOrderPositions = function (array) { return _this.sumOrderPositions(array, scope); };
        scope.reCalculateOffer = function (offer, array) { return _this.reCalculateOffer(offer, array, scope); };
        scope.setPrice = function (orderPosition) { return _this.setPrice(orderPosition, scope); };
        scope.setDiscount = function (orderPosition) { return _this.setDiscount(orderPosition, scope); };
        scope.isLead = function () { return _this.isLead(scope); };
        scope.isOffer = function () { return _this.isOffer(scope); };
        scope.isSale = function () { return _this.isSale(scope); };
        scope.isInOfferTransformation = function () { return _this.isInOfferTransformation(scope); };
        scope.isInSaleTransformation = function () { return _this.isInSaleTransformation(scope); };
        this.initDatepicker(scope);
    };
    ;
    ProductEditDirective.prototype.addProduct = function (array, currentProductId, currentProductAmount, scope) {
        if (isNullOrUndefined(array)) {
            array = [];
        }
        if (!isNaN(Number(currentProductId))
            && Number(currentProductId) > 0) {
            var tempProduct = findElementById(scope.productService.products, Number(currentProductId));
            var tempOrderPosition = new OrderPosition();
            tempOrderPosition.product = tempProduct;
            tempOrderPosition.amount = currentProductAmount;
            tempOrderPosition.discount = 0;
            tempOrderPosition.netPrice = tempOrderPosition.product.netPrice;
            array.push(tempOrderPosition);
        }
    };
    ProductEditDirective.prototype.deleteProduct = function (array, index, scope) {
        array.splice(index, 1);
    };
    ProductEditDirective.prototype.reCalculateOffer = function (offer, array, scope) {
        if (!isNullOrUndefined(offer)) {
            offer.netPrice = Math.round((offer.deliveryCosts + scope.workflowService.sumOrderPositions(array)) * 100) / 100;
        }
    };
    ProductEditDirective.prototype.setPrice = function (orderPosition, scope) {
        orderPosition.netPrice = scope.workflowService.calculatePrice(orderPosition.product.netPrice, orderPosition.discount);
    };
    ProductEditDirective.prototype.setDiscount = function (orderPosition, scope) {
        orderPosition.discount = scope.workflowService.calculateDiscount(orderPosition.product.netPrice, orderPosition.netPrice);
    };
    ProductEditDirective.prototype.sumOrderPositions = function (array, scope) {
        return scope.workflowService.sumOrderPositions(array);
    };
    ProductEditDirective.prototype.isLead = function (scope) {
        return scope.workflowService.isLead(scope.editProcess);
    };
    ProductEditDirective.prototype.isOffer = function (scope) {
        return scope.workflowService.isOffer(scope.editProcess);
    };
    ProductEditDirective.prototype.isSale = function (scope) {
        return scope.workflowService.isSale(scope.editProcess);
    };
    ProductEditDirective.prototype.isInOfferTransformation = function (scope) {
        return scope.isLead() && !isNullOrUndefined(scope.editProcess.offer);
    };
    ProductEditDirective.prototype.isInSaleTransformation = function (scope) {
        return scope.isOffer() && !isNullOrUndefined(scope.editProcess.sale);
    };
    ProductEditDirective.prototype.initDatepicker = function (scope) {
        if (scope.editable) {
            var jqElement = $("#editOfferDatepicker .input-group.date");
            jqElement.datepicker({
                todayBtn: "linked ",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true
            });
        }
    };
    return ProductEditDirective;
}());
angular.module(moduleApp).directive(ProductEditDirectiveId, ProductEditDirective.directiveFactory());

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SaleEditDirectiveId = "saleEdit";
var SaleEditDirective = (function () {
    function SaleEditDirective(WorkflowService, $rootScope) {
        this.WorkflowService = WorkflowService;
        this.$rootScope = $rootScope;
        this.templateUrl = function () { return "components/Wizard/view/Edit.Sale.html"; };
        this.transclude = false;
        this.restrict = "E";
        this.scope = {
            form: "=",
            editWorkflowUnit: "=",
            editProcess: "=",
            editable: "<"
        };
    }
    SaleEditDirective.directiveFactory = function () {
        var directive = function (WorkflowService, $rootScope) { return new SaleEditDirective(WorkflowService, $rootScope); };
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    };
    SaleEditDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        var _this = this;
        scope.workflowService = this.WorkflowService;
        scope.rootScope = this.$rootScope;
        if (!isNullOrUndefined(scope.form)) {
            scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.sform) : scope.sform = scope.form;
        }
        scope.invoiceNumberAlreadyExists = false;
        scope.existsInvoiceNumber = function () { return _this.existsInvoiceNumber(scope); };
        scope.calculateProfit = function () { return _this.calculateProfit(scope); };
    };
    ;
    SaleEditDirective.prototype.existsInvoiceNumber = function (scope) {
        return __awaiter(this, void 0, void 0, function () {
            var sales;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!isNullOrUndefined(scope.editWorkflowUnit.invoiceNumber) && scope.editWorkflowUnit.invoiceNumber.length > 0))
                            return [3 , 2];
                        return [4 , scope.workflowService.getSaleByInvoiceNumber(scope.editWorkflowUnit.invoiceNumber)];
                    case 1:
                        sales = _a.sent();
                        scope.invoiceNumberAlreadyExists = !isNullOrUndefined(sales) && sales.length > 0;
                        return [3 , 3];
                    case 2:
                        scope.invoiceNumberAlreadyExists = false;
                        _a.label = 3;
                    case 3: return [2 ];
                }
            });
        });
    };
    SaleEditDirective.prototype.calculateProfit = function (scope) {
        if (!isNullOrUndefined(scope.editWorkflowUnit.saleTurnover) && !isNullOrUndefined(scope.editWorkflowUnit.saleCost)) {
            scope.editWorkflowUnit.saleProfit = scope.editWorkflowUnit.saleTurnover - scope.editWorkflowUnit.saleCost;
        }
    };
    return SaleEditDirective;
}());
angular.module(moduleApp).directive(SaleEditDirectiveId, SaleEditDirective.directiveFactory());

var MultipleEmailsValidatorDirectiveId = "multipleemails";
var MultipleEmailsValidatorDirective = (function () {
    function MultipleEmailsValidatorDirective() {
        this.templateUrl = undefined;
        this.transclude = false;
        this.scope = {
            name: "@",
            form: "=",
            emails: "=",
            required: "@"
        };
    }
    MultipleEmailsValidatorDirective.directiveFactory = function () {
        var directive = function () { return new MultipleEmailsValidatorDirective(); };
        directive.$inject = [];
        return directive;
    };
    MultipleEmailsValidatorDirective.prototype.link = function (scope, element, attrs) {
        var EMAIL_REGEXP = /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/;
        scope.checkEmail = function () {
            if (isNullOrUndefined(scope.emails) || scope.emails === "") {
                return true;
            }
            return new RegExp(EMAIL_REGEXP).test(scope.emails);
        };
        scope.$watch("emails", function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            scope.pristine = false;
            var isEmail = scope.checkEmail();
            scope.form[scope.name].$error.email = !isEmail;
            if (scope.form[scope.name].$valid === false && isEmail) {
                scope.form[scope.name].$valid = true;
                scope.form[scope.name].$invalid = false;
            }
            else if (scope.form[scope.name].$valid === true && !isEmail) {
                scope.form[scope.name].$valid = false;
                scope.form[scope.name].$invalid = true;
            }
            if (!isNullOrUndefined(scope.required) && (isNullOrUndefined(scope.emails) || scope.emails === "")) {
                scope.form[scope.name].$error.required = true;
                scope.form[scope.name].$valid = false;
                scope.form[scope.name].$invalid = true;
            }
            else {
                scope.form[scope.name].$error.required = false;
            }
        }, true);
    };
    return MultipleEmailsValidatorDirective;
}());
angular.module(moduleApp).directive(MultipleEmailsValidatorDirectiveId, MultipleEmailsValidatorDirective.directiveFactory());

var PriceCalculationDirectiveId = "priceCalculation";
var PriceCalculationDirective = (function () {
    function PriceCalculationDirective(WorkflowService, $rootScope) {
        this.WorkflowService = WorkflowService;
        this.$rootScope = $rootScope;
        this.templateUrl = function () { return "components/Wizard/view/Price.Calculation.html"; };
        this.transclude = false;
        this.restrict = "E";
        this.scope = {
            editWorkflowUnit: "=",
            editProcess: "="
        };
    }
    PriceCalculationDirective.directiveFactory = function () {
        var directive = function (WorkflowService, $rootScope) { return new PriceCalculationDirective(WorkflowService, $rootScope); };
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    };
    PriceCalculationDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        var _this = this;
        scope.workflowService = this.WorkflowService;
        scope.rootScope = this.$rootScope;
        scope.sumOrderPositions = function (array) { return _this.sumOrderPositions(array, scope); };
        scope.sumBasicPriceOrderPositions = function (array) { return _this.sumBasicPriceOrderPositions(array, scope); };
        scope.calculateDiscount = function (oldPrice, newPrice) { return _this.calculateDiscount(oldPrice, newPrice, scope); };
        scope.isLead = function () { return _this.isLead(scope); };
        scope.isOffer = function () { return _this.isOffer(scope); };
        scope.isSale = function () { return _this.isSale(scope); };
        scope.isInOfferTransformation = function () { return _this.isInOfferTransformation(scope); };
        scope.isInSaleTransformation = function () { return _this.isInSaleTransformation(scope); };
    };
    ;
    PriceCalculationDirective.prototype.sumOrderPositions = function (array, scope) {
        return scope.workflowService.sumOrderPositions(array);
    };
    PriceCalculationDirective.prototype.sumBasicPriceOrderPositions = function (array, scope) {
        return scope.workflowService.sumBasicPriceOrderPositions(array);
    };
    PriceCalculationDirective.prototype.calculateDiscount = function (oldPrice, newPrice, scope) {
        return scope.workflowService.calculateDiscount(oldPrice, newPrice);
    };
    PriceCalculationDirective.prototype.isLead = function (scope) {
        return scope.workflowService.isLead(scope.editProcess);
    };
    PriceCalculationDirective.prototype.isOffer = function (scope) {
        return scope.workflowService.isOffer(scope.editProcess);
    };
    PriceCalculationDirective.prototype.isSale = function (scope) {
        return scope.workflowService.isSale(scope.editProcess);
    };
    PriceCalculationDirective.prototype.isInOfferTransformation = function (scope) {
        return scope.isLead() && !isNullOrUndefined(scope.editProcess.offer);
    };
    PriceCalculationDirective.prototype.isInSaleTransformation = function (scope) {
        return scope.isOffer() && !isNullOrUndefined(scope.editProcess.sale);
    };
    return PriceCalculationDirective;
}());
angular.module(moduleApp).directive(PriceCalculationDirectiveId, PriceCalculationDirective.directiveFactory());

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WizardDirectiveId = "wizard";
var WizardDirective = (function () {
    function WizardDirective(WorkflowService, CustomerService, ProcessService, FileService, NotificationService, $rootScope) {
        this.WorkflowService = WorkflowService;
        this.CustomerService = CustomerService;
        this.ProcessService = ProcessService;
        this.FileService = FileService;
        this.NotificationService = NotificationService;
        this.$rootScope = $rootScope;
        this.templateUrl = function () { return "components/Wizard/view/Wizard.html"; };
        this.transclude = {
            "customerEdit": "?customerEdit",
            "productEdit": "?productEdit",
            "customerProductEdit": "?customerProductEdit",
            "emailEdit": "?emailEdit",
            "saleEdit": "?saleEdit"
        };
        this.restrict = "E";
        this.scope = {
            modalTitle: "@",
            editProcess: "=",
            editWorkflowUnit: "=",
            modalInstance: "=",
            wizardConfig: "=",
            currentNotification: "=",
            transform: "<"
        };
    }
    WizardDirective.directiveFactory = function () {
        var directive = function (WorkflowService, CustomerService, ProcessService, FileService, NotificationService, $rootScope) { return new WizardDirective(WorkflowService, CustomerService, ProcessService, FileService, NotificationService, $rootScope); };
        directive.$inject = [WorkflowServiceId, CustomerServiceId, ProcessServiceId, FileServiceId, NotificationServiceId, $rootScopeId];
        return directive;
    };
    WizardDirective.prototype.link = function (scope, element, attrs, ctrl, transclude) {
        var _this = this;
        scope.workflowService = this.WorkflowService;
        scope.customerService = this.CustomerService;
        scope.processService = this.ProcessService;
        scope.fileService = this.FileService;
        scope.notificationService = this.NotificationService;
        scope.rootScope = this.$rootScope;
        scope.wizardElements = new Array();
        scope.step = 1;
        scope.currentWizard;
        scope.close = function (result, process) { return _this.close(result, process, scope); };
        scope.transformWorkflow = function () { return _this.transformWorkflow(scope); };
        scope.save = function () { return _this.save(scope); };
        scope.saveOrTransform = function () { return _this.saveOrTransform(scope); };
        scope.send = function () { return _this.send(scope); };
        scope.isAnyFormInvalid = function () { return _this.isAnyFormInvalid(scope); };
        scope.getNotificationType = function () { return _this.getNotificationType(scope); };
        scope.followUp = function () { return _this.followUp(scope); };
        scope.isLead = function () { return _this.isLead(scope); };
        scope.isOffer = function () { return _this.isOffer(scope); };
        scope.isSale = function () { return _this.isSale(scope); };
        scope.isInOfferTransformation = function () { return _this.isInOfferTransformation(scope); };
        scope.isInSaleTransformation = function () { return _this.isInSaleTransformation(scope); };
        scope.getWizardConfigByTransclusion = function (wizardConfig, transclusion) { return _this.getWizardConfigByTransclusion(wizardConfig, transclusion); };
        var wizardConfig = scope.wizardConfig;
        var firstActiveElement = null;
        var _loop_1 = function (transclusion) {
            transclude(function (content) {
                var wizardButtonConfig = scope.getWizardConfigByTransclusion(wizardConfig, transclusion);
                if (!isNullOrUndefined(wizardButtonConfig)) {
                    scope.wizardElements.push(wizardButtonConfig);
                    if (wizardButtonConfig.isFirstActiveElement) {
                        firstActiveElement = wizardButtonConfig;
                        scope.step = scope.wizardElements.indexOf(wizardButtonConfig) + 1;
                    }
                }
            }, null, transclusion);
        };
        for (var transclusion in this.transclude) {
            _loop_1(transclusion);
        }
        isNullOrUndefined(firstActiveElement) ? scope.currentWizard = scope.wizardElements[0] : scope.currentWizard = firstActiveElement;
        if (!isNullOrUndefined(scope.currentNotification)) {
            scope.currentNotification.recipients = scope.editWorkflowUnit.customer.email;
            scope.$watch("editWorkflowUnit.customer.email", function (newValue, oldValue) {
                if (newValue !== oldValue && !isNullOrUndefined(scope.editWorkflowUnit)) {
                    scope.currentNotification.recipients = scope.editWorkflowUnit.customer.email;
                }
            }, true);
            scope.currentNotification.notificationType = scope.getNotificationType();
        }
    };
    ;
    WizardDirective.prototype.getWizardConfigByTransclusion = function (wizardConfig, transclusion) {
        for (var _i = 0, wizardConfig_1 = wizardConfig; _i < wizardConfig_1.length; _i++) {
            var buttonConfig = wizardConfig_1[_i];
            if (buttonConfig.directiveType === transclusion) {
                return buttonConfig;
            }
        }
        return null;
    };
    WizardDirective.prototype.close = function (result, process, scope) {
        scope.modalInstance.close(process);
        if (!result && scope.isLead()) {
            scope.editProcess.offer = undefined;
        }
        else if (!result && scope.isOffer()) {
            scope.editProcess.sale = undefined;
        }
    };
    WizardDirective.prototype.saveOrTransform = function (scope) {
        if (scope.transform) {
            scope.transformWorkflow();
        }
        else {
            scope.save();
        }
    };
    WizardDirective.prototype.transformWorkflow = function (scope) {
        return __awaiter(this, void 0, void 0, function () {
            var process, resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        process = scope.editProcess;
                        resultProcess = null;
                        if (!scope.isLead())
                            return [3 , 2];
                        return [4 , scope.workflowService.addLeadToOffer(process)];
                    case 1:
                        resultProcess = _a.sent();
                        return [3 , 4];
                    case 2:
                        if (!scope.isOffer())
                            return [3 , 4];
                        return [4 , scope.workflowService.addOfferToSale(process)];
                    case 3:
                        resultProcess = _a.sent();
                        _a.label = 4;
                    case 4:
                        scope.close(true, resultProcess);
                        return [2 ];
                }
            });
        });
    };
    WizardDirective.prototype.save = function (scope) {
        return __awaiter(this, void 0, void 0, function () {
            var isNewProcess, resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isNewProcess = isNullOrUndefined(scope.editProcess.id);
                        return [4 , scope.processService.save(scope.editProcess, scope.editWorkflowUnit, !isNewProcess, false)];
                    case 1:
                        resultProcess = _a.sent();
                        scope.close(true, resultProcess);
                        return [2 , resultProcess];
                }
            });
        });
    };
    WizardDirective.prototype.getNotificationType = function (scope) {
        if (scope.transform && scope.isInOfferTransformation()) {
            return NotificationType.OFFER;
        }
        else if (scope.transform && scope.isInSaleTransformation()) {
            return NotificationType.SALE;
        }
        else if (!scope.transform && scope.isLead()) {
            return NotificationType.LEAD;
        }
        else if (!scope.transform && scope.isOffer() && !scope.currentWizard.isFollowUp) {
            return NotificationType.OFFER;
        }
        else if (!scope.transform && scope.isOffer() && scope.currentWizard.isFollowUp) {
            return NotificationType.FOLLOWUP;
        }
        else if (!scope.transform && scope.isSale()) {
            return NotificationType.SALE;
        }
    };
    WizardDirective.prototype.send = function (scope) {
        return __awaiter(this, void 0, void 0, function () {
            var notificationType, process, notification, deleteRow, promises, _i, promises_1, p, resultProcess, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        notificationType = scope.getNotificationType();
                        process = scope.editProcess;
                        process.notifications = process.notifications ? process.notifications : [];
                        notification = deepCopy(scope.currentNotification);
                        notification.attachments = notification.attachments ? notification.attachments : [];
                        notification.notificationType = notificationType;
                        notification.id = undefined;
                        deleteRow = false;
                        if (!scope.isInOfferTransformation())
                            return [3 , 2];
                        deleteRow = true;
                        return [4 , scope.workflowService.addLeadToOffer(process)];
                    case 1:
                        _a.sent();
                        return [3 , 4];
                    case 2:
                        if (!scope.isInSaleTransformation())
                            return [3 , 4];
                        deleteRow = true;
                        return [4 , scope.workflowService.addOfferToSale(process)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        promises = notification.attachments ?
                            notification.attachments
                                .filter(function (a) { return isNullOrUndefined(a.id); })
                                .map(function (a) { return scope.fileService.saveAttachment(a); }) : [];
                        _i = 0, promises_1 = promises;
                        _a.label = 5;
                    case 5:
                        if (!(_i < promises_1.length))
                            return [3 , 8];
                        p = promises_1[_i];
                        return [4 , p];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 , 5];
                    case 8:
                        notification.attachments.forEach(function (a) { return a.id = undefined; });
                        process.notifications.push(notification);
                        if (notificationType === NotificationType.FOLLOWUP) {
                            if (process.status !== Status.FOLLOWUP && process.status !== Status.DONE) {
                                process.status = Status.FOLLOWUP;
                            }
                        }
                        else if (notificationType === NotificationType.LEAD) {
                            if (process.status !== Status.INCONTACT) {
                                process.status = Status.INCONTACT;
                            }
                        }
                        return [4 , scope.processService.save(process, scope.editWorkflowUnit, !deleteRow, deleteRow)];
                    case 9:
                        resultProcess = _a.sent();
                        scope.close(true, resultProcess);
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 , scope.notificationService.sendNotification(notification)];
                    case 11:
                        _a.sent();
                        return [3 , 13];
                    case 12:
                        error_1 = _a.sent();
                        notification.notificationType = NotificationType.ERROR;
                        return [3 , 13];
                    case 13: return [2 ];
                }
            });
        });
    };
    WizardDirective.prototype.followUp = function (scope) {
        return __awaiter(this, void 0, void 0, function () {
            var resultProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(scope.editProcess.status !== Status.FOLLOWUP && scope.editProcess.status !== Status.DONE))
                            return [3 , 2];
                        return [4 , scope.processService.setStatus(scope.editProcess, Status.FOLLOWUP)];
                    case 1:
                        resultProcess = _a.sent();
                        scope.rootScope.$broadcast(broadcastUpdate, resultProcess);
                        scope.close(true, resultProcess);
                        return [3 , 3];
                    case 2:
                        scope.close(true);
                        _a.label = 3;
                    case 3: return [2 ];
                }
            });
        });
    };
    WizardDirective.prototype.isLead = function (scope) {
        return scope.workflowService.isLead(scope.editProcess);
    };
    WizardDirective.prototype.isOffer = function (scope) {
        return scope.workflowService.isOffer(scope.editProcess);
    };
    WizardDirective.prototype.isSale = function (scope) {
        return scope.workflowService.isSale(scope.editProcess);
    };
    WizardDirective.prototype.isInOfferTransformation = function (scope) {
        return scope.isLead() && !isNullOrUndefined(scope.editProcess.offer);
    };
    WizardDirective.prototype.isInSaleTransformation = function (scope) {
        return scope.isOffer() && !isNullOrUndefined(scope.editProcess.sale);
    };
    WizardDirective.prototype.isAnyFormInvalid = function (scope) {
        for (var _i = 0, _a = scope.wizardConfig; _i < _a.length; _i++) {
            var buttonConfig = _a[_i];
            if (!isNullOrUndefined(buttonConfig.form) && buttonConfig.form.$invalid && buttonConfig.validation) {
                return true;
            }
        }
        return false;
    };
    return WizardDirective;
}());
angular.module(moduleApp).directive(WizardDirectiveId, WizardDirective.directiveFactory());


angular.module(moduleApp)
    .directive("childrow", function () {
    var directive;
    directive = { restrict: null, templateUrl: null, transclude: null, link: null };
    directive.restrict = "A";
    directive.templateUrl = function (elem, attr) {
        return "components/Workflow/view/ChildRow.html";
    };
    directive.transclude = true;
    directive.link = function (scope, element, attrs) {
        scope.getTimestamp = function (timestamp, pattern) {
            return toLocalDate(timestamp, pattern);
        };
    };
    return directive;
});


var RegistrationServiceId = "RegistrationService";
var RegistrationService = (function () {
    function RegistrationService($location, toaster, $translate, TenantResource, LoginService) {
        this.$inject = [$locationId, toasterId, $translateId, TenantResourceId, LoginServiceId];
        this.location = $location;
        this.toaster = toaster;
        this.translate = $translate;
        this.tenantResource = TenantResource.resource;
        this.loginService = LoginService;
        this.tenantKeyExist = false;
    }
    RegistrationService.prototype.uniqueTenantKey = function (tenant) {
        var self = this;
        this.tenantResource.uniqueTenantKey(tenant).$promise.then(function (data, headersGetter, status) {
            self.tenantKeyExist = !data.validation;
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SIGNUP_ERROR"));
        });
    };
    return RegistrationService;
}());
angular.module(moduleRegistrationService, [ngResourceId]).service(RegistrationServiceId, RegistrationService);


var RegistrationControllerId = "RegistrationController";
var RegistrationController = (function () {
    function RegistrationController(RegistrationService, SignupService, TenantService, LoginService, $http, $location) {
        this.$inject = [RegistrationServiceId, SignupServiceId, TenantServiceId, LoginServiceId, $httpId, $locationId];
        this.registrationService = RegistrationService;
        this.signupService = SignupService;
        this.tenantService = TenantService;
        this.loginService = LoginService;
        this.tenant = new Tenant();
        this.user = new Signup();
        this.credentials = new Credentials();
        this.http = $http;
        this.location = $location;
    }
    RegistrationController.prototype.uniqueTenantKey = function () {
        this.http.defaults.headers.common["X-TenantID"] = this.location.host();
        this.registrationService.uniqueTenantKey(this.tenant);
    };
    RegistrationController.prototype.uniqueEmail = function () {
        this.signupService.uniqueEmail(this.user);
    };
    RegistrationController.prototype.register = function () {
        var self = this;
        this.tenant.license.term = newTimestamp();
        this.tenant.license.trial = true;
        this.tenant.license.licenseType = "BASIC";
        this.user.email = this.user.email.toLowerCase();
        this.credentials.email = this.user.email;
        this.credentials.password = this.user.password;
        this.credentials.tenant = this.tenant.tenantKey + "." + this.location.host();
        self.http.defaults.headers.common["X-TenantID"] = this.location.host();
        this.tenantService.save(this.tenant).then(function (createdTenant) {
            self.http.defaults.headers.common["X-TenantID"] = self.credentials.tenant;
            self.signupService.signup(self.user).then(function (createdUser) {
                self.signupService.init(self.user.password, self.tenant.tenantKey);
                self.loginService.login(self.credentials);
            }, function (error) {
                handleError(error);
            });
        }, function (error) {
            handleError(error);
        });
    };
    return RegistrationController;
}());
angular.module(moduleRegistration, [ngResourceId]).controller(RegistrationControllerId, RegistrationController);
