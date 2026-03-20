/**
 * Utility to scrape visible interactive elements dynamically,
 * extracting tag, attributes, selectors, and visible text.
 *
 * @param {import('playwright').Page} page
 * @returns {Promise<Array<Object>>} - List of element descriptors
 */
async function scrapeInteractiveElements(page) {
  const selectors = `button:visible, select:visible, input:visible, a:visible, [role="button"]:visible, [role="combobox"]:visible, [role="link"]:visible, [role="menuitem"]:visible`;
  const elements = await page.locator(selectors).elementHandles();
  const results = [];

  for (const el of elements) {
    try {
      const tagName = await el.evaluate((e) => e.tagName.toLowerCase());
      const id = await el.getAttribute("id");
      const name = await el.getAttribute("name");
      const ariaLabel = await el.getAttribute("aria-label");
      const dataTestId =
        (await el.getAttribute("data-testid")) ||
        (await el.getAttribute("data-test"));
      const classes = await el.getAttribute("class");
      const title = await el.getAttribute("title");
      const placeholder = await el.getAttribute("placeholder");
      const role = await el.getAttribute("role");
      const isDisabled = await el.evaluate(
        (e) => e.disabled || e.getAttribute("aria-disabled") === "true",
      );

      if (isDisabled) continue;

      let selector = "";

      if (id) selector = `#${id}`;
      else if (dataTestId) selector = `[data-testid="${dataTestId}"]`;
      else if (ariaLabel) selector = `${tagName}[aria-label="${ariaLabel}"]`;
      else if (name) selector = `${tagName}[name="${name}"]`;
      else if (classes)
        selector = `${tagName}.${classes.trim().split(/\s+/).join(".")}`;
      else selector = tagName;

      let visibleText = await el.evaluate((e) => e.textContent?.trim() || "");
      if (!visibleText && (tagName === "input" || tagName === "select")) {
        visibleText = await el.evaluate((e) => e.value || "");
      }

      results.push({
        tagName,
        id,
        name,
        ariaLabel,
        dataTestId,
        classes,
        title,
        placeholder,
        role,
        selector,
        visibleText,
      });
    } catch {
      // Ignore errors on element evaluation
    }
  }

  console.log("Scraped interactive elements:", results);
  return results;
}

module.exports = { scrapeInteractiveElements };
