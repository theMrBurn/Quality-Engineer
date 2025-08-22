import { test, expect } from "@playwright/test";
import { FIM } from "./FIM_page";
import FIM_Login from "../../../../../helpers/login/fim_login";

// Test suite for F&I management, FIM page
test.describe.serial("F&I management, /FIM page @func", () => {
  test("Navigate to /FIM and validate page element functionality is working as expected", async ({
    page,
  }) => {
    const fimgmt = new FIM(page);
    await fimgmt.goto();

    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the login method

    await page.waitForLoadState("load");

    try {
      // Click user icon
      console.log(
        "validating page elements can be interacted with as expected..",
      );
      const userTag = await fimgmt.locators.fimUserTag();
      const menuItem = await fimgmt.locators.fimUserTagSignOut();

      await expect(userTag, menuItem).toBeVisible();

      // Validate page text
      const pageText = fimgmt.locators.fimStoresHeader(); // Ensure you call the locator function
      await expect(pageText).toContainText("Stores");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to /FIM and validate Footer link, when clicked, navigates to the correct support URL", async ({
    page,
  }) => {
    const fimgmt = new FIM(page);
    await fimgmt.goto();

    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the l

    await page.waitForLoadState("load");

    try {
      // Click support URL and wait for the new page to open
      const [newPage] = await Promise.all([
        page.waitForEvent("popup"), // Wait for the new tab to open
        fimgmt.locators.fimPageSupportLink().click(),
      ]);

      console.log("Clicked on the support link..");

      // Wait for the new page to load
      await newPage.waitForLoadState("networkidle");

      // Get the URL of the new page
      const currentURL = newPage.url();
      const supportLink =
        "https://lithia.service-now.com/rrc?id=emp_taxonomy_topic&topic_id=e7ef104e3bc6ee504d679c9c24e45ad9";

      // Validate the new URL
      await expect(currentURL).toBe(supportLink);
      console.log("Validating new TAB url..");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
