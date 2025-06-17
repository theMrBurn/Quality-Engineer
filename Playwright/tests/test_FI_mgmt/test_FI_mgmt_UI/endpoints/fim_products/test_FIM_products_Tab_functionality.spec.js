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
      const pageText = fimProducts.locators.storesHeader(); // Ensure you call the locator function
      await expect(pageText).toContainText("Stores");

      // Validate landing URL
      const currentURL = page.url();
      await expect(currentURL).toContain("/fim/stores"); // Ensure this matches the expected URL
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Navigate to /FIM/Products and validate when clicked, Add Products Modal presents as expected", async ({
    page,
  }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    try {
      await page.waitForLoadState("load");

      // Click Add Products button
      console.log(
        "validating page elements can be interacted with as expected.. attempting to Click Add Products button",
      );
      await fimProducts.locators.addProductsButton().click();

      // Validate page text
      const pageText = fimProducts.locators.productsModal(); // Ensure you call the locator function
      await expect(pageText).toContainText("Enter details to add new product");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Navigate to /FIM/Products and validate can use Cancel Button to cancel out of Modal", async ({
    page,
  }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    try {
      await page.waitForLoadState("load");

      // Click Add Products button
      console.log(
        "validating page elements can be interacted with as expected.. attempting to Click Add Products button",
      );
      await fimProducts.locators.addProductsButton().click();

      // Validate page text
      const pageText = fimProducts.locators.productsModal(); // Ensure you call the locator function
      await expect(pageText).toContainText("Enter details to add new product");

      // click cancel and land back on main page
      await fimProducts.locators.cancelButton().click();

      const addProdHeader = page
        .locator("div")
        .filter({ hasText: /^Add Product$/ })
        .nth(1);
      await expect(addProdHeader).not.toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Navigate to /FIM/Products and validate can use X Out Button to cancel out of Modal", async ({
    page,
  }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    try {
      await page.waitForLoadState("load");

      // Click Add Products button
      console.log(
        "validating page elements can be interacted with as expected.. attempting to Click Add Products button",
      );
      await fimProducts.locators.addProductsButton().click();

      // Validate page text
      const pageText = fimProducts.locators.productsModal(); // Ensure you call the locator function
      await expect(pageText).toContainText("Enter details to add new product");

      // click cancel and land back on main page
      await fimProducts.locators.xOutButton().click();

      const addProdHeader = page
        .locator("div")
        .filter({ hasText: /^Add Product$/ })
        .nth(1);
      await expect(addProdHeader).not.toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Navigate to /FIM/Products and validate when clicked, Add Products Modal presents functionality works as expected", async ({
    page,
  }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    try {
      await page.waitForLoadState("load");

      await fimProducts.locators.searchProducts().fill("Test Product");

      const testProduct = page.getByTestId("product-cell-0");

      await expect(testProduct).toContainText("Test Product");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });
});
