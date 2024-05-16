class NetworkInterceptor {
  static interceptedRequests = [];
  static pageClosed = false;

  static async interceptRequests(page) {
    page.on("close", () => {
      NetworkInterceptor.pageClosed = true;
    });

    await page.route("**/*", (route) => {
      if (NetworkInterceptor.pageClosed) return;

      const requestData = {
        url: route.request().url(),
        method: route.request().method(),
        postData: route.request().postData(),
      };

      route.continue().then(async () => {
        const response = await route.request().response();
        if (response) {
          const responseDetails = {
            status: response.status(),
            headers: response.headers(),
          };

          if (![301, 302, 303, 307, 308].includes(response.status())) {
            responseDetails.body = await response.text();
          }
          NetworkInterceptor.interceptedRequests.push({
            request: requestData,
            response: responseDetails,
          });
        }
      });
    });
  }

  static async closeBrowser(page) {
    await page.close();
  }
}

module.exports = NetworkInterceptor;
