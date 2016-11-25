/// <reference path="../../common/service/Workflow.Service.ts" />
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

class AbstractWorkflow {
    workflowService: WorkflowService;
    fileService: FileService;

    currentWizard: number = 1;
    currentFormerProcessors: Array<Processor> = [];
    sce;
    actionButtonConfig: { [key: number]: any } = {};
    scopes: { [key: string]: any } = {};
    scope;

    customerSelected: boolean = false;
    selectedCustomer: Customer;

    constructor(WorkflowService, $sce, FileService, $scope) {
        this.workflowService = WorkflowService;
        this.fileService = FileService;
        this.sce = $sce;
        this.scope = $scope;
    }

    getAsHtml(html: string) {
        return this.sce.trustAsHtml(html);
    }

    addProduct(array: Array<OrderPosition>, currentProductId: string, currentProductAmount: number) {
        this.workflowService.addProduct(array, currentProductId, currentProductAmount);
    }

    deleteProduct(array: Array<OrderPosition>, index: number) {
        this.workflowService.deleteProduct(array, index);
    }

    sumOrderPositions(array: Array<OrderPosition>): number {
        return this.workflowService.sumOrderPositions(array);
    }

    sumBasicPriceOrderPositions(array: Array<OrderPosition>): number {
        return this.workflowService.sumBasicPriceOrderPositions(array);
    }

    wizardOnClick(wizard: number) {
        this.currentWizard = wizard;
    }

    openAttachment(id: number) {
        this.fileService.getContentFileById(id);
    }

    selectCustomer(workflow: any, customer: Customer) {
        let customerId = "-1";
        if (!isNullOrUndefined(customer)) {
            customerId = customer.id.toString();
        }
        else {
            this.selectedCustomer = null;
        }
        this.customerSelected = this.workflowService.selectCustomer(workflow, customerId);
    }

    destroyAllScopes(): void {
        for (let key in this.scopes) {
            if (this.scopes.hasOwnProperty(key)) {
                this.scopes[key].$destroy();
            }
        }
        this.scopes = {};
    }

    getScopeByKey(key: string, isolated: boolean = false): any {
        let childScope = this.scopes[key];
        if (isNullOrUndefined(childScope) || childScope.$$destroyed) {
            childScope = this.scope.$new(isolated);
            this.scopes[key] = childScope;
        }
        return childScope;
    }

    dropCreateScope(key: string, isolated: boolean = false): any {
        let childScope = this.scopes[key];
        if (isNullOrUndefined(childScope) || childScope.$$destroyed) {
            childScope = this.scope.$new(isolated);
            this.scopes[key] = childScope;
        } else {
            this.scopes[key].$destroy();
            childScope = this.scope.$new(isolated);
            this.scopes[key] = childScope;
        }
        return childScope;
    }

}