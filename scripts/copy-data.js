#!/usr/bin/env node
/**
 * Copy src/data/*.json into dist/data verbatim.
 *
 * tsc re-serialises JSON modules it emits, which pads the compact data files
 * back out with whitespace (cities.json grows ~5.6%). Overwriting its output
 * with the originals keeps the published files byte-for-byte identical to the
 * ones in the repo.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src", "data");
const DIST_DIR = path.join(ROOT, "dist", "data");

if (!fs.existsSync(DIST_DIR)) {
  console.error(`copy-data: ${DIST_DIR} does not exist - run tsc first`);
  process.exit(1);
}

const files = fs.readdirSync(SRC_DIR).filter((file) => file.endsWith(".json"));

for (const file of files) {
  const from = path.join(SRC_DIR, file);
  const to = path.join(DIST_DIR, file);
  const before = fs.statSync(to).size;

  fs.copyFileSync(from, to);

  const after = fs.statSync(to).size;
  console.log(`copy-data: ${file} ${before} -> ${after} bytes`);
}
