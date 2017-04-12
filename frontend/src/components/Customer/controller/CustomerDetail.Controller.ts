/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Customer/model/Customer.Model.ts" />
/// <reference path="../../App/App.Constants.ts" />

const CustomerDetailControllerId: string = "CustomerDetailController";

class CustomerDetailController {

    $inject = [CustomerServiceId, $routeParamsId, $scopeId, $rootScopeId, $locationId, SweetAlertId, $translateId, toasterId];
    customerService: CustomerService;
    routeParams;
    rootScope;
    customer: Customer;
    customerFound: boolean;
    customerHead: string;
    isNewCustomer: boolean;
    location;

    constructor(CustomerService, $routeParams, $scope, $rootScope, $location, private SweetAlert, private $translate, private toaster) {
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

    async deleteCustomer(): Promise<void> {
        try {
            await this.SweetAlert.swal({
                title: this.$translate.instant("COMMON_DELETE"),
                html: this.$translate.instant("COMMON_DELETE_QUESTITION"),
                type: "warning",
                showCancelButton: true,
                cancelButtonColor: "#3085d6",
                confirmButtonColor: "#d33",
                confirmButtonText: this.$translate.instant("COMMON_DELETE"),
                cancelButtonText: this.$translate.instant("COMMON_CANCEL")
            });
            await this.customerService.deleteCustomer(this.customer);
            this.location.path("/customer");
        } catch (error) {
            this.toaster.pop("error", "", this.$translate.instant("COMMON_DELETE_ERROR"));
        }
    }
}
angular.module(moduleCustomerDetail, [ngResourceId]).controller(CustomerDetailControllerId, CustomerDetailController);

