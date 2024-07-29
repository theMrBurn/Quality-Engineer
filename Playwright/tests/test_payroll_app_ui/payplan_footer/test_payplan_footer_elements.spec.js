// Payplan Footer

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayplanFooter } = require("./payplan_footer.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payplan Footer", () => {
  test("Navigate to Payplan Footer and validate Page elements have loaded @smoke", async ({
    browser,
    page,
  }) => {
    const payplansFooter = new PayplanFooter(page);
    await payplansFooter.goto();

    const locatorNames = [
      "payplanHeader",
      "footerNameText",
      "experationDateText",
      "footerNameColumnText",
      "effectiveDateText",
      "payRateTypeColumnText",
      "updatedByColumnText",
      "updatedOnColumnText",
      "addFooterButton",
      "clearFiltersButton",
    ];

    try {
      for (const locatorName of locatorNames) {
        await payplansFooter.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });
});
