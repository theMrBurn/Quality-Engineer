// this POM is for /Payroll
const { expect } = require("@playwright/test");

class CITSummary {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo = page.locator("id=logo");
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesSalesLog = page.locator(':nth-match(:text("Sales Log"),1)');
    this.getSalesCITSummary = page.locator(
      ':nth-match(:text("CIT Summary"),1)',
    );
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getMichigan = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
    );
    this.getMichiganDropdownn = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc",
    );
    this.getMichiganStore1 = page.locator(
      'label:has-text("Farmington Hills Audi")',
    );
    this.getMichiganStore2 = page.locator(
      'label:has-text("Farmington Hills CDJR")',
    );
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
      "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral HyundaiDoral KiaDoral VolkswagenFor >> div",
    );
    this.getTampaFord = page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota = page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia = page.locator(
      "text=CALIFORNIA[+]Calabasas AudiCarson NissanClovis NissanCosta Mesa CJDRDowntown LA  >> div",
    );
    this.getSummation = page.locator(
      '//*[@id="tabstrip-1"]/div/div/div/table/tbody/tr/td[2]',
    );
    this.getStockAsc = page.locator(
      "//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[18]/a[2]",
    );
    this.getOffice = page.locator(':nth-match(:text("Office"),1)');
    this.getOfficeSchedules = page.locator(':nth-match(:text("Schedule"),1)');
    this.getOfficeSchedulesSummary = page.locator('text="Schedules Summary"');
    this.getVehicleReceivables = page.locator(
      '//a[@title="VEHICLE RECEIVABLES"]',
    );
    this.getDays = page.locator('//*[@id="MainTHead"]/tr[1]/th[7]/a[1]');
  }
  async SelectStoresForRegression() {
    await this.page.waitForLoadState("networkidle");
    await this.getStoreSelector.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.page.waitForTimeout(2000);
    await this.getCanada.nth(2).click();
    await this.getThornhillHonda.click();
    await this.getMarkhamBMW.click();
    await this.getCalifornia.nth(2).click();
    await this.getDTLAToyota.click();
    await this.getFlorida.nth(2).click();
    await this.getTampaFord.click();
    await this.getMichigan.nth(2).click();
    await this.getMichiganStore2.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToSalesCITSummary() {
    await this.page.waitForTimeout(5000);
    await this.getSalesTab.click();
    await this.getSalesSalesLog.click();
    await this.getSalesCITSummary.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeSchedulesSummary() {
    await this.page.waitForTimeout(5000);
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSummary.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
    await this.page.goto("https://spedev.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
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

  async ValidateVRDayCountinCITSummary() {
    await this.page
      .locator(
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[1]/a[1]",
      )
      .click();
    var arr = [];
    arr.length = 7;
    var arr1 = [];
    arr1.length = 7;
    var arr2 = [];
    arr2.length = 7;
    var arr3 = [];
    arr3.length = 7;
    var arr4 = [];
    arr4.length = 7;
    for (var i = 2; i < 9; i++) {
      var VRCount5BeforeXpath =
        '//*[@id="citTable"]/div[3]/table[1]/tbody[1]/tr[';
      var VRCount5AfterXpath = "]/td[4]";
      var VrCount5Xpath = VRCount5BeforeXpath + i + VRCount5AfterXpath;
      arr[i] = await this.page.locator(VrCount5Xpath).innerText();
      var VRCount10BeforeXpath =
        '//*[@id="citTable"]/div[3]/table[1]/tbody[1]/tr[';
      var VRCount10AfterXpath = "]/td[8]";
      var VrCount10Xpath = VRCount10BeforeXpath + i + VRCount10AfterXpath;
      arr1[i] = await this.page.locator(VrCount10Xpath).innerText();
      var VRCount15BeforeXpath =
        '//*[@id="citTable"]/div[3]/table[1]/tbody[1]/tr[';
      var VRCount15AfterXpath = "]/td[12]";
      var VrCount15Xpath = VRCount15BeforeXpath + i + VRCount15AfterXpath;
      arr2[i] = await this.page.locator(VrCount15Xpath).innerText();
      var VRCount30BeforeXpath =
        '//*[@id="citTable"]/div[3]/table[1]/tbody[1]/tr[';
      var VRCount30AfterXpath = "]/td[16]";
      var VrCount30Xpath = VRCount30BeforeXpath + i + VRCount30AfterXpath;
      var num = await this.page.locator(VrCount30Xpath).innerText();
      var ct = num.slice(1);
      arr3[i] = ct;
      var VRCount31BeforeXpath =
        '//*[@id="citTable"]/div[3]/table[1]/tbody[1]/tr[';
      var VRCount31AfterXpath = "]/td[20]";
      var VrCount31Xpath = VRCount31BeforeXpath + i + VRCount31AfterXpath;
      arr4[i] = await this.page.locator(VrCount31Xpath).innerText();
    }
    for (var i = 2; i < 9; i++) {
      var StoreBeforeXpath = '//*[@id="citTable"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      console.log(
        "CIT Summary - The VR Count 0-5 Days For Store " + a + " is  " + arr[i],
      );
      console.log(
        "CIT Summary - The VR Count 6-10 Days For Store " +
          a +
          " is  " +
          arr1[i],
      );
      console.log(
        "CIT SUmmary - The VR Count 11-15 Days For Store " +
          a +
          " is  " +
          arr2[i],
      );
      console.log(
        "CIT SUmmary - The VR Count 16-30 Days For Store " +
          a +
          " is  " +
          arr3[i],
      );
      console.log(
        "CIT Summary - The VR Count 31+ Days For Store " +
          a +
          " is  " +
          arr4[i],
      );
    }
    return;
  }

  async VRCount5FromScheduleSummary() {
    for (var i = 1; i < 5; i++) {
      var StoreBeforeXpath = '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      await this.page.locator(StoreXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getVehicleReceivables.nth(0).click();
      await this.page
        .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
        .click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.getDays.click();
      await this.page.waitForTimeout(7000);
      var b = await this.getTotalRows.count();
      var z = [];
      var ct = 0;
      for (var j = 1; j < b - 6; j++) {
        var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var DayAfterXpath = "]/td[6]";
        var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
        var c = await this.page.locator(DaysActualXpath).innerText();
        var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var ScheduleAfterXpath = "]/td[9]/div[1]";
        var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
        var d = await this.page.locator(ScheduleActualXpath).innerText();
        var e = d.toString().length;
        if (c <= 5 && e > 1) {
          ct++;
        }
      }
      z[i] = ct;
      console.log(
        " Schedules Summary - The VR Day count 0 - 5 for store " +
          a +
          " is " +
          z[i],
      );
      await this.page.goBack();
      await this.page.goBack();
    }
    for (var i = 6; ; ) {
      var StoreBeforeXpath = '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      await this.page.locator(StoreXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getVehicleReceivables.nth(0).click();
      await this.page
        .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
        .click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.getDays.click();
      await this.page.waitForTimeout(5000);
      var b = await this.getTotalRows.count();
      var y = [];
      var ct = 0;
      for (var j = 1; j < b - 6; j++) {
        var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var DayAfterXpath = "]/td[6]";
        var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
        var c = await this.page.locator(DaysActualXpath).innerText();
        var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var ScheduleAfterXpath = "]/td[9]/div[1]";
        var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
        var d = await this.page.locator(ScheduleActualXpath).innerText();
        var e = d.toString().length;
        if (c <= 5 && e > 1) {
          ct++;
        }
      }
      z[i] = ct;
      console.log(
        " Schedules Summary - The VR Day count 0 - 5 for store " +
          a +
          " is " +
          y[i],
      );
      await this.page.goBack();
      await this.page.goBack();
      break;
    }
    var ThornhillStoreXpath =
      '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[7]/td[1]/a[1]';
    var a = await this.page.locator(ThornhillStoreXpath).innerText();
    await this.page.locator(ThornhillStoreXpath).click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.nth(0).click();
    await this.page
      .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
      .click();
    await this.page.locator('li[role="option"]:has-text("500")').click();
    await this.getDays.click();
    await this.page.waitForTimeout(5000);
    var b = await this.getTotalRows.count();
    var x = [];
    var ct = 0;
    for (var j = 1; j < b - 6; j++) {
      var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
      var DayAfterXpath = "]/td[6]";
      var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
      var c = await this.page.locator(DaysActualXpath).innerText();
      var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
      var ScheduleAfterXpath = "]/td[12]/div[1]";
      var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
      var d = await this.page.locator(ScheduleActualXpath).innerText();
      var e = d.toString().length;
      if (c <= 5 && e > 1) {
        ct++;
      }
    }
    x[i] = ct;
    console.log(
      " Schedules Summary - The VR Day count 0 - 5 for store " +
        a +
        " is " +
        x[i],
    );
    await this.page.goBack();
    await this.page.goBack();
    return;
  }
  // VR Count for 6-10 days in Schedule Summary
  async VRCount10FromScheduleSummary() {
    for (var i = 1; i < 5; i++) {
      var StoreBeforeXpath = '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      await this.page.locator(StoreXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getVehicleReceivables.nth(0).click();
      await this.page
        .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
        .click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.getDays.click();
      await this.page.waitForTimeout(7000);
      var b = await this.getTotalRows.count();
      var za = [];
      var ct = 0;
      for (var j = 1; j < b - 6; j++) {
        var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var DayAfterXpath = "]/td[6]";
        var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
        var c = await this.page.locator(DaysActualXpath).innerText();
        var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var ScheduleAfterXpath = "]/td[9]/div[1]";
        var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
        var d = await this.page.locator(ScheduleActualXpath).innerText();
        var e = d.toString().length;
        if (c > 5 && c <= 10 && e > 1) {
          ct++;
        }
      }
      za[i] = ct;
      console.log(
        " Schedules Summary - The VR Day count 6 - 10 for store " +
          a +
          " is " +
          za[i],
      );
      await this.page.goBack();
      await this.page.goBack();
    }
    for (var i = 6; ; ) {
      var StoreBeforeXpath = '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      await this.page.locator(StoreXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getVehicleReceivables.nth(0).click();
      await this.page
        .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
        .click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.getDays.click();
      await this.page.waitForTimeout(5000);
      var b = await this.getTotalRows.count();
      var ya = [];
      var ct = 0;
      for (var j = 1; j < b - 6; j++) {
        var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var DayAfterXpath = "]/td[6]";
        var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
        var c = await this.page.locator(DaysActualXpath).innerText();
        var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var ScheduleAfterXpath = "]/td[9]/div[1]";
        var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
        var d = await this.page.locator(ScheduleActualXpath).innerText();
        var e = d.toString().length;
        if (c > 5 && c <= 10 && e > 1) {
          ct++;
        }
      }
      ya[i] = ct;
      console.log(
        " Schedules Summary - The VR Day count 6 - 10 for store " +
          a +
          " is " +
          ya[i],
      );
      await this.page.goBack();
      await this.page.goBack();
      break;
    }
    var ThornhillStoreXpath =
      '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[7]/td[1]/a[1]';
    var a = await this.page.locator(ThornhillStoreXpath).innerText();
    await this.page.locator(ThornhillStoreXpath).click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.nth(0).click();
    await this.page
      .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
      .click();
    await this.page.locator('li[role="option"]:has-text("500")').click();
    await this.getDays.click();
    await this.page.waitForTimeout(5000);
    var b = await this.getTotalRows.count();
    var xa = [];
    var ct = 0;
    for (var j = 1; j < b - 6; j++) {
      var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
      var DayAfterXpath = "]/td[6]";
      var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
      var c = await this.page.locator(DaysActualXpath).innerText();
      var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
      var ScheduleAfterXpath = "]/td[12]/div[1]";
      var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
      var d = await this.page.locator(ScheduleActualXpath).innerText();
      var e = d.toString().length;
      if (c > 5 && c <= 10 && e > 1) {
        ct++;
      }
    }
    xa[i] = ct;
    console.log(
      " Schedule Summary - The VR Day count 6 - 10 for store " +
        a +
        " is " +
        xa[i],
    );
    await this.page.goBack();
    await this.page.goBack();
    return;
  }
  // VR Count for 11-15 days in Schedule Summary
  async VRCount15FromScheduleSummary() {
    for (var i = 1; i < 5; i++) {
      var StoreBeforeXpath = '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      await this.page.locator(StoreXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getVehicleReceivables.nth(0).click();
      await this.page
        .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
        .click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.getDays.click();
      await this.page.waitForTimeout(7000);
      var b = await this.getTotalRows.count();
      var zb = [];
      var ct = 0;
      for (var j = 1; j < b - 6; j++) {
        var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var DayAfterXpath = "]/td[6]";
        var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
        var c = await this.page.locator(DaysActualXpath).innerText();
        var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var ScheduleAfterXpath = "]/td[9]/div[1]";
        var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
        var d = await this.page.locator(ScheduleActualXpath).innerText();
        var e = d.toString().length;
        if (c > 10 && c <= 15 && e > 1) {
          ct++;
        }
      }
      zb[i] = ct;
      console.log(
        " Schedules Summary - The VR Day count 11 - 15 for store " +
          a +
          " is " +
          zb[i],
      );
      await this.page.goBack();
      await this.page.goBack();
    }
    for (var i = 6; ; ) {
      var StoreBeforeXpath = '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      await this.page.locator(StoreXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getVehicleReceivables.nth(0).click();
      await this.page
        .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
        .click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.getDays.click();
      await this.page.waitForTimeout(5000);
      var b = await this.getTotalRows.count();
      var yb = [];
      var ct = 0;
      for (var j = 1; j < b - 6; j++) {
        var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var DayAfterXpath = "]/td[6]";
        var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
        var c = await this.page.locator(DaysActualXpath).innerText();
        var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var ScheduleAfterXpath = "]/td[9]/div[1]";
        var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
        var d = await this.page.locator(ScheduleActualXpath).innerText();
        var e = d.toString().length;
        if (c > 10 && c <= 15 && e > 1) {
          ct++;
        }
      }
      yb[i] = ct;
      console.log(
        " Schedules Summary - The VR Day count 11 - 15 for store " +
          a +
          " is " +
          yb[i],
      );
      await this.page.goBack();
      await this.page.goBack();
      break;
    }
    var ThornhillStoreXpath =
      '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[7]/td[1]/a[1]';
    var a = await this.page.locator(ThornhillStoreXpath).innerText();
    await this.page.locator(ThornhillStoreXpath).click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.nth(0).click();
    await this.page
      .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
      .click();
    await this.page.locator('li[role="option"]:has-text("500")').click();
    await this.getDays.click();
    await this.page.waitForTimeout(5000);
    var b = await this.getTotalRows.count();
    var xb = [];
    var ct = 0;
    for (var j = 1; j < b - 6; j++) {
      var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
      var DayAfterXpath = "]/td[6]";
      var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
      var c = await this.page.locator(DaysActualXpath).innerText();
      var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
      var ScheduleAfterXpath = "]/td[12]/div[1]";
      var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
      var d = await this.page.locator(ScheduleActualXpath).innerText();
      var e = d.toString().length;
      if (c > 10 && c <= 15 && e > 1) {
        ct++;
      }
    }
    xb[i] = ct;
    console.log(
      "Schedules Summary -  The VR Day count 11 - 15 for store " +
        a +
        " is " +
        xb[i],
    );
    await this.page.goBack();
    await this.page.goBack();
    return;
  }

  // VR Count for 16-30 days in Schedule Summary
  async VRCount30FromScheduleSummary() {
    for (var i = 1; i < 5; i++) {
      var StoreBeforeXpath = '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      await this.page.locator(StoreXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getVehicleReceivables.nth(0).click();
      await this.page
        .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
        .click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.getDays.click();
      await this.page.waitForTimeout(7000);
      var b = await this.getTotalRows.count();
      var zc = [];
      var ct = 0;
      for (var j = 1; j < b - 6; j++) {
        var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var DayAfterXpath = "]/td[6]";
        var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
        var c = await this.page.locator(DaysActualXpath).innerText();
        var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var ScheduleAfterXpath = "]/td[9]/div[1]";
        var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
        var d = await this.page.locator(ScheduleActualXpath).innerText();
        var e = d.toString().length;
        if (c > 15 && c <= 30 && e > 1) {
          ct++;
        }
      }
      zc[i] = ct;
      console.log(
        " Schedules Summary - The VR Day count 16 - 30 for store " +
          a +
          " is " +
          zc[i],
      );
      await this.page.goBack();
      await this.page.goBack();
    }
    for (var i = 6; ; ) {
      var StoreBeforeXpath = '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      await this.page.locator(StoreXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getVehicleReceivables.nth(0).click();
      await this.page
        .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
        .click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.getDays.click();
      await this.page.waitForTimeout(5000);
      var b = await this.getTotalRows.count();
      var yc = [];
      var ct = 0;
      for (var j = 1; j < b - 6; j++) {
        var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var DayAfterXpath = "]/td[6]";
        var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
        var c = await this.page.locator(DaysActualXpath).innerText();
        var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var ScheduleAfterXpath = "]/td[9]/div[1]";
        var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
        var d = await this.page.locator(ScheduleActualXpath).innerText();
        var e = d.toString().length;
        if (c > 15 && c <= 30 && e > 1) {
          ct++;
        }
      }
      yc[i] = ct;
      console.log(
        " Schedules Summary - The VR Day count 16 - 30 for store " +
          a +
          " is " +
          yc[i],
      );
      await this.page.goBack();
      await this.page.goBack();
      break;
    }
    var ThornhillStoreXpath =
      '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[7]/td[1]/a[1]';
    var a = await this.page.locator(ThornhillStoreXpath).innerText();
    await this.page.locator(ThornhillStoreXpath).click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.nth(0).click();
    await this.page
      .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
      .click();
    await this.page.locator('li[role="option"]:has-text("500")').click();
    await this.getDays.click();
    await this.page.waitForTimeout(5000);
    var b = await this.getTotalRows.count();
    var xc = [];
    var ct = 0;
    for (var j = 1; j < b - 6; j++) {
      var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
      var DayAfterXpath = "]/td[6]";
      var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
      var c = await this.page.locator(DaysActualXpath).innerText();
      var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
      var ScheduleAfterXpath = "]/td[12]/div[1]";
      var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
      var d = await this.page.locator(ScheduleActualXpath).innerText();
      var e = d.toString().length;
      if (c > 15 && c <= 30 && e > 1) {
        ct++;
      }
    }
    xc[i] = ct;
    console.log(
      "Schedules Summary -  The VR Day count 16 - 30 for store " +
        a +
        " is " +
        xc[i],
    );
    await this.page.goBack();
    await this.page.goBack();
    return;
  }

  // VR Count for 31+ days in Schedule Summary
  async VRCount31FromScheduleSummary() {
    for (var i = 1; i < 5; i++) {
      var StoreBeforeXpath = '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      await this.page.locator(StoreXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getVehicleReceivables.nth(0).click();
      await this.page
        .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
        .click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.getDays.click();
      await this.page.waitForTimeout(7000);
      var b = await this.getTotalRows.count();
      var zd = [];
      var ct = 0;
      for (var j = 1; j < b - 6; j++) {
        var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var DayAfterXpath = "]/td[6]";
        var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
        var c = await this.page.locator(DaysActualXpath).innerText();
        var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var ScheduleAfterXpath = "]/td[9]/div[1]";
        var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
        var d = await this.page.locator(ScheduleActualXpath).innerText();
        var e = d.toString().length;
        if (c > 30 && e > 1) {
          ct++;
        }
      }
      zd[i] = ct;
      console.log(
        " Schedules Summary - The VR Day count 31+ for store " +
          a +
          " is " +
          zd[i],
      );
      await this.page.goBack();
      await this.page.goBack();
    }
    for (var i = 6; ; ) {
      var StoreBeforeXpath = '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      await this.page.locator(StoreXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getVehicleReceivables.nth(0).click();
      await this.page
        .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
        .click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.getDays.click();
      await this.page.waitForTimeout(5000);
      var b = await this.getTotalRows.count();
      var yd = [];
      var ct = 0;
      for (var j = 1; j < b - 6; j++) {
        var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var DayAfterXpath = "]/td[6]";
        var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
        var c = await this.page.locator(DaysActualXpath).innerText();
        var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
        var ScheduleAfterXpath = "]/td[9]/div[1]";
        var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
        var d = await this.page.locator(ScheduleActualXpath).innerText();
        var e = d.toString().length;
        if (c > 30 && e > 1) {
          ct++;
        }
      }
      yd[i] = ct;
      console.log(
        " Schedules Summary - The VR Day count 31+ for store " +
          a +
          " is " +
          yd[i],
      );
      await this.page.goBack();
      await this.page.goBack();
      break;
    }
    var ThornhillStoreXpath =
      '//*[@id="MainGrid"]/div[3]/table[1]/tbody[1]/tr[7]/td[1]/a[1]';
    var a = await this.page.locator(ThornhillStoreXpath).innerText();
    await this.page.locator(ThornhillStoreXpath).click();
    await this.page.waitForLoadState("networkidle");
    await this.getVehicleReceivables.nth(0).click();
    await this.page
      .locator('//*[@id="colorWrapper"]/div/div/span/span/span/span/span[1]')
      .click();
    await this.page.locator('li[role="option"]:has-text("500")').click();
    await this.getDays.click();
    await this.page.waitForTimeout(5000);
    var b = await this.getTotalRows.count();
    var xd = [];
    var ct = 0;
    for (var j = 1; j < b - 6; j++) {
      var DayBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
      var DayAfterXpath = "]/td[6]";
      var DaysActualXpath = DayBeforeXpath + j + DayAfterXpath;
      var c = await this.page.locator(DaysActualXpath).innerText();
      var ScheduleBeforeXpath = '//*[@id="MainGrid"]/tbody[1]/tr[';
      var ScheduleAfterXpath = "]/td[12]/div[1]";
      var ScheduleActualXpath = ScheduleBeforeXpath + j + ScheduleAfterXpath;
      var d = await this.page.locator(ScheduleActualXpath).innerText();
      var e = d.toString().length;
      if (c > 15 && c <= 30 && e > 1) {
        ct++;
      }
    }
    xd[i] = ct;
    console.log(
      "Schedules Summary -  The VR Day count 31+ for store " +
        a +
        " is " +
        xd[i],
    );
    await this.page.goBack();
    await this.page.goBack();
    return;
  }
}
module.exports = { CITSummary };
