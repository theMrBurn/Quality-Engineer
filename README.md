TODO: UPDATE FOR PLAYWRIGHT INSTRUCTIONS

---

## Automated Quality Assurance Test Repository

This is where all of the test automation created and maintained by the Software Quality Assurance team for Lithia Motors,internal development tools will live.

The purpose of this project and code Repository is to have an area outside of the Application code base where test engineers can add, edit, maintain and develop tools that will test variuous apps being developed for Litha Motors.

Currently, the applications or Projects being used by the test frameworks in this Repo are Allpay, and Performace Dashboard

Beyond this being a general Readme for the test Repository, it will also have technical onboarding instructions for any engineering team member that wishes to use these tools.

---

## Tools used by Software Quality Engineers

#TODO - update Postman / Newman local install instructions | We may only use Postman for manual testing as Playwright has the libraries to run REST API test automation as part of its boilerplate framework.

---

## Playwright | Functional UI, End-to-End and Rest API test automation framework

Playwright | https://playwright.dev/docs/intro | - To install, it should be as simple as having NVM/NPM present on your developer machine, Windows or Mac, cloning this repo and running `npm clean-install` and then `npm i` in the directory you wish to store and run this automation.

Additional help getting started can be found by visiting the Playwright documentation URL above.

---

to run the tests, navigate to `/Playwright` in your terminal and run command `npx playwright test`

Upon success, you should see Chrome launch, and run through the test steps

Upon completion, the tests should show output of the Spec reporter test results

The tests run Headless out of the box. To run "Headed" tests (actually seeing the browser run the tests) its as simpe as adding `--headed` to your run command ex. `npx playwright test --headed`

If you want to run individual tests, add the file to the command ex. `npx playwright test --headed test_example.spec.js`

For deeper CLI command options for Playwright, visit https://playwright.dev/docs/cli.  

---
Wrighting tests for Playwright

For UI functional and end-to-end tests, we will follow the Page Object Model pattern of test development. 

All page objects will be organized by endpoint with each endpoint having its own corresponding directory folder.

All tests will be organized by endpoint in which the test is being implemented against. 

    Example Page object:

    `// models/Search.js
    class SearchPage {
    /**
    * @param {import('playwright').Page} page 
    */
    constructor(page) {
        this.page = page;
    }
    async navigate() {
        await this.page.goto('https://bing.com');
    }
    async search(text) {
        await this.page.fill('[aria-label="Enter your search term"]', text);
        await this.page.press('[aria-label="Enter your search term"]', 'Enter');
    }
    }
    module.exports = { SearchPage };`

You pull in that `SearchPage()` by simply pulling it in via the CONST path for the test. This will allow tests to use POMs across the board, instead of being tied directly to the test in which it is ran. There will be cases where a complex test may traverse multiple pages to accomplish a use case.


For Rest API tests, we will follow a similar pattern but it will be organized as Request Objects. They are functionally identical to Page Objects, but since the API tests follow direct requests to the back-end, we just call them request objects.

