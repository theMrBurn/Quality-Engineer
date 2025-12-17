// Payplan Template

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependencies
const { test, expect } = require("@playwright/test");
const { PayplanTemplate } = require("./payplan_template.js");

// user
// test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

test.describe.serial("Payplan Template @func", () => {
  test("Navigate to Payplan Template and validate Job input functionality", async ({
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    try {
      // Check job input visibility
      await payplanTemplate.checkElementVisibility("jobInput");

      // Input "Building Manager"
      await payplanTemplate.fillForm({ jobInput: "Building Manager" });

      // Confirm on grid item appears
      await expect(
        page.locator('span:has-text("Building Manager (65067)")'),
      ).toBeVisible();

      // Clear/delete input
      await payplanTemplate.clearDropdownSelection("deleteInput");

      // Input "Software Engineer"
      await payplanTemplate.fillForm({ jobInput: "Software Engineer" });

      // Confirm on grid item appears
      await expect(
        page.locator('span:has-text("Software Engineer (65083)")'),
      ).toBeVisible();

      // Clear/delete input again
      await payplanTemplate.clearDropdownSelection("deleteInput");
    } catch (error) {
      console.error("Error during Job input test:", error.message);
      throw new Error(`Job input test failed: ${error.message}`);
    }
  });

  test("Navigate to Payplan Template and validate Department input functionality", async ({
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    try {
      // Check department input visibility
      await payplanTemplate.checkElementVisibility("departmentInput");

      // Input "Fleet"
      await payplanTemplate.fillForm({ departmentInput: "Fleet" });
      await expect(
        page.locator('span:has-text("Fleet (FLEETS)")'),
      ).toBeVisible();
      await payplanTemplate.clearDropdownSelection("deleteInput");

      // Input "Parts"
      await payplanTemplate.fillForm({ departmentInput: "Parts" });
      await expect(
        page.locator('span:has-text("Parts (PARTSS)")'),
      ).toBeVisible();
      await payplanTemplate.clearDropdownSelection("deleteInput");

      // Input "Service"
      await payplanTemplate.fillForm({ departmentInput: "Service" });
      await expect(
        page.locator('span:has-text("Service (SERVIC)")'),
      ).toBeVisible();
      await payplanTemplate.clearDropdownSelection("deleteInput");
    } catch (error) {
      console.error("Error during Department input test:", error.message);
      throw new Error(`Department input test failed: ${error.message}`);
    }
  });

  test("Navigate to Payplan Template and validate State input functionality", async ({
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    try {
      // Check State input visibility
      await payplanTemplate.checkElementVisibility("stateInput");

      // Input "Oregon"
      await payplanTemplate.fillForm({ stateInput: "Oregon" });
      await expect(page.locator('span:has-text("Oregon (OR)")')).toBeVisible();

      // Clear/delete input
      await payplanTemplate.clearDropdownSelection("deleteInput");

      // Uncomment if DB data restores for Washington state
      /*
    await payplanTemplate.fillForm({ stateInput: "Washington" });
    await expect(page.locator('span:has-text("Washington (WA)")')).toBeVisible();
    await payplanTemplate.clearDropdownSelection('deleteInput');
    */
    } catch (error) {
      console.error("Error during State input test:", error.message);
      throw new Error(`State input test failed: ${error.message}`);
    }
  });

  test("Navigate to Payplan Template and validate known Position Types input functionality", async ({
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    try {
      const selectAndDeletePositionType = async (optionText, nth = 0) => {
        // Open dropdown by clicking input
        await payplanTemplate.locators.positionTypeDropdown().click();

        // Click nth matching option by visible text
        await page.locator(`text=${optionText}`).nth(nth).click();

        // Clear/delete selection
        const deleteButton = payplanTemplate.locators.positionTypeDelete();

        if ((await deleteButton.count()) > 0) {
          await deleteButton.click();
        }
      };

      const positionTypes = [
        { text: "Individual Bonus Only" },
        { text: "Combined MIS" },
        { text: "Hourly" },
        { text: "Hourly Offset" },
        { text: "Hourly Plus" },
        { text: "Individual F&I", nth: 1 },
        { text: "Individual F&I Grid" },
        { text: "Individual F&I Penetration" },
        { text: "Individual F&I Tier" },
        { text: "Individual Gross Profit" },
        { text: "Individual RAP" },
        // { text: "Individual Sales" }, // test.fixme, excluded
        { text: "Individual Sales Unit Guarantee" },
        { text: "Interim" },
        { text: "Production" },
        { text: "Single MIS" },
        { text: "Store F&I" },
        { text: "Store Gross Profit" },
        { text: "Store Parts Gross" },
        { text: "Store RAP" },
        { text: "Team Gross Profit" },
        { text: "Team RAP" },
      ];

      for (const { text, nth = 0 } of positionTypes) {
        await selectAndDeletePositionType(text, nth);
      }
    } catch (error) {
      console.error("Error during Position Types input test:", error.message);
      throw new Error(`Position Types input test failed: ${error.message}`);
    }
  });

  test("Navigate to Payplan Template and validate known PayPlan Types input functionality", async ({
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    try {
      const selectAndDeletePlanType = async (optionText, nth = 0) => {
        // Open the Plan Type dropdown using locator from POM
        await payplanTemplate.locators.planTypeDropdown().click();

        // Click the nth occurrence of the plan type option by visible text
        if (nth === 0) {
          await page.locator(`text=${optionText}`).first().click();
        } else {
          await page.locator(`text=${optionText}`).nth(nth).click();
        }

        // Click delete/clear button using locator from POM
        const deleteButton = payplanTemplate.locators.planTypeDelete();
        if ((await deleteButton.count()) > 0) {
          await deleteButton.click();
        }

        // Optional: Wait for any potential network or UI idle after clearing selection
        await page.waitForLoadState("networkidle");
      };

      const planTypes = [
        { text: "Base" },
        { text: "Contract Rate" },
        { text: "Draw" },
        { text: "Guarantee", nth: 3 },
        { text: "Interim", nth: 1 },
        { text: "Interim Bonus" },
        { text: "Maximum Amount" },
        { text: "Special Guarantee" },
        { text: "Split Base" },
        { text: "Split Draw" },
        { text: "Vehicle Allowance" },
      ];

      for (const { text, nth = 0 } of planTypes) {
        await selectAndDeletePlanType(text, nth);
      }
    } catch (error) {
      console.error("Error during Plan Types input test:", error.message);
      throw new Error(`Plan Types input test failed: ${error.message}`);
    }
  });

  test("Navigate to Payplan Template and validate known Template Names input functionality", async ({
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    try {
      const templateNames = [
        "Tech - Sch 70",
        "SM - Sales Rep - Semi-Monthly COM",
        "SM - Sales Rep - Monthly COM",
        "Tech - Body Shop",
        "Tech - RTH Booked",
        "Tech - RTH Closed",
        "Sales Rep - Monthly COM - Unit Gua",
        "Sales Rep - Semi-Monthly COM - Unit Gua",
        "Service Advisor ADS",
        "F&I Grid Plan Template",
        "Tech - RTH Skill Cost Booked",
        "Tech - RTH Skill Cost Closed",
        "WK - Sales Rep - Always COM",
        "Sales Rep - Hourly Offset",
        "Sales Rep - Hourly Plus",
      ];

      for (const name of templateNames) {
        // Click the Template Name dropdown input to open options
        await payplanTemplate.locators.templateNameDropdown().click();

        // Select the option with visible text matching current name
        await page.locator(`li[role="option"]:has-text("${name}")`).click();

        // Assert the selection is visible on the page
        await expect(page.locator(`span:has-text("${name}")`)).toBeVisible();

        // Clear/delete the selection before next iteration
        const deleteButton = payplanTemplate.locators.templateNameDelete();

        if ((await deleteButton.count()) > 0) {
          await deleteButton.click();

          // Wait for network idle or some UI stability after clearing
          await page.waitForLoadState("networkidle");
        }
      }
    } catch (error) {
      console.error("Error during Template Names input test:", error.message);
      throw new Error(`Template Names input test failed: ${error.message}`);
    }
  });

  test("Navigate to Payplan Template and validate known PayPlan Pay Rate Types input functionality", async ({
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    try {
      const payRateTypes = [
        "Commission (CM)",
        "Flat Rate (FL)",
        "Hourly (HR)",
        "Salary (SL)",
      ];

      for (const name of payRateTypes) {
        // Click the triangle/dropdown to open the pay rate type options
        await payplanTemplate.locators.payRateTypeDropdownTriangle().click();

        // Click the option matching the current pay rate type name
        await page.locator(`text=${name}`).first().click();

        // Click the delete button/icon to clear the selection
        const deleteButton = payplanTemplate.locators.payRateTypeDelete();

        if ((await deleteButton.count()) > 0) {
          await deleteButton.click();

          // Wait to ensure UI has settled after clearing selection
          await page.waitForLoadState("networkidle");
        }
      }
    } catch (error) {
      console.error("Error during Pay Rate Types input test:", error.message);
      throw new Error(`Pay Rate Types input test failed: ${error.message}`);
    }
  });

  test("Navigate to Payplan Template and click Add PayPlan, basic smoke check of functionality", async ({
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    try {
      // Click the Add Template button
      await payplanTemplate.locators.addTemplateButton().click();

      // Expect navigation to PlanDetails page with id=0 and usage=Template
      await expect(page).toHaveURL(
        "/PayPlan/PlanDetails?id=0&payPlanUsage=Template",
      );

      // Click the Save button
      await payplanTemplate.locators.saveButton().click();

      // Click the Back button
      await payplanTemplate.locators.backButton().click();

      // Expect navigation back to PayPlanTemplate page
      await expect(page).toHaveURL("/PayPlan/PayPlanTemplate");
    } catch (error) {
      console.error("Error during Add PayPlan smoke test:", error.message);
      throw new Error(`Add PayPlan smoke test failed: ${error.message}`);
    }
  });
});
