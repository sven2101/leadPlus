/// <reference path="../../../typeDefinitions/moment.d.ts" />
/// <reference path="../../../typeDefinitions/moment-node.d.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/model/OrderPosition.Model.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../common/model/Process.Model.ts" />
/// <reference path="../../Lead/model/Lead.Model.ts" />
/// <reference path="../../Lead/controller/Lead.DataTableService.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../common/service/Workflow.Service.ts" />
/// <reference path="../../common/service/AbstractWorkflow.ts" />
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

class LeadController extends AbstractWorkflow {

    $inject = ["DTOptionsBuilder", "DTColumnBuilder", "$compile",
        "$scope", "toaster", "ProcessResource", "CommentResource", "$filter",
        "UserResource", "$rootScope", "$translate", "LeadResource", ProductServiceId, WorkflowServiceId, CustomerServiceId, CustomerResourceId, "LeadDataTableService"];



    productService;
    workflowService: WorkflowService;
    customerService: CustomerService;
    leadDataTableService: LeadDataTableService;
    scope;
    rootScope;
    commentResource;
    customerResource;
    filter;
    processResource;
    userResource;
    leadResource;
    translate;
    compile;
    toaster;
    dtOptions;
    dtColumns;
    addForm;
    editForm: any;

    user: User = new User();
    commentInput: string;
    commentModalInput: string;
    comments = {};
    currentCommentModalId = "";
    loadAllData = false;
    dtInstance = { DataTable: null };
    processes = {};
    rows = {};
    editProcess: Process = new Process();
    newLead: Lead = new Lead();
    editLead: Lead;

    allDataRoute: string;
    openDataRoute: string;

    currentOrderPositions = [];
    currentProductId = "-1";
    currentProductAmount = 1;
    currentCustomerId = "-1";
    customerSelected: boolean = false;


    constructor(DTOptionsBuilder, DTColumnBuilder, $compile, $scope,
        toaster, ProcessResource, CommentResource, $filter, UserResource,
        $rootScope, $translate, LeadResource, ProductService, WorkflowService, CustomerService, CustomerResource, LeadDataTableService) {
        super();
        this.productService = ProductService;
        this.workflowService = WorkflowService;
        this.customerService = CustomerService;
        this.leadDataTableService = LeadDataTableService;
        this.filter = $filter;
        this.processResource = ProcessResource.resource;
        this.commentResource = CommentResource.resource;
        this.customerResource = CustomerResource.resource;
        this.userResource = UserResource.resource;
        this.leadResource = LeadResource.resource;
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.compile = $compile;
        this.toaster = toaster;
        this.allDataRoute = "/api/rest/processes/leads";
        this.openDataRoute = "/api/rest/processes/workflow/LEAD/state/OPEN";
        let self = this;
        this.user = this.rootScope.currentUser;
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption("ajax", {
                url: this.openDataRoute,
                error: function (xhr, error, thrown) {
                    console.log(xhr);
                },
                type: "GET"
            })
            .withOption("stateSave", true)
            .withDOM(this.workflowService.getDomString())
            .withPaginationType("full_numbers")
            .withButtons(this.workflowService.getButtons($translate("LEAD_LEADS"), [6, 1, 2, 3, 5, 7, 9, 10, 11, 8, 12]))
            .withBootstrap()
            .withOption("createdRow", createdRow)
            .withOption("order", [4, "desc"])
            .withLanguageSource(this.workflowService.getLanguageSource($rootScope.language));

        function refreshData() {
            let resetPaging = false;
            this.dtInstance.reloadData(resetPaging);
        }

        function changeDataInput() {
            let searchDelay: number = 0;
            if (this.loadAllData === true) {
                searchDelay = 500;
            }
            self.dtOptions.withOption("serverSide", this.loadAllData)
                .withOption("ajax", this.workflowService.getData(this.loadAllData, this.allDataRoute, this.openDataRoute))
                .withOption("searchDelay", searchDelay);
        }

        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            self.rows[data.id] = row;
            let currentDate = moment(moment().utc + "", "DD.MM.YYYY");
            let leadDate = moment(data.lead.timestamp, "DD.MM.YYYY");
            if (currentDate["businessDiff"](leadDate, "days") > 3
                && data.status === "OPEN") {
                $(row).addClass("important");
            }
            self.compile(angular.element(row).contents())(self.scope);
        }

