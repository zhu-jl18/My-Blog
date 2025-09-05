#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'source');

const exts = new Set(['.md', '.njk', '.html', '.yml', '.yaml']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else {
      if (exts.has(path.extname(entry.name))) files.push(full);
    }
  }
  return files;
}

function isRelativeUrl(u) {
  if (!u) return false;
  const s = u.trim();
  return !/^(https?:)?\/\//i.test(s) && // not http(s) or protocol-relative
         !/^\//.test(s) &&               // not site-absolute
         !/^data:/i.test(s) &&           // not data URI
         !/^mailto:/i.test(s) &&
         !/^tel:/i.test(s) &&
         !/^#/.test(s);                   // not anchor
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = [];

  // Markdown image: ![alt](url)
  const mdImgRe = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let m;
  while ((m = mdImgRe.exec(content)) !== null) {
    const url = m[1];
    if (isRelativeUrl(url)) {
      findings.push({ kind: 'markdown', url, index: m.index });
    }
  }

  // HTML img src or data-src
  const htmlImgRe = /<img[^>]+?(?:src|data-src)=["']([^"']+)["'][^>]*>/gi;
  let h;
  while ((h = htmlImgRe.exec(content)) !== null) {
    const url = h[1];
    if (isRelativeUrl(url)) {
      findings.push({ kind: 'html', url, index: h.index });
    }
  }

  return findings;
}

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error('source/ dir not found');
    process.exit(2);
  }
  const files = walk(SRC_DIR);
  const report = [];
  for (const f of files) {
    const fnd = scanFile(f);
    if (fnd.length) report.push({ file: f, items: fnd });
  }

  if (report.length === 0) {
    console.log('OK: No relative image references found.');
    process.exit(0);
  } else {
    console.log('Found relative image references:');
    for (const r of report) {
      console.log('\n' + path.relative(ROOT, r.file));
      for (const it of r.items) {
        console.log(`  - [${it.kind}] ${it.url}`);
      }
    }
    process.exit(1);
  }
}

main();

