const fs = require("fs").promises;
const path = require("path");

async function appendAndDiff(filePath, newSnapshot) {
  let existing = { runs: [] };

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    existing = JSON.parse(raw);
  } catch {
    // first run, no baseline yet
  }

  const previousRun = existing.runs.at(-1) ?? null;
  const diff = previousRun ? computeDiff(previousRun, newSnapshot) : null;

  existing.runs.push(newSnapshot);

  // ensure output directory exists
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2));

  return (
    diff ?? {
      locators: { added: [], removed: [] },
      apiCalls: { added: [], removed: [] },
      interactions: { newlySkipped: [], newlyTouched: [] },
    }
  );
}

function computeDiff(previous, current) {
  const prevLocators = new Set(Object.keys(previous.locatorMap));
  const currLocators = new Set(Object.keys(current.locatorMap));

  const prevApis = new Set(
    previous.apiCalls.map((c) => `${c.method}:${c.url}`)
  );
  const currApis = new Set(
    current.apiCalls.map((c) => `${c.method}:${c.url}`)
  );

  const prevSkipped = new Set(previous.interactions.skipped);
  const currSkipped = new Set(current.interactions.skipped);

  return {
    locators: {
      added: [...currLocators].filter((k) => !prevLocators.has(k)),
      removed: [...prevLocators].filter((k) => !currLocators.has(k)),
    },
    apiCalls: {
      added: [...currApis].filter((k) => !prevApis.has(k)),
      removed: [...prevApis].filter((k) => !currApis.has(k)),
    },
    interactions: {
      newlySkipped: [...currSkipped].filter((k) => !prevSkipped.has(k)),
      newlyTouched: [...previous.interactions.skipped].filter(
        (k) => !currSkipped.has(k)
      ),
    },
  };
}

module.exports = { appendAndDiff };
