import { test, expect } from "@playwright/test";
import { FIM_Products } from "./FIM_products_tab";

// Test suite for F&I management, FIM page
test.describe
  .serial("Navigate to /FIM/Products and validate page element functionality is working as expected @func", () => {
  test("Navigate to /FIM/Products and validate when clicked, Stores tab navigates as expected", async ({
    page,
  }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    try {
      await page.waitForLoadState("load");

      // Click products tab
      console.log(
        "validating page elements can be interacted with as expected..",
      );
      await fimProducts.locators.storesTab().click();

      // Validate page text
      const pageText = fimProducts.locators.storesGrid(); // Ensure you call the locator function
      await expect(pageText).toContainText("This is the Stores page.");

      // Validate landing URL
      const currentURL = page.url();
      await expect(currentURL).toContain("/fim/stores"); // Ensure this matches the expected URL
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });
});
