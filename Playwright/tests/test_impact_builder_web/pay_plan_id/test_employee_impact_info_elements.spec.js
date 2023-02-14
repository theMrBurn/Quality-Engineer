// Payplan ID endpoint

// dependancies
const { test, expect } = require("@playwright/test");
const { ImpactBuilder } = require("./payplan_id.js");

//test
test.describe
  .serial("Impact Builder - Employee and Impact Information Page Elements @smoke", () => {
  test("Navigate to /?payplanid=3881 and validate Page elements have loaded as expected", async ({
    page,
  }) => {
    const impactBuilder = new ImpactBuilder(page);
    //const payplanID = "/?payplanid=3881";  // I want to use these but theres something about the baseURL that isnt playing nice
    //await impactBuilder.goto(payplanID);

    //at the top of the test, must declare the payplan under test by going directly there via URL query
    await page.goto(
      "https://app-allpaytest-wu2-web.azurewebsites.net/?payplanid=3881",
      { waitUntil: "networkidle" }
    );

    //validate expected text elements have loaded
    await impactBuilder.getImpactBuilderHeader();
    await impactBuilder.getMonthlyAverageDropdown();
    await impactBuilder.getReasonTypeDropdown();
    await impactBuilder.getdClosingMonthCalendarInput();
    await impactBuilder.getEmployeeName();
    await impactBuilder.getCompanyName();
    await impactBuilder.getJobName();
    await impactBuilder.getNewAveragePay();
    await impactBuilder.getCurrentAveragePay();

    // Interact with some clickable elements for the purpose of the demo

    await page.getByRole('button', { name: 'Monthly Average 3 Month Average' }).click();
    await page.getByRole('option', { name: '3 Month Average' }).click();
    await page.getByRole('button', { name: 'Reason Type Pay Plan Change' }).click();
    await page.locator('#menu- div').first().click();
    await page.getByRole('button', { name: 'Choose date, selected date is Jan 14, 2023' }).click();
    await page.getByRole('button', { name: '2023' }).filter({ hasText: '2023' }).click();
    await page.getByRole('button', { name: 'Jan' }).filter({ hasText: 'Jan' }).click();
  });
});
