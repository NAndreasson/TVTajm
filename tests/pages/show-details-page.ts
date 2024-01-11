import { Locator, Page } from "@playwright/test";

export class ShowDetailsPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly summary: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByTestId("show-heading");
    this.summary = page.getByTestId("show-summary");
  }

  async goto(id: string) {
    await this.page.goto(`/shows/${id}`);
  }
}
