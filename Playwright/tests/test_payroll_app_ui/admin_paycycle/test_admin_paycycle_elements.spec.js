// Admin Page

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminPayCycle } = require("./admin_paycycle.js");

//test
test.describe.serial("/Admin/PayCycle", () => {
  test("Navigate to /Admin/PayCycle and validate Page elements have loaded as expected @smoke", async ({
    browser,
    page,
  }) => {
    const adminPayCyclePage = new AdminPayCycle(page);
    await adminPayCyclePage.goto();

    //validate expected text elements have loaded
    await adminPayCyclePage.getPayCyclePageHeader();
    await adminPayCyclePage.getCompanyText();
    await adminPayCyclePage.getCompanyNumberText();
    await adminPayCyclePage.getCompanyGridColumnText();
    await adminPayCyclePage.getCompanyNumberGridColumnText();
    await adminPayCyclePage.getCalendarGridColumnText();
    await adminPayCyclePage.getPayGroupGridColumnText();
    await adminPayCyclePage.getActiveGridColumnText();
    await adminPayCyclePage.getCompanyInputBox();
    await adminPayCyclePage.getCompanyInputDropdown();
    await adminPayCyclePage.getPayGroupInputBox();
    await adminPayCyclePage.getAssignPayCycleButton();
  });
});
