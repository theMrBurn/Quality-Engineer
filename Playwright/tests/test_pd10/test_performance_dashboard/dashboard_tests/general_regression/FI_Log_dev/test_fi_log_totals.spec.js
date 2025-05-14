// dependencies
const { test, expect } = require("@playwright/test");
const { FILog } = require("./fi_log_totals.js");

// test
test.describe.serial("/FI_LOG_dev @func @pdash1", () => {
  test("F&I log Total", async function ({ browser, page }) {
    const filog = new FILog(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    try {
      // Navigate to Sales and F&I Log
      await filog.clickElement("getSalesTab");
      await filog.clickElement("getFIOps");
      await filog.clickElement("getFIlog");
      await page.waitForLoadState("networkidle");

      // Select all stores
      await filog.locators.getStoreSelector().nth(2).click();
      await filog.clickElement("getAllselector");
      await filog.clickElement("getSelectButton");
      await page.waitForLoadState("networkidle");

      // Verify total vehicle
      const totalcash =
        parseInt(await filog.locators.getCash().innerText()) || 0;
      const totalfin = parseInt(await filog.locators.getFin().innerText()) || 0;
      const sum = totalcash + totalfin;
      const ttotal =
        parseInt(await filog.locators.getTotals().innerText()) || 0;

      if (ttotal === sum) console.log("FI Log Total Match");
      else console.log("FI Log Total Mismatch");

      // Validate total count for a store
      const totalStores = await filog.locators.getTotalStores().count();
      for (let i = 1; i <= totalStores - 3; i++) {
        const storeName = await page
          .locator(
            `//body/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[${i}]/td[1]/a[1]`,
          )
          .innerText();

        const cash =
          parseInt(
            await page
              .locator(`//div[3]/table[1]/tbody[1]/tr[${i}]/td[2]`)
              .innerText(),
          ) || 0;
        const fin =
          parseInt(
            await page
              .locator(`//div[3]/table[1]/tbody[1]/tr[${i}]/td[3]`)
              .innerText(),
          ) || 0;
        const count =
          parseInt(
            await page
              .locator(`//div[3]/table[1]/tbody[1]/tr[${i}]/td[4]`)
              .innerText(),
          ) || 0;

        const sum = cash + fin;
        if (sum === count) {
          console.log(`The FI Log - total for a store ${storeName} matches`);
        } else {
          console.log(`The FI Log - total for a store ${storeName} mismatches`);
        }
      }

      // Validate total cash
      let cashSum = 0;
      for (let i = 1; i <= totalStores - 3; i++) {
        const cash =
          parseInt(
            await page
              .locator(
                `//body/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[${i}]/td[2]`,
              )
              .innerText(),
          ) || 0;
        cashSum += cash;
      }

      const totalCash =
        parseInt(await filog.locators.getCash().innerText()) || 0;
      if (cashSum === totalCash) {
        console.log("The FI Log - total Cash Count matches");
      } else {
        console.log("The FI Log - total Cash Count mismatches");
      }

      // Validate total fin
      let finSum = 0;
      for (let i = 1; i <= totalStores - 3; i++) {
        const fin =
          parseInt(
            await page
              .locator(`//div[3]/table[1]/tbody[1]/tr[${i}]/td[3]`)
              .innerText(),
          ) || 0;
        finSum += fin;
      }

      const totalFin = parseInt(await filog.locators.getFin().innerText()) || 0;
      if (finSum === totalFin) {
        console.log("The FI Log - total Fin Count matches");
      } else {
        console.log("The FI Log - total Fin Count mismatches");
      }

      // Validate total count
      let countSum = 0;
      for (let i = 1; i <= totalStores - 3; i++) {
        const count =
          parseInt(
            await page
              .locator(`//div[3]/table[1]/tbody[1]/tr[${i}]/td[4]`)
              .innerText(),
          ) || 0;
        countSum += count;
      }

      const totalCount =
        parseInt(await filog.locators.getTotals().innerText()) || 0;
      if (countSum === totalCount) {
        console.log("The FI Log - total Count matches");
      } else {
        console.log("The FI Log - total Count mismatches");
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
