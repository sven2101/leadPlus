/// <reference path="../../Api/model/Api.Model.ts" />
/// <reference path="../../Api/controller/Api.Service.ts" />
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

const ApiControllerId: string = "ApiController";

class ApiController {

    $inject = [ApiServiceId, $rootScopeId, $translateId, toasterId, $scopeId, SweetAlertId, $locationId, $routeParamsId];

    createApiForm;
    currentApi: Api;
    currentEditApi: Api;
    isCurrentApiNew: boolean;

    translate;
    toaster;
    location;
    apiService: ApiService;
    rootScope;
    sourceAmountLimit: number = 20;
    nameExists: boolean;

    api: Api;
    apiFound: boolean;
    apiHead: string;
    apiVendors: Array<string>;

    constructor(ApiService: ApiService, $rootScope, $translate, toaster, $scope, private SweetAlert, $location, $routeParams) {
        this.apiService = ApiService;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.location = $location;
        this.toaster = toaster;
        this.apiService.getAll();
        this.initApis($routeParams);
        this.apiVendors = ["Weclapp"];
    }

    async initApis($routeParams) {
        let apiId = $routeParams.apiId;
        if (!isNullOrUndefined(apiId) && apiId !== 0 && !isNaN(apiId) && angular.isNumber(+apiId)) {
            this.api = await this.apiService.getApiById(Number(apiId));
            this.apiHead = ApiVendor[this.api.apiVendor];
            isNullOrUndefined(this.api) ? this.apiFound = false : this.apiFound = true;
        } else if (!isNullOrUndefined(apiId) && apiId === "new") {
            this.api = new Api();
            this.apiService.currentEditApi = this.api;
            this.apiHead = "SETTING_API_NEW";
            this.apiFound = true;
        }
        if (this.apiFound === true) {
            if (isNullOrUndefined(this.apiService.apis)) {
                this.apiService.getAll();
            }
        }
    }

    save() {
        if (isNullOrUndefined(this.api.id)) {
            this.api.isVerified = true;
            this.apiService.save(this.api);
        } else {
            this.apiService.update(this.api);
        }

        this.api = null;
        this.goBack();
    }

    clearApi(): void {
        this.createApiForm.$setPristine();
        this.currentApi = new Api();
        this.isCurrentApiNew = true;
        this.nameExists = false;
    }

    editApi(api: Api): void {
        this.createApiForm.$setPristine();
        this.currentEditApi = api;
        this.currentApi = new Api();
        this.isCurrentApiNew = false;
        this.nameExists = false;
        shallowCopy(this.currentEditApi, this.currentApi);
    }

    saveApi() {
        if (!this.isCurrentApiNew) {
            shallowCopy(this.currentApi, this.currentEditApi);
        }
        this.apiService.save(this.currentApi);
    }

    goBack() {
        this.location.path("settings/api");
    }

}

angular.module(moduleApi, [ngResourceId]).controller(ApiControllerId, ApiController);

