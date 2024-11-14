// this POM is for /Payroll
const { expect } = require("@playwright/test");

class UsedVehicleInventory
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
    await this.page.goto('https://spedev.lithiainc.com/main/store',{timeout:0});
 // Pause for 10 seconds, to see what's going on.
 await this.page.waitForLoadState('networkidle');
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
  async ValidateAPIResponse(){
    const GetMenuHierarchy = await this.page.request.get("https://spedev.lithiainc.com/api/GetMenuHierarchy?EmpID=9999824&Division=0");  
    expect(GetMenuHierarchy.status()).toBe(200);  
    const GetCalendarDate= await this.page.request.get("https://spedev.lithiainc.com/api/getcalendardates?businessgroup=0");
    expect(GetCalendarDate.status()).toBe(200);
    const GetDivisionList= await this.page.request.get("https://spedev.lithiainc.com/api/GetDivisionList?EmplID=9999824");
    expect(GetDivisionList.status()).toBe(200);
    const StoreSelectorContent= await this.page.request.get("https://spedev.lithiainc.com/api/StoreSelectorContent?EmplID=9999824&RollupType=1&recordDate=05%2F15%2F2023&GetSingleStores=0");
    expect(StoreSelectorContent.status()).toBe(200);
    const GetEmployeeFolder= await this.page.request.get("https://spedev.lithiainc.com/api/GetEmployeeFolders?EID=9999824");
    expect(GetEmployeeFolder.status()).toBe(200);
    const GetRollupKeys=await this.page.request.get("https://spedev.lithiainc.com/api/GetRollupKeys?CoNos=-10507,-779,-773,-771,-770,-769,-768,-767,-766,-764,-762,-746,-708,-707,-705,-701,-547,-543,-542,-541,-540,-538,-537,-536,-535,-534,-533,-532,-531,-510,-508,-507,-504,-503,-502,-501,-499,-495,-494,-492,-491,-479,-478,-477,-476,-473,-470,-468,-467,-466,-465,-464,-463,-462,-461,-457,-456,-453,-452,-451,-449,-448,-447,-446,-445,-444,-443,-442,-437,-436,-435,-434,-433,-432,-430,-429,-428,-426,-425,-419,-418,-415,-414,-402,-396,-395,-394,-393,-392,-389,-388,-385,-384,-381,-379,-378,-377,-376,-375,-374,-373,-371,-368,-367,-365,-364,-363,-362,-361,-359,-358,-357,-356,-355,-354,-353,-352,-351,-349,-348,-347,-343,-342,-341,-340,-339,-337,-336,-335,-330,-327,-326,-324,-323,-319,-318,-317,-316,-311,-310,-309,-308,-307,-306,-304,-278,-258,-253,3,4,6,9,11,15,19,20,23,26,27,29,34,38,48,51,52,53,56,57,58,59,60,61,63,65,72,99,106,110,113,114,116,121,124,125,127,134,138,143,145,146,148,149,150,152,153,154,155,157,162,169,172,173,176,178,180,181,182,183,184,190,191,192,193,195,215,218,219,220,223,224,225,226,227,228,230,234,235,236,237,240,241,242,243,247,248,249,252,253,254,256,257,258,259,267,272,275,278,279,280,287,288,289,292,294,295,301,304,305,306,307,308,309,310,311,316,317,318,319,323,324,326,327,330,331,335,336,337,339,340,341,342,343,346,347,348,349,351,352,353,354,355,356,357,358,359,361,362,363,364,365,367,368,371,373,374,375,376,377,378,379,380,381,382,383,384,385,388,389,390,392,393,394,395,396,397,398,399,400,401,403,404,405,406,407,408,409,410,411,412,413,414,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,439,441,442,443,444,445,446,447,448,449,451,452,453,455,456,457,458,460,461,462,463,464,465,466,467,468,469,470,472,473,474,475,476,477,478,479,488,491,492,494,495,497,499,501,502,503,504,507,510,515,516,517,518,519,530,531,532,533,535,536,537,538,540,541,542,543,547,552,553,554,555,556,563,564,565,566,567,568,569,571,572,573,574,576,580,583,584,585,586,587,701,702,703,705,707,708,709,710,711,713,715,717,718,719,721,722,723,724,725,727,739,740,742,744,747,751,756,762,764,765,766,767,768,769,770,771,773,779,780,10507");
    expect(GetRollupKeys.status()).toBe(200);
    const GetFIManagerTop20StartDate=await this.page.request.get("https://spedev.lithiainc.com/api/FIManagersTopTwenty?StartDate=06%2F01%2F2023&EndDate=06%2F02%2F2023&CoNos=&DealershipType=D&ReportType=T&MinSales=25&IncludeBooked=true");
    expect(GetFIManagerTop20StartDate.status()).toBe(200);
    const GetRecord=await this.page.request.get("https://spedev.lithiainc.com/api/KendoGridUserOptions/GetRecord?employeeId=9999824&gridID=%23performanceGrid&currentPage=%2Freports%2FFITopTwentyFive");
    expect(GetRecord.status()).toBe(200);
    const GetFIManagerTop20EndDate=await this.page.request.get("https://spedev.lithiainc.com/api/FIManagersTopTwenty?EndDate=05%2F31%2F2023&DealershipType=h&ReportType=t&MinSales=25&IncludeBooked=true");
    expect(GetFIManagerTop20EndDate.status()).toBe(200);
    const GetFIManagerTop20EndDate2=await this.page.request.get("https://spedev.lithiainc.com/api/FIManagersTopTwenty?EndDate=05%2F31%2F2023&DealershipType=d&ReportType=t&MinSales=25&IncludeBooked=true");
    expect(GetFIManagerTop20EndDate2.status()).toBe(200);
    const GetFIManagerTop20EndDate3=await this.page.request.get("https://spedev.lithiainc.com/api/FIManagersTopTwenty?EndDate=05%2F31%2F2023&DealershipType=i&ReportType=T&MinSales=25&IncludeBooked=true");
    expect(GetFIManagerTop20EndDate3.status()).toBe(200);
  }
}
module.exports = { UsedVehicleInventory };