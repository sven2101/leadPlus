import { Product } from "./product.model";
export class OrderPosition {
    id: number;
    amount: number;
    product: Product;
    netPrice: number;
    discount: number;

    constructor() {
    }

}
