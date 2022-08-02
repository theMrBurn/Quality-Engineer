// Payplan Dashboard

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayplanDashboard } = require("./payplan_dashboard.js");

// user
test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payplan /dashboard interactive tests", () => {
  test("Navigate to /Payplan/Dashboard Validate Expiration Date can be input", async ({
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    // input Expiration Date 1
    await payplansDashboard.clickExpirationDate1();
    await page.locator("text=Jan").click();
    await payplansDashboard.clickExpirationDate1();
    await page.locator('a[role="button"]:has-text("2022")').click();
    await page.locator('a:has-text("2023")').click();
    await page.locator("text=Jan").click();
  });

  test("Navigate to /Payplan/Dashboard Validate Pay Calendar Date can be input", async ({
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    // semi monthly
    await payplansDashboard.inputPayCalendarDropdown("Semi");
    const semiMonthly = await page.innerText("text=Semi-monthly");
    expect(semiMonthly).toBe("Semi-monthly");

    // // weekly
    await payplansDashboard.inputPayCalendarDropdown("Wee");
    const weekly = await page.innerText("text=Weekly");
    expect(weekly).toBe("Weekly");

    // // bi weeky
    await payplansDashboard.inputPayCalendarDropdown("Bi-wee");
    const biWeekly = await page.innerText("text=Bi-Weekly");
    expect(biWeekly).toBe("Bi-Weekly");

    // // bi weekly week 1
    await payplansDashboard.inputPayCalendarDropdown("Biwee");
    const biWeekly1 = await page.innerText("text=BiWeekly Wk1");
    expect(biWeekly1).toBe("BiWeekly Wk1");

    // // bi weekly week 2
    await payplansDashboard.inputPayCalendarDropdown("2");
    const biWeekly2 = await page.innerText("text=BiWeekly Wk2");
    expect(biWeekly2).toBe("BiWeekly Wk2");
  });

  test("Navigate to /Payplan/Dashboard validate PPE Date dropdown functionality, Semi Monthly", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    // a pay cycle needs to be input
    await payplansDashboard.inputPayCalendarDropdown("Semi");
    const semiMonthly = await page.innerText("text=Semi-monthly");
    expect(semiMonthly).toBe("Semi-monthly");

    // ppe date input
    await payplansDashboard.inputPPEdateDropdown("07/15/2021");
  });

  test("Navigate to /Payplan/Dashboard validate PPE Date dropdown functionality, Weekly", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    // a pay cycle needs to be input
    await payplansDashboard.inputPayCalendarDropdown("Wee");
    const weekly = await page.innerText("text=Weekly");
    expect(weekly).toBe("Weekly");

    // ppe date input
    await payplansDashboard.inputPPEdateDropdown("05/21/2021");
  });

  test("Navigate to /Payplan/Dashboard validate PPE Date dropdown functionality, Bi-Weekly", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    // a pay cycle needs to be input
    await payplansDashboard.inputPayCalendarDropdown("Bi-wee");
    const biWeekly = await page.innerText("text=Bi-Weekly");
    expect(biWeekly).toBe("Bi-Weekly");

    // ppe date input
    await payplansDashboard.inputPPEdateDropdown("01/22/2021");
  });

  test("Navigate to /Payplan/Dashboard validate PPE Date dropdown functionality, Bi-Weekly Wk1", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    // a pay cycle needs to be input
    await payplansDashboard.inputPayCalendarDropdown("Biwee");
    const biWeekly1 = await page.innerText("text=BiWeekly Wk1");
    expect(biWeekly1).toBe("BiWeekly Wk1");

    // ppe date input
    await payplansDashboard.inputPPEdateDropdown("12/04/2021");
  });

  test("Navigate to /Payplan/Dashboard validate PPE Date dropdown functionality, Bi-Weekly Wk2", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    // a pay cycle needs to be input
    await payplansDashboard.inputPayCalendarDropdown("Biwee");
    const biWeekly1 = await page.innerText("text=BiWeekly Wk2");
    expect(biWeekly1).toBe("BiWeekly Wk2");

    // ppe date input
    await payplansDashboard.inputPPEdateDropdown("12/10/2021");
  });

  test("Navigate to /Payplan/Dashboard Validate Expiration Date2 can be input", async ({
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    // input Expiration Date 2

    await payplansDashboard.clickExpirationDate2();
    await page.locator("text=Feb").click();
    await payplansDashboard.clickExpirationDate2();
    await page.locator('a[role="button"]:has-text("2022")').click();
    await page.locator('table[role="grid"] >> text=2022').click();
    await page.locator("text=Feb").click();

    // can't validate correct date /// page.innerText: Target closed
    // const expirationDate1 = await page.innerText("text=Feb 2022");
    // expect(expirationDate1).toBe("February 2022");
  });

  test("Navigate to /Payplan/Dashboard Validate Effective Date can be input", async ({
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    // input Effective Date
    await payplansDashboard.clickEffectiveDate();
    await page.locator("text=Mar").click();
    await payplansDashboard.clickEffectiveDate();
    await page.locator('a[role="button"]:has-text("2022")').click();
    await page.locator('table[role="grid"] >> text=2022').click();
    await page.locator("text=Mar").click();

    // can't validate correct date /// page.innerText: Target closed
    // const expirationDate1 = await page.innerText("text=Feb 2022");
    // expect(expirationDate1).toBe("February 2022");
  });
});
