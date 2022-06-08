// Payroll Offcycle Earnings

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayrollOffCycleEarnings } = require("./payroll_offcycle_earnings.js");

// user
test.use({ storageState: "pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /OffCycleEarnings elements", () => {
  test("Navigate to /Payroll/Adjustment Validate Company dropdown options can be input", async ({
    page,
  }) => {
    const payrollOffcycle = new PayrollOffCycleEarnings(page);
    await payrollOffcycle.goto();

    // company
    await payrollOffcycle.inputCompanyDropdown("Medford CJD");
    const medford = await page.innerText("text=Medford CJD");
    expect(medford).toBe("Medford CJD (L0004)");

    // company 2
    await payrollOffcycle.inputCompanyDropdown("L0184");
    const montereyPorsche = await page.innerText("text=Monterey Porsche");
    expect(montereyPorsche).toBe("Monterey Porsche (L0184)");
  });

  test("Navigate to /Payroll/Adjustment Validate Employee dropdown options can be input", async ({
    page,
  }) => {
    const payrollOffcycle = new PayrollOffCycleEarnings(page);
    await payrollOffcycle.goto();
    await payrollOffcycle.getEmployeeDropdown();

    // employee one
    await payrollOffcycle.inputEmployeeDropdown("Brian Maksin");
    const employeeOne = await page.innerText("text=Brian Maksin");
    expect(employeeOne).toBe("Brian Maksin (174403)");
  });

  test("Navigate to /Payroll/Adjustment Load button is NOT present when input is incomplete ", async ({
    page,
  }) => {
    const payrollOffcycle = new PayrollOffCycleEarnings(page);
    await payrollOffcycle.goto();
    await payrollOffcycle.getPPEdateDropdownHidden();
  });

  test("Navigate to /Payroll/Adjustment Validate Pay Frequency dropdown options can be input", async ({
    page,
  }) => {
    const payrollOffcycle = new PayrollOffCycleEarnings(page);
    await payrollOffcycle.goto();

    // semi monthly
    await payrollOffcycle.inputPayFrequencyDropdown("Semi");
    const semiMonthly = await page.innerText("text=Semi-monthly");
    expect(semiMonthly).toBe("Semi-monthly");

    // // weekly
    await payrollOffcycle.inputPayFrequencyDropdown("Wee");
    const weekly = await page.innerText("text=Weekly");
    expect(weekly).toBe("Weekly");

    // // bi weeky
    await payrollOffcycle.inputPayFrequencyDropdown("Bi-wee");
    const biWeekly = await page.innerText("text=Bi-Weekly");
    expect(biWeekly).toBe("Bi-Weekly");

    // // bi weekly week 1
    await payrollOffcycle.inputPayFrequencyDropdown("Biwee");
    const biWeekly1 = await page.innerText("text=BiWeekly Wk1");
    expect(biWeekly1).toBe("BiWeekly Wk1");

    // // bi weekly week 2
    await payrollOffcycle.inputPayFrequencyDropdown("2");
    const biWeekly2 = await page.innerText("text=BiWeekly Wk2");
    expect(biWeekly2).toBe("BiWeekly Wk2");
  });

  test("Navigate to /Payroll/Adjustment Validate Job Title dropdown options can be input", async ({
    page,
  }) => {
    const payrollOffcycle = new PayrollOffCycleEarnings(page);
    await payrollOffcycle.goto();

    // software engineer
    await payrollOffcycle.inputJobTitleDropdown("Software Engineer");
    const softwareEngineer = await page.innerText(
      "text=Software Engineer (65083)"
    );
    expect(softwareEngineer).toBe("Software Engineer (65083)");

    // Body Shop Paint Technician
    await payrollOffcycle.inputJobTitleDropdown("Body Shop Paint");
    const semiMonthly = await page.innerText(
      "text=Body Shop Paint Technician (35019)"
    );
    expect(semiMonthly).toBe("Body Shop Paint Technician (35019)");
  });

  test("Navigate to /Payroll/Adjustment Validate Cost Center dropdown options can be input", async ({
    page,
  }) => {
    const payrollOffcycle = new PayrollOffCycleEarnings(page);
    await payrollOffcycle.goto();

    // DETAIL
    await payrollOffcycle.inputCostCenterDropdown("Detail");
    const detail = await page.innerText("text=Detail (DETAIL)");
    expect(detail).toBe("Detail (DETAIL)");

    // IPWIPW
    await payrollOffcycle.inputCostCenterDropdown("IPW");
    const ipwipw = await page.innerText("text=IPW (IPWIPW)");
    expect(ipwipw).toBe("IPW (IPWIPW)");

    // Overhead
    await payrollOffcycle.inputCostCenterDropdown("Overhead");
    const ovrhed = await page.innerText("text=Overhead (OVRHED)");
    expect(ovrhed).toBe("Overhead (OVRHED)");

    // Parts
    await payrollOffcycle.inputCostCenterDropdown("Parts");
    const partss = await page.innerText("text=Parts (PARTSS)");
    expect(partss).toBe("Parts (PARTSS)");

    // Sales - New F&I
    await payrollOffcycle.inputCostCenterDropdown("sales");
    const slsfin = await page.innerText("text=Sales - New F&I (SLSFIN)");
    expect(slsfin).toBe("Sales - New F&I (SLSFIN)");

    // New Vehicle
    await payrollOffcycle.inputCostCenterDropdown("New Veh");
    const slsnew = await page.innerText("text=Sales - New Vehicle (SLSNEW)");
    expect(slsnew).toBe("Sales - New Vehicle (SLSNEW)");

    // Sales - Used Vehicle
    await payrollOffcycle.inputCostCenterDropdown("used veh");
    const slsuse = await page.innerText("text=Sales - Used Vehicle (SLSUSE)");
    expect(slsuse).toBe("Sales - Used Vehicle (SLSUSE)");

    // Service
    await payrollOffcycle.inputCostCenterDropdown("Serv");
    const servic = await page.innerText("text=Service (SERVIC)");
    expect(servic).toBe("Service (SERVIC)");
  });

  test("Navigate to /Payroll/Adjustment Validate Status dropdown options can be input", async ({
    page,
  }) => {
    const payrollOffcycle = new PayrollOffCycleEarnings(page);
    await payrollOffcycle.goto();

    // Not Run
    await payrollOffcycle.inputStatusDropdown("Not");
    const notRun = await page.innerText("text=Not Run");
    expect(notRun).toBe("Not Run");

    // Processing
    await payrollOffcycle.inputStatusDropdown("Proc");
    const processing = await page.innerText("text=Processing");
    expect(processing).toBe("Processing");

    // Error
    await payrollOffcycle.inputStatusDropdown("Err");
    const error = await page.innerText("text=Error");
    expect(error).toBe("Error");

    // Preliminary
    await payrollOffcycle.inputStatusDropdown("Prelim");
    const preliminary = await page.innerText("text=Preliminary");
    expect(preliminary).toBe("Preliminary");

    // Complete
    await payrollOffcycle.inputStatusDropdown("Comp");
    const complete = await page.innerText("text=Complete");
    expect(complete).toBe("Complete");

    // Data Load Error
    await payrollOffcycle.inputStatusDropdown("Load");
    const dataLoadErr = await page.innerText("text=Data Load Error");
    expect(dataLoadErr).toBe("Data Load Error");
  });

  test("Navigate to /Payroll/Adjustment Validate Type dropdown options can be input", async ({
    page,
  }) => {
    const payrollOffcycle = new PayrollOffCycleEarnings(page);
    await payrollOffcycle.goto();

    // Accrual
    await payrollOffcycle.inputTypeDropdown("Acc");
    const accrual = await page.innerText("text=Accrual");
    expect(accrual).toBe("Accrual");

    // Audit
    await payrollOffcycle.inputTypeDropdown("Aud");
    const audit = await page.innerText("text=Audit");
    expect(audit).toBe("Audit");

    // Adjustment
    await payrollOffcycle.inputTypeDropdown("Adj");
    const adjustment = await page.innerText("text=Adjustment");
    expect(adjustment).toBe("Adjustment");

    // Manual - New
    await payrollOffcycle.inputTypeDropdown("New");
    const manNew = await page.innerText("text=Manual - New");
    expect(manNew).toBe("Manual - New");

    // Manual - Reverse
    await payrollOffcycle.inputTypeDropdown("Rev");
    const manRev = await page.innerText("text=Manual - Reverse");
    expect(manRev).toBe("Manual - Reverse");

    // Manual - Termination
    await payrollOffcycle.inputTypeDropdown("Term");
    const manTerm = await page.innerText("text=Manual - Termination");
    expect(manTerm).toBe("Manual - Termination");

    // Payroll
    await payrollOffcycle.inputTypeDropdown("Payr");
    const payroll = await page.innerText("text=Payroll");
    expect(payroll).toBe("Payroll");
  });

  test("Navigate to /Payroll/Adjustment Validate when company and pay frequency are input PPEdate can be input", async ({
    page,
  }) => {
    // test.fixme("race condition preventing success");
    const payrollOffcycle = new PayrollOffCycleEarnings(page);
    await payrollOffcycle.goto();

    // company
    await payrollOffcycle.inputCompanyDropdown("Medford CJD");
    const medford = await page.innerText("text=Medford CJD");
    expect(medford).toBe("Medford CJD (L0004)");

    // semi monthly
    await payrollOffcycle.inputPayFrequencyDropdown("Semi");
    const semiMonthly = await page.innerText("text=Semi-monthly");
    expect(semiMonthly).toBe("Semi-monthly");

    if (await payrollOffcycle.clickPPEDateDropdown()) {
      const ppeDate = payrollOffcycle.inputCompanyDropdown("02/15/2022");
      expect(ppeDate).toBe("02/15/2022");
    }
  });
});
