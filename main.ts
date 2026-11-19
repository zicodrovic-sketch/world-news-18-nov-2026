// Copies the entry image to the output directory.
// The output directory comes from MAKEFUN_OUTPUT_DIR (a relative path is
// resolved against the working directory) and defaults to /output.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}
const rawOut = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outDir = isAbsolute(rawOut) ? rawOut : resolve(rawOut);
mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "entry.png"));
