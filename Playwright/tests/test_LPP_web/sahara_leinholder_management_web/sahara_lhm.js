// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class SaharaLHMweb {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// elements
    this.locators = {
      searchBar: () => this.page.getByPlaceholder("SEARCH"),
      codeColumn: () =>
        (this.codeColumn = page
          .getByRole("columnheader", { name: "CODE " })
          .locator("span")
          .nth(1)),
      eligibleColumn: () =>
        this.page
          .getByRole("columnheader", { name: "AT ELIGIBLE " })
          .locator("span")
          .nth(1),
      nameColumn: () =>
        this.page
          .getByRole("columnheader", { name: "NAME " })
          .locator("span")
          .nth(1),
      addressColumn1: () =>
        this.page
          .getByRole("columnheader", { name: "ADDRESS 1 " })
          .locator("span")
          .nth(1),
      addressColumn2: () =>
        page
          .getByRole("columnheader", { name: "ADDRESS 2 " })
          .locator("span")
          .nth(1),
      citycolumn: () =>
        page
          .getByRole("columnheader", { name: "CITY " })
          .locator("span")
          .nth(1),
      stateColumn: () =>
        page
          .getByRole("columnheader", { name: "STATE " })
          .locator("span")
          .nth(1),
      zipColumn: () =>
        page
          .getByRole("columnheader", { name: "ZIP " })
          .locator("span")
          .nth(1),
      countryColumn: () =>
        page
          .getByRole("columnheader", { name: "COUNTRY " })
          .locator("span")
          .first(),
      bankAccountColumn: () =>
        page
          .getByRole("columnheader", { name: "BANK ACCOUNT " })
          .locator("span")
          .nth(1),
      routingNumberColumn: () =>
        page
          .getByRole("columnheader", { name: "ROUTING NUMBER " })
          .locator("span")
          .nth(1),
      paymentTypeColumn: () =>
        page
          .getByRole("columnheader", { name: "PAYMENT TYPE " })
          .locator("span")
          .nth(1),
      checkMailColumn: () =>
        page
          .getByRole("columnheader", { name: "CHECK MAIL " })
          .locator("span")
          .nth(1),
      entryDescriptionColumn: () =>
        page
          .getByRole("columnheader", { name: "ENTRY DESCRIPTION " })
          .locator("span")
          .nth(1),
      exportGridDataButton: () =>
        page.getByRole("button", {
          name: "EXPORT GRID DATA",
        }),
      newButton: () => page.getByRole("button", { name: "NEW" }),

      // edit modal
      cancelButton: () => page.getByRole("button", { name: "Cancel" }),
      newLHHeader: () =>
        page.getByRole("heading", {
          name: "CREATE NEW LIENHOLDER",
        }),
      inputCode: () => page.getByLabel("Code*"),
      inputName: () => page.getByLabel("Name*"),
      inputAdd1: () => page.getByLabel("Address 1*"),
      inputAdd2: () => page.getByLabel("Address 2*"),
      inputCity: () => page.getByLabel("City*"),
      inputState: () => page.getByLabel("State*"),
      inputZip: () => page.getByLabel("Zip*"),
      inputCountry: () => page.getByLabel("Country*"),
      inputBankAccount: () => page.getByLabel("Bank Account"),
      inputRoutingNumber: () => page.getByLabel("Routing Number"),
      optionCheck: () => page.getByRole("button", { name: "CHECK" }),
      optionACH: () => page.getByRole("option", { name: "ACH" }),
      entryDescription: () => page.getByLabel("Entry Description"),
      atEligible: () => page.getByLabel("AT Eligible"),
      cancelButton: () => page.getByRole("button", { name: "Cancel" }),
      saveButton: () => page.getByRole("button", { name: "Save" }),
      editButton: () => page.getByRole("button", { name: "EDIT" }),
      deleteButton: () => page.getByRole("button", { name: "Delete" }),
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/lienholders");
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements

  async checkElementVisibility(locatorName) {
    const locatorFunction = this.locators[locatorName];
    const element = await locatorFunction().first();
    try {
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (error) {
      throw new Error(`Locator '${locatorName}' failed: ${error.message}`);
    }
  }

  /// interact with elements

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        await this.page.waitForLoadState("networkidle");
        const inputElement = await locatorFunction();
        await inputElement.fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  /// columns have specific filter options

  async inputContractDateColumnFilter(text) {
    await this.getGridColumnContractDate();
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div span")
      .click();
    await this.page.waitForLoadState("networkidle");
    await this.page.getByText("Filter").click();
    await this.page.getByRole("textbox").click();
    await this.page.getByRole("textbox").fill("01/01/2001");
    await this.page
      .getByRole("button", { name: "Filter", exact: true })
      .click();
  }

  // filter
  async inputColumnFilter(text) {
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div span")
      .click();
    await this.page.waitForLoadState("networkidle");
    await this.page.getByText("Filter").click();
    await this.page.getByRole("textbox").first().click();
    await this.page.getByRole("textbox").first().fill("test");
    await this.page
      .getByRole("button", { name: "Filter", exact: true })
      .click();
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div")
      .click();
    await this.page.getByText("Filter").click();
    await this.page.getByRole("button", { name: "Clear" }).click();
  }
}
module.exports = { SaharaLHMweb };
