import { HttpClient } from "./http-client";
import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "img"
})
export class ImageLoaderDirective implements OnInit {

  public static readonly GET_FILEUPLOAD_CONTENT_BY_ID = "/api/rest/files/content/"

  @Input() pictureId: number;

  constructor(private el: ElementRef, private httpClient: HttpClient) { }

  async ngOnInit(): Promise<void> {

    if (this.pictureId != null) {
      const image = await this.httpClient.getBrowserCachedBase64Image(ImageLoaderDirective.GET_FILEUPLOAD_CONTENT_BY_ID + this.pictureId);
      this.el.nativeElement.src = "data:image/jpeg;base64," + image;
    }
  }

}
