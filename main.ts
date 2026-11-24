// Make the AI Judge Laugh: the Office Joke Open (make.fun).
// Writes one single-line office joke to /output/entry.txt.
//
// The joke is a fixed text, so every run writes exactly the same bytes:
// the entry is judged on this one line, and the program is deterministic.
// No network, no clock, no randomness, no files read besides this one.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: muted on the call, nodding along, rewarded for saying nothing.
// Office-specific (the muted video call), the laugh lands in the last
// words (promoted for the silence), and nothing in it needs explaining.
const JOKE =
  "I muted myself on the call, nodded for twenty minutes, and got promoted for my thoughtful silence.";

const OUT_DIR =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_PATH || "/output";

// The gate allows 1-200 characters, not only whitespace, one line.
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`joke is ${JOKE.length} characters, outside the 1-200 gate`);
}
if (JOKE.trim().length === 0 || JOKE.includes("\n")) {
  throw new Error("joke must be a single non-blank line");
}

mkdirSync(OUT_DIR, { recursive: true });
const target = join(OUT_DIR, "entry.txt");
writeFileSync(target, JOKE, "utf8");

// Read it back and refuse to finish unless the bytes match exactly.
const written = readFileSync(target, "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt read-back does not match the joke");
}
console.log(`wrote ${target} (${JOKE.length} characters)`);
