const { test, expect } = require("@playwright/test");
const { AdminStoreView } = require("./atlas_web.js");
const AtlasLogin = require("../../../../helpers/login/atlas_login.js");

test.describe.serial("Atlas Web - Page Elements @func", () => {
  test("Navigate to Atlas Web, click on first Dealership Listing and validate Seasonality Page elements have loaded as expected", async ({
    page,
  }) => {
    const adminStoreView = new AdminStoreView(page);
    await adminStoreView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      await page.getByText("STORE", { exact: true }).click();
      await page.getByText("L0000 Aop Test Store").click();
      await page.waitForLoadState();
      await page.waitForURL("/atlas/plan/0/history?history=2025");

      await page.goto("https://test.lpp.lithia.com/atlas/");
      await page
        .getByRole("row", { name: "0 L0000 Aop Test Store 2024 In Progress" })
        .getByTestId("ArrowCircleRightIcon");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, search for L0023 and validate search option has loaded, as expected", async ({
    page,
  }) => {
    const adminStoreView = new AdminStoreView(page);
    await adminStoreView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      await page.getByPlaceholder("SEARCH").click();
      await page.getByPlaceholder("SEARCH").fill("L0023");
      await page.getByRole("button", { name: "Submit" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, search for L0023 and validate search option Reset Filters works as expected", async ({
    page,
  }) => {
    const adminStoreView = new AdminStoreView(page);
    await adminStoreView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      await page.getByPlaceholder("SEARCH").click();
      await page.getByPlaceholder("SEARCH").fill("L0023");
      await page.getByRole("button", { name: "Submit" }).click();
      await page.getByRole("button", { name: "Reset Filters" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, scroll to bottom, click to validate pagination options", async ({
    page,
  }) => {
    test.fixme(
      "new rules show only Active Stores will show on Dealership Listings, skip this for now",
    );
    const adminStoreView = new AdminStoreView(page);
    await adminStoreView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // find NEXT pagination button and click
      await page.getByRole("link", { name: "" }).click();

      // Wait for the element to be visible
      const items = await page.getByRole("link", { name: "" });

      await expect(items).toBeVisible();

      // Validate the element text
      const textContent1Element = await page.locator(
        '//*[@id="root"]/div/div[3]/div/div/div/div/div[2]/div/div/div[4]/div[2]',
      );
      const textContent1 = await textContent1Element.textContent();

      const expectedTextPattern1 = /21 - 40 of 327 items/;
      await expect(textContent1).toMatch(expectedTextPattern1);

      // find BACK pagination button and click
      await page.getByRole("link", { name: "1", exact: true }).click();
      await page.waitForLoadState("networkidle");

      // Validate the pagination has returned to the first page as expected
      const textContent2Element = await page.locator(
        '//*[@id="root"]/div/div[3]/div/div/div/div/div[2]/div/div/div[4]/div[2]',
      );
      const textContent2 = await textContent2Element.textContent();

      const expectedTextPattern2 = /-\s*\d+\s*of\s*\d+\s*items/;
      await expect(textContent2).toMatch(expectedTextPattern2);

      //await expect(textContent2).toHaveText("- of items");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.");
    }
  });
});
