/**
 * Utility to scrape visible interactive elements dynamically,
 * extracting selector keys and attributes for fallback use.
 *
 * @param {import('playwright').Page} page
 * @returns {Promise<{ results: Array<Object>, locatorMap: Map<string,string> }>}
 */
async function scrapeInteractiveElements(page) {
  const selectors = `button:visible, select:visible, input:visible, a:visible, [role="button"]:visible, [role="combobox"]:visible, [role="link"]:visible, [role="menuitem"]:visible`;
  const elements = await page.locator(selectors).elementHandles();
  const results = [];
  const locatorMap = new Map();

  for (const el of elements) {
    try {
      const tagName = await el.evaluate((e) => e.tagName.toLowerCase());
      const id = await el.getAttribute("id");
      const ariaLabel = await el.getAttribute("aria-label");
      const dataTestId = (await el.getAttribute("data-testid")) || (await el.getAttribute("data-test"));
      const name = await el.getAttribute("name");
      const classes = await el.getAttribute("class");

      let key;
      if (id) key = id;
      else if (ariaLabel) key = ariaLabel.replace(/\s+/g, '_').toLowerCase();
      else if (dataTestId) key = dataTestId;
      else if (name) key = name.replace(/\s+/g, '_').toLowerCase();
      else key = `${tagName}_${results.length}`;

      let selector = "";
      if (id) selector = `#${id}`;
      else if (ariaLabel) selector = `${tagName}[aria-label="${ariaLabel}"]`;
      else if (dataTestId) selector = `[data-testid="${dataTestId}"]`;
      else if (name) selector = `${tagName}[name="${name}"]`;
      else if (classes) selector = `${tagName}.${classes.trim().split(/\s+/).join('.')}`;
      else selector = tagName;

      locatorMap.set(key, selector);

      const visibleText = (await el.textContent())?.trim() || "";

      results.push({
        key,
        tagName,
        selector,
        ariaLabel,
        dataTestId,
        name,
        classes,
        visibleText,
      });
    } catch {
      // Ignore errors
    }
  }

  console.log(`Scraped ${results.length} interactive elements.`);
  return { results, locatorMap };
}

module.exports = { scrapeInteractiveElements };