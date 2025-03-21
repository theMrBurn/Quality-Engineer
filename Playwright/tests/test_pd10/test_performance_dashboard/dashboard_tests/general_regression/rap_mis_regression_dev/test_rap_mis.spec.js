const { test, expect } = require("@playwright/test");
const { RapReport } = require("./rap_mis_.js");

// Test
test.describe.serial("/rap_mis_regression_dev", () => {
  test("Regression bug - test", async function ({ browser, page }) {
    const rapreport = new RapReport(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    try {
      // Select stores for regression
      await page.waitForLoadState("networkidle");
      await rapreport.locators.getStoreSelector().nth(2).click();
      await rapreport.locators.getAllselector().click();
      await rapreport.locators.getAllselector().click();
      await rapreport.locators.getVirginia().nth(2).click();
      await rapreport.locators.getChesapeake().click();
      await rapreport.locators.getSelector().click();
      await page.waitForLoadState("load");

      // Navigate to Service RAP Report
      await rapreport.locators.getServiceDashboard().click();
      await rapreport.locators.getServiceRAPReport().click();
      await page.waitForLoadState("networkidle");

      // Validate Data
      await page.locator("//*[@id='listView']/li/a[1]").click();
      await page.waitForLoadState("load");
      const c = await page
        .locator(
          "//*[@id='detailView']/div[3]/table[1]/tbody[1]/tr[10]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[6]",
        )
        .innerText();

      await rapreport.locators.getMainTab().click();
      await rapreport.locators.getMainMIS().click();
      await rapreport.locators.getMainMIS1Standard().click();
      await page.waitForLoadState("networkidle");
      await rapreport.locators.getServiceDetail().click();
      await page.waitForLoadState("load");

      const a = await page
        .locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[20]/td[6]",
        )
        .innerText();

      if (a !== c) {
        console.log("The total CP cost is not matching: " + a + ":" + c);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
