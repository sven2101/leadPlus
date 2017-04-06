import { FrontendV2Page } from "./app.po";

describe("frontend-v2 App", () => {
  let page: FrontendV2Page;

  beforeEach(() => {
    page = new FrontendV2Page();
  });

  it("should display message saying app works", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("app works!");
  });
});
