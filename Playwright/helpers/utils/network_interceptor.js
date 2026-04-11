/**
 * NetworkInterceptor
 *
 * Routes every request on a Page, captures request/response pairs into a
 * static array, and (by default) emits a terse one-line log per request
 * so that live pipeline runs show network activity as it happens.
 *
 * Logging modes:
 *   - Terse (default, always-on): one line per request, grep-friendly,
 *     fixed-column status+method+url. Example:
 *         [interceptor] 200 GET    https://example.com/api/foo
 *         [interceptor] 500 POST   https://example.com/api/bar
 *     Designed for scrolling past in Azure DevOps / GitHub Actions logs
 *     where you want to eyeball failures without drowning in output.
 *   - Verbose (opt-in via DEBUG_INTERCEPTOR=1): restores the old
 *     pre-refactor behavior — full request + response JSON body dumps.
 *     Only useful locally when chasing a specific payload.
 *   - Silent (opt-out via NO_COLOR is NOT a silencer; use
 *     INTERCEPTOR_SILENT=1 to suppress all logs for a run).
 *
 * Color is honored per https://no-color.org — terse lines get ANSI
 * color for status codes unless NO_COLOR is set. Methods and URLs stay
 * uncolored so grep stays clean.
 */

// --- env snapshot (read once at module load) ---
const VERBOSE = process.env.DEBUG_INTERCEPTOR === "1";
const SILENT = process.env.INTERCEPTOR_SILENT === "1";
const USE_COLOR = !("NO_COLOR" in process.env);

// --- ANSI helpers, zero-dep ---
const ANSI = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  dim: "\x1b[2m",
};

function colorStatus(status) {
  if (!USE_COLOR || typeof status !== "number") return String(status ?? "---");
  const s = String(status);
  if (status >= 500) return ANSI.red + s + ANSI.reset;
  if (status >= 400) return ANSI.yellow + s + ANSI.reset;
  if (status >= 300) return ANSI.cyan + s + ANSI.reset;
  if (status >= 200) return ANSI.green + s + ANSI.reset;
  return s;
}

function padMethod(method) {
  // pad to 6 chars (covers DELETE); longer methods overflow gracefully
  return (method || "???").padEnd(6, " ");
}

class NetworkInterceptor {
  static interceptedRequests = [];
  static pageClosed = false;

  static async interceptRequests(page) {
    // Reset per-page close flag; callers (baseTest.sweep) reset the
    // interceptedRequests array themselves before each sweep.
    NetworkInterceptor.pageClosed = false;

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

          // live observability
          if (!SILENT) {
            NetworkInterceptor.logTerse(requestData, responseDetails);
            if (VERBOSE) {
              NetworkInterceptor.logVerbose(requestData, responseDetails);
            }
          }
        }
      });
    });
  }

  /**
   * One grep-friendly line per request: `[interceptor] <status> <METHOD> <url>`.
   * Status is colored by class (2xx green, 3xx cyan, 4xx yellow, 5xx red).
   * Method is padded to 6 chars so URLs align. URL is untruncated so query
   * params stay visible in pipeline logs.
   */
  static logTerse(requestData, responseDetails) {
    const status = colorStatus(responseDetails.status);
    const method = padMethod(requestData.method);
    const url = requestData.url;
    console.log(`[interceptor] ${status} ${method} ${url}`);
  }

  /**
   * Verbose mode — restores the pre-refactor behavior: full request and
   * response dumps, pretty-printed JSON when the body parses as JSON.
   * Opt-in via DEBUG_INTERCEPTOR=1; never fires in pipeline defaults.
   */
  static logVerbose(requestData, responseDetails) {
    console.log("URL:", requestData.url);
    console.log("Method:", requestData.method);
    if (requestData.postData) console.log("Post Data:", requestData.postData);
    console.log(
      "Formatted Request Data:",
      JSON.stringify(requestData, null, 2),
    );
    console.log("Response Status:", responseDetails.status);
    console.log("Response Headers:", responseDetails.headers);

    if (responseDetails.status >= 300 && responseDetails.status <= 399) {
      console.log("Response is a redirect. Body not available.");
    } else if (responseDetails.body != null) {
      NetworkInterceptor.logFormattedResponseBody(responseDetails.body);
    }
  }

  static logFormattedResponseBody(body) {
    try {
      const parsed = JSON.parse(body);
      console.log(
        "Response Body (Formatted JSON):",
        JSON.stringify(parsed, null, 2),
      );
    } catch {
      // Non-JSON body (html, text, binary) — print a short prefix so we
      // don't dump a 2MB HTML page into the log.
      const preview =
        typeof body === "string" ? body.slice(0, 500) : "[non-string body]";
      console.log("Response Body (raw, first 500 chars):", preview);
    }
  }

  static async closeBrowser(page) {
    await page.close();
  }
}

module.exports = NetworkInterceptor;
