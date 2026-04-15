# Playwright Test Automation Framework

A production-grade test automation framework built on Playwright, designed for enterprise scale. Features a custom fixture system for passive regression observation, a consolidated Page Object Model hierarchy, self-healing locator fallbacks, and full containerization.

This repository is a public-facing pattern showcase of a framework that has run 10+ applications across 40+ project configurations in a production environment. Every test below demonstrates the framework's `baseTest` fixture running in **passive parallel** with the test's own assertions — silent observation that never gates pass/fail.

---

## Architecture

```
Playwright/
  base/
    baseTest.js             test.extend() fixture — two-track design,
                            sweep() runs passively in teardown
    BasePOM.js              base class — all POMs extend this; methods
                            accept locator string keys, with HealCache fallbacks
    healCache.js            in-process singleton for fallback selectors
    healingWriter.js        persists self-heal signals + suggestion store
    regressionWriter.js     append + diff engine for snapshot history
    selfHealReporter.js     terminal/markdown report on healing activity
    selfHealCleaner.js      apply healing suggestions back into POMs
    globalSetup.js          pre-run summary of available healing data

  helpers/
    utils/
      network_interceptor.js    captures all HTTP traffic passively
      scrapeUtils.js             discovers interactive elements on any page
    telemetry/
      pageIdentityProbe.js       route + heading + visible-text fingerprint
    login/
      the_internet_storage_state.json   pre-auth stub for StorageStateDemo

  tests/
    test_generic_run/                pattern showcase — every spec demos
                                     baseTest passive parallel against a
                                     real public target or a dummy boilerplate
      internet_demo_page.js              POM — the-internet.herokuapp.com
      todo_page.js                       POM — demo.playwright.dev/todomvc
      iframe_demo_page.js                POM — TinyMCE iframe handshake
      dynamic_loading_page.js            POM — async load + network probe
      test_generic_poc.spec.js           smoke + form auth + telemetry + sweep
      test_todomvc.spec.js               multi-step CRUD with state carryover
      test_publicapi.spec.js             REST CRUD via request context
      test_iframe_handshake.spec.js      frameLocator + retry-on-bind-delay
      test_lifecycle_and_data_driven.spec.js   beforeEach/afterEach + JSON loop
      test_network_probe.spec.js         explicit NetworkInterceptor outside sweep
      test_storage_state.spec.js         project-level pre-auth pattern
      data/
        test_inputs.json                 fixture for data-driven loop

  regression-data/                       auto-generated JSON snapshots per project
    suggestions/                         self-heal suggestion store
    patches/                             generated locator patch files
```

---

## Core Concepts

### baseTest — Passive Parallel Observation

`baseTest` is a Playwright `test.extend()` fixture that injects a `sweep()` function into every test. The fixture implements a **two-track design**:

- **TRACK 1 (foreground)** — your explicit assertions. These determine pass/fail.
- **TRACK 2 (background, fire-and-forget)** — `sweep()` triggers DOM scrape, network capture, and regression diff inside the fixture's teardown. None of it is awaited by the test. None of it can fail the test.

```javascript
const { baseTest } = require("../../base/baseTest");
const { TodoPage } = require("./todo_page");

baseTest("multi-step CRUD", async ({ page, sweep }, testInfo) => {
  const todo = new TodoPage(page);
  testInfo._pomClass = TodoPage;
  await todo.goto();
  sweep();   // fire-and-forget — TRACK 2 runs in teardown

  // TRACK 1 — your assertions
  await todo.addTodo("write tests");
  await expect(todo.locators.todoItems()).toHaveCount(1);
});
```

### Realtime Telemetry

Every TRACK 2 step emits to console with prefixed tags so you can follow framework activity live:

```text
[baseTest][heal] Pre-warmed 9 golden selectors for GenericPOC
[baseTest][pom-check] SOFT WARN — 'errorFlash' not visible on /
[baseTest][diff] New locators (3): ['toggleAll', 'clearCompleted', 'filterAll']
[HealCache] ✓ HEALED 'loginButton' via 'button:has-text("Login")' in clickElement
[networkProbe] captured 12 HTTP exchanges during dynamic load
```

The diff surfaces three things between runs:
- **Locators added/removed** — UI elements appeared or disappeared
- **API calls added/removed** — backend endpoints changed
- **Interaction status changes** — touchable became skipped, or vice versa

### BasePOM — Consolidated Page Object Model

Every POM extends `BasePOM`, inheriting common interaction methods that take string keys (not locator objects):

| Method | Purpose |
|--------|---------|
| `checkElementVisibility(key)` | Assert element is visible, fall back through HealCache on miss |
| `checkElementText(key, text)` | Assert element contains text |
| `clickElement(key)` | Click by string key |
| `fillForm(testData)` | Fill multiple fields from a key/value object |
| `findFirstGridRow(selector)` | Click first row in a data grid |

Locators are lazy arrow functions — evaluated at interaction time, not construction time:

```javascript
class TodoPage extends BasePOM {
  static expectedLocators = ["todoTitle", "newTodoInput", "todoItems"];

  static fallbacks = {
    newTodoInput: ["input.new-todo"],
    todoTitle: ['h1:has-text("todos")'],
  };

  constructor(page) {
    super(page);
    this.locators = {
      todoTitle: () => this.page.getByRole("heading", { name: "todos" }),
      newTodoInput: () => this.page.getByPlaceholder("What needs to be done?"),
      todoItems: () => this.page.locator(".todo-list li"),
    };
  }
}
```

