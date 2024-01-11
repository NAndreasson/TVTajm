import { expect, test } from "@playwright/test";
import { LandingPage } from "./pages/landing-page";
import { ShowSearchPage } from "./pages/show-search-page";
import { ShowDetailsPage } from "./pages/show-details-page";

test.describe("Search Feature", () => {
  test("user can search for a show & view details", async ({ page }) => {
    await page.routeFromHAR(
      './tests/harFiles/search-feature.spec.har',
      {
        url: 'https://api.tvmaze.com/**',
        update: false
      })
    
    const landingPage = new LandingPage(page);
    const showSearchPage = new ShowSearchPage(page);
    const showDetailsPage = new ShowDetailsPage(page);

    await landingPage.goto();
    await landingPage.searchFor("Devs");

    await showSearchPage.expecOnPageWithQuery("Devs");

    // We were able to fetch two shows
    await expect(showSearchPage.showListItems).toHaveCount(10);

    // View details about Devs
    await showSearchPage.clickOnShowLink("Devs");

    await expect(showDetailsPage.summary).toContainText(
      "Devs focuses on a young software engineer named Lily Chan who works for Amaya"
    )
  });
});
