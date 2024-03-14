afterEach(async () => {
  if (expect.getState().currentTestName && expect.getState().failedExpectCount > 0) {
    await page.screenshot({
      path: `./screenshots/${expect.getState().currentTestName.replace(/ /g, '_')}.png`
    });
  }
});