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

    uibModalInstance;

    editWorkflowUnit: Offer;
    editWorkflowProcess: Process;
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

    editForm: any;
    editProcess: Process;
    edit: boolean;

    leadService: LeadService;
    offerService: OfferService;
    saleService: SaleService;

    constructor(process, $uibModalInstance, NotificationService, TemplateService, CustomerService, ProductService, WorkflowService, LeadService, OfferService, SaleService, DashboardService) {
        super(WorkflowService);
        this.editWorkflowProcess = process;
        console.log("editWorkflowProcess: ", this.editWorkflowProcess);
        console.log("process: ", process);
        this.editWorkflowUnit = process.offer;
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

    ok() {
        this.uibModalInstance.close();
    }

    close() {
        this.editForm.$setPristine();
        this.uibModalInstance.close();
    }

    generate(templateId: string, offer: Offer) {
        this.templateService.generate(templateId, offer).then((result) => this.editWorkflowUnit.notification = result, (error) => console.log(error));
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
        this.notificationService.sendOffer(this.editWorkflowUnit.notification, this.editWorkflowUnit);
        this.close();
    }

    save() {
        this.offerService.save(this.editWorkflowUnit, this.editWorkflowProcess, this.currentOrderPositions);
        this.close();
    }

    selectCustomer(workflow: any) {
        this.customerSelected = this.workflowService.selectCustomer(workflow, this.currentCustomerId);
    }

    getTheFiles($files) {
        this.notificationService.getTheFiles($files);
    }

    rollBack() {
        this.editWorkflowProcess.offer = this.editWorkflowUnit;
        console.log("Process: ", this.editWorkflowProcess);
        this.offerService.rollBackModal(this.editWorkflowProcess);
        this.dashboardService.initDashboard();
        this.close();
    }

}

angular.module(moduleWorkflow, ["summernote"]).service(WorkflowControllerId, WorkflowController);
