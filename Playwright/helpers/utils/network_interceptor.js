class NetworkInterceptor {
  static interceptedRequests = [];
  static pageClosed = false;

  static async interceptRequests(page) {
    // Handle page close event
    page.on("close", () => {
      NetworkInterceptor.pageClosed = true;
    });

    await page.route("**/*", (route) => {
      if (NetworkInterceptor.pageClosed) {
        return; // Skip further processing if the page is closed
      }

      const requestData = {
        url: route.request().url(),
        method: route.request().method(),
        postData: route.request().postData(),
        //headers: route.request().headers(),
      };

      NetworkInterceptor.logRequestData(requestData);

      route.continue().then(async () => {
        const response = await route.request().response();
        if (response) {
          const responseDetails = {
            status: response.status(),
            headers: response.headers(),
            body: await response.text(),
          };

          NetworkInterceptor.logResponseData(responseDetails);

          NetworkInterceptor.storeRequestResponsePair(
            requestData,
            responseDetails,
          );

          NetworkInterceptor.checkResponseStatus(responseDetails.status);
        } else {
          console.log("Response not received yet.");
        }
      });
    });
  }

  static async closeBrowser(page) {
    await page.close();
    // You can add additional logic to handle browser closure if needed
  }

  // Rest of your class methods...
}

module.exports = NetworkInterceptor;
