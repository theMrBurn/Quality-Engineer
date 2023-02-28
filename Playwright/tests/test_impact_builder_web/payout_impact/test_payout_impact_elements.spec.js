// Payplan ID endpoint

// dependancies
const { test, expect } = require("@playwright/test");
const { DepartmentImpact, PayoutImpact } = require("./payout_impact.js");

//test
test.describe
  .serial("Impact Builder - Payout Impact Component Page Elements @smoke", () => {
  test("Navigate to /?payplanid=3828 and validate Payout Impact Component elements have loaded", async ({
    page,
  }) => {
    const payoutImpact = new PayoutImpact(page);

    //at the top of the test, must declare the payplan under test by going directly there via URL query
    const payplanID = "/?payplanid=3828";
    await payoutImpact.goto(payplanID);

    //validate expected text elements have loaded
    await payoutImpact.getPayoutImpactHeader();
    await payoutImpact.getTwelveMoAverageText();
    await payoutImpact.getThreeMoAverageText();
    await payoutImpact.getPerformanceObjectiveText();
    await payoutImpact.getWeightText();
    await payoutImpact.getVehicleAllowanceText();
  });
});
