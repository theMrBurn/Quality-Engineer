// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class SaharaLPO {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.pageHeader = page.getByRole("heading", {
      name: "Liens Approval Center",
      exact: true,
    });

    // unique page text
    this.fundingAlert = page.getByText("Update Lien - Lien payoff not found");

    // search, buttons, dropdowns and input boxes
    this.searchBar = page.getByPlaceholder("SEARCH");
    this.groupDropdown = page.getByRole("button", { name: "ALL GROUPS" });
    this.editApprovalButton = page.getByRole("button", { name: "EDIT" });
    this.approvalButton = page.getByRole("button", { name: "Approve" });
    this.lienholderDropdown = page.getByRole("button", { name: "Open" });
    this.saveButton = page.getByRole("button", { name: "SAVE" });
    this.unapproveButton = page.getByRole("button", { name: "Unapprove" });

    // forms and grids
    this.approvedColumn = page.getByText("APPROVED");
    this.idColumn = page.getByText("ID");
    this.storeNumberColumn = page.getByText("STORE #");
    this.groupColumn = page.getByText("GROUP", { exact: true });
    this.customerColumn = page.getByText("CUSTOMER");
    this.salesStockNumberColumn = page.getByText("SALES STOCK #");
    this.tradeVINColumn = page.getByText("TRADE VIN");
    this.firstRowLPO = page.locator(
      '//*[@id="root"]/div/div[2]/div/div/div/div/div/div[3]/div/div[1]/table/tbody/tr[1]/td[3]'
    );

    // unique elements
    this.resetFiltersButton = page.getByRole("button", {
      name: "Reset Filters",
    });

    this.logoLPO = page.locator(
      '//*[@id="root"]/div/div[1]/header/div/div[1]/div/a'
    );

    this.gridToolbarLPO = page.locator(
      "#root > div > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > div > div > div > div > div > div.k-toolbar.k-grid-toolbar > div"
    );

    this.closeEditApproveModal = page
      .locator('[data-test="data-details"] button')
      .first();

    this.inputVin = page.getByLabel("VIN / Acct #");
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/lienpayoff");
  }

  // get page elements

  async getPageHeader() {
    await expect(this.pageHeader, "Page header not found").toBeVisible();
  }

  async getLPOLogo() {
    await expect(this.logoLPO, "LPP Portal not found").toBeVisible();
  }

  async getSearchBar() {
    await expect(this.searchBar, "Search Bar not found").toBeVisible();
  }

  async getLPOGridToolbar() {
    await expect(this.gridToolbarLPO, "Tool Bar not found").toBeVisible();
  }

  async getGroupDropdown() {
    await expect(this.groupDropdown, "Group dropdown not Found").toBeVisible();
  }

  async getApprovedColumn() {
    await expect(
      this.approvedColumn,
      "Approved Column not found"
    ).toBeVisible();
  }

  async getIDColumn() {
    await expect(this.idColumn, "ID Column not found").toBeVisible();
  }

  async getStoreNumberColumn() {
    await expect(
      this.storeNumberColumn,
      "Store Number Column not found"
    ).toBeVisible();
  }

  async getCustomerColumn() {
    await expect(
      this.customerColumn,
      "Customer Column not found"
    ).toBeVisible();
  }

  async getSalesStockNumColumn() {
    await expect(
      this.salesStockNumberColumn,
      "Sales Stock Number Column not found"
    ).toBeVisible();
  }

  async getTradeVINColumn() {
    await expect(
      this.tradeVINColumn,
      "Trade VIN Column not found"
    ).toBeVisible();
  }

  async getResetFiltersButton() {
    await expect(
      this.resetFiltersButton,
      "Reset Filters Button not visible"
    ).toBeVisible();
  }

  async getLPOLogoURL() {
    const saharaLPOLogoURL = this.logoLPO;
    const href = await saharaLPOLogoURL.getAttribute("href");
    expect(href).toContain("lpp.lithia.com");
    ("lpp.lithia.com");
  }

  async getFirstRowLPO() {
    await expect(
      this.firstRowLPO,
      "First row result not found on Grid"
    ).toBeVisible();
  }

  async getEditApprovalButton() {
    await expect(
      this.editApprovalButton,
      "Edit Approvl Button not found when Modal expanded"
    ).toBeVisible();
  }

  async getCloseEditApproval() {
    await expect(
      this.closeEditApproveModal,
      "Edit Approval Close not found"
    ).toBeVisible();
  }

  async getApprovalButton() {
    await expect(
      this.approvalButton,
      "Approval Button not found"
    ).toBeVisible();
  }

  async getVinInput() {
    await expect(this.inputVin, "Input Vin not found").toBeVisible();
  }

  async getLienholderDropdown() {
    await expect(
      this.lienholderDropdown,
      "Lienholder Dropdown not found"
    ).toBeVisible();
  }

  async getSaveButton() {
    await expect(this.saveButton, "Save Button not found").toBeVisible();
  }

  async getUnapproveButton() {
    await expect(
      this.unapproveButton,
      "Unapprove Button not found"
    ).toBeVisible();
  }

  // interact with elements

  async clickGroupsDropdown() {
    await this.getGroupDropdown();
    await this.groupDropdown.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickResetFiltersButton() {
    await this.getResetFiltersButton();
    await this.resetFiltersButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickFirstRowResult() {
    await this.getFirstRowLPO();
    const firstRow = this.firstRowLPO;
    expect(await firstRow.click());
    await this.page.waitForLoadState("networkidle");
  }

  async clickEditButton() {
    await this.getEditApprovalButton();
    await this.editApprovalButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickApprovalButton() {
    try {
      await this.getApprovalButton();
      await this.approvalButton.click();
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
    await this.closeEditApproveModal.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickLienholdersDropdown() {
    await this.getLienholderDropdown();
    await this.lienholderDropdown.click();
  }

  async clickSaveButton() {
    await this.getSaveButton();
    await this.saveButton.click();

    const confirmSave = this.page.getByText("Lien Payoff Updated");
    await expect(confirmSave).toBeVisible();
    await this.page.waitForLoadState("networkidle");
  }

  async clickUnapproveButton() {
    await this.getUnapproveButton();
    await this.unapproveButton.click();
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
    await this.searchBar.click();
    await this.searchBar.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async inputVinNumber(text) {
    await this.getVinInput();
    await this.inputVin.click();
    await this.inputVin.fill(text);
  }
}
module.exports = { SaharaLPO };
