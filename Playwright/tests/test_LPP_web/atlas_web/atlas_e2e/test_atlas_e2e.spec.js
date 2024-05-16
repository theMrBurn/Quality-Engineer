// Impact Builder Analysis Portal

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AtlasE2E } = require("./atlas_e2e.js");

//test
test.describe.serial("Atlas End to End - Approval Flow @e2e", () => {
  test("Navigate to Atlas Web, step through approval flow, triggering as many alerts as possible, full CRUD", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .getByRole("paragraph")
      .click();

    try {
      //press Update to trigger Error Alert
      await bodyShopPersonnelExpense.locators.peAOPinput().clear();
      await bodyShopPersonnelExpense.locators.pePotentialInput().clear();
      await bodyShopPersonnelExpense.locators.peUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });
});
