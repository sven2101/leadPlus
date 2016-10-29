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
    sce;
    window;
    actionButtonConfig: { [key: number]: any } = {};

    constructor(WorkflowService, $sce, $window, FileService) {
        this.workflowService = WorkflowService;
        this.fileService = FileService;
        this.sce = $sce;
        this.window = $window;
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
        let pdfAttachment;
        let self = this;
        this.fileService.getFileById(id).then((result) => {
            pdfAttachment = result.data;
            console.log("Pdf - Attachment: ", pdfAttachment);
            console.log("Result: ", result.data);
            let file = new Blob([pdfAttachment], { type: "application/pdf" });
            let fileURL = URL.createObjectURL(file);
            self.window.open(fileURL, "_blank");
        }, (error) => { console.log("Error"); });
    }
}