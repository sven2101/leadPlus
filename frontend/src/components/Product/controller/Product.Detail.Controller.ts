/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../App/App.Constants.ts" />
/// <reference path="../../Statistic/model/ColumnChart.Model.ts" />" />

const ProductDetailControllerId: string = "ProductDetailController";

class ProductDetailController {

    $inject = [ProductServiceId, $routeParamsId, $scopeId, $rootScopeId, $locationId];
    productService: ProductService;
    routeParams;
    rootScope;
    product: Product;
    productFound: boolean;
    productHead: string;
    showImageCropper: boolean = true;
    isNewProduct: boolean;
    location;

    constructor(ProductService, $routeParams, $scope, $rootScope, $location) {
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
}
angular.module(moduleProductDetail, [ngResourceId]).controller(ProductDetailControllerId, ProductDetailController);

