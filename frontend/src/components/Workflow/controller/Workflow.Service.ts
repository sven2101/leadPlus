/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Commentary/model/Commentary.Model.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Process/model/Status.Model.ts" />
/// <reference path="../../Process/controller/Process.Service.ts" />
/// <reference path="../../Workflow/model/WorkflowType.ts" />
/// <reference path="../../Workflow/controller/Workflow.Controller.ts" />
/// <reference path="../../Offer/controller/Offer.Controller.ts" />
/// <reference path="../../Sale/controller/Sale.Controller.ts" />
/// <reference path="../../Dashboard/controller/Dashboard.Controller.ts" />
/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../FileUpload/controller/File.Service.ts" />
/// <reference path="../../Wizard/controller/Wizard.Modal.Controller.ts" />
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

const WorkflowServiceId: string = "WorkflowService";

class WorkflowService {

    private $inject = [CommentResourceId, SaleResourceId, OfferResourceId, toasterId, $rootScopeId, $translateId, $qId, CustomerServiceId, UserResourceId, ProcessServiceId, WorkflowModalServiceId];

    commentResource;
    saleResource;
    offerResource;
    userResource;
    processService: ProcessService;
    customerService: CustomerService;
    workflowModalService: WorkflowModalService;
    toaster;
    rootScope;
    translate;
    $q;
    users: Array<User> = [];

