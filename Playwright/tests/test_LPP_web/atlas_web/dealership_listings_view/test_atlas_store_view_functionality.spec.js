// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminStoreView } = require("./atlas_web.js");
const NetworkInterceptor = require("../../../../helpers/network_interceptor.js");

//test
test.describe.serial("Atlas Web - Page Elements @func", () => {
  test("Navigate to Atlas Web, click on first Dealership Listing and validate Seasonality Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const adminStoreView = new AdminStoreView(page);
    await adminStoreView.goto();

    await page.getByRole("gridcell", { name: "1", exact: true }).click();
    await page.waitForLoadState();
    await page.waitForURL("/atlas/plan/1/history?history=2024");

    await page.goto("https://test.lpp.lithia.com/atlas/");
    await page
      .getByRole("row", { name: "0 L0000 Aop Test Store 2024 In Progress" })
      .getByTestId("ArrowCircleRightIcon");
  });

  test("Navigate to Atlas Web, search for L0023 and validate search option has loaded, as expected", async ({
    browser,
    page,
  }) => {
    const adminStoreView = new AdminStoreView(page);
    await adminStoreView.goto();

    // Your existing test steps
    await page.getByPlaceholder("SEARCH").click();
    await page.getByPlaceholder("SEARCH").fill("L0023");
    await page.getByRole("button", { name: "Submit" }).click();
  });

  test("Navigate to Atlas Web, search for L0023 and validate search option Reset Filters works as expected", async ({
    browser,
    page,
  }) => {
    const adminStoreView = new AdminStoreView(page);
    await adminStoreView.goto();

    // Your existing test steps
    await page.getByPlaceholder("SEARCH").click();
    await page.getByPlaceholder("SEARCH").fill("L0023");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByRole("button", { name: "Reset Filters" }).click();
  });

  test("Navigate to Atlas Web, scroll to bottom, click to validate pagination options", async ({
    browser,
    page,
  }) => {
    const adminStoreView = new AdminStoreView(page);
    await adminStoreView.goto();

    try {
      // find NEXT pagination button and click
      await page.getByRole("link", { name: "" }).click();

      // Wait for the element to be visible
      const items = await page.getByRole("link", { name: "" });
      await expect(items).toBeVisible();

      // Validate the element text
      const textContent1 = await page.locator(
        "#root > div > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > div > div > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-kc4ax5 > div > div > div.k-pager-wrap.k-pager.k-widget.k-grid-pager > div.k-pager-info.k-label",
      );
      await expect(textContent1).toHaveText("21 - 40 of 318 items");

      // find BACK pagination button and click
      await page.getByRole("link", { name: "1", exact: true }).click();
      await page.waitForLoadState("networkidle");

      // Validate the pagination has returned to the first page as expected
      const textContent2 = await page.locator(
        "#root > div > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > div > div > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-kc4ax5 > div > div > div.k-pager-wrap.k-pager.k-widget.k-grid-pager > div.k-pager-info.k-label",
      );
      await expect(textContent2).toHaveText("1 - 20 of 318 items");
    } catch (error) {
      console.error("Test failed:", error.message);
      // Close the browser in case of failure
      await browser.close();
      // Exit the process with a non-zero code to indicate test failure
      process.exit(1);
    } finally {
      // Close the browser in case of success -> this isn't working for some reason?
      // await browser.close();
    }
  });
});
