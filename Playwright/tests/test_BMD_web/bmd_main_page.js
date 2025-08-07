const { expect } = require('playwright/test');

class BMDMainPage {
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;

        this.locators = {
            //Header
            bmdLogo: () => this.page.getByText('BMD Application'),
            userMenu: () => this.page.getByText('Hi, '),

            //Footer
            supportButton: () => this.page.getByText('Support'),
            buildAndVersion: () => this.page.locator('.css-fesxhu-EA_Footer-footerTitle'),

            //Menu
            dataTablesMenuButton: () => this.page.locator('#menu-btn-0'),
            auditLogsMenuButton: () => this.page.locator('#menu-btn-1'),

            //Title
            mainTitle: () => this.page.getByRole('heading', { name: 'Data Tables', exact: true }),

            //For Review Section
            forReviewTitle: () => this.page.getByText('For Review'),
            forReviewElementCount: () => this.page.locator('#for-review-accordion_0-summary .MuiChip-label p'),
            forReviewExpandButton: () => this.page.locator('#for-review-accordion_0-summary .MuiAccordionSummary-expandIconWrapper'),
            forReviewTableElement: () => this.page.locator('#for-review-accordion_0-details.MuiAccordionDetails-root div.MuiCard-root'),
            forReviewFirstName: () => this.page.locator('#for-review-accordion_0-details.MuiAccordionDetails-root div.MuiCard-root:first-child > p'),
            forReviewFirstSubmittedByText: () => this.page.locator('#for-review-accordion_0-details.MuiAccordionDetails-root div.MuiCard-root:first-child div:nth-child(2) div:nth-child(1) > p'),
            forReviewFirstSubmittedByName: () => this.page.locator('#for-review-accordion_0-details.MuiAccordionDetails-root div.MuiCard-root:first-child div:nth-child(2) div:nth-child(1) div'),
            forReviewFirstSubmittedDate: () => this.page.locator('#for-review-accordion_0-details.MuiAccordionDetails-root div.MuiCard-root:first-child div:nth-child(2) [class*=infoDate]'),
            forReviewFirstStatusLabel: () => this.page.locator('#for-review-accordion_0-details.MuiAccordionDetails-root div.MuiCard-root:first-child .MuiChip-label'),
            forReviewFirstReviewButton: () => this.page.locator('#for-review-accordion_0-details.MuiAccordionDetails-root div.MuiCard-root:first-child button'),

            //Your Submissions Section
            yourSubmissionTitle: () => this.page.getByText('Your Submissions'),
            yourSubmissionElementCount: () => this.page.locator('#for-review-accordion_1-summary .MuiChip-label p'),
            yourSubmissionExpandButton: () => this.page.locator('#for-review-accordion_1-summary .MuiAccordionSummary-expandIconWrapper'),
            yourSubmissionTableElement: () => this.page.locator('#for-review-accordion_1-details.MuiAccordionDetails-root div.MuiCard-root'),
            yourSubmissionFirstName: () => this.page.locator('#for-review-accordion_1-details.MuiAccordionDetails-root div.MuiCard-root:first-child > p'),
            yourSubmissionFirstSubmittedByText: () => this.page.locator('#for-review-accordion_1-details.MuiAccordionDetails-root div.MuiCard-root:first-child div:nth-child(2) div:nth-child(1) > p'),
            yourSubmissionFirstSubmittedByName: () => this.page.locator('#for-review-accordion_1-details.MuiAccordionDetails-root div.MuiCard-root:first-child div:nth-child(2) div:nth-child(1) div'),
            yourSubmissionFirstSubmittedDate: () => this.page.locator('#for-review-accordion_1-details.MuiAccordionDetails-root div.MuiCard-root:first-child div:nth-child(2) [class*=infoDate]'),
            yourSubmissionFirstStatusLabel: () => this.page.locator('#for-review-accordion_1-details.MuiAccordionDetails-root div.MuiCard-root:first-child .MuiChip-label'),
            yourSubmissionFirstReviewButton: () => this.page.locator('#for-review-accordion_1-details.MuiAccordionDetails-root div.MuiCard-root:first-child button'),

            //All Data Tables Section
            allDataTablesTitle: () => this.page.getByText('All Data Tables'),
            allDataTablesTable: () => this.page.locator('.MuiDataGrid-root'),
            allDataTablesHeaderName: () => this.page.locator('.MuiDataGrid-columnHeader:nth-child(2)  .MuiDataGrid-columnHeaderTitle'),
            allDataTablesHeaderId: () => this.page.locator('.MuiDataGrid-columnHeader:nth-child(3)  .MuiDataGrid-columnHeaderTitle'),
            allDataTablesHeaderDescription: () => this.page.locator('.MuiDataGrid-columnHeader:nth-child(4)  .MuiDataGrid-columnHeaderTitle'),
            allDataTablesHeaderLastUpdate: () => this.page.locator('.MuiDataGrid-columnHeader:nth-child(5)  .MuiDataGrid-columnHeaderTitle'),

        };
    }

    // Navigate to endpoint
    async goto() {
        await this.page.goto("/");
        await this.page.waitForLoadState("load");
    }

    // get page elements
    async checkElementVisibility(locatorName) {
        await this.page.waitForLoadState("networkidle");
        const locatorFunction = this.locators[locatorName];

        try {
            const element = await locatorFunction().first();
            await expect(element).toBeVisible();
        } catch (originalError) {
            const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
            throw new Error(errorMessage);
        }
    }

    // check text on page elements
    async checkElementText(locatorName, expectedText) {
        await this.page.waitForLoadState("networkidle");
        const locatorFunction = this.locators[locatorName];

        try {
            const element = await locatorFunction().first();
            await expect(element).toContainText(expectedText);
        } catch (originalError) {
            const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
            throw new Error(errorMessage);
        }
    }

    /// interact with elements
    async clickElement(locatorName) {
        const locatorFunction = this.locators[locatorName];

        try {
            const element = await locatorFunction().first();
            await element.click();
        } catch (originalError) {
            const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
            throw new Error(errorMessage);
        }
    }
}
module.exports = { BMDMainPage };