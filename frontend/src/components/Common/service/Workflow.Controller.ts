/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />
/// <reference path="../../Notification/controller/Notification.Service.ts" />
/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />
/// <reference path="../../Common/service/Workflow.Service.ts" />
/// <reference path="../../Common/model/Process.Model.ts" />

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

const WorkflowControllerId: string = "WorkflowController";

class WorkflowController extends AbstractWorkflow {

    $inject = ["process", "$uibModalInstance", NotificationServiceId, TemplateServiceId, CustomerServiceId, ProductServiceId, WorkflowServiceId, LeadServiceId, OfferServiceId, SaleServiceId, DashboardServiceId, $rootScopeId];

    type: string;

    uibModalInstance;

    editWorkflowUnit: any;
    process: Process;
    template: Template = new Template();

    templates: Array<Template> = [];
    products: Array<Product> = [];

    customerService: CustomerService;
    notificationService: NotificationService;
    productService: ProductService;
    templateService: TemplateService;
    workflowService: WorkflowService;
    dashboardService: DashboardService;

    currentOrderPositions: Array<OrderPosition>;
    currentProductId = "-1";
    currentProductAmount = 1;
    currentCustomerId = "-1";
    customerSelected: boolean = false;
    currentNotification: Notification;

    editProcess: Process;
    edit: boolean;
    editEmail: boolean;

    leadService: LeadService;
    offerService: OfferService;
    saleService: SaleService;

    customerEditForm: any;
    leadEditForm: any;
    supplyEditForm: any;
    priceEditForm: any;
    emailEditForm: any;
    saleEditForm: any;

    rootScope;
    templateId = "-1";
    notificationId = "-1";

    constructor(process, type, $uibModalInstance, NotificationService, TemplateService, CustomerService, ProductService, WorkflowService, LeadService, OfferService, SaleService, DashboardService, $rootScope) {

        super(WorkflowService);

        this.rootScope = $rootScope;
        this.process = process;
        this.type = type;

        if (this.type === "offer") {
            this.editWorkflowUnit = new Offer();
            this.editWorkflowUnit = this.process.offer;
            this.currentNotification = new Notification();
            this.currentNotification.recipient = this.editWorkflowUnit.customer.email;
            this.editEmail = false;
        }
        else if (this.type === "sale") {
            this.wizardOnClick(6);
            this.editWorkflowUnit = new Sale();
            this.editWorkflowUnit = this.process.sale;
            this.editEmail = true;
        }
        this.uibModalInstance = $uibModalInstance;

        this.notificationService = NotificationService;

        this.templateService = TemplateService;

        this.customerService = CustomerService;
        this.productService = ProductService;
        this.workflowService = WorkflowService;
        this.dashboardService = DashboardService;

        this.getAllActiveTemplates();
        this.getAllActiveProducts();

        this.leadService = LeadService;
        this.offerService = OfferService;
        this.saleService = SaleService;

        this.loadDataToModal(process);
    }

    loadDataToModal(process: Process) {
        if (!isNullOrUndefined(this.customerEditForm)) {
            this.customerEditForm.$setPristine();
        }
        if (!isNullOrUndefined(this.leadEditForm)) {
            this.leadEditForm.$setPristine();
        }
        if (!isNullOrUndefined(this.supplyEditForm)) {
            this.supplyEditForm.$setPristine();
        }
        if (!isNullOrUndefined(this.priceEditForm)) {
            this.priceEditForm.$setPristine();
        }
        if (!isNullOrUndefined(this.emailEditForm)) {
            this.emailEditForm.$setPristine();
        }
        if (!isNullOrUndefined(this.saleEditForm)) {
            this.saleEditForm.$setPristine();
        }

        this.edit = true;
        this.currentProductId = "-1";
        this.currentProductAmount = 1;
        this.editProcess = process;

        if (this.type === "offer") {
            this.currentOrderPositions = deepCopy(this.editProcess.offer.orderPositions);
            this.customerSelected = this.editProcess.offer.customer.id > 0;
            this.currentCustomerId = this.editProcess.offer.customer.id + "";
            this.editWorkflowUnit = deepCopy(this.editProcess.offer);
        } else if (this.type === "sale") {
            this.currentOrderPositions = deepCopy(this.editProcess.sale.orderPositions);
            this.customerSelected = this.editProcess.sale.customer.id > 0;
            this.currentCustomerId = this.editProcess.sale.customer.id + "";
            this.editWorkflowUnit = deepCopy(this.editProcess.sale);
        }
    }

