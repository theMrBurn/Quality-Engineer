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
    this.getTotals = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]",
    );
    this.getTotalBooked = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]",
    );
    this.getTotalPending = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[3]",
    );
    this.getTotal05Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]",
    );
    this.getTotal610Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[5]",
    );
    this.getTotal1115Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]",
    );
    this.getTotal16Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[7]",
    );
    this.getDetailTotals = page.locator('span[class="k-pager-info k-label"]');
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getMichiganDropdownn = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc",
    );
    this.getMichiganStore1 = page.locator(
      'label:has-text("Farmington Hills Audi")',
    );
    this.getMichiganStore2 = page.locator(
      'label:has-text("Farmington Hills CDJR")',
    );
    this.getSelectButton = page.locator("#storeSelector >> text=Select");
    this.getGoBUtton = page.locator('text="GO"');
    this.getTotalRows = page.locator("tr");
    this.getAlaska = page.locator(
      "text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div",
    );
    this.getAnchorageCJD = page.locator('label:has-text("Anchorage CJD")');
    this.getCanada = page.locator(
      "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div",
    );
    this.getThornhillHonda = page.locator('label:has-text("Thornhill Honda")');
    this.getMarkhamBMW = page.locator('label:has-text("Markham BMW Mini")');
    this.getFlorida = page.locator(
      "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div",
    );
    this.getTampaFord = page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota = page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia = page.locator(
      "text=CALIFORNIA[+]Bay Area Airstream AdventuresCalabasas AudiCarson NissanClovis Niss >> div",
    );
    this.getMichigan1 = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
    );
    this.getTotalRows = page.locator("tr");
    this.getDealAsc = page.locator(
      "//body/div[1]/div[2]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[5]/a[2]",
    );
  }
  async SelectStoresForRegression() {
    await this.page.waitForLoadState("networkidle");
    await this.getStoreSelector.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.getCalifornia.nth(2).click();
    await this.getDTLAToyota.click();
    await this.getCanada.nth(2).click();
    await this.getThornhillHonda.click();
    //await this.getMarkhamBMW.click();
    await this.getFlorida.nth(2).click();
    await this.getTampaFord.click();
    await this.getMichigan1.nth(2).click();
    await this.getMichiganStore2.click();
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
  // Sales Log Report
  async NavigateToSalesBookedandPending() {
    await this.getSalesTab.click();
    await this.getSalesBookedandPending.click();
    await this.page.waitForLoadState("networkidle");
  }
  //Methods ot verify if the total number of vehicles in Driveway Sales LOg report between summary and detail pages.
  async VerifyTotalVehicle() {
    const a = await this.getTotalBooked.innerText();
    const totalbooked = parseInt(a);
    const b = await this.getTotalPending.innerText();
    const totalpending = parseInt(b);
    const sum = totalbooked + totalpending;
    await this.getTotals.click();
    await this.page.waitForLoadState("networkidle");
    const c = await this.getDetailTotals.innerText();
    const array3 = c.slice(9, -5);
    const detailtotal = parseInt(array3);
    if (sum != detailtotal) {
      console.log(
        "Booked and Pending - Total MisMatch between summary and detail page." +
          sum +
          " : " +
          detailtotal,
      );
    }
  }

  async VerifyTotalwithDataBuckets() {
    const a = await this.getTotal05Days.innerText();
    const bucket1 = parseInt(a);
    const b = await this.getTotal1115Days.innerText();
    const bucket2 = parseInt(b);
    const c = await this.getTotal610Days.innerText();
    const bucket3 = parseInt(c);
    const d = await this.getTotal16Days.innerText();
    const bucket4 = parseInt(d);
    const sum = bucket1 + bucket2 + bucket3 + bucket4;
    await this.getTotals.click();
    await this.page.waitForLoadState("networkidle");
    const e = await this.getDetailTotals.innerText();
    const array3 = e.slice(9, -5);
    const detailtotal = parseInt(array3);
    if (sum != detailtotal) {
      console.log(
        "Booked and Pending - Total MisMatch between data buckets and detail page. " +
          sum +
          " : " +
          detailtotal,
      );
    }
    await this.page.goBack();
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
        "Booked and Pending Total MisMatch between data buckets and BP Columns " +
          sum +
          " : " +
          sum2,
      );
    }
  }
  async ValidateDuplicateDeals() {
    const z = await this.getTotalRows.count();
    await this.page.waitForTimeout(5000);
    for (var i = 1; i < z - 2; i++) {
      var StoreBeforeXpath =
        '//*[@id="BPSummary"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreActualXpath = StoreBeforeXpath + i + StoreAfterXpath;
      this.getStoreName = this.page.locator(StoreActualXpath);
      var a = await this.getStoreName.innerText();
      await this.getStoreName.click();
      await this.page.waitForLoadState("networkidle");
      await this.getDealAsc.click();
      var b = await this.getTotalRows.count();
      for (var i = b; i < b; i++) {
        var DealBeforeXpath =
          '//*[@id="BPDetailTable"]/div[3]/table[1]/tbody[1]/tr[';
        var DealAfterXpath = "]/td[5]";
        var compareXpath1 = DealBeforeXpath + i + DealAfterXpath;
        var compareXpath2 = DealBeforeXpath + (i + 1) + DealAfterXpath;
        var b = await this.page.locator(compareXpath1).innerText();
        var c = await this.page.locator(compareXpath2).innerText();
        if (b == c) {
          console.log(
            "Booked and Pending tab - The store" +
              a +
              " has duplicate Deals: " +
              b,
          );
        }
        await this.page.goBack();
      }
      return;
    }
  }
  async ValidateDuplicateStore() {
    await this.page.waitForLoadState("networkidle");
    const a = await this.getTotalRows.count();
    for (var i = 1; i < 5; i++) {
      var beforeXpath = "//*[@id='BPSummary']/div[3]/table[1]/tbody[1]/tr[";
      var afterXpath = "]/td[1]/a[1]";
      var compareXpath1 = beforeXpath + i + afterXpath;
      var compareXpath2 = beforeXpath + (i + 1) + afterXpath;
      var b = await this.page.locator(compareXpath1).innerText();
      var c = await this.page.locator(compareXpath2).innerText();
      if (b == c) {
        console.log(
          "Booked and Pending Report - The store name " +
            (await this.page.locator(compareXpath2).innerText()) +
            " is a duplicate",
        );
      }
    }
    return;
  }
}
module.exports = { BookedAndPending };
