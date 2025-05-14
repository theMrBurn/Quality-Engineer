// dependencies
const { test, expect } = require("@playwright/test");
const { MISStandard } = require("./mis_standard1_report.js");

// test
test.describe.serial("/MIS_Standard1_dev", () => {
  test("Validate Benchmark in Sales", async function ({ browser, page }) {
    const mis = new MISStandard(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    try {
      // Navigate to Main MIS 1 Standard
      await mis.locators.getMainTab().click();
      await mis.locators.getMainMIS().click();
      await mis.locators.getMainMIS1Standard().click();
      await page.waitForLoadState("networkidle");

      // Validate New Broker Section
      await page.waitForTimeout(5000);

      await expect(
        page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[12]/td[2]",
        ),
      ).toHaveText("LM10880");

      await expect(
        page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[12]/td[3]",
        ),
      ).toHaveText("New Broker Revenue");

      await expect(
        page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[13]/td[2]",
        ),
      ).toHaveText("LM10885");

      await expect(
        page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[13]/td[3]",
        ),
      ).toHaveText("New Broker Gross");

      await expect(
        page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[14]/td[3]",
        ),
      ).toHaveText("Gross Per Broker");

      await expect(
        page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[15]/td[3]",
        ),
      ).toHaveText("Broker Count");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
