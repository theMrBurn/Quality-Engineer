class NetworkInterceptor {
  static interceptedRequests = [];

  static async interceptRequests(page) {
    await page.route("**/*", (route) => {
      const requestData = {
        url: route.request().url(),
        method: route.request().method(),
        postData: route.request().postData(),
        headers: route.request().headers(),
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

          NetworkInterceptor.storeRequestResponsePair(requestData, responseDetails);

          NetworkInterceptor.checkResponseStatus(responseDetails.status);
        } else {
          console.log("Response not received yet.");
        }
      });
    });
  }

  static logRequestData(requestData) {
    console.log("URL:", requestData.url);
    console.log("Method:", requestData.method);
    console.log("Post Data:", requestData.postData);
    console.log("Headers:", requestData.headers);
    console.log("Formatted Request Data:", JSON.stringify(requestData, null, 2));
  }

  static logResponseData(responseDetails) {
    console.log("Response Status:", responseDetails.status);
    console.log("Response Headers:", responseDetails.headers);

    if (responseDetails.status >= 300 && responseDetails.status <= 399) {
      console.log("Response is a redirect. Body not available.");
    } else {
      NetworkInterceptor.logFormattedResponseBody(responseDetails.body);
    }
  }

  static logFormattedResponseBody(body) {
    try {
      const responseBodyJSON = JSON.stringify(JSON.parse(body), null, 2);
      console.log("Response Body (Formatted JSON):", responseBodyJSON);
    } catch (error) {
      console.log("Error parsing response body as JSON:", error.message);
      console.log("Raw Response Body:", body);
    }
  }

  static storeRequestResponsePair(requestData, responseDetails) {
    const requestResponsePair = { request: requestData, response: responseDetails };
    NetworkInterceptor.interceptedRequests.push(requestResponsePair);
  }

  static checkResponseStatus(statusCode) {
    if ((statusCode >= 400 && statusCode <= 404) || (statusCode >= 500 && statusCode <= 504)) {
      console.error(`Error: ${statusCode} status code present`);
    }
  }
}

module.exports = NetworkInterceptor;
