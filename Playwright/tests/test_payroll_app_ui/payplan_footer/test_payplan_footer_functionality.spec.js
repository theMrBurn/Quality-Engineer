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

    try {
      // Payplan Footer Type
      await payplansFooter.clickElement("dropdownTriangle");

      // should click the triangle and then display options to then also click
      await page.locator("text=Technician").nth(1).click();

      // confirm on Grid that item above was chosen
      await page.locator('td[role="gridcell"]:has-text("Technician")');
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to Payplan Footer, pick dropdown option and then click Edit button @func", async ({
    browser,
    page,
  }) => {
    const payplansFooter = new PayplanFooter(page);
    await payplansFooter.goto();

    // Payplan Footer Type
    await payplansFooter.clickElement("dropdownTriangle");

    // should click the triangle and then display options to then also click
    await page.locator("text=Technician >> nth=1").click();

    // confirm on Grid that item above was chosen
    await page.locator('td[role="gridcell"]:has-text("Technician")');

    // click Edit and confirm navigation to Edit Footer page
    await payplansFooter.clickElement("dropdownTriangle");

    // validate Edit Payplans Page has loaded as expected by validating certain elements are present
    await payplansFooter.clickElement("editButton");

    const editPayPlanHeader = await page.getByRole("heading", {
      name: "Edit Pay Plan Footer",
    });

    await expect(editPayPlanHeader).toBeVisible();

    await payplansFooter.clickElement("saveButton");

    const successAlert = await page.locator("#divSuccessHolder");

    await expect(successAlert).toBeVisible();

    await payplansFooter.clickElement("backButton");

    // saved and back button clicked, should return to Footer Page
    await expect(page).toHaveURL("/PayPlan/PayPlanFooter");
  });
});
