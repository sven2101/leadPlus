/// <reference path="../../Api/model/Api.Model.ts" />
/// <reference path="../../Api/controller/Api.Service.ts" />
/// <reference path="../../app/App.Common.ts" />

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
    scope;
    apiService: ApiService;
    rootScope;
    sourceAmountLimit: number = 20;
    routeParams;

    api: Api;
    apiFound: boolean;
    apiHead: string;

    constructor(ApiService: ApiService, $rootScope, $translate, toaster, $scope, private SweetAlert, $location, $routeParams) {
        this.apiService = ApiService;
        this.rootScope = $rootScope;
        this.scope = $scope;
        this.translate = $translate;
        this.location = $location;
        this.toaster = toaster;
        this.routeParams = $routeParams;
        this.apiService.getAll();
        this.initApis($routeParams);
    }

    async initApis($routeParams) {
        let apiId = $routeParams.apiId;
        if (!isNullOrUndefined(apiId) && apiId !== 0 && !isNaN(apiId) && angular.isNumber(+apiId)) {
            this.api = await this.apiService.getApiById(Number(apiId));
            if (!isNullOrUndefined(this.api)) {
                this.api.authenticationValue = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
                this.apiHead = ApiVendor[this.api.apiVendor];
            }
            isNullOrUndefined(this.api) ? this.apiFound = false : this.apiFound = true;
        } else if (!isNullOrUndefined(apiId) && apiId === "new") {
            this.api = new Api();
            this.apiService.currentEditApi = this.api;
            this.apiHead = "SETTING_API_NEW";
            this.api.apiVendor = ApiVendor.WECLAPP;
            this.api.version = "v1";
            this.api.isVerified = false;
            this.api.isDeactivated = false;
            this.apiFound = true;
        }
        if (this.apiFound === true) {
            if (isNullOrUndefined(this.apiService.apis)) {
                this.apiService.getAll();
            }
        }
        this.apiService.inconsistency = null;
    }

    async save(): Promise<void> {
        if (this.api.authenticationValue.replace(/x/g, "") === "") {
            this.api.password = null;
            this.api.decrypted = false;
        } else {
            this.api.decrypted = true;
            this.api.password = b64EncodeUnicode(this.api.authenticationValue);
        }
        try {
            if (isNullOrUndefined(this.api.id)) {
                this.api.apiVendor = ApiVendor.WECLAPP;
                this.api.isVerified = true;
                await this.apiService.save(this.api);
            } else {
                await this.apiService.update(this.api);
            }
            this.goBack();
        } catch (error) {
            this.apiService.inconsistency = showConsistencyErrorMessage(error, this.translate, this.toaster, "SETTING_SINGLE_API");
            throw error;
        }
    }

    clearApi(): void {
        this.createApiForm.$setPristine();
        this.currentApi = new Api();
        this.isCurrentApiNew = true;
    }

    editApi(api: Api): void {
        this.createApiForm.$setPristine();
        this.currentEditApi = api;
        this.currentApi = new Api();
        this.currentApi.apiVendor = ApiVendor.WECLAPP;
        this.isCurrentApiNew = false;
        shallowCopy(this.currentEditApi, this.currentApi);
    }

    async saveApi(): Promise<void> {
        try {
            if (!this.isCurrentApiNew) {
                shallowCopy(this.currentApi, this.currentEditApi);
            }
            await this.apiService.save(this.currentApi);
            this.goBack();
        }
        catch (error) {
            this.apiService.inconsistency = showConsistencyErrorMessage(error, this.translate, this.toaster, "SETTING_SINGLE_API");
            throw error;
        }
    }

    goBack() {
        this.location.path("settings/api");
    }

    async testApi(): Promise<void> {
        try {
            if (this.api.authenticationValue.replace(/x/g, "") === "") {
                this.api.password = null;
                this.api.decrypted = false;
            } else {
                this.api.decrypted = true;
                this.api.password = b64EncodeUnicode(this.api.authenticationValue);
            }
            this.api.isVerified = true;
            await this.apiService.testApi(this.api);
            this.createApiForm.$setPristine();
            this.toaster.pop("success", "", this.translate.instant("SETTING_API_CONNECTION_SUCCESS"));
        } catch (error) {
            this.createApiForm.$setPristine();
            this.api.isVerified = false;
            this.toaster.pop("error", "", this.translate.instant("SETTING_API_CONNECTION_ERROR"));
        }
    }
}

angular.module(moduleApi, [ngResourceId]).controller(ApiControllerId, ApiController);

