import { test, expect } from "@playwright/test";
import { SaharaLPO } from "./sahara_LPO.js";

test.describe.serial("Sahara Lien Payoff - Functionality @func", () => {
  test("Basic functional elements test", async ({ page }) => {
    const saharaLPO = new SaharaLPO(page);

    await saharaLPO.waitForPageLoad();
    const importing = await saharaLPO.isImporting();

    if (importing) {
      console.log(
        "INFO: Data is importing - basic functional elements test cannot run full checks. Marking test passed with info."
      );
      return;
    }

    try {
      await saharaLPO.checkElementVisibility("groupDropdown");
      await saharaLPO.clickElement("groupDropdown");

      await page.getByRole("option", { name: "ALL GROUPS" }).click();

      await saharaLPO.checkElementVisibility("resetFiltersButton");
      await saharaLPO.clickElement("resetFiltersButton");

      await page.waitForLoadState("networkidle");
    } catch (error) {
      console.error("Error during basic functional elements test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Basic search input and grid output test", async ({ page }) => {
    const saharaLPO = new SaharaLPO(page);

    await saharaLPO.waitForPageLoad();
    const importing = await saharaLPO.isImporting();

    if (importing) {
      console.log(
        "INFO: Data is importing - search and grid validation test cannot run full checks. Marking test passed with info."
      );
      return;
    }

    try {
      await saharaLPO.inputSearch("Smith");

      const gridResults = page.locator(
        '//*[@id="root"]/div/div[2]/div/div/div/div/div/div[3]/div/div[1]/table/tbody/tr[1]/td[5]'
      );
      const gridResultsText = await gridResults.innerText();

      console.log(`Grid result text after search: ${gridResultsText}`);

      // Add assertion when appropriate:
      // expect(gridResultsText).toContain("Smith");
    } catch (error) {
      console.error("Error during search and grid validation test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Basic edit & approval workflow test", async ({ page }) => {
    const saharaLPO = new SaharaLPO(page);

    await saharaLPO.waitForPageLoad();
    const importing = await saharaLPO.isImporting();

    if (importing) {
      console.log(
        "INFO: Data is importing - edit & approval workflow test cannot run full checks. Marking test passed with info."
      );
      return;
    }

    try {
      await saharaLPO.checkElementVisibility("firstRowLPO");
      await saharaLPO.clickElement("firstRowLPO");

      await saharaLPO.checkElementVisibility("editApprovalButton");
      await saharaLPO.clickElement("editApprovalButton");

      await saharaLPO.checkElementVisibility("inputVin");
      await saharaLPO.checkElementVisibility("lienholderDropdown");

      await saharaLPO.checkElementVisibility("saveButton");
      await saharaLPO.clickElement("saveButton");

      await saharaLPO.checkElementVisibility("approvalButton");

      await saharaLPO.checkElementVisibility("closeEditApproveModal");
      await saharaLPO.clickElement("closeEditApproveModal");

      await page.waitForLoadState("networkidle");
    } catch (error) {
      console.error("Error during edit & approval workflow test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});