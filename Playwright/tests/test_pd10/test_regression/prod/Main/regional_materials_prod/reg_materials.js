// this POM is for /Payroll
const { expect } = require("@playwright/test");

class MainStore
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo=page.locator("id=logo");
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getRM=page.locator(':nth-match(:text("Regional Materials"),1)');  
    this.getpayroll=page.locator(':nth-match(:text("Payroll - Regional"),1)');
  } 
   async NavigateToRegionalMaterials() {    
      await this.page.waitForLoadState('networkidle');
      await this.getRM.click();
      await this.getpayroll.click();
      await this.page.waitForLoadState('networkidle');
      expect(this.page.locator("//body/div[1]/main[1]/section[1]/h2[1]/span[1]").innerText()).toContain("Regional Materials");
    }
    async goto() {
      await this.page.goto('https://speuat.lithiainc.com/main/store',{timeout:0});
   // Pause for 10 seconds, to see what's going on.
   await this.page.waitForLoadState('networkidle');
   }
   // Login
   async login() {
   await this.getUsername.click();
   await this.page.fill('input[id="i0116"]', 't_PerfDash_01@lithia.com'); //username
   await this.page.locator('id=idSIButton9').click();
   await this.getPassword.click();
   await this.page.fill('input[name="passwd"]', 'GkCow**!#w#)4E#Sj3Rb8KS*TkGduz'); //pwd
   await this.page.click('text=Sign In');
   }
   async twostepauthlogin(){
     await this.page.click('id=KmsiCheckboxField');
     await this.page.click('id=idSIButton9');
   }
}
module.exports = { MainStore };
