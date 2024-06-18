// Admin Page

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminPayCycle } = require("./admin_paycycle.js");

//test
test.describe.serial("/Admin/PayCycle", () => {
  //test
  test("Navigate to /Admin/PayCycle and validate Page elements have loaded as expected @smoke", async ({
    browser,
    page,
  }) => {
    const adminPayCycle = new AdminPayCycle(page);
    await adminPayCycle.goto();

    const locatorNames = [
      "payCyclePageHeader",
      "companyText",
      "companyNumberText",
      "companyGridColumnText",
      "companyNumberGridColumnText",
      "calendarGridText",
      "payGroupGridText",
      "activeGridText",
      "companyInputBox",
      "companyInputDropdown",
      "payGroupInputBox",
      "payGroupInputDropdown",
      "assignPayCycleButton",
      //"cancelButton",
    ];

    try {
      for (const locatorName of locatorNames) {
        await adminPayCycle.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });
});
