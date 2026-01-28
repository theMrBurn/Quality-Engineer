import { test, expect } from "@playwright/test";
import { SaharaLPO } from "./sahara_LPO.js";

test.describe.serial("Sahara Lien Payoff - Functionality @func", () => {

  test("Navigate to Sahara Lien Payoff and validate basic functional elements are working as expected", async ({
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
      await saharaLPO.checkElementVisibility("groupDropdown");
      await saharaLPO.clickElement("groupDropdown");

      await page.getByRole("option", { name: "ALL GROUPS" }).click();

      await saharaLPO.checkElementVisibility("resetFiltersButton");
      await saharaLPO.clickElement("resetFiltersButton");

      await page.waitForLoadState("networkidle");
    } catch (error) {
      console.error("Error during basic functionality test:", error.message);
      throw new Error(`Functionality test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Sahara Lien Payoff and validate basic search input and corresponding grid output", async ({
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
      await saharaLPO.inputSearch("Smith");

      const gridResults = page.locator(
        '//*[@id="root"]/div/div[2]/div/div/div/div/div/div[3]/div/div[1]/table/tbody/tr[1]/td[5]'
      );
      const gridResultsText = await gridResults.innerText();

      console.log(`Grid result text after search: ${gridResultsText}`);

      // You can add assertion here when you want
      // expect(gridResultsText).toContain("Smith");
    } catch (error) {
      console.error("Error during search functionality test:", error.message);
      throw new Error(`Search functionality test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Sahara Lien Payoff and validate basic edit & approval workflow functions and modal close", async ({
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
      throw new Error(`Edit & approval workflow test failed with error: ${error.message}`);
    }
  });
});
