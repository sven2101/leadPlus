import { HttpClient } from "./http-client";
import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "img"
})
export class ImageLoaderDirective implements OnInit {

  public static readonly GET_FILEUPLOAD_CONTENT_BY_ID = "/api/rest/files/content/"

  @Input() pictureId: number;
  @Input() src: any;

  constructor(private el: ElementRef, private httpClient: HttpClient) { }

  async ngOnInit(): Promise<void> {

    if (this.pictureId != null) {
      const x = await this.httpClient.getBrowserCached(ImageLoaderDirective.GET_FILEUPLOAD_CONTENT_BY_ID + this.pictureId) as any;
      console.log(x);
      const arr = new Uint8Array(x);
      let raw = "";
      let i, j, subArray, chunk = 5000;
      for (i = 0, j = arr.length; i < j; i += chunk) {
        subArray = arr.subarray(i, i + chunk);
        raw += String.fromCharCode.apply(null, subArray);
      }
      const b64 = btoa(raw);
      this.src = "data:image/jpeg;base64," + b64;
      console.log(b64);
      console.log(this.src);
    }
  }

}
