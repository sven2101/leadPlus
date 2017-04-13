import { Product } from "./../product.model";
import { ProductService } from "./../product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {

  public product: Product = new Product();
  public productName: string;

  constructor(private ActivatedRoute: ActivatedRoute, private ProductService: ProductService, private Router: Router) { }

  async ngOnInit(): Promise<void> {
    const routeParam = this.ActivatedRoute.snapshot.params["id"];
    if (!isNaN(Number(routeParam))) {
      this.product = await this.ProductService.getProductById(routeParam);
      this.productName = this.product.name;
      if (this.product == null) { this.Router.navigate(["product"]); }
    } else if (routeParam === "new") {
      this.product = new Product();
    } else {
      this.Router.navigate(["product"]);
    }
  }

  public getProductPictureId(product: Product): string {
    return this.ProductService.getProductPictureId(product);
  }

  public async saveProduct(product: Product): Promise<void> {
    await this.ProductService.saveProduct(product);
    this.Router.navigate(["product"]);
  }

  public async deleteProduct(product: Product): Promise<void> {
    await this.ProductService.deleteProduct(product);
    this.Router.navigate(["product"]);
  }

}
