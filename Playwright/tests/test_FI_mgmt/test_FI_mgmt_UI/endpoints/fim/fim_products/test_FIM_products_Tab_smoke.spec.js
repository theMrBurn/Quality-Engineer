import { test } from "@playwright/test";
import { FIM_Products } from "./FIM_products_tab";

test.describe.serial("/ F&I management, /FIM page/Sales @smoke", () => {
  test("Navigate to /FIM/Sales and validate page loads elements as expected", async ({
    page,
  }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    await page.waitForLoadState("load");

    const locatorNames = ["storesTab", "productsTab", "productsGrid"];

    try {
      for (const locatorName of locatorNames) {
        console.log(
          `Validating page element: ${locatorName} is present and has loaded as expected`,
        );
        await fimProducts.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
