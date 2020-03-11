import { browser, element, by } from "protractor";

export class FrontendV2Page {
  navigateTo(): any {
    return browser.get("/");
  }

  getParagraphText(): any {
    return element(by.css("app-root h1")).getText();
  }
}
