/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Common/model/Promise.Interface.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />

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

const FileServiceId: string = "FileService";

class FileService {

    private $inject = [FileResourceId, $qId];

    fileResource;
    q;

    constructor(FileResource, $q) {
        this.fileResource = FileResource.resource;
        this.q = $q;
    }

    getFileById(id: number): IPromise<any> {
        let defer = this.q.defer();
        this.fileResource.getContentByFileUploadId({ id: id }).$promise.then((resultFileUpload) => defer.resolve(resultFileUpload), (error) => defer.reject(error));
        return defer.promise;
    }
}

angular.module(moduleFileService, [ngResourceId]).service(FileServiceId, FileService);