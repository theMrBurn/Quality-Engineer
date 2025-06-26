import { test, expect } from "@playwright/test";
import { FIM_Stores } from "./FIM_stores_tab";
import FIM_Login from "../../../../../helpers/login/fim_login";

// Test suite for F&I management, FIM page
test.describe
  .serial("Navigate to /FIM/Stores and validate page element functionality is working as expected @func", () => {
  test("Navigate to /FIM/Stores and validate when clicked, Products tab navigates as expected", async ({
    page,
  }) => {
    const fimStores = new FIM_Stores(page);
    await fimStores.goto();

    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the login method

    try {
      await page.waitForLoadState("load");

      // Click products tab
      console.log(
        "validating page elements can be interacted with as expected..",
      );
      await fimStores.locators.productsTab().click();

      // Validate page text headers
      const expectedHeaders = [
        "Product Name",
        "Category",
        "Sales Amount",
        "Cost Amount",
        "Gross Amount",
      ];

      for (const header of expectedHeaders) {
        const headerLocator = page
          .getByRole("columnheader", { name: header })
          .locator("span")
          .nth(0);
        await expect(headerLocator).toBeVisible(); // Ensure header is visible
        await expect(headerLocator).toHaveText(header); // Validate header text
      }

      // Validate landing URL
      const currentURL = page.url();
      await expect(currentURL).toContain("/fim/products");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Navigate to /FIM/Stores and validate pagination elements can be interacted with", async ({
    page,
  }) => {
    const fimStores = new FIM_Stores(page);
    await fimStores.goto();

    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the login method

    try {
      await page.waitForLoadState("load");

      // Validate items per page
      console.log("validating items per page interaction..");
      await page.getByText("10Items per page123456Items 1");

      // Click accessibility ID element
      await page.locator('[id="«r5j»-accessibility-id"]');

      // Click on items per page label
      await page.getByText("Items per page");

      // Validate pagination text
      await page.getByText("Items 1 - 10 of"); // Initial items text

      // Click select button
      await page.getByRole("button", { name: "select" }).click();

      // Select 15 items from the dropdown
      await page.getByRole("option", { name: "15" }).click();

      // Validate the updated pagination text
      const pageCountUpdated = await page.getByText("Items 1 - 15 of");

      await expect(pageCountUpdated).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Navigate to /FIM/Stores and validate when Navigating to Specific Store from the grid, Add Products Button presents as expected", async ({
    page,
  }) => {
    const fimStores = new FIM_Stores(page);
    await fimStores.goto();
    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the login method
    try {
      await page.waitForLoadState("load");

      // Click on store name cell
      await page.getByTestId("store-name-cell-318").click();
      // Click on store link
      await page.getByTestId("store-link-318").click();

      // Click on store product header
      await page.getByTestId("storeproduct-header").click(); // Make sure click is here if needed

      // Access the add products button locator
      const addProductsButton = fimStores.locators.addProductsButton(); // Call as a function

      // Verify that the add products button is visible
      await expect(addProductsButton).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Navigate to /FIM/Stores and validate can use Cancel Button to cancel out of Modal", async ({
    page,
  }) => {
    const fimStores = new FIM_Stores(page);
    await fimStores.goto();
    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the login method
    try {
      await page.waitForLoadState("load");

      // Click on store name cell
      await page.getByTestId("store-name-cell-318").click();
      // Click on store link
      await page.getByTestId("store-link-318").click();
      // Click on store product header
      await page.getByTestId("storeproduct-header").click();
      // Click to open add store products modal
      await page.getByTestId("open-add-store-products-modal-button").click();

      // Click on 'Add Products'
      await page
        .getByTestId("add-store-products-modal")
        .getByText("Add Products")
        .click();

      // Click on the heading to select products
      await page
        .getByRole("heading", { name: "Select products to add to" })
        .click();

      // Search for products to add
      await page.getByTestId("search-products-input").click();
      await page.getByTestId("search-products-input").fill("test");
      await page
        .getByTestId("add-store-products-modal")
        .getByTestId("SearchIcon")
        .click();

      // Clear the search input
      await page.getByTestId("search-products-input").click();
      await page.getByTestId("search-products-input").fill("");

      // Cancel adding products
      await page.getByTestId("cancel-add-products-button").click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Navigate to /FIM/Stores and validate can use X Out Button to cancel out of Modal", async ({
    page,
  }) => {
    const fimStores = new FIM_Stores(page);
    await fimStores.goto();
    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the login method
    try {
      await page.waitForLoadState("load");

      // Click on store name cell
      await page.getByTestId("store-name-cell-318").click();
      // Click on store link
      await page.getByTestId("store-link-318").click();
      // Click on store product header
      await page.getByTestId("storeproduct-header").click();
      // Click to open add store products modal
      await page.getByTestId("open-add-store-products-modal-button").click();

      // Click on 'Add Products'
      await page
        .getByTestId("add-store-products-modal")
        .getByText("Add Products")
        .click();

      // Click on the heading to select products
      await page
        .getByRole("heading", { name: "Select products to add to" })
        .click();

      // Search for products to add
      await page.getByTestId("search-products-input").click();
      await page.getByTestId("search-products-input").fill("test");
      await page
        .getByTestId("add-store-products-modal")
        .getByTestId("SearchIcon")
        .click();

      // Clear the search input
      await page.getByTestId("search-products-input").click();
      await page.getByTestId("search-products-input").fill("");

      // X Out adding products
      await page.getByRole("button", { name: "close" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Navigate to /FIM/Stores and validate when clicked, Add Store Products Modal presents functionality works as expected", async ({
    page,
  }) => {
    const fimStores = new FIM_Stores(page);
    await fimStores.goto();
    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the login method
    try {
      await page.waitForLoadState("load");

      // Click on store name cell
      await page.getByTestId("store-name-cell-318").click();
      // Click on store link
      await page.getByTestId("store-link-318").click();
      // Click on store product header
      await page.getByTestId("storeproduct-header").click();
      // Click to open add store products modal
      await page.getByTestId("open-add-store-products-modal-button").click();

      // Click on 'Add Products'
      await page
        .getByTestId("add-store-products-modal")
        .getByText("Add Products")
        .click();

      // Click on the heading to select products
      await page
        .getByRole("heading", { name: "Select products to add to" })
        .click();

      // Search for products to add
      await page.getByTestId("search-products-input").click();
      await page.getByTestId("search-products-input").fill("test");
      await page
        .getByTestId("add-store-products-modal")
        .getByTestId("SearchIcon")
        .click();

      // Clear the search input
      await page.getByTestId("search-products-input").click();
      await page.getByTestId("search-products-input").fill("");

      // Cancel adding products
      await page.getByTestId("cancel-add-products-button").click();

      // Reopen add store products modal
      await page.getByTestId("open-add-store-products-modal-button").click();
      await page.getByRole("button", { name: "close" }).click(); // Closing the modal

      // Open the modal again
      await page.getByTestId("open-add-store-products-modal-button").click();

      // Select specific products
      await page
        .getByRole("row", { name: "Select Row Windshield Purchase" })
        .getByLabel("Select Row")
        .check();
      await page.getByTestId("cancel-add-products-button").click();
      await page.getByTestId("open-add-store-products-modal-button").click();
      await page
        .getByRole("row", { name: "Select Row Windshield Purchase" })
        .getByLabel("Select Row")
        .check();
      await page
        .getByRole("row", { name: "Select Row Wear Tear Lease" })
        .getByLabel("Select Row")
        .check();
      await page
        .getByRole("row", { name: "Select Row Upsell Nitro Purchase" })
        .getByLabel("Select Row")
        .check();
      await page
        .getByRole("row", { name: "Select Row PDR Purchase" })
        .getByLabel("Select Row")
        .check();

      // Cancel adding products again
      await page.getByTestId("cancel-add-products-button").click();

      // Open the modal again
      await page.getByTestId("open-add-store-products-modal-button").click();

      // Select additional products
      await page
        .getByRole("row", { name: "Select Row GPS Lease" })
        .locator("span")
        .click();
      await page
        .getByRole("row", { name: "Select Row GPS Purchase" })
        .getByLabel("Select Row")
        .check();
      await page
        .getByRole("row", { name: "Select Row ETCH Lease" })
        .getByLabel("Select Row")
        .check();
      await page
        .getByRole("row", { name: "Select Row Test Product 189" })
        .getByLabel("Select Row")
        .check();

      // Submit selected products
      await page.getByTestId("submit-products-button").click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });

  test("Navigate to /FIM/Stores and validate edit Store Product functionality works as expected, then delete", async ({
    page,
  }) => {
    const fimStores = new FIM_Stores(page);
    await fimStores.goto();

    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the login method

    try {
      await page.waitForLoadState("load");

      await page.getByTestId("store-link-447").click();

      await page.getByTestId("open-add-store-products-modal-button").click();
      await page
        .getByRole("row", { name: "Select Row Test Product Lease" })
        .getByLabel("Select Row")
        .check();
      await page.getByTestId("submit-products-button").click();
      await page.getByRole("textbox", { name: "Search Products" }).click();
      await page.getByRole("textbox", { name: "Search Products" }).fill("test");
      await page
        .getByRole("columnheader", { name: "Product Name" })
        .locator("span")
        .nth(1)
        .click();
      await page.getByTestId("editproduct-2").click();
      await page
        .getByTestId("gross-amount-field")
        .getByRole("button", { name: "Open" })
        .click();
      await page.getByRole("option", { name: "Miscellaneous5" }).click();
      await page
        .getByTestId("sales-amount-field")
        .getByRole("button", { name: "Open" })
        .click();
      await page.getByRole("option", { name: "Miscellaneous3" }).click();
      await page.getByTestId("save-edit-product-button").click();

      await page.waitForLoadState("load");

      // may need to save these as CONST objects to assert against later
      await page.getByText("Test Product updated");
      await page.getByTestId("success-icon");

      // await page.getByRole('row', { name: 'Test Product Lease' }).locator('path').nth(1).click();
      // await page.getByRole('row', { name: 'Test Product Lease' }).getByTestId('delete-product-undefined').click();
      // await page.getByText('Remove Product?').click();
      // await page.getByTestId('cancel-remove-button').click();
      // await page.getByRole('row', { name: 'Test Product Lease' }).getByTestId('delete-product-undefined').click();
      // await page.getByRole('button', { name: 'close' }).click();
      // await page.getByRole('row', { name: 'Test Product Lease' }).getByTestId('delete-product-undefined').click();
      // await page.getByTestId('confirm-remove-button').click();
      // await page.getByTestId('success-icon').click();

      //await page.getByText('Test Product successfully').toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw error; // Re-throw the error to fail the test
    }
  });
});
