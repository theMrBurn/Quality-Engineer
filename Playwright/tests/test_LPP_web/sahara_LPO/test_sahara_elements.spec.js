import { test } from "@playwright/test";
import { SaharaLPO } from "./sahara_LPO.js";

test.describe.serial("Sahara Lien Payoff - Page Elements @smoke", () => {
  test("Navigate to Sahara Lien Payoff and validate page elements have loaded as expected", async ({
    page,
  }) => {
    const saharaLPO = new SaharaLPO(page);

    await saharaLPO.waitForPageLoad();

    const locatorNames = [
      "pageHeader",
      "logoLPO",
      "searchBar",
      "groupDropdown",
      "approvedColumn",
      "idColumn",
      "storeNumberColumn",
      "customerColumn",
      "salesStockNumberColumn",
      "tradeVINColumn",
      "gridToolbarLPO",
    ];

    try {
      for (const locatorName of locatorNames) {
        console.log(`Validating page element: '${locatorName}' is visible`);
        await saharaLPO.checkElementVisibility(locatorName);
      }

    } catch (error) {
      console.error("Error during page element validation:", error.message);
      throw new Error(`Smoke test failed with error: ${error.message}`);
    }
  });
});
