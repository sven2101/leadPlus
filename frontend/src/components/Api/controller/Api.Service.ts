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
    toaster;
    translate;
    ApiResource;
    q;
    formdata;
    currentEditApi: Api;
    uibModal;

    constructor(toaster, $translate, ApiResource, $q, $uibModal) {
        this.toaster = toaster;
        this.translate = $translate;
        this.uibModal = $uibModal;
        this.q = $q;
        this.ApiResource = ApiResource.resource;
        this.apis = new Array<Api>();
        this.formdata = new FormData();
    }

    save(api: Api) {
        let self = this;
        this.ApiResource.create(api).$promise.then(function (result: Api) {
            self.getAll();
            self.toaster.pop("success", "", self.translate.instant("SETTING_API_TOAST_SAVE"));

        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_API_TOAST_SAVE_ERROR"));
        });
    }

    update(api: Api): Promise<Api> {
        let defer = this.q.defer();
        let self = this;
        this.ApiResource.update(api).$promise.then(function (result: Api) {
            self.toaster.pop("success", "", self.translate.instant("SETTING_API_TOAST_SAVE"));
            let oldApi: Api = findElementById(self.apis, api.id);
            let index = self.apis.indexOf(oldApi);
            self.apis[index] = api;
            defer.resolve(result);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_API_TOAST_SAVE_ERROR"));
            defer.reject(null);
        });
        return defer.promise;
    }

    async testApi(api: Api): Promise<Api> {
        return this.ApiResource.testWeclapp(api).$promise;
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

    remove(api: Api) {
        let self = this;
        let indexOfApi = this.apis.indexOf(api);
        this.ApiResource.delete({ id: api.id }).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("SETTING_API_TOAST_DELETE"));
            self.apis.splice(indexOfApi, 1);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_API_TOAST_DELETE_ERROR"));
        });
    }

    openApiDeleteModal(api: Api) {
        this.uibModal.open({
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