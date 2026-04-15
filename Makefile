# ──────────────────────────────────────────────────────────────────────────────
# Playwright Test Suite — Makefile
#
# Usage:
#   make <target> [PROJECT=<name>] [TAGS=<@tag>] [BASEURL=<url>] [HEADED=1]
#
# Examples:
#   make test                                     # run GenericPOC (default)
#   make test PROJECT=TodoMVC                     # run a specific project
#   make test PROJECT=PublicAPI BASEURL=https://jsonplaceholder.typicode.com
#   make smoke PROJECT=TodoMVC                    # @smoke tag only
#   make test HEADED=1                            # headed browser (local only)
#   make report PROJECT=GenericPOC                # self-heal terminal report
#   make report-md PROJECT=GenericPOC             # self-heal markdown artifact
#   make suggest PROJECT=GenericPOC               # list pending suggestions
#   make patch PROJECT=GenericPOC                 # generate patch file
#   make shell                                    # interactive container shell
# ──────────────────────────────────────────────────────────────────────────────

# ── Defaults ──────────────────────────────────────────────────────────────────
PROJECT  ?= GenericPOC
TAGS     ?=
BASEURL  ?=
HEADED   ?=

# ── Internal ──────────────────────────────────────────────────────────────────
COMPOSE      = docker-compose
RUN          = $(COMPOSE) run --rm --no-deps
NODE         = node
NPX          = npx playwright test

GREP_FLAG    = $(if $(TAGS),--grep "$(TAGS)",)
HEADED_FLAG  = $(if $(HEADED),--headed,)
TEST_FLAGS   = --project=$(PROJECT) $(GREP_FLAG) $(HEADED_FLAG)

# Pass BASEURL through to the container as an env var.
# playwright.config.js reads process.env.BASEURL as a fallback for all projects.
BASEURL_ENV  = $(if $(BASEURL),-e BASEURL=$(BASEURL),)

SUGGESTIONS_DIR = Playwright/regression-data/suggestions
REPORT_OUT      = $(SUGGESTIONS_DIR)/self-heal-report.md

# ── Help (default target) ──────────────────────────────────────────────────────
.DEFAULT_GOAL := help

help:
	@echo ""
	@echo "  Playwright Test Suite"
	@echo ""
	@echo "  Local setup:"
	@echo "    make setup                     npm install + playwright browsers on host (VS Code extension, test-local)"
	@echo ""
	@echo "  Docker targets:"
	@echo "    make build                     Build the test container image"
	@echo "    make up                        Start the app service (for local app testing)"
	@echo "    make down                      Stop and remove all services + volumes"
	@echo "    make shell                     Open an interactive shell in the test container"
	@echo ""
	@echo "  Test targets:"
	@echo "    make test        [PROJECT=X]   Run a project (default: $(PROJECT))"
	@echo "    make test-local  [PROJECT=X]   Run without Docker (uses local Node)"
	@echo "    make smoke       [PROJECT=X]   Run @smoke tag only"
	@echo ""
	@echo "  Options (append to any test target):"
	@echo "    TAGS=@tag                      Filter by tag"
	@echo "    BASEURL=https://...            Override baseURL for this run"
	@echo "    HEADED=1                       Run with headed browser"
	@echo ""
	@echo "  Self-heal targets:"
	@echo "    make report      [PROJECT=X]   Terminal self-heal report"
	@echo "    make report-md   [PROJECT=X]   Markdown report → $(REPORT_OUT)"
	@echo "    make suggest     [PROJECT=X]   List pending suggestions (selfHealCleaner)"
	@echo "    make patch       [PROJECT=X]   Generate patch file for suggestions"
	@echo ""
	@echo "  Cleanup targets:"
	@echo "    make clean                     Remove test results and reports"
	@echo "    make clean-suggestions         Remove suggestion store for PROJECT"
	@echo ""

# ── Local setup (host) ────────────────────────────────────────────────────────
# Installs node_modules on the host so the VS Code Playwright extension can
# discover tests and show the inline green Play buttons.
setup:
	npm install
	npx playwright install --with-deps

# ── Docker ────────────────────────────────────────────────────────────────────
build:
	$(COMPOSE) build

up:
	$(COMPOSE) up -d app

down:
	$(COMPOSE) down --volumes

shell:
	$(RUN) tests bash

# ── Test execution ─────────────────────────────────────────────────────────────
test:
	$(RUN) $(BASEURL_ENV) tests $(NPX) $(TEST_FLAGS)

test-local:
	$(if $(BASEURL),BASEURL=$(BASEURL),) $(NPX) $(TEST_FLAGS)

smoke:
	$(MAKE) test TAGS=@smoke

# ── Self-heal reporting ────────────────────────────────────────────────────────
report:
	$(RUN) tests $(NODE) Playwright/base/selfHealReporter.js --project $(PROJECT)

report-pending:
	$(RUN) tests $(NODE) Playwright/base/selfHealReporter.js --project $(PROJECT) --pending-only

report-md:
	@mkdir -p $(SUGGESTIONS_DIR)
	$(RUN) tests $(NODE) Playwright/base/selfHealReporter.js \
	  --project $(PROJECT) --format markdown > $(REPORT_OUT)
	@echo "  Report written to $(REPORT_OUT)"

report-local:
	$(NODE) Playwright/base/selfHealReporter.js --project $(PROJECT)

# ── Self-heal cleaner (suggestion apply) ──────────────────────────────────────
# selfHealCleaner.js is built as part of the self-service fix feature.
suggest:
	$(RUN) tests $(NODE) Playwright/base/selfHealCleaner.js --project $(PROJECT)

suggest-local:
	$(NODE) Playwright/base/selfHealCleaner.js --project $(PROJECT)

patch:
	@mkdir -p $(SUGGESTIONS_DIR)/patches
	$(RUN) tests $(NODE) Playwright/base/selfHealCleaner.js \
	  --project $(PROJECT) --output patch
	@echo "  Patch written to $(SUGGESTIONS_DIR)/patches/$(PROJECT).patch"

# ── Cleanup ────────────────────────────────────────────────────────────────────
clean-results:
	rm -rf Playwright/test_results/* playwright-report/ blob-report/ allure-results/

clean-suggestions:
	rm -f $(SUGGESTIONS_DIR)/$(PROJECT).json
	@echo "  Cleared suggestion store for $(PROJECT)"

clean: clean-results

.PHONY: help setup build up down shell \
        test test-local smoke \
        report report-pending report-md report-local \
        suggest suggest-local patch \
        clean clean-results clean-suggestions
