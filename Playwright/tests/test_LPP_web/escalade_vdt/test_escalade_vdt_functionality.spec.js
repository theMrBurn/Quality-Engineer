// Escalade VDT (now split into its own tab/app)

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { EscaladeVDT } = require("./escalade_vdt.js");

//test
test.describe.serial("Escalade VDT - Page Functionality @func", () => {
  test.slow();
  test("Navigate to Escalade VDT and validate Stock Number Column sort functioning as expected", async ({
    browser,
    page,
  }) => {
    const escaladeVDT = new EscaladeVDT(page);
    await escaladeVDT.goto();
    await page.waitForLoadState("domcontentloaded");

    try {
      // click Stock # column to re-order grid view
      await escaladeVDT.clickElement("vdtStockNumFilter");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade VDT and validate Stock Number Column Filter functioning as expected", async ({
    browser,
    page,
  }) => {
    const escaladeVDT = new EscaladeVDT(page);
    await escaladeVDT.goto();

    try {
      // click Stock # column to re-order grid view
      await escaladeVDT.clickElement("vdtStockNumColumn");

      //click Stock # and inner column Filter
      await escaladeVDT.clickElement("vdtStockNumSortedFilter");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade VDT and validate Stock Number Column Filter functionality, enter stock number validate result, clear filter", async ({
    browser,
    page,
  }) => {
    const escaladeVDT = new EscaladeVDT(page);
    await escaladeVDT.goto();

    try {
      // click Stock # column to re-order grid view
      await page.getByText("STOCK NUMBER").click();

      //click Stock # and inner column Filter
      await page
        .getByRole("columnheader", { name: "STOCK NUMBER  " })
        .locator("div span")
        .click();

      await page.getByText("Filter", { exact: true }).click();

      await page.getByRole("textbox").nth(1).fill("2H701000");

      //click 'Filter button' to narrow grid results
      await escaladeVDT.clickElement("vdtFilterButton");

      // Get all rows in the grid
      const rows = await page.$$(
        '//*[@id="root"]/div/div[1]/div[3]/span/div/div/div/div/div/div/div[3]/div',
      );

      await page.waitForLoadState("domcontentloaded");
      expect(rows.length).toBe(1);

      // clear filter
      await escaladeVDT.clickElement("vdtClearFilterButton");
    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade VDT and validate when Stock Number filtered, can be edited in Edit panel", async ({
    browser,
    page,
  }) => {
    const escaladeVDT = new EscaladeVDT(page);
    await escaladeVDT.goto();

    try {
      //click Stock # Column, and inner column Filter
      await escaladeVDT.clickElement("vdtStockNumFilter");
      await escaladeVDT.clickElement("vdtNestedFilter");
      //await page.getByText('Filter', { exact: true }).click();
      await page.getByRole("textbox").nth(1).fill("2H701000");
      await page.getByRole("button", { name: "Filter", exact: true }).click();

      //await escaladeVDT.clickElement("vdtFilterButton");
      await page.waitForLoadState("domcontentloaded");

      // click on Grid Result to expand Edit panel
      await escaladeVDT.findFirstGridRow();

      //validate expected text elements have loaded
      const locatorNames1 = ["infoIcon", "editButton"];

      for (const locatorName of locatorNames1) {
        await escaladeVDT.checkElementVisibility(locatorName);
      }

      // click Edit and then validate Cancel button available
      await escaladeVDT.clickElement("editButton");
      //validate expected text elements have loaded
      const locatorNames2 = ["cancelButton"];

      for (const locatorName of locatorNames2) {
        await escaladeVDT.checkElementVisibility(locatorName);
      }

      // click Cancel and validate Complete Button is available
      await escaladeVDT.clickElement("cancelButton");

      // click Edit and then validate Cancel button available
      await escaladeVDT.clickElement("editButton");
      await escaladeVDT.clickElement("cancelButton");
      //validate expected text elements have loaded
      const locatorNames3 = ["completeButton"];

      for (const locatorName of locatorNames3) {
        await escaladeVDT.checkElementVisibility(locatorName);
      }
      // // close panel
      await escaladeVDT.clickElement("closeEditPanelIcon");
    } catch (error) {
      console.log(`Failed to complete test due to: ${error}`);
    }
  });

  test("Navigate to Escalade VDT, click 'View Notes' on first grid item and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const escaladeVDT = new EscaladeVDT(page);
    await escaladeVDT.goto();

    try {
      await page.locator('[data-testid="AssignmentIcon"]').first().click();

      const vinText = page
        .locator('[data-test="sale-expanded-form-toolbar"] div')
        .first();
      await expect(vinText).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });


  test("Navigate to Escalade VDT and validate Export Grid Data is functioning as expected", async ({
    browser,
    page,
  }) => {
    const escaladeVDT = new EscaladeVDT(page);
    await escaladeVDT.goto();

    try {

      await page.reload();

      const gridLoaded = page.locator('//*[@id="root"]/div/div[1]/div[3]/span/div/div/div/div/div/div/div[3]');

      await expect(gridLoaded).toBeVisible();

      // click Stock # column to re-order grid view
      await escaladeVDT.clickElement("exportGridDataButton");

      //click through workflow steps to validate SAVE worked as intended
      await page.getByRole("button", { name: "Confirm" }).click();

      await expect(page.locator(".MuiBackdrop-root").first()).toBeHidden();
      await page.getByText("Successfully Downloaded VDT").click();

    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  {
    timeout: 120000;
  }
});
