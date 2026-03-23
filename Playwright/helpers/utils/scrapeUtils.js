/**
 * Utility to scrape visible interactive elements dynamically,
 * extracting selector keys and attributes for fallback use.
 *
 * @param {import('playwright').Page | import('playwright').Frame} context - Page or iframe/frame to scrape
 * @returns {Promise<{ results: Array<Object>, locatorMap: Map<string,string> }>}
 */
async function scrapeInteractiveElements(context) {
  const selectors = `button:visible, select:visible, input:visible, a:visible, [role="button"]:visible, [role="combobox"]:visible, [role="link"]:visible, [role="menuitem"]:visible`;
  const elements = await context.locator(selectors).elementHandles();

  // Concurrently fetch all attributes per element
  const results = await Promise.all(
    elements.map(async (el, index) => {
      try {
        const [tagName, id, ariaLabel, dataTestId, name, classes, visibleText] =
          await Promise.all([
            el.evaluate((e) => e.tagName.toLowerCase()),
            el.getAttribute("id"),
            el.getAttribute("aria-label"),
            (async () => {
              const testId1 = await el.getAttribute("data-testid");
              if (testId1) return testId1;
              return el.getAttribute("data-test");
            })(),
            el.getAttribute("name"),
            el.getAttribute("class"),
            el.textContent(),
          ]);

        let key;
        if (id) key = id;
        else if (ariaLabel) key = ariaLabel.replace(/\s+/g, "_").toLowerCase();
        else if (dataTestId) key = dataTestId;
        else if (name) key = name.replace(/\s+/g, "_").toLowerCase();
        else key = `${tagName}_${index}`;

        let selector = "";
        if (id) selector = `#${id}`;
        else if (ariaLabel) selector = `${tagName}[aria-label="${ariaLabel}"]`;
        else if (dataTestId) selector = `[data-testid="${dataTestId}"]`;
        else if (name) selector = `${tagName}[name="${name}"]`;
        else if (classes)
          selector = `${tagName}.${classes.trim().split(/\s+/).join(".")}`;
        else selector = tagName;

        return {
          key,
          tagName,
          selector,
          ariaLabel,
          dataTestId,
          name,
          classes,
          visibleText: visibleText ? visibleText.trim() : "",
        };
      } catch {
        return null;
      }
    }),
  );

  const filteredResults = results.filter((r) => r !== null);
  console.log(`Scraped ${filteredResults.length} interactive elements.`);

  const locatorMap = new Map(
    filteredResults.map((el) => [el.key, el.selector]),
  );
  return { results: filteredResults, locatorMap };
}

module.exports = { scrapeInteractiveElements };
