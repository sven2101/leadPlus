/// <reference path="../models/Product.ts" />
/// <reference path="../app/App.Constants.ts" />
/// <reference path="../Product/Product.Service.ts" />
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

const WorkflowServiceId: String = "WorkflowService";

class WorkflowService {

    private $inject = [commentResourceId, $filterId, ProductServiceId];

    commentResource;
    filter;
    productService: ProductService;

    constructor(CommentResource, $filter, ProductService) {
        this.commentResource = CommentResource;
        this.filter = $filter;
        this.productService = ProductService;
    }

    addComment(id, source, process, user, comments, commentInput, commentModalInput) {
        let self = this;
        let commentText = "";
        if (angular.isUndefined(comments[id])) {
            comments[id] = [];
        }
        if (source === "table" && commentInput[id] !== ""
            && !angular.isUndefined(commentInput[id])) {
            commentText = commentInput[id];
        } else if (source === "modal" && commentModalInput[id] !== ""
            && !angular.isUndefined(commentModalInput[id])) {
            commentText = commentModalInput[id];
        }
        let comment = {
            process: process,
            creator: user,
            commentText: commentText,
            timestamp: this.filter("date")(new Date(), "dd.MM.yyyy HH:mm:ss")
        };
        this.commentResource.save(comment).$promise.then(function () {
            comments[id].push(comment);
            commentInput[id] = "";
            commentModalInput[id] = "";
        });
    }
    addProduct(array, currentProductId, currentProductAmount) {
        if (!isNaN(Number(currentProductId))
            && Number(currentProductId) > 0) {
            let tempProduct = findElementById(this.productService.products,
                Number(currentProductId));
            let tempOrderPosition = new OrderPosition();
            tempOrderPosition.product = tempProduct as Product;
            tempOrderPosition.amount = currentProductAmount;
            array.push(tempOrderPosition);
        }
    }
    deleteProduct(array, index) {
        array.splice(index, 1);
    }
    sumOrderPositions(array) {
        let sum = 0;
        if (isNullOrUndefined(array)) {
            return 0;
        }
        for (let i = 0; i < array.length; i++) {
            let temp = array[i];
            if (!isNullOrUndefined(temp) && !isNaN(temp.amount)
                && !isNullOrUndefined(temp.product)
                && !isNaN(temp.product.priceNetto)) {
                sum += temp.amount * temp.product.priceNetto;
            }
        }
        return sum;
    }
}

angular.module("app.workflow.service", ["ngResource"]).service("WorkflowService", WorkflowService);