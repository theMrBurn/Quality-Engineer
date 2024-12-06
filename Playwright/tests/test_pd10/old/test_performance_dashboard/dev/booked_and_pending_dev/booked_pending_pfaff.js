// this POM is for /Payroll
const { expect } = require("@playwright/test");

class BookedAndPending {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesBookedandPending = page.locator(
      ':nth-match(:text("Booked and Pending"),1)',
    );
    this.getSalesBookedandPendingDriveway = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/ul[1]/li[2]/span[2]",
    );
    this.getTotals = page.locator(
      "//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]",
    );
    this.getTotalBooked = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]",
    );
    this.getTotalPending = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[3]",
    );
    this.getTotal05Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]",
    );
    this.getTotal610Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[5]",
    );
    this.getTotal1115Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]",
    );
    this.getTotal16Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[7]",
    );
    this.getDetailTotals = page.locator('span[class="k-pager-info k-label"]');
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getSelectButton = page.locator("#storeSelector >> text=Select");
    this.getGoBUtton = page.locator('text="GO"');
    this.getTotalRows = page.locator("tr");
    this.getCanada = page.locator(
      "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div",
    );
    this.getThornhillHonda = page.locator('label:has-text("Thornhill Honda")');
    this.getMarkhamBMW = page.locator('label:has-text("Markham BMW Mini")');
    this.getSummation = page.locator(
      '//*[@id="tabstrip-1"]/div/div/div/table/tbody/tr/td[2]',
    );
    this.getPagedropdown = page.locator(
      "//*[@id='tabstrip-1']/div/div/span/span/span/span/span[1]",
    );
    this.getPAge500 = page.locator("//body/div[2]/div[1]/div[2]/ul[1]/li[3]");
    this.getTotalRows = page.locator("tr");
    this.getDealAsc = page.locator(
      "//body/div[1]/div[2]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[5]/a[2]",
    );
    this.getSalesLog = page.locator(':nth-match(:text("Sales Log"),1)');
    this.getRetailSalesAlog = page.locator(
      ':nth-match(:text("Retail Sales Log (ALOG)"),1)',
    );
  }
  async SelectStoresForRegression() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.page.waitForTimeout(2000);
    await this.getCanada.first().click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
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
  // Sales Booked and Pending  Report
  async NavigateToSalesBookedandPending() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getSalesTab.click();
    await this.getSalesBookedandPending.click();
    await this.page.waitForLoadState("networkidle");
    await this.getSalesBookedandPendingDriveway.click();
    await this.page.waitForLoadState("networkidle");
  }
  //Methods ot verify if the total number of vehicles in Booked and Pending report between summary and detail pages.
  async VerifyTotalVehicle() {
    const a = await this.getTotalBooked.innerText();
    const totalbooked = parseInt(a);
    const b = await this.getTotalPending.innerText();
    const totalpending = parseInt(b);
    const sum3 = totalbooked + totalpending;
    await this.getTotals.click();
    await this.page.waitForLoadState("networkidle");
    const c = await this.getDetailTotals.innerText();
    const array3 = c.slice(9, -5);
    const detailtotal = parseInt(array3);
    if (sum3 != detailtotal) {
      console.log(
        "Booked and Pending - Pfaff Stores - Total MisMatch between summary and detail page." +
          sum3 +
          " : " +
          detailtotal,
      );
    }
    await this.page.goBack();
    await this.getSalesBookedandPendingDriveway.click();
  }
  async VerifyTotalMatchBetweenBPandDataBuckets() {
    const a = await this.getTotal05Days.innerText();
    const bucket1 = parseInt(a);
    const b = await this.getTotal1115Days.innerText();
    const bucket2 = parseInt(b);
    const c = await this.getTotal610Days.innerText();
    const bucket3 = parseInt(c);
    const d = await this.getTotal16Days.innerText();
    const bucket4 = parseInt(d);
    const sum = bucket1 + bucket2 + bucket3 + bucket4;
    const e = await this.getTotalBooked.innerText();
    const totalbooked = parseInt(e);
    const f = await this.getTotalPending.innerText();
    const totalpending = parseInt(f);
    const sum2 = totalbooked + totalpending;
    if (sum != sum2) {
      console.log(
        "Booked and Pending - Pfaff Stores - Total MisMatch between data buckets and BP Columns " +
          sum +
          " : " +
          sum2,
      );
    }
  }
  // Sales Booked and Pending - Driveway Report
  async NavigateToSalesBookedandPendingDriveway() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getSalesTab.click();
    await this.getSalesBookedandPending.click();
    await this.page.waitForLoadState("networkidle");
    await this.getSalesBookedandPendingDriveway.click();
    await this.page.waitForLoadState("networkidle");
  }
  async CompareBPWithRetailSalesAlogMarkhamBMW() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.page.waitForTimeout(2000);
    await this.getCanada.nth(2).click();
    await this.page.locator('label:has-text("Markham BMW Mini")').click();
    await this.page.locator('label:has-text("Thornhill Acura")').click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getSalesTab.click();
    await this.getSalesBookedandPending.click();
    await this.page.waitForLoadState("networkidle");
    const BookedMarkhamBMWinBP = await this.page
      .locator(
        "//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[2]",
      )
      .innerText();
    const BookedAcurainBP = await this.page
      .locator(
        "//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[2]/td[2]",
      )
      .innerText();
    await this.getSalesTab.click();
    await this.getSalesLog.click();
    await this.getRetailSalesAlog.click();
    await this.page.waitForLoadState("networkidle");
    const BookedMarkhamBMWinAlog = await this.page
      .locator(
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[15]",
      )
      .innerText();
    const BookedAcurainAlog = await this.page
      .locator(
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[2]/td[15]",
      )
      .innerText();
    if (BookedMarkhamBMWinBP != BookedMarkhamBMWinAlog) {
      console.log(
        " For Markham BMW : The Booked Units in BP Report  is not equal to Booked units in Retail Sales Alog ." +
          BookedMarkhamBMWinBP +
          ":" +
          BookedMarkhamBMWinAlog,
      );
    }
    if (BookedAcurainBP != BookedAcurainAlog) {
      console.log(
        " For Thornhill Acura : The Booked Units in BP Report  is not equal to Booked units in Retail Sales Alog." +
          BookedAcurainBP +
          ":" +
          BookedAcurainAlog,
      );
    }
  }
}
module.exports = { BookedAndPending };
