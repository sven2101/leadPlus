import { Router } from "@angular/router";
import { ProductService } from "./product.service";
import { Product } from "./product.model";
import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {

  public searchText = "";
  public productAmountLimit = 20;

  constructor(private ProductService: ProductService, private Router: Router) { }

  ngOnInit(): void {
    this.ProductService.refreshProducts();
  }

  public getProductPictureId(product: Product): string {
    return this.ProductService.getProductPictureId(product);
  }

  public getProducts(): Array<Product> {
    return this.ProductService.products;
  }

  public showProduct(id: number): void {
    this.Router.navigate(["product/detail/", (id === 0 ? "new" : id)]);
  }

}
