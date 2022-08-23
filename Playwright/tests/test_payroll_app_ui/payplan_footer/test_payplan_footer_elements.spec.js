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
  test("Navigate to Payplan Footer and validate Page elements have loaded", async ({
    browser,
    page,
  }) => {
    const payplansFooter = new PayplanFooter(page);
    await payplansFooter.goto();
    await payplansFooter.getPayPlanFooterHeader();
    await payplansFooter.getFooterNameText1();
    await payplansFooter.getFooterNameColumnText();
    await payplansFooter.getExperationDateText();
    await payplansFooter.getEffectiveDateText();
    await payplansFooter.getPayRateTypeColumnText();
    await payplansFooter.getUpdatedByColumnText();
    await payplansFooter.getUpdatedOnColumnText();
    await payplansFooter.getAddFooterButton();
    await payplansFooter.getClearFiltersButton();
  });
});
