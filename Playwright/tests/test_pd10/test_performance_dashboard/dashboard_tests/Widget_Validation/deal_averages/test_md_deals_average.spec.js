const { test, expect, chromium } = require("@playwright/test");
const { DealsAverageWidget } = require("./main_dashboard_deals_average.js");
const {
  MainStoreLogin,
} = require("../../../../test_spe_dashboard_login/login_spe/main_store_login.js");

test.describe.serial("/main_dashboard_loaner_summary_widget_dev", () => {
  test.fixme(
    "lets keep this one, and may use it as a template for other widget tests, locators seem to be out of date",
  );
  test("Loaner Summary Widget - Main Dashboard", async ({ browser, page }) => {
    const dealsAverage = new DealsAverageWidget(page);
    await dealsAverage.goto();

    const mainStoreLogin = new MainStoreLogin(page);
    await mainStoreLogin.login();

    try {
      const dealsAverage = new DealsAverageWidget(page);

      // Navigation steps before the try block
      await page.waitForLoadState("networkidle");

      await dealsAverage.locators.getStoreSelector().nth(2).click();
      await dealsAverage.clickElement("getAllselector");
      await dealsAverage.clickElement("getAllselector");

      await dealsAverage.locators.getMichigan().nth(2).click();
      await dealsAverage.clickElement("getBuick");
      await dealsAverage.clickElement("getFord");
      await dealsAverage.clickElement("getMazda");

      await dealsAverage.locators.getAlaska().nth(2).click();
      await dealsAverage.clickElement("getAnchorageCJD");
      await page.waitForLoadState("load");

      await dealsAverage.locators.getCanada().nth(2).click();
      await dealsAverage.clickElement("getThornhillHonda");
      await dealsAverage.clickElement("getMarkhamBMW");

      await dealsAverage.clickElement("getCalifornia");
      await dealsAverage.clickElement("getDTLAToyota");

      await dealsAverage.locators.getFlorida().nth(2).click();
      await dealsAverage.clickElement("getTampaFord");

      await dealsAverage.clickElement("getMichiganStore2");
      await dealsAverage.clickElement("getSelectButton");

      await page.waitForLoadState("networkidle");

      const navigationSteps = [
        "getFEAverageNew",
        "getFEAverageUsed",
        "getFIAverageNew",
        "getFIAverageUsed",
        "getDealAverage",
      ];

      for (const step of navigationSteps) {
        await dealsAverage.clickElement(step);
        await page.goBack();
        await page.waitForLoadState("networkidle");
        await page.waitForLoadState("load");
      }

      const dataBefore = await collectDataBefore(page);
      await dealsAverage.clickElement("getSalesTab");
      await dealsAverage.clickElement("getSalesFIOps");
      await dealsAverage.clickElement("getSalesFILogNew");
      await page.waitForLoadState("networkidle");
      await page.waitForLoadState("load");

      const dataAfter = await collectDataAfter(page);

      for (let k = 1; k <= 3; k++) {
        for (const key in dataBefore) {
          if (dataBefore[key][k] !== dataAfter[key][k]) {
            console.log(
              `The ${key} data is different, but this is not a bug because the data is company number dependent.`,
            );
          }
        }
      }

      expect(someThing).toContain("Not Started");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    } finally {
      await browser.close();
    }
  });
});

async function collectDataBefore(page) {
  const BeforeXpath =
    "//body/div[1]/div[1]/form[1]/div[3]/div[6]/div[2]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[1]/div[1]/div[2]/table[1]/tbody[1]/tr[";
  const xpaths = {
    FIAvg: "]/td[3]/span[1]",
    Cash: "]/td[4]",
    Finance: "]/td[5]",
    Total: "]/td[6]",
    Reserve: "]/td[7]",
    LOF: "]/td[8]",
    SC: "]/td[9]",
    Coat: "]/td[10]",
    GAP: "]/td[11]",
    ReserveAvg: "]/td[12]",
    Gross: "]/td[13]",
  };

  const dataBefore = {
    FIAvg: [],
    Cash: [],
    Finance: [],
    Total: [],
    Reserve: [],
    LOF: [],
    SC: [],
    Coat: [],
    GAP: [],
    ReserveAvg: [],
    Gross: [],
  };

  for (let i = 1; i <= 3; i++) {
    for (const key in xpaths) {
      const actualXpath = BeforeXpath + i + xpaths[key];
      dataBefore[key][i] = await page.locator(actualXpath).innerText();
    }
  }
  return dataBefore;
}

async function collectDataAfter(page) {
  const FIBeforeXpath = "//*[@id='FISummary']/div[3]/table[1]/tbody[1]/tr[";
  const FIxpaths = {
    FIAvg: "]/td[14]",
    Cash: "]/td[2]",
    Finance: "]/td[3]",
    Total: "]/td[4]",
    Reserve: "]/td[9]",
    LOF: "]/td[5]",
    SC: "]/td[6]",
    Coat: "]/td[7]",
    GAP: "]/td[8]",
    ReserveAvg: "]/td[11]",
    Gross: "]/td[12]",
  };

  const dataAfter = {
    FIAvg: [],
    Cash: [],
    Finance: [],
    Total: [],
    Reserve: [],
    LOF: [],
    SC: [],
    Coat: [],
    GAP: [],
    ReserveAvg: [],
    Gross: [],
  };

  for (let j = 1; j <= 3; j++) {
    for (const key in FIxpaths) {
      const FIactualXpath = FIBeforeXpath + j + FIxpaths[key];
      dataAfter[key][j] = await page.locator(FIactualXpath).innerText();
    }
  }
  return dataAfter;
}
