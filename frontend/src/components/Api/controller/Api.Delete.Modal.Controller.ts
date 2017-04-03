const ApiDeleteControllerId: string = "ApiDeleteController";

class ApiDeleteController {
    private $inject = [ApiServiceId, $uibModalId, "api"];

    apiService: ApiService;
    uibModalInstance: any;
    api: Api;

    constructor(ApiService, $uibModalInstance, api) {
        this.apiService = ApiService;
        this.uibModalInstance = $uibModalInstance;
        this.api = api;
    }

    remove() {
        this.apiService.remove(this.api);
        this.close();
    }

    close() {
        this.uibModalInstance.close();
    }

}
angular.module(moduleDeleteApi, [ngResourceId]).controller(ApiDeleteControllerId, ApiDeleteController);