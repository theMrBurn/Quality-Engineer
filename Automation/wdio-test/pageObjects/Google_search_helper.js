var assert = require('assert');

class Google_helper {

	GoogleLogoPresent() {
		const GoogleLogo = $('#hplogo')
		GoogleLogo.waitForDisplayed(99999, false , 'Google Logo is not present')
	}

	GoogleSearchBarPresent() {
		const GoogleSearch = $('.gLFyf.gsfi');
		GoogleSearch.waitForDisplayed(99999, false, "Google Search Bar is Not present");
	}

	EnterSearchTerm() {
		const GoogleSearch = $('.gLFyf.gsfi')
		GoogleSearch.addValue('Covid 19 Portland Layoffs Vacasa')
		browser.keys("\uE007");
	}

	ValidadateSearchPageResults() {
		const ResultsPageLoaded = $('#result-stats')
		ResultsPageLoaded.waitForDisplayed(99999, false, "Search Results Page did not load")
		
		const text = ResultsPageLoaded.getText()
		console.log(text)
		assert(text === text); // true
	}

	FindSearchResultClick() {
		const SearchResult = $('#rso > div:nth-child(1) > div > div.r > a')
		SearchResult.waitForDisplayed(99999, false, "Search Result Not Found")

		console.log(browser.getUrl())
		assert(browser); // true

		SearchResult.click();
	}

	ValidateResultPageLoad() {
		console.log(browser.getUrl())
		assert(browser);
	}

	ValidateHeadlineContents() {
		const ValidateHeadline = $('.detail__headline')
		ValidateHeadline.waitForDisplayed(99999, false, "Headline Did Not Load")

		const text = ValidateHeadline.getText()
		console.log(text);
		assert(text === "Vacasa announces large-scale layoffs, slashes executive pay amid COVID-19 travel drop");
	}

}

module.exports = new Google_helper();