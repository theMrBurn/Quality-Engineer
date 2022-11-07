// Payroll Regular

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollRegular } = require("./payroll_regular.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe("Payroll /Regular - Audit View validation @e2e", () => {
  test("Navigate to Payroll /Regular and validate Audit View grid", async ({
    page,
  }) => {
    const payrollRegular = new PayrollRegular(page);

    await payrollRegular.goto();

    // select company
    await payrollRegular.clickInputCompanyDropdown();
    await page.locator("text=Medford CJD (L0004)").click();

    const company = await page.innerText("text=Medford CJD (L0004)");
    expect(company).toBe("Medford CJD (L0004)");

    // select ppeDate
    await payrollRegular.clickPeriodEndDateListDropdown();
    await page.locator("text=06/30/2022").click();

    const ppeDate = await page.innerText("text=06/30/2022");
    expect(ppeDate).toBe("06/30/2022");

    // validate grid response includes a completed payroll
    const payrollStatus = await page.locator(
      'table[role="treegrid"] span:has-text("Complete")'
    );
    expect(payrollStatus).toHaveText("Complete");

    // click Audit view [aria-label="Expand"]
    await payrollRegular.clickExpandAuditView();

    // validate Audit View results

    const dataGridResultDateTime = await page.locator(
      "#PayrollEventAuditGrid_8896_34_07102022120000 >> text=Date/Time"
    );
    expect(dataGridResultDateTime).not.toBeEmpty();

    const dataGridResultUser = await page.locator(
      '#PayrollEventAuditGrid_8896_34_07102022120000 th[role="columnheader"]:has-text("User")'
    );
    expect(dataGridResultUser).not.toBeEmpty();

    const dataGridResultPayrollTask = await page.locator(
      '#PayrollEventAuditGrid_8896_34_07102022120000 th[role="columnheader"]:has-text("Task")'
    );
    expect(dataGridResultPayrollTask).not.toBeEmpty();

    const payrollTaskRRP = await page.locator(
      'td[role="gridcell"]:has-text("Register Review Payroll")'
    );
    expect(payrollTaskRRP).toHaveText("Register Review Payroll");

    const payrollTaskRRC = await page.locator(
      'td[role="gridcell"]:has-text("Register Review Company")'
    );
    expect(payrollTaskRRC).toHaveText("Register Review Company");

    const payrollTaskComplete = await page.locator(
      'td[role="gridcell"]:has-text("Complete") >> nth=0'
    );
    expect(payrollTaskComplete).toHaveText("Complete");

    await payrollRegular.clickCollapseAuditView();
  });
});
