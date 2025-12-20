// fetchWithLogging.js

async function fetchWithLogging(request, url) {
  console.log(`Request: GET ${url}`);
  const response = await request.get(url);

  const status = response.status();
  console.log(`Response status: ${status}`);
  const headers = response.headers();
  console.log("Response headers:", headers);

  const bodyText = await response.text();
  try {
    const jsonBody = JSON.parse(bodyText);
    console.log("Response body:", JSON.stringify(jsonBody, null, 2));
  } catch {
    console.log("Response body (non-JSON):", bodyText);
  }

  if (status >= 200 && status < 300) {
    return {
      status() {
        return status;
      },
      headers() {
        return headers;
      },
      json() {
        return JSON.parse(bodyText);
      },
    };
  } else {
    throw new Error(`Response status ${status}: ${bodyText}`);
  }
}

module.exports = fetchWithLogging;
