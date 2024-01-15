import { test, expect } from "@playwright/test";
import { ShowDetailsPage } from "./pages/show-details-page";

test.describe("Show Details Feature", () => {
  test.describe("when show exists", () => {
    test("user can reach show details by link", async ({ page }) => {
      await page.routeFromHAR(
        "./tests/harFiles/show-details-success.spec.har",
        {
          url: "https://api.tvmaze.com/**",
          update: false,
        }
      );

      const showDetailsPage = new ShowDetailsPage(page);
      await showDetailsPage.goto("35017");

      await expect(showDetailsPage.heading).toHaveText("Devs");
      await expect(showDetailsPage.summary).toContainText(
        "Devs focuses on a young software engineer named Lily Chan who works for Amaya"
      );
      await showDetailsPage.expectGenres([
        "Drama",
        "Science-Fiction",
        "Mystery",
      ]);
    });
  });

  test.describe("when show is not found", () => {
    test("the user is informed that the show is missing", async ({ page }) => {
      await page.routeFromHAR("./tests/harFiles/show-details-404.spec.har", {
        url: "https://api.tvmaze.com/**",
        update: false,
      });

      const showDetailsPage = new ShowDetailsPage(page);
      await showDetailsPage.goto("123123");

      await expect(page.getByText("Show not found")).toBeVisible();
    });
  });

  // TODO: Think these tests might be too specific for Playwright, possibly move to Vitest/react-testing-library
  test.describe("when TVMAZE API is down", () => {
    test("the user is informed", async ({ page }) => {
      await page.route("https://api.tvmaze.com/**", (route) => {
        route.fulfill({
          status: 500,
        });
      });

      const showDetailsPage = new ShowDetailsPage(page);
      await showDetailsPage.goto("1");

      await expect(page.getByText("Something went wrong")).toBeVisible();
    });
  });

  test.describe("when show is loading", () => {
    test("loading indicator is shown to user", async ({ page }) => {
      await page.route("https://api.tvmaze.com/shows/*", () => {});

      await page.goto("/shows/123123");

      await expect(page.getByTestId("show-loading-skeleton")).toBeVisible();
    });
  });
});
