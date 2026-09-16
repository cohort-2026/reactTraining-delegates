// Scans the files Next.js sends to the browser for Supabase secret keys.
// Run it after `npm run build`.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const staticDir = join(".next", "static");

if (!existsSync(".env.local")) {
  console.error("No .env.local found. Copy .env.example to .env.local, then run npm run build.");
  process.exit(1);
}
if (!existsSync(staticDir)) {
  console.error("No build found. Run npm run build first.");
  process.exit(1);
}

function filesIn(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? filesIn(path) : [path];
  });
}

const leaks = filesIn(staticDir).filter((file) =>
  readFileSync(file, "utf8").includes("sb_secret_"));

if (leaks.length > 0) {
  console.error("✗ A Supabase secret key (sb_secret_...) is in files sent to the browser:");
  for (const file of leaks) console.error(`  ${file}`);
  process.exit(1);
}

console.log("✓ No Supabase secret keys found in the browser files (.next/static).");
