import { test, expect } from "@playwright/test";
import { FIM_Products } from "./FIM_products_tab";
import FIM_Login from "../../../../../helpers/login/fim_login";

// Test suite for F&I management, FIM page
test.describe
  .serial("Navigate to /FIM/Products and validate page element functionality is working as expected @func @combined", () => {
  test("Validate Stores tab navigation", async ({ page }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();
    const fimLogin = new FIM_Login();
    await fimLogin.loginFIM(page);

    try {
      await page.waitForLoadState("load");
      await fimProducts.locators.storesTab().click();
      console.log("Clicked on Stores tab.");

      const pageText = fimProducts.locators.storesHeader();
      await expect(pageText).toContainText("Stores");
      console.log("Checked for expected text on Stores page.");

      const currentURL = page.url();
      await expect(currentURL).toContain("/fim/stores");
      console.log("Checked that URL is correct.");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error;
    }
  });

  test("Validate Add Products Modal opens correctly", async ({ page }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();
    const fimLogin = new FIM_Login();
    await fimLogin.loginFIM(page);

    try {
      await page.waitForLoadState("load");
      await fimProducts.locators.productsTab().click();

      await fimProducts.locators.addProductsButton().click();
      console.log("Clicked on Add Products button.");

      const pageText = fimProducts.locators.productsModal();
      await expect(pageText).toContainText("Enter details to add new product");
      console.log("Checked for expected text in Add Products modal.");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error;
    }
  });

  test("Validate Cancel Button functionality in Modal", async ({ page }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();
    const fimLogin = new FIM_Login();
    await fimLogin.loginFIM(page);

    try {
      await page.waitForLoadState("load");
      await fimProducts.locators.productsTab().click();

      await fimProducts.locators.addProductsButton().click();
      console.log("Clicked on Add Products button.");

      const pageText = fimProducts.locators.productsModal();
      await expect(pageText).toContainText("Enter details to add new product");
      console.log("Checked for expected text in Add Products modal.");

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
      throw error;
    }
  });

  test("Validate X Out Button functionality in Modal", async ({ page }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();
    const fimLogin = new FIM_Login();
    await fimLogin.loginFIM(page);

    try {
      await page.waitForLoadState("load");
      await fimProducts.locators.productsTab().click();

      await fimProducts.locators.addProductsButton().click();
      console.log("Clicked on Add Products button.");

      const pageText = fimProducts.locators.productsModal();
      await expect(pageText).toContainText("Enter details to add new product");
      console.log("Checked for expected text in Add Products modal.");

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
      throw error;
    }
  });

  test("Validate search functionality in Add Products Modal", async ({
    page,
  }) => {
    const fimProducts = new FIM_Products(page);
    await fimProducts.goto();
    const fimLogin = new FIM_Login();
    await fimLogin.loginFIM(page);

    try {
      await page.waitForLoadState("load");
      await fimProducts.locators.productsTab().click();
      console.log("Navigated to Products tab.");

      await fimProducts.locators.searchProducts().fill("Test Product");
      console.log("Filled search input with 'Test Product'.");

      const clearSearchX = fimProducts.locators.clearSearchX();
      //await expect(clearSearchX).toBeVisible();

      await clearSearchX.click();
      console.log("Clicked on Clear Search X.");

      await fimProducts.locators.searchProducts().fill("Test Product");
      console.log("Filled search input again with 'Test Product'.");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error;
    }
  });
});