`static fallbacks` populate HealCache automatically. When a primary locator misses, BasePOM tries each fallback before throwing.

### Multi-Project Configuration

Projects are defined in `projects.json` and loaded dynamically by `playwright.config.js`. Each project specifies its own `testDir`, `baseURL`, `grep`, `retries`, and optional `storageState`. Environment variables override base URLs using the `BASEURL_{PROJECT_NAME}` convention.

```json
[
  {
    "name": "TodoMVC",
    "testDir": "Playwright/tests/test_generic_run",
    "retries": 0,
    "grep": "@todo",
    "use": { "baseURL": "https://demo.playwright.dev/todomvc" }
  }
]
```

The five showcase projects share a single `testDir` and route to specific specs via tag-based `grep`.

---

## Quick Start

```bash
# Clone and install
git clone <repo-url>
cd playwright-test-automation-framework
make setup                                  # npm ci + playwright browsers

# Run a specific project (any of the five showcase projects)
make test PROJECT=GenericPOC                # the-internet.herokuapp.com
make test PROJECT=TodoMVC                   # demo.playwright.dev/todomvc
make test PROJECT=PublicAPI                 # jsonplaceholder.typicode.com
make test PROJECT=IframeDemo                # iframe handshake demo
make test PROJECT=StorageStateDemo          # pre-auth pattern

# Tag filtering and headed mode
make smoke PROJECT=TodoMVC                  # @smoke tag only
make test PROJECT=GenericPOC HEADED=1       # headed browser

# Override baseURL for a single run
make test PROJECT=PublicAPI BASEURL=https://jsonplaceholder.typicode.com

# Self-heal reporting
make report PROJECT=GenericPOC              # terminal report
make report-md PROJECT=GenericPOC           # markdown artifact
make suggest PROJECT=GenericPOC             # list pending suggestions
```

### Docker

```bash
make build                                  # build the test container
make shell                                  # interactive container shell
make test PROJECT=TodoMVC                   # runs inside the container by default
```

---

## Showcase Project Map

| Project | Target | Pattern demonstrated |
|---------|--------|----------------------|
| `GenericPOC` | the-internet.herokuapp.com | smoke, form auth flow, telemetry probe, sweep regression, lifecycle hooks, data-driven loop, explicit network probe |
| `TodoMVC` | demo.playwright.dev/todomvc | multi-step CRUD with state carryover across DOM mutations and route changes |
| `PublicAPI` | jsonplaceholder.typicode.com | API-only suite using Playwright's `request` context — no page fixture |
| `IframeDemo` | the-internet.herokuapp.com/iframe | frameLocator + retry-on-bind-delay handshake with embedded TinyMCE editor |
| `StorageStateDemo` | the-internet.herokuapp.com | project-level pre-auth via `storageState` — no in-test login required |

### Tagging Convention

| Tag | Purpose |
|-----|---------|
| `@smoke` | Quick validation — elements present |
| `@func` | Functional — user flows and interactions |
| `@e2e` | Multi-step end-to-end with state carryover |
| `@api` | API endpoint tests |
| `@iframe` | Iframe / embedded app handshake |
| `@network` | Explicit NetworkInterceptor usage |
| `@lifecycle` | beforeEach / afterEach hook demos |
| `@storage` | Storage state / pre-auth pattern |
| `@telemetry` | pageIdentityProbe demos |
| `@sweep` | Sweep fixture regression demos |
| `@internet` / `@todo` | Project-routing tags (matched by `projects.json` `grep`) |

---

## CI/CD

GitHub Actions runs each project in parallel via matrix strategy. Test results and regression data are collected as artifacts.

---

## Technology Stack

| Tool | Purpose |
|------|---------|
| Playwright | Browser automation and API testing |
| Node.js 20 | Runtime |
| Docker | Containerized test execution |
| GitHub Actions | CI/CD with matrix strategy |
| JUnit XML | Test result reporting |

---

## Framework Design Decisions

**Why `test.extend()` instead of class inheritance for baseTest?**
Playwright's fixture system handles setup/teardown, parallel isolation, and dependency injection natively. A class hierarchy would fight the framework rather than extend it.

**Why a two-track design for sweep?**
Test authors should not have to think about whether their assertions are slowing down regression capture, or whether a slow scrape is masking a real failure. Putting capture + diff in fire-and-forget teardown keeps the foreground deterministic and the background opportunistic.

**Why lazy arrow functions for locators?**
Locators that evaluate at construction time break when the DOM hasn't loaded yet. Arrow functions defer evaluation to interaction time, and the `this.page` binding stays correct through the closure.

**Why string keys instead of passing locator objects?**
String keys keep tests readable (`clickElement("submitButton")`) and decouple the test from selector implementation. The POM owns the selector; the test owns the intent. They also make HealCache lookup trivial.

**Why passive observation instead of assertion-based regression?**
Assertion-based regression is brittle — a single new element fails the build. Passive observation records everything and surfaces changes as data, not failures. The team decides which changes matter.

**Why self-healing locator fallbacks?**
Selectors break when product UI shifts. HealCache lets a POM declare known-good fallbacks (`static fallbacks = {...}`) that BasePOM tries before throwing. The healing writer also accumulates organic fallbacks discovered at runtime, which `selfHealReporter` and `selfHealCleaner` surface as suggestions you can apply back into the POM.
