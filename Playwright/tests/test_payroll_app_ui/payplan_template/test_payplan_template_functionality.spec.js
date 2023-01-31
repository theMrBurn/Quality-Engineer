// Payplan Template

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayplanTemplate } = require("./payplan_template.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payplan Template @func", () => {
  test("Navigate to Payplan Template and validate Job input functionality", async ({
    browser,
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    // get Job input box
    await payplanTemplate.getJobInput();

    // validate jobs can be input
    await payplanTemplate.inputJob("Building Manager");

    // confirm on Grid that item above was chosen
    await page.locator('span:has-text("Building Manager (65067)")');

    //delete input
    await payplanTemplate.clickDeleteInput();

    // validate 2nd job can be input
    await payplanTemplate.inputJob("Software Engineer");

    // confirm on Grid that item above was chosen, once validated delete
    await page.locator('span:has-text("Software Engineer (65083)")');
    await payplanTemplate.clickDeleteInput();
  });

  test("Navigate to Payplan Template and validate Department input functionality", async ({
    browser,
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    // get Job input box
    await payplanTemplate.getDepartmentInput();

    // validate Department can be input
    await payplanTemplate.inputDepartment("Parts");

    // confirm on Grid that item above was chosen
    await page.locator('span:has-text("Parts (PARTSS)")');
    await payplanTemplate.clickDeleteInput();

    // validate 2nd Department can be input
    await payplanTemplate.inputDepartment("Service");

    // confirm on Grid that item above was chosen
    await page.locator('span:has-text("Service (SERVIC)")');
    await payplanTemplate.clickDeleteInput();
  });

  test("Navigate to Payplan Template and validate State input functionality", async ({
    browser,
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    // get State input box
    await payplanTemplate.getStateInput();

    // validate State can be input
    await payplanTemplate.inputState("Oregon");

    // confirm on Grid that item above was chosen
    await page.locator('span:has-text("Oregon (OR)")');
    await payplanTemplate.clickDeleteInput();

    // since this test was written a DB change may have happened and deleted data for WA state.
    // // validate 2nd Department can be input
    // await payplanTemplate.inputState("Washington");

    // // confirm on Grid that item above was chosen
    // await page.locator('span:has-text("Washington (WA)")');
    // await payplanTemplate.clickDeleteInput();
  });

  test("Navigate to Payplan Template and validate known Position Types input functionality", async ({
    browser,
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    //Bonus Only
    await payplanTemplate.inputPositionTypeDropdown();
    await page.locator("#PositionTypeList_listbox >> text=Bonus Only").click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Combined MIS
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Combined MIS")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Hourly
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Hourly >> nth=0")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Hourly Offset
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Hourly Offset")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Hourly Plus
    await payplanTemplate.inputPositionTypeDropdown();
    await page.locator("#PositionTypeList_listbox >> text=Hourly Plus").click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Individual F&I
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Individual F&I >> nth=1")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Individual F&I Grid
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Individual F&I Grid")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Individual F&I Penetration
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Individual F&I Penetration")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Individual F&I Tier
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Individual F&I Tier")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    // //Individual Gross Profit
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Individual Gross Profit")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Individual RAP
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Individual RAP")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Individual Sales
    // test.fixme("Individual sales needs a data test tag or some other label for this test to pass");
    // await payplanTemplate.inputPositionTypeDropdown();
    // await page.locator('#PositionTypeList_listbox >> text=Individual Sales').click();
    // await payplanTemplate.deletePositionTypeDropdown();

    //Individual Sales Unit Guarantee
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator(
        "#PositionTypeList_listbox >> text=Individual Sales Unit Guarantee"
      )
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Interim
    await payplanTemplate.inputPositionTypeDropdown();
    await page.locator("#PositionTypeList_listbox >> text=Interim").click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Production
    await payplanTemplate.inputPositionTypeDropdown();
    await page.locator("#PositionTypeList_listbox >> text=Production").click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Single MIS
    await payplanTemplate.inputPositionTypeDropdown();
    await page.locator("#PositionTypeList_listbox >> text=Single MIS").click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Store F&I
    await payplanTemplate.inputPositionTypeDropdown();
    await page.locator("#PositionTypeList_listbox >> text=Store F&I").click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Store Gross Profit
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Store Gross Profit")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Store Parts Gross
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Store Parts Gross")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Store RAP
    await payplanTemplate.inputPositionTypeDropdown();
    await page.locator("#PositionTypeList_listbox >> text=Store RAP").click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Team Gross Profit
    await payplanTemplate.inputPositionTypeDropdown();
    await page
      .locator("#PositionTypeList_listbox >> text=Team Gross Profit")
      .click();
    await payplanTemplate.deletePositionTypeDropdown();

    //Team RAP
    await payplanTemplate.inputPositionTypeDropdown();
    await page.locator("#PositionTypeList_listbox >> text=Team RAP").click();
    await payplanTemplate.deletePositionTypeDropdown();
  });

  test("Navigate to Payplan Template and validate known PayPlan Types input functionality", async ({
    browser,
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    //Base
    await payplanTemplate.inputPlanTypeDropdown();
    await page.locator("text=Base").first().click();
    await payplanTemplate.deletePlanTypeDropdown();

    //Contract Rate
    await payplanTemplate.inputPlanTypeDropdown();
    await page.locator("text=Contract Rate").first().click();
    await payplanTemplate.deletePlanTypeDropdown();

    //Draw
    await payplanTemplate.inputPlanTypeDropdown();
    await page.locator("text=Draw").first().click();
    await payplanTemplate.deletePlanTypeDropdown();

    //Guarantee
    await payplanTemplate.inputPlanTypeDropdown();
    await page.locator("text=Guarantee >> nth=3").click();
    await payplanTemplate.deletePlanTypeDropdown();

    //Interim
    await payplanTemplate.inputPlanTypeDropdown();
    await page.locator("text=Interim >> nth=1").click();
    await payplanTemplate.deletePlanTypeDropdown();

    //Interim Bonus
    await payplanTemplate.inputPlanTypeDropdown();
    await page.locator("text=Interim Bonus").click();
    await payplanTemplate.deletePlanTypeDropdown();

    //Maximum Amount
    await payplanTemplate.inputPlanTypeDropdown();
    await page.locator("text=Maximum Amount").click();
    await payplanTemplate.deletePlanTypeDropdown();

    //Special Guarantee
    await payplanTemplate.inputPlanTypeDropdown();
    await page.locator("text=Special Guarantee").click();
    await payplanTemplate.deletePlanTypeDropdown();

    //Split Base
    await payplanTemplate.inputPlanTypeDropdown();
    await page.locator("text=Split Base").click();
    await payplanTemplate.deletePlanTypeDropdown();

    //Split Draw
    await payplanTemplate.inputPlanTypeDropdown();
    await page.locator("text=Split Draw").click();
    await payplanTemplate.deletePlanTypeDropdown();

    //Vehicle Allowance
    await payplanTemplate.inputPlanTypeDropdown();
    await page.locator("text=Vehicle Allowance").click();
    await payplanTemplate.deletePlanTypeDropdown();
  });

  test("Navigate to Payplan Template and validate known Template Names input functionality", async ({
    browser,
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    //SM - Tech - Sch 70
    await payplanTemplate.inputTemplateNameDropdown("Tech - Sch 70");
    await page.locator('li[role="option"]:has-text("Tech - Sch 70")').click();
    await page.locator('span:has-text("Tech - Sch 70")');

    //SM - Sales Rep - Semi-Monthly COM
    await payplanTemplate.inputTemplateNameDropdown(
      "SM - Sales Rep - Semi-Monthly COM"
    );
    await page
      .locator("text=SM - Sales Rep - Semi-Monthly COM >> nth=0")
      .click();
    await page.locator('span:has-text("SM - Sales Rep - Semi-Monthly COM")');

    //SM - Sales Rep - Monthly COM
    await payplanTemplate.inputTemplateNameDropdown(
      "SM - Sales Rep - Monthly COM"
    );
    await page.locator("text=SM - Sales Rep - Monthly COM >> nth=0").click();
    await page.locator('span:has-text("SM - Sales Rep - Monthly COM")');

    //SM - Tech - Body Shop
    await payplanTemplate.inputTemplateNameDropdown("Tech - Body Shop");
    await page
      .locator('li[role="option"]:has-text("Tech - Body Shop")')
      .click();
    await page.locator('span:has-text("Tech - Body Shop")');

    //SM - Tech - RTH Booked
    await payplanTemplate.inputTemplateNameDropdown("Tech - RTH Booked");
    await page
      .locator('li[role="option"]:has-text("Tech - RTH Booked")')
      .click();
    await page.locator('span:has-text("Tech - RTH Booked")');

    //SM - Tech - RTH Closed
    await payplanTemplate.inputTemplateNameDropdown("Tech - RTH Closed");
    await page
      .locator('li[role="option"]:has-text("Tech - RTH Closed")')
      .click();
    await page.locator('span:has-text("Tech - RTH Closed")');

    //SM - Sales Rep - Monthly COM - Unit Gua
    await payplanTemplate.inputTemplateNameDropdown(
      "Sales Rep - Monthly COM - Unit Gua"
    );
    await page
      .locator(
        'li[role="option"]:has-text("Sales Rep - Monthly COM - Unit Gua")'
      )
      .click();
    await page.locator('span:has-text("Sales Rep - Monthly COM - Unit Gua")');

    //SM - Sales Rep - Semi-Monthly COM - Unit Gua
    await payplanTemplate.inputTemplateNameDropdown(
      "Sales Rep - Semi-Monthly COM - Unit Gua"
    );
    await page
      .locator(
        'li[role="option"]:has-text("Sales Rep - Semi-Monthly COM - Unit Gua")'
      )
      .click();
    await page.locator(
      'span:has-text("Sales Rep - Semi-Monthly COM - Unit Gua")'
    );

    //Service Advisor ADS
    await payplanTemplate.inputTemplateNameDropdown("Service Advisor ADS");
    await page
      .locator('li[role="option"]:has-text("Service Advisor ADS")')
      .click();
    await page.locator('span:has-text("Service Advisor ADS")');

    //F&I Grid Plan Template
    await payplanTemplate.inputTemplateNameDropdown("F&I Grid Plan Template");
    await page
      .locator('li[role="option"]:has-text("F&I Grid Plan Template") >> nth=0')
      .click();
    await page.locator('span:has-text("F&I Grid Plan Template")');

    //SM - Tech - RTH Skill Cost Booked
    await payplanTemplate.inputTemplateNameDropdown(
      "Tech - RTH Skill Cost Booked"
    );
    await page
      .locator('li[role="option"]:has-text("Tech - RTH Skill Cost Booked")')
      .click();
    await page.locator('span:has-text("Tech - RTH Skill Cost Booked")');

    //SM - Tech - RTH Skill Cost Closed
    await payplanTemplate.inputTemplateNameDropdown(
      "Tech - RTH Skill Cost Closed"
    );
    await page
      .locator('li[role="option"]:has-text("Tech - RTH Skill Cost Closed")')
      .click();
    await page.locator('span:has-text("Tech - RTH Skill Cost Closed")');

    //Sales Rep - Always COM
    await payplanTemplate.inputTemplateNameDropdown(
      "WK - Sales Rep - Always COM"
    );
    await page
      .locator('li[role="option"]:has-text("Sales Rep - Always COM")')
      .click();
    await page.locator('span:has-text("Sales Rep - Always COM")');

    //Sales Rep - Hourly Offset
    await payplanTemplate.inputTemplateNameDropdown(
      "Sales Rep - Hourly Offset"
    );
    await page.locator('text="Sales Rep - Hourly Offset"').click();
    await page.locator('span:has-text("Sales Rep - Hourly Offset")');

    //Sales Rep - Hourly Plus
    await payplanTemplate.inputTemplateNameDropdown("Sales Rep - Hourly Plus");
    await page.locator('text="Sales Rep - Hourly Plus"').click();
    await page.locator('span:has-text("Sales Rep - Hourly Plus")');
  });

  test("Navigate to Payplan Template and validate known PayPlan Pay Rate Types input functionality", async ({
    browser,
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    //Commission
    await payplanTemplate.inputPayRateTypeTriangle();
    await page.locator("text=Commission (CM)").first().click();
    await payplanTemplate.deletePayRateType();

    //Flat Rate
    await payplanTemplate.inputPayRateTypeTriangle();
    await page.locator("text=Flat Rate (FL)").first().click();
    await payplanTemplate.deletePayRateType();

    //Hourly
    await payplanTemplate.inputPayRateTypeTriangle();
    await page.locator("text=Hourly (HR)").first().click();
    await payplanTemplate.deletePayRateType();

    //Salary
    await payplanTemplate.inputPayRateTypeTriangle();
    await page.locator("text=Salary (SL)").first().click();
    await payplanTemplate.deletePayRateType();
  });

  test("Navigate to Payplan Template and click Add PayPlan, basic smoke check of functionality", async ({
    browser,
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    await payplanTemplate.clickAddTemplate();
    await expect(page).toHaveURL(
      "/PayPlan/PlanDetails?id=0&payPlanUsage=Template"
    );

    //click save
    await payplanTemplate.clickSaveButton(); // no success message alert to use as verification of save

    //click back
    await payplanTemplate.clickBackButton();
    await expect(page).toHaveURL("/PayPlan/PayPlanTemplate");
  });
});
