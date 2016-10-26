/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../common/model/OrderPosition.Model.ts" />
/// <reference path="../../App/App.Resource.ts" />
/// <reference path="../../App/App.Constants.ts" />
/// <reference path="../../Lead/model/Lead.Model.ts" />
/// <reference path="../../Sale/model/Sale.Model.ts" />
/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../common/model/IWorkflow.Interface.ts" />
/// <reference path="../../common/service/Workflow.Service.ts" />

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

const CustomerDetailControllerId: string = "CustomerDetailController";

class CustomerDetailController {

    $inject = [CustomerServiceId, $routeParamsId, CustomerResourceId, LeadResourceId, OfferResourceId, SaleResourceId, $qId, WorkflowServiceId, $filterId, $sceId];

    customerService: CustomerService;
    workflowService: WorkflowService;
    customerResource;
    leadResource;
    offerResource;
    saleResource;
    routeParams;
    currentCustomer: Customer;
    currentCustomerId: number;
    workflows: Array<IWorkflow>;
    q;
    orderBy;
    customerFound: boolean = false;
    sce;


    constructor(CustomerService, $routeParams, CustomerResource, LeadResource, OfferResource, SaleResource, $q, WorkflowService, $filter, $sce) {
        this.customerService = CustomerService;
        this.workflowService = WorkflowService;
        this.customerResource = CustomerResource.resource;
        this.leadResource = LeadResource.resource;
        this.offerResource = OfferResource.resource;
        this.saleResource = SaleResource.resource;
        this.routeParams = $routeParams;
        this.currentCustomerId = this.routeParams.customerId;
        this.getCustomerById();
        let self = this;
        this.orderBy = $filter("orderBy");
        this.q = $q;
        this.sce = $sce;
        this.getWorkflowByCustomerId().then(function (result) { self.workflows = self.orderBy(result, "timestamp", true); });

    }

    getAsHtml(html: string) {
        return this.sce.trustAsHtml(html);
    }


    getCustomerById() {
        let self = this;
        this.customerResource.getCustomerById({ id: this.currentCustomerId }).$promise.then(function (result: Customer) {
            self.currentCustomer = result;
            if (!isNullOrUndefined(self.currentCustomer.id)) {
                self.customerFound = true;
            }
        });
    }
    getWorkflowByCustomerId(): any {
        let deferred = this.q.defer();
        let self = this;

        let leads: Array<Lead> = new Array<Lead>();
        let offers: Array<Offer> = new Array<Offer>();
        let sales: Array<Sale> = new Array<Sale>();

        let leadPromiseReady: boolean = false;
        let offerPromiseReady: boolean = false;
        let salePromiseReady: boolean = false;

        this.leadResource.getByCustomerId({ id: this.currentCustomerId }).$promise.then(function (result: Array<Lead>) {
            leads = result;
            leadPromiseReady = true;
            if (leadPromiseReady && offerPromiseReady && salePromiseReady) {
                deferred.resolve(self.getWorkflow(leads, offers, sales));
            }
        });
        this.offerResource.getByCustomerId({ id: this.currentCustomerId }).$promise.then(function (result: Array<Offer>) {
            offers = result;
            offerPromiseReady = true;
            if (leadPromiseReady && offerPromiseReady && salePromiseReady) {
                deferred.resolve(self.getWorkflow(leads, offers, sales));
            }
        });
        this.saleResource.getByCustomerId({ id: this.currentCustomerId }).$promise.then(function (result: Array<Sale>) {
            sales = result;
            salePromiseReady = true;
            if (leadPromiseReady && offerPromiseReady && salePromiseReady) {
                deferred.resolve(self.getWorkflow(leads, offers, sales));
            }
        });
        return deferred.promise;


    }
    getWorkflow(leads: Array<IWorkflow>, offers: Array<IWorkflow>, sales: Array<IWorkflow>): Array<IWorkflow> {
        for (let i = 0; i < leads.length; i++) {
            let temp = leads[i] as any;
            temp.type = "lead";
            temp.showChildRow = false;
        }
        for (let i = 0; i < offers.length; i++) {
            let temp = offers[i] as any;
            temp.type = "offer";
            temp.showChildRow = false;
        }
        for (let i = 0; i < sales.length; i++) {
            let temp = sales[i] as any;
            temp.type = "sale";
            temp.showChildRow = false;
        }
        let temp: Array<IWorkflow> = new Array<IWorkflow>();
        temp = leads.concat(offers.concat(sales));
        return temp.sort((a, b) => { return a.timestamp - b.timestamp; });
    }
    toLocalDate(timestamp: any) {
        return toLocalDate(timestamp);
    }
    sumOrderPositions(array) {
        return this.workflowService.sumOrderPositions(array);
    }

}

angular.module(moduleCustomerDetail, [ngResourceId]).controller(CustomerDetailControllerId, CustomerDetailController);

