// Sahara LPO

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { EscaladeCVP } = require("./escalade_CVP.js");

//for upload tests
const salesData1 = "Playwright/helpers/Manheim_2023-05-25.csv";
const salesData2 = "Playwright/helpers/Manheim_2023-05-29.csv";
const salesData3 = "Playwright/helpers/Manheim_2023-05-31.csv";
const salesDataBAD = "Playwright/helpers/TIMECARD.csv";

//test
test.describe.serial("Escalade CVP - Page Functionality @func", () => {
  test("Navigate to Escalade CVP and validate Stock Number Column sort functioning as expected", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // click Stock # column to re-order grid view
    await escaladeCVP.clickStockNumColumn();
  });

  test("Navigate to Escalade CVP and validate Stock Number Column Filter functioning as expected", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // click Stock # column to re-order grid view
    await escaladeCVP.clickStockNumColumn();

    //click Stock # and inner column Filter
    await escaladeCVP.clickStockNumFilter();
  });

  test("Navigate to Escalade CVP and validate Stock Number Column Filter functionality, enter stock number validate result, clear filter", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // click Stock # column to re-order grid view
    await escaladeCVP.clickStockNumColumn();

    //click Stock # and inner column Filter
    await escaladeCVP.clickStockNumFilter();

    await page.getByRole("textbox").first().fill("1234568");

    await page.getByRole("button", { name: "Filter", exact: true }).click();

    //validate grid only displays single row
    await page.waitForSelector(
      "#root > div > div.MuiBox-root.css-1bkvht1 > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > span:nth-child(2) > div > div > div > div > div > div > div.k-grid-container > div > div:nth-child(1) > table > tbody > tr"
    );
    // Get all rows in the grid
    const rows = await page.$$(
      "#root > div > div.MuiBox-root.css-1bkvht1 > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > span:nth-child(2) > div > div > div > div > div > div > div.k-grid-container > div > div:nth-child(1) > table > tbody > tr"
    );

    // Assert that there is exactly one row
    expect(rows.length).toBe(1);

    // I may need to just delete these, as its not really necessary for test success
    //const rowText = await rows[0].innerText();
    //expect(rowText).toContain("No records available");

    // clear filter
    await escaladeCVP.clickStockNumFilter();
    await page.getByRole("button", { name: "Clear" }).click();
  });

  test("Navigate to Escalade CVP and validate when Stock Number filtered, can be edited in Edit panel", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // click Stock # column to re-order grid view
    await escaladeCVP.clickStockNumColumn();

    //click Stock # and inner column Filter
    await escaladeCVP.clickStockNumFilter();

    await page.getByRole("textbox").first().fill("1234568");

    await page.getByRole("button", { name: "Filter", exact: true }).click();

    // click on Grid Result to expand Edit panel
    await page.getByRole("cell", { name: "1234568" }).click();

    // Edit panel should be visible and we're going to validate certain elements are present
    await escaladeCVP.getInfoIcon();
    await escaladeCVP.getEditButton();

    // click Edit and then validate Cancel button available
    await escaladeCVP.clickEditButton();
    await escaladeCVP.getCancelButton();

    // click Cancel and validate Complete Button is available
    await escaladeCVP.clickCancelButton();
    await escaladeCVP.getCompleteButton();

    // // close panel
    await escaladeCVP.clickClosePanel();
  });

  test("Navigate to Escalade CVP and validate Sales Data Upload functionality, but cancel before uploading ", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // go to upload, but cancel it before choosing the file
    await page.getByRole("button", { name: "UPLOAD SALES DATA" }).click();
    await escaladeCVP.clickCancelButton();
  });

  test("Navigate to Escalade CVP and validate Sales Data Upload functionality, Manheim_2023-05-25.csv ", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // the full upload method, including success alert validation
    await escaladeCVP.uploadSalesData(salesData1);
  });

  test("Navigate to Escalade CVP and validate Sales Data Upload functionality, Manheim_2023-05-29.csv ", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // the full upload method, including success alert validation
    await escaladeCVP.uploadSalesData(salesData2);
  });

  test("Navigate to Escalade CVP and validate Sales Data Upload functionality, Manheim_2023-05-31.csv ", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // the full upload method, including success alert validation
    await escaladeCVP.uploadSalesData(salesData3);
  });

  test("Navigate to Escalade CVP and validate Sales Data Upload functionality, bad file, should provide error alert", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // the full upload method, including Error alert Message validation
    await escaladeCVP.uploadBADSalesData(salesDataBAD);
  });

  test("Navigate to Escalade CVP and validate Inventory Tab filter functionality", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // click Inventory and interact with search
    await escaladeCVP.clickInvintoryTab();

    // input valid search
    await escaladeCVP.clickInventoryHubFilter();
  });

  test("Navigate to Escalade CVP and validate Inventory Tab Edit Panel functionality, but cancel before saving", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // click Inventory and interact with search
    await escaladeCVP.clickInvintoryTab();

    const gridRows = await page.$$(
      '//*[@id="root"]/div/div[1]/div[3]/span[2]/div/div/div[1]/div/div/div/div[3]/div/div[1]/table/tbody/tr[1]'
    );

    // Check if any grid rows are found
    if (gridRows.length > 0) {
      // Click on the first grid row
      await gridRows[0].click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
    }

    await escaladeCVP.clickEditButton();

    await page.getByRole("option", { name: "Portland" }).click();
    await page.getByRole("button", { name: "Cancel" }).click();
  });

  test("Navigate to Escalade CVP and validate Inventory Tab Edit Panel functionality, Chosing Hub from Dropdown and Save choice", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // click Inventory and interact with search
    await escaladeCVP.clickInvintoryTab();

    const gridRows = await page.$$(
      '//*[@id="root"]/div/div[1]/div[3]/span[2]/div/div/div[1]/div/div/div/div[3]/div/div[1]/table/tbody/tr[1]'
    );

    // Check if any grid rows are found
    if (gridRows.length > 0) {
      // Click on the first grid row
      await gridRows[0].click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
    }

    await escaladeCVP.clickEditButton();

    await page.getByRole("option", { name: "Portland" }).click();
    await page.getByRole("button", { name: "Save" }).click();
  });
});
