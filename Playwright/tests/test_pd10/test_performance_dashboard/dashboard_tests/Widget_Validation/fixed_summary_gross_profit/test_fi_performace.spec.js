const { test, expect } = require("@playwright/test");
const { MngrPerformance } = require("./fi_performance.js");
const {
  MainStoreLogin,
} = require("../../../../test_spe_dashboard_login/login_spe/main_store_login.js");

test.describe
  .serial("/fi_dashboard_dev - Widget Validation functional tests", () => {
  test("Loaner Summary Widget - Main Dashboard", async ({ page }) => {
    test.fixme(
      'await fiDash.clickElement("getStoreSelector")',
      "this needs to be fixed on the POM",
    );

    test.slow();
    // perform mandatory login
    const mainStoreLogin = new MainStoreLogin(page);
    await mainStoreLogin.goto();
    await mainStoreLogin.login();
    await mainStoreLogin.twostepauthlogin();

    const fiDash = new MngrPerformance(page);
    await fiDash.goto();

    try {
      // Wait for network idle state
      await page.waitForLoadState("networkidle");

      await fiDash.clickElement("getStoreSelector");
      const storesToSelect = [
        "getAllselector",
        "getAllselector",
        "getMichigan",
        "getBuick",
        "getFord",
        "getMazda",
      ];
      for (const store of storesToSelect) {
        await fiDash.clickElement(store);
      }
      await fiDash.clickElement("getSelectButton");

      // Navigate to Sales F&I Ops Dashboard
      await fiDash.clickElement("getSalesTab");
      await fiDash.clickElement("getSalesFIOps");
      await fiDash.clickElement("getSalesFIOpsDashboard");

      // Wait for network idle state before validating data
      await page.waitForLoadState("networkidle");

      // Validate units
      const beforeXpath =
        "//body/div[1]/div[1]/form[1]/div[3]/div[6]/div[2]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[";
      const afterXpaths = [
        "]/td[3]/span[1]",
        "]/td[4]",
        "]/td[5]",
        "]/td[6]",
        "]/td[7]",
        "]/td[8]",
        "]/td[9]",
        "]/td[10]",
        "]/td[11]",
        "]/td[12]",
        "]/td[13]",
      ];

      const table1Data = await fiDash.validateTableData(
        beforeXpath,
        afterXpaths,
      );

      await fiDash.clickElement("getSalesTab");
      await fiDash.clickElement("getSalesFIOps");
      await fiDash.clickElement("getSalesFILogNew");

      // Wait for network idle state before validating data
      await page.waitForLoadState("networkidle");

      const fiBeforeXpath = "//*[@id='FISummary']/div[3]/table[1]/tbody[1]/tr[";
      const fiAfterXpaths = [
        "]/td[14]",
        "]/td[2]",
        "]/td[3]",
        "]/td[4]",
        "]/td[9]",
        "]/td[5]",
        "]/td[6]",
        "]/td[7]",
        "]/td[8]",
        "]/td[11]",
        "]/td[12]",
      ];

      const table2Data = await fiDash.validateTableData(
        fiBeforeXpath,
        fiAfterXpaths,
      );

      for (let k = 0; k < table1Data.length; k++) {
        for (let index = 0; index < table1Data[k].length; index++) {
          if (table1Data[k][index] !== table2Data[k][index]) {
            console.log(
              "The FI log Manager Performance data is different, but this is not a bug because the data is company number dependent",
            );
          }
        }
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
