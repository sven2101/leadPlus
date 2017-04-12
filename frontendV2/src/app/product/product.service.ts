import { HttpClient } from "./../common/http-client";
import { ToasterService } from "angular2-toaster";
import { Product } from "./product.model";
import { Injectable } from "@angular/core";

import { Common } from "./../common/common";

@Injectable()
export class ProductService {

  public static readonly PRODUCT_URL = "/api/rest/products";
  public static readonly PRODUCT_URL_BY_ID = "/api/rest/products/";

  products: Array<Product> = [];

  constructor(private ToasterService: ToasterService, private HttpClient: HttpClient) {
    this.refreshProducts();
  }

  public getProductPictureId(product: Product): string {
    if (product == null || product.picture == null) { return ""; }
    return "/api/rest/files/content/" + product.picture.id;
  }

  async refreshProducts(): Promise<void> {
    this.products = await this.getAllProducts();
  }

  async saveProduct(product: Product): Promise<Product> {
    console.log(product);
    product.timestamp = product.id == null ? Common.newTimestamp() : product.timestamp;
    return this.HttpClient.post<Product>(ProductService.PRODUCT_URL, product);
  }

  async getAllProducts(): Promise<Array<Product>> {
    return this.HttpClient.get<Array<Product>>(ProductService.PRODUCT_URL);
  }

  async getProductById(productId: number): Promise<Product> {
    return this.HttpClient.get<Product>(ProductService.PRODUCT_URL_BY_ID + productId);
  }

  getActiveProducts(): Array<Product> {
    return this.products.filter(p => p.deactivated === false);
  }

  async deleteProduct(product: Product): Promise<void> {
    if (product.picture != null) {
      product.picture = null;
      await this.saveProduct(product);
    }
    await this.HttpClient.delete<Product>(ProductService.PRODUCT_URL_BY_ID + product.id);
  }

}
