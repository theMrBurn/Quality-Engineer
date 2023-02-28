// this POM is for /Admin
const { expect } = require("@playwright/test");

class PayoutImpact {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.payoutImpactHeader = page.getByText("Payout Impact");

    // unique page text
    this.twelveMoAverageText = page.getByRole("columnheader", {
      name: "12 Month Average",
    });
    this.threeMoAverageText = page.locator(
      '//*[@id="root"]/div/div[3]/div/div[2]/div/div[8]/div/div/table/thead/tr/th[3]'
    );

    this.performanceObjectiveText = page.locator(
      '//*[@id="root"]/div/div[3]/div/div[2]/div/div[8]/div/div/table/thead/tr/th[4]'
    );

    this.weightText = page.locator(
      '//*[@id="root"]/div/div[3]/div/div[2]/div/div[8]/div/div/table/thead/tr/th[5]'
    );

    this.vehicleAllowanceText = page.getByRole("rowheader", {
      name: "Vehicle Allowance",
    });

    // buttons, dropdowns and input boxes

    // forms and grids

    // calendar elements
  }

  // Navigate to Impact Builder and pass PayPlan object
  async goto(text) {
    await this.page.goto(text), { waitUntil: "networkidle" };
  }

  // get page elements

  async getPayoutImpactHeader() {
    await expect(
      this.payoutImpactHeader,
      "Payout Impact component header not found"
    ).toBeVisible();
  }

  async getTwelveMoAverageText() {
    await expect(
      this.twelveMoAverageText,
      "12 Month Average Text not found"
    ).toBeVisible();
  }

  async getThreeMoAverageText() {
    await expect(
      this.threeMoAverageText,
      "3 Month Average Text not found"
    ).toBeVisible();
  }

  async getPerformanceObjectiveText() {
    await expect(
      this.performanceObjectiveText,
      "Performance Objective Text not found"
    ).toBeVisible();
  }

  async getWeightText() {
    await expect(this.weightText, "Weight Text not found").toBeVisible();
  }

  async getVehicleAllowanceText() {
    await expect(
      this.vehicleAllowanceText,
      "Vehicle Allowance Text not found"
    ).toBeVisible();
  }
  // interact with elements

  // input elements and forms
}
module.exports = { PayoutImpact };
