// Payplan Footer functional check

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayplanFooter } = require("./payplan_footer.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payplan Footer", () => {
  test("Navigate to Payplan Footer and validate Footer Name dropdown works as expected - pick an option from the dropdown, validate choice appears in the grid @func", async ({
    browser,
    page,
  }) => {
    const payplansFooter = new PayplanFooter(page);
    await payplansFooter.goto();

    // Payplan Footer Type
    await payplansFooter.inputFooterClickDropdown();

    // should click the triangle and then display options to then also click
    await page.locator("text=Technician").nth(1).click();

    // confirm on Grid that item above was chosen
    await page.locator('td[role="gridcell"]:has-text("Technician")');
  });

  test("Navigate to Payplan Footer, pick dropdown option and then click Edit button @func", async ({
    browser,
    page,
  }) => {
    const payplansFooter = new PayplanFooter(page);
    await payplansFooter.goto();

    // Payplan Footer Type
    await payplansFooter.inputFooterClickDropdown();

    // should click the triangle and then display options to then also click
    await page.locator("text=Technician").nth(1).click();

    // confirm on Grid that item above was chosen
    await page.locator('td[role="gridcell"]:has-text("Technician")');

    // click Edit and confirm navigation to Edit Footer page
    await payplansFooter.clickEditButton();

    // validate Edit Payplans Page has loaded as expected by validating certain elements are present
    await payplansFooter.getEditPayPlanFooterHeader();
    await payplansFooter.clickSaveButton();
    await payplansFooter.getSaveConfirmationAlert();
    await payplansFooter.clickBackButton();

    // saved and back button clicked, should return to Footer Page
    await expect(page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/PayPlanFooter"
    );
  });
});