    constructor(CommentResource, SaleResource, OfferResource, toaster, $rootScope, $translate, $q, CustomerService, UserResource, ProcessService, WorkflowModalService) {
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

    addComment(process: Process, commentText: string): Promise<boolean> {
        let defer = this.$q.defer();
        if (angular.isUndefined(commentText) || commentText === "") {
            defer.reject(false);
            return defer.promise;
        }
        if (isNullOrUndefined(process.comments)) {
            process.comments = new Array<Commentary>();
        }
        let self: WorkflowService = this;
        let comment: Commentary = {
            id: null,
            creator: this.rootScope.user,
            commentText: commentText,
            timestamp: newTimestamp()
        };

        this.commentResource.save({ id: process.id }, comment).$promise.then(function (result: Commentary) {
            let timestamp = toLocalDate(comment.timestamp, "DD.MM.YYYY HH:mm:ss");
            comment.timestamp = timestamp;
            result.creator = self.rootScope.user;
            process.comments.push(result);


            defer.resolve(true);
        }, function () {
            defer.reject(false);
        });
        return defer.promise;
    }

    getCommentsByProcessId(id: number): Array<Commentary> {
        let comments: Array<Commentary> = new Array<Commentary>();
        this.commentResource.getByProcessId({ id: id }).$promise.then(function (result) {
            for (let comment of result) {
                let timestamp = toLocalDate(comment.timestamp);
                comment.timestamp = timestamp;
                comments.push(comment);
            }
        });
        return comments;
    }

    sumOrderPositions(array: Array<OrderPosition>): number {
        let sum = 0;
        if (isNullOrUndefined(array)) {
            return 0;
        }
        for (let i = 0; i < array.length; i++) {
            let temp = array[i];
            if (!isNullOrUndefined(temp) && !isNaN(temp.amount)
                && !isNaN(temp.netPrice)) {
                sum += temp.amount * temp.netPrice;
            }
        }
        return Math.round(sum * 100) / 100;
    }

    sumBasicPriceOrderPositions(array: Array<OrderPosition>): number {
        let sum = 0;
        if (isNullOrUndefined(array)) {
            return 0;
        }
        for (let i = 0; i < array.length; i++) {
            let temp = array[i];
            if (!isNullOrUndefined(temp) && !isNaN(temp.amount)
                && !isNullOrUndefined(temp.product)
                && !isNaN(temp.product.netPrice)) {
                sum += temp.amount * temp.product.netPrice;
            }
        }
        return sum;
    }

    calculateDiscount(oldPrice: number, newPrice: number): number {
        let temp = Math.round((((oldPrice - newPrice) / oldPrice) * 100) * 100) / 100;
        return isNaN(temp) || temp < 0 ? 0 : temp;
    }

    calculatePrice(oldPrice: number, discount: number): number {
        let temp = Math.round(oldPrice * (1 - (discount / 100)));
        return isNaN(temp) ? 0 : temp;
    }

    async startOfferTransformation(process: Process): Promise<Process> {
        return await this.workflowModalService.openOfferTransformationModal(process);
    }

    async startSaleTransformation(process: Process): Promise<Process> {
        return await this.workflowModalService.openSaleTransformationModal(process);
    }

    async addLeadToOffer(tempProcess: Process): Promise<Process> {
        tempProcess.formerProcessors = tempProcess.formerProcessors ? tempProcess.formerProcessors : [];
        if (!this.checkForDupsInFormerProcessors(tempProcess.formerProcessors, this.rootScope.user, Activity.OFFER)) {
            tempProcess.formerProcessors.push(new Processor(this.rootScope.user, Activity.OFFER));
        }
        tempProcess.status = Status.OFFER;
        tempProcess.processor = this.rootScope.user;
        let resultProcess: Process = await this.processService.save(tempProcess, tempProcess.offer, false, true).catch(error => handleError(error)) as Process;
        console.log(resultProcess);
        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_NEW_OFFER"));
        this.rootScope.leadsCount -= 1;
        this.rootScope.offersCount += 1;
        return resultProcess;
    }

    async addOfferToSale(tempProcess: Process): Promise<Process> {
        tempProcess.formerProcessors = tempProcess.formerProcessors ? tempProcess.formerProcessors : [];
        if (!this.checkForDupsInFormerProcessors(tempProcess.formerProcessors, this.rootScope.user, Activity.SALE)) {
            tempProcess.formerProcessors.push(new Processor(this.rootScope.user, Activity.SALE));
        }
        tempProcess.status = Status.SALE;
        tempProcess.processor = this.rootScope.user;
        let resultProcess = await this.processService.save(tempProcess, tempProcess.sale, false, true).catch(error => handleError(error)) as Process;
        let customer: Customer = resultProcess.offer.customer;
        if (!customer.realCustomer) {
            customer.realCustomer = true;
            let updatedCustomer: Customer = await this.customerService.updateCustomer(customer);
            resultProcess.offer.customer = updatedCustomer;
        }
        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_NEW_SALE"));
        this.rootScope.offersCount -= 1;
        return resultProcess;
    }

    refreshUsers(): void {
        this.userResource.getAll().$promise.then((data) => {
            this.users = data;
        }, (error) => handleError(error));

    }

    createNextWorkflowUnit(process: Process): void {
        switch (process.status) {
            case Status.OPEN: this.startOfferTransformation(process);
                break;
            case Status.INCONTACT: this.startOfferTransformation(process);
                break;
            case Status.OFFER: this.startSaleTransformation(process);
                break;
            case Status.FOLLOWUP: this.startSaleTransformation(process);
                break;
            case Status.DONE: this.startSaleTransformation(process);
                break;
            default: ;
                break;
        }
    }

    getWorkflowTypeByProcess(process: Process): WorkflowType {
        if (this.isLead(process)) {
            return WorkflowType.LEAD;
        } else if (this.isOffer(process)) {
            return WorkflowType.OFFER;
        } else if (this.isSale(process)) {
            return WorkflowType.SALE;
        }
        else {
            return null;
        }
    }

    openQuickEmailModal(process: Process) {
        let workflowType: WorkflowType = this.getWorkflowTypeByProcess(process);
        this.workflowModalService.openQuickEmailModal(process, workflowType);
    }

    togglePin(process: Process, user: User): void {
        let self = this;
        if (user !== null) {
            this.processService.setProcessor(process, user).then(() => {
                process.processor = user;
                self.rootScope.$broadcast("updateRow", process);
                self.rootScope.$broadcast("onTodosChange");
            }, (error) => handleError(error)).catch(error => handleError(error));
        } else if (process.processor !== null) {
            this.processService.removeProcessor(process).then(function () {
                process.processor = null;
                self.rootScope.$broadcast("updateRow", process);
                self.rootScope.$broadcast("onTodosChange");
            }, (error) => handleError(error)).catch(error => handleError(error));
        }
    }
    async inContact(process: Process): Promise<Process> {
        process.status = "INCONTACT";
        process.processor = this.rootScope.user;
        if (isNullOrUndefined(process.formerProcessors)) {
            process.formerProcessors = [];
        }
        if (!this.checkForDupsInFormerProcessors(process.formerProcessors, this.rootScope.user, Activity.INCONTACT)) {
            process.formerProcessors.push(new Processor(process.processor, Activity.INCONTACT));
        }
        let resultProcess = await this.processService.save(process, null, true, false).catch(error => handleError(error)) as Process;
        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_INCONTACT"));
        return resultProcess;
    }

    async doneOffer(process: Process): Promise<Process> {
        let toastMsg: string = "";
        if (process.status === Status.OFFER || process.status === Status.FOLLOWUP) {
            process.status = "DONE";
            toastMsg = "COMMON_TOAST_SUCCESS_DONE_OFFER";
            process.processor = null;
        } else if (process.status === Status.DONE) {
            if (process.followUpAmount > 0) {
                process.status = "FOLLOWUP";
            } else {
                process.status = "OFFER";
            }
            toastMsg = "COMMON_TOAST_SUCCESS_REVERT_DONE_OFFER";
            process.processor = this.rootScope.user;
        }
        let resultProcess = await this.processService.save(process, null, true, false) as Process;
        this.toaster.pop("success", "", this.translate.instant(toastMsg));
        return resultProcess;
    }

    toggleClosedOrOpenState(process: Process): void {
        let self = this;
        if (process.status !== Status.CLOSED) {
            this.processService.setStatus(process, Status.CLOSED).then((process: Process) => {
                self.rootScope.offersCount -= 1;
                process.status = Status.CLOSED;
                self.rootScope.$broadcast("removeOrUpdateRow", process);
            });
        } else if (isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)) {
            this.processService.setStatus(process, Status.OPEN).then((process: Process) => {
                self.rootScope.leadsCount += 1;
                process.status = Status.OPEN;
                self.rootScope.$broadcast("updateRow", process);
            });
        } else if (!isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)) {
            this.processService.setStatus(process, Status.OFFER).then((process: Process) => {
                self.rootScope.offersCount += 1;
                process.status = Status.OFFER;
                self.rootScope.$broadcast("updateRow", process);
            });
        }
    }

    async rollBackOffer(process: Process): Promise<Process> {
        if (isNullOrUndefined(process)) {
            return;
        }
        let offerId = process.offer.id;
        process.offer = null;
        process.status = Status.OPEN;

        let resultProcess = await this.processService.save(process, null, false, true) as Process;
        this.offerResource.drop({ id: offerId });
        this.rootScope.leadsCount += 1; this.rootScope.offersCount -= 1;
        return resultProcess;
    }

    async rollBackSale(process: Process): Promise<Process> {
        if (isNullOrUndefined(process)) {
            return;
        }
        let saleId = process.sale.id;
        process.sale = null;
        process.status = Status.OFFER;
        let self = this;
        let resultProcess = await this.processService.save(process, null, false, true) as Process;
        self.saleResource.drop({ id: saleId });
        this.rootScope.offersCount += 1; this.rootScope.salesCount -= 1;
        return resultProcess;
    }

    async deleteProcess(process: Process): Promise<Process> {
        let resultProcess = await this.processService.delete(process) as Process;
        this.toaster.pop("success", "", this.translate
            .instant("COMMON_TOAST_SUCCESS_DELETE_LEAD"));
        if (this.isLead(process)) {
            this.rootScope.leadsCount -= 1;
        }
        else if (this.isOffer(process)) {
            this.rootScope.offersCount -= 1;
        }
        this.rootScope.$broadcast("onTodosChange");
        this.rootScope.$broadcast("removeRow", process);
        return resultProcess;
    }

    checkForDupsInFormerProcessors(formerProcessors: Array<Processor>, user: User, activity: Activity): boolean {
        if (isNullOrUndefined(formerProcessors)) {
            return false;
        }
        return formerProcessors.filter(fp => fp.user.id === user.id && fp.activity === activity).length > 0;
    }

    async getSaleByInvoiceNumber(invoiceNumber: string): Promise<Sale> {
        return await this.saleResource.getByinvoiceNumber({}, invoiceNumber).$promise.catch(error => handleError(error)) as Sale;
    }

    isLead(process: Process): boolean {
        return process.status === Status.OPEN || process.status === Status.INCONTACT;
    }

    isOffer(process: Process): boolean {
        return process.status === Status.OFFER || process.status === Status.FOLLOWUP || process.status === Status.DONE;
    }

    isSale(process: Process): boolean {
        return process.status === Status.SALE;
    }

}
angular.module(moduleWorkflowService, [ngResourceId]).service(WorkflowServiceId, WorkflowService);
