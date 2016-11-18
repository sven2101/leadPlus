/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />
/// <reference path="../../Notification/model/Attachment.Model.ts" />
/// <reference path="../../Common/model/Promise.Interface.ts" />

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";

declare var Ladda;

const AttachmentServiceId: string = "AttachmentService";

class AttachmentService {

    private $inject = [AttachmentResourceId, $qId, $httpId, $windowId, toasterId, $translateId, $sceId];

    attachmentResource;
    q;
    http;
    window;
    toaster;
    translate;
    sce;

    constructor(AttachmentResource, $q, $http, $window, toaster, $translate, $sce) {
        this.attachmentResource = AttachmentResource.resource;
        this.q = $q;
        this.http = $http;
        this.window = $window;
        this.toaster = toaster;
        this.translate = $translate;
        this.sce = $sce;
    }

    getAttachmentFileContentById(id: number) {
        let self = this;
        this.http.get("/api/rest/files/content/" + id, { method: "GET", responseType: "arraybuffer" }).
            success(function (data, status, headers, config, statusText) {
                let contentType = headers("content-type");
                let file = new Blob([data], { type: contentType });
                let fileURL = URL.createObjectURL(file);
                self.window.open(self.sce.trustAsResourceUrl(fileURL), "_blank");
            }).error(function (data, status) {
                self.toaster.pop("error", "", self.translate.instant("COMMON_TOAST_FAILURE_DELETE_LEAD"));
            });
    }

}

angular.module(moduleAttachmentService, [ngResourceId]).service(AttachmentServiceId, AttachmentService);