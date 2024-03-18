afterEach(async () => {
  // Get the current test state
  const testState = expect.getState();

  // Check if a test just ran and if it failed
  if (testState.currentTestName && testState.failedExpectCount > 0) {
    // Define screenshot path
    const screenshotPath = `../test_results/screenshots/${testState.currentTestName.replace(
      / /g,
      "_",
    )}.png`;

    // Take the screenshot and save it to the defined path
    await page.screenshot({ path: screenshotPath });
  }
});
