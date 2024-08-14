// this POM is for /Atlas E2E
class AtlasE2E {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Body Shop                                                                                                                                          Operations page elements
    this.locators = {
      //plan details Role Assignment locators

      //sales ops
      salesOpsAssignEmployee: () => this.page.locator("#mui-157"),
      salesOpsAssignButton: () =>
        this.page.getByRole("button", { name: "Assign" }),
      salesOpsNotifyButton: () =>
        this.page.getByRole("button", { name: "Notify" }),
      employeeScottBackstrom: () =>
        this.page.getByRole("option", { name: "Shawn Backstrom" }),

      //plan progress
      planProgressCard: () =>
        this.page
          .locator(
            ".MuiCardContent-root > div > div > div > div:nth-child(2) > .MuiPaper-root",
          )
          .first(),

      //buttons
      cancelButton: () => this.page.getByRole("button", { name: "Cancel" }),
      viewButton: () => this.page.getByRole("button", { name: "View" }),
      unassignButton: () => this.page.getByLabel("Clear"),
      aop2024byMonth: () =>
        this.page.getByRole("menuitem", { name: "AOP by Month" }),
      storePerformance: () =>
        this.page.getByRole("tab", { name: "Store Performance" }),

      //card flags
      seApprovalFlagOn: () =>
        this.page
          .locator(".MuiStack-root > div > .MuiBox-root > .MuiButtonBase-root")
          .first(),
      seApprovalFlagOff: () => this.page.getByLabel("selected-icon").first(),
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/atlas/plan/0");
    await this.page.waitForLoadState("load");
  }

  // get page elements
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("networkidle");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      //await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  /// interact with elements

  async clickElement(locatorName) {
    const locatorFunction = this.locators[locatorName];

    try {
      //await this.page.waitForLoadState("load");
      const element = await locatorFunction().first();
      await element.click();
      //await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        //await this.page.waitForLoadState("networkidle");
        const inputElement = await locatorFunction();
        await inputElement.fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  async seasonalityUpdate() {
    await this.page
      .getByRole("row", { name: "Store LM86410 - Add Income (" })
      .getByRole("button")
      .click();

    await this.page.locator("td:nth-child(8) > .k-textbox").fill("$123");
    await this.page.locator("td:nth-child(9) > .k-textbox").fill("$125");
    await this.page.locator("td:nth-child(10) > .k-textbox").fill("$155");

    await this.page
      .getByRole("row", { name: "Store LM86410 - Add Income (" })
      .getByRole("button")
      .first()
      .click();
  }

  async submitForReviewCancel() {
    try {
      await this.page
        .getByRole("button", { name: "Submit for Review" })
        .click();

      await this.page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error in submitForReviewCancel:", error.message);
      throw error;
    }
  }

  async submitForReviewConfirm() {
    try {
      await this.page
        .getByRole("button", { name: "Submit for Review" })
        .click();

      await this.page
        .getByRole("button", { name: "Submit for Review" })
        .click();
    } catch (error) {
      console.error("Error in submitForReviewConfirm:", error.message);
      throw error;
    }
  }

  async submitForApprovalCancel() {
    try {
      await this.page.getByRole("button", { name: "Approve AOP Plan" }).click();
      await this.page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error in submitForApprovalCancel:", error.message);
      throw error;
    }
  }

  async submitForApproval() {
    try {
      await this.page.getByRole("button", { name: "Approve AOP Plan" }).click();

      await this.page.getByRole("button", { name: "Continue" }).click();
    } catch (error) {
      console.error("Error in submitForApproval:", error.message);
      throw error;
    }
  }

  async unlockAOPplan() {
    try {
      await this.page.getByRole("button", { name: "Unlock AOP Plan" }).click();

      await this.page.getByRole("button", { name: "Continue" }).click();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async assignBackstrom(atlase2e) {
    try {
      // Assign Shawn Backstrom
      await atlase2e.clickElement("salesOpsAssignEmployee");
      await this.page.getByLabel("Open").click();
      await this.page.getByRole("option", { name: "Shawn Backstrom" }).click();
      await atlase2e.clickElement("cancelButton");

      // Refresh the page
      await this.page.reload();
      //await this.page.waitForLoadState("load");

      await atlase2e.clickElement("salesOpsAssignEmployee");
      await this.page.getByLabel("Open").click();
      await this.page.getByRole("option", { name: "Shawn Backstrom" }).click();
      await atlase2e.clickElement("salesOpsAssignButton");
      await this.page.getByText("Employee has been assigned").click();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}
module.exports = { AtlasE2E };
