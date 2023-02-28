// Payplan ID endpoint

// dependancies
const { test, expect } = require("@playwright/test");
const { BonusImpact } = require("./bonus_impact.js");

//test
test.describe
  .serial("Impact Builder - Payout Impact Component Page Elements @smoke", () => {
  test("Navigate to /?payplanid=3828 and validate Payout Impact Component elements have loaded", async ({
    page,
  }) => {
    const bonusImpact = new BonusImpact(page);

    //at the top of the test, must declare the payplan under test by going directly there via URL query

    const payplanID = "/?payplanid=3828";
    await bonusImpact.goto(payplanID);

    //validate expected text elements have loaded
    await bonusImpact.getBonusImpactHeader();
    await bonusImpact.getActionsColumnText();
    await bonusImpact.getUseCalculatedColumnText();
    await bonusImpact.getDescriptionColumnText();
    await bonusImpact.getTwentytwentyoneColumnText();
    await bonusImpact.getPerformaceObjectiveColumnText();
    await bonusImpact.getWeightColumnText();
    await bonusImpact.getFICommissionText();
    await bonusImpact.getFICommissionsPercentText();
    await bonusImpact.getFICommissionText();
  });
});
