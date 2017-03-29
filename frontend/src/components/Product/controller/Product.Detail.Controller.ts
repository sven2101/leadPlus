/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../App/App.Constants.ts" />
/// <reference path="../../Statistic/model/ColumnChart.Model.ts" />" />

const ProductDetailControllerId: string = "ProductDetailController";

class ProductDetailController {

    $inject = [ProductServiceId, $routeParamsId, $scopeId, $rootScopeId, $locationId, SweetAlertId, $translateId, toasterId];
    productService: ProductService;
    routeParams;
    rootScope;
    product: Product;
    productFound: boolean;
    productHead: string;
    showImageCropper: boolean = true;
    isNewProduct: boolean;
    location;

    constructor(ProductService, $routeParams, $scope, $rootScope, $location, private SweetAlert, private $translate, private toaster) {
        this.productService = ProductService;
        this.routeParams = $routeParams;
        this.rootScope = $rootScope;
        this.location = $location;
        this.initProduct(this.routeParams);
        let self = this;
        let productImageSaved = $rootScope.$on("productImageSaved", function (evt, data: FileUpload) {
            self.product.picture = isNullOrUndefined(data) ? self.product.picture : data[0];
            self.saveProduct();
        });
        $scope.$on("$destroy", function handler() {
            productImageSaved();
        });
    }

    async initProduct($routeParams) {
        let productId = $routeParams.productId;
        if (!isNullOrUndefined(productId) && productId !== 0 && !isNaN(productId) && angular.isNumber(+productId)) {
            this.product = await this.productService.getProductById(Number(productId));
            this.productHead = this.product.name;
            this.isNewProduct = false;
            isNullOrUndefined(this.product) ? this.productFound = false : this.productFound = true;
        } else if (!isNullOrUndefined(productId) && productId === "new") {
            this.product = new Product();
            this.productHead = "PRODUCT_CREATE";
            this.productFound = true;
            this.isNewProduct = true;
        }
        if (this.productFound === true) {
            if (isNullOrUndefined(this.productService.products)) {
                this.productService.getAllProducts();
            }

        }
    }

    savePicture() {
        this.rootScope.$broadcast("saveCroppedImage");
    }

    saveProduct() {
        this.productService.saveProduct(this.product, this.isNewProduct);
        this.location.path("/product");
    }

    async deleteProduct(): Promise<void> {
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
            await this.productService.deleteProduct(this.product);
            this.location.path("/product");
        } catch (error) {
            this.toaster.pop("error", "", this.$translate.instant("COMMON_DELETE_ERROR"));
        }
    }
}
angular.module(moduleProductDetail, [ngResourceId]).controller(ProductDetailControllerId, ProductDetailController);

