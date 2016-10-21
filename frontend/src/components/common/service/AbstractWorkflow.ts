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
    sce;

    constructor(WorkflowService, $sce) {
        this.workflowService = WorkflowService;
        this.sce = $sce;
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
}