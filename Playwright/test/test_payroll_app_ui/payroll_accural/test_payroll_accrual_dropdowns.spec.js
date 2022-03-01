// Payroll Accrual

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollRegular, PayrollAccrual } = require("./payroll_accrual.js");

// user
test.use({ storageState: "pw_auth_testenv.json" });

//test
test.describe("Payroll /Accrual - dropdowns functional check", () => {
  test.slow();
  test("Navigate to Payroll /Accrual and interact with Company dropdown", async ({
    page,
  }) => {
    const payrollAccrual = new PayrollAccrual(page);

    await payrollAccrual.goto();

    // company
    await payrollAccrual.inputCompanyDropdown("L0004");
  });

  test("Navigate to Payroll /Accrual and interact with PPE Date dropdown", async ({
    page,
  }) => {
    const payrollAccrual = new PayrollAccrual(page);

    await payrollAccrual.goto();

    // pay period end date
    await payrollAccrual.inputPPEDateDropdown("02/15/2022");
  });

  test("Navigate to Payroll /Accrual and interact with Pay Frequency Dropdown", async ({
    page,
  }) => {
    const payrollAccrual = new PayrollAccrual(page);

    await payrollAccrual.goto();

    // pay calendar
    await payrollAccrual.inputPayFrequencyDropdown("Semi");

    await payrollAccrual.inputPayFrequencyDropdown("Weekly");

    await payrollAccrual.inputPayFrequencyDropdown("Bi-");
  });

  test("Navigate to Payroll /Accrual and validate when Company, PPE and Pay Frequency are input, Accrual Grid is present", async ({
    page,
  }) => {
    const payrollAccrual = new PayrollAccrual(page);

    await payrollAccrual.goto();

    // pay calendar
    await payrollAccrual.inputCompanyDropdown("Med");

    const medford = await page.innerText("text=Medford CJD (L0004)");
    expect(medford).toBe("Medford CJD (L0004)");

    await payrollAccrual.inputPPEDateDropdown("12/15/20");

    await payrollAccrual.inputPayFrequencyDropdown("Semi");

    // if dropdowns chosen properly, this Run button should be visible
    await payrollAccrual.getAccrualRunButton1();
  });
});
