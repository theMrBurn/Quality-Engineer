// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class EscaladeCVP {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.pageHeader = page.getByRole("heading", {
      name: "Centralized Vehicle Processing",
      exact: true,
    });

    this.salesTab = page.getByRole("tab", { name: "sales" });
    this.inventoryTab = page.getByRole("tab", { name: "inventory" });
    this.vdtTab = page.getByRole("tab", { name: "vdt" });

    //sales tab
    this.stockNumColumn = page.getByText("STOCK #");
    this.stockColumnFilter = page.locator(
      "#root > div > div.MuiBox-root.css-1bkvht1 > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > span:nth-child(2) > div > div > div > div > div > div > div.k-grid-header > div > table > thead > tr > th.k-filterable.k-header.k-sorted.active > span.k-cell-inner > div > span"
    );
    this.stockColumnInnerFilter = page.getByText("Filter", { exact: true });

    //inventory tab
    this.inventoryHubColunmn = page.getByText("HUB");
    this.inventoryInnerColumnFilter = page.locator(
      "#root > div > div.MuiBox-root.css-1bkvht1 > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > span:nth-child(2) > div > div > div > div > div > div > div.k-grid-header > div > table > thead > tr > th.k-filterable.k-header.active > span.k-cell-inner > div > span"
    );

    // Edit panel
    this.infoIcon = page.getByTestId("InfoIcon");
    this.editButton = page.getByRole("button", { name: "Edit" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.completeButton = page.getByRole("button", { name: "Complete" });
    this.closeEditPanelIcon = page.locator('[data-testid="CloseIcon"]');

    // Sales Data Upload
    this.salesDataUploadButton = page.getByRole("button", {
      name: "UPLOAD SALES DATA",
    });
    this.uploadFileModalButton = page.getByRole("button", {
      name: "Upload",
    });
    this.acceptButton = page.getByRole("button", { name: "Accept" });

    // search, buttons, dropdowns and input boxes

    // forms and grids

    // unique elements
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/cvp");
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements

  async getPageHeader() {
    await expect(this.pageHeader, "Page Header not found").toBeVisible();
  }

  async getSalesTab() {
    await expect(this.salesTab, "Sales tab not found").toBeVisible();
  }

  async getInventoryTab() {
    await expect(this.inventoryTab, "Invintory tab not found").toBeVisible();
  }

  async getVDTtab() {
    await expect(this.vdtTab, "VDT tab not found").toBeVisible();
  }

  async getStockNumColumn() {
    await expect(this.stockNumColumn, "Stock # column not found").toBeVisible();
  }

  async getStockNumFilter() {
    await expect(
      this.stockColumnFilter,
      "Stock # filter not found"
    ).toBeVisible();
  }

  async getInventoryHubColumn() {
    await expect(
      this.inventoryHubColunmn,
      "Inventory Hub column not found"
    ).toBeVisible();
  }

  async getInfoIcon() {
    await expect(this.infoIcon, "Info Icon not found").toBeVisible();
  }

  async getEditButton() {
    await expect(this.editButton, "Edit button not found").toBeVisible();
  }

  async getCancelButton() {
    await expect(this.cancelButton, "Cancel button not found").toBeVisible();
  }

  async getCompleteButton() {
    await expect(
      this.completeButton,
      "Complete button not found"
    ).toBeVisible();
  }

  async getClosePanelIcon() {
    await expect(
      this.closeEditPanelIcon,
      "close [ X ] not found"
    ).toBeVisible();
  }

  async getSalesDataUploadButon() {
    await expect(
      this.salesDataUploadButton,
      "Sales Data Upload button not found"
    ).toBeVisible();
  }

  async getUploadFileModal() {
    await expect(
      this.uploadFileModal,
      "Upload File modal not found"
    ).toBeVisible();
  }

  async getAcceptButton() {
    await expect(this.acceptButton, "Accept button not found").toBeVisible();
  }

  // interact with elements

  async clickResetFiltersButton() {
    await this.getResetFiltersButton();
    await this.resetFiltersButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickSalesTab() {
    await this.getSalesTab();
    await this.salesTab.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickInvintoryTab() {
    await this.getInventoryTab();
    await this.inventoryTab.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickVDTTab() {
    await this.getVDTtab();
    await this.vdtTab.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickStockNumColumn() {
    await this.getStockNumColumn();
    await this.stockNumColumn.click();
    await this.page.waitForLoadState("load");
  }

  async clickStockNumFilter() {
    await this.getStockNumFilter();
    await this.stockColumnFilter.click();
    await this.page.waitForLoadState("load");
    await this.stockColumnInnerFilter.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickEditButton() {
    await this.getEditButton();
    await this.editButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickCancelButton() {
    await this.getCancelButton();
    await this.cancelButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickClosePanel() {
    await this.getClosePanelIcon();
    await this.closeEditPanelIcon.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickInventoryHubFilter() {
    await this.getInventoryHubColumn();
    await this.inventoryHubColunmn.click();
    await this.page.waitForLoadState("load");
    await this.inventoryInnerColumnFilter.click();
    await this.page.waitForLoadState("networkidle");
  }

  // upload

  async uploadSalesData(salesDataFile) {
    await this.page.getByRole("button", { name: "UPLOAD SALES DATA" }).click();
    await this.page.getByRole("button", { name: "Upload" }).click();
    await this.page
      .locator(
        "body > div.MuiDialog-root.MuiModal-root.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.MuiDialogContent-dividers.css-1r09u4m > div > div > label"
      )
      .setInputFiles(salesDataFile);
    await this.page.getByRole("button", { name: "Accept" }).click();
    await expect(this.page.getByRole("alert")).toBeVisible();
  }

  async uploadBADSalesData(salesDataFile) {
    await this.page.getByRole("button", { name: "UPLOAD SALES DATA" }).click();
    await this.page.getByRole("button", { name: "Upload" }).click();
    await this.page
      .locator(
        "body > div.MuiDialog-root.MuiModal-root.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.MuiDialogContent-dividers.css-1r09u4m > div > div > label"
      )
      .setInputFiles(salesDataFile);
    await this.page.getByRole("button", { name: "Accept" }).click();
    await expect(
      this.page.getByText(
        "TIMECARD.csv: File did not match fields for ACV or Manheim files."
      )
    ).toBeVisible();
  }

  // search
}
module.exports = { EscaladeCVP };
