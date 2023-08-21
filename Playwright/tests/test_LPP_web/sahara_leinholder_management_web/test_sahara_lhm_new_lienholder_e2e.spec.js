// Saraha Lienholder Management Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaLHMweb } = require("./sahara_lhm.js");

//test
test.describe
  .serial("Saraha Lienholder Management Web - Page Elements @e2e", () => {
  test("Navigate to Saraha Lienholder Management Web, begin to create new Lienholder, click cancel before saving, search for New Lienholder and validate New Lienholder not created", async ({
    browser,
    page,
  }) => {
    const testData = {
      inputCode: "TEST",
      inputName: "Created by Test Automation",
      inputAdd1: "1701 Enterprise",
      inputCity: "Star Fleet",
      inputState: "Terra",
      inputZip: "12345",
      inputBankAccount: "12245xxxxx",
      inputRoutingNumber: "000111222",
    };

    const saharaLHM = new SaharaLHMweb(page);
    await saharaLHM.goto();

    await saharaLHM.locators.newButton().click();

    const newLienholderModalHeader = page.getByRole("heading", {
      name: "CREATE NEW LIENHOLDER",
    });
    await expect(newLienholderModalHeader).toHaveText("CREATE NEW LIENHOLDER");

    await saharaLHM.fillForm(testData);
    await page.getByRole("button", { name: "CHECK" }).click();
    await page.getByRole("option", { name: "ACH" }).click();
    await page.getByRole("button", { name: "ACH" }).click();
    await page.getByRole("option", { name: "CHECK" }).click();
    await page.locator("label").filter({ hasText: "AT Eligible" }).click();

    await saharaLHM.locators.cancelButton().click();

    await saharaLHM.locators.searchBar().fill("Test Automation");
    const searchResultsText = await page
      .locator(
        "#root > div > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > div > div > div > div > div > div.k-grid-container > div > div:nth-child(1) > table > tbody",
      )
      .innerText();
    expect(searchResultsText).not.toContain("Created by Test Automation");
  });

  test("Navigate to Saraha Lienholder Management Web, begin to create new Lienholder, save and search for New Lienholder and validate New Lienholder created", async ({
    browser,
    page,
  }) => {
    const testData = {
      inputCode: "TEST",
      inputName: "Miles Obrien",
      inputAdd1: "DS9 ",
      inputAdd2: "Alpha Quadrant",
      inputCity: "Bajor Orbit",
      inputState: "OR",
      inputZip: "97000",
      entryDescription: "Created by Test Automation",
      inputBankAccount: "12245xxxxx",
      inputRoutingNumber: "000111222",
    };

    const saharaLHM = new SaharaLHMweb(page);
    await saharaLHM.goto();

    await saharaLHM.locators.newButton().click();

    await saharaLHM.fillForm(testData);

    await page.getByRole("button", { name: "CHECK" }).click();
    await page.getByRole("option", { name: "ACH" }).click();
    await page.getByRole("button", { name: "ACH" }).click();
    await page.getByRole("option", { name: "CHECK" }).click();
    await page.locator("label").filter({ hasText: "AT Eligible" }).click();

    await saharaLHM.locators.saveButton().click();

    await saharaLHM.locators.searchBar().fill("TEST");
    const saveSuccess = await page.getByText("Lienholder Created");
    await expect(
      saveSuccess,
      page.waitForLoadState("networkidle"),
    ).toBeVisible();
  });

  test("Navigate to Saraha Lienholder Management Web, find test Lienholder and Edit a couple of the attributes, then save the edit", async ({
    browser,
    page,
  }) => {
    const testData = {
      inputAdd1: "Defiant - tough little ship",
      entryDescription: "Edited by Test Automation",
    };

    const saharaLHM = new SaharaLHMweb(page);
    await saharaLHM.goto();

    await saharaLHM.locators.searchBar().fill("TEST");

    await page.getByRole("gridcell", { name: "TEST", exact: true }).click();

    await saharaLHM.locators.editButton().click();

    await saharaLHM.fillForm(testData);

    await saharaLHM.locators.saveButton().click();

    await saharaLHM.locators.searchBar().fill("TEST");
    const saveSuccess = await page.getByText("Lienholder Updated");
    await expect(
      saveSuccess,
      page.waitForLoadState("networkidle"),
    ).toBeVisible();
  });

  test("Navigate to Saraha Lienholder Management Web, find test Lienholder and Delete entry", async ({
    browser,
    page,
  }) => {
    const saharaLHM = new SaharaLHMweb(page);
    await saharaLHM.goto();

    await saharaLHM.locators.searchBar().fill("Miles");

    await page.getByRole("gridcell", { name: "TEST", exact: true }).click();

    // confirm Delete / Cancel flow
    await saharaLHM.locators.deleteButton().click();
    await page.getByRole("button", { name: "Cancel" }).click();

    // confirm Delete flow
    await page.getByRole("gridcell", { name: "TEST", exact: true }).click();
    await saharaLHM.locators.deleteButton().click();

    const deleteConfirmation = await page.getByText(
      "Are you sure you would like to delete TEST - Miles Obrien?",
    );

    await expect(
      deleteConfirmation,
      page.waitForLoadState("networkidle"),
    ).toBeVisible();

    await page.getByRole("button", { name: "DELETE" }).click();

    const saveSuccess = await page.getByText("Lienholder Removed");
    await expect(
      saveSuccess,
      page.waitForLoadState("networkidle"),
    ).toBeVisible();
  });
});
