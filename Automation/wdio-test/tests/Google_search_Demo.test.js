//Simple Google Search demo to povide as a demo for my Resume. Headless option has been removed from the wdio.conf.js for the purpose of this demo. -Sean

var Google_helper = require("../pageObjects/Google_search_helper.js");


describe('Visit Google.com, enter a search, find a result, click the result and validate result once that page has loaded', () => {

	before(async() => {
		await browser.url("http://Google.com");
	}) 


      describe('Step 1 - Visit Google.com', () => {

            it('Validates Google.com has loaded', () => {
                  Google_helper.GoogleLogoPresent();
            });

            it('Validate Search Bar is pesent', () => {
                  Google_helper.GoogleSearchBarPresent();
            });
      });


      describe('Step 2 - Enter Search Term "Covid 19 Portland Layoffs', () => {

            it('Validates Search Results Page has Loaded', () => {
                  Google_helper.EnterSearchTerm();
                  Google_helper.ValidadateSearchPageResults();
            });
      });

      describe('Step 3 - Find Desired Search result and click result, validate that page has loaded and the Headline is the desired result', () => {

            it('Desired Search Result found, clicked, and that page has loaded and displays required results', () => {
                  Google_helper.FindSearchResultClick();
                  Google_helper.ValidateResultPageLoad();
                  Google_helper.ValidateHeadlineContents();
            });
      });

});
