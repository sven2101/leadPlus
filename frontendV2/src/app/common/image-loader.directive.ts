import { HttpClient } from "./http-client";
import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appImageLoader]"
})
export class ImageLoaderDirective {

  @Input() appImageLoader: string;
  @Input() pictureId: number;

  constructor(el: ElementRef, private HttpClient: HttpClient) {
    el.nativeElement.style.backgroundColor = "yellow";
  }



}
