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
      salesOpsAssignEmployee: () =>
        this.page
          .getByRole("button", { name: "Assign employee to department" })
          .first(),
      salesOpsAssignButton: () =>
        this.page.getByRole("button", { name: "Assign" }),
      salesOpsNotifyButton: () =>
        this.page.getByRole("button", { name: "Notify" }),
      employeeScottBackstrom: () =>
        this.page.locator("option").withText("Shawn Backstrom"),

      //plan progress
      planProgressCard: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Not StartedNo data entry has begun$/ })
          .nth(1),

      //buttons
      cancelButton: () => this.page.getByRole("button", { name: "Cancel" }),
      viewButton: () => this.page.getByRole("button", { name: "View" }),
      unassignButton: () => this.page.getByRole("button", { name: "Unassign" }),
      aop2024byMonth: () =>
        this.page.locator('//*[@id="demo-popup-menu"]/div[3]/ul/li[1]/p'),
      storePerformance: () =>
        this.page.getByRole("button", { name: "Store Performance" }),
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/atlas/plan/0");
    await this.page.waitForLoadState("load");
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

  /// interact with elements

  async clickElement(locatorName) {
    const locatorFunction = this.locators[locatorName];

    try {
      await this.page.waitForLoadState("load");
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

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

  async unassignEmployee(text) {
    await this.page.reload();
    await this.page.waitForLoadState("load");
    await this.clickElement(text);
    await this.page
      .getByRole("heading", { name: "Are you sure you want to" })
      .click();
    await this.page.getByRole("button", { name: "Confirm" }).click();
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
      await this.page.waitForSelector(
        "#root > div > div.MuiContainer-root.MuiContainer-maxWidthLg.css-xn2pdd > div > div > div.MuiBox-root.css-o6igo7 > div > div:nth-child(2) > div > div.MuiBox-root.css-si3g8p > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-5.css-1m54h5u > div > button",
      );
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
}
module.exports = { AtlasE2E };
