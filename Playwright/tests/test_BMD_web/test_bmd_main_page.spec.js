// BMD Web

// Import the required dependencies
const { browser, test, expect } = require("@playwright/test");
const { BMDMainPage } = require("./bmd_main_page.js");


test.describe
  .serial("Layout validation for BMD main page", () => {
  test.slow();

  test("BMD Main Page - Elements Validation", async ({ browser, page }) => {
    const bmdMainPage = new BMDMainPage(page);
    await bmdMainPage.goto();

    try {
      //Title
      await bmdMainPage.checkElementVisibility("mainTitle");

      //For Review Title
      await bmdMainPage.checkElementVisibility("forReviewTitle");

      //For Review element count
      await bmdMainPage.checkElementVisibility("forReviewElementCount");

      const forReviewCount = await bmdMainPage.locators.forReviewTableElement().count();
      await bmdMainPage.checkElementText("forReviewElementCount",forReviewCount.toString());

      //For Review Expand Icon
      await bmdMainPage.checkElementVisibility("forReviewExpandButton");

      //For Review Item - Table Name

      await bmdMainPage.checkElementVisibility("forReviewFirstName");

      //For Review Item - Submitted By
      await bmdMainPage.checkElementText("forReviewFirstSubmittedByText","Submitted by");

      await bmdMainPage.checkElementVisibility("forReviewFirstSubmittedByName");

      //For Review Item - Submission Date

      await bmdMainPage.checkElementVisibility("forReviewFirstSubmittedDate");

      //For Review Item - Status Label

      await bmdMainPage.checkElementVisibility("forReviewFirstStatusLabel");
      //For Review Item - Review Button
      await bmdMainPage.checkElementVisibility("forReviewFirstReviewButton");


      //Your Submissions Title
      await bmdMainPage.checkElementVisibility("yourSubmissionTitle");

      //Your Submissions element count
      await bmdMainPage.checkElementVisibility("yourSubmissionElementCount");

      const yourSubmissionCount = await bmdMainPage.locators.yourSubmissionTableElement().count();
      await bmdMainPage.checkElementText("yourSubmissionElementCount",yourSubmissionCount.toString());

      //Your Submissions Expand Icon
      await bmdMainPage.checkElementVisibility("yourSubmissionExpandButton");

      //Your Submissions Item - Table Name
      await bmdMainPage.checkElementVisibility("yourSubmissionFirstName");

      //Your Submissions Item - Submitted By / Reviewed by
      await bmdMainPage.checkElementText("yourSubmissionFirstSubmittedByText","by");
      await bmdMainPage.checkElementVisibility("yourSubmissionFirstSubmittedByName");

      //Your Submissions Item - Submission Date
      await bmdMainPage.checkElementVisibility("yourSubmissionFirstSubmittedDate");

      //Your Submissions Item - Status Label
      await bmdMainPage.checkElementVisibility("yourSubmissionFirstStatusLabel");

      //Your Submissions Item - Review Button
      await bmdMainPage.checkElementVisibility("yourSubmissionFirstReviewButton");

      
      //All Data Tables Title
      await bmdMainPage.checkElementVisibility("allDataTablesTitle");
      
      //All Data Tables
      await bmdMainPage.checkElementVisibility("allDataTablesTable");

      //Data Table Headers
      await bmdMainPage.checkElementText("allDataTablesHeaderName","Table Name");
      await bmdMainPage.checkElementText("allDataTablesHeaderId","Table ID");
      await bmdMainPage.checkElementText("allDataTablesHeaderDescription","Description");
      await bmdMainPage.checkElementText("allDataTablesHeaderLastUpdate","Last Update");  


    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("BMD Main Page - Header and Footer Validation", async ({ browser, page }) => {
    const bmdMainPage = new BMDMainPage(page);
    await bmdMainPage.goto();

    try {
      //Header
      await bmdMainPage.checkElementVisibility("bmdLogo");
      await bmdMainPage.checkElementVisibility("userMenu");
      await bmdMainPage.checkElementVisibility("dataTablesMenuButton");
      await bmdMainPage.checkElementVisibility("auditLogsMenuButton");

      //Footer
      await bmdMainPage.checkElementVisibility("supportButton");
      await bmdMainPage.checkElementVisibility("buildAndVersion");

      
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});

test.describe
  .serial("Data Validation for the All Tables component of BMD main page", () => {
  test.slow();

});
