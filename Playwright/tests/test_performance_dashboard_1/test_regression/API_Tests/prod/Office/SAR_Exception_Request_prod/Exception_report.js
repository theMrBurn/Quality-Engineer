// this POM is for /Payroll
const { expect } = require("@playwright/test");

class ExceptionRequest
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
  }

async goto() {
    await this.page.goto('https://speuat.lithiainc.com/main/store',{timeout:0});
 }
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
  async ValidateAPIResponseExceptionRequest(){
    const GetMenuHierarchy = await this.page.request.get("https://speuat.lithiainc.com/api/GetMenuHierarchy?EmpID=9999824&Division=0");  
    expect(GetMenuHierarchy.status()).toBe(200);  
    const SARScheduleOpenMonths= await this.page.request.get("https://speuat.lithiainc.com/api/SARScheduleAvailableOpenMonths");
    expect(SARScheduleOpenMonths.status()).toBe(200);  
    const SARSummary=await this.page.request.get("https://speuat.lithiainc.com/api/SARSummaryPage?cM=202305&CoNos=-10507%2C+-780%2C+-779%2C+-773%2C+-771%2C+-770%2C+-769%2C+-768%2C+-767%2C+-766%2C+-764%2C+-762%2C+-746%2C+-713%2C+-710%2C+-709%2C+-708%2C+-707%2C+-705%2C+-703%2C+-702%2C+-701%2C+-587%2C+-586%2C+-585%2C+-584%2C+-583%2C+-580%2C+-547%2C+-542%2C+-541%2C+-538%2C+-537%2C+-536%2C+-519%2C+-518%2C+-510%2C+-508%2C+-507%2C+-504%2C+-503%2C+-502%2C+-501%2C+-499%2C+-495%2C+-494%2C+-492%2C+-491%2C+-479%2C+-477%2C+-476%2C+-475%2C+-474%2C+-473%2C+-470%2C+-469%2C+-468%2C+-467%2C+-466%2C+-465%2C+-464%2C+-463%2C+-462%2C+-461%2C+-457%2C+-456%2C+-453%2C+-452%2C+-451%2C+-449%2C+-448%2C+-447%2C+-446%2C+-445%2C+-444%2C+-443%2C+-442%2C+-437%2C+-436%2C+-435%2C+-434%2C+-433%2C+-432%2C+-431%2C+-430%2C+-429%2C+-428%2C+-427%2C+-426%2C+-425%2C+-424%2C+-423%2C+-422%2C+-421%2C+-419%2C+-418%2C+-417%2C+-416%2C+-415%2C+-414%2C+-412%2C+-411%2C+-409%2C+-408%2C+-407%2C+-406%2C+-405%2C+-403%2C+-402%2C+-401%2C+-400%2C+-399%2C+-398%2C+-396%2C+-395%2C+-394%2C+-393%2C+-392%2C+-389%2C+-388%2C+-385%2C+-384%2C+-381%2C+-379%2C+-378%2C+-377%2C+-376%2C+-375%2C+-374%2C+-373%2C+-371%2C+-368%2C+-367%2C+-365%2C+-364%2C+-363%2C+-362%2C+-361%2C+-359%2C+-358%2C+-357%2C+-356%2C+-355%2C+-354%2C+-353%2C+-352%2C+-351%2C+-349%2C+-348%2C+-347%2C+-343%2C+-342%2C+-341%2C+-340%2C+-339%2C+-337%2C+-336%2C+-335%2C+-330%2C+-327%2C+-326%2C+-324%2C+-323%2C+-319%2C+-318%2C+-317%2C+-316%2C+-311%2C+-310%2C+-309%2C+-308%2C+-307%2C+-306%2C+-304%2C+-278%2C+-258%2C+-253%2C+3%2C+4%2C+6%2C+9%2C+11%2C+15%2C+19%2C+20%2C+23%2C+26%2C+27%2C+29%2C+34%2C+38%2C+48%2C+51%2C+52%2C+53%2C+56%2C+57%2C+58%2C+59%2C+60%2C+61%2C+63%2C+65%2C+72%2C+99%2C+106%2C+110%2C+113%2C+114%2C+116%2C+121%2C+124%2C+125%2C+127%2C+131%2C+134%2C+138%2C+140%2C+142%2C+143%2C+145%2C+146%2C+148%2C+149%2C+150%2C+152%2C+153%2C+154%2C+155%2C+157%2C+159%2C+162%2C+169%2C+172%2C+173%2C+176%2C+178%2C+179%2C+180%2C+181%2C+182%2C+183%2C+184%2C+190%2C+191%2C+192%2C+193%2C+195%2C+214%2C+215%2C+218%2C+219%2C+220%2C+223%2C+224%2C+225%2C+226%2C+227%2C+228%2C+230%2C+235%2C+236%2C+237%2C+240%2C+241%2C+242%2C+243%2C+248%2C+249%2C+252%2C+253%2C+254%2C+256%2C+257%2C+258%2C+259%2C+267%2C+272%2C+275%2C+279%2C+280%2C+287%2C+288%2C+289%2C+292%2C+294%2C+295%2C+301%2C+304%2C+305%2C+306%2C+307%2C+308%2C+309%2C+310%2C+311%2C+316%2C+317%2C+318%2C+319%2C+323%2C+324%2C+326%2C+327%2C+330%2C+331%2C+335%2C+336%2C+337%2C+339%2C+340%2C+341%2C+342%2C+343%2C+346%2C+347%2C+348%2C+349%2C+351%2C+352%2C+353%2C+354%2C+355%2C+356%2C+357%2C+358%2C+359%2C+361%2C+362%2C+363%2C+364%2C+365%2C+367%2C+368%2C+371%2C+373%2C+374%2C+375%2C+376%2C+377%2C+378%2C+379%2C+380%2C+381%2C+382%2C+383%2C+384%2C+385%2C+388%2C+389%2C+390%2C+392%2C+393%2C+394%2C+395%2C+396%2C+397%2C+398%2C+399%2C+400%2C+401%2C+403%2C+404%2C+405%2C+406%2C+407%2C+408%2C+409%2C+410%2C+411%2C+412%2C+413%2C+414%2C+416%2C+417%2C+418%2C+419%2C+420%2C+421%2C+422%2C+423%2C+424%2C+425%2C+426%2C+427%2C+428%2C+429%2C+430%2C+431%2C+432%2C+433%2C+434%2C+435%2C+436%2C+437%2C+439%2C+441%2C+442%2C+443%2C+444%2C+445%2C+446%2C+447%2C+448%2C+449%2C+451%2C+452%2C+453%2C+455%2C+456%2C+457%2C+458%2C+460%2C+462%2C+463%2C+464%2C+465%2C+466%2C+467%2C+468%2C+469%2C+470%2C+471%2C+472%2C+473%2C+474%2C+475%2C+476%2C+477%2C+478%2C+479%2C+486%2C+488%2C+491%2C+492%2C+494%2C+495%2C+497%2C+499%2C+501%2C+507%2C+508%2C+510%2C+515%2C+516%2C+517%2C+518%2C+519%2C+521%2C+522%2C+524%2C+525%2C+526%2C+527%2C+529%2C+530%2C+531%2C+532%2C+533%2C+534%2C+535%2C+536%2C+537%2C+538%2C+540%2C+541%2C+542%2C+543%2C+547%2C+552%2C+553%2C+554%2C+555%2C+556%2C+563%2C+564%2C+565%2C+566%2C+567%2C+568%2C+569%2C+571%2C+572%2C+573%2C+574%2C+576%2C+577%2C+579%2C+580%2C+581%2C+582%2C+583%2C+584%2C+585%2C+586%2C+587%2C+588%2C+589%2C+590%2C+591%2C+592%2C+593%2C+594%2C+595%2C+596%2C+597%2C+598%2C+599%2C+701%2C+702%2C+703%2C+705%2C+707%2C+708%2C+709%2C+710%2C+711%2C+713%2C+714%2C+715%2C+717%2C+718%2C+719%2C+722%2C+723%2C+724%2C+725%2C+727%2C+739%2C+740%2C+742%2C+744%2C+747%2C+751%2C+756%2C+762%2C+764%2C+765%2C+766%2C+767%2C+768%2C+769%2C+770%2C+771%2C+773%2C+779%2C+780%2C+784%2C+785%2C+10507");
    expect(SARSummary.status()).toBe(200);
  }
  async ValidateAPIResponseForAStore(){
    const SARRequestDATAMaster=await this.page.request.get("https://speuat.lithiainc.com/api/SARRequestDataMaster?cM=202305&CoNos=162&Sender=OM");
    expect(SARRequestDATAMaster.status()).toBe(200);
    const SARDateRequestDetails=await this.page.request.get("https://speuat.lithiainc.com/api/SARRequestDataDetails?view=OM&cM=202305&coNos=162");
    expect(SARDateRequestDetails.status()).toBe(200);
    const SARNotes=await this.page.request.get("https://speuat.lithiainc.com/api/SARRequestDataNotes?view=OM&cM=202305&coNos=162");
    expect(SARNotes.status()).toBe(200);
    const SARDateRequest=await this.page.request.get("https://speuat.lithiainc.com/api/SARRequestDataRequests?view=OM&cM=202305&coNos=162");
    expect(SARDateRequest.status()).toBe(200);
    const SARDataAttachments=await this.page.request.get("https://speuat.lithiainc.com/api/SARRequestDataAttachments?view=OM&cM=202305&coNos=162");
    expect(SARDataAttachments.status()).toBe(200);
  }
}
module.exports = { ExceptionRequest };