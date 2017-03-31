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

    $inject = [SourceServiceId, $rootScopeId, $translateId, toasterId, $scopeId, SweetAlertId];

    createSourceForm;
    currentSource: Source;
    currentEditSource: Source;
    translate;
    toaster;
    sourceService: SourceService;
    rootScope;
    sourceAmountLimit: number = 20;
    nameExists: boolean;

    isCurrentSourceNew: boolean;
    constructor(SourceService: SourceService, $rootScope, $translate, toaster, $scope, private SweetAlert) {
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
        this.nameExists = false;
    }

    editSource(source: Source): void {
        this.createSourceForm.$setPristine();
        this.currentEditSource = source;
        this.currentSource = new Source();
        this.isCurrentSourceNew = false;
        this.nameExists = false;
        shallowCopy(this.currentEditSource, this.currentSource);
    }

    checkSourceName(): void {
        if (this.isCurrentSourceNew === false
            && !isNullOrUndefined(this.currentSource.name)
            && !isNullOrUndefined(this.currentEditSource.name)
            && this.currentSource.name.toLowerCase() === this.currentEditSource.name.toLowerCase()) {
            this.nameExists = false;
            return;
        }
        this.nameExists = this.sourceService.checkSourceName(this.currentSource);
    }

    saveSource() {
        if (!this.isCurrentSourceNew) {
            shallowCopy(this.currentSource, this.currentEditSource);
        }
        this.sourceService.saveSource(this.currentSource);
    }

    async generateApiToken(source): Promise<void> {

        let resetSourcPromise = this.SweetAlert.swal({
            title: this.translate.instant("SOURCE_API_TOKEN_RESET_TITLE"),
            html: this.translate.instant("SOURCE_API_TOKEN_RESET_TEXT"),
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: this.translate.instant("YES"),
            cancelButtonText: this.translate.instant("NO")
        });

        try {
            await resetSourcPromise;
            let resetConfirmationSourcPromise = this.SweetAlert.swal({
                title: this.translate.instant("SOURCE_API_TOKEN_CONFIRMATION_RESET_TITLE"),
                html: this.translate.instant("SOURCE_API_TOKEN_CONFIRMATION_RESET_TEXT"),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: this.translate.instant("YES"),
                cancelButtonText: this.translate.instant("NO")
            });

            await resetConfirmationSourcPromise;
            let token = await this.sourceService.generateApiToken(source);
            let createNewAccessTokenPromise = this.SweetAlert.swal({
                title: this.translate.instant("SOURCE_NEW_API_TOKEN_TITLE"),
                html: this.translate.instant("SOURCE_NEW_API_TOKEN_TEXT") + " <br/><br/> <div style='color:red;font-size:13px;border-radius: 25px;border: 2px solid #aaa;padding: 20px; '> <strong>" + token.token + "</strong></div>",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: this.translate.instant("COMMON_CLOSE")
            });
            await createNewAccessTokenPromise;
        } catch (error) {
        }
    }

}

angular.module(moduleSource, [ngResourceId]).controller(SourceControllerId, SourceController);

