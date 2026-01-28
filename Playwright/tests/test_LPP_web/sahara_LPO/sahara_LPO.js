const { expect } = require("@playwright/test");

class SaharaLPO {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators as requested in the new format
    this.locators = {
      // headers
      pageHeader: () => this.page.getByRole("heading", {
        name: "Liens Approval Center",
        exact: true,
      }),

      // unique page text
      fundingAlert: () => this.page.getByText("Update Lien - Lien payoff not found"),

      // importing/loading message
      importingMessage: () =>
        this.page.getByText("Lien Payoff data is currently importing. Please check back soon."),

      // search, buttons, dropdowns and input boxes
      searchBar: () => this.page.getByPlaceholder("SEARCH"),
      groupDropdown: () => this.page.getByRole("button", { name: "ALL GROUPS" }),
      editApprovalButton: () => this.page.getByRole("button", { name: "EDIT" }),
      approvalButton: () => this.page.getByRole("button", { name: "Approve" }),
      lienholderDropdown: () => this.page.getByRole("button", { name: "Open" }),
      saveButton: () => this.page.getByRole("button", { name: "SAVE" }),
      unapproveButton: () => this.page.getByRole("button", { name: "Unapprove" }),

      // forms and grids
      approvedColumn: () => this.page.getByText("APPROVED"),
      idColumn: () => this.page.getByText("ID"),
      storeNumberColumn: () => this.page.getByText("STORE #"),
      groupColumn: () => this.page.getByText("GROUP", { exact: true }),
      customerColumn: () => this.page.getByText("CUSTOMER"),
      salesStockNumberColumn: () => this.page.getByText("SALES STOCK #"),
      tradeVINColumn: () => this.page.getByText("TRADE VIN"),
      firstRowLPO: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[2]/div/div/div/div/div/div[3]/div/div[1]/table/tbody/tr[1]/td[3]'
        ),

      // unique elements
      resetFiltersButton: () =>
        this.page.getByRole("button", {
          name: "Reset Filters",
        }),

      logoLPO: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[1]/header/div/div[1]/div/a'
        ),

      gridToolbarLPO: () =>
        this.page.locator(
          "#root > div > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > div > div > div > div > div > div.k-toolbar.k-grid-toolbar > div"
        ),

      closeEditApproveModal: () =>
        this.page.locator('[data-test="data-details"] button').first(),

      inputVin: () => this.page.getByLabel("VIN / Acct #"),
    };
  }

  // Navigate to /lienpayoff endpoint and wait for basic page load
  async waitForPageLoad() {
    await this.page.goto("/lienpayoff");
    await this.page.waitForLoadState("load");
    // Optionally wait for a key stable element like page header
    await this.checkElementVisibility("pageHeader");
  }

  /**
   * Detect if Lien Payoff data is currently importing
   * @returns {Promise<boolean>} True if importing message visible, else false
   */
  async isImporting() {
    try {
      return await this.locators.importingMessage().isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }

  /**
   * Checks visibility of an element by locator name
   * @param {string} locatorName - The key in this.locators object
   */
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    if (!locatorFunction) {
      throw new Error(`Locator '${locatorName}' not found in locators`);
    }

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  /**
   * Click an element by locator name
   * @param {string} locatorName - The key in this.locators object
   */
  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    if (!locatorFunction) {
      throw new Error(`Locator '${locatorName}' not found in locators`);
    }

    try {
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  /**
   * Fill a form based on test data object where keys correspond to locators keys
   * @param {Object} testData - key:value pairs where key is locatorName, value is text to fill
   */
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

  /**
   * Finds and clicks the first row of a grid identified by its selector
   * @param {string} gridElementSelector - selector for grid rows
   */
  async findFirstGridRow(gridElementSelector) {
    await this.page.waitForSelector(gridElementSelector);

    const gridRowHandles = await this.page.$$(gridElementSelector);
    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];

      // Ensure it is attached to DOM
      await this.page.evaluate((element) => {
        if (!element.isConnected) {
          throw new Error("Element is not attached to the DOM");
        }
      }, firstGridRow);

      await firstGridRow.click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
    }
  }

  /**
   * Validate that the logo URL contains expected domain string
   */
  async validateLogoURL() {
    const saharaLPOLogoURL = this.locators.logoLPO();
    const href = await saharaLPOLogoURL.getAttribute("href");
    expect(href).toContain("lpp.lithia.com");
  }

  /**
   * Input text into search bar
   * @param {string} text
   */
  async inputSearch(text) {
    await this.checkElementVisibility("searchBar");
    const searchBar = this.locators.searchBar();
    await searchBar.click();
    await searchBar.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Input VIN number into associated input field
   * @param {string} text
   */
  async inputVinNumber(text) {
    await this.checkElementVisibility("inputVin");
    const vinInput = this.locators.inputVin();
    await vinInput.click();
    await vinInput.fill(text);
  }
}

module.exports = { SaharaLPO };
