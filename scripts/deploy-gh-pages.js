// Fallback deploy that needs no GitHub Actions: publish ./out to the gh-pages
// branch. Usage: npm run deploy:branch   (runs `npm run export` first).
// Pages must be set to Source: "Deploy from a branch" -> gh-pages / (root).
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = path.join(root, "out");
if (!fs.existsSync(path.join(out, "index.html"))) {
	console.error("out/index.html missing. Run `npm run export` first.");
	process.exit(1);
}

const remote = execSync("git remote get-url origin", { cwd: root }).toString().trim();
const sha = execSync("git rev-parse --short HEAD", { cwd: root }).toString().trim();
const run = (cmd) => execSync(cmd, { cwd: out, stdio: "inherit" });

const nestedGit = path.join(out, ".git");
fs.rmSync(nestedGit, { recursive: true, force: true });

run("git init -q -b gh-pages");
run("git add -A");
run(`git -c user.name=alyssahoang -c user.email=125251563+alyssahoang@users.noreply.github.com commit -q -m "Deploy ${sha}"`);
run(`git push --force "${remote}" gh-pages:gh-pages`);
fs.rmSync(nestedGit, { recursive: true, force: true });
console.log(`Published out/ (from ${sha}) to gh-pages.`);
