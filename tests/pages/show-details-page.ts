import { Locator, Page, expect } from "@playwright/test";

export class ShowDetailsPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly summary: Locator;
  readonly genres: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByTestId("show-heading");
    this.summary = page.getByTestId("show-summary");
    this.genres = page.getByTestId("genres");
  }

  async goto(id: string) {
    await this.page.goto(`/shows/${id}`);
  }

  async expectGenres(expectedGenres: string[]) {
    for (const genre of expectedGenres) {
      await expect(this.genres).toContainText(genre);
    }
  }
}
