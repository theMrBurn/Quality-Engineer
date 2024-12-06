const { test, expect } = require("@playwright/test");
const { MainStore } = require("./service_advisor_report.js");
//test
test.describe.serial("/service_advisor_report_prod", () => {
  test("Navigate to Service Menu-Advisor report", async function ({
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
    await mainStore.NavigateToServiceAdvisorReport();
    await mainStore.ValidateDuplicateStore();
    await mainStore.ValidateThePresenceOfData();
  });
});
