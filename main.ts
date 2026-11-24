import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Last Text at One Percent — the final text a dying phone sends at 1%.
// Written in the phone's own voice: a last confession of everything it
// witnessed, before it goes dark for good.
const ENTRY =
  "1%. final confession: i watched you type 'u up?' at 3am, delete it, retype it, send it. 47 tabs open, 6 snoozed alarms. bury me in rice and tell mom nothing.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Fail loudly here rather than shipping a bad entry.
const payload = ENTRY + "\n";
if (payload.length < 1 || payload.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry violates the 1-200 character gate (${payload.length} chars)`);
}

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(repoRoot, "output");
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, payload, "utf8");
