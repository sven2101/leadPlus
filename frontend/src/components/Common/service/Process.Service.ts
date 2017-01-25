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

const ProcessServiceId: string = "ProcessService";

class ProcessService {

    private $inject = [ProcessResourceId, CustomerServiceId, toasterId, $rootScopeId, $translateId];

    processResource: any;
    customerService: CustomerService;
    toaster: any;
    rootScope: any;
    translate: any;

    constructor(ProcessResource, CustomerService, toaster, $rootScope, $translate) {
        this.processResource = ProcessResource.resource;
        this.customerService = CustomerService;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
    }

    async save(editProcess: Process, editWorkflowUnit: IWorkflow, updateRow: boolean, deleteRow: boolean): Promise<Process> {

        if (isNullOrUndefined(editWorkflowUnit.customer.id)) {
            editWorkflowUnit.customer.timestamp = newTimestamp();
            editWorkflowUnit.customer = await this.customerService.insertCustomer(editWorkflowUnit.customer).then().catch(error => handleError(error)) as Customer;
        }

        let resultProcess = await this.processResource.save(editProcess).$promise.catch(error => handleError(error)) as Process;
        if (updateRow === true) {
            this.rootScope.$broadcast("updateRow", resultProcess);
        }
        if (deleteRow === true) {
            this.rootScope.$broadcast("deleteRow", resultProcess);
        }
        if (!isNullOrUndefined(editProcess.processor) && editProcess.processor.id === Number(this.rootScope.user.id)) {
            this.rootScope.$broadcast("onTodosChange");
        }
        return resultProcess;
    }
}
angular.module(moduleProcessService, [ngResourceId]).service(ProcessServiceId, ProcessService);
