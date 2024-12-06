// this POM is for /Payroll
const { expect } = require("@playwright/test");

class MainStore {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo = page.locator("id=logo");
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getOffice = page.locator(':nth-match(:text("Office"),1)');
    this.getOfficeSchedules = page.locator(':nth-match(:text("Schedule"),1)');
    this.getOfficeSchedulesSummary = page.locator('text="Schedules Summary"');
    this.getStore1 = page.locator('//a[@onclick="jumpToStoreSchedule(148)"]');
    this.getVehicleReceivables = page.locator(
      '//a[@title="VEHICLE RECEIVABLES"]',
    );
    this.getPDIReceivables = page.locator('//a[@title="PDI RECEIVABLES"]');
    this.getSCClaimReceivables = page.locator(
      '//a[@title="S/C CLAIM RECEIVABLES"]',
    );
    this.getLifetimeLOF = page.locator('//a[@title="LIFETIME LOF"]');
    this.getTireWheelClainReceivables = page.locator(
      '//a[@title="TIRE/WHEEL CLAIM RECEIVABLES"]',
    );
    this.getDealerBonuses = page.locator('//a[@title="DEALER BONUSES"]');
    this.getStore2 = page.locator('//a[@onclick="jumpToStoreSchedule(442)"]');
    this.getStore3 = page.locator('//a[@onclick="jumpToStoreSchedule(331)"]');
    this.getStore4 = page.locator('//a[@onclick="jumpToStoreSchedule(195)"]');
    this.getStore5 = page.locator('//a[@onclick="jumpToStoreSchedule(462)"]');
    this.getStore6 = page.locator('//a[@onclick="jumpToStoreSchedule(27)"]');
    this.getStore7 = page.locator('//a[@onclick="jumpToStoreSchedule(152)"]');
    this.getStore8 = page.locator('//a[@onclick="jumpToStoreSchedule(470)"]');
  }
  async goto() {
    await this.page.goto("https://spedev.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
  }
  // get elements of all locators
  async NavigateToOfficeSchedulesSummary() {
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSummary.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  // Login
  async login() {
    await this.getUsername.click();
    await this.page.fill('input[id="i0116"]', "t_PerfDash_01@lithia.com"); //username
    await this.page.locator("id=idSIButton9").click();
    await this.getPassword.click();
    await this.page.fill(
      'input[name="passwd"]',
      "GkCow**!#w#)4E#Sj3Rb8KS*TkGduz",
    ); //pwd
    await this.page.click("text=Sign In");
  }
  async twostepauthlogin() {
    await this.page.click("id=KmsiCheckboxField");
    await this.page.click("id=idSIButton9");
  }
  async ValidatePageforStore1() {
    await this.getStore1.click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getLifetimeLOF.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getPDIReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getTireWheelClainReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getSCClaimReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
  }
  async ValidatePageforStore2() {
    await this.getStore2.click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getDealerBonuses.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getLifetimeLOF.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getPDIReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getTireWheelClainReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getSCClaimReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
  }
  async ValidatePageforStore3() {
    await this.getStore3.click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getDealerBonuses.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getLifetimeLOF.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getPDIReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getTireWheelClainReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getSCClaimReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
  }
  async ValidatePageforStore4() {
    await this.getStore4.click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getDealerBonuses.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getLifetimeLOF.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getPDIReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getTireWheelClainReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getSCClaimReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
  }
  async ValidatePageforStore5() {
    await this.getStore5.click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getDealerBonuses.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getLifetimeLOF.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getPDIReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getTireWheelClainReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getSCClaimReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
  }
  async ValidatePageforStore6() {
    await this.getStore6.click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getDealerBonuses.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getLifetimeLOF.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getPDIReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getTireWheelClainReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getSCClaimReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
  }
  async ValidatePageforStore7() {
    await this.getStore7.click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getDealerBonuses.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getLifetimeLOF.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getPDIReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getTireWheelClainReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getSCClaimReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
  }
  async ValidatePageforStore8() {
    await this.getStore8.click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getDealerBonuses.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getLifetimeLOF.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getPDIReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getTireWheelClainReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
    await this.getSCClaimReceivables.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goBack();
  }
}
module.exports = { MainStore };
