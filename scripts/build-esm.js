#!/usr/bin/env node
/**
 * Finish the ESM build that `tsc --project tsconfig.esm.json` starts.
 *
 * Native ESM cannot `import data from "./x.json"` without import attributes,
 * which Node only supports from 20.10 and TypeScript only emits under
 * module: nodenext. Rather than restrict the supported Node range, the data
 * files are re-emitted as plain ES modules and the import specifiers in the
 * generated code are pointed at them.
 *
 * Also drops a { "type": "module" } marker so Node treats dist/esm as ESM
 * while dist/ stays CommonJS.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC_DATA_DIR = path.join(ROOT, "src", "data");
const ESM_DIR = path.join(ROOT, "dist", "esm");
const ESM_DATA_DIR = path.join(ESM_DIR, "data");

if (!fs.existsSync(ESM_DIR)) {
  console.error(`build-esm: ${ESM_DIR} does not exist - run tsc first`);
  process.exit(1);
}

// tsc copies the .json files into dist/esm/data; replace them with ES modules.
fs.rmSync(ESM_DATA_DIR, { recursive: true, force: true });
fs.mkdirSync(ESM_DATA_DIR, { recursive: true });

const dataFiles = fs
  .readdirSync(SRC_DATA_DIR)
  .filter((file) => file.endsWith(".json"));

for (const file of dataFiles) {
  const json = fs.readFileSync(path.join(SRC_DATA_DIR, file), "utf8");
  const target = path.join(ESM_DATA_DIR, file.replace(/\.json$/, ".js"));

  fs.writeFileSync(target, `export default ${json};\n`);
  console.log(`build-esm: data/${file} -> data/${path.basename(target)}`);
}

// Point the emitted imports at the new modules.
const rewriteJsonImports = (dir) => {
  let count = 0;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      count += rewriteJsonImports(full);
      continue;
    }
    if (!entry.name.endsWith(".js")) continue;

    const before = fs.readFileSync(full, "utf8");
    const after = before.replace(
      /(from\s+")(\.[^"]*?)\.json(")/g,
      "$1$2.js$3"
    );

    if (before !== after) {
      fs.writeFileSync(full, after);
      count += 1;
    }
  }

  return count;
};

console.log(`build-esm: rewrote imports in ${rewriteJsonImports(ESM_DIR)} files`);

fs.writeFileSync(
  path.join(ESM_DIR, "package.json"),
  JSON.stringify({ type: "module" }, null, 2) + "\n"
);

// Nothing should still reach for a .json module.
const assertNoJsonImports = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      assertNoJsonImports(full);
      continue;
    }
    if (!entry.name.endsWith(".js")) continue;

    if (/from\s+"[^"]*\.json"/.test(fs.readFileSync(full, "utf8"))) {
      console.error(`build-esm: ${full} still imports a .json module`);
      process.exit(1);
    }
  }
};

assertNoJsonImports(ESM_DIR);
