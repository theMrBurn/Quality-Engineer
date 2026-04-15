/**
 * healCache — in-process singleton for runtime locator healing.
 *
 * Survives across retries within the same Playwright worker because Node.js
 * require() caches module exports. describe.serial tests share a worker, so
 * healing candidates populated in one teardown are available on the next retry.
 *
 * Healing is layered:
 *   1. Pre-warm at sweep fixture setup — loads golden selectors written by previous runs.
 *   2. Progressive load in teardown   — as tests pass, their resolved selectors enter
 *      the cache and become available for later tests and retries in the same run.
 *   3. Approach 3 pathway             — POM subclasses may declare explicit fallbacks
 *      via `static fallbacks = { locatorKey: ['#sel1', 'tag[attr]', ...] }`.
 *      BasePOM constructor loads them automatically on instantiation.
 *
 * BasePOM checks HealCache in the catch block of each interaction method before
 * rethrowing, so healing is transparent to test files.
 */

"use strict";

/** @type {Map<string, string[]>} locator key → ordered list of fallback CSS selectors */
const _cache = new Map();

/** @type {{ key: string, selector: string, context: string, timestamp: string }[]} */
const _healLog = [];

const HealCache = {
  /**
   * Register a fallback selector for a locator key.
   * First registered = first tried. Duplicates are silently ignored.
   * @param {string} key
   * @param {string} selector  CSS selector string
   */
  set(key, selector) {
    if (!selector) return;
    if (!_cache.has(key)) _cache.set(key, []);
    const arr = _cache.get(key);
    if (!arr.includes(selector)) arr.push(selector);
  },

  /**
   * Return all registered fallback selectors for a key, ordered by priority.
   * @param {string} key
   * @returns {string[]}
   */
  get(key) {
    return _cache.get(key) ?? [];
  },

  /**
   * Record a successful heal event. Called by BasePOM when a fallback selector
   * resolves the element. Events surface in baseTest teardown logs.
   * @param {string} key
   * @param {string} selector  The selector that worked
   * @param {string} context   BasePOM method name (e.g. "checkElementVisibility")
   */
  logHeal(key, selector, context) {
    _healLog.push({ key, selector, context, timestamp: new Date().toISOString() });
    console.log(`[HealCache] ✓ HEALED '${key}' via '${selector}' in ${context}`);
  },

  /** Return a snapshot of heal events accumulated in this worker. */
  getHealLog() {
    return [..._healLog];
  },

  /**
   * Load static fallbacks declared on a POM subclass.
   * Approach 3 pathway — POM opts in by declaring:
   *
   *   static fallbacks = {
   *     loginButton: ['#login-btn', 'button[type="submit"]'],
   *   };
   *
   * BasePOM constructor calls this automatically so no test file changes are needed.
   * @param {Function} pomClass  POM constructor (e.g. InternetDemoPage)
   */
  loadFromPOM(pomClass) {
    const fallbacks = pomClass?.fallbacks;
    if (!fallbacks || typeof fallbacks !== "object") return;
    for (const [key, selectors] of Object.entries(fallbacks)) {
      const list = Array.isArray(selectors) ? selectors : [selectors];
      for (const sel of list) HealCache.set(key, sel);
    }
  },
};

module.exports = { HealCache };
