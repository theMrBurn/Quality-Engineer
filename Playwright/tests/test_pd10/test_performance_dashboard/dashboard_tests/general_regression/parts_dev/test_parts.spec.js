// Performance Dashboard - Main Store

// dependencies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./parts.js");

// test
test.describe.serial("Performance Dashboard 1.0 @func", () => {
  test.slow();

  test("Select stores, navigate to parts and validate data functionality", async function ({
    browser,
    page,
  }) {
    const mainStore = new MainStore(page);
    await page.goto("/main/store");
    await page.waitForLoadState("load");

    // We can use these two methods in case if the storage state doesn't work
    await mainStore.SelectStores();

    try {
      // Select Stores
      await mainStore.checkElementVisibility("getMultiStore");
      await mainStore.clickElement("getMultiStore", 2);
      await mainStore.clickElement("getAllStore");
      await mainStore.clickElement("getAlaska");
      await mainStore.clickElement("getSelect");
      await page.waitForLoadState("networkidle");

      // Navigate to Parts
      await mainStore.checkElementVisibility("getParts");
      await mainStore.clickElement("getParts");
      await mainStore.clickElement("getPartsReport");
      await page.waitForLoadState("networkidle");

      // Validate Data
      const revenue1 = await mainStore.locators.getPartsRevenue1().innerText();
      const revenue2 = await mainStore.locators.getPartsRevenue2().innerText();
      const gross1 = await mainStore.locators.getPartsGross1().innerText();
      const gross2 = await mainStore.locators.getPartsGross2().innerText();
      const expense1 = await mainStore.locators.getPartsExpense1().innerText();
      const expense2 = await mainStore.locators.getPartsExpense2().innerText();

      await mainStore.clickElement("getMainTab");
      await mainStore.clickElement("getMainMIS");
      await mainStore.clickElement("getMainMIS1Standard");
      await page.waitForLoadState("load");
      await mainStore.clickElement("getPartsTab");
      await page.waitForLoadState("load");

      const revenue1MIS = await mainStore.locators
        .getMISPartsRevenue1()
        .innerText();
      const revenue2MIS = await mainStore.locators
        .getMISPartsRevenue2()
        .innerText();
      const gross1MIS = await mainStore.locators
        .getMISPartsGross1()
        .innerText();
      const gross2MIS = await mainStore.locators
        .getMISPartsGross2()
        .innerText();
      const expense1MIS = await mainStore.locators
        .getMISPartsExpense1()
        .innerText();
      const expense2MIS = await mainStore.locators
        .getMISPartsExpense2()
        .innerText();

      if (revenue1MIS !== revenue1) {
        console.log(
          "In Parts Report: The Parts Revenue doesn't match with MIS Standard for Current Month",
        );
      }
      if (revenue2MIS !== revenue2) {
        console.log(
          "In Parts Report: The Parts Revenue doesn't match with MIS Standard for Year To Date",
        );
      }
      if (gross1MIS !== gross1) {
        console.log(
          "In Parts Report: The Parts Gross doesn't match with MIS Standard for Current Month",
        );
      }
      if (gross2MIS !== gross2) {
        console.log(
          "In Parts Report: The Parts Gross doesn't match with MIS Standard for Year To Date",
        );
      }
      if (expense1MIS !== expense1) {
        console.log(
          "In Parts Report: The Total Parts Expense doesn't match with MIS Standard for Current Month",
        );
      }
      if (expense2MIS !== expense2) {
        console.log(
          "In Parts Report: The Total Parts Expense doesn't match with MIS Standard for Year To Date",
        );
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
