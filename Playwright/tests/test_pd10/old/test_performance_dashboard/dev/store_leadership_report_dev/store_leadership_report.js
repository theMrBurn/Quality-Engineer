// this POM is for /Payroll
const { expect } = require("@playwright/test");

class StoreLeadershipReport {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getMainTab = page.locator(':nth-match(:text("Main"),1)');
    this.getMainStoreLeadershipReport = page.locator(
      ':nth-match(:text("Store Leadership Report"),1)',
    );
    this.getMainStoreRosters = page.locator(
      ':nth-match(:text("Store Rosters"),1)',
    );
    this.getReportName = page.locator('xpath=//*[@id="ReportName"]');
    this.getLocation = page.locator("xpath=//th[1]/a[2]");
    this.getStoreName = page.locator("xpath=//th[2]/a[2]");
    this.getState = page.locator('text="State"');
    this.getRegion = page.locator('text="Region"');
    this.getRegionalPresident = page.locator(
      ':nth-match(:text("Regional President"),1)',
    );
    this.getRegionalVP = page.locator(
      ':nth-match(:text("Regional Vice President"),1)',
    );
    this.getSeniorVP = page.locator(
      ':nth-match(:text("Senior Vice President"),1)',
    );
    this.getGVP = page.locator(':nth-match(:text("Group Vice President"),1)');
    this.getPGM = page.locator(
      ':nth-match(:text("Platform General Manager"),1)',
    );
    this.getGM = page.locator(':nth-match(:text("General Manager"),1)');
    this.getGSM = page.locator(':nth-match(:text("General Sales Manager"),1)');
    this.getPCFO = page.locator(':nth-match(:text("Platform CFO"),1)');
    this.getPD = page.locator(':nth-match(:text("Platform Director"),1)');
    this.getAC = page.locator(':nth-match(:text("Area Controller"),1)');
    this.getBM = page.locator(':nth-match(:text("Business Manager"),1)');
    this.getSM = page.locator(':nth-match(:text("Service Manager"),1)');
    this.getPartsManager = page.locator(':nth-match(:text("Parts Manager"),1)');
    this.getBodyShopManager = page.locator(
      ':nth-match(:text("Body Shop Manager"),1)',
    );
    this.getUVM = page.locator(':nth-match(:text("Used Vehicle Manager"),1)');
    this.getExportToExcel = page.locator('//*[@title="Export to Excel"]');
    this.getExportToPDF = page.locator('//*[@title="Export to PDF"]');
    this.getcolumnselector = page.locator(
      "text=Column SettingsLocation >> a>>nth=1",
    );
    this.getChooseColumn = page.locator("text=Choose columns");
    this.getCDKA = page.locator('span:has-text("CDK-A")');
    this.getCDKbox = page.locator('span:has-text("CDK Box")');
    this.getWorkerCount = page.locator('span:has-text("Worker Count")');
    this.getLoad = page.locator("//section[1]/div[3]");
    this.getCDKA1 = page.locator("//th[21]/a[2]");
    this.getCDKbox1 = page.locator("//th[22]/a[2]");
    this.getWorkerCount1 = page.locator("//th[23]/a[2]");
    this.getMGM = page.locator(
      "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[9]/a[2]",
    );
    this.getAGM = page.locator(
      "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[11]/a[2]",
    );
  }
  async ValidateAGMAndMGMFields() {
    await this.page.waitForTimeout(5000);
    expect(this.getMGM).toHaveText("Multi Store  General Manager");
    expect(this.getAGM).toHaveText("Assistant General Manager");
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
  async NavigateToMainStoreLeadershipReport() {
    await this.page.waitForLoadState("networkidle");
    await this.getMainTab.click();
    await this.getMainStoreRosters.click();
    await this.getMainStoreLeadershipReport.click();
    await this.page.waitForLoadState("networkidle");
  }
  async ExportToExcel() {
    await this.getExportToExcel.click();
    await this.getExportToPDF.click();
    await this.page.waitForTimeout(4000);
  }
  // Validate GVP Field
  async ValidateGVPField() {
    await this.page.waitForTimeout(5000);
    for (var i = 1; i < 327; i++) {
      const BeforeXpathGVP =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathGVP = "]/td[8]";
      const ActualXpathGVP = BeforeXpathGVP + i + AfterXpathGVP;
      const BeforeXpathRVP =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathRVP = "]/td[6]";
      const ActualXpathRVP = BeforeXpathRVP + i + AfterXpathRVP;
      const BeforeXpathRP =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathRP = "]/td[5]";
      const ActualXpathRP = BeforeXpathRP + i + AfterXpathRP;
      const BeforeXpathStoreName =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathStoreName = "]/td[2]";
      const ActualXpathStoreName =
        BeforeXpathStoreName + i + AfterXpathStoreName;
      var a = await this.page.locator(ActualXpathStoreName).innerText();
      var b = await this.page.locator(ActualXpathGVP).innerText();
      if (b != "") {
      } else if (b == "") {
        var c = await this.page.locator(ActualXpathRVP).innerText();
        if (c == "") {
          var d = await this.page.locator(ActualXpathRP).innerText();
          if (
            d == "" &&
            (a != "LAD") & (a != "Support Services") &&
            a != "Driveway Finance Corp" &&
            a != "Starbucks" &&
            a != "Florida Support Services" &&
            a != "Driveway" &&
            a != "Green Cars" &&
            a != "Allstate" &&
            a != "Driveway & Logistics" &&
            a != "Southeast Support Services" &&
            a != "Oxnard CA APC" &&
            a != "Pittsburg APC" &&
            a != "Florida APC" &&
            a != "Dallas APC" &&
            a != "Suburban APC" &&
            a != "Eugene APC" &&
            a != "Day Support Services" &&
            a != "Lithia Canada Hold Co"
          ) {
            console.log(
              "For Store " + a + " " + "The GVP , RVP and RP are empty",
            );
          }
        }
      } else {
      }
    }
  }
  // Validate GM Field
  async ValidateGMField() {
    await this.page.waitForTimeout(5000);
    await this.page.locator("text=Column SettingsState >> span").click();
    await this.page.locator("text=Choose columns").click();
    await this.page
      .locator('span:has-text("Multi Store General Manager")')
      .click();
    await this.page.locator("td:nth-child(10)").first().click();
    for (var j = 1; j < 327; j++) {
      const BeforeXpathGM =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathGM = "]/td[10]";
      const ActualXpathGM = BeforeXpathGM + j + AfterXpathGM;
      const BeforeXpathMGM =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathMGM = "]/td[24]";
      const ActualXpathMGM = BeforeXpathMGM + j + AfterXpathMGM;
      const BeforeXpathPGM =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathPGM = "]/td[5]";
      const ActualXpathPGM = BeforeXpathPGM + j + AfterXpathPGM;
      const BeforeXpathStoreName =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathStoreName = "]/td[2]";
      const ActualXpathStoreName =
        BeforeXpathStoreName + j + AfterXpathStoreName;
      var a1 = await this.page.locator(ActualXpathStoreName).innerText();
      var b1 = await this.page.locator(ActualXpathGM).innerText();
      if (b1 != "") {
      } else if (b1 == "") {
        var c1 = await this.page.locator(ActualXpathMGM).innerText();
        if (c1 == "") {
          var d1 = await this.page.locator(ActualXpathPGM).innerText();
          if (
            d1 == "" &&
            (a1 != "LAD") & (a1 != "Support Services") &&
            a1 != "Driveway Finance Corp" &&
            a1 != "Starbucks" &&
            a1 != "Florida Support Services" &&
            a1 != "Driveway" &&
            a1 != "Green Cars" &&
            a1 != "Allstate" &&
            a1 != "Driveway & Logistics" &&
            a1 != "Southeast Support Services" &&
            a1 != "Oxnard CA APC" &&
            a1 != "Pittsburg APC" &&
            a1 != "Florida APC" &&
            a1 != "Dallas APC" &&
            a1 != "Suburban APC" &&
            a1 != "Eugene APC" &&
            a1 != "Day Support Services" &&
            a1 != "Lithia Canada Hold Co"
          ) {
            console.log(
              "For Store " +
                a1 +
                " " +
                ": The General Manager , Multi-Store GM and Platform GM are empty",
            );
          }
        }
      } else {
      }
    }
  }
  // Validate Busines Manager Field
  async ValidateBMField() {
    for (var k = 1; k < 327; k++) {
      const BeforeXpathBM =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathBM = "]/td[15]";
      const ActualXpathBM = BeforeXpathBM + k + AfterXpathBM;
      const BeforeXpathAC =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathAC = "]/td[14]";
      const ActualXpathAC = BeforeXpathAC + k + AfterXpathAC;
      const BeforeXpathPD =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathPD = "]/td[13]";
      const ActualXpathPD = BeforeXpathPD + k + AfterXpathPD;
      const BeforeXpathStoreName1 =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpathStoreName1 = "]/td[2]";
      const ActualXpathStoreName1 =
        BeforeXpathStoreName1 + k + AfterXpathStoreName1;
      var a2 = await this.page.locator(ActualXpathStoreName1).innerText();
      var b2 = await this.page.locator(ActualXpathBM).innerText();
      if (b2 != "") {
      } else if (b2 == "") {
        var c2 = await this.page.locator(ActualXpathAC).innerText();
        if (c2 == "") {
          var d2 = await this.page.locator(ActualXpathPD).innerText();
          if (
            d2 == "" &&
            (a2 != "LAD") & (a2 != "Support Services") &&
            a2 != "Driveway Finance Corp" &&
            a2 != "Starbucks" &&
            a2 != "Florida Support Services" &&
            a2 != "Driveway" &&
            a2 != "Green Cars" &&
            a2 != "Allstate" &&
            a2 != "Driveway & Logistics" &&
            a2 != "Southeast Support Services" &&
            a2 != "Oxnard CA APC" &&
            a2 != "Pittsburg APC" &&
            a2 != "Florida APC" &&
            a2 != "Dallas APC" &&
            a2 != "Suburban APC" &&
            a2 != "Eugene APC" &&
            a2 != "Day Support Services" &&
            a2 != "Lithia Canada Hold Co"
          ) {
            console.log(
              "For Store " +
                a2 +
                " " +
                ": The Business Manager , Area Controller and Platform Director are empty",
            );
          }
        }
      } else {
      }
    }
  }
}
module.exports = { StoreLeadershipReport };
