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
    inconsistency: string;

    constructor(toaster, $translate, ProductResource, $q) {
        this.toaster = toaster;
        this.translate = $translate;
        this.q = $q;
        this.productResource = ProductResource.resource;
        this.products = new Array<Product>();
        this.formdata = new FormData();
        this.getAllProducts();
    }

    async saveProduct(product: Product, insert: boolean): Promise<Product> {
        if (insert) {
            product.timestamp = newTimestamp();
        }
        try {
            let savedProduct = await this.productResource.createProduct(product).$promise;
            this.getAllProducts();
            this.inconsistency = null;
            return savedProduct;
        } catch (error) {
            throw error;
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