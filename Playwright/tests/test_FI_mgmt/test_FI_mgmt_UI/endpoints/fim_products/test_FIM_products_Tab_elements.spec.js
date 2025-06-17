import { test, expect } from "@playwright/test";
import { FIM_Products } from "./FIM_products_tab";

// Test suite for F&I management, FIM page
test.describe
  .serial("Navigate to /FIM/Products and validate page element functionality is working as expected @func", () => {
  test("Validate Stores tab navigation", async ({ page }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    try {
      await page.waitForLoadState("load");

      // Click products tab
      await fimProducts.locators.storesTab().click();
      console.log("Clicked on Stores tab.");

      // Check page text
      const pageText = fimProducts.locators.storesHeader();
      await expect(pageText).toContainText("Stores");
      console.log("Checked for expected text on Stores page.");

      // Check landing URL
      const currentURL = page.url();
      await expect(currentURL).toContain("/fim/stores");
      console.log("Checked that URL is correct.");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Validate Add Products Modal opens correctly", async ({ page }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    try {
      await page.waitForLoadState("load");

      // Click Add Products button
      await fimProducts.locators.addProductsButton().click();
      console.log("Clicked on Add Products button.");

      // Check modal text
      const pageText = fimProducts.locators.productsModal();
      await expect(pageText).toContainText("Enter details to add new product");
      console.log("Checked for expected text in Add Products modal.");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Validate Cancel Button functionality in Modal", async ({ page }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    try {
      await page.waitForLoadState("load");

      // Click Add Products button
      await fimProducts.locators.addProductsButton().click();
      console.log("Clicked on Add Products button.");

      // Check modal text
      const pageText = fimProducts.locators.productsModal();
      await expect(pageText).toContainText("Enter details to add new product");
      console.log("Checked for expected text in Add Products modal.");

      // Click cancel
      await fimProducts.locators.cancelButton().click();
      console.log("Clicked on Cancel button.");

      const addProdHeader = page
        .locator("div")
        .filter({ hasText: /^Add Product$/ })
        .nth(1);
      await expect(addProdHeader).not.toBeVisible();
      console.log("Checked that Add Product header is no longer visible.");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Validate X Out Button functionality in Modal", async ({ page }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    try {
      await page.waitForLoadState("load");

      // Click Add Products button
      await fimProducts.locators.addProductsButton().click();
      console.log("Clicked on Add Products button.");

      // Check modal text
      const pageText = fimProducts.locators.productsModal();
      await expect(pageText).toContainText("Enter details to add new product");
      console.log("Checked for expected text in Add Products modal.");

      // Click X Out
      await fimProducts.locators.xOutButton().click();
      console.log("Clicked on X Out button.");

      const addProdHeader = page
        .locator("div")
        .filter({ hasText: /^Add Product$/ })
        .nth(1);
      await expect(addProdHeader).not.toBeVisible();
      console.log("Checked that Add Product header is no longer visible.");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Validate search functionality in Add Products Modal", async ({
    page,
  }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();

    try {
      await page.waitForLoadState("load");

      await fimProducts.locators.searchProducts().fill("Test Product");
      console.log("Filled search input with 'Test Product'.");

      const testProduct = page.getByTestId("product-cell-0");

      await expect(testProduct).toContainText("Test Product");
      console.log("Checked that products grid contains 'Test Product'.");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });
});
