// Assembles src/pages/*.html into dist/*.html using src/layout.html and src/partials/.
// No dependencies. Run: node src/build.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const dist = join(root, "dist");
const read = (p) => readFileSync(join(src, p), "utf8");

const layout = read("layout.html");
const partial = (name) => read(`partials/${name}.html`);

function parse(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error("page is missing front-matter");
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: m[2] };
}

// {{> name key="value" key2="value"}} expands partials/name.html with {{key}} replaced.
function includes(html) {
  return html.replace(/\{\{>\s*([\w-]+)((?:\s+\w+="[^"]*")*)\s*\}\}/g, (_, name, attrs) => {
    let out = partial(name);
    for (const [, k, v] of attrs.matchAll(/(\w+)="([^"]*)"/g)) out = out.split(`{{${k}}}`).join(v);
    return out;
  });
}

const esc = (s) => s.replace(/"/g, "&quot;");
const unresolved = [];
const todo = [];

for (const file of readdirSync(join(src, "pages")).filter((f) => /^[\w-]+\.html$/.test(f))) {
  const { meta, body } = parse(read(`pages/${file}`));
  const slug = file.replace(/\.html$/, "");
  const path = slug === "index" ? "/" : `/${slug}`;
  const header = partial("header").replace(/\{\{active:([\w-]+)\}\}/g, (_, s) => (s === slug ? " active" : ""));
  const page = {
    title: meta.title,
    description: esc(meta.description || ""),
    og_description: esc(meta.og_description || meta.description || ""),
    path,
    slug,
    extra_head: meta.head ? includes(read(`pages/${meta.head}`)) : "",
    extra_body: meta.body ? includes(read(`pages/${meta.body}`)) : "",
    header,
    footer: partial("footer"),
    content: includes(body),
  };
  let html = layout;
  for (const [k, v] of Object.entries(page)) html = html.split(`{{${k}}}`).join(v);
  for (const m of html.matchAll(/\{\{[^}]+\}\}/g)) unresolved.push(`${file}: ${m[0]}`);
  for (const m of html.matchAll(/\[(?:confirm|placeholder)[^\]]*\]/g)) todo.push(`${file}: ${m[0]}`);
  mkdirSync(dist, { recursive: true });
  writeFileSync(join(dist, `${slug}.html`), html);
  console.log(`built dist/${slug}.html`);
}
if (unresolved.length) {
  console.error("unresolved placeholders:\n" + unresolved.join("\n"));
  process.exit(1);
}
if (todo.length) console.warn(`\n${todo.length} placeholder(s) still on the site:\n` + todo.join("\n"));
