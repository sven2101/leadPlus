/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Customer/model/Customer.Model.ts" />
/// <reference path="../../App/App.Constants.ts" />

const CustomerDetailControllerId: string = "CustomerDetailController";

class CustomerDetailController {

    $inject = [CustomerServiceId, $routeParamsId, $scopeId, $rootScopeId, $locationId];
    customerService: CustomerService;
    routeParams;
    rootScope;
    customer: Customer;
    customerFound: boolean;
    customerHead: string;
    isNewCustomer: boolean;
    location;

    constructor(CustomerService, $routeParams, $scope, $rootScope, $location) {
        this.customerService = CustomerService;
        this.routeParams = $routeParams;
        this.rootScope = $rootScope;
        this.location = $location;
        this.initCustomer(this.routeParams);
    }

    async initCustomer($routeParams) {
        let customerId = $routeParams.customerId;
        if (!isNullOrUndefined(customerId) && customerId !== 0 && !isNaN(customerId) && angular.isNumber(+customerId)) {
            this.customer = await this.customerService.getCustomerById(Number(customerId));
            this.customerHead = this.customer.firstname + " " + this.customer.lastname;
            this.isNewCustomer = false;
            isNullOrUndefined(this.customer) ? this.customerFound = false : this.customerFound = true;
        } else if (!isNullOrUndefined(customerId) && customerId === "new") {
            this.customer = new Customer();
            this.customerHead = "CUSTOMER_CREATE";
            this.customerFound = true;
            this.isNewCustomer = true;
        }
    }

    async saveCustomer() {
        await this.customerService.saveCustomer(this.customer, this.isNewCustomer);
        this.location.path("/customer");
    }

    copyBillingAddress() {
        if (!isNullOrUndefined(this.customer.deliveryAddress) && !isNullOrUndefined(this.customer.billingAddress)) {
            let oldId = this.customer.deliveryAddress.id;
            shallowCopy(this.customer.billingAddress, this.customer.deliveryAddress);
            this.customer.deliveryAddress.id = oldId;
        }
    }

}
angular.module(moduleCustomerDetail, [ngResourceId]).controller(CustomerDetailControllerId, CustomerDetailController);

