/**
 * NetworkInterceptor — passive API traffic observer.
 *
 * Design contract:
 * - Never modifies, blocks, or reroutes requests
 * - Never throws or causes test failures
 * - Attaches to page via response event listener only
 * - Lifecycle managed entirely by baseTest fixture teardown
 * - Static state is per-worker safe when reset via baseTest before each test
 */
class NetworkInterceptor {
  static interceptedRequests = [];
  static pageClosed = false;

  static async interceptRequests(page) {
    page.on("close", () => {
      NetworkInterceptor.pageClosed = true;
    });

    page.on("response", async (response) => {
      if (NetworkInterceptor.pageClosed) return;

      try {
        const request = response.request();

        const requestData = {
          url: request.url(),
          method: request.method(),
          postData: request.postData() ?? null,
        };

        const responseDetails = {
          status: response.status(),
          headers: response.headers(),
          body: null,
        };

        const isRedirect = [301, 302, 303, 307, 308].includes(response.status());

        if (!isRedirect) {
          try {
            responseDetails.body = await response.text();
          } catch {
            responseDetails.body = null;
          }
        }

        NetworkInterceptor.interceptedRequests.push({
          request: requestData,
          response: responseDetails,
        });
      } catch {
        // never surface to test runner
      }
    });
  }

  static reset() {
    NetworkInterceptor.interceptedRequests = [];
    NetworkInterceptor.pageClosed = false;
  }

  static teardown(page) {
    NetworkInterceptor.pageClosed = true;
    NetworkInterceptor.interceptedRequests = [];
    try {
      page.removeAllListeners("response");
      page.removeAllListeners("close");
    } catch {
      // page may already be closed
    }
  }

  static snapshot() {
    return NetworkInterceptor.interceptedRequests.map((r) => ({
      url: r.request.url,
      method: r.request.method,
      status: r.response?.status ?? null,
    }));
  }
}

module.exports = NetworkInterceptor;