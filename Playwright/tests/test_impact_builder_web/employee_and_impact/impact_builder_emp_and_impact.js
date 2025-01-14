const { test, expect } = require("@playwright/test");
const { InventoryWidget } = require("./main_dashboard_pt.js");

test.describe.serial("/main_dashboard_performance_tracking_widget_dev", () => {
  test("Performance Tracking Widget - Main Dashboard", async ({ page }) => {
    const iw = new InventoryWidget(page);

    // Helper function to validate for multiple stores
    async function validateStore(
      storeSelectionMethod,
      storeName,
      validationMethod,
    ) {
      await iw.goto();
      await storeSelectionMethod();
      console.log(storeName);
      await validationMethod();
    }

    async function selectStore(name, locationText, storeLabel) {
      await iw.clickElement("multipleStores");
      await iw.clickElement("allSelectorIndicator");
      await iw.clickElement("allSelectorIndicator");
      await iw.clickElement("locationText");
      await iw.clickElement("specificStore");
      await iw.clickElement("storeSelectorButton");
    }

    async function validateTheUnits() {
      await iw.page.waitForLoadState("load");

      const values = await Promise.all([
        iw.locators.performanceTracking(2).innerText(),
        iw.locators.performanceTracking(3).innerText(),
        iw.locators.performanceTracking(4).innerText(),
      ]);

      const parsedValues = values.map((value) =>
        parseInt(value.replace(",", "")),
      );
      // Further validation logic...
      return parsedValues;
    }

    async function validateWithDetailUnits() {
      const values = await validateTheUnits();
      const [newActual, usedActual, totalActual] = values;

      // Example comparisons
      if (newActual !== usedActual) {
        console.log(
          `Mismatch between newActual and usedActual: ${newActual} !== ${usedActual}`,
        );
      }
      if (usedActual !== totalActual) {
        console.log(
          `Mismatch between usedActual and totalActual: ${usedActual} !== totalActual`,
        );
      }

      // Further detailed validations...
    }

    async function selectStoreThornhillHonda() {
      await selectStore(
        "Thornhill Honda",
        "Location Text Example",
        "Store Label Example",
      );
    }

    async function selectStoreFHCJDR() {
      await selectStore(
        "FH CDJR",
        "Location Text Example",
        "Store Label Example",
      );
    }

    async function selectStoreMarkhamBMW() {
      await selectStore(
        "Markham BMW",
        "Location Text Example",
        "Store Label Example",
      );
    }

    async function selectStoreDTLA() {
      await selectStore(
        "DT LA",
        "Location Text Example",
        "Store Label Example",
      );
    }

    async function selectStoreTroyHighLine() {
      await selectStore(
        "Troy JLR",
        "Location Text Example",
        "Store Label Example",
      );
    }

    await validateStore(
      selectStoreThornhillHonda,
      "Thornhill Honda",
      validateTheUnits,
    );
    await validateStore(selectStoreFHCJDR, "FH CDJR", validateTheUnits);
    await validateStore(selectStoreMarkhamBMW, "Markham BMW", validateTheUnits);
    await validateStore(selectStoreDTLA, "DT LA", validateTheUnits);
    await validateStore(selectStoreTroyHighLine, "Troy JLR", validateTheUnits);

    // Uncomment the following lines to use the detailed validation method instead
    /*
    await validateStore(selectStoreThornhillHonda, "Thornhill Honda", validateWithDetailUnits);
    await validateStore(selectStoreFHCJDR, "FH CDJR", validateWithDetailUnits);
    await validateStore(selectStoreMarkhamBMW, "Markham BMW", validateWithDetailUnits);
    await validateStore(selectStoreDTLA, "DT LA", validateWithDetailUnits);
    await validateStore(selectStoreTroyHighLine, "Troy JLR", validateWithDetailUnits);
    */
  });
});
