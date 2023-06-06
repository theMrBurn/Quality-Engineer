// Payroll Sup Page

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollUpload } = require("../payroll_upload/payroll_upload.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /Upload and Validate basic Functionality", () => {
  test("Navigate to /Payroll/Sup input Pay Calendar Dropdown @func", async ({
    page,
  }) => {
    const payrollUpload = new PayrollUpload(page);
    await payrollUpload.goto();

    // semi monthly
    await payrollUpload.inputPayCalendarDropdown("Semi");
    const semiMonthly = await page.innerText("text=Semi-monthly");
    expect(semiMonthly).toBe("Semi-monthly");

    // // weekly
    await payrollUpload.inputPayCalendarDropdown("Wee");
    const weekly = await page.innerText("text=Weekly");
    expect(weekly).toBe("Weekly");

    // // bi weeky
    await payrollUpload.inputPayCalendarDropdown("Bi-wee");
    const biWeekly = await page.innerText("text=Bi-Weekly");
    expect(biWeekly).toBe("Bi-Weekly");

    // // bi weekly week 1
    await payrollUpload.inputPayCalendarDropdown("Biwee");
    const biWeekly1 = await page.innerText("text=BiWeekly Wk1");
    expect(biWeekly1).toBe("BiWeekly Wk1");

    // // bi weekly week 2
    await payrollUpload.inputPayCalendarDropdown("2");
    const biWeekly2 = await page.innerText("text=BiWeekly Wk2");
    expect(biWeekly2).toBe("BiWeekly Wk2");
  });

  test("Navigate to /Payroll/Upplad and validate PPE Date dropdown functionality, Semi Monthly @func", async ({
    browser,
    page,
  }) => {
    const payrollUpload = new PayrollUpload(page);
    await payrollUpload.goto();

    // a pay cycle needs to be input
    await payrollUpload.inputPayCalendarDropdown("Semi");
    const semiMonthly = await page.innerText("text=Semi-monthly");
    expect(semiMonthly).toBe("Semi-monthly");

    // ppe date input
    await payrollUpload.getPPEDateDropdown();
    await payrollUpload.inputPPEdateDropdown("07/15/2021");
  });

  test("Navigate to /Payroll/Upplad and validate PPE Date dropdown functionality, Weekly @func", async ({
    browser,
    page,
  }) => {
    const payrollUpload = new PayrollUpload(page);
    await payrollUpload.goto();

    // a pay cycle needs to be input
    await payrollUpload.inputPayCalendarDropdown("Wee");
    const weekly = await page.innerText("text=Weekly");
    expect(weekly).toBe("Weekly");

    // ppe date input
    await payrollUpload.getPPEDateDropdown();
    await payrollUpload.inputPPEdateDropdown("05/21/2021");
  });

  test("Navigate to /Payroll/Upplad and validate PPE Date dropdown functionality, Bi-Weekly @func", async ({
    browser,
    page,
  }) => {
    const payrollUpload = new PayrollUpload(page);
    await payrollUpload.goto();

    // a pay cycle needs to be input
    await payrollUpload.inputPayCalendarDropdown("Bi-wee");
    const biWeekly = await page.innerText("text=Bi-Weekly");
    expect(biWeekly).toBe("Bi-Weekly");

    // ppe date input
    await payrollUpload.getPPEDateDropdown();
    await payrollUpload.inputPPEdateDropdown("01/22/2021");
  });

  test("Navigate to /Payroll/Upplad and validate PPE Date dropdown functionality, Bi-Weekly Wk1 @func", async ({
    browser,
    page,
  }) => {
    const payrollUpload = new PayrollUpload(page);
    await payrollUpload.goto();

    // a pay cycle needs to be input
    await payrollUpload.inputPayCalendarDropdown("Biwee");
    const biWeekly1 = await page.innerText("text=BiWeekly Wk1");
    expect(biWeekly1).toBe("BiWeekly Wk1");

    // ppe date input
    await payrollUpload.getPPEDateDropdown();
    await payrollUpload.inputPPEdateDropdown("12/04/2021");
  });

  test("Navigate to /Payroll/Sup and validate PPE Date dropdown functionality, Bi-Weekly Wk2 @func", async ({
    browser,
    page,
  }) => {
    const payrollUpload = new PayrollUpload(page);
    await payrollUpload.goto();

    // a pay cycle needs to be input
    await payrollUpload.inputPayCalendarDropdown("Biwee");
    const biWeekly1 = await page.innerText("text=BiWeekly Wk2");
    expect(biWeekly1).toBe("BiWeekly Wk2");

    // ppe date input
    await payrollUpload.getPPEDateDropdown();
    await payrollUpload.inputPPEdateDropdown("12/04/2021");
  });

  test("Navigate to /Payroll and validate Accounting Month Date Calendar functionality @func", async ({
    browser,
    page,
  }) => {
    const payrollUpload = new PayrollUpload(page);
    await payrollUpload.goto();

    // a pay cycle needs to be input
    await payrollUpload.inputPayCalendarDropdown("Semi");
    const semiMonthly = await page.innerText("text=Semi-monthly");
    expect(semiMonthly).toBe("Semi-monthly");

    // ppe date input
    await payrollUpload.getPPEDateDropdown();
    await payrollUpload.inputPPEdateDropdown("07/15/2021");

    // click and choose Accounting Month Date
    await page
      .locator("#fileUpload")
      .getByRole("button", { name: "select" })
      .nth(2)
      .click();
    await page.getByRole("link", { name: "Apr" }).click();
  });

  test("Navigate to /Payroll/Upload and attempt to Sup valid Timecard file @func", async ({
    browser,
    page,
  }) => {
    const payrollUpload = new PayrollUpload(page);
    await payrollUpload.goto();

    // a pay cycle needs to be input
    await payrollUpload.inputPayCalendarDropdown("Semi");
    const semiMonthly = await page.innerText("text=Semi-monthly");
    expect(semiMonthly).toBe("Semi-monthly");

    // ppe date input
    await payrollUpload.getPPEDateDropdown();
    await payrollUpload.inputPPEdateDropdown("03/15/2021");

    // valid timecard
    await payrollUpload.uploadValidTimecard();
  });
});
