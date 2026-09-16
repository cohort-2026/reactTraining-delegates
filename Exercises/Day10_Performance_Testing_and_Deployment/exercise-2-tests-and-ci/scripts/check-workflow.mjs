// Checks .github/workflows/ci.yml against the team's CI rules (see README.md).
// Run it with: npm run check:ci
import { existsSync, readFileSync } from "node:fs";
import semver from "semver";
import { parse } from "yaml";

const WORKFLOW = ".github/workflows/ci.yml";

// Latest major version of each official action, checked in September 2026.
const CURRENT_MAJORS = {
  "actions/checkout": 7,
  "actions/setup-node": 7,
};

let failures = 0;
const pass = (message) => console.log(`✓ ${message}`);
const fail = (message) => {
  failures += 1;
  console.log(`✗ ${message}`);
};

console.log(`Checking ${WORKFLOW}\n`);

let workflow;
try {
  workflow = parse(readFileSync(WORKFLOW, "utf8"), { strict: true, uniqueKeys: true });
  pass("The file is valid YAML");
} catch (error) {
  fail(`The file is not valid YAML: ${error.message}`);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

// 1. Triggers
const on = workflow?.on ?? {};
const pushBranches = on.push?.branches ?? [];
if (pushBranches.includes("main") && "pull_request" in on) {
  pass("Runs on pushes to main and on pull requests");
} else {
  fail("Should run on pushes to main and on every pull request");
}

const steps = Object.values(workflow?.jobs ?? {}).flatMap((job) => job?.steps ?? []);
if (steps.length === 0) {
  fail("No job steps found");
  process.exit(1);
}

// 2. Official actions are on their current major version
for (const step of steps.filter((s) => typeof s.uses === "string")) {
  const [name, ref = ""] = step.uses.split("@");
  const current = CURRENT_MAJORS[name];
  if (current === undefined) continue;
  const major = Number(ref.replace(/^v/, "").split(".")[0]);
  if (major === current) {
    pass(`${step.uses} is the current major version`);
  } else {
    fail(`${step.uses} is not the current major version of ${name}`);
  }
}

// 3. The Node.js version is one that every installed tool supports
const setupNode = steps.find((s) => String(s.uses ?? "").startsWith("actions/setup-node"));
const nodeVersion = setupNode?.with?.["node-version"];
if (nodeVersion === undefined) {
  fail("actions/setup-node does not set a node-version");
} else if (/^lts\//.test(String(nodeVersion))) {
  pass(`node-version ${nodeVersion} is a current LTS release`);
} else {
  const range = semver.validRange(String(nodeVersion));
  const packages = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  const unsupported = [];
  for (const name of packages) {
    const file = `node_modules/${name}/package.json`;
    if (!existsSync(file)) continue;
    const engines = JSON.parse(readFileSync(file, "utf8")).engines?.node;
    if (engines && (!range || !semver.intersects(range, engines))) {
      unsupported.push(`${name} (needs Node ${engines})`);
    }
  }
  if (!existsSync("node_modules")) {
    fail("Run npm install first, so the Node.js version can be compared with your tools");
  } else if (unsupported.length === 0) {
    pass(`node-version ${nodeVersion} is supported by every installed tool`);
  } else {
    fail(`node-version ${nodeVersion} is not supported by: ${unsupported.join(", ")}`);
  }
}

// 4. Dependencies are installed exactly as package-lock.json lists them
const runs = steps.filter((s) => typeof s.run === "string").map((s) => s.run.trim());
const installs = runs.filter((r) => /^npm (ci|install|i)\b/.test(r));
if (installs.length === 1 && /^npm ci\b/.test(installs[0])) {
  pass("Dependencies are installed exactly as package-lock.json lists them");
} else {
  fail("Dependencies must be installed exactly as package-lock.json lists them, failing if it is out of date");
}

// 5. Every npm script the workflow runs exists in package.json
for (const run of runs) {
  const match = run.match(/^npm (?:run (\S+)|(test))\b/);
  if (!match) continue;
  const script = match[1] ?? match[2];
  if (pkg.scripts?.[script]) {
    pass(`"${run}" uses the "${script}" script from package.json`);
  } else {
    fail(`"${run}" uses a "${script}" script that package.json does not have`);
  }
}

// 6. Tests run once instead of in watch mode
if (runs.some((r) => /^npm test -- --run\b/.test(r) || /^npx vitest run\b/.test(r))) {
  pass("Tests run once, not in watch mode");
} else {
  fail("Tests should run once, not in watch mode");
}

console.log(failures === 0 ? "\nAll CI checks passed." : `\n${failures} CI check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
