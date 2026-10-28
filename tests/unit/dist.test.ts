import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { expect, test } from 'vitest';

// Run after `npm run build`.
const DIST = path.resolve('dist');
const files = (dir: string): string[] =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)]))
    : [];

test('no google hosts in dist', () => {
  const hits = files(DIST)
    .filter((f) => /\.(html|css|js)$/.test(f) && !f.includes(`${path.sep}admin${path.sep}`))
    .filter((f) => /fonts\.googleapis|fonts\.gstatic|googletagmanager/.test(fs.readFileSync(f, 'utf8')))
    .map((f) => path.relative(DIST, f));
  expect(hits).toEqual([]);
});

test('no broken internal links', () => {
  expect(() => execFileSync('node', ['scripts/check-links.mjs'], { stdio: 'pipe' })).not.toThrow();
});

test('root redirect page offers all three languages', () => {
  const html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  for (const l of ['/en/', '/la/', '/zh/']) expect(html).toContain(`href="${l}"`);
  expect(html).toContain('mvm-lang');
});
