import { test } from "@playwright/test";
import { FIM_Stores } from "./FIM_stores_tab";

test.describe.serial("/ F&I management, /FIM page/Sales @smoke", () => {
  test("Navigate to /FIM/Sales and validate page loads elements as expected", async ({
    page,
  }) => {
    const fimStores = new FIM_Stores(page);
    await fimStores.goto();

    await page.waitForLoadState("load");

    const locatorNames = [
      "storesTab",
      "productsTab",
      "storesGrid",
      "storeNameColumn",
      "addressColumn",
      "cityColumn",
      "stateColumn",
      "zipColumn",
      "storeNumberColumn",
    ];

    try {
      for (const locatorName of locatorNames) {
        console.log(
          `Validating page element: ${locatorName} is present and has loaded as expected`,
        );
        await fimStores.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
