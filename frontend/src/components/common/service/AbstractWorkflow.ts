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

    currentWizard: number = 1;
    currentWizard1Class: any = "current";
    currentWizard2Class: any = "done";
    currentWizard3Class: any = "done";
    currentWizard4Class: any = "done";
    currentWizard5Class: any = "done";
    currentWizard6Class: any = "done";

    constructor(WorkflowService) {
        this.workflowService = WorkflowService;
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
        if (this.currentWizard === 1) {
            this.currentWizard1Class = "current";
            this.currentWizard2Class = "done";
            this.currentWizard3Class = "done";
            this.currentWizard4Class = "done";
            this.currentWizard5Class = "done";
            this.currentWizard6Class = "done";
        } else if (this.currentWizard === 2) {
            this.currentWizard1Class = "done";
            this.currentWizard2Class = "current";
            this.currentWizard3Class = "done";
            this.currentWizard4Class = "done";
            this.currentWizard5Class = "done";
            this.currentWizard6Class = "done";
        } else if (this.currentWizard === 3) {
            this.currentWizard1Class = "done";
            this.currentWizard2Class = "done";
            this.currentWizard3Class = "current";
            this.currentWizard4Class = "done";
            this.currentWizard5Class = "done";
            this.currentWizard6Class = "done";
        } else if (this.currentWizard === 4) {
            this.currentWizard1Class = "done";
            this.currentWizard2Class = "done";
            this.currentWizard3Class = "done";
            this.currentWizard4Class = "current";
            this.currentWizard5Class = "done";
            this.currentWizard6Class = "done";
        } else if (this.currentWizard === 5) {
            this.currentWizard1Class = "done";
            this.currentWizard2Class = "done";
            this.currentWizard3Class = "done";
            this.currentWizard4Class = "done";
            this.currentWizard5Class = "current";
            this.currentWizard6Class = "done";
        } else if (this.currentWizard === 6) {
            this.currentWizard1Class = "done";
            this.currentWizard2Class = "done";
            this.currentWizard3Class = "done";
            this.currentWizard4Class = "done";
            this.currentWizard5Class = "done";
            this.currentWizard6Class = "current";
        }
    }
}