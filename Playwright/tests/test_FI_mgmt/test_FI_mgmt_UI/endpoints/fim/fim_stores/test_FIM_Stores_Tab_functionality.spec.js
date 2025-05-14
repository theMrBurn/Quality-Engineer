import { test, expect } from "@playwright/test";
import { FIM_Stores } from "./FIM_stores_tab";

// Test suite for F&I management, FIM page
test.describe
  .serial("Navigate to /FIM/Stores and validate page element functionality is working as expected @func", () => {
  test("Navigate to /FIM/Stores and validate when clicked, Products tab navigates as expected", async ({
    page,
  }) => {
    const fimStores = new FIM_Stores(page);
    await fimStores.goto();

    try {
      await page.waitForLoadState("load");

      // Click products tab
      console.log(
        "validating page elements can be interacted with as expected..",
      );
      await fimStores.locators.productsTab().click();

      // Validate page text
      const pageText = fimStores.locators.productsGrid(); // Ensure you call the locator function
      await expect(pageText).toContainText("This is the Products page.");

      // Validate landing URL
      const currentURL = page.url();
      await expect(currentURL).toContain("/fim/products");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });
});