        function addActionsButtons(data, type, full, meta) {
            let templatedata = { "process": self.processes[data.id] };
            return self.leadDataTableService.getActionButtonsHTML(self.user, templatedata);
        }

        function addStatusStyle(data, type, full, meta) {
            self.processes[data.id] = data;
            return self.leadDataTableService.getStatusStyleHTML(data);
        }

        function addDetailButton(data, type, full, meta) {
            self.processes[data.id] = data;
            return "<a class='green shortinfo' href='javascript:;'"
                + "ng-click='lead.appendChildRow(lead.processes[" + data.id
                + "], $event)' title='Details'>"
                + "<i class='glyphicon glyphicon-plus-sign'/></a>";
        }

        this.dtColumns = this.leadDataTableService.getDTColumnConfiguration(addDetailButton, addStatusStyle, addActionsButtons);
    }

    getOrderPositions(process) {
        return process.lead.orderPositions;
    }

    appendChildRow(process, event) {
        let childScope = this.scope.$new(true);
        this.comments[process.id] = this.workflowService.getCommentsByProcessId(process.id);
        this.workflowService.appendChildRow(childScope, process, this.dtInstance, this);
    }

    loadCurrentIdToModal(id) {
        this.currentCommentModalId = id;
    };

    addComment(id: number, input: string) {
        this.workflowService.addComment(this.comments[id], this.processes[id], this.user, input[id]).then(function () {
            input[id] = "";
        });
    };

    saveLead() {
        let self = this;
        if (angular.isUndefined(this.newLead.customer)) {
            this.newLead.customer = new Customer();
            this.newLead.customer.title = "UNKNOWN";

        }
        this.newLead.timestamp = this.filter("date")
            (new Date(), "dd.MM.yyyy HH:mm", "UTC");
        this.newLead.vendor = {
            name: "***REMOVED***"
        };
        let process = {
            lead: this.newLead,
            status: "OPEN"
        };
        let tempLead: Lead = this.newLead;
        if (isNullOrUndefined(tempLead.customer.id) || isNaN(Number(tempLead.customer.id)) || Number(tempLead.customer.id) <= 0) {
            tempLead.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(tempLead.customer).$promise.then(function (customer) {
                tempLead.customer = customer;
                self.processResource.save(process).$promise.then(function (result) {
                    self.toaster.pop("success", "", self.translate
                        .instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
                    self.rootScope.leadsCount += 1;
                    self.addForm.$setPristine();
                    self.dtInstance.DataTable.row.add(result).draw();
                    self.customerService.getAllCustomer();
                });
            });
            return;
        }

        this.processResource.save(process).$promise.then(function (result) {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
            self.rootScope.leadsCount += 1;
            self.addForm.$setPristine();
            self.dtInstance.DataTable.row.add(result).draw();
        });
    };

    clearNewLead() {
        this.newLead = new Lead();
        this.newLead.orderPositions = [];
        this.currentOrderPositions = [];
        this.currentProductId = "-1";
        this.currentCustomerId = "-1";
        this.currentProductAmount = 1;
        this.customerSelected = false;
    };

    createOffer(process: Process) {
        let self = this;
        this.workflowService.addLeadToOffer(process, this.user).then(function (isResolved: boolean) {
            if (self.loadAllData === true) {
                self.updateRow(process);
            } else if (self.loadAllData === false) {
                self.dtInstance.DataTable.row(self.rows[process.id]).remove()
                    .draw();
            }
        });
    }

    pin(process) {
        let self = this;
        if (process.processor === null) {
            this.processResource.setProcessor({
                id: process.id
            }, self.user.id).$promise.then(function () {
                process.processor = self.user;
                self.updateRow(process);
            });
        } else {
            this.processResource.removeProcessor({
                id: process.id
            }).$promise.then(function () {
                process.processor = null;
                self.updateRow(process);
            });
        }
    }

    closeOrOpenInquiry(process) {
        let self = this;
        if (process.status === "OPEN") {
            this.processResource.setStatus({
                id: process.id
            }, "CLOSED").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_CLOSE_LEAD"));
                self.rootScope.leadsCount -= 1;
                process.status = "CLOSED";
                self.updateRow(process);
            });
        } else if (process.status === "CLOSED") {
            this.processResource.setStatus({
                id: process.id
            }, "OPEN").$promise.then(function () {
                self.toaster.pop("success", "", self.translate
                    .instant("COMMON_TOAST_SUCCESS_OPEN_LEAD"));
                self.rootScope.leadsCount += 1;
                process.status = "OPEN";
                self.updateRow(process);
            });
        }
    };

    loadDataToModal(process) {
        this.currentProductId = "-1";
        this.currentProductAmount = 1;
        this.editProcess = process;
        this.currentOrderPositions = deepCopy(this.editProcess.lead.orderPositions);
        this.customerSelected = this.editProcess.lead.customer.id > 0;
        this.currentCustomerId = this.editProcess.lead.customer.id + "";
        this.editLead = deepCopy(this.editProcess.lead);

    };

    saveEditedRow() {
        let self = this;
        shallowCopy(this.editLead, this.editProcess.lead);
        this.editProcess.lead.orderPositions = this.currentOrderPositions;

        let temp: any = this.editProcess.lead;
        if (isNullOrUndefined(temp.customer.id) || isNaN(Number(temp.customer.id)) || Number(temp.customer.id) <= 0) {
            temp.customer.timestamp = newTimestamp();
            this.customerResource.createCustomer(temp.customer).$promise.then(function (customer) {
                temp.customer = customer;

                self.processResource.save(self.editProcess).$promise.then(function (result) {
                    self.toaster.pop("success", "", self.translate
                        .instant("COMMON_TOAST_SUCCESS_ADD_LEAD"));
                    self.editForm.$setPristine();
                    self.updateRow(self.editProcess);
                    self.customerService.getAllCustomer();
                });
            });
            return;
        }

        this.leadResource.update(this.editProcess.lead).$promise.then(function () {
            self.toaster.pop("success", "", self.translate
                .instant("COMMON_TOAST_SUCCESS_UPDATE_LEAD"));
            self.editForm.$setPristine();
            self.editProcess.lead.leadPrice = self.sumOrderPositions(self.editProcess.lead.orderPositions);
            self.updateRow(self.editProcess);
        });
    };

    deleteRow(process) {
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
                self.dtInstance.DataTable.row(self.rows[process.id]).remove().draw();
            });
        });
    };

    updateRow(process) {
        this.dtInstance.DataTable.row(this.rows[process.id]).data(process).draw(
            false);
        this.compile(angular.element(this.rows[process.id]).contents())(this.scope);
    };

    addProduct(array) {
        this.workflowService.addProduct(array, this.currentProductId, this.currentProductAmount);
    }
    deleteProduct(array, index) {
        this.workflowService.deleteProduct(array, index);
    }
    sumOrderPositions(array) {
        return this.workflowService.sumOrderPositions(array);
    }

    selectCustomer(workflow: any) {
        if (isNullOrUndefined(Number(this.currentCustomerId)) || Number(this.currentCustomerId) <= 0) {
            this.customerSelected = false;
            workflow.customer = new Customer();
            workflow.customer.id = 0;
            return;
        }

        let temp: Customer = findElementById(this.customerService.customer, Number(this.currentCustomerId)) as Customer;
        if (isNullOrUndefined(temp)) {
            this.customerSelected = false;
            workflow.customer = new Customer();
            workflow.customer.id = 0;
            return;
        }
        workflow.customer = deepCopy(temp);
        this.customerSelected = true;
    }
}
angular.module("app.lead", ["ngResource"]).controller("LeadController", LeadController);




