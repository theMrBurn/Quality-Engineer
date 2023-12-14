// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SalesGrossProfitView } = require("./sales_gross_profit_view.js");

//test
test.describe.serial("Atlas Web - Page Elements @func", () => {
  test("Navigate to Atlas Web, Dealership Listing and validate New Retail Units input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    //press Update to trigger Error Alert

    //input invalid symbols to trigger Error Alert

    //input valid amount and click Update - vaidate Update Success

    await NetworkInterceptor.interceptRequests(page);

    try {
      //press Update to trigger Error Alert
      //input invalid symbols to trigger Error Alert
      //input valid amount and click Update - vaidate Update Success
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to Notify employee");
    }
  });
});
