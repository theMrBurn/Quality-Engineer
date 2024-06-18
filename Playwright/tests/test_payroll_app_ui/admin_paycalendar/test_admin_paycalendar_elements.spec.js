// Admin Pay Calendar Page

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependencies
const { test, expect } = require("@playwright/test");
const { AdminPayCalendar } = require("./admin_paycalendar.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

// test
test.describe.serial("/Admin/PayCalendar", () => {
  test("Navigate to /Admin/PayCalendar and validate Page elements have loaded as expected @smoke", async ({
    browser,
    page,
  }) => {
    const adminPayCalendarPage = new AdminPayCalendar(page);
    await adminPayCalendarPage.goto();

    // validate expected text elements have loaded
    const locatorNames = [
      "payCalendarPageHeader",
      "calendarGridText",
      "ppeBeginDateGridText",
      "ppeEndDateGridText",
      "payDayDateGridText",
      "accountingMonthGridText",
      "accountingMonthBeginDateGridText",
      "accountingMonthEndDateGridText",
      "commissionMonthBeginDateGridText",
      "commissionMonthEndDateGridText",
      "calculationPeriodTypeGridText",
      "calendarInputBox",
      "calendarInputDropdown",
      "newCalendarButton",
      "gridEditButton",
      "gridDeleteButton",
    ];

    try {
      for (const locatorName of locatorNames) {
        await adminPayCalendarPage.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });
});
