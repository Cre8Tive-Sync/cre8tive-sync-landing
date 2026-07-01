// Scans public/designs for image files and writes designs.json (a manifest the
// Designs page fetches at runtime). Runs automatically before `dev` and `build`
// so dropping a new image into public/designs is all that's needed.
import { readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, basename } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DESIGNS_DIR = join(__dirname, "..", "public", "designs");
const MANIFEST = join(DESIGNS_DIR, "designs.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"]);

// "brand-guidelines_v2.png" -> "Brand Guidelines V2"
function titleFromFile(file) {
  return basename(file, extname(file))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function main() {
  let files = [];
  try {
    files = await readdir(DESIGNS_DIR);
  } catch {
    // directory may not exist yet on a fresh clone
  }

  const designs = files
    .filter((f) => IMAGE_EXT.has(extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => ({
      src: `/designs/${file}`,
      title: titleFromFile(file),
    }));

  await writeFile(MANIFEST, JSON.stringify(designs, null, 2) + "\n", "utf8");
  console.log(`designs manifest: ${designs.length} image(s) -> public/designs/designs.json`);
}

main().catch((err) => {
  console.error("Failed to generate designs manifest:", err);
  process.exit(1);
});
