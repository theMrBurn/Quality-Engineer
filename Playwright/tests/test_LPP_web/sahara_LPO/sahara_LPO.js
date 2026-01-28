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

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/lienpayoff");
  }

  // get page elements

  async getPageHeader() {
    await expect(this.locators.pageHeader(), "Page header not found").toBeVisible();
  }

  async getLPOLogo() {
    await expect(this.locators.logoLPO(), "LPP Portal not found").toBeVisible();
  }

  async getSearchBar() {
    await expect(this.locators.searchBar(), "Search Bar not found").toBeVisible();
  }

  async getLPOGridToolbar() {
    await expect(this.locators.gridToolbarLPO(), "Tool Bar not found").toBeVisible();
  }

  async getGroupDropdown() {
    await expect(this.locators.groupDropdown(), "Group dropdown not Found").toBeVisible();
  }

  async getApprovedColumn() {
    await expect(this.locators.approvedColumn(), "Approved Column not found").toBeVisible();
  }

  async getIDColumn() {
    await expect(this.locators.idColumn(), "ID Column not found").toBeVisible();
  }

  async getStoreNumberColumn() {
    await expect(this.locators.storeNumberColumn(), "Store Number Column not found").toBeVisible();
  }

  async getCustomerColumn() {
    await expect(this.locators.customerColumn(), "Customer Column not found").toBeVisible();
  }

  async getSalesStockNumColumn() {
    await expect(this.locators.salesStockNumberColumn(), "Sales Stock Number Column not found").toBeVisible();
  }

  async getTradeVINColumn() {
    await expect(this.locators.tradeVINColumn(), "Trade VIN Column not found").toBeVisible();
  }

  async getResetFiltersButton() {
    await expect(this.locators.resetFiltersButton(), "Reset Filters Button not visible").toBeVisible();
  }

  async getLPOLogoURL() {
    const saharaLPOLogoURL = this.locators.logoLPO();
    const href = await saharaLPOLogoURL.getAttribute("href");
    expect(href).toContain("lpp.lithia.com");
  }

  async getFirstRowLPO() {
    await expect(this.locators.firstRowLPO(), "First row result not found on Grid").toBeVisible();
  }

  async getEditApprovalButton() {
    await expect(this.locators.editApprovalButton(), "Edit Approvl Button not found when Modal expanded").toBeVisible();
  }

  async getCloseEditApproval() {
    await expect(this.locators.closeEditApproveModal(), "Edit Approval Close not found").toBeVisible();
  }

  async getApprovalButton() {
    await expect(this.locators.approvalButton(), "Approval Button not found").toBeVisible();
  }

  async getVinInput() {
    await expect(this.locators.inputVin(), "Input Vin not found").toBeVisible();
  }

  async getLienholderDropdown() {
    await expect(this.locators.lienholderDropdown(), "Lienholder Dropdown not found").toBeVisible();
  }

  async getSaveButton() {
    await expect(this.locators.saveButton(), "Save Button not found").toBeVisible();
  }

  async getUnapproveButton() {
    await expect(this.locators.unapproveButton(), "Unapprove Button not found").toBeVisible();
  }

  // interact with elements

  async clickGroupsDropdown() {
    await this.getGroupDropdown();
    await this.locators.groupDropdown().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickResetFiltersButton() {
    await this.getResetFiltersButton();
    await this.locators.resetFiltersButton().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickFirstRowResult() {
    await this.getFirstRowLPO();
    const firstRow = this.locators.firstRowLPO();
    expect(await firstRow.click());
    await this.page.waitForLoadState("networkidle");
  }

  async clickEditButton() {
    await this.getEditApprovalButton();
    await this.locators.editApprovalButton().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickApprovalButton() {
    try {
      await this.getApprovalButton();
      await this.locators.approvalButton().click();
      const approveCheckbox = await this.page.getByRole("checkbox").first();
      if (await approveCheckbox.isVisible()) {
        await approveCheckbox.check();
        const secondCheckbox = await this.page.getByRole("checkbox").nth(1);
        if (await secondCheckbox.isVisible()) {
          await secondCheckbox.check();
        }
        await this.page.getByRole("button", { name: "Approve" }).click();
        await this.page.waitForLoadState("networkidle");
      } else {
        await this.page.waitForLoadState("networkidle");
      }
    } catch (error) {
      console.error("Error: Unable to complete Approval", error);
    }
  }

  async clickCloseEditApprovalModal() {
    await this.getCloseEditApproval();
    await this.locators.closeEditApproveModal().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickLienholdersDropdown() {
    await this.getLienholderDropdown();
    await this.locators.lienholderDropdown().click();
  }

  async clickSaveButton() {
    await this.getSaveButton();
    await this.locators.saveButton().click();

    const confirmSave = this.page.getByText("Lien Payoff Updated");
    await expect(confirmSave).toBeVisible();
    await this.page.waitForLoadState("networkidle");
  }

  async clickUnapproveButton() {
    await this.getUnapproveButton();
    await this.locators.unapproveButton().click();
    await this.page.getByRole("button", { name: "Unapprove" }).click();

    const confirmUnapprove = this.page.getByText(
      "Removed Lien Payoff Approval"
    );
    await expect(confirmUnapprove).toBeVisible();
    await this.page.waitForLoadState("networkidle");
  }

  // input elements and forms

  async inputSearch(text) {
    await this.getSearchBar();
    await this.locators.searchBar().click();
    await this.locators.searchBar().fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async inputVinNumber(text) {
    await this.getVinInput();
    await this.locators.inputVin().click();
    await this.locators.inputVin().fill(text);
  }

  // get page elements
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

module.exports = { SaharaLPO };