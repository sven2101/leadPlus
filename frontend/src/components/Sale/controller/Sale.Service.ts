/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../User/Model/User.Model.ts" />
/// <reference path="../../Common/model/OrderPosition.Model.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
/// <reference path="../../Sale/model/Sale.Model.ts" />
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

const SaleServiceId: string = "SaleService";

class SaleService {

    $inject = [$rootScopeId, $translateId, $filterId, toasterId, $compileId, ProcessResourceId, CustomerResourceId, SaleResourceId, WorkflowServiceId, CustomerServiceId, ProductServiceId, TemplateServiceId, $qId];
    processResource;
    customerResource;
    saleResource;
    workflowService: WorkflowService;
    customerService: CustomerService;
    productService: ProductService;
    templateService: TemplateService;
    translate;
    rootScope;
    filter;
    toaster;
    compile;
    $q;

    rows: { [key: number]: any } = {};
    user: User;

    constructor($rootScope, $translate, $filter, toaster, $compile, ProcessResource, CustomerResource, SaleResource, WorkflowService, CustomerService, ProductService, TemplateService, $q) {
        this.templateService = TemplateService;
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.filter = $filter;
        this.toaster = toaster;
        this.compile = $compile;
        this.processResource = ProcessResource.resource;
        this.customerResource = CustomerResource.resource;
        this.saleResource = SaleResource.resource;
        this.workflowService = WorkflowService;
        this.customerService = CustomerService;
        this.productService = ProductService;
        this.user = $rootScope.globals.user;
        this.$q = $q;
    }

    save(editSale: Sale, editProcess: Process, currentOrderPositions: Array<OrderPosition>, dtInstance: any, scope: any) {
        let self = this;
        shallowCopy(editSale, editProcess.sale);
        editProcess.sale.orderPositions = currentOrderPositions;

        let temp: Sale = editProcess.sale;
        if (isNullOrUndefined(temp.customer.id) || isNaN(Number(temp.customer.id)) || Number(temp.customer.id) <= 0) {
            temp.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(temp.customer).$promise.then(function (customer) {
                temp.customer = customer;

                self.processResource.save(editProcess).$promise.then(function (result) {
                    self.updateRow(editProcess, dtInstance, scope);
                    self.customerService.getAllCustomer();
                });
            });
            return;
        }

        this.processResource.save(editProcess).$promise.then(function (result) {
            self.toaster.pop("success", "", self.translate.instant("COMMON_TOAST_SUCCESS_UPDATE_SALE"));
            editProcess.sale = result;
            self.updateRow(editProcess, dtInstance, scope);
        });
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

    getSaleByInvoiceNumber(invoiceNumber: string): IPromise<Sale> {
        let defer = this.$q.defer();
        this.saleResource.getByinvoiceNumber({}, invoiceNumber).$promise.then(function (result) {
            if (isNullOrUndefined(result.id)) {
                defer.resolve(null);
            }
            else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }

    setRow(id: number, row: any) {
        this.rows[id] = row;
    }

    updateRow(process: Process, dtInstance: any, scope: any) {
        dtInstance.DataTable.row(this.rows[process.id]).data(process).draw(
            false);
        this.compile(angular.element(this.rows[process.id]).contents())(scope);
    }

    rollBack(process: Process, dtInstance: any, scope: any): void {
        if (isNullOrUndefined(process)) {
            return;
        }
        let sale = process.sale;
        process.sale = null;
        process.status = Status.OFFER;
        let self = this;
        this.processResource.save(process).$promise.then(function (result) {
            self.saleResource.drop({
                id: sale.id
            }).$promise.then(() => { dtInstance.DataTable.row(self.rows[process.id]).remove().draw(); self.rootScope.offersCount += 1; });
        });
    }
    deleteRow(process: Process, dtInstance: any): void {
        let self = this;
        this.workflowService.deletProcess(process).then((data) => {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_DELETE_SALE"));
            dtInstance.DataTable.row(self.rows[process.id]).remove().draw();
            self.rootScope.$broadcast("onTodosChange");
        }, (error) => {
            self.toaster.pop("error", "", self.translate
                .instant("COMMON_TOAST_FAILURE_DELETE_SALE"));
        });
    }


}

angular.module(moduleSaleService, [ngResourceId]).service(SaleServiceId, SaleService);