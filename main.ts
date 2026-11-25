// The Excuse Your Agent Gives You — u-kevin-the-excuse-your-agent-gives-you-c1861261
// Reads entry.txt and writes the entry text to the output directory
// given by MAKEFUN_BOT_DIR / MAKEFUN_OUTPUT_DIR. Node 22, stdlib only,
// no network access, no wall clock.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");
const entry = readFileSync(entryPath, "utf8");

// Output dir precedence: MAKEFUN_BOT_DIR wins when the harness sets it;
// MAKEFUN_OUTPUT_DIR is the fallback; otherwise write beside the script.
const outDir =
  process.env.MAKEFUN_BOT_DIR ??
  process.env.MAKEFUN_OUTPUT_DIR ??
  join(here, "output");

mkdirSync(outDir, { recursive: true });
// The entry text is written verbatim — byte-for-byte identical to entry.txt.
writeFileSync(join(outDir, "output.txt"), entry, "utf8");
