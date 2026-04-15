// PublicAPI showcase — REST CRUD against jsonplaceholder, no page fixture.
// Demonstrates: API-only test pattern using Playwright's built-in `request` context.
// baseTest sweep is not invoked because there's no page to scrape.
//
// Target: https://jsonplaceholder.typicode.com  (set via project baseURL)

const { expect } = require("@playwright/test");
const { baseTest } = require("../../base/baseTest");

baseTest.describe.serial("PublicAPI - jsonplaceholder REST showcase @api", () => {
  baseTest("GET /todos returns paginated list", async ({ request }) => {
    const response = await request.get("/todos");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty("id");
    expect(body[0]).toHaveProperty("title");
  });

  baseTest("GET /todos/1 returns a single resource with expected shape", async ({ request }) => {
    const response = await request.get("/todos/1");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("id", 1);
    expect(body).toHaveProperty("title");
    expect(typeof body.completed).toBe("boolean");
  });

  baseTest("POST /posts creates a resource", async ({ request }) => {
    const payload = {
      title: "passive parallel",
      body: "demo create",
      userId: 1,
    };
    const response = await request.post("/posts", { data: payload });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject(payload);
    expect(body).toHaveProperty("id");
  });

  baseTest("PUT /posts/1 updates a resource", async ({ request }) => {
    const payload = {
      id: 1,
      title: "updated title",
      body: "updated body",
      userId: 1,
    };
    const response = await request.put("/posts/1", { data: payload });
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(payload);
  });

  baseTest("DELETE /posts/1 returns success", async ({ request }) => {
    const response = await request.delete("/posts/1");
    expect(response.status()).toBe(200);
  });
});
