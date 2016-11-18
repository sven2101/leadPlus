/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../User/Model/User.Model.ts" />
/// <reference path="../../Common/model/OrderPosition.Model.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
/// <reference path="../../Lead/model/Lead.Model.ts" />
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

const LeadServiceId: string = "LeadService";

class LeadService {

    $inject = [$qId, $rootScopeId, $translateId, toasterId, $compileId, ProcessResourceId, CustomerResourceId, LeadResourceId, WorkflowServiceId, CustomerServiceId, ProductServiceId, TemplateServiceId, SourceServiceId];
    processResource;
    customerResource;
    leadResource;
    workflowService: WorkflowService;
    customerService: CustomerService;
    productService: ProductService;
    sourceService: SourceService;
    translate;
    rootScope;
    toaster;
    compile;
    templateService;
    q;
    rows: { [key: number]: any } = {};

    constructor($q, $rootScope, $translate, toaster, $compile, ProcessResource, CustomerResource, LeadResource, WorkflowService, CustomerService, ProductService, TemplateService, SourceService) {
        this.q = $q;
        this.templateService = TemplateService;
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.toaster = toaster;
        this.compile = $compile;
        this.processResource = ProcessResource.resource;
        this.customerResource = CustomerResource.resource;
        this.leadResource = LeadResource.resource;
        this.workflowService = WorkflowService;
        this.customerService = CustomerService;
        this.productService = ProductService;
        this.sourceService = SourceService;
    }

    saveLead(dtInstance: any, newLead: Lead, source: Source): Promise<Process> {
        let defer: IDefer<Process> = this.q.defer();
        let self = this;
        if (angular.isUndefined(newLead.customer)) {
            newLead.customer = new Customer();
            newLead.customer.title = "UNKNOWN";
        }
        newLead.timestamp = newTimestamp();
        newLead.vendor = {
            name: "***REMOVED***"
        };
        let process = {
            lead: newLead,
            status: "OPEN",
            source: source
        };
        let tempLead: Lead = newLead;
        if (isNullOrUndefined(tempLead.customer.id) || isNaN(Number(tempLead.customer.id)) || Number(tempLead.customer.id) <= 0) {
            tempLead.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(tempLead.customer).$promise.then(function (customer) {
                tempLead.customer = customer;
                self.processResource.save(process).$promise.then(function (result) {
                    self.toaster.pop("success", "", self.translate.instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
                    self.rootScope.leadsCount += 1;
                    dtInstance.DataTable.row.add(result).draw();
                    defer.resolve(result);
                });
            });
            return defer.promise;
        }

        this.processResource.save(process).$promise.then(function (result) {
            self.toaster.pop("success", "", self.translate.instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
            self.rootScope.leadsCount += 1;
            dtInstance.DataTable.row.add(result).draw();
            defer.resolve(result);
        });
        return defer.promise;
    }

    inContact(process: Process, dtInstance: any, scope: any) {
        let self = this;
        this.processResource.setStatus({
            id: process.id
        }, "INCONTACT").$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_INCONTACT"));
            process.status = "INCONTACT";
            self.updateRow(process, dtInstance, scope);
            self.rootScope.$broadcast("onTodosChange");
        });
    }

    createOffer(process: Process, loadAllData: boolean, dtInstance: any, scope: any) {
        let self = this;
        this.workflowService.addLeadToOffer(process).then(function (tmpprocess: Process) {
            self.removeOrUpdateRow(process, loadAllData, dtInstance, scope);
            self.rootScope.$broadcast("onTodosChange");
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

    closeOrOpenInquiry(process: Process, dtInstance: any, scope: any, loadAllData: boolean) {
        let self = this;
        if (process.status === "OPEN" || process.status === "INCONTACT") {
            this.processResource.setStatus({
                id: process.id
            }, "CLOSED").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_CLOSE_LEAD"));
                self.rootScope.leadsCount -= 1;
                process.status = "CLOSED";
                self.removeOrUpdateRow(process, loadAllData, dtInstance, scope);
            });
        } else if (process.status === "CLOSED") {
            this.processResource.setStatus({
                id: process.id
            }, "OPEN").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_OPEN_LEAD"));
                self.rootScope.leadsCount += 1;
                process.status = "OPEN";
                self.updateRow(process, dtInstance, scope);
            });
        }
    }

    saveEditedRow(editLead: Lead, editProcess: Process, dtInstance: any, scope: any): Promise<Process> {
        let defer: IDefer<Process> = this.q.defer();
        let self = this;
        shallowCopy(editLead, editProcess.lead);
        let temp: any = editProcess.lead;
        if (isNullOrUndefined(temp.customer.id) || isNaN(Number(temp.customer.id)) || Number(temp.customer.id) <= 0) {
            temp.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(temp.customer).$promise.then(function (customer) {
                temp.customer = customer;

                self.processResource.save(editProcess).$promise.then(function (result) {
                    self.toaster.pop("success", "", self.translate
                        .instant("COMMON_TOAST_SUCCESS_UPDATE_LEAD"));
                    self.updateRow(result, dtInstance, scope);
                    if (!isNullOrUndefined(editProcess.processor) && editProcess.processor.id === Number(self.rootScope.user.id)) {
                        self.rootScope.$broadcast("onTodosChange");
                    }
                    defer.resolve(result);
                }, (error) => { handleError(error); defer.reject(error); });
            }, (error) => { handleError(error); defer.reject(error); });
            return defer.promise;
        }
        this.processResource.save(editProcess).$promise.then(function (result) {
            self.toaster.pop("success", "", self.translate.instant("COMMON_TOAST_SUCCESS_UPDATE_LEAD")); self.rootScope.leadsCount += 1;
            self.updateRow(editProcess, dtInstance, scope);
            if (!isNullOrUndefined(editProcess.processor) && editProcess.processor.id === Number(self.rootScope.user.id)) {
                self.rootScope.$broadcast("onTodosChange");
            }
            defer.resolve(result);
        }, (error) => { handleError(error); defer.reject(error); });
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

    removeOrUpdateRow(process: Process, loadAllData: boolean, dtInstance: any, scope: any) {
        if (loadAllData === true) {
            this.updateRow(process, dtInstance, scope);
        } else if (loadAllData === false) {
            dtInstance.DataTable.row(this.rows[process.id]).remove()
                .draw();
        }
    }
    deleteRow(process: Process, dtInstance: any): void {
        let self = this;
        this.workflowService.deletProcess(process).then((data) => {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_DELETE_LEAD"));
            self.rootScope.leadsCount -= 1;
            dtInstance.DataTable.row(self.rows[process.id]).remove().draw();
            self.rootScope.$broadcast("onTodosChange");
        }, (error) => {
            self.toaster.pop("error", "", self.translate
                .instant("COMMON_TOAST_FAILURE_DELETE_LEAD"));
        });
    }
}

angular.module(moduleLeadService, [ngResourceId]).service(LeadServiceId, LeadService);