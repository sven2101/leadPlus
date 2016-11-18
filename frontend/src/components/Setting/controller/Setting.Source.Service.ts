/// <reference path="../../Setting/model/Source.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/model/Promise.Interface.ts" />
/// <reference path="../../app/App.Resource.ts" />

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

const SourceServiceId: string = "SourceService";

class SourceService {

    private $inject = [toasterId, $translateId, SourceResourceId, $qId];

    sources: Array<Source>;
    toaster;
    translate;
    SourceResource;
    q;
    formdata;

    constructor(toaster, $translate, SourceResource, $q) {
        this.toaster = toaster;
        this.translate = $translate;
        this.q = $q;
        this.SourceResource = SourceResource.resource;
        this.sources = new Array<Source>();
        this.formdata = new FormData();
        this.getAllSources();
    }

    saveSource(source: Source) {
        let self = this;
        this.SourceResource.createSource(source).$promise.then(function (result: Source) {
            self.getAllSources();
            self.toaster.pop("success", "", self.translate.instant("SOURCE_TOAST_SAVE"));

        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SOURCE_TOAST_SAVE_ERROR"));
        });

    }

    getAllSources(): IPromise<Array<Source>> {
        let defer = this.q.defer();
        let self = this;
        this.SourceResource.getAllSources().$promise.then(function (result: Array<Source>) {
            self.sources = result;
            defer.resolve(self.sources);
        }, function (error: any) {
            defer.reject(error);
        });
        return defer.promise;
    }

    getActiveSources(): Array<Source> {
        let temp: Array<Source> = new Array<Source>();
        for (let source of this.sources) {
            if (source.deactivated === false) {
                temp.push(source);
            }
        }
        return temp;
    }
}

angular.module(moduleSourceService, [ngResourceId]).service(SourceServiceId, SourceService);