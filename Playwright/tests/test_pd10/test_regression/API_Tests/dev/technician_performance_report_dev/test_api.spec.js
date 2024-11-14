const { test, expect } = require("@playwright/test");
const { TPR } = require("./api.js");
//test
test.describe.serial("/technician_performance_report_dev", () => {
  
     test("Navigate to Service Menu-technician performance report API tests", async function ({
      browser, 
      page,
    }) {
      test.setTimeout(600000);
      const tpr = new TPR(page);
      await tpr.goto();
      await tpr.login();
      await tpr.twostepauthlogin();
      await tpr.goto();
      await tpr.ValidateAPIResponseTechnicianPerformanceReport();
      await tpr.ValidateAPiResponseDetailForAStore();
    });
});
