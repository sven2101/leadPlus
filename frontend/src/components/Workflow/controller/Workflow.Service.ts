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

    private $inject = [CommentResourceId, ProcessResourceId, toasterId, $rootScopeId,
        $translateId, $compileId, $qId, ProductServiceId, CustomerServiceId, $uibModalId,
        UserResourceId, TemplateServiceId, NotificationServiceId, FileServiceId, ProcessServiceId];

    commentResource;
    processResource;
    userResource;
    templateService;
    processService: ProcessService;

    toaster;
    rootScope;
    translate;
    compile;
    $q;
    productService: ProductService;
    customerService: CustomerService;
    uibModal;
    users: Array<User> = [];

    constructor(CommentResource, ProcessResource, toaster, $rootScope, $translate, $compile, $q, ProductService, CustomerService, $uibModal, UserResource, TemplateService, private NotificationService, private FileService, ProcessService) {
        this.commentResource = CommentResource.resource;
        this.processResource = ProcessResource.resource;
        this.userResource = UserResource.resource;
        this.templateService = TemplateService;
        this.toaster = toaster;
        this.processService = ProcessService;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.compile = $compile;
        this.$q = $q;
        this.productService = ProductService;
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

    addProduct(array: Array<OrderPosition>, currentProductId: string, currentProductAmount: number) {
        if (isNullOrUndefined(array)) {
            array = [];
        }
        if (!isNaN(Number(currentProductId))
            && Number(currentProductId) > 0) {
            let tempProduct = findElementById(this.productService.products,
                Number(currentProductId));
            let tempOrderPosition = new OrderPosition();
            tempOrderPosition.product = tempProduct as Product;
            tempOrderPosition.amount = currentProductAmount;
            tempOrderPosition.discount = 0;
            tempOrderPosition.netPrice = tempOrderPosition.product.netPrice;
            array.push(tempOrderPosition);
        }
    }

    deleteProduct(array: Array<OrderPosition>, index: number) {
        array.splice(index, 1);
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

    reCalculateOffer(offer: Offer, array: Array<OrderPosition>) {
        offer.netPrice = Math.round((offer.deliveryCosts + this.sumOrderPositions(array)) * 100) / 100;
    }

    setDiscount(orderPosition: OrderPosition) {
        orderPosition.discount = this.calculateDiscount(orderPosition.product.netPrice, orderPosition.netPrice);
    }

    setPrice(orderPosition: OrderPosition) {
        orderPosition.netPrice = this.calculatePrice(orderPosition.product.netPrice, orderPosition.discount);
    }



    getOfferTransformationWizardTemplate(): string {
        let wizardSteps = `
        <customer-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardOfferTransitionConfig,"${WizardForm.CUSTOMER}")' edit-workflow-unit='transitionCtrl.editProcess.offer' edit-process='transitionCtrl.editProcess' editable='true' small='true'/>`;
        wizardSteps += `<email-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardOfferTransitionConfig,"${WizardForm.EMAIL}")' process='transitionCtrl.editProcess' disabled='false' notification='transitionCtrl.notification'/>`;
        wizardSteps += `<sale-edit />`;

        return `<transition edit-process='transitionCtrl.editProcess' edit-workflow-unit='transitionCtrl.editProcess.offer' modal-instance='transitionCtrl.uibModalInstance' wizard-config='transitionCtrl.wizardOfferTransitionConfig' current-notification='transitionCtrl.notification' transform='true'>
            ` + wizardSteps + `</transition>`;
    }

    getSaleTransformationWizardTemplate(): string {
        let wizardSteps = `
        <customer-edit form='transitionCtrl.getWizardConfigByDirectiveType(transitionCtrl.wizardSaleTransitionConfig,"${WizardForm.CUSTOMER}")' edit-workflow-unit='transitionCtrl.editProcess.sale' edit-process='transitionCtrl.editProcess' editable='false' small='true'/>`;
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
        let resultProcess = await this.processService.save(tempProcess, tempProcess.offer, false, true).then().catch(error => handleError(error)) as Process;
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
        let resultProcess = await this.processService.save(tempProcess, tempProcess.sale, false, true).then().catch(error => handleError(error)) as Process;
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

    getButtons(title: string, columns: Array<number>): Array<any> {
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
    }

    getDomString(): string {
        return "<'row'<'col-sm-12'l>>" + "<'row'<'col-sm-6'B><'col-sm-6'f>>"
            + "<'row'<'col-sm-12'tr>>"
            + "<'row'<'col-sm-5'i><'col-sm-7'p>>";
    }

    getLanguageSource(language: string): string {
        switch (language) {
            case Language[Language.DE]:
                return "/assets/datatablesTranslationFiles/German.json";
            case Language[Language.EN]:
                return "/assets/datatablesTranslationFiles/English.json";
            default:
                return "/assets/datatablesTranslationFiles/English.json";
        }
    }

    changeDataInput(loadAllData: boolean, dtOptions: any, allDataRoute: string, latestDataRoute: string) {
        let searchDelay: number = 0;
        if (loadAllData === true) {
            searchDelay = 600;
        }
        dtOptions.withOption("serverSide", loadAllData)
            .withOption("ajax", this.getData(loadAllData, allDataRoute, latestDataRoute))
            .withOption("searchDelay", searchDelay);
    }

    getData(loadAllData: boolean, allDataRoute: string, latestDataRoute: string): any {
        let self = this;
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
        } else {
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
    }

    appendChildRow(childScope: any, process: Process, workflowUnit: IWorkflow, dtInstance: any, parent: WorkflowController, type: string) {
        childScope.workflowUnit = workflowUnit;
        childScope.process = process;
        childScope.parent = parent;
        childScope.type = type;

        let link = angular.element("#id_" + process.id), icon = link
            .find(".glyphicon"), tr = link.parent().parent(), table = dtInstance.DataTable, row = table
                .row(tr);

        if (row.child.isShown()) {
            icon.removeClass("glyphicon-minus-sign")
                .addClass("glyphicon-plus-sign");
            row.child.hide();
            tr.removeClass("shown");
            childScope.$destroy();
        } else {
            icon.removeClass("glyphicon-plus-sign")
                .addClass("glyphicon-minus-sign");
            row.child(
                this.compile(
                    "<div childrow type='" + type + "' class='clearfix'></div>")(
                    childScope)).show();
            tr.addClass("shown");
        }
    }

    selectCustomer(customer: Customer): Customer {
        if (isNullOrUndefined(customer) || isNullOrUndefined(Number(customer.id))) {
            return new Customer();
        }
        let temp: Customer = findElementById(this.customerService.searchCustomers, Number(customer.id)) as Customer;
        if (isNullOrUndefined(temp) || isNullOrUndefined(Number(temp.id))) {
            return new Customer();
        }
        return deepCopy(temp);
    }

    refreshUsers(): void {
        this.userResource.getAll().$promise.then((data) => {
            this.users = data;
        }, (error) => handleError(error));

    }

    deletProcess(process): IPromise<any> {
        let defer = this.$q.defer();
        if (isNullOrUndefined(process)) {
            defer.reject("null or undefined");
            return defer.promise;
        }
        let self = this;
        this.processResource.drop({
            id: process.id
        }).$promise.then(function (data) {
            defer.resolve(data);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    }

    saveProcess(process): IPromise<Process> {
        let defer = this.$q.defer();
        if (isNullOrUndefined(process)) {
            defer.reject("null or undefined");
            return defer.promise;
        }
        let self = this;
        this.processResource.update(process).$promise.then(function (data) {
            defer.resolve(data);
        }, function (error) {
            defer.reject(error);
            handleError(error);
        });
        return defer.promise;
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
            this.processResource.setProcessor({
                id: process.id
            }, user.id).$promise.then(() => {
                process.processor = user;
                self.rootScope.$broadcast("updateRow", process);
                self.rootScope.$broadcast("onTodosChange");
            }, (error) => handleError(error));
        } else if (process.processor !== null) {
            this.processResource.removeProcessor({
                id: process.id
            }).$promise.then(function () {
                process.processor = null;
                self.rootScope.$broadcast("updateRow", process);
                self.rootScope.$broadcast("onTodosChange");
            }, (error) => handleError(error));
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
        let resultProcess = await this.processResource.save(process) as Process;
        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_INCONTACT"));
        this.rootScope.$broadcast("onTodosChange");
        // TODO process vs resultProcess
        this.rootScope.$broadcast("updateRow", resultProcess);
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
        let resultProcess = await this.processResource.save(process) as Process;
        this.toaster.pop("success", "", this.translate.instant(toastMsg));
        this.rootScope.$broadcast("onTodosChange");
        this.rootScope.$broadcast("updateRow", process);
        return resultProcess;
    }

    setProcessStatus(process: Process, status: Status): IPromise<Process> {
        let defer: IDefer<Process> = this.$q.defer();
        let self = this;
        this.processResource.setStatus({
            id: process.id
        }, status).$promise.then((process: Process) => {
            defer.resolve(process);
        }, (error) => {
            handleError(error);
            defer.reject(error);
        });
        return defer.promise;
    }

    toggleClosedOrOpenState(process: Process): void {
        let self = this;
        if (process.status !== Status.CLOSED) {
            this.setProcessStatus(process, Status.CLOSED).then((process: Process) => {
                self.rootScope.offersCount -= 1;
                process.status = Status.CLOSED;
                self.rootScope.$broadcast("deleteRow", process);
            });
        } else if (isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)) {
            this.setProcessStatus(process, Status.OPEN).then((process: Process) => {
                self.rootScope.leadsCount += 1;
                process.status = Status.OPEN;
                self.rootScope.$broadcast("updateRow", process);
            });
        } else if (!isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)) {
            this.setProcessStatus(process, Status.OFFER).then((process: Process) => {
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





}
angular.module(moduleWorkflowService, [ngResourceId]).service(WorkflowServiceId, WorkflowService);