    close() {
        this.uibModalInstance.close();
        if (this.type === "offer") {
            this.dashboardService.openOffers = this.dashboardService.orderBy(this.dashboardService.openOffers, "offer.timestamp", false);
            this.dashboardService.sumLeads();
            this.dashboardService.sumOffers();
        } else if (this.type === "sale") {
            this.dashboardService.closedSales = this.dashboardService.orderBy(this.dashboardService.closedSales, "sale.timestamp", false);
            this.dashboardService.sumOffers();
            this.dashboardService.sumSales();
        }
        this.dashboardService.initDashboard();
    }

    calculateProfit() {
        this.editWorkflowUnit.saleProfit = this.editWorkflowUnit.saleTurnover - this.editWorkflowUnit.saleCost;
    }

    generate(templateId: string, offer: Offer) {
        console.log("TemplateID: ", templateId);
        this.templateService.generate(templateId, offer, this.currentNotification).then((result) => this.currentNotification = result, (error) => console.log(error));
    }

    generatePDF(templateId: string, offer: Offer) {
        this.templateService.generatePDF(templateId, offer).then((result) => console.log(result), (error) => console.log(error));
    }

    getAllActiveTemplates() {
        this.templateService.getAll().then((result) => this.templates = result, (error) => console.log(error));
    }

    getAllActiveProducts() {
        this.productService.getAllProducts().then((result) => this.products = result, (error) => console.log(error));
    }

    getOrderPositions(process: Process): Array<OrderPosition> {
        if (!isNullOrUndefined(process.offer)) {
            return process.offer.orderPositions;
        }
    }

    send() {
        let self = this;
        this.process.offer = this.editWorkflowUnit;
        let process = this.process;
        let notification = this.currentNotification;
        this.currentNotification.notificationType = NotificationType.OFFER;
        this.notificationService.sendNotification(notification).then(() => {
            self.workflowService.addLeadToOffer(process).then(function (tmpprocess: Process) {
                self.rootScope.$broadcast("deleteRow", self.process);
                if (isNullOrUndefined(process.notifications)) {
                    process.notifications = [];
                }
                process.notifications.push(notification);
                self.workflowService.saveProcess(process);
                self.close();
            });
        });
    }

    save() {
        if (this.type === "offer") {
            let self = this;
            this.process.offer = this.editWorkflowUnit;
            let process = this.process;
            this.currentNotification.notificationType = NotificationType.OFFER;
            let notification = this.currentNotification;
            this.workflowService.addLeadToOffer(process).then(function (tmpprocess: Process) {
                self.rootScope.$broadcast("deleteRow", tmpprocess);
                if (isNullOrUndefined(tmpprocess.notifications)) {
                    tmpprocess.notifications = [];
                }
                tmpprocess.notifications.push(notification);
                self.workflowService.saveProcess(tmpprocess);
                self.close();
            });
        } else if (this.type === "sale") {
            this.process.sale = this.editWorkflowUnit;
            let self = this;
            this.workflowService.addOfferToSale(this.process).then(function (tmpprocess: Process) {
                self.rootScope.$broadcast("deleteRow", self.process);
                self.close();
            });
        }
    }

    selectCustomer(workflow: any) {
        this.customerSelected = this.workflowService.selectCustomer(workflow, this.currentCustomerId);
    }

    getTheFiles($files) {
        this.notificationService.getTheFiles($files);
    }

}

angular.module(moduleWorkflow, ["summernote"]).service(WorkflowControllerId, WorkflowController);
