const { test, expect } = require("@playwright/test");
const { MainStore } = require("./technician_performance_report.js");
//test
test.describe.serial("/technician_performance_report_prod", () => {
  test("Navigate to Service Menu-technician performance report", async function ({
    browser,
    page,
  }) {
    test.setTimeout(600000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.goto();
    await mainStore.SelectStoresForRegression();
    await mainStore.NavigateToServiceTechnicianPerformanceReport();
    await mainStore.ValidateDuplicateStore();
    await mainStore.ValidateThePresenceOfData();
  });
  // Activate the test after this goes to release
  /* test("Navigate to Service Menu-technician performance report - Bug 132329 ", async function ({
      browser, 
      page,
    }) {
      test.setTimeout(300000);
      const mainStore = new MainStore(page);
      await mainStore.goto();
      await mainStore.login();
      await mainStore.twostepauthlogin();
      await mainStore.goto();
      await mainStore.SelectLasVegasHyundaiStore();
      await mainStore.NavigateToServiceTechnicianPerformanceReport();
      await mainStore.ValidateDataAtLasVegasHyundai();
    });*/
});
