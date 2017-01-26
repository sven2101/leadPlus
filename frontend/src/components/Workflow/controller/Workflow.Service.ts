/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../common/model/OrderPosition.Model.ts" />
/// <reference path="../../common/model/Commentary.Model.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Common/model/Status.Model.ts" />
/// <reference path="../../Common/model/Promise.Interface.ts" />
/// <reference path="../../Common/model/Defer.Interface.ts" />
/// <reference path="../../Workflow/model/Workflow.Model.ts" />
/// <reference path="../../Workflow/controller/Workflow.Controller.ts" />
/// <reference path="../../Lead/controller/Lead.Controller.ts" />
/// <reference path="../../Offer/controller/Offer.Controller.ts" />
/// <reference path="../../Sale/controller/Sale.Controller.ts" />
/// <reference path="../../Dashboard/controller/Dashboard.Controller.ts" />
/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../Common/service/FollowUp.Controller.ts" />
/// <reference path="../../FileUpload/controller/File.Service.ts" />
/// <reference path="../../Modal/controller/Modal.Transition.Controller.ts" />
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

    private $inject = [CommentResourceId, SaleResourceId, toasterId, $rootScopeId, $translateId, $qId, CustomerServiceId, $uibModalId, UserResourceId, ProcessServiceId];

    commentResource;
    saleResource;
    userResource;
    processService: ProcessService;
    customerService: CustomerService;
    toaster;
    rootScope;
    translate;
    $q;
    uibModal;
    users: Array<User> = [];

    constructor(CommentResource, SaleResource, toaster, $rootScope, $translate, $q, CustomerService, $uibModal, UserResource, ProcessService) {
        this.commentResource = CommentResource.resource;
        this.saleResource = SaleResource.resource;
        this.userResource = UserResource.resource;
        this.toaster = toaster;
        this.processService = ProcessService;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.$q = $q;
        this.customerService = CustomerService;
        this.uibModal = $uibModal;
        this.refreshUsers();
    }

    addComment(process: Process, commentText: string): IPromise<boolean> {
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

    getOfferTransformationWizardTemplate(): string {
        let wizardSteps = `
        <customer-product-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardOfferTransitionConfig,"${WizardForm.CUSTOMER_PRODUCT}")' edit-workflow-unit='transitionCtrl.editProcess.offer' edit-process='transitionCtrl.editProcess' editable='true'/>`;
        wizardSteps += `<email-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardOfferTransitionConfig,"${WizardForm.EMAIL}")' process='transitionCtrl.editProcess' disabled='false' notification='transitionCtrl.notification'/>`;
        wizardSteps += `<sale-edit />`;

        return `<transition edit-process='transitionCtrl.editProcess' edit-workflow-unit='transitionCtrl.editProcess.offer' modal-instance='transitionCtrl.uibModalInstance' wizard-config='transitionCtrl.wizardOfferTransitionConfig' current-notification='transitionCtrl.notification' transform='true'>
            ` + wizardSteps + `</transition>`;
    }

    getSaleTransformationWizardTemplate(): string {
        let wizardSteps = `
        <customer-product-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardSaleTransitionConfig,"${WizardForm.CUSTOMER_PRODUCT}")' edit-workflow-unit='transitionCtrl.editProcess.sale' edit-process='transitionCtrl.editProcess' editable='false'/>`;
        wizardSteps += `<email-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardSaleTransitionConfig,"${WizardForm.EMAIL}")' process='transitionCtrl.editProcess' disabled='false' notification='transitionCtrl.notification'/>`;
        wizardSteps += `<sale-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardSaleTransitionConfig,"${WizardForm.SALE}")' edit-workflow-unit='transitionCtrl.editProcess.sale' edit-process='transitionCtrl.editProcess' editable='true'/>`;

        return `<transition edit-process='transitionCtrl.editProcess' edit-workflow-unit='transitionCtrl.editProcess.sale' modal-instance='transitionCtrl.uibModalInstance' wizard-config='transitionCtrl.wizardSaleTransitionConfig' current-notification='transitionCtrl.notification' transform='true'>
            ` + wizardSteps + `</transition>`;
    }

    startOfferTransformation(process: Process): IPromise<Process> {
        let defer = this.$q.defer();

        let wizardTemplate = this.getOfferTransformationWizardTemplate();
        this.uibModal.open({
            template: wizardTemplate,
            controller: ModalTransitionController,
            controllerAs: "transitionCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function (): Process {
                    return process;
                },
                transformation: function (): Workflow {
                    return Workflow.OFFER;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    }


    startSaleTransformation(process: Process): IPromise<Process> {
        let defer = this.$q.defer();

        let wizardTemplate = this.getSaleTransformationWizardTemplate();
        this.uibModal.open({
            template: wizardTemplate,
            controller: ModalTransitionController,
            controllerAs: "transitionCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function (): Process {
                    return process;
                }, transformation: function (): Workflow {
                    return Workflow.SALE;
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });

        return defer.promise;
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

    openFollowUpModal(process: Process) {
        this.uibModal.open({
            template: " <div sendfollowup parent='followUpCtrl' form='parent.emailEditForm' type='offer'></div>",
            controller: FollowUpController,
            controllerAs: "followUpCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
                }
            }
        });
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
                self.rootScope.$broadcast("deleteRow", process);
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

    checkForDupsInFormerProcessors(formerProcessors: Array<Processor>, user: User, activity: Activity): boolean {
        if (isNullOrUndefined(formerProcessors)) {
            return false;
        }
        return formerProcessors.filter(fp => fp.user.id === user.id && fp.activity === activity).length > 0;
    }

    async getSaleByInvoiceNumber(invoiceNumber: string): Promise<Sale> {
        return await this.saleResource.getByinvoiceNumber({}, invoiceNumber).$promise.catch(error => handleError(error)) as Sale;
    }
}
angular.module(moduleWorkflowService, [ngResourceId]).service(WorkflowServiceId, WorkflowService);
