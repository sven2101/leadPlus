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

    $inject = ["process", "$uibModalInstance", NotificationServiceId, TemplateServiceId, CustomerServiceId, ProductServiceId, WorkflowServiceId, LeadServiceId, OfferServiceId, SaleServiceId, DashboardServiceId];

    type: string = "offer";

    uibModalInstance;

    editWorkflowUnit: Offer = new Offer();
    process: Process;
    template: Template = new Template();

    templates: Array<Template> = [];
    products: Array<Product> = [];

    customerService: CustomerService;
    productService: ProductService;
    notificationService: NotificationService;
    templateService: TemplateService;
    workflowService: WorkflowService;
    dashboardService: DashboardService;

    currentOrderPositions: Array<OrderPosition>;
    currentProductId = "-1";
    currentProductAmount = 1;
    currentCustomerId = "-1";
    customerSelected: boolean = false;

    editProcess: Process;
    edit: boolean;

    leadService: LeadService;
    offerService: OfferService;
    saleService: SaleService;

    constructor(process, $uibModalInstance, NotificationService, TemplateService, CustomerService, ProductService, WorkflowService, LeadService, OfferService, SaleService, DashboardService) {
        super(WorkflowService);
        this.process = process;
        this.editWorkflowUnit = this.process.offer;
        this.editWorkflowUnit.notification = new Notification();
        this.editWorkflowUnit.notification.recipient = this.editWorkflowUnit.customer.email;
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
        this.edit = true;
        this.currentProductId = "-1";
        this.currentProductAmount = 1;
        this.editProcess = process;
        this.currentOrderPositions = deepCopy(this.editProcess.offer.orderPositions);
        this.customerSelected = this.editProcess.offer.customer.id > 0;
        this.currentCustomerId = this.editProcess.offer.customer.id + "";
        this.editWorkflowUnit = deepCopy(this.editProcess.offer);
    }

    close() {
        this.uibModalInstance.close();
        this.dashboardService.openOffers = this.dashboardService.orderBy(this.dashboardService.openOffers, "offer.timestamp", false);
        this.dashboardService.sumLeads();
        this.dashboardService.sumOffers();
        this.dashboardService.initDashboard();
    }

    generate(templateId: string, process: Process) {
        this.templateService.generate(templateId, process).then((result) => this.editWorkflowUnit.notification = result, (error) => console.log(error));
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
        this.process.offer = this.editWorkflowUnit;
        this.notificationService.sendOffer(this.process);
        this.close();
    }

    save() {
        this.process.offer = this.editWorkflowUnit;
        this.workflowService.addLeadToOffer(this.process).then(function (tmpprocess: Process) {
        });
        this.close();
    }

    selectCustomer(workflow: any) {
        this.customerSelected = this.workflowService.selectCustomer(workflow, this.currentCustomerId);
    }

    getTheFiles($files) {
        this.notificationService.getTheFiles($files);
    }

}

angular.module(moduleWorkflow, ["summernote"]).service(WorkflowControllerId, WorkflowController);
