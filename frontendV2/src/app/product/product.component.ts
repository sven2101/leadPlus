import { ProcessStatus } from "./../process/process-status.enum";
import { ProcessService } from "./../process/process.service";
import { User } from "./../user/user.model";
import { TestMessage } from "./../messaging/test-message";
import { MessagingService } from "./../messaging/messaging.service";
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

  public text = 1;

  constructor(private ProductService: ProductService, private Router: Router, private MessagingService: MessagingService, private processService: ProcessService) { }

  async ngOnInit() {
    this.ProductService.refreshProducts();
    const x = await this.processService.getAllProcessesByStatusPageCached(ProcessStatus.OPEN);
    x.setDirty();
  }

  ngOnDestroy(): void {

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

  public publish(): void {
    const x = new User;
    x.id = this.text;
    x.firstname = "coole Sache" + this.text;
    this.MessagingService.publish<TestMessage>(new TestMessage(x));
  }

}
