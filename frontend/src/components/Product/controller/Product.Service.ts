/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Resource.ts" />

const ProductServiceId: string = "ProductService";

class ProductService {

    private $inject = [toasterId, $translateId, ProductResourceId, $qId];

    products: Array<Product>;
    toaster;
    translate;
    productResource;
    q;
    formdata;

    constructor(toaster, $translate, ProductResource, $q) {
        this.toaster = toaster;
        this.translate = $translate;
        this.q = $q;
        this.productResource = ProductResource.resource;
        this.products = new Array<Product>();
        this.formdata = new FormData();
        this.getAllProducts();
    }

    saveProduct(product: Product, insert: boolean) {
        let self = this;
        if (insert) {
            product.timestamp = newTimestamp();
            this.productResource.createProduct(product).$promise.then(function (result: Product) {
                // self.products.push(result);
                self.getAllProducts();
                self.toaster.pop("success", "", self.translate.instant("PRODUCT_TOAST_SAVE"));

            }, function () {
                self.toaster.pop("error", "", self.translate.instant("PRODUCT_TOAST_SAVE_ERROR"));
            });
        } else {
            this.productResource.createProduct(product).$promise.then(function (result: Product) {
                self.getAllProducts();
                self.toaster.pop("success", "", self.translate.instant("PRODUCT_TOAST_UPDATE"));

            }, function () {
                self.toaster.pop("error", "", self.translate.instant("PRODUCT_TOAST_UPDATE_ERROR"));
            });
        }
    }

    getAllProducts(): Promise<Array<Product>> {
        let defer = this.q.defer();
        let self = this;
        this.productResource.getAllProducts().$promise.then(function (result: Array<Product>) {
            self.products = result;
            defer.resolve(self.products);
        }, function (error: any) {
            defer.reject(error);
        });
        return defer.promise;
    }

    async getProductById(productId: number) {
        let product = await this.productResource.getProductById({ id: productId }).$promise as Product;
        if (isNullOrUndefined(product.id)) {
            return null;
        }
        return product;
    }

    getActiveProducts(): Array<Product> {
        let temp: Array<Product> = new Array<Product>();
        for (let product of this.products) {
            if (product.deactivated === false) {
                temp.push(product);
            }
        }
        return temp;
    }

    getTheFiles($files) {
        this.formdata.append("file", $files[0]);
    }

    async deleteProduct(product: Product): Promise<void> {
        product.picture = null;
        await this.productResource.createProduct(product).$promise;
        await this.productResource.deleteProduct({ id: product.id }).$promise;
    }
}

angular.module(moduleProductService, [ngResourceId]).service(ProductServiceId, ProductService);