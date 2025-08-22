import { test, expect } from "@playwright/test";
import { FIM_Products } from "./FIM_products_tab";
import FIM_Login from "../../../../../helpers/login/fim_login";

// Test suite for F&I management, FIM Products page
test.describe
  .serial("Navigate to /FIM/Products and validate page element functionality is working as expected @smoke", () => {
  test("Navigate to /FIM/Products and validate page presents elements as expected", async ({
    page,
  }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the login method

    await page.waitForLoadState("load");

    await fimProducts.locators.productsTab().click();

    // Define the locators to validate
    const locatorNames = [
      "productsHeader",
      "storesTab",
      "productsTab",
      //"productsGrid", - need to get products grid data-test-tag in place 
      "searchProducts",
      "productNameColumn",
      "categoryColumn",
      "salesAmountColumn",
      "costAmountColumn",
      "grossAmountColumn",
    ];

    try {
      for (const locatorName of locatorNames) {
        console.log(
          `Validating page element: '${locatorName}' is present and has loaded as expected`,
        );
        await fimProducts.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
