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
/// <reference path="../../Common/model/Workflow.Model.ts" />
/// <reference path="../../Common/service/AbstractWorkflow.ts" />
/// <reference path="../../Common/service/Workflow.Controller.ts" />
/// <reference path="../../Dashboard/controller/Dashboard.Controller.ts" />
/// <reference path="../../Customer/controller/Customer.Service.ts" />

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

    private $inject = [CommentResourceId, ProcessResourceId, $filterId, toasterId, $rootScopeId, $translateId, $compileId, $qId, ProductServiceId, CustomerServiceId, $uibModalId, UserResourceId];

    commentResource;
    processResource;
    userResource;

    filter;
    toaster;
    rootScope;
    translate;
    compile;
    $q;
    productService: ProductService;
    customerService: CustomerService;
    uibModal;
    users: Array<User> = [];

    user: User;

    constructor(CommentResource, ProcessResource, $filter, toaster, $rootScope, $translate, $compile, $q, ProductService, CustomerService, $uibModal, UserResource) {
        this.commentResource = CommentResource.resource;
        this.processResource = ProcessResource.resource;
        this.userResource = UserResource.resource;
        this.filter = $filter;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.compile = $compile;
        this.$q = $q;
        this.productService = ProductService;
        this.customerService = CustomerService;
        this.uibModal = $uibModal;
        this.user = $rootScope.globals.user;
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
            creator: this.user,
            commentText: commentText,
            timestamp: newTimestamp("DD.MM.YYYY HH:mm:ss"),
        };

        this.commentResource.save({ id: process.id }, comment).$promise.then(function () {
            let timestamp = toLocalDate(comment.timestamp, "DD.MM.YYYY HH:mm:ss");
            comment.timestamp = timestamp;
            process.comments.push(comment);
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

    addLeadToOffer(process: Process): IPromise<Process> {
        let defer = this.$q.defer();
        let self = this;
        let offer: Offer = {
            id: 0,
            orderPositions: deepCopy(process.lead.orderPositions),
            deliveryAddress: process.lead.deliveryAddress,
            deliveryDate: null,
            offerPrice: self.sumOrderPositions(process.lead.orderPositions) + process.lead.deliveryCosts,
            customer: process.lead.customer,
            timestamp: newTimestamp(),
            vendor: process.lead.vendor,
            deliveryCosts: process.lead.deliveryCosts
        };
        for (let i = 0; i < offer.orderPositions.length; i++) {
            offer.orderPositions[i].id = 0;
        }

        this.processResource.createOffer({ id: process.id }, offer).$promise.then(function (resultOffer: Offer) {

            self.processResource.setStatus({ id: process.id }, Status.OFFER).$promise.then(function (resultProcess: Process) {
                self.toaster.pop("success", "", self.translate.instant("COMMON_TOAST_SUCCESS_NEW_OFFER"));
                self.rootScope.leadsCount -= 1;
                self.rootScope.offersCount += 1;
                if (resultProcess.processor === null) {
                    self.processResource.setProcessor({ id: resultProcess.id }, self.user.id).$promise.then(function (resultUser: User) {
                        process.processor = resultUser;
                    }, function (resultUser: User) {

                    });
                }

                process.offer = resultOffer;
                process.status = resultProcess.status;

                defer.resolve(process);
            }, function () {
                defer.reject(false);
            });
        }, function () {
            defer.reject(false);
        });
        return defer.promise;
    }

    addOfferToSale(process: Process): IPromise<boolean> {
        let defer = this.$q.defer();
        let self = this;
        let sale: Sale = {
            id: 0,
            deliveryAddress: process.offer.deliveryAddress,
            deliveryDate: process.offer.deliveryDate,
            orderPositions: deepCopy(process.lead.orderPositions),
            transport: process.offer.deliveryAddress,
            customer: process.offer.customer,
            saleProfit: 0,
            saleReturn: process.offer.offerPrice,
            timestamp: newTimestamp(),
            vendor: process.offer.vendor,
            deliveryCosts: process.offer.deliveryCosts
        };
        for (let i = 0; i < sale.orderPositions.length; i++) {
            sale.orderPositions[i].id = 0;
        }
        this.processResource.createSale({ id: process.id }, sale).$promise.then(function () {
            self.processResource.setStatus({ id: process.id }, Status.SALE).$promise.then(function () {
                self.toaster.pop("success", "", self.translate.instant("COMMON_TOAST_SUCCESS_NEW_SALE"));
                self.rootScope.offersCount -= 1;
                self.processResource.setProcessor({ id: process.id }, self.user.id).$promise.then(function () {
                    process.processor = self.user;
                });
                process.sale = sale;
                process.status = Status.SALE;
                defer.resolve(true);
            }, function () {
                defer.reject(false);
            });
        }, function () {
            defer.reject(false);
        });
        return defer.promise;
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
            searchDelay = 500;
        }
        dtOptions.withOption("serverSide", loadAllData)
            .withOption("ajax", this.getData(loadAllData, allDataRoute, latestDataRoute))
            .withOption("searchDelay", searchDelay);
    }

    getData(loadAllData: boolean, allDataRoute: string, latestDataRoute: string): any {
        if (loadAllData === true) {
            return {
                url: allDataRoute,
                type: "GET",
                pages: 5,
                dataSrc: "data",
                error: function (xhr, error, thrown) {
                    console.log(xhr);
                }
            };
        } else {
            return {
                url: latestDataRoute,
                error: function (xhr, error, thrown) {
                    console.log(xhr);
                },
                type: "GET"
            };
        }
    }

    appendChildRow(childScope: any, process: Process, workflowUnit: IWorkflow, dtInstance: any, parent: AbstractWorkflow, type: string) {
        childScope.workflowUnit = workflowUnit;
        childScope.process = process;
        childScope.parent = parent;
        childScope.type = type;

        let link = angular.element(event.currentTarget), icon = link
            .find(".glyphicon"), tr = link.parent().parent(), table = dtInstance.DataTable, row = table
                .row(tr);

        if (row.child.isShown()) {
            icon.removeClass("glyphicon-minus-sign")
                .addClass("glyphicon-plus-sign");
            row.child.hide();
            tr.removeClass("shown");
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
        let temp: Customer = findElementById(this.customerService.customers, Number(currentCustomerId)) as Customer;
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
        }, (error) => console.log(error));

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
        this.processResource.drop({
            id: process.id
        }).$promise.then(function (data) {
            defer.resolve(data);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    }
}
angular.module(moduleWorkflowService, [ngResourceId]).service(WorkflowServiceId, WorkflowService);
