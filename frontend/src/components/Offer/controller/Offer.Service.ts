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

    $inject = [$rootScopeId, $translateId, $filterId, toasterId, $compileId, ProcessResourceId, CustomerResourceId, OfferResourceId, WorkflowServiceId, CustomerServiceId, ProductServiceId, DashboardServiceId, TemplateServiceId];
    processResource;
    customerResource;
    offerResource;

    workflowService: WorkflowService;
    customerService: CustomerService;
    productService: ProductService;
    dashboardService: DashboardService;
    templateService;

    translate;
    rootScope;
    filter;
    toaster;
    compile;

    rows: { [key: number]: any } = {};
    user: User;

    constructor($rootScope, $translate, $filter, toaster, $compile, ProcessResource, CustomerResource, OfferResource, WorkflowService, CustomerService, ProductService, DashboardService, TemplateService) {
        this.templateService = TemplateService;
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
        this.dashboardService = DashboardService;
        this.user = $rootScope.globals.user;
    }

    createSale(process: Process, loadAllData: boolean, dtInstance: any, scope: any) {
        let self = this;
        this.workflowService.addOfferToSale(process).then(function(isResolved: boolean) {
            if (loadAllData === true) {
                self.updateRow(process, loadAllData, scope);
            } else if (loadAllData === false) {
                dtInstance.DataTable.row(self.rows[process.id]).remove()
                    .draw();
            }
            self.rootScope.$broadcast("onTodosChange");
        });
    }


    followUp(process: Process, dtInstance: any, scope: any) {
        let self = this;
        this.processResource.setStatus({
            id: process.id
        }, "FOLLOWUP").$promise.then(function() {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_FOLLOW_UP"));
            process.status = "FOLLOWUP";
            self.updateRow(process, dtInstance, scope);
            self.rootScope.$broadcast("onTodosChange");
        });

    }


    closeOrOpenOffer(process: Process, dtInstance: any, scope: any, loadAllData: boolean) {
        let self = this;
        if (process.status === "OFFER" || process.status === "FOLLOWUP") {
            this.processResource.setStatus({
                id: process.id
            }, "CLOSED").$promise.then(function() {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_CLOSE_OFFER"));
                self.rootScope.offersCount -= 1;
                process.status = "CLOSED";
                self.removeOrUpdateRow(process, loadAllData, dtInstance, scope);
            });
        } else if (process.status === "CLOSED") {
            this.processResource.setStatus({
                id: process.id
            }, "OFFER").$promise.then(function() {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_OPEN_OFFER"));
                self.rootScope.offersCount += 1;
                process.status = "OFFER";
                self.updateRow(process, dtInstance, scope);
            });
        }
    }

    saveEditedRow(editOffer: Offer, editProcess: Process, currentOrderPositions: Array<OrderPosition>, dtInstance: any, scope: any) {
        let self = this;
        shallowCopy(editOffer, editProcess.offer);
        editProcess.offer.orderPositions = currentOrderPositions;

        let temp: Offer = editProcess.offer;
        if (isNullOrUndefined(temp.customer.id) || isNaN(Number(temp.customer.id)) || Number(temp.customer.id) <= 0) {
            temp.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(temp.customer).$promise.then(function(customer) {
                temp.customer = customer;
                self.processResource.save(editProcess).$promise.then(function(result) {
                    self.updateRow(editProcess, dtInstance, scope);
                    self.customerService.getAllCustomer();
                    if (!isNullOrUndefined(editProcess.processor) && editProcess.processor.id === Number(self.rootScope.globals.user.id)) {
                        self.rootScope.$broadcast("onTodosChange");
                    }
                });
            });
            return;
        }

        this.offerResource.update(editProcess.offer).$promise.then(function(result) {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_UPDATE_OFFER"));
            editProcess.offer = result;
            self.updateRow(editProcess, dtInstance, scope);
            if (!isNullOrUndefined(editProcess.processor) && editProcess.processor.id === Number(self.rootScope.globals.user.id)) {
                self.rootScope.$broadcast("onTodosChange");
            }
        });
    }

    save(editOffer: Offer, editProcess: Process, currentOrderPositions: Array<OrderPosition>) {
        let self = this;
        shallowCopy(editOffer, editProcess.offer);
        editProcess.offer.orderPositions = currentOrderPositions;

        let temp: Offer = editProcess.offer;
        if (isNullOrUndefined(temp.customer.id) || isNaN(Number(temp.customer.id)) || Number(temp.customer.id) <= 0) {
            temp.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(temp.customer).$promise.then(function(customer) {
                temp.customer = customer;
                self.processResource.save(editProcess).$promise.then(function(result) {
                    self.customerService.getAllCustomer();
                    if (!isNullOrUndefined(editProcess.processor) && editProcess.processor.id === Number(self.rootScope.globals.user.id)) {
                        self.rootScope.$broadcast("onTodosChange");
                    }
                });
            });
            return;
        }

        this.offerResource.update(editProcess.offer).$promise.then(function(result) {
            self.toaster.pop("success", "", self.translate.instant("COMMON_TOAST_SUCCESS_UPDATE_OFFER"));
            editProcess.offer = result;
            if (!isNullOrUndefined(editProcess.processor) && editProcess.processor.id === Number(self.rootScope.globals.user.id)) {
                self.rootScope.$broadcast("onTodosChange");
            }
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

    removeOrUpdateRow(process: Process, loadAllData: boolean, dtInstance: any, scope: any) {
        if (loadAllData === true) {
            this.updateRow(process, dtInstance, scope);
        } else if (loadAllData === false) {
            dtInstance.DataTable.row(this.rows[process.id]).remove()
                .draw();
        }
    }

    pin(process: Process, dtInstance: any, scope: any, user: User) {
        let self = this;
        if (user !== null) {
            this.processResource.setProcessor({
                id: process.id
            }, user.id).$promise.then(function() {
                process.processor = user;
                self.updateRow(process, dtInstance, scope);
                self.rootScope.$broadcast("onTodosChange");
            });
        } else if (process.processor !== null) {
            this.processResource.removeProcessor({
                id: process.id
            }).$promise.then(function() {
                process.processor = null;
                self.updateRow(process, dtInstance, scope);
                self.rootScope.$broadcast("onTodosChange");
            });
        }
    }

    rollBack(process: Process, dtInstance: any, scope: any): void {
        if (isNullOrUndefined(process)) {
            return;
        }
        let offer = process.offer;
        process.offer = null;
        process.status = Status.OPEN;
        let self = this;
        this.processResource.save(process).$promise.then(function(result) {
            self.offerResource.drop({
                id: offer.id
            }).$promise.then(() => { dtInstance.DataTable.row(self.rows[process.id]).remove().draw(); self.rootScope.leadsCount += 1; self.rootScope.offersCount -= 1; });
        });
    }

    deleteRow(process: Process, dtInstance: any): void {
        let self = this;
        this.workflowService.deletProcess(process).then((data) => {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_DELETE_OFFER"));
            self.rootScope.offersCount -= 1;
            dtInstance.DataTable.row(self.rows[process.id]).remove().draw();
            self.rootScope.$broadcast("onTodosChange");
        }, (error) => {
            self.toaster.pop("error", "", self.translate
                .instant("COMMON_TOAST_FAILURE_DELETE_OFFER"));
        });
    }
}

angular.module(moduleOfferService, [ngResourceId]).service(OfferServiceId, OfferService);