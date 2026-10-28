#!/usr/bin/env node
// Checks the built site in dist/ for broken internal links and template slips.
// Run after `npm run build`:  npm run check:links

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function exists(urlPath) {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  const target = path.join(DIST, clean);
  if (clean.endsWith('/')) return fs.existsSync(path.join(target, 'index.html'));
  return fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html'));
}

const files = walk(DIST).filter((f) => !f.includes(`${path.sep}admin${path.sep}`) && !f.includes(`${path.sep}_astro${path.sep}`));
const broken = new Map();
const slips = [];
let links = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(DIST, file);
  for (const m of html.matchAll(/\s(?:href|src|poster)="([^"]+)"/g)) {
    const u = m[1];
    if (!u.startsWith('/') || u.startsWith('//')) continue;
    links++;
    if (!exists(u)) {
      if (!broken.has(u)) broken.set(u, new Set());
      broken.get(u).add(rel);
    }
  }
  for (const bad of ['undefined', '[object Object]', 'NaN', '${']) {
    const visible = html.replace(/<script[\s\S]*?<\/script>/g, '');
    if (visible.includes(bad)) slips.push(`${rel}: contains "${bad}"`);
  }
}

console.log(`Checked ${files.length} pages, ${links} internal links.`);
if (broken.size) {
  console.log(`\nBroken links (${broken.size}):`);
  for (const [u, pages] of broken) console.log(`  ${u}  ← ${[...pages].slice(0, 3).join(', ')}${pages.size > 3 ? ` (+${pages.size - 3})` : ''}`);
}
if (slips.length) {
  console.log(`\nTemplate slips (${slips.length}):`);
  slips.slice(0, 30).forEach((s) => console.log('  ' + s));
}
if (!broken.size && !slips.length) console.log('No problems found.');
process.exitCode = broken.size || slips.length ? 1 : 0;
