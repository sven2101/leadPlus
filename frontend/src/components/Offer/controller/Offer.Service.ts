/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../User/Model/User.Model.ts" />
/// <reference path="../../Common/model/OrderPosition.Model.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../common/service/Workflow.Service.ts" />
/// <reference path="../../Customer/Controller/Customer.Service.ts" />
/// <reference path="../../Product/Controller/Product.Service.ts" />
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

const OfferServiceId: string = "OfferService";

class OfferService {

    $inject = [$rootScopeId, $translateId, $filterId, toasterId, $compileId, ProcessResourceId, CustomerResourceId, OfferResourceId, WorkflowServiceId, CustomerServiceId, ProductServiceId];
    processResource;
    customerResource;
    offerResource;
    workflowService: WorkflowService;
    customerService: CustomerService;
    productService: ProductService;
    translate;
    rootScope;
    filter;
    toaster;
    compile;

    rows: { [key: number]: any } = {};
    user: User;

    constructor($rootScope, $translate, $filter, toaster, $compile, ProcessResource, CustomerResource, OfferResource, WorkflowService, CustomerService, ProductService) {
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.filter = $filter;
        this.toaster = toaster;
        this.compile = $compile;
        this.processResource = ProcessResource.resource;
        this.customerResource = CustomerResource.resource;
        this.offerResource = OfferResource.resource;
        this.workflowService = WorkflowService;
        this.customerService = CustomerService;
        this.productService = ProductService;
        this.user = $rootScope.currentUser;
    }

    createSale(process: Process, loadAllData: boolean, dtInstance: any, scope: any) {
        let self = this;
        this.workflowService.addOfferToSale(process).then(function (isResolved: boolean) {
            if (loadAllData === true) {
                self.updateRow(process, loadAllData, scope);
            } else if (loadAllData === false) {
                dtInstance.DataTable.row(self.rows[process.id]).remove()
                    .draw();
            }
            self.rootScope.$broadcast("onTodosChange");
        });
    }


    followUp(process: Process, loadAllData: boolean, scope: any) {
        let self = this;
        this.processResource.setStatus({
            id: process.id
        }, "FOLLOWUP").$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_FOLLOW_UP"));
            process.status = "FOLLOWUP";
            self.updateRow(process, loadAllData, scope);
            self.rootScope.$broadcast("onTodosChange");
        });

    }


    closeOrOpenOffer(process: Process, dtInstance: any, scope: any) {
        let self = this;
        if (process.status === "OFFER" || process.status === "FOLLOWUP") {
            this.processResource.setStatus({
                id: process.id
            }, "CLOSED").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_CLOSE_OFFER"));
                self.rootScope.offersCount -= 1;
                process.status = "CLOSED";
                self.updateRow(process, dtInstance, scope);
            });
        } else if (process.status === "CLOSED") {
            this.processResource.setStatus({
                id: process.id
            }, "OFFER").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_OPEN_OFFER"));
                self.rootScope.offersCount += 1;
                process.status = "OFFER";
                self.updateRow(process, dtInstance, scope);
            });
        }
    }

    saveEditedRow(editOffer: Offer, editProcess: Process, currentOrderPositions: Array<OrderPosition>, dtInstance: any, scope: any, editForm: any) {
        let self = this;
        shallowCopy(editOffer, editProcess.offer);
        editProcess.offer.orderPositions = currentOrderPositions;

        let temp: Offer = editProcess.offer;
        if (isNullOrUndefined(temp.customer.id) || isNaN(Number(temp.customer.id)) || Number(temp.customer.id) <= 0) {
            temp.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(temp.customer).$promise.then(function (customer) {
                temp.customer = customer;

                self.processResource.save(editProcess).$promise.then(function (result) {
                    editForm.$setPristine();
                    self.updateRow(editProcess, dtInstance, scope);
                    self.customerService.getAllCustomer();

                });
            });
            return;
        }

        this.offerResource.update(editProcess.offer).$promise.then(function (result) {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_UPDATE_OFFER"));
            editForm.$setPristine();
            editProcess.offer = result;
            self.updateRow(editProcess, dtInstance, scope);
            if (!isNullOrUndefined(editProcess.processor) && editProcess.processor.id === Number(self.rootScope.globals.user.id)) {
                self.rootScope.$broadcast("onTodosChange");
            }
        });
    }

    deleteRow(process: Process, dtInstance: any) {
        let self = this;
        let offerId = process.offer.id;
        if (process.sale !== null) {
            self.toaster.pop("error", "", self.translate
                .instant("COMMON_TOAST_FAILURE_DELETE_OFFER"));
            return;
        }
        process.offer = null;
        this.processResource.update(process).$promise.then(function () {
            if (process.lead === null && process.sale === null) {
                self.processResource.drop({
                    id: process.id
                });
            }
            self.offerResource.drop({
                id: offerId
            }).$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_DELETE_OFFER"));
                self.rootScope.offersCount -= 1;
                dtInstance.DataTable.row(self.rows[process.id]).remove().draw();
                self.rootScope.$broadcast("onTodosChange");
            });
        });
    }

    setRow(id: number, row: any) {
        this.rows[id] = row;
    }

    updateRow(process: Process, dtInstance: any, scope: any) {
        dtInstance.DataTable.row(this.rows[process.id]).data(process).draw(
            false);
        this.compile(angular.element(this.rows[process.id]).contents())(scope);

    }

    pin(process: Process, dtInstance: any, scope: any, user: User) {
        let self = this;
        if (user !== null) {
            this.processResource.setProcessor({
                id: process.id
            }, user.id).$promise.then(function () {
                process.processor = user;
                self.updateRow(process, dtInstance, scope);
                self.rootScope.$broadcast("onTodosChange");
            });
        } else if (process.processor !== null) {
            this.processResource.removeProcessor({
                id: process.id
            }).$promise.then(function () {
                process.processor = null;
                self.updateRow(process, dtInstance, scope);
                self.rootScope.$broadcast("onTodosChange");
            });
        }
    }
}

angular.module(moduleOfferService, [ngResourceId]).service(OfferServiceId, OfferService);