import { HttpClient } from "./http-client";
import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "img"
})
export class ImageLoaderDirective {

  @Input() pictureId: number;

  constructor(el: ElementRef, private HttpClient: HttpClient) {

  }



}
