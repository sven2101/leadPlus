/// <reference path="../../Setting/model/Source.Model.ts" />
/// <reference path="../../Setting/controller/Setting.Source.Service.ts" />
/// <reference path="../../app/App.Common.ts" />

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

const SourceControllerId: string = "SourceController";

class SourceController {

    $inject = [SourceServiceId, $rootScopeId, $translateId, toasterId, $scopeId];

    createSourceForm;
    currentSource: Source;
    currentEditSource: Source;
    translate;
    toaster;
    sourceService: SourceService;
    rootScope;
    sourceAmountLimit: number = 20;

    isCurrentSourceNew: boolean;

    constructor(SourceService: SourceService, $rootScope, $translate, toaster, $scope) {
        this.sourceService = SourceService;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.toaster = toaster;
    }

    refreshData(): void {
        this.sourceService.getAllSources();
    }

    clearSource(): void {
        this.createSourceForm.$setPristine();
        this.currentSource = new Source();
        this.isCurrentSourceNew = true;
    }

    editSource(source: Source): void {
        this.currentEditSource = source;
        this.currentSource = new Source();
        this.isCurrentSourceNew = false;
        shallowCopy(this.currentEditSource, this.currentSource);
    }

    saveSource() {
        if (!this.isCurrentSourceNew) {
            shallowCopy(this.currentSource, this.currentEditSource);
        }
        this.sourceService.saveSource(this.currentSource);
    }

}

angular.module(moduleSource, [ngResourceId]).controller(SourceControllerId, SourceController);

