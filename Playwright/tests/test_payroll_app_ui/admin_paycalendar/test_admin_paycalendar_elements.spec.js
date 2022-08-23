// Admin Pay Calendar Page

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminPayCalendar } = require("./admin_paycalendar.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("/Admin/PayCalendar", () => {
  test("Navigate to /Admin/PayCalendar and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const adminPayCalendarPage = new AdminPayCalendar(page);
    await adminPayCalendarPage.goto();

    //validate expected text elements have loaded
    await adminPayCalendarPage.getPayCalendarPageHeader();
    await adminPayCalendarPage.getCalendarInputBox();
    await adminPayCalendarPage.getCalendarDropdown();
    await adminPayCalendarPage.getNewPayCalendarButton();
    await adminPayCalendarPage.getCalendarGridText();
    await adminPayCalendarPage.getPPEBeginDateGridText();
    await adminPayCalendarPage.getPPEEndDateGridText();
    await adminPayCalendarPage.getPayDayDateGridText();
    await adminPayCalendarPage.getAccountingMonthGridText();
    await adminPayCalendarPage.getAccountingMonthBeginDateGridText();
    await adminPayCalendarPage.getAccountingMonthEndDateGridText();
    await adminPayCalendarPage.getCommissionMonthBeginDateGridText();
    await adminPayCalendarPage.getCommissionMonthEndDateGridText();
    await adminPayCalendarPage.getCalcPeriodTypesGridText();
    await adminPayCalendarPage.getGridEditButton();
    await adminPayCalendarPage.getGridDeleteButton();
  });
});
