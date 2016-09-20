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

    currentTab: number = 1;
    currentTab1Class: any = "current";
    currentTab2Class: any = "done";
    currentTab3Class: any = "done";

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

    tabOnClick(tab: number) {
        this.currentTab = tab;
        if (this.currentTab === 1) {
            this.currentTab1Class = "current";
            this.currentTab2Class = "done";
            this.currentTab3Class = "done";
        } else if (this.currentTab === 2) {
            this.currentTab1Class = "done";
            this.currentTab2Class = "current";
            this.currentTab3Class = "done";
        } else if (this.currentTab === 3) {
            this.currentTab1Class = "done";
            this.currentTab2Class = "done";
            this.currentTab3Class = "current";
        }
    }
}