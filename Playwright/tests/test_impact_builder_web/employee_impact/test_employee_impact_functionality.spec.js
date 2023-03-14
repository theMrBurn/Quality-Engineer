// Payplan ID endpoint

// dependancies
const { test, expect } = require("@playwright/test");
const { EmployeeAndImpact } = require("./emplopyee_and_impact.js");

//test
test.describe
  .serial("Impact Builder - Employee and Impact Information functional testing @func", () => {
  test("Navigate to employee payplan, Validate that the payplan ID matches the expected employee", async ({
    page,
  }) => {
    const employeeAndImpact = new EmployeeAndImpact(page);

    //at the top of the test, must use Allpay Employee Payplan, select Employee under test and move on
    const payplanID = `?payplanid=3818`;
    await employeeAndImpact.goto(payplanID);

    const employeeName = "Stephen  Philips (569)";

    await expect(page.getByLabel("Employee")).toHaveValue(employeeName);
  });

  test("Navigate to employee payplan, Validate that upon page render, PPE Date Required is present", async ({
    page,
  }) => {
    const employeeAndImpact = new EmployeeAndImpact(page);

    //at the top of the test, must use Allpay Employee Payplan, select Employee under test and move on
    const payplanID = `?payplanid=3818`;
    await employeeAndImpact.goto(payplanID);

    const requiredAlert = page.getByText("Required");

    // PPE Date has not been entered, Required alert should be present
    await expect(requiredAlert, "Required Alert Not Found").toBeVisible();
  });

  test("Navigate to employee payplan, Validate that When PPE Date picked, Required alert is no longer present", async ({
    page,
  }) => {
    const employeeAndImpact = new EmployeeAndImpact(page);

    //at the top of the test, must use Allpay Employee Payplan, select Employee under test and move on
    const payplanID = `?payplanid=3818`;
    await employeeAndImpact.goto(payplanID);

    await page.getByRole("button", { name: "Pay Period End Date ​" }).click();
    await page.getByRole("option", { name: "02/25/2023" }).first().click();

    const requiredAlert = page.getByText("Required");

    // PPE Date Required red-alert should no longer be present since we picked a PPE date
    await expect(
      requiredAlert,
      "Required Alert Found, and should be hidden"
    ).toBeHidden();
  });

  test("Navigate to employee payplan, Validate that all expected Pay Plan Change Reason types can be selected", async ({
    page,
  }) => {
    const employeeAndImpact = new EmployeeAndImpact(page);

    //at the top of the test, must use Allpay Employee Payplan, select Employee under test and move on
    const payplanID = `?payplanid=3818`;
    await employeeAndImpact.goto(payplanID);

    const dropdownOptions = [
      "New Employee",
      "Position Change/Additional",
      "Transfer",
      "New Employee Replace",
      "Position Change/Replace",
      "Transfer/Replace",
      "Pay Plan Change",
      "Plan Renewal",
      "Expired Plan",
      "Position Change/Same Expense Line",
    ];

    // validate that all expected reason types are present in the dropdown
    const insideDropdown = page.locator('//*[@id="menu-"]/div[3]');
    await employeeAndImpact.clickReasonTypeDropdownInput();
    expect(insideDropdown).toHaveText(dropdownOptions); //-- if this fails, see string below, this is what the app returns

    // expect(insideDropdown).toHaveText(
    //   "AddNew EmployeePosition Change/AdditionalTransferReplaceNew Employee ReplacePosition Change/ReplaceTransfer/ReplaceAdjust for EmployeePay Plan ChangePlan RenewalExpired PlanPosition Change/Same Expense Line"
  });
});

test("Navigate to employee payplan, and select valid Reason Type", async ({
  page,
}) => {
  const employeeAndImpact = new EmployeeAndImpact(page);

  //at the top of the test, must use Allpay Employee Payplan, select Employee under test and move on
  const payplanID = `?payplanid=3818`;
  await employeeAndImpact.goto(payplanID);

  // select a reason type
  await employeeAndImpact.clickReasonTypeDropdownInput();
  await page.getByRole("option", { name: "Plan Renewal" }).click();
});
