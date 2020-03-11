import { FileUpload } from "./../file-upload/file-upload.model";
import { ProductState } from "./product-state.enum";
export class Product {

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
