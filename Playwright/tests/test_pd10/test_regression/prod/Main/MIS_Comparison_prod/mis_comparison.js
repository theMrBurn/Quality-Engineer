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
    //Main Tb 
    this.getMainTab=page.locator(':nth-match(:text("Main"),1)');
    this.getMainMIS=page.locator('text="MIS"');
    this.getMainMIS1Standard=page.locator(':nth-match(:text("MIS 1 (Standard)"),1)');
    this.getMainMISComparison=page.locator(':nth-match(:text("MIS Comparison"),1)');
    this.getStoreSelector=page.locator('//*[@id="misStoreSelect"]/div[1]'); 
    this.getSelectStore1=page.locator('text=ALABAMA[+] >> div');
    this.getSelectStore2=page.locator('text=ALASKA[+] >> div');
    this.getSelectStore3=page.locator('text=CALIFORNIA[+] >> div');
    this.getSelectStoresBUtton=page.locator('#js-mask');
    this.getDepartment=page.locator("//*[@id='main_section']/div/div/span/span/span[2]");
    this.get3MonthRolling=page.locator("//*[@id='departments_listbox']/li[2]");
    this.getSubmit=page.locator('//input[@value="Submit"]');
    this.getYearToDate=page.locator("//*[@id='departments_listbox']/li[3]");
    this.getStoreSelector2=page.locator('div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")');
    this.getAllselector=page.locator('.allSelectorIndicator');
    this.getSelectButton=page.locator('#storeSelector >> text=Select');
    this.getAlaska=page.locator('text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div');
    this.getAnchorageCJD=page.locator('label:has-text("Anchorage CJD")');
    this.getServiceDetail=page.locator('//li[3]/span[2]/span[1]');
    this.getParts=page.locator('//li[4]/span[2]/span[1]');
   } 
    async NavigateToMainMISComparison() {
      await this.getMainTab.click();
      await this.getMainMIS.click();
      await this.getMainMISComparison.click();
      await this.page.waitForLoadState('networkidle');
      await expect(this.getSPELogo).toBeVisible();
    }
    async SelectStoreToCompareReports(){
      await this.getStoreSelector.click();
      await this.getSelectStore1.first().click();
      await this.getSelectStore2.first().click();
      await this.getSelectStoresBUtton.click();      
      await this.getSubmit.click();      
      await this.page.waitForLoadState('networkidle');
      await this.getDepartment.click();
      await this.get3MonthRolling.click();
      await this.getSubmit.click();
      await this.page.waitForLoadState('networkidle');
      await this.getDepartment.click();
      await this.getYearToDate.click();
      await this.getSubmit.click();
      await this.page.waitForLoadState('networkidle');
    }
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
     await this.page.goto('https://speuat.lithiainc.com/Main/Storecomparisonnewversion',{timeout:0});
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
  //Validate the Detail Part of the Comparison
  async ValidateDetailForAncorageCDJRStore(){
    await this.getStoreSelector.click();    
    await this.page.waitForTimeout(2000);
    await this.page.locator("text=ALASKA").click();
    await this.page.locator('#stateSelect >> text=Anchorage CJD').click();    
    await this.getSelectStoresBUtton.click();      
    await this.getSubmit.click();     
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    const DetailRevenue=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[61]/td[3]').innerText();
    const DetailGross=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[62]/td[3]').innerText();
    const DetailExpense=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[63]/td[3]').innerText();
    const OperatingProfit=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[64]/td[3]').innerText();
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMIS1Standard.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector2.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.getSelectButton.click();    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.getServiceDetail.click();
    await this.page.waitForTimeout(5000);
    const DetailRevenue1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[134]/td[6]").innerText();
    const DetailGross1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[137]/td[6]").innerText();
    const DetailExpense1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[147]/td[6]").innerText();
    const OperatingProfit1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[149]/td[6]").innerText();
    if(DetailRevenue!=DetailRevenue1)
    {
      console.log("For Anchorage CJD , The Detail Revenue Under Detail  in MIS Comparison is different from MIS Standard line LM35600. "+DetailRevenue+":"+DetailRevenue1);
    }
    if(DetailGross!=DetailGross1)
    {
      console.log("For Anchorage CJD , The Detail Gross Under Detail  in MIS Comparison is different from MIS Standard line LM35605. "+DetailGross+":"+DetailGross1);
    }
    if(DetailExpense!=DetailExpense1)
    {
      console.log("For Anchorage CJD , The Detail Expense Under Detail  in MIS Comparison is different from MIS Standard line LM36400. "+DetailExpense+":"+DetailExpense1);
    }
    if(OperatingProfit!=OperatingProfit1)
    {
      console.log("For Anchorage CJD , The Operating Profit Under Detail  in MIS Comparison is different from MIS Standard line LM36450. "+OperatingProfit+":"+OperatingProfit1);
    }
  }
  //Validate data in Parts Sections
  async ValidatePartsForAncorageCDJRStore(){
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMISComparison.click();
    await this.page.waitForLoadState('networkidle'); 
    await this.getStoreSelector.click();    
    await this.page.waitForTimeout(2000);
    await this.page.locator("text=ALASKA").click();
    await this.page.locator('#stateSelect >> text=Anchorage CJD').click();    
    await this.getSelectStoresBUtton.click();      
    await this.getSubmit.click();     
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    const PartsRevenue=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[66]/td[3]').innerText();
    const CustomerPayGross=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[67]/td[3]').innerText();
    const WarrantyGross=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[68]/td[3]').innerText();
    const InternalGross=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[69]/td[3]').innerText();
    const WholesaleGross=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[70]/td[3]').innerText();
    const PartsGross=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[72]/td[3]').innerText();
    const SemiFixedExpense=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[74]/td[3]').innerText();
    const DepartmentProfit=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[75]/td[3]').innerText();
    const FixedExpense=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[76]/td[3]').innerText();
    const TotalExpense=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[77]/td[3]').innerText();
    const PartsOperatingProfit=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[78]/td[3]').innerText();
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMIS1Standard.click();    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector2.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.getSelectButton.click();    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.getParts.click();
    await this.page.waitForTimeout(5000);
    const PartsRevenue1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[84]/td[6]').innerText();
    const CustomerPayGross1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[32]/td[6]').innerText();
    const WarrantyGross1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[47]/td[6]').innerText();
    const InternalGross1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[52]/td[6]').innerText();
    const WholesaleGross1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[57]/td[6]').innerText();
    const PartsGross1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[87]/td[6]').innerText();
    const SemiFixedExpense1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[120]/td[6]').innerText();
    const DepartmentProfit1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[122]/td[6]').innerText();    
    const FixedExpense1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[124]/td[6]').innerText();
    const TotalExpense1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[126]/td[6]').innerText();
    const PartsOperatingProfit1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[128]/td[6]').innerText();
   if(PartsRevenue!=PartsRevenue1)
    {
      console.log("For Anchorage CJD , The Parts Revenue Under Parts  in MIS Comparison is different from MIS Standard line LM45600. "+PartsRevenue+":"+PartsRevenue1);
    }
    if(CustomerPayGross!=CustomerPayGross1)
    {
      console.log("For Anchorage CJD , The Customer Pay Gross Gross Under Parts  in MIS Comparison is different from MIS Standard line LM40205. "+CustomerPayGross+":"+CustomerPayGross1);
    }
    if(WarrantyGross!=WarrantyGross1)
    {
      console.log("For Anchorage CJD , The Warranty Gross  Under Parts  in MIS Comparison is different from MIS Standard line LM40305. "+WarrantyGross+":"+WarrantyGross1);
    }
    if(InternalGross!=InternalGross1)
    {
      console.log("For Anchorage CJD , The Internal Gross Under Parts  in MIS Comparison is different from MIS Standard line LM40405. "+InternalGross+":"+InternalGross1);
    }
    if(WholesaleGross!=WholesaleGross1)
    {
      console.log("For Anchorage CJD , The Wholesale Gross Under Parts  in MIS Comparison is different from MIS Standard line LM40505. "+WholesaleGross+":"+WholesaleGross1);
    }
    if(PartsGross!=PartsGross1)
    {
      console.log("For Anchorage CJD , The Parts Gross Under Parts  in MIS Comparison is different from MIS Standard line LM45605. "+PartsGross+":"+PartsGross1);
    }
    if(SemiFixedExpense!=SemiFixedExpense1)
    {
      console.log("For Anchorage CJD , The Semi-Fixed Expense Under Parts  in MIS Comparison is different from MIS Standard line LM46130. "+SemiFixedExpense+":"+SemiFixedExpense1);
    }
    if(DepartmentProfit!=DepartmentProfit1)
    {
      console.log("For Anchorage CJD , The Departmetn Profit  Under Parts  in MIS Comparison is different from MIS Standard line LM46140. "+DepartmentProfit+":"+DepartmentProfit1);
    }
    if(FixedExpense!=FixedExpense1)
    {
      console.log("For Anchorage CJD , The Fixed Expense Under Parts  in MIS Comparison is different from MIS Standard line LM46300. "+FixedExpense+":"+FixedExpense1);
    }
    if(TotalExpense!=TotalExpense1)
    {
      console.log("For Anchorage CJD , The Total Expense Under Parts  in MIS Comparison is different from MIS Standard line LM46400. "+TotalExpense+":"+TotalExpense1);
    }
    if(PartsOperatingProfit!=PartsOperatingProfit1)
    {
      console.log("For Anchorage CJD , The Parts Operating Expense Under Parts  in MIS Comparison is different from MIS Standard line LM46450. "+PartsOperatingProfit+":"+PartsOperatingProfit1);
    }
  }
  //Validate the Service Section
  async ValidateServiceForAncorageCDJRStore(){        
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMISComparison.click();
    await this.page.waitForLoadState('networkidle'); 
    await this.getStoreSelector.click();    
    await this.page.waitForTimeout(2000);
    await this.page.locator("text=ALASKA").click();
    await this.page.locator('#stateSelect >> text=Anchorage CJD').click();    
    await this.getSelectStoresBUtton.click();      
    await this.getSubmit.click();     
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    const ServiceRevenue=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[44]/td[3]').innerText();
    const ServiceCustomerPayGross=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[45]/td[3]').innerText();
    const ServiceWarrantyGross=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[46]/td[3]').innerText();
    const ServiceInternalGross=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[47]/td[3]').innerText();
    const ServiceGross=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[49]/td[3]').innerText();
    const ServiceSemiFixedExpense=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[51]/td[3]').innerText();
    const ServiceDepartmentProfit=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[52]/td[3]').innerText();
    const ServiceFixedExpense=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[53]/td[3]').innerText();
    const ServiceTotalExpense=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[54]/td[3]').innerText();
    const ServiceOperatingProfit=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[55]/td[3]').innerText();
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMIS1Standard.click();    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector2.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.getSelectButton.click();    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/ul[1]/li[3]/span[2]/span[1]").click();
    await this.page.waitForTimeout(5000);
    const ServiceRevenue1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[74]/td[6]').innerText();
    const ServiceCustomerPayGross1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[23]/td[6]').innerText();
    const ServiceWarrantyGross1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[38]/td[6]').innerText();
    const ServiceInternalGross1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[43]/td[6]').innerText();
    const ServiceGross1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[77]/td[6]').innerText();
    const ServiceSemiFixedExpense1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[109]/td[6]').innerText();
    const ServiceDepartmentProfit1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[111]/td[6]').innerText();   
    const ServiceFixedExpense1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[113]/td[6]').innerText();
    const ServiceTotalExpense1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[115]/td[6]').innerText();
    const ServiceOperatingProfit1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[117]/td[6]').innerText();
    if(ServiceRevenue!=ServiceRevenue1)
    {
      console.log("For Anchorage CJD , The Service Revenue Under Service  in MIS Comparison is different from MIS Standard line LM25600. "+ServiceRevenue+":"+ServiceRevenue1);
    }
    if(ServiceCustomerPayGross!=ServiceCustomerPayGross1)
    {
      console.log("For Anchorage CJD , The Customer Pay Gross Gross Under Service  in MIS Comparison is different from MIS Standard line LM20205. "+ServiceCustomerPayGross+":"+ServiceCustomerPayGross1);
    }
    if(ServiceWarrantyGross!=ServiceWarrantyGross1)
    {
      console.log("For Anchorage CJD , The Warranty Gross  Under Service  in MIS Comparison is different from MIS Standard line LM20305. "+ServiceWarrantyGross+":"+ServiceWarrantyGross1);
    }
    if(ServiceInternalGross!=ServiceInternalGross1)
    {
      console.log("For Anchorage CJD , The Internal Gross Under Service  in MIS Comparison is different from MIS Standard line LM20405. "+ServiceInternalGross+":"+ServiceInternalGross1);
    }
    if(ServiceGross!=ServiceGross1)
    {
      console.log("For Anchorage CJD , The Wholesale Gross Under Service  in MIS Comparison is different from MIS Standard line LM25605. "+ServiceGross+":"+ServiceGross1);
    }
    if(ServiceSemiFixedExpense!=ServiceSemiFixedExpense1)
    {
      console.log("For Anchorage CJD , The Semi-Fixed Expense Under Service  in MIS Comparison is different from MIS Standard line LM26130. "+ServiceSemiFixedExpense+":"+ServiceSemiFixedExpense1);
    }
    if(ServiceDepartmentProfit!=ServiceDepartmentProfit1)
    {
      console.log("For Anchorage CJD , The Departmetn Profit  Under Service  in MIS Comparison is different from MIS Standard line LM26140. "+ServiceDepartmentProfit+":"+ServiceDepartmentProfit1);
    }
    if(ServiceFixedExpense!=ServiceFixedExpense1)
    {
      console.log("For Anchorage CJD , The Fixed Expense Under Service  in MIS Comparison is different from MIS Standard line LM26300. "+ServiceFixedExpense+":"+ServiceFixedExpense1);
    }
    if(ServiceTotalExpense!=ServiceTotalExpense1)
    {
      console.log("For Anchorage CJD , The Total Expense Under Service  in MIS Comparison is different from MIS Standard line LM26400. "+ServiceTotalExpense+":"+ServiceTotalExpense1);
    }
    if(ServiceOperatingProfit!=ServiceOperatingProfit1)
    {
      console.log("For Anchorage CJD , The Parts Operating Expense Under Service  in MIS Comparison is different from MIS Standard line LM26450. "+ServiceOperatingProfit+":"+ServiceOperatingProfit1);
    }
  }
  //Validate the Store Part of the Comparison
  async ValidateStoreForAncorageCDJRStore(){
    await this.getStoreSelector.click();    
    await this.page.waitForTimeout(2000);
    await this.page.locator("text=ALASKA").click();
    await this.page.locator('#stateSelect >> text=Anchorage CJD').click();    
    await this.getSelectStoresBUtton.click();      
    await this.getSubmit.click();     
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    const StoreRevenue=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[5]/td[3]').innerText();
    const StoreGross=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[6]/td[3]').innerText();
    const NetProfit=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[8]/td[3]').innerText();
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMIS1Standard.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector2.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.getSelectButton.click();    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/ul[1]/li[6]/span[2]/span[1]").click();
    await this.page.waitForTimeout(5000);
    const StoreRevenue1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[6]/div[2]/table[1]/tbody[1]/tr[2]/td[6]").innerText();
    const StoreGross1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[6]/div[2]/table[1]/tbody[1]/tr[3]/td[6]").innerText();
    const NetProfit1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[6]/div[2]/table[1]/tbody[1]/tr[68]/td[6]").innerText();
    if(StoreRevenue!=StoreRevenue1)
    {
      console.log("For Anchorage CJD , The Store Revenue Under Store  in MIS Comparison is different from MIS Standard line LM35600. "+StoreRevenue+":"+StoreRevenue1);
    }
    if(StoreGross!=StoreGross1)
    {
      console.log("For Anchorage CJD , The Store Gross Under Store  in MIS Comparison is different from MIS Standard line LM35605. "+StoreGross+":"+StoreGross1);
    }
    if(NetProfit!=NetProfit1)
    {
      console.log("For Anchorage CJD , The Store Profit Under Store  in MIS Comparison is different from MIS Standard line LM36450. "+NetProfit+":"+NetProfit1);
    }
  }
  // Validate the Sales in MIS Comparison Report
  async ValidateSalesForAncorageCDJRStore(){        
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMISComparison.click();
    await this.page.waitForLoadState('networkidle'); 
    await this.getStoreSelector.click();    
    await this.page.waitForTimeout(2000);
    await this.page.locator("text=ALASKA").click();
    await this.page.locator('#stateSelect >> text=Anchorage CJD').click();    
    await this.getSelectStoresBUtton.click();      
    await this.getSubmit.click();     
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(7000);
    const SalesSellingExpense=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[29]/td[3]').innerText();
    const SalesVariableProfit=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[30]/td[3]').innerText();
    const SalesSemiFixedExpense=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[32]/td[3]').innerText();
    const SalesDeptProfit=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[33]/td[3]').innerText();
    const SalesFixedExpense=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[34]/td[3]').innerText();
    const SalesTotalExpense=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[35]/td[3]').innerText();
    const SalesOperatingProfit=await this.page.locator('//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[36]/td[3]').innerText();
    const SalesNewUnitsA=await this.page.locator("//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[13]/td[3]").innerText();
    const SalesNewUnits=parseInt(SalesNewUnitsA);
    const SalesUsedUnitsA=await this.page.locator("//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[14]/td[3]").innerText();
    const SalesUsedUnits=parseInt(SalesUsedUnitsA);
    const TotalUnits=SalesNewUnits+SalesUsedUnits;
    const TotalRetailUnitsA=await this.page.locator("//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[15]/td[3]").innerText();
    const TotalRetailUnits=parseInt(TotalRetailUnitsA);
    const SalesFrontEndNewRetail=await this.page.locator("//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[17]/td[3]").innerText();
    const SalesFrontEndUsedRetail=await this.page.locator("//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[18]/td[3]").innerText();
    const SalesFINewRetail=await this.page.locator("//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[19]/td[3]").innerText();
    const SalesFIUsedRetail=await this.page.locator("//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[20]/td[3]").innerText();
    const DealsAverage=await this.page.locator("//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[21]/td[3]").innerText();
    const SalesGross=await this.page.locator("//body/div[1]/main[1]/div[4]/div[2]/table[1]/tbody[1]/tr[27]/td[3]").innerText();
    if(TotalUnits!=TotalRetailUnits)
    {
      console.log ("For Anchorage CDJR ,the retail units total doesnt match with summation of New+ Used UNits from MIS Comparison");
    }
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMIS1Standard.click(); 
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector2.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.getSelectButton.click();    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    const SalesSellingExpense1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[170]/td[6]').innerText();
    const SalesVariableProfit1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[172]/td[6]').innerText();
    const SalesSemiFixedExpense1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[200]/td[6]').innerText();
    const SalesDeptProfit1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[202]/td[6]').innerText();
    const SalesFixedExpense1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[204]/td[6]').innerText();
    const SalesTotalExpense1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[206]/td[6]').innerText();   
    const SalesOperatingProfit1=await this.page.locator('//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[207]/td[6]').innerText();
    const SalesFrontEndNewRetail1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[19]/td[6]").innerText();
    const SalesFrontEndUsedRetail1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[58]/td[6]").innerText();
    const SalesFINewRetail1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[101]/td[6]").innerText();
    const SalesFIUsedRetail1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[132]/td[6]").innerText();
    const DealsAverage1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[155]/td[6]").innerText();
    const SalesGross1=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[154]/td[6]").innerText();
     if(SalesSellingExpense!=SalesSellingExpense1)
    {
      console.log("For Anchorage CJD , The Selling Expense Under Sales  in MIS Comparison is different from MIS Standard line LM15750. "+SalesSellingExpense+":"+SalesSellingExpense1);
    }
    if(SalesVariableProfit!=SalesVariableProfit1)
    {
      console.log("For Anchorage CJD , The Variable profit Under Sales  in MIS Comparison is different from MIS Standard line LM15755. "+SalesVariableProfit+":"+SalesVariableProfit1);
    }
    if(SalesSemiFixedExpense!=SalesSemiFixedExpense1)
    {
      console.log("For Anchorage CJD , The Semi-Fixed Expense Under Sales  in MIS Comparison is different from MIS Standard line LM16130. "+SalesSemiFixedExpense+":"+SalesSemiFixedExpense1);
    }
    if(SalesDeptProfit!=SalesDeptProfit1)
    {
      console.log("For Anchorage CJD , The Sales Department Profit Under Sales  in MIS Comparison is different from MIS Standard line LM16140. "+SalesDeptProfit+":"+SalesDeptProfit1);
    }
    if(SalesFixedExpense!=SalesFixedExpense1)
    {
      console.log("For Anchorage CJD , The  Fixed Expense Under Sales  in MIS Comparison is different from MIS Standard line LM16300. "+SalesFixedExpense+":"+SalesFixedExpense1);
    }
    if(SalesTotalExpense!=SalesTotalExpense1)
    {
      console.log("For Anchorage CJD , The Total Expense Under Sales  in MIS Comparison is different from MIS Standard line LM16400. "+SalesTotalExpense+":"+SalesTotalExpense1);
    }
    if(SalesOperatingProfit!=SalesOperatingProfit1)
    {
      console.log("For Anchorage CJD , The Sales Operating Expense Under Sales in MIS Comparison is different from MIS Standard line LM16450. "+SalesOperatingProfit+":"+SalesOperatingProfit1);
    }
    if(SalesFrontEndNewRetail!=SalesFrontEndNewRetail1)
    {
      console.log("For Anchorage CJD , The Sales Front End New Retail- Under Sales in MIS Comparison is different from MIS Standard line LM10865. "+SalesFrontEndNewRetail+":"+SalesFrontEndNewRetail1);
    }
    if(SalesFrontEndUsedRetail!=SalesFrontEndUsedRetail1)
    {
      console.log("For Anchorage CJD , The Sales Front End Used Retail- Under Sales in MIS Comparison is different from MIS Standard line LM15155. "+SalesFrontEndUsedRetail+":"+SalesFrontEndUsedRetail1);
    }
    if(SalesFINewRetail!=SalesFINewRetail1)
    {
      console.log("For Anchorage CJD , The Sales FI New Retail- Under Sales in MIS Comparison is different from MIS Standard line LM15150/LM15290. "+SalesFINewRetail+":"+SalesFINewRetail1);
    }
    if(SalesFIUsedRetail!=SalesFIUsedRetail1)
    {
      console.log("For Anchorage CJD , The Sales FI Used Retail- Under Sales in MIS Comparison is different from MIS Standard line LM15150/LM15390. "+SalesFINewRetail+":"+SalesFINewRetail1);
    }
    if(SalesGross!=SalesGross1)
    {
      console.log("For Anchorage CJD , The Sales Sales Gross Under Sales in MIS Comparison is different from MIS Standard line LM15605. "+SalesGross+":"+SalesGross1);
    }
  }
}
module.exports = { MainStore };
