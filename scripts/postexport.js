// Runs automatically after `npm run export` (npm "postexport" hook).
// With trailingSlash:true Next writes out/404/index.html, but GitHub Pages only
// serves a custom error page from out/404.html. Copy it there.
const fs = require("fs");
const path = require("path");

const out = path.join(__dirname, "..", "out");
const src = path.join(out, "404", "index.html");
const dest = path.join(out, "404.html");

if (fs.existsSync(src)) {
	fs.copyFileSync(src, dest);
	console.log("postexport: wrote out/404.html");
} else {
	console.warn("postexport: out/404/index.html not found, skipping");
}

// Belt and braces: make sure Jekyll processing stays off even if public/.nojekyll
// is ever removed.
fs.writeFileSync(path.join(out, ".nojekyll"), "");
