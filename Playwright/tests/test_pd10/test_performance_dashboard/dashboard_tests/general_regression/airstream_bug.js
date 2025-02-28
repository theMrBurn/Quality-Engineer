const { expect } = require("@playwright/test");

class Airstream {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      getMultiStore: () =>
        this.page
          .locator("div")
          .filter({ hasText: "Multiple Stores Location" })
          .nth(2),
      getSelectGroup: () =>
        this.page.getByText(
          "Groups LITHIABAIERLDTLADAYPRESTIGECARBONEOTHERSUBURBANPFAFFAIRSTREAM",
        ),
      getPfaffCheck: () => this.page.locator("text=PFAFF"),
      getAirstreamGroup: () => this.page.locator("#grpAirstream"),
      getGoButton: () => this.page.locator('text="GO"'),
      getStoreSelector: () =>
        this.page.locator("#storeSelector >> text=Select"),
      getCalifornia: () =>
        this.page
          .getByRole("listitem")
          .filter({ hasText: "CALIFORNIA[+]Bay Area" })
          .locator("div")
          .nth(2),
      getIdaho: () =>
        this.page
          .getByRole("listitem")
          .filter({ hasText: "IDAHO[+]Boise Airstream" })
          .locator("div")
          .first(),
      getOregon: () =>
        this.page
          .getByRole("listitem")
          .filter({ hasText: "OREGON[+]Beaverton Buick" })
          .locator("div")
          .first(),
      getWashington: () =>
        this.page
          .getByRole("listitem")
          .filter({ hasText: "WASHINGTON[+]Bellevue" })
          .locator("div")
          .first(),
      getPacing1: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[1]/section[1]/div[2]/article[1]/table[1]/tbody[1]/tr[5]/td[3]",
        ),
      getPacing2: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[1]/section[1]/div[2]/article[1]/table[1]/tbody[1]/tr[8]/td[3]",
        ),
      getPacing3: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[1]/section[1]/div[2]/article[1]/table[1]/tbody[1]/tr[10]/td[3]",
        ),
      getSalesTab: () => this.page.locator('span:has-text("Sales")').first(),
      getSalesNewVehicle: () =>
        this.page.locator(':nth-match(:text("New Vehicle"),1)').first(),
      getSalesNewInventoryDetail: () =>
        this.page
          .locator(':nth-match(:text("New Inventory Detail"),1)')
          .first(),
      getFairfieldNVI: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/a[1]",
        ),
      getFairfieldUVI: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/a[1]",
        ),
      getOnGroundMake: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[6]/td[6]",
        ),
      getOnGroundModel: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[4]/td[7]",
        ),
      getOnGroundNVI: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[11]/td[16]",
        ),
      getOnGroundNVI2: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[12]/td[16]",
        ),
      getOnGroundUVI2: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[3]/td[11]",
        ),
      getOnGroundUVI3: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[4]/td[11]",
        ),
      getSalesUsedVehicle: () =>
        this.page.locator(':nth-match(:text("Used Vehicle"),1)').first(),
      getSalesUsedInventoryDetail: () =>
        this.page
          .locator(':nth-match(:text("Used Inventory Detail"),1)')
          .first(),
      getSalesLog: () =>
        this.page.locator(':nth-match(:text("Sales Log"),1)').first(),
      getWholesaleAlog: () =>
        this.page
          .locator(':nth-match(:text("Wholesale Log (ALOG)"),1)')
          .first(),
      getRetailSalesAlog: () =>
        this.page
          .locator(':nth-match(:text("Retail Sales Log (ALOG)"),1)')
          .first(),
    };
  }

  // navigation
  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

  // common test methods

  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement); // Wait for the grid element to be available in the DOM
    const gridRowHandles = await this.page.$$(gridElement); // Get handles for all grid rows

    // Check if any grid rows are found
    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];

      // Ensure the element is attached to the DOM
      await this.page.evaluate((element) => {
        if (!element.isConnected) {
          throw new Error("Element is not attached to the DOM");
        }
      }, firstGridRow);

      // Click on the first grid row
      await firstGridRow.click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
    }
  }

  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        try {
          await this.page.waitForLoadState("networkidle");
          const inputElement = await locatorFunction();
          await inputElement.fill(value);
        } catch (originalError) {
          const errorMessage = `Filling the form field with locator '${key}' failed: ${originalError.message}`;
          throw new Error(errorMessage);
        }
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }
}

module.exports = { Airstream };
