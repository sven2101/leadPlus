/// <reference path="../../Api/model/Api.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
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

const ApiServiceId: string = "ApiService";

class ApiService {

    private $inject = [toasterId, $translateId, ApiResourceId, $qId, $uibModalId];

    apis: Array<Api>;
    ApiResource;
    formdata;
    currentEditApi: Api;

    constructor(private toaster, private $translate, ApiResource, private $q, private $uibModal) {
        this.ApiResource = ApiResource.resource;
        this.apis = new Array<Api>();
        this.formdata = new FormData();
    }

    async save(api: Api) {
        try {
            await this.ApiResource.create(api).$promise;
            this.getAll();
        } catch (error) {
            this.toaster.pop("error", "", this.$translate.instant("SETTING_API_TOAST_SAVE_ERROR"));
        }
    }

    async update(api: Api): Promise<void> {
        try {
            await this.ApiResource.update(api).$promise;
            let oldApi: Api = findElementById(this.apis, api.id);
            let index = this.apis.indexOf(oldApi);
            this.apis[index] = api;
        }
        catch (error) {
            this.toaster.pop("error", "", this.$translate.instant("SETTING_API_TOAST_SAVE_ERROR"));
        }
    }

    async testApi(api: Api): Promise<Api> {
        return this.ApiResource.testWeclapp(api).$promise;
    }

    async weclappCreateCustomer(process: Process): Promise<any> {
        return this.ApiResource.createCustomer(process).$promise;
    }

    async getAll(): Promise<Array<Api>> {
        this.apis = await this.ApiResource.getAll().$promise;
        return this.apis;
    }

    async getApiById(id: number): Promise<Api> {
        let api: Api = await this.ApiResource.getById({ id: id }).$promise as Api;
        if (isNullOrUndefined(api.id)) {
            return null;
        }
        this.currentEditApi = api;
        return api;
    }

    async remove(api: Api): Promise<void> {
        try {
            let indexOfApi = this.apis.indexOf(api);
            await this.ApiResource.delete({ id: api.id }).$promise;
            this.toaster.pop("success", "", this.$translate.instant("SETTING_API_TOAST_DELETE"));
            this.apis.splice(indexOfApi, 1);
        } catch (error) {
            this.toaster.pop("error", "", this.$translate.instant("SETTING_API_TOAST_DELETE_ERROR"));
        }
    }

    openApiDeleteModal(api: Api) {
        this.$uibModal.open({
            templateUrl: "components/Api/view/Api.Delete.Modal.html",
            controller: "ApiDeleteController",
            controllerAs: "ApiDeleteCtrl",
            resolve: {
                api: function () {
                    return api;
                }
            }
        });
    }

}

angular.module(moduleApiService, [ngResourceId]).service(ApiServiceId, ApiService);