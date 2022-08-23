// Admin Page

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminPayCycle } = require("./admin_paycycle.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("/Admin/PayCycle", () => {
  test("Navigate to /Admin/PayCycle and validate when Company is chosen, is displayed as expected", async ({
    browser,
    page,
  }) => {
    const adminPayCyclePage = new AdminPayCycle(page);
    await adminPayCyclePage.goto();

    await adminPayCyclePage.clickCompanyDropdown();

    await page.locator("text=Fairbanks Chev Buick GMC (L0143)").click();
    const companyResult = page.locator(
      'td[role="gridcell"]:has-text("Fairbanks Chev Buick GMC")'
    );
    expect(companyResult).toHaveText("Fairbanks Chev Buick GMC");

    const companyNumber = page.locator('td[role="gridcell"]:has-text("L0143")');
    expect(companyNumber).toHaveText("L0143");

    const calendarResult = page.locator("text=Semi-monthly");
    expect(calendarResult).toHaveText("Semi-monthly");

    const paygroupResult = page.locator("text=West Pay Group");
    expect(paygroupResult).toHaveText("West Pay Group");

    const error = page.locator("#divErrorHolder");
    await expect(error).not.toBeVisible();
  });

  test("Navigate to /Admin/PayCycle and validate when Company Number is chosen, is displayed as expected", async ({
    browser,
    page,
  }) => {
    const adminPayCyclePage = new AdminPayCycle(page);
    await adminPayCyclePage.goto();

    await adminPayCyclePage.clickCompanyNumberDropdown();

    await page.locator("#PayGroupList_listbox >> text=L0179").click();
    const companyResult = page.locator(
      'td[role="gridcell"]:has-text("Grand Forks Toyota")'
    );
    expect(companyResult).toHaveText("Grand Forks Toyota");

    const companyNumber = page.locator('td[role="gridcell"]:has-text("L0179")');
    expect(companyNumber).toHaveText("L0179");

    const calendarResult = page.locator("text=Semi-monthly");
    expect(calendarResult).toHaveText("Semi-monthly");

    const paygroupResult = page.locator("text=Midwest Pay Group");
    expect(paygroupResult).toHaveText("Midwest Pay Group");

    const error = page.locator("#divErrorHolder");
    await expect(error).not.toBeVisible();
  });

  test("Navigate to /Admin/PayCycle and validate Assign PayCycle basic functionality - cancel before Update (cant CRUD)", async ({
    browser,
    page,
  }) => {
    const adminPayCyclePage = new AdminPayCycle(page);
    await adminPayCyclePage.goto();

    await adminPayCyclePage.clickAssignPayCycleButton();

    await adminPayCyclePage.inputCompanyGridFromDropdown();
    await page.locator("text=Knoxville CJDR >> nth=2").click();

    await adminPayCyclePage.inputCompanyNumberGridFromDropdown();
    await page.locator("#Code_listbox >> text=L0365").click();

    await adminPayCyclePage.inputCalendarGridFromDropdown();
    await page.locator("#PayCalendarId_listbox >> text=Semi-monthly").click();

    await adminPayCyclePage.inputPayGroupInputFromDropdown();
    await page.locator("text=East Semi-Monthly Pay Group").click();

    await page.locator('input[type="checkbox"]').uncheck();

    await page.locator('input[type="checkbox"]').check();

    await adminPayCyclePage.clickCancelButton();

    const error = page.locator("#divErrorHolder");
    await expect(error).not.toBeVisible();
  });
});
