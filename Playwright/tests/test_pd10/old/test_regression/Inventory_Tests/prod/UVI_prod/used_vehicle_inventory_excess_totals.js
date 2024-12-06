// this POM is for /Payroll
const { expect } = require("@playwright/test");
class UsedVehicleInventory {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesUsedVehicle = page.locator(
      ':nth-match(:text("Used Vehicle"),1)',
    );
    this.getSalesUsedInventoryDetail = page.locator(
      'text="Used Inventory Detail"',
    );
    this.getUsedInventorySummaryTotals = page.locator('text="Totals"');
    this.getUsedInventoryExcess = page.locator(':nth-match(:text("Excess"),1)');
    this.getUVITotalINventory = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]",
    );
    this.getUVIExcessTotals = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]",
    );
    this.getUVIExcessTotals2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getStoreSelector = page.locator("header >> text=Multiple Stores");
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getSelectButton = page.locator("#storeSelector >> text=Select");
  }
  async goto() {
    await this.page.goto("https://speuat.lithiainc.com/main/store", {
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
  async NavigateToSalesUsedInventoryDetail() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(7000);
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesUsedInventoryDetail.first().click();
    await this.getUsedInventoryExcess.click();
    await this.page.waitForLoadState("networkidle");
  }
  //Methods ot verify if the total number of vehicles in used inventory summary is equal to the total vehicles displayed after clicking totals hyperlink
  async VerifyTotalVehicleTotal() {
    await this.page.waitForLoadState("networkidle");
    const c = await this.getUVITotalINventory.innerText();
    const array3 = c.replace(",", "");
    const bucket3 = parseInt(array3);
    const d = await this.getUVIExcessTotals.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUVIExcessTotals2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array4 = array2.replace(" items", "");
    if (bucket3 == array4) console.log("Totals in Excess Page match");
    else console.log("Totals in Excess page mismatch");
  }
  async SelectStoresForRegression() {
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector.click();
    await this.getAllselector.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { UsedVehicleInventory };
