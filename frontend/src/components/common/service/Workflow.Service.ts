/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../common/model/OrderPosition.Model.ts" />
/// <reference path="../../common/model/Commentary.Model.ts" />
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

    private $inject = [CommentResourceId, ProcessResourceId, $filterId, toasterId, $rootScopeId, $translateId, $qId, ProductServiceId];
    commentResource;
    processResource;
    filter;
    toaster;
    rootScope;
    translate;
    $q;
    productService: ProductService;

    constructor(CommentResource, ProcessResource, $filter, toaster, $rootScope, $translate, $q, ProductService) {
        this.commentResource = CommentResource.resource;
        this.processResource = ProcessResource.resource;
        this.filter = $filter;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.$q = $q;
        this.productService = ProductService;
    }

    addComment(comments: Array<Commentary>, process: Process, user: User, commentText: string): any {
        let defer = this.$q.defer();
        if (angular.isUndefined(commentText) || commentText === "") {
            defer.reject(false);
            return defer.promise;
        }
        let self: WorkflowService = this;
        let comment: Commentary = {
            id: null,
            process: process,
            creator: user,
            commentText: commentText,
            timestamp: moment.utc().format("DD.MM.YYYY HH:mm"),
        };
        this.commentResource.save(comment).$promise.then(function () {
            comments.push(comment);
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
                comments.push(comment);
            }
        });
        return comments;
    }

    addProduct(array, currentProductId, currentProductAmount) {
        if (!isNaN(Number(currentProductId))
            && Number(currentProductId) > 0) {
            let tempProduct = findElementById(this.productService.products,
                Number(currentProductId));
            let tempOrderPosition = new OrderPosition();
            tempOrderPosition.product = tempProduct as Product;
            tempOrderPosition.amount = currentProductAmount;
            array.push(tempOrderPosition);
        }
    }
    deleteProduct(array, index) {
        array.splice(index, 1);
    }
    sumOrderPositions(array) {
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

    addLeadToOffer(process: Process, user: User): any {
        let defer = this.$q.defer();
        let self = this;
        let offer: Offer = {
            id: 0,
            container: {
                name: "",
                description: "",
                priceNetto: 0
            },
            orderPositions: deepCopy(process.lead.orderPositions),
            containerAmount: process.lead.containerAmount,
            deliveryAddress: process.lead.deliveryAddress,
            deliveryDate: null,
            offerPrice: self.sumOrderPositions(process.lead.orderPositions),
            customer: process.lead.customer,
            timestamp: moment.utc().format("DD.MM.YYYY HH:mm"),
            vendor: process.lead.vendor
        };
        for (let i = 0; i < offer.orderPositions.length; i++) {
            offer.orderPositions[i].id = 0;
        }
        this.processResource.createOffer({
            id: process.id
        }, offer).$promise.then(function () {
            self.processResource.setStatus({
                id: process.id
            }, "OFFER").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_NEW_OFFER"));
                self.rootScope.leadsCount -= 1;
                self.rootScope.offersCount += 1;
                if (process.processor === null) {
                    self.processResource.setProcessor({
                        id: process.id
                    }, user.id).$promise.then(function () {
                        process.processor = user;
                    });
                }
                process.offer = offer;
                process.status = "OFFER";
                defer.resolve(true);
            }, function () {
                defer.reject(false);
            });
        }, function () {
            defer.reject(false);
        });
        return defer.promise;
    }

    addOfferToSale(process: Process, user: User): any {
        let defer = this.$q.defer();
        let self = this;
        let sale: Sale = {
            id: 0,
            deliveryAddress: process.offer.deliveryAddress,
            deliveryDate: process.offer.deliveryDate,
            container: {
                name: "",
                description: "",
                priceNetto: 0
            },
            orderPositions: deepCopy(process.lead.orderPositions),
            containerAmount: process.offer.containerAmount,
            transport: process.offer.deliveryAddress,
            customer: process.offer.customer,
            saleProfit: 0,
            saleReturn: process.offer.offerPrice,
            timestamp: moment.utc().format("DD.MM.YYYY HH:mm"),
            vendor: process.offer.vendor
        };
        for (let i = 0; i < sale.orderPositions.length; i++) {
            sale.orderPositions[i].id = 0;
        }
        this.processResource.createSale({
            id: process.id
        }, sale).$promise.then(function () {
            self.processResource.setStatus({
                id: process.id
            }, "SALE").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_NEW_SALE"));
                self.rootScope.offersCount -= 1;
                self.processResource.setProcessor({
                    id: process.id
                }, user.id).$promise.then(function () {
                    process.processor = user;
                });
                process.sale = sale;
                process.status = "SALE";
                defer.resolve(true);
            }, function () {
                defer.reject(false);
            });
        }, function () {
            defer.reject(false);
        });
        return defer.promise;
    }
}
angular.module(moduleWorkflowService, [ngResourceId]).service(WorkflowServiceId, WorkflowService);