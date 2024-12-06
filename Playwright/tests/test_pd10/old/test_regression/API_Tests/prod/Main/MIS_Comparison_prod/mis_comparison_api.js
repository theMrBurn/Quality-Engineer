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
    //Main Tb
    this.getMainTab = page.locator(':nth-match(:text("Main"),1)');
    this.getMainMIS = page.locator('text="MIS"');
    this.getMainMIS1Standard = page.locator(
      ':nth-match(:text("MIS 1 (Standard)"),1)',
    );
    this.getMainMISComparison = page.locator(
      ':nth-match(:text("MIS Comparison"),1)',
    );
    this.getStoreSelector = page.locator('//*[@id="misStoreSelect"]/div[1]');
    this.getSelectStore1 = page.locator("text=ALABAMA[+] >> div");
    this.getSelectStore2 = page.locator("text=ALASKA[+] >> div");
    this.getSelectStore3 = page.locator("text=CALIFORNIA[+] >> div");
    this.getSelectStoresBUtton = page.locator("#js-mask");
    this.getDepartment = page.locator(
      "//*[@id='main_section']/div/div/span/span/span[2]",
    );
    this.get3MonthRolling = page.locator(
      "//*[@id='departments_listbox']/li[2]",
    );
    this.getSubmit = page.locator('//input[@value="Submit"]');
    this.getYearToDate = page.locator("//*[@id='departments_listbox']/li[3]");
  }
  async NavigateToMainMISComparison() {
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMISComparison.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  //Bug - Validations
  async ValidateTheDataFormats() {
    expect(this.page.locator("//*[@id='row9']/td[3]")).not.toContain("$");
    expect(this.page.locator("//*[@id='row10']/td[3]")).not.toContain("$");
    /*expect(this.page.locator("//*[@id='row22']/td[3]")).toContain('$');
      expect(this.page.locator("//*[@id='row6']/td[3]")).toBeVisible();
      expect(this.page.locator('text=Roseville Chevrolet')).not.toBeVisible();
      expect(this.page.locator("//*[@id='row15']/td[3]")).toContain(':');
      expect(this.page.locator("//*[@id='row32']/td[3]")).toBeVisible();
      expect(this.page.locator("//*[@id='row33']/td[3]")).toBeVisible();
      expect(this.page.locator("//*[@id='row34']/td[3]")).toBeVisible();
      expect(this.page.locator("//*[@id='row64']/td[3]")).toBeVisible();
      expect(this.page.locator("//*[@id='row35']/td[3]")).toBeVisible();
      expect(this.page.locator("//*[@id='row12']/td[3]")).toBeVisible();
      expect(this.page.locator("//*[@id='row13']/td[3]")).toBeVisible();
      expect(this.page.locator("//*[@id='row14']/td[3]")).toBeVisible();
      expect(this.page.locator("//*[@id='row57']/td[3]")).toBeVisible();  */
  }
  async SelectStoreToCompareReports() {
    await this.getStoreSelector.click();
    await this.getSelectStore1.first().click();
    await this.getSelectStore2.first().click();
    await this.getSelectStore3.first().click();
    await this.getSelectStoresBUtton.click();
    await this.getSubmit.click();
    await this.page.waitForLoadState("networkidle");
    await this.getDepartment.click();
    await this.get3MonthRolling.click();
    await this.getSubmit.click();
    await this.page.waitForLoadState("networkidle");
    await this.getDepartment.click();
    await this.getYearToDate.click();
    await this.getSubmit.click();
    await this.page.waitForLoadState("networkidle");
  }
  async ValidateAPIResponse() {
    const response = await this.page.request.get(
      "https://speuat.lithiainc.com/api/MIS/MISBenchmark?RecordDate=05%2F06%2F2023&_=1683559046303",
    );
    expect(response.status()).toBe(200);
    const response1 = await this.page.request.get(
      "https://speuat.lithiainc.com/api/MIS/NewMISStoreLayout?RecordDate=05%2F06%2F2023&CoNo=461%2C-461%2C154%2C235%2C148%2C106%2C127%2C214%2C215%2C143%2C149%2C252%2C442%2C-442%2C378%2C-378&DateRangeType=3&_=1683559046304",
    );
    expect(response1.status()).toBe(200);
    const response2 = await this.page.request.post(
      "https://dc.services.visualstudio.com/v2/track",
    );
    expect(response2.status()).toBe(200);
    const response3 = await this.page.request.get(
      "https://speuat.lithiainc.com/api/MIS/MISBenchmark?RecordDate=05%2F06%2F2023&_=1683559046305",
    );
    expect(response3.status()).toBe(200);
    const response4 = await this.page.request.get(
      "https://speuat.lithiainc.com/api/MIS/NewMISStoreLayout?RecordDate=05%2F06%2F2023&CoNo=461%2C-461%2C154%2C235%2C148%2C106%2C127%2C214%2C215%2C143%2C149%2C252%2C442%2C-442%2C378%2C-378&DateRangeType=3&_=1683559046306",
    );
    expect(response4.status()).toBe(200);
    const response5 = await this.page.request.get(
      "https://speuat.lithiainc.com/api/MIS/MISBenchmark?RecordDate=05%2F06%2F2023&_=1683559046307",
    );
    expect(response5.status()).toBe(200);
    const response6 = await this.page.request.get(
      "https://speuat.lithiainc.com/api/MIS/NewMISStoreLayout?RecordDate=05%2F06%2F2023&CoNo=461%2C-461%2C154%2C235%2C148%2C106%2C127%2C214%2C215%2C143%2C149%2C252%2C442%2C-442%2C378%2C-378%2C567%2C756%2C311%2C-311%2C259%2C491%2C-491%2C497%2C307%2C-307%2C516%2C390%2C304%2C-304%2C310%2C-310%2C308%2C-308%2C305%2C309%2C-309%2C306%2C-306%2C547%2C-547%2C159%2C462%2C-462%2C23%2C29%2C27%2C228%2C714%2C247%2C376%2C-376%2C727%2C336%2C-336%2C337%2C-337%2C183%2C184%2C718%2C715%2C717%2C57%2C58%2C739%2C508%2C-508%2C348%2C-348%2C10507%2C-10507%2C507%2C-507%2C347%2C-347%2C364%2C-364%2C458%2C140%2C449%2C-449%2C377%2C-377%2C448%2C-448%2C568%2C721%2C723%2C722%2C724%2C740%2C363%2C-363%2C725%2C719%2C368%2C-368%2C375%2C-375%2C373%2C-373%2C374%2C-374%2C371%2C-371%2C248%2C510%2C-510&DateRangeType=3&_=1683559046308",
    );
    expect(response6.status()).toBe(200);
    const response7 = await this.page.request.get(
      "https://speuat.lithiainc.com/api/GetLatestDW_Update",
    );
    expect(response7.status()).toBe(200);
  }
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
    await this.page.goto(
      "https://speuat.lithiainc.com/Main/Storecomparisonnewversion",
      { timeout: 0 },
    );
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
}
module.exports = { MainStore };
