/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../FileUpload/model/FileUpload.Model.ts" />

const ProductControllerId: string = "ProductController";

class ProductController {

    $inject = [ProductServiceId, toasterId, $locationId];

    toaster;
    productService: ProductService;
    location;
    productAmountLimit: number = 20;

    constructor(ProductService: ProductService, toaster, $location) {
        this.productService = ProductService;
        this.toaster = toaster;
        this.location = $location;
    }

    showProduct(id: number) {
        if (id === 0) {
            this.location.path("product/detail/new");
        } else {
            this.location.path("product/detail/" + id);
        }
    }

    refreshData(): void {
        this.productService.getAllProducts();
    }

    getLocalTimestamp: any = function (product: Product) {
        return toLocalDate(product.timestamp);
    };
}

angular.module(moduleProduct, [ngResourceId]).controller(ProductControllerId, ProductController);

