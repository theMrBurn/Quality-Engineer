// this POM is for /Payroll
const { expect } = require("@playwright/test");

class Airstream {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getMultiStore = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getSelectGroup = page.locator(
      "text=12 Groups LITHIABAIERLDTLADAYPRESTIGECARBONEOTHERSUBURBANPFAFFAIRSTREAM",
    );
    this.getPfaffCheck = page.locator("text=PFAFF");
    this.getAirstreamGroup = page.locator("#grpAirstream");
    this.getGoBUtton = page.locator('text="GO"');
    this.getStoreSelector = page.locator("#storeSelector >> text=Select");
    this.getCalifornia = page.locator("text=CALIFORNIA");
    this.getIdaho = page.locator(
      "text=IDAHO[+]Boise Airstream AdventuresBoise Ford LincolnIdaho Falls FordPocatello CJ >> div",
    );
    this.getOregon = page.locator(
      "text=OREGON[+]Beaverton Buick GMCBeaverton MercedesBend CDJRBend ChevroletBend HondaB >> div",
    );
    this.getWashington = page.locator(
      "text=WASHINGTON[+]Bellevue SubaruBellevue ToyotaSeattle Airstream AdventuresSeattle B >> div",
    );
    this.getpacing1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/section[1]/div[2]/article[1]/table[1]/tbody[1]/tr[5]/td[3]",
    );
    this.getpacing2 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/section[1]/div[2]/article[1]/table[1]/tbody[1]/tr[8]/td[3]",
    );
    this.getpacing3 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/section[1]/div[2]/article[1]/table[1]/tbody[1]/tr[10]/td[3]",
    );
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesNewVehicle = page.locator(
      ':nth-match(:text("New Vehicle"),1)',
    );
    this.getSalesNewInventoryDetail = page.locator(
      ':nth-match(:text("New Inventory Detail"),1)',
    );
    this.getFairfieldNVI = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/a[1]",
    );
    this.getFairfieldUVI = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/a[1]",
    );
    this.getOnGroundMake = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[6]/td[6]",
    );
    this.getOnGroundModel = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[4]/td[7]",
    );
    this.getOnGroundNVI = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[11]/td[16]",
    );
    this.getONGroundNVI2 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[12]/td[16]",
    );
    this.getONGroundUVI2 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[3]/td[11]",
    );
    this.getONGroundUVI3 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[4]/td[11]",
    );
    this.getSalesUsedVehicle = page.locator(
      ':nth-match(:text("Used Vehicle"),1)',
    );
    this.getSalesUsedInventoryDetail = page.locator(
      ':nth-match(:text("Used Inventory Detail"),1)',
    );
    this.getSalesLog = page.locator(':nth-match(:text("Sales Log"),1)');
    this.getWholesaleAlog = page.locator(
      ':nth-match(:text("Wholesale Log (ALOG)"),1)',
    );
    this.getRetailSalesAlog = page.locator(
      ':nth-match(:text("Retail Sales Log (ALOG)"),1)',
    );
  }
  async goto() {
    await this.page.goto("https://spedev.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
  }
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
  async AirstreamStoreSelector() {
    await this.getMultiStore.nth(2).click();
    await this.getSelectGroup.click();
    await this.getPfaffCheck.click();
    await this.getPfaffCheck.click();
    await this.getAirstreamGroup.click();
    await this.page
      .locator(
        "text=12 Groups LITHIABAIERLDTLADAYPRESTIGECARBONEOTHERSUBURBANPFAFFAIRSTREAM",
      )
      .click();
    await this.getStoreSelector.click();
    await this.page
      .locator(
        'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store AIRSTREAM LITHIABAIERL")',
      )
      .nth(2)
      .click();
    await this.getCalifornia.click();
    await this.getIdaho.nth(2).click();
    await this.getOregon.nth(2).click();
    await this.getWashington.nth(2).click();
    await this.getStoreSelector.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getpacing1).toBeVisible();
    await expect(this.getpacing2).toBeVisible();
    await expect(this.getpacing3).toBeVisible();
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesNewInventoryDetail.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(9000);
    await this.getFairfieldNVI.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getOnGroundMake).toBeVisible();
    await expect(this.getOnGroundModel).toBeVisible();
    await expect(this.getOnGroundNVI).toBeVisible();
    await expect(this.getONGroundNVI2).toBeVisible();
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesUsedInventoryDetail.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(9000);
    await this.getFairfieldUVI.click();
    await this.page.waitForTimeout(10000);
    await expect(this.getONGroundUVI2).toBeTruthy();
  }
  async ValidateTheStoreNames() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(7000);
    await this.getMultiStore.nth(2).click();
    await this.getSelectGroup.click();
    await this.getPfaffCheck.click();
    await this.getPfaffCheck.click();
    await this.getAirstreamGroup.click();
    await this.page
      .locator(
        "text=12 Groups LITHIABAIERLDTLADAYPRESTIGECARBONEOTHERSUBURBANPFAFFAIRSTREAM",
      )
      .click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.getCalifornia.click();
    expect(
      this.page.locator('label:has-text("Bay Area Airstream Adventures")'),
    ).toBeVisible();
    expect(
      this.page.locator('label:has-text("South Bay Airstream Adventures")'),
    ).toBeVisible();
    await this.getIdaho.nth(2).click();
    await this.page.waitForTimeout(5000);
    expect(
      this.page.locator('li:has-text("Boise Airstream Adventures")').nth(1),
    ).toBeVisible();
    await this.getOregon.nth(2).click();
    expect(
      this.page.locator('label:has-text("Portland Airstream Adventures")'),
    ).toBeVisible();
    expect(
      this.page.locator('label:has-text("Ultimate Airstreams")'),
    ).toBeVisible();
    await this.getWashington.nth(2).click();
    expect(
      this.page.locator('label:has-text("Seattle Airstream Adventures")'),
    ).toBeVisible();
    expect(
      this.page.locator('label:has-text("Spokane Airstream Adventures")'),
    ).toBeVisible();
    await this.page.locator("#storeSelector >> text=Select").click();
  }
}
module.exports = { Airstream };
