const { test, expect } = require("@playwright/test");
const { SARSummary } = require("./SARsummary.js");
const {
  MainStoreLogin,
} = require("../../../../test_spe_dashboard_login/login_spe/main_store_login.js");

//test
test.describe("/main_dashboard_SAR_summary_widget_dev", () => {
  let page;
  let browserContext;

  test.beforeAll(async ({ browser }) => {
    browserContext = await browser.newContext();
    page = await browserContext.newPage();

    const mainStoreLogin = new MainStoreLogin(page);
    await mainStoreLogin.goto();
    await mainStoreLogin.login();
    await mainStoreLogin.twostepauthlogin();
  });

  test.afterAll(async () => {
    await page.close();
    await browserContext.close();
  });

  test("Select Thornhill Honda and Validate Total Count For Out Of Criteria", async function () {
    test.slow();

    const iw = new SARSummary(page);
    await page.goto("", { timeout: 0 });

    await iw.clickElement("getStore");
    await page.locator(".allSelectorIndicator").dblclick();
    await iw.clickElement("getStore");
    await iw.clickElement('label:has-text("Thornhill Honda")');
    await iw.clickElement("#storeSelector >> text=Select");
    await page.waitForLoadState("networkidle");
    console.log("Thornhill Honda");

    await page.goto("/", { timeout: 0 });
    await page.waitForLoadState("networkidle");

    try {
      let values, sarValues;
      values = await iw.validateUnits([
        "getOOCContractInTransitCountWidget",
        "getOOCVehicleReceivablesCountInWidget",
        "getOOCIncenttiveReceivablesCountInWidget",
        "getOOCRebateReceivablesCountInWidget",
        "getOOCWarrantyReceivableCountInWidget",
        "getOOCCashSalesCountInWidget",
      ]);

      await iw.clickElement("getOffice");
      await iw.clickElement("getOfficeSchedules");
      await iw.clickElement("getOfficeSchedulesSummary");
      await page.waitForLoadState("networkidle");
      await iw.clickElement("getStore");
      await page.waitForLoadState("networkidle");
      sarValues = await iw.validateUnits([
        "getOOCContractInTransitSARCount",
        "getOOCVehicleReceivablesSARSummaryCount",
        "getOOCIncentiveReceivablesSARSummaryCount",
        "getOOCRebateReceivablesSARSummaryCount",
        "getOOCWarrantyReceivableCountSARSummaryCOunt",
        "getOOCCashSalesSARSummaryCount",
      ]);

      if (
        values.getOOCContractInTransitCountWidget !==
        sarValues.getOOCContractInTransitSARCount
      ) {
        console.log("Mismatch in Contract in Transit");
      }
      // Additional error checks...
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Select Farmington Hills CDJR and Validate Total Count", async function () {
    test.slow();

    const iw = new SARSummary(page);
    await page.goto("/", { timeout: 0 });
    await page.waitForLoadState("networkidle");

    await iw.clickElement("getStore");
    await page.locator(".allSelectorIndicator").dblclick();
    await iw.clickElement("getStore");
    await iw.clickElement('label:has-text("Farmington Hills CDJR")');
    await iw.clickElement("#storeSelector >> text=Select");
    await page.waitForLoadState("networkidle");
    console.log("FH CDJR");

    try {
      let values, sarValues;
      values = await iw.validateUnits([
        "getContractInTransitCountWidget",
        "getVehicleReceivablesCountInWidget",
        "getIncenttiveReceivablesCountInWidget",
        "getRebateReceivablesCountInWidget",
        "getWarrantyReceivableCountInWidget",
        "getCashSalesCountInWidget",
      ]);

      await iw.clickElement("getOffice");
      await iw.clickElement("getOfficeSchedules");
      await iw.clickElement("getOfficeSchedulesSummary");
      await page.waitForLoadState("networkidle");
      await iw.clickElement("getStore");
      await page.waitForLoadState("networkidle");
      sarValues = await iw.validateUnits([
        "getContractInTransitSARCount",
        "getVehicleReceivablesSARSummaryCount",
        "getIncentiveReceivablesSARSummaryCount",
        "getRebateReceivablesSARSummaryCount",
        "getWarrantyReceivableCountSARSummaryCOunt",
        "getCashSalesSARSummaryCount",
      ]);

      if (
        values.getContractInTransitCountWidget !==
        sarValues.getContractInTransitSARCount
      ) {
        console.log("Mismatch in Contract in Transit");
      }
      // Additional error checks...
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Select Downtown LA Toyota and Validate Total Count", async function () {
    test.slow();

    const iw = new SARSummary(page);
    await page.goto("/", { timeout: 0 });
    await page.waitForLoadState("networkidle");

    await iw.clickElement("getStore");
    await page.locator(".allSelectorIndicator").dblclick();
    await iw.clickElement("text=CALIFORNIA");
    await iw.clickElement('label:has-text("Downtown LA Toyota")');
    await iw.clickElement("#storeSelector >> text=Select");
    await page.waitForLoadState("networkidle");
    console.log("DT LA");

    try {
      let values, sarValues;
      values = await iw.validateUnits([
        "getContractInTransitCountWidget",
        "getVehicleReceivablesCountInWidget",
        "getIncenttiveReceivablesCountInWidget",
        "getRebateReceivablesCountInWidget",
        "getWarrantyReceivableCountInWidget",
        "getCashSalesCountInWidget",
      ]);

      await iw.clickElement("getOffice");
      await iw.clickElement("getOfficeSchedules");
      await iw.clickElement("getOfficeSchedulesSummary");
      await page.waitForLoadState("networkidle");
      await iw.clickElement("getStore");
      await page.waitForLoadState("networkidle");
      sarValues = await iw.validateUnits([
        "getContractInTransitSARCount",
        "getVehicleReceivablesSARSummaryCount",
        "getIncentiveReceivablesSARSummaryCount",
        "getRebateReceivablesSARSummaryCount",
        "getWarrantyReceivableCountSARSummaryCOunt",
        "getCashSalesSARSummaryCount",
      ]);

      if (
        values.getContractInTransitCountWidget !==
        sarValues.getContractInTransitSARCount
      ) {
        console.log("Mismatch in Contract in Transit");
      }
      // Additional error checks...
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Validate Total Count For Out Of Criteria again", async function () {
    test.slow();

    const iw = new SARSummary(page);
    await page.goto("/", { timeout: 0 });
    await page.waitForLoadState("networkidle");

    try {
      let values, sarValues;
      values = await iw.validateUnits([
        "getOOCContractInTransitCountWidget",
        "getOOCVehicleReceivablesCountInWidget",
        "getOOCIncenttiveReceivablesCountInWidget",
        "getOOCRebateReceivablesCountInWidget",
        "getOOCWarrantyReceivableCountInWidget",
        "getOOCCashSalesCountInWidget",
      ]);

      await iw.clickElement("getOffice");
      await iw.clickElement("getOfficeSchedules");
      await iw.clickElement("getOfficeSchedulesSummary");
      await page.waitForLoadState("networkidle");
      await iw.clickElement("getStore");
      await page.waitForLoadState("networkidle");
      sarValues = await iw.validateUnits([
        "getOOCContractInTransitSARCount",
        "getOOCVehicleReceivablesSARSummaryCount",
        "getOOCIncentiveReceivablesSARSummaryCount",
        "getOOCRebateReceivablesSARSummaryCount",
        "getOOCWarrantyReceivableCountSARSummaryCOunt",
        "getOOCCashSalesSARSummaryCount",
      ]);

      if (
        values.getOOCContractInTransitCountWidget !==
        sarValues.getOOCContractInTransitSARCount
      ) {
        console.log("Mismatch in Contract in Transit");
      }
      // Additional error checks...
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
