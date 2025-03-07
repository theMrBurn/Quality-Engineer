// Escalade DIMS

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { EscaladeDIMS } = require("./escalade_dims.js");

//for upload tests
const salesData1 =
  "/Playwright/helpers/misc_test_helper_files/Manheim_2023-05-25.csv";
const salesData2 =
  "/Playwright/helpers/misc_test_helper_files/Manheim_2023-05-29.csv";
const salesData3 =
  "/Playwright/helpers/misc_test_helper_files/Manheim_2023-05-31.csv";
const salesDataBAD = "Playwright/helpers/misc_test_helper_files/TIMECARD.csv";

//test
test.describe.serial("Escalade DIMS - Page Functionality @func", () => {
  test.slow();
  test("Navigate to Escalade DIMS and validate Stock Number Column sort functioning as expected", async ({
    browser,
    page,
  }) => {
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    await page.waitForLoadState("domcontentloaded");

    try {
      // click Stock # column to re-order grid view
      await escaladeDIMS.clickElement("stockNumColumn");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade DIMS and validate Stock Number Column Filter functioning as expected", async ({
    browser,
    page,
  }) => {
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    try {
      // click Stock # column to re-order grid view
      await escaladeDIMS.clickElement("stockNumColumn");
      //click Stock # and inner column Filter
      await escaladeDIMS.clickElement("stockColumnFilter");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade DIMS and validate Stock Number Column Filter functionality, enter stock number validate result, clear filter", async ({
    browser,
    page,
  }) => {
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    try {
      // click Stock # column to re-order grid view
      await escaladeDIMS.clickElement("stockNumColumn");

      //click Stock # and inner column Filter
      await escaladeDIMS.clickElement("stockColumnFilter");

      await escaladeDIMS.clickElement("stockColumnInnerFilter");

      await page.getByRole("textbox").first().fill("1234568");

      await page.getByRole("button", { name: "Filter", exact: true }).click();

      //validate grid only displays single row
      await page.waitForSelector(
        "#root > div > div.MuiBox-root.css-1bkvht1 > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > span:nth-child(2) > div > div > div > div > div > div > div.k-grid-container > div > div:nth-child(1) > table > tbody > tr",
      );
      // Get all rows in the grid
      const rows = await page.$$(
        "#root > div > div.MuiBox-root.css-1bkvht1 > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > span:nth-child(2) > div > div > div > div > div > div > div.k-grid-container > div > div:nth-child(1) > table > tbody > tr",
      );

      // Assert that there is exactly one row
      expect(rows.length).toBe(1);

      // clear filter
      await page.getByRole("button", { name: "Remove Filtering" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }

    // I may need to just delete these, as its not really necessary for test success
    //const rowText = await rows[0].innerText();
    //expect(rowText).toContain("No records available");
  });

  test("Navigate to Escalade DIMS and validate when Stock Number filtered, can be edited in Edit panel", async ({
    browser,
    page,
  }) => {
    test.fixme(
      "need to see if there are changes to filter logic to get this test working again 5/31/24",
    );
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    try {
      // click Stock # column to re-order grid view
      await escaladeDIMS.clickElement("stockNumColumn");

      //click Stock # and inner column Filter
      await escaladeDIMS.clickElement("stockColumnFilter");

      await escaladeDIMS.clickElement("stockColumnInnerFilter");

      await page.getByRole("textbox").first().fill("1234568");

      await page.getByRole("button", { name: "Filter", exact: true }).click();

      // click on Grid Result to expand Edit panel
      await page.getByRole("cell", { name: "1234568" }).click();

      //validate expected text elements have loaded
      const locatorNames1 = ["infoIcon", "editButton"];

      for (const locatorName of locatorNames1) {
        await escaladeDIMS.checkElementVisibility(locatorName);
      }

      // click Edit and then validate Cancel button available
      await escaladeDIMS.clickElement("editButton");

      //validate expected text elements have loaded
      const locatorNames2 = ["cancelButton"];

      for (const locatorName of locatorNames2) {
        await escaladeDIMS.checkElementVisibility(locatorName);
      }

      // click Cancel and validate Complete Button is available
      await escaladeDIMS.clickElement("cancelButton");

      // click Edit and then validate Cancel button available
      await escaladeDIMS.clickElement("editButton");

      await escaladeDIMS.clickElement("cancelButton");

      //validate expected text elements have loaded
      const locatorNames3 = ["completeButton"];

      for (const locatorName of locatorNames3) {
        await escaladeDIMS.checkElementVisibility(locatorName);
      }
      // // close panel
      await escaladeDIMS.clickElement("closeEditPanelIcon");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade DIMS and validate Sales Data Upload functionality, but cancel before uploading ", async ({
    browser,
    page,
  }) => {
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    try {
      // go to upload, but cancel it before choosing the file
      await page.getByRole("button", { name: "UPLOAD SALES DATA" }).click();
      await escaladeDIMS.clickElement("cancelButton");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade DIMS and validate Sales Data Upload functionality, Manheim_2023-05-25.csv ", async ({
    browser,
    page,
  }) => {
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    try {
      // the full upload method, including success alert validation
      await escaladeDIMS.uploadSalesData(salesData1);
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade DIMS and validate Sales Data Upload functionality, Manheim_2023-05-29.csv ", async ({
    browser,
    page,
  }) => {
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    try {
      // the full upload method, including success alert validation
      await escaladeDIMS.uploadSalesData(salesData2);
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade DIMS and validate Sales Data Upload functionality, Manheim_2023-05-31.csv ", async ({
    browser,
    page,
  }) => {
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    try {
      // the full upload method, including success alert validation
      await escaladeDIMS.uploadSalesData(salesData3);
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade DIMS and validate Sales Data Upload functionality, bad file, should provide error alert", async ({
    browser,
    page,
  }) => {
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    try {
      // the full upload method, including Error alert Message validation
      await escaladeDIMS.uploadBADSalesData(salesDataBAD);
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade DIMS and validate Inventory Tab filter functionality", async ({
    browser,
    page,
  }) => {
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    try {
      // click Inventory and interact with search
      await escaladeDIMS.clickElement("inventoryTab");

      // input valid search
      await escaladeDIMS.clickElement("inventoryHubColunmn");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade DIMS and validate Inventory Tab Edit Panel functionality, but cancel before saving", async ({
    browser,
    page,
  }) => {
    test.skip("needs more work then can be done during the 4/16/24 sprint");
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    try {
      // click Inventory and interact with search
      await escaladeDIMS.clickElement("inventoryTab");

      // Check if any grid rows are found and click the first one
      await escaladeDIMS.findFirstGridRow(".MuiGrid-root > .MuiGrid-root");

      await escaladeDIMS.clickElement("editButton");

      await escaladeDIMS.clickElement("inventoryHubColunmn");

      await page.getByRole("option", { name: "Portland" }).click();
      await page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Escalade DIMS and validate Inventory Tab Edit Panel functionality, Chosing Hub from Dropdown and Save choice", async ({
    browser,
    page,
  }) => {
    test.skip("needs more work then can be done during the 4/16/24 sprint");

    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    // click Inventory and interact with search
    await escaladeDIMS.clickInvintoryTab();

    // Check if any grid rows are found and click the first one
    await escaladeDIMS.findFirstGridRow(
      '//*[@id="root"]/div/div[1]/div[3]/span[2]/div/div/div/div/div',
    );

    await escaladeDIMS.clickEditButton();

    await escaladeDIMS.clickHubNameDropdown();
    await page.getByRole("option", { name: "Portland" }).click();
    await page.getByRole("button", { name: "Save" }).click();
  });
});
