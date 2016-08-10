/// <reference path="../models/Product.ts" />
/// <reference path="../app/App.Constants.ts" />
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

    private $inject = [commentResourceId, $filterId, $compileId];

    commentResource;
    filter;
    compile;

    constructor(CommentResource, $filter, $compile) {
        this.commentResource = CommentResource;
        this.filter = $filter;

        this.compile = $compile;
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
    };
}

angular.module("app.workflow.service", ["ngResource"]).service("WorkflowService", WorkflowService);