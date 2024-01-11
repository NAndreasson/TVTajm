import { Locator, Page } from "@playwright/test";

export class LandingPage {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId("search-input");
  }

  async goto() {
    await this.page.goto("/");
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press("Enter");
  }
}
