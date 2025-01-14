// Dependencies
const { test, expect } = require("@playwright/test");
const { StorePerformance } = require("./store_performance.js");
const {
  MainStoreLogin,
} = require("../../../../test_spe_dashboard_login/login_spe/main_store_login");

test.describe.serial("/main_dashboard_store_performance_widget_dev", () => {
  test.slow();
  test.fixme(
    "this gets started, but looks for some locators that have changed or no longer exists, this might be worth fixing",
  );

  test("Store performance - Main Dashboard", async ({ page }) => {
    // Perform login directly in the test
    const mainStoreLogin = new MainStoreLogin(page);
    await mainStoreLogin.goto();
    await mainStoreLogin.login();
    await mainStoreLogin.twostepauthlogin();

    const storePerformance = new StorePerformance(page);
    await storePerformance.goto();

    // Select Stores for Regression
    await storePerformance.clickElement("getStoreSelector", 2);
    await storePerformance.clickElement("getAllselector");
    await storePerformance.clickElement("getCalifornia");
    await storePerformance.clickElement("getSelectButton");

    // Validate the Units
    await storePerformance.page.waitForTimeout(9000);
    const unitLocators = [
      "getAnchorageCJDActual",
      "getAchorageCJDPacing",
      "getAnchorageCJDPlan",
      "getDTLAActual",
      "getDTLAPacing",
      "getDTLAPlan",
      "getFHCDJRActual",
      "getFHCDJRPacing",
      "getFHCDJRPlan",
    ];

    const units = await storePerformance.validateUnits(unitLocators);
    const totalActual =
      units.getAnchorageCJDActual + units.getDTLAActual + units.getFHCDJRActual;
    const totalPacing =
      units.getAchorageCJDPacing + units.getDTLAActual + units.getFHCDJRPacing;

    const TotalActual1 = await storePerformance.locators
      .getTotalActual()
      .innerText();
    const TotalActual2 = parseInt(TotalActual1.replace(",", ""));
    const TotalPacing1 = await storePerformance.locators
      .getTotalPacing()
      .innerText();
    const TotalPacing2 = parseInt(TotalPacing1.replace(",", ""));

    if (totalActual != TotalActual2) {
      console.log(
        "The total Actual units vehicles in main dashboard store performance widget is not matching" +
          TotalActual2 +
          " : " +
          totalActual,
      );
    }

    if (totalPacing != TotalPacing2) {
      console.log(
        "The total Pacing units vehicles in main dashboard store performance widget is not matching" +
          TotalPacing2 +
          " : " +
          totalPacing,
      );
    }
  });

  test("Manager performance - Main Dashboard", async ({ page }) => {
    // Perform login directly in the test
    const mainStoreLogin = new MainStoreLogin(page);
    await mainStoreLogin.goto();
    await mainStoreLogin.login();
    await mainStoreLogin.twostepauthlogin();

    const storePerformance = new StorePerformance(page);
    await storePerformance.goto();

    // Select Oxnard Honda
    await storePerformance.clickElement("getStoreSelector", 2);
    await storePerformance.clickElement("getAllselector");
    await storePerformance.clickElement("getCalifornia");
    await storePerformance.clickElement("getOxnard");
    await storePerformance.clickElement("getSelectButton");

    // Validate the Units for Oxnard Honda
    await storePerformance.page.waitForTimeout(9000);
    const unitLocators = [
      "getAnchorageCJDActual",
      "getAchorageCJDPacing",
      "getAnchorageCJDPlan",
      "getDTLAActual",
      "getDTLAPacing",
      "getDTLAPlan",
      "getFHCDJRActual",
      "getFHCDJRPacing",
      "getFHCDJRPlan",
    ];

    const units = await storePerformance.validateUnits(unitLocators);
    const totalActual =
      units.getAnchorageCJDActual + units.getDTLAActual + units.getFHCDJRActual;
    const totalPacing =
      units.getAchorageCJDPacing + units.getDTLAActual + units.getFHCDJRPacing;

    const TotalActual1 = await storePerformance.locators
      .getTotalActual()
      .innerText();
    const TotalActual2 = parseInt(TotalActual1.replace(",", ""));
    const TotalPacing1 = await storePerformance.locators
      .getTotalPacing()
      .innerText();
    const TotalPacing2 = parseInt(TotalPacing1.replace(",", ""));

    if (totalActual != TotalActual2) {
      console.log(
        "The total Actual units vehicles in main dashboard store performance widget is not matching" +
          TotalActual2 +
          " : " +
          totalActual,
      );
    }

    if (totalPacing != TotalPacing2) {
      console.log(
        "The total Pacing units vehicles in main dashboard store performance widget is not matching" +
          TotalPacing2 +
          " : " +
          totalPacing,
      );
    }
  });
});
