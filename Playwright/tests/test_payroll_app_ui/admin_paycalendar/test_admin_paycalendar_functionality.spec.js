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
  test("Navigate to /Admin/PayCalendar and validate if Semi-Monthly is chosen from the Dropdown, grid results show Semi-Monthly, and does not display the other options", async ({
    browser,
    page,
  }) => {
    const adminPayCalendarPage = new AdminPayCalendar(page);
    await adminPayCalendarPage.goto();

    // Click dropdown
    await adminPayCalendarPage.clickCalendarInputDropdown();

    // choose text=Semi-monthly from Dropdown
    await page.locator('li[role="option"]:has-text("Semi-monthly")').click();

    // Validate when Semi-Monthly is choosen, grid output (top 3 rows) shows Semi-Monthly only

    const semiMonthlyGrid1 = page.locator("td:nth-child(3)").first();
    await expect(semiMonthlyGrid1).toHaveText("Semi-monthly");

    const semiMonthlyGrid2 = page.locator("tr:nth-child(3) > td:nth-child(3)");
    await expect(semiMonthlyGrid2).toHaveText("Semi-monthly");

    const semiMonthlyGrid3 = page.locator("tr:nth-child(4) > td:nth-child(3)");
    await expect(semiMonthlyGrid3).toHaveText("Semi-monthly");

    const error = page.locator("#divErrorHolder");
    await expect(error).not.toBeVisible();
  });

  test("Navigate to /Admin/PayCalendar and validate if Weekly is chosen from the Dropdown, grid results show Weekly, and does not display the other options", async ({
    browser,
    page,
  }) => {
    const adminPayCalendarPage = new AdminPayCalendar(page);
    await adminPayCalendarPage.goto();

    // Click dropdown
    await adminPayCalendarPage.clickCalendarInputDropdown();

    // choose text=Weekly from Dropdown
    await page.locator('li[role="option"]:has-text("Weekly") >> nth=0').click();

    // Validate when Weekly is choosen, grid output (top 3 rows) shows Weekly only

    const semiMonthlyGrid1 = page.locator("td:nth-child(3)").first();
    await expect(semiMonthlyGrid1).toHaveText("Weekly");

    const semiMonthlyGrid2 = page.locator("tr:nth-child(3) > td:nth-child(3)");
    await expect(semiMonthlyGrid2).toHaveText("Weekly");

    const semiMonthlyGrid3 = page.locator("tr:nth-child(4) > td:nth-child(3)");
    await expect(semiMonthlyGrid3).toHaveText("Weekly");

    const error = page.locator("#divErrorHolder");
    await expect(error).not.toBeVisible();
  });

  test("Navigate to /Admin/PayCalendar and validate if Bi-Weekly is chosen from the Dropdown, grid results show Bi-Weekly, and does not display the other options", async ({
    browser,
    page,
  }) => {
    const adminPayCalendarPage = new AdminPayCalendar(page);
    await adminPayCalendarPage.goto();

    // Click dropdown
    await adminPayCalendarPage.clickCalendarInputDropdown();

    // choose text=Weekly from Dropdown
    await page.locator('li[role="option"]:has-text("Bi-Weekly")').click();

    // Validate when Weekly is choosen, grid output (top 3 rows) shows Weekly only

    const semiMonthlyGrid1 = page.locator("td:nth-child(3)").first();
    await expect(semiMonthlyGrid1).toHaveText("Bi-Weekly");

    const semiMonthlyGrid2 = page.locator("tr:nth-child(3) > td:nth-child(3)");
    await expect(semiMonthlyGrid2).toHaveText("Bi-Weekly");

    const semiMonthlyGrid3 = page.locator("tr:nth-child(4) > td:nth-child(3)");
    await expect(semiMonthlyGrid3).toHaveText("Bi-Weekly");

    const error = page.locator("#divErrorHolder");
    await expect(error).not.toBeVisible();
  });

  test("Navigate to /Admin/PayCalendar and validate if BiWeekly Wk1 is chosen from the Dropdown, grid results show BiWeekly Wk1, and does not display the other options", async ({
    browser,
    page,
  }) => {
    const adminPayCalendarPage = new AdminPayCalendar(page);
    await adminPayCalendarPage.goto();

    // Click dropdown
    await adminPayCalendarPage.clickCalendarInputDropdown();

    // choose text=Weekly from Dropdown
    await page.locator('li[role="option"]:has-text("BiWeekly Wk1")').click();

    // Validate when Weekly is choosen, grid output (top 3 rows) shows Weekly only

    const semiMonthlyGrid1 = page.locator("td:nth-child(3)").first();
    await expect(semiMonthlyGrid1).toHaveText("BiWeekly Wk1");

    const semiMonthlyGrid2 = page.locator("tr:nth-child(3) > td:nth-child(3)");
    await expect(semiMonthlyGrid2).toHaveText("BiWeekly Wk1");

    const semiMonthlyGrid3 = page.locator("tr:nth-child(4) > td:nth-child(3)");
    await expect(semiMonthlyGrid3).toHaveText("BiWeekly Wk1");

    const error = page.locator("#divErrorHolder");
    await expect(error).not.toBeVisible();
  });

  test("Navigate to /Admin/PayCalendar and validate if BiWeekly Wk2 is chosen from the Dropdown, grid results show BiWeekly Wk2, and does not display the other options", async ({
    browser,
    page,
  }) => {
    const adminPayCalendarPage = new AdminPayCalendar(page);
    await adminPayCalendarPage.goto();

    // Click dropdown
    await adminPayCalendarPage.clickCalendarInputDropdown();

    // choose text=Weekly from Dropdown
    await page.locator('li[role="option"]:has-text("BiWeekly Wk2")').click();

    // Validate when Weekly is choosen, grid output (top 3 rows) shows Weekly only

    const semiMonthlyGrid1 = page.locator("td:nth-child(3)").first();
    await expect(semiMonthlyGrid1).toHaveText("BiWeekly Wk2");

    const semiMonthlyGrid2 = page.locator("tr:nth-child(3) > td:nth-child(3)");
    await expect(semiMonthlyGrid2).toHaveText("BiWeekly Wk2");

    const semiMonthlyGrid3 = page.locator("tr:nth-child(4) > td:nth-child(3)");
    await expect(semiMonthlyGrid3).toHaveText("BiWeekly Wk2");

    const error = page.locator("#divErrorHolder");
    await expect(error).not.toBeVisible();
  });

  test("Navigate to /Admin/PayCalendar and validate if Bad Input is attempted, appropriate error alert becomes present", async ({
    browser,
    page,
  }) => {
    const adminPayCalendarPage = new AdminPayCalendar(page);
    await adminPayCalendarPage.goto();

    // attempt "bad input" as an option in the dropdown
    await adminPayCalendarPage.inputCalendar("Bad Input");

    const error = page.locator("#divErrorHolder");
    await expect(error).toBeVisible();
  });

  test("Navigate to /Admin/PayCalendar and attempt to add New Pay calendar, then cancel it", async ({
    browser,
    page,
  }) => {
    const adminPayCalendarPage = new AdminPayCalendar(page);
    await adminPayCalendarPage.goto();

    await adminPayCalendarPage.clickNewCalendarButton();

    // inpuy New Pay Calendar
    await page
      .locator(".k-dropdown-wrap.k-state-default.k-state-focused > .k-select")
      .click();
    await page.locator("#PayCalendarId_listbox >> text=Semi-monthly").click();
    await page.locator('input[name="PayPeriodBeginDate"]').fill("08/01/2027");
    await page.locator('input[name="PayPeriodEndDate"]').fill("08/15/2027");
    await page.locator('input[name="PayDayDate"]').fill("08/15/2027");
    await page
      .locator('input[name="AccountingMonthBeginDate"]')
      .fill("08/01/2027");
    await page
      .locator('input[name="AccountingMonthEndDate"]')
      .fill("08/01/2999");
    await page
      .locator('input[name="CommissionMonthBeginDate"]')
      .fill("08/01/2027");
    await page
      .locator('input[name="CommissionMonthEndDate"]')
      .fill("08/01/2999");
    await page.locator('div[role="listbox"]').click();
    await page
      .locator('li[role="option"]:has-text("Prior Month Total")')
      .click();

    // click Cancel to back out
    await adminPayCalendarPage.clickGridCancelButton();

    const error = page.locator("#divErrorHolder");
    await expect(error).not.toBeVisible();
  });

  test("Navigate to /Admin/PayCalendar and attempt to add New Pay calendar, then click update, find the new entry row and then edit it, update it again, then delete it", async ({
    browser,
    page,
  }) => {
    test.fixme(
      "In order to Full CRUD this, we will need data test tags for edit, and delete buttons, instead of how they currently funciton."
    );
    const adminPayCalendarPage = new AdminPayCalendar(page);
    await adminPayCalendarPage.goto();

    await adminPayCalendarPage.clickNewCalendarButton();

    // inpuy New Pay Calendar
    await page
      .locator(".k-dropdown-wrap.k-state-default.k-state-focused > .k-select")
      .click();
    await page.locator("#PayCalendarId_listbox >> text=Semi-monthly").click();
    await page.locator('input[name="PayPeriodBeginDate"]').fill("08/01/2027");
    await page.locator('input[name="PayPeriodEndDate"]').fill("08/15/2027");
    await page.locator('input[name="PayDayDate"]').fill("08/15/2027");
    await page.locator('input[name="AccountingMonthDate"]').fill("07/2027");
    await page
      .locator('input[name="AccountingMonthBeginDate"]')
      .fill("08/01/2027");
    await page
      .locator('input[name="AccountingMonthEndDate"]')
      .fill("08/01/2099");
    await page
      .locator('input[name="CommissionMonthBeginDate"]')
      .fill("08/01/2027");
    await page
      .locator('input[name="CommissionMonthEndDate"]')
      .fill("08/01/2999");
    await page.locator('div[role="listbox"]').click();
    await page
      .locator('li[role="option"]:has-text("Prior Month Total")')
      .click();

    // click Update to add new entry
    await adminPayCalendarPage.clickGridUpdateButton();

    const error = page.locator("#divErrorHolder");
    await expect(error).not.toBeVisible();
    // click edit to make sure edit function works
    await page
      .locator(
        'text=3360Semi-monthly08/01/202708/15/202708/15/202707/202708/01/202708/01/209908/01/2 >> a[role="button"]'
      )
      .first()
      .click();

    // Click text=Update
    await page.locator("text=Update").click();

    // Click text=3360Semi-monthly08/01/202708/15/202708/15/202707/202708/01/202708/01/209908/01/2 >> a[role="button"] >> nth=1
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page
      .locator(
        'text=3360Semi-monthly08/01/202708/15/202708/15/202707/202708/01/202708/01/209908/01/2 >> a[role="button"]'
      )
      .nth(1)
      .click();

    // find new Pay Calendar and delete it
  });
});
