import { Locator, Page, expect } from "@playwright/test";

export class ShowSearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly showListItems: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByTestId("search-input");
    this.showListItems = page.getByTestId("show-list-item");
  }

  async goto(query: string) {
    await this.page.goto(`/search?search=${query}`);
  }

  async searchFor(query) {
    await this.searchInput.fill(query);
    await this.searchInput.press("Enter");
  }

  async clickOnShowLink(title: string) {
    await this.page.getByTestId('show-link').filter( { hasText: title }).click();
  }

  async expecOnPageWithQuery(query: string) {
    await expect(this.page.url()).toContain(`/shows?search=${query}`);
    await expect(this.searchInput).toHaveValue(query);
  }
}
