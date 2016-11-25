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
/// <reference path="../../Common/model/Workflow.Model.ts" />
/// <reference path="../../Common/service/AbstractWorkflow.ts" />
/// <reference path="../../Common/service/Workflow.Controller.ts" />
/// <reference path="../../Lead/controller/Lead.Controller.ts" />
/// <reference path="../../Offer/controller/Offer.Controller.ts" />
/// <reference path="../../Sale/controller/Sale.Controller.ts" />
/// <reference path="../../Dashboard/controller/Dashboard.Controller.ts" />
/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="./FollowUp.Controller.ts" />

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
        UserResourceId, TemplateServiceId, NotificationServiceId, FileServiceId];

    commentResource;
    processResource;
    userResource;
    templateService;

    toaster;
    rootScope;
    translate;
    compile;
    $q;
    productService: ProductService;
    customerService: CustomerService;
    uibModal;
    users: Array<User> = [];

    constructor(CommentResource, ProcessResource, toaster, $rootScope, $translate, $compile, $q, ProductService, CustomerService, $uibModal, UserResource, TemplateService, private NotificationService, private FileService) {
        this.commentResource = CommentResource.resource;
        this.processResource = ProcessResource.resource;
        this.userResource = UserResource.resource;
        this.templateService = TemplateService;
        this.toaster = toaster;
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
            tempOrderPosition.price = tempOrderPosition.product.priceNetto;
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
                && !isNaN(temp.price)) {
                sum += temp.amount * temp.price;
            }
        }
        return sum;
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
                && !isNaN(temp.product.priceNetto)) {
                sum += temp.amount * temp.product.priceNetto;
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
        offer.offerPrice = offer.deliveryCosts + this.sumOrderPositions(array);
    }

    setDiscount(orderPosition: OrderPosition) {
        orderPosition.discount = this.calculateDiscount(orderPosition.product.priceNetto, orderPosition.price);
    }

    setPrice(orderPosition: OrderPosition) {
        orderPosition.price = this.calculatePrice(orderPosition.product.priceNetto, orderPosition.discount);
    }


    startOfferTransformation(process: Process): IPromise<Process> {
        let defer = this.$q.defer();
        let self = this;
        process.offer = {
            id: null,
            orderPositions: deepCopy(process.lead.orderPositions),
            deliveryAddress: process.lead.deliveryAddress,
            deliveryDate: null,
            offerPrice: self.sumOrderPositions(process.lead.orderPositions) + process.lead.deliveryCosts,
            customer: process.lead.customer,
            vat: self.rootScope.user.defaultVat,
            timestamp: newTimestamp(),
            vendor: process.lead.vendor,
            deliveryCosts: process.lead.deliveryCosts,
            message: process.lead.message
        };
        for (let i = 0; i < process.offer.orderPositions.length; i++) {
            process.offer.orderPositions[i].id = 0;
        }

        this.uibModal.open({
            template: " <div sendworkflow parent='workflowCtrl' type='offer'></div>",
            controller: WorkflowController,
            controllerAs: "workflowCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function () {
                    return process;
                }, type: function (): string {
                    return "offer";
                }
            }
        }).result.then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.resolve(undefined);
        });
        return defer.promise;
    }


    startSaleTransformation(process: Process): IPromise<boolean> {
        let defer = this.$q.defer();
        let self = this;
        process.sale = {
            id: null,
            deliveryAddress: process.offer.deliveryAddress,
            deliveryDate: process.offer.deliveryDate,
            orderPositions: deepCopy(process.offer.orderPositions),
            transport: process.offer.deliveryAddress,
            customer: process.offer.customer,
            saleProfit: process.offer.offerPrice,
            saleCost: 0,
            saleTurnover: process.offer.offerPrice,
            invoiceNumber: "",
            timestamp: newTimestamp(),
            vendor: process.offer.vendor,
            deliveryCosts: process.offer.deliveryCosts,
            message: process.offer.message
        };
        for (let i = 0; i < process.sale.orderPositions.length; i++) {
            process.sale.orderPositions[i].id = 0;
        }

        this.uibModal.open({
            template: " <div sendworkflow parent='workflowCtrl' type='sale'></div>",
            controller: WorkflowController,
            controllerAs: "workflowCtrl",
            backdrop: "static",
            size: "lg",
            resolve: {
                process: function (): Process {
                    return process;
                }, type: function (): string {
                    return "sale";
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
        let process = await this.processResource.save(tempProcess);
        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_NEW_OFFER"));
        this.rootScope.leadsCount -= 1;
        this.rootScope.offersCount += 1;
        this.rootScope.$broadcast("onTodosChange");
        return process;
    }

    async addOfferToSale(tempProcess: Process): Promise<Process> {
        tempProcess.formerProcessors = tempProcess.formerProcessors ? tempProcess.formerProcessors : [];
        if (!this.checkForDupsInFormerProcessors(tempProcess.formerProcessors, this.rootScope.user, Activity.SALE)) {
            tempProcess.formerProcessors.push(new Processor(this.rootScope.user, Activity.SALE));
        }
        tempProcess.status = Status.SALE;
        tempProcess.processor = this.rootScope.user;
        let process: Process = await this.processResource.save(tempProcess);
        let customer: Customer = process.offer.customer;
        if (!customer.realCustomer) {
            customer.realCustomer = true;
            let updatedCustomer: Customer = await this.customerService.updateCustomer(customer);
            process.offer.customer = updatedCustomer;
        }
        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_NEW_SALE"));
        this.rootScope.offersCount -= 1;
        this.rootScope.$broadcast("onTodosChange");
        return process;
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

    appendChildRow(childScope: any, process: Process, workflowUnit: IWorkflow, dtInstance: any, parent: AbstractWorkflow, type: string) {
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

    selectCustomer(workflow: any, currentCustomerId: string): boolean {
        if (isNullOrUndefined(Number(currentCustomerId)) || Number(currentCustomerId) <= 0) {
            workflow.customer = new Customer();
            workflow.customer.id = 0;
            return false;
        }
        let temp: Customer = findElementById(this.customerService.searchCustomers, Number(currentCustomerId)) as Customer;
        if (isNullOrUndefined(temp)) {
            workflow.customer = new Customer();
            workflow.customer.id = 0;
            return false;
        }
        workflow.customer = deepCopy(temp);
        return true;
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
        this.rootScope.$broadcast("updateRow", process);
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
