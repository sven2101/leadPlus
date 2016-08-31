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

    $inject = [$rootScopeId, $translateId, $filterId, toasterId, $compileId, ProcessResourceId, CustomerResourceId, LeadResourceId, WorkflowServiceId, CustomerServiceId, ProductServiceId];
    processResource;
    customerResource;
    leadResource;
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

    constructor($rootScope, $translate, $filter, toaster, $compile, ProcessResource, CustomerResource, LeadResource, WorkflowService, CustomerService, ProductService) {
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.filter = $filter;
        this.toaster = toaster;
        this.compile = $compile;
        this.processResource = ProcessResource.resource;
        this.customerResource = CustomerResource.resource;
        this.leadResource = LeadResource.resource;
        this.workflowService = WorkflowService;
        this.customerService = CustomerService;
        this.productService = ProductService;
        this.user = $rootScope.currentUser;
    }

    saveLead(addForm: any, dtInstance: any, newLead: Lead, currentOrderPositions: Array<OrderPosition>) {
        let self = this;
        if (angular.isUndefined(newLead.customer)) {
            newLead.customer = new Customer();
            newLead.customer.title = "UNKNOWN";
        }
        newLead.timestamp = this.filter("date")
            (new Date(), "dd.MM.yyyy HH:mm", "UTC");
        newLead.vendor = {
            name: "***REMOVED***"
        };
        newLead.orderPositions = currentOrderPositions;
        let process = {
            lead: newLead,
            status: "OPEN"
        };
        let tempLead: Lead = newLead;
        if (isNullOrUndefined(tempLead.customer.id) || isNaN(Number(tempLead.customer.id)) || Number(tempLead.customer.id) <= 0) {
            tempLead.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(tempLead.customer).$promise.then(function (customer) {
                tempLead.customer = customer;
                self.processResource.save(process).$promise.then(function (result) {
                    self.toaster.pop("success", "", self.translate
                        .instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
                    self.rootScope.leadsCount += 1;
                    addForm.$setPristine();
                    dtInstance.DataTable.row.add(result).draw();
                    self.customerService.getAllCustomer();
                });
            });
            return;
        }

        this.processResource.save(process).$promise.then(function (result) {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
            self.rootScope.leadsCount += 1;
            addForm.$setPristine();
            dtInstance.DataTable.row.add(result).draw();
        });
    }

    createOffer(process: Process, loadAllData: boolean, dtInstance: any, scope: any) {
        let self = this;
        this.workflowService.addLeadToOffer(process).then(function (isResolved: boolean) {
            if (loadAllData === true) {
                self.updateRow(process, loadAllData, scope);
            } else if (loadAllData === false) {
                dtInstance.DataTable.row(self.rows[process.id]).remove()
                    .draw();
            }
        });
    }

    pin(process: Process, dtInstance: any, scope: any) {
        let self = this;
        if (process.processor === null) {
            this.processResource.setProcessor({
                id: process.id
            }, self.user.id).$promise.then(function () {
                process.processor = self.user;
                self.updateRow(process, dtInstance, scope);
            });
        } else {
            this.processResource.removeProcessor({
                id: process.id
            }).$promise.then(function () {
                process.processor = null;
                self.updateRow(process, dtInstance, scope);
            });
        }
    }

    closeOrOpenInquiry(process: Process, dtInstance: any, scope: any) {
        let self = this;
        if (process.status === "OPEN") {
            this.processResource.setStatus({
                id: process.id
            }, "CLOSED").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_CLOSE_LEAD"));
                self.rootScope.leadsCount -= 1;
                process.status = "CLOSED";
                self.updateRow(process, dtInstance, scope);
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

    saveEditedRow(editLead: Lead, editProcess: Process, currentOrderPositions: Array<OrderPosition>, dtInstance: any, scope: any, editForm: any) {
        let self = this;
        shallowCopy(editLead, editProcess.lead);
        editProcess.lead.orderPositions = currentOrderPositions;

        let temp: any = editProcess.lead;
        if (isNullOrUndefined(temp.customer.id) || isNaN(Number(temp.customer.id)) || Number(temp.customer.id) <= 0) {
            temp.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(temp.customer).$promise.then(function (customer) {
                temp.customer = customer;

                self.processResource.save(editProcess).$promise.then(function (result) {
                    self.toaster.pop("success", "", self.translate
                        .instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
                    editForm.$setPristine();
                    self.updateRow(editProcess, dtInstance, scope);
                    self.customerService.getAllCustomer();
                });
            });
            return;
        }

        this.leadResource.update(editProcess.lead).$promise.then(function (result) {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_UPDATE_LEAD"));
            editForm.$setPristine();
            editProcess.lead = result;
            self.updateRow(editProcess, dtInstance, scope);
        });
    }

    deleteRow(process: Process, dtInstance: any) {
        let self = this;
        let leadId = process.lead.id;
        if (process.sale !== null || process.offer !== null) {
            self.toaster.pop("error", "", self.translate
                .instant("COMMON_TOAST_FAILURE_DELETE_LEAD"));
            return;
        }
        process.lead = null;
        this.processResource.update(process).$promise.then(function () {
            if (process.offer === null && process.sale === null) {
                self.processResource.drop({
                    id: process.id
                });
            }
            self.leadResource.drop({
                id: leadId
            }).$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_DELETE_LEAD"));
                self.rootScope.leadsCount -= 1;
                dtInstance.DataTable.row(self.rows[process.id]).remove().draw();
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
}

angular.module(moduleLeadService, [ngResourceId]).service(LeadServiceId, LeadService);