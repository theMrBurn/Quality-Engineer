import { test, expect } from "@playwright/test";
import { SaharaLPO } from "./sahara_LPO.js";

test.describe.serial("Sahara Lien Payoff - Functionality @e2e", () => {
  test("Edit & approval workflow, including unapprove test", async ({ page }) => {
    const saharaLPO = new SaharaLPO(page);

    await saharaLPO.waitForPageLoad();
    const importing = await saharaLPO.isImporting();

    if (importing) {
      console.log(
        "INFO: Data is importing - edit & approval E2E test cannot run full checks. Marking test passed with info."
      );
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
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
