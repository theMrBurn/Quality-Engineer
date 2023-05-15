// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class SaharaNewLien {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.pageHeader = page.getByRole("heading", {
      name: "New Lien",
      exact: true,
    });

    this.secondaryHeader = page.getByRole("heading", { name: "Vehicle Sale" });

    this.thirdHeader = page.getByRole("heading", { name: " Trade In 1 " });

    // unique page text

    // search, buttons, dropdowns and input boxes
    this.inputDealID = page.getByLabel("Deal ID*");
    this.inputCustomerName = page.getByLabel("Customer Name*");
    this.inputSalesStockNumber = page.getByLabel("Sales Stock #*");
    this.inputSalesVIN = page.getByLabel("Sales VIN #");
    this.inputTradeStockNumber = page.getByLabel("Trade Stock #*");
    this.inputTradeVIN = page.getByLabel("Trade VIN #*");
    this.inputAccountNumberVIN = page.getByLabel("VIN/Account Number*");
    this.inputAdjustedPayoffAmount = page.getByLabel("Adjusted Payoff Amount*");
    this.inputMake = page.getByLabel("Make*");
    this.inputModel = page.getByLabel("Model*");
    this.inputYear = page.getByLabel("Year*");

    this.storeNumberDropdown = page
      .getByRole("button", { name: "​", exact: true })
      .first();

    this.dropdownLPOAccountNum = page
      .locator("span")
      .filter({ hasText: "LPO Account #*LPO Account #*" })
      .getByRole("button", { name: "​" });

    this.leinholdersDropdown = page.getByRole("button", { name: "Open" });

    this.saveButton = page.getByRole("button", { name: "SAVE" });
    this.backButton = page.getByRole("button", { name: "< BACK" });

    // forms and grids

    // unique elements
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/lienpayoff/new-lien-payoff");
  }

  // get page elements

  async getPageHeader() {
    await expect(this.pageHeader, "Page header not found").toBeVisible();
  }

  async getSecondaryHeader() {
    await expect(
      this.secondaryHeader,
      "Trade In 1 header not found"
    ).toBeVisible();
  }

  async getThirdHeader() {
    await expect(this.thirdHeader, "Trade in 2 header not found").toBeVisible();
  }

  async getInputDealID() {
    await expect(this.inputDealID, "Deal ID input box not found").toBeVisible();
  }

  async getInputCustomerName() {
    await expect(
      this.inputCustomerName,
      "Customer Name input box not found"
    ).toBeVisible();
  }

  async getInputSalesStockNumber() {
    await expect(
      this.inputSalesStockNumber,
      "Sales Stock Number input box not found"
    ).toBeVisible();
  }

  async getInputSalesVIN() {
    await expect(
      this.inputSalesVIN,
      "Sales VIN input box not found"
    ).toBeVisible();
  }

  async getInputTradeStockNumber() {
    await expect(
      this.inputTradeStockNumber,
      "Trade Stock Number input box not found"
    ).toBeVisible();
  }

  async getInputTradeVIN() {
    await expect(
      this.inputTradeVIN,
      "Trade VIN Input box not found"
    ).toBeVisible();
  }

  async getInputAccountNumberVIN() {
    await expect(
      this.inputAccountNumberVIN,
      "Account Number VIN input box not found"
    ).toBeVisible();
  }

  async getInputAdjustedPayoffAmount() {
    await expect(
      this.inputAdjustedPayoffAmount,
      "Adjusted Payoff Amount input box not found"
    ).toBeVisible();
  }

  async getInputMake() {
    await expect(this.inputMake, "Make input box not found").toBeVisible();
  }

  async getInputModel() {
    await expect(this.inputModel, "Model input not found").toBeVisible();
  }

  async getInputYear() {
    await expect(this.inputYear, "Year input box not found").toBeVisible();
  }

  async getDropdownLPOAccountNum() {
    await expect(
      this.dropdownLPOAccountNum,
      "Account Number Dropdown not found"
    ).toBeVisible();
  }

  async getStoreNumberDropdown() {
    await expect(
      this.storeNumberDropdown,
      "Store Number Dropdown not found"
    ).toBeVisible();
  }

  async getGroupDropdown() {
    await expect(this.groupDropdown, "Group dropdown not found").toBeVisible();
  }

  async getBackButton() {
    await expect(this.backButton, "Back Button not found").toBeVisible();
  }

  async getLienholdersDropdown() {
    await expect(
      this.leinholdersDropdown,
      "Lienholders Dropdown Not Found"
    ).toBeVisible();
  }

  async getSaveButton() {
    await expect(this.saveButton, "Save Button Not found").toBeVisible();
  }

  // interact with elements

  async clickGroupsDropdown() {
    await this.getGroupDropdown();
    await this.groupDropdown.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickApprovalButton() {
    await this.getApprovalButton();
    await this.approvalButton.click();
    const approveCheckbox = await this.page.getByRole("checkbox").first();
    if (await approveCheckbox.isVisible()) {
      await approveCheckbox.check();
      // await this.page.getByText("Lien Payoff Approved").toBeVisible();
      await this.page.getByRole("checkbox").nth(1).check();
      await this.page.getByRole("button", { name: "Approve" }).click();
      await this.page.waitForLoadState("networkidle");
    } else {
      await this.page.waitForLoadState("networkidle");
    }
  }
  catch(error) {
    console.error("Error: Unable to complete Approval", error);
  }

  async clickSaveButton() {
    await this.getSaveButton();
    await this.saveButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  // input elements and forms

  async dealIDtext(text) {
    await this.getInputDealID();
    await this.inputDealID.click();
    await this.inputDealID.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async customerNameInput(text) {
    await this.getInputCustomerName();
    await this.inputCustomerName.click();
    await this.inputCustomerName.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async tradeInStockNumberInput(text) {
    await this.getInputCustomerName();
    await this.inputTradeStockNumber.click();
    await this.inputTradeStockNumber.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async tradeVINinput(text) {
    await this.getInputTradeVIN();
    await this.inputTradeVIN.click();
    await this.inputTradeVIN.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async accountNumVINinput(text) {
    await this.getInputAccountNumberVIN();
    await this.inputAccountNumberVIN.click();
    await this.inputAccountNumberVIN.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async adjustedPayoffAmountInput(text) {
    await this.getInputAdjustedPayoffAmount();
    await this.inputAdjustedPayoffAmount.click();
    await this.inputAdjustedPayoffAmount.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async inputVinNumber(text) {
    await this.getVinInput();
    await this.inputVin.click();
    await this.inputVin.fill(text);
  }

  async makeInput(text) {
    await this.getInputMake();
    await this.inputMake.click();
    await this.inputMake.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async modelInput(text) {
    await this.getInputModel();
    await this.inputModel.click();
    await this.inputModel.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async yearInput(text) {
    await this.getInputYear();
    await this.inputYear.click();
    await this.inputYear.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  // dropdowns

  async clickStoreNumberDropdown() {
    await this.getStoreNumberDropdown();
    await this.storeNumberDropdown.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickDropdownLPOAccountNum() {
    await this.getDropdownLPOAccountNum();
    await this.dropdownLPOAccountNum.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickLienholdersDropdown() {
    await this.getLienholdersDropdown();
    await this.leinholdersDropdown.click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { SaharaNewLien };
