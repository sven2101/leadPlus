/// <reference path="./ProductState.Model.ts" />
/// <reference path="../../FileUpload/model/FileUpload.Model.ts" />

class Product {

    id: number;
    name: string;
    description: string;
    netPrice: number;
    image: any;
    timestamp: any;
    deactivated: boolean;
    productState: ProductState;
    picture: FileUpload;
    productNumber;

    constructor() {
        this.name = "";
        this.description = "";
        this.deactivated = false;
        this.productState = ProductState.NEW;
    }

}
