class AtlasLogin {
  async signInHelper(page) {
    try {
      const signInNotice = await page.waitForSelector(":text('Please Sign InSign InHaving')");
      if (signInNotice) {
        const signInButton = await page.locator('//*[@id="root"]/div/div[3]/div/div/button');
        if (signInButton) {
          await signInButton.click();
          await page.waitForLoadState("networkidle");
        }
      }
    } catch (err) {
      console.log("The element did not appear.");
    }
  }
}

module.exports = AtlasLogin;