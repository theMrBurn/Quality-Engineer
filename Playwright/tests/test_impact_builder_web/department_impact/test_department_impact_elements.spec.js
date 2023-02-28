// Payplan ID endpoint

// dependancies
const { test, expect } = require("@playwright/test");
const { DepartmentImpact } = require("./department_impact.js");

//test
test.describe
  .serial("Impact Builder - Department Impact Component Page Elements @smoke", () => {
  test("Navigate to /?payplanid=3822 and validate Department Impact Component elements have loaded", async ({
    page,
  }) => {
    const departmentImpact = new DepartmentImpact(page);

    //at the top of the test, must declare the payplan under test by going directly there via URL query
    const payplanID = "/?payplanid=3822";
    await departmentImpact.goto(payplanID);

    //validate expected text elements have loaded
    await departmentImpact.getServiceAdvisorText();
    await departmentImpact.getPersonalExpenseText();
    await departmentImpact.getExpensePercentGrossText();
    await departmentImpact.getExpenseGuideText();
  });
});
