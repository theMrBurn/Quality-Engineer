import { test, expect } from "@playwright/test";
import { SaharaLPO } from "./sahara_LPO.js";

test.describe.serial("Sahara Lien Payoff - Functionality @e2e", () => {
  test("Navigate to Sahara Lien Payoff and validate basic edit & approval workflow functions, as well as unapproving the approval", async ({
    page,
  }) => {
    const saharaLPO = new SaharaLPO(page);
    await saharaLPO.goto();

    const importing = await saharaLPO.isDataImporting();
    if (importing) {
      console.log("INFO: Lien Payoff data is currently importing. Test passes because this is expected behavior.");
      return;
    }

    try {
      await saharaLPO.checkElementVisibility("firstRowLPO");
      await saharaLPO.clickElement("firstRowLPO");

      await saharaLPO.checkElementVisibility("editApprovalButton");
      await saharaLPO.clickElement("editApprovalButton");

      await saharaLPO.inputVinNumber("123456789zxtvg");

      await saharaLPO.checkElementVisibility("lienholderDropdown");
      await saharaLPO.clickElement("lienholderDropdown");

      await page.getByRole("option", { name: "FTB - 5TH/3RD BANK" }).click();

      await saharaLPO.checkElementVisibility("saveButton");
      await saharaLPO.clickElement("saveButton");

      await saharaLPO.checkElementVisibility("approvalButton");
      await saharaLPO.clickElement("approvalButton");

      await saharaLPO.checkElementVisibility("unapproveButton");
      await saharaLPO.clickElement("unapproveButton");

      await page.getByRole("button", { name: "Unapprove" }).click();

      await saharaLPO.checkElementVisibility("closeEditApproveModal");
      await saharaLPO.clickElement("closeEditApproveModal");

      await page.waitForLoadState("networkidle");
    } catch (error) {
      console.error("Error during E2E edit & approval workflow test:", error.message);
      throw new Error(`E2E test failed with error: ${error.message}`);
    }
  });
});
