/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../App/App.Resource.ts" />
/// <reference path="../../App/App.Constants.ts" />
/// <reference path="../../Lead/model/Lead.Model.ts" />
/// <reference path="../../Sale/model/Sale.Model.ts" />
/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../Workflow/model/IWorkflow.Interface.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
const CustomerTimelineControllerId: string = "CustomerTimelineController";

class CustomerTimelineController {

    $inject = [CustomerServiceId, $routeParamsId, CustomerResourceId, LeadResourceId, OfferResourceId, SaleResourceId, $qId, WorkflowServiceId, $sceId];

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
    customerFound: boolean = false;
    sce;

    constructor(CustomerService, $routeParams, CustomerResource, LeadResource, OfferResource, SaleResource, $q, WorkflowService, $sce) {
        this.customerService = CustomerService;
        this.workflowService = WorkflowService;
        this.customerResource = CustomerResource.resource;
        this.leadResource = LeadResource.resource;
        this.offerResource = OfferResource.resource;
        this.saleResource = SaleResource.resource;
        this.routeParams = $routeParams;
        this.currentCustomerId = this.routeParams.customerId;
        this.initCustomer();
        let self = this;
        this.q = $q;
        this.sce = $sce;
        this.getWorkflowByCustomerId().then(function (result: Array<IWorkflow>) { self.workflows = self.orderByTimestamp(result); });

    }

    async initCustomer() {
        this.currentCustomer = await this.customerService.getCustomerById(this.currentCustomerId);
        if (!isNullOrUndefined(this.currentCustomer)) {
            this.customerFound = true;
        }
    }

    getAsHtml(html: string) {
        return this.sce.trustAsHtml(html);
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

    orderByTimestamp(workflows: Array<IWorkflow>): Array<IWorkflow> {
        return workflows.sort((a, b) => {
            let tempA = moment(a.timestamp, "DD.MM.YYYY HH:mm:ss");
            let tempB = moment(b.timestamp, "DD.MM.YYYY HH:mm:ss");
            if (tempA < tempB) { return -1; }
            else if (tempA > tempB) { return 1; }
            else { return 0; }
        });
    }
}

angular.module(moduleCustomerTimeline, [ngResourceId]).controller(CustomerTimelineControllerId, CustomerTimelineController);

