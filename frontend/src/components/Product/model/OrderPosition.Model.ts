/// <reference path="../../Product/model/Product.Model.ts" />

class OrderPosition {
    id: number;
    amount: number;
    product: Product;
    netPrice: number;
    discount: number;

    constructor() {
    }

}
