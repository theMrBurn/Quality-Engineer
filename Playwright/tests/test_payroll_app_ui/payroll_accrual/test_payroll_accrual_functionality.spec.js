// Payroll Accrual

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollRegular, PayrollAccrual } = require("./payroll_accrual.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe("Payroll /Accrual - dropdowns functional check", () => {
  test("Navigate to Payroll /Accrual and interact with Company dropdown @func", async ({
    page,
  }) => {
    const payrollAccrual = new PayrollAccrual(page);

    await payrollAccrual.goto();

    // company
    await payrollAccrual.clickCompanyDropdown();
    await payrollAccrual.inputCompanyDropdownText("L0003");
    await page.locator("text=Medford Body Shop (L0003)").click();

    const medford = await page.innerText("text=Medford");
    expect(medford).toBe("Medford Body Shop (L0003)");
  });

  test("Navigate to Payroll /Accrual and interact with PPE Date dropdown @func", async ({
    page,
  }) => {
    const payrollAccrual = new PayrollAccrual(page);

    await payrollAccrual.goto();

    // pay period end date
    await payrollAccrual.clickAccrualInputPPEdate();
    await payrollAccrual.inputPPEDateDropdown("02/15/2022");
    await page.locator("text=02/15/2022").click();

    const ppeDate = await page.innerText("text=02/15/2022");
    expect(ppeDate).toBe("02/15/2022");
  });

  test("Navigate to Payroll /Accrual and interact with Pay Frequency Dropdown @func", async ({
    page,
  }) => {
    const payrollAccrual = new PayrollAccrual(page);

    await payrollAccrual.goto();

    // pay calendar Semi Monthly
    await payrollAccrual.clickPayFrequencyDropdown();
    await payrollAccrual.inputPayFrequencyDropdown("Semi");

    const payFrequency1 = await page.innerText("text=Semi-monthly");
    expect(payFrequency1).toBe("Semi-monthly");
    await payrollAccrual.clickDeletePayFrequency();

    // pay calendar Weekly
    await payrollAccrual.clickPayFrequencyDropdown();
    await payrollAccrual.inputPayFrequencyDropdown("Weekly");

    const payFrequency2 = await page.innerText("text=Weekly");
    expect(payFrequency2).toBe("Weekly");
    await payrollAccrual.clickDeletePayFrequency();

    // pay calendar Bi-Weekly
    await payrollAccrual.clickPayFrequencyDropdown();
    await payrollAccrual.inputPayFrequencyDropdown("Bi-");

    const payFrequency3 = await page.innerText("text=Bi-weekly");
    expect(payFrequency3).toBe("Bi-weekly");
    await payrollAccrual.clickDeletePayFrequency();
  });

  test("Navigate to Payroll /Accrual and validate when Company, PPE and Pay Frequency are input, Accrual Grid is present @func", async ({
    page,
  }) => {
    const payrollAccrual = new PayrollAccrual(page);

    await payrollAccrual.goto();

    // pay calendar
    await payrollAccrual.clickCompanyDropdown();
    await payrollAccrual.inputCompanyDropdownText("Medford");
    await page.locator("text=Medford Body Shop (L0003)").click();

    const medford = await page.innerText("text=Medford");
    expect(medford).toBe("Medford Body Shop (L0003)");

    await payrollAccrual.clickAccrualInputPPEdate();
    await payrollAccrual.inputPPEDateDropdown("12/15/2022");
    await page.locator("text=12/15/2022").click();

    const ppeDate = await page.innerText("text=12/15/2022");
    expect(ppeDate).toBe("12/15/2022");

    await payrollAccrual.clickPayFrequencyDropdown();
    await payrollAccrual.inputPayFrequencyDropdown("Semi");
    const payFrequency = await page.innerText("text=Semi-monthly");
    expect(payFrequency).toBe("Semi-monthly");

    // if dropdowns chosen properly, this Run button should be visible
    await payrollAccrual.getAccrualRunButton1();
  });
});
